import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const TEXT_EXTENSIONS = new Set([
  ".md",
  ".json",
  ".ts",
  ".tsx",
  ".yml",
  ".yaml",
  ".mjs",
  ".cjs",
  ".css",
  ".html",
  ".js",
]);

const IGNORE_DIRS = new Set([".git", ".next", "node_modules", "dist", "build", "coverage"]);
const MOJIBAKE_TOKENS = [
  String.fromCharCode(0x00c3),
  String.fromCharCode(0x00c2),
  String.fromCharCode(0xfffd)
];

async function walk(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) {
        files.push(...(await walk(entryPath)));
      }
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (TEXT_EXTENSIONS.has(ext)) {
      files.push(entryPath);
    }
  }

  return files;
}

async function checkFile(filePath) {
  const content = await fs.readFile(filePath);
  const relativePath = path.relative(ROOT_DIR, filePath);
  const issues = [];

  if (content.length >= 3 && content[0] === 0xef && content[1] === 0xbb && content[2] === 0xbf) {
    issues.push(`${relativePath}: BOM detected`);
  }

  const text = content.toString("utf8");
  for (const token of MOJIBAKE_TOKENS) {
    if (text.includes(token)) {
      issues.push(`${relativePath}: possible mojibake token "${token}" detected`);
      break;
    }
  }

  return issues;
}

async function main() {
  const files = await walk(ROOT_DIR);
  const errors = [];

  for (const filePath of files) {
    errors.push(...(await checkFile(filePath)));
  }

  if (errors.length > 0) {
    console.error("Encoding checks failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Encoding checks passed on ${files.length} text files.`);
}

main().catch((error) => {
  console.error("Encoding check crashed:", error);
  process.exit(1);
});
