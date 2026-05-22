import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteContent();

  return [
    {
      url: site.meta.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
