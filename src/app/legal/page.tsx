import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { getLegalDocument } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/metadata";

export const runtime = "nodejs";

export const metadata: Metadata = createPageMetadata({
  title: "Mentions legales",
  description: "Informations legales de l'editeur du site PadelMate.",
  path: "/legal",
});

export default async function LegalPage() {
  const document = await getLegalDocument("legal");

  return (
    <main className="container page">
      <LegalDocument document={document} />
    </main>
  );
}
