import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { LegalDocument as LegalDocumentType } from "@/types/legal";

type LegalDocumentProps = {
  document: LegalDocumentType;
  headingLevel?: 1 | 2;
};

export default function LegalDocument({ document, headingLevel = 1 }: LegalDocumentProps) {
  const HeadingTag = headingLevel === 1 ? "h1" : "h2";

  return (
    <article className="legal-document">
      <header className="legal-document__header">
        <HeadingTag>{document.title}</HeadingTag>
        <p>{document.description}</p>
        <p className="legal-document__meta">Dernière mise à jour : {document.lastUpdated}</p>
      </header>
      <div className="legal-document__content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{document.body}</ReactMarkdown>
      </div>
    </article>
  );
}
