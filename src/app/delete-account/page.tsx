import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { getLegalDocument } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/metadata";

export const runtime = "nodejs";

const deleteAccountEmail = "max.padelmate@gmail.com";
const deleteAccountMailtoHref = `mailto:${deleteAccountEmail}`;

export const metadata: Metadata = createPageMetadata({
  title: "Suppression de compte",
  description: "Procédure de demande de suppression de compte et de données personnelles.",
  path: "/delete-account",
});

export default async function DeleteAccountPage() {
  const document = await getLegalDocument("delete-account");

  return (
    <main id="main-content" className="container page delete-account-page">
      <section className="delete-account-panel" aria-labelledby="delete-account-title">
        <p className="eyebrow">Suppression de compte</p>
        <h1 id="delete-account-title">Supprimer mon compte PadelMate</h1>
        <p>
          Cette page explique comment demander la suppression de votre compte et de vos données
          personnelles associées.
        </p>

        <div className="delete-account-cta-card">
          <a className="button delete-account-button" href={deleteAccountMailtoHref}>
            Contacter PadelMate par e-mail
          </a>

          <p className="delete-account-fallback">
            Si le bouton ne fonctionne pas, envoyez votre demande à{" "}
            <a href={`mailto:${deleteAccountEmail}`}>{deleteAccountEmail}</a>.
          </p>
          <p className="delete-account-fallback">
            Objet recommandé : <strong>Demande de suppression de compte PadelMate</strong>.
          </p>
        </div>
      </section>

      <section className="delete-account-panel" aria-labelledby="delete-account-steps-title">
        <h2 id="delete-account-steps-title">Comment demander la suppression</h2>
        <ol className="delete-account-list">
          <li>Cliquez sur le bouton ci-dessus.</li>
          <li>
            Indiquez les informations utiles : e-mail du compte, pseudo (si besoin), plateforme.
          </li>
          <li>Envoyez votre demande depuis l&apos;adresse e-mail associée au compte si possible.</li>
        </ol>
      </section>

      <section className="delete-account-panel" aria-labelledby="delete-account-scope-title">
        <h2 id="delete-account-scope-title">Ce qui est supprimé et ce qui peut être conservé</h2>
        <p>
          La suppression du compte peut entraîner la suppression ou l&apos;anonymisation de
          certaines données, dans le respect de la politique de confidentialité et des obligations
          légales.
        </p>
        <ul className="delete-account-list">
          <li>Données de compte et profil : suppression puis archivage intermédiaire limité.</li>
          <li>Données de matchs et interactions : suppression ou archivage intermédiaire limité.</li>
          <li>Logs techniques et sécurité : conservation limitée lorsque nécessaire.</li>
          <li>Données de géolocalisation et d&apos;audience : conservation limitée selon finalité.</li>
        </ul>
        <p>
          Pour le détail complet des traitements et durées de conservation, consultez la{" "}
          <a href="/privacy">Politique de confidentialité</a> et les <a href="/terms">CGU</a>.
        </p>
      </section>

      <section className="delete-account-panel" aria-labelledby="delete-account-delay-title">
        <h2 id="delete-account-delay-title">Délais et suite de traitement</h2>
        <p>
          Une réponse vous est adressée dans les délais prévus par la réglementation applicable.
          Selon les cas, certaines données peuvent être conservées temporairement pour répondre à
          des obligations légales, de preuve ou de gestion de contentieux.
        </p>
        <p>
          En cas de difficulté persistante, vous pouvez déposer une réclamation auprès de la{" "}
          <a href="https://www.cnil.fr/" target="_blank" rel="noreferrer noopener">
            CNIL
          </a>
          .
        </p>
      </section>

      <section aria-labelledby="delete-account-legal-annex-title">
        <h2 id="delete-account-legal-annex-title" className="delete-account-annex-title">
          Annexe légale de référence
        </h2>
        <LegalDocument document={document} />
      </section>
    </main>
  );
}
