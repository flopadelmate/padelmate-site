import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-02-20");

  return [
    {
      url: siteConfig.siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.siteUrl}/privacy`,
      lastModified,
    },
    {
      url: `${siteConfig.siteUrl}/terms`,
      lastModified,
    },
    {
      url: `${siteConfig.siteUrl}/legal`,
      lastModified,
    },
    {
      url: `${siteConfig.siteUrl}/delete-account`,
      lastModified,
    },
  ];
}
