// Imprime o aviso de autorização de mídia e as pendências abertas de empresa.json.
import { readFile } from "node:fs/promises";

const empresa = JSON.parse(await readFile(new URL("../empresa.json", import.meta.url), "utf8"));
const guard = empresa.publicationGuard ?? {};

console.log(`\nPendências — ${empresa.businessName}\n`);

if (guard.publicMediaIsAuthorized === false) {
  console.log("ATENÇÃO: as mídias públicas ainda NÃO foram autorizadas pela cliente.");
  console.log("Não publique o site com as imagens atuais antes da autorização humana.\n");
}
if (guard.humanReviewRequired) {
  console.log("Revisão humana obrigatória antes da publicação.\n");
}

const questions = empresa.openQuestions ?? [];
questions.forEach((q, i) => console.log(`${String(i + 1).padStart(2, " ")}. ${q}`));
console.log(`\nTotal: ${questions.length} pendência(s).\n`);
