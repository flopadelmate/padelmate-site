const defaultSiteUrl = "https://www.padelmate.com";
const defaultWebAppUrl = "https://app.padelmate.com";

function normalizeUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export const siteConfig = {
  name: "PadelMate",
  description:
    "PadelMate simplifie l'organisation de vos matchs de padel: partenaires de niveau compatible, disponibilité des courts, suivi du niveau PMR.",
  siteUrl: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl),
  webAppUrl: normalizeUrl(process.env.NEXT_PUBLIC_WEB_APP_URL ?? defaultWebAppUrl),
};
