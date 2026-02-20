import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "PadelMate - Organisez vos matchs de padel simplement",
  description:
    "Trouvez des partenaires de niveau compatible, reperez des disponibilites de courts et jouez plus facilement avec PadelMate.",
  path: "/",
});

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero__content">
          <p className="eyebrow">PadelMate</p>
          <h1>Organisez vos matchs de padel sans friction.</h1>
          <p>
            PadelMate rassemble au meme endroit les joueurs compatibles et les disponibilites de
            courts dans vos clubs favoris.
          </p>
          <a className="button" href="#app-mobile">
            App mobile
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>PadelMate en 3 points</h2>
          <ul className="feature-grid">
            <li>
              <h3>Partenaires de niveau compatible</h3>
              <p>
                Des propositions de match plus equilibrees selon votre niveau et vos preferences.
              </p>
            </li>
            <li>
              <h3>Priorite a vos clubs favoris</h3>
              <p>
                Vous indiquez vos clubs et vos creneaux, PadelMate vous aide a trouver le bon slot.
              </p>
            </li>
            <li>
              <h3>Niveau PMR qui evolue avec vos matchs</h3>
              <p>
                Votre niveau est ajuste avec vos resultats pour fiabiliser la qualite des prochains
                matchs.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section id="app-mobile" className="section section--muted">
        <div className="container">
          <h2>Application mobile</h2>
          <p>PadelMate est actuellement disponible via l&apos;app mobile. Liens stores a venir.</p>
        </div>
      </section>
    </main>
  );
}
