import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { LegalDocument as LegalDocumentType } from "@/types/legal";

type LegalDocumentProps = {
  document: LegalDocumentType;
};

export default function LegalDocument({ document }: LegalDocumentProps) {
  return (
    <article className="legal-document">
      <div className="legal-document__content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{document.body}</ReactMarkdown>
      </div>
    </article>
  );
}
