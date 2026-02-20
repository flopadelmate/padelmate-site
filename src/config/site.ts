const defaultSiteUrl = "https://www.padelmate.com";
const defaultWebAppUrl = "https://app.padelmate.com";

function normalizeUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function resolvePublicUrl(candidate: string | undefined, fallback: string): string {
  const normalizedFallback = normalizeUrl(fallback);
  const value = candidate?.trim() ? candidate.trim() : normalizedFallback;

  try {
    const parsedUrl = new URL(value);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return normalizedFallback;
    }

    return normalizeUrl(parsedUrl.toString());
  } catch {
    return normalizedFallback;
  }
}

export const siteConfig = {
  name: "PadelMate",
  description:
    "PadelMate simplifie l'organisation de vos matchs de padel: partenaires de niveau compatible, disponibilite des courts, suivi du niveau PMR.",
  siteUrl: resolvePublicUrl(process.env.NEXT_PUBLIC_SITE_URL, defaultSiteUrl),
  webAppUrl: resolvePublicUrl(process.env.NEXT_PUBLIC_WEB_APP_URL, defaultWebAppUrl),
};
