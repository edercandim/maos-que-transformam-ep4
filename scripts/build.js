import { cp, mkdir, rm } from "node:fs/promises";

const origem = ["html", "css", "js", "imagens"];

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });

for (const pasta of origem) {
  await cp(pasta, `dist/${pasta}`, { recursive: true });
}

console.log("Build concluída em dist/.");
