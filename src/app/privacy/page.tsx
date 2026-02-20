import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { getLegalDocument } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/metadata";

export const runtime = "nodejs";

export const metadata: Metadata = createPageMetadata({
  title: "Politique de confidentialite",
  description: "Informations sur la collecte, l'usage et la protection des donnees personnelles.",
  path: "/privacy",
});

export default async function PrivacyPage() {
  const document = await getLegalDocument("privacy");

  return (
    <main className="container page">
      <LegalDocument document={document} />
    </main>
  );
}
