import Link from "next/link";

const legalLinks = [
  { href: "/privacy", label: "Politique de confidentialite" },
  { href: "/terms", label: "CGU / CGV" },
  { href: "/legal", label: "Mentions legales" },
  { href: "/delete-account", label: "Suppression de compte" },
];

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container site-footer__inner">
        <p className="site-footer__brand">PadelMate</p>
        <nav aria-label="Liens legaux">
          <ul className="site-footer__links">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
