import type { MetadataRoute } from "next";
import { PROJECTS, SITE } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/work`, changeFrequency: "monthly", priority: 0.8 },
    ...PROJECTS.map((project) => ({
      url: `${SITE.url}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
