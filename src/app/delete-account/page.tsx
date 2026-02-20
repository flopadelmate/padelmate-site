import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { getLegalDocument } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/metadata";

export const runtime = "nodejs";

export const metadata: Metadata = createPageMetadata({
  title: "Suppression de compte",
  description: "Procedure de demande de suppression de compte et de donnees personnelles.",
  path: "/delete-account",
});

export default async function DeleteAccountPage() {
  const document = await getLegalDocument("delete-account");

  return (
    <main className="container page">
      <LegalDocument document={document} />
    </main>
  );
}
