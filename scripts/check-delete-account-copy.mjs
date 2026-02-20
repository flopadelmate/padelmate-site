import { promises as fs } from "node:fs";
import path from "node:path";

const rootDirectory = process.cwd();
const accentPattern = /[^\x00-\x7f]/;

const checks = [
  {
    filePath: "src/app/delete-account/page.tsx",
    requiredSnippets: [
      "données",
      "confidentialité",
      "Délais et suite de traitement",
      "Contacter PadelMate par e-mail",
      "Si le bouton ne fonctionne pas",
      "Objet recommandé",
      "https://www.cnil.fr/",
      "max.padelmate@gmail.com",
    ],
  },
  {
    filePath: "content/legal/delete-account.md",
    requiredSnippets: [
      "Annexe légale",
      "données",
      "confidentialité",
      "réponse",
      "difficulté",
      "https://www.cnil.fr/",
      "mailto:max.padelmate@gmail.com",
    ],
  },
];

async function main() {
  const errors = [];

  for (const check of checks) {
    const absolutePath = path.join(rootDirectory, check.filePath);
    const content = await fs.readFile(absolutePath, "utf8");

    if (!accentPattern.test(content)) {
      errors.push(`${check.filePath}: aucun caractère accentué détecté.`);
    }

    for (const snippet of check.requiredSnippets) {
      if (!content.includes(snippet)) {
        errors.push(`${check.filePath}: texte obligatoire manquant -> "${snippet}"`);
      }
    }
  }

  if (errors.length > 0) {
    console.error("Delete-account copy checks failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("Delete-account copy checks passed.");
}

main().catch((error) => {
  console.error("Delete-account copy check crashed:", error);
  process.exit(1);
});
