import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://repusense.net";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // El área privada, las APIs y las páginas de auth no deben indexarse.
      disallow: ["/dashboard", "/api/", "/login", "/register"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
