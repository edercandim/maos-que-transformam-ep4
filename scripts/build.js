import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import CleanCSS from "clean-css";
import { build as esbuild } from "esbuild";
import { minify } from "html-minifier-terser";
import { optimize } from "svgo";

await rm("dist", { recursive: true, force: true });
await mkdir("dist/css", { recursive: true });
await mkdir("dist/js", { recursive: true });
await mkdir("dist/imagens", { recursive: true });

const css = await readFile("css/style.css", "utf8");
const cssResult = new CleanCSS({ level: 2 }).minify(css);
if (cssResult.errors.length) throw new Error(cssResult.errors.join("\n"));
await writeFile("dist/css/style.min.css", cssResult.styles);

await esbuild({
  entryPoints: ["js/app.js"],
  bundle: true,
  minify: true,
  format: "esm",
  target: ["es2020"],
  outfile: "dist/js/app.min.js"
});

const svg = await readFile("imagens/logo.svg", "utf8");
const optimizedSvg = optimize(svg, {
  multipass: true,
  plugins: ["preset-default"]
});
await writeFile("dist/imagens/logo.svg", optimizedSvg.data);

let html = await readFile("html/index.html", "utf8");
html = html
  .replace("../css/style.css", "./css/style.min.css")
  .replace("../imagens/logo.svg", "./imagens/logo.svg")
  .replace("../js/app.js", "./js/app.min.js");

const minifiedHtml = await minify(html, {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true
});

await writeFile("dist/index.html", minifiedHtml);

console.log("Build de produção concluída em dist/.");
console.log("- HTML minificado");
console.log("- CSS minificado");
console.log("- JavaScript empacotado e minificado");
console.log("- SVG otimizado");
