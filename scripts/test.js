import { readdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";

const arquivos = (await readdir("js"))
  .filter((arquivo) => arquivo.endsWith(".js"))
  .map((arquivo) => `js/${arquivo}`);

for (const arquivo of arquivos) {
  execFileSync(process.execPath, ["--check", arquivo], { stdio: "inherit" });
}

console.log("Testes de sintaxe concluídos sem erros.");
