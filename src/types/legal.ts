export type LegalDocId = "privacy" | "terms-cgu" | "terms-cgv" | "legal" | "delete-account";

export type LegalFrontmatter = {
  title: string;
  description: string;
  lastUpdated: string;
};

export type LegalDocument = LegalFrontmatter & {
  id: LegalDocId;
  body: string;
};
