import "server-only";

import path from "node:path";
import { promises as fs } from "node:fs";
import matter from "gray-matter";
import type { LegalDocId, LegalDocument } from "@/types/legal";

const legalContentDirectory = path.join(process.cwd(), "content", "legal");

const legalDocFileMap: Record<LegalDocId, string> = {
  privacy: "privacy.md",
  "terms-cgu": "terms-cgu.md",
  "terms-cgv": "terms-cgv.md",
  legal: "legal.md",
  "delete-account": "delete-account.md",
};

const lastUpdatedPattern = /^\d{4}-\d{2}-\d{2}$/;

function ensureString(value: unknown, key: string, fileName: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid frontmatter "${key}" in ${fileName}.`);
  }
  return value.trim();
}

function ensureLastUpdated(value: string, fileName: string): string {
  if (!lastUpdatedPattern.test(value)) {
    throw new Error(`Invalid frontmatter "lastUpdated" in ${fileName}: expected YYYY-MM-DD.`);
  }
  return value;
}

async function readLegalDocument(id: LegalDocId): Promise<LegalDocument> {
  const fileName = legalDocFileMap[id];
  const absolutePath = path.join(legalContentDirectory, fileName);
  const fileContent = await fs.readFile(absolutePath, "utf8");
  const parsed = matter(fileContent);

  const title = ensureString(parsed.data.title, "title", fileName);
  const description = ensureString(parsed.data.description, "description", fileName);
  const lastUpdated = ensureLastUpdated(
    ensureString(parsed.data.lastUpdated, "lastUpdated", fileName),
    fileName
  );

  return {
    id,
    title,
    description,
    lastUpdated,
    body: parsed.content.trim(),
  };
}

export async function getLegalDocument(id: LegalDocId): Promise<LegalDocument> {
  return readLegalDocument(id);
}

export async function getTermsDocuments(): Promise<[LegalDocument, LegalDocument]> {
  const [cgu, cgv] = await Promise.all([
    readLegalDocument("terms-cgu"),
    readLegalDocument("terms-cgv"),
  ]);

  return [cgu, cgv];
}
