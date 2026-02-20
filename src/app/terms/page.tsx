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
    <main className="container page">
      <header className="terms-header">
        <h1>CGU et CGV</h1>
        <p>
          Cette URL canonique regroupe les deux documents. Des URLs dediees peuvent etre ajoutees
          plus tard (ex: /terms/cgu et /terms/cgv) sans casser /terms.
        </p>
      </header>

      <section id="cgu">
        <LegalDocument document={cguDocument} headingLevel={2} />
      </section>

      <section id="cgv">
        <LegalDocument document={cgvDocument} headingLevel={2} />
      </section>
    </main>
  );
}
