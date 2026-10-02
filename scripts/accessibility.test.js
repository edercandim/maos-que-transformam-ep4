import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const root = process.cwd();
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml"
};

const server = createServer(async (req, res) => {
  const relativePath = req.url === "/" ? "html/index.html" : req.url.replace(/^\//, "");
  const filePath = join(root, relativePath.split("?")[0].split("#")[0]);

  try {
    const data = await readFile(filePath);
    res.setHeader("Content-Type", mime[extname(filePath)] || "application/octet-stream");
    res.end(data);
  } catch {
    res.statusCode = 404;
    res.end("Not found");
  }
});

await new Promise(resolve => server.listen(4173, "127.0.0.1", resolve));

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  if (results.violations.length) {
    console.error(JSON.stringify(results.violations, null, 2));
    throw new Error("Foram encontradas violações automáticas de acessibilidade.");
  }

  await page.keyboard.press("Tab");
  const firstFocusedText = await page.locator(":focus").textContent();
  if (!firstFocusedText?.includes("Pular para o conteúdo")) {
    throw new Error("O primeiro foco por teclado deveria ser o skip link.");
  }

  await page.keyboard.press("Enter");
  const focusedId = await page.locator(":focus").getAttribute("id");
  if (focusedId !== "app") {
    throw new Error("O skip link não direcionou o foco para o conteúdo principal.");
  }

  await page.goto("http://127.0.0.1:4173/#/inicio", { waitUntil: "networkidle" });
  const modalButton = page.getByRole("button", { name: "Conhecer a ONG" });
  await modalButton.focus();
  await page.keyboard.press("Enter");

  const dialog = page.getByRole("dialog");
  if (!(await dialog.isVisible())) {
    throw new Error("O modal não abriu por teclado.");
  }

  for (let i = 0; i < 5; i += 1) {
    await page.keyboard.press("Tab");
    const inside = await page.evaluate(() => {
      const modal = document.querySelector("[data-modal]");
      return Boolean(modal && modal.contains(document.activeElement));
    });
    if (!inside) {
      throw new Error("O foco escapou do modal durante a navegação por teclado.");
    }
  }

  await page.keyboard.press("Escape");
  if (await dialog.isVisible()) {
    throw new Error("O modal não fechou com a tecla Escape.");
  }

  console.log("WCAG 2.1 A/AA: sem violações automáticas detectadas pelo axe.");
  console.log("Teclado: skip link, foco do modal, Tab e Escape validados.");
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
