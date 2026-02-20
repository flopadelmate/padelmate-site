import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "PadelMate",
    template: "%s | PadelMate",
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: "PadelMate",
    title: "PadelMate",
    description: siteConfig.description,
    url: siteConfig.siteUrl,
  },
  twitter: {
    card: "summary",
    title: "PadelMate",
    description: siteConfig.description,
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body>
        <div className="site-shell">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
