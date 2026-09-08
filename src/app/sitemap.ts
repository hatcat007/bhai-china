import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data/blog-posts";
import { jewelryCases } from "@/lib/data/jewelry-cases";

const BASE_URL = "https://betterhumanai.dk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/cases", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/ai-roadmap", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/solutions", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/method", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/book", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/denmark-insights", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/logos", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/tools", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/tools/website-analyzer", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/tools/red-copywriter", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/tools/objection-handler", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/tools/provenance-story", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/tools/competitor-gap", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((r) => ({
      url: `${BASE_URL}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...jewelryCases.map((c) => ({
      url: `${BASE_URL}/cases/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogPosts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
