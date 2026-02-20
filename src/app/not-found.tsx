import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container page">
      <h1>Page introuvable</h1>
      <p>La page demandee n&apos;existe pas ou a ete deplacee.</p>
      <p>
        <Link href="/">Retour a l&apos;accueil</Link>
      </p>
    </main>
  );
}
