import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/content/blog";

const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://repusense.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/analisis-gratis", priority: 0.9 },
    { path: "/pricing", priority: 0.8 },
    // Landings verticales
    { path: "/para-restaurantes", priority: 0.7 },
    { path: "/para-agencias", priority: 0.7 },
    { path: "/para-clinicas", priority: 0.7 },
    { path: "/para-hoteles", priority: 0.7 },
    { path: "/para-franquicias", priority: 0.7 },
    { path: "/para-gimnasios", priority: 0.7 },
    { path: "/blog", priority: 0.6 },
    { path: "/register", priority: 0.5 },
    { path: "/privacidad", priority: 0.2 },
    { path: "/terminos", priority: 0.2 },
  ];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r.priority,
  }));

  const blog: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...routes, ...blog];
}
