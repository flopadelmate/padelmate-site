import { promises as fs } from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import matter from "gray-matter";
import { siteConfig } from "@/config/site";

const legalContentDirectory = path.join(process.cwd(), "content", "legal");
const lastUpdatedPattern = /^\d{4}-\d{2}-\d{2}$/;

async function resolveLastModifiedFromLegalContent(): Promise<Date> {
  try {
    const entries = await fs.readdir(legalContentDirectory, { withFileTypes: true });
    const lastUpdatedDates: Date[] = [];

    for (const entry of entries) {
      if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== ".md") {
        continue;
      }

      const absolutePath = path.join(legalContentDirectory, entry.name);
      const fileContent = await fs.readFile(absolutePath, "utf8");
      const parsed = matter(fileContent);
      const lastUpdated = parsed.data.lastUpdated;

      if (typeof lastUpdated !== "string" || !lastUpdatedPattern.test(lastUpdated)) {
        continue;
      }

      const date = new Date(`${lastUpdated}T00:00:00.000Z`);
      if (!Number.isNaN(date.getTime())) {
        lastUpdatedDates.push(date);
      }
    }

    if (lastUpdatedDates.length === 0) {
      return new Date();
    }

    return new Date(Math.max(...lastUpdatedDates.map((date) => date.getTime())));
  } catch {
    return new Date();
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = await resolveLastModifiedFromLegalContent();

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
