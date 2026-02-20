import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { getTermsDocuments } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/metadata";

export const runtime = "nodejs";

export const metadata: Metadata = createPageMetadata({
  title: "CGU et CGV",
  description: "Conditions generales d'utilisation et conditions generales de vente de PadelMate.",
  path: "/terms",
});

export default async function TermsPage() {
  const [cguDocument, cgvDocument] = await getTermsDocuments();

  return (
    <main id="main-content" className="container page">
      <section id="cgu">
        <LegalDocument document={cguDocument} />
      </section>

      <section id="cgv">
        <LegalDocument document={cgvDocument} />
      </section>
    </main>
  );
}
