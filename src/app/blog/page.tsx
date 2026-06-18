import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/marketing/site-header";
import { BLOG_POSTS } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog — Reputación online y reseñas | Repusense",
  description:
    "Consejos prácticos para gestionar tu reputación online, conseguir más reseñas positivas y responder a las negativas.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh absolute inset-0 -z-10 h-[360px] opacity-60" />
      <SiteHeader />

      <main className="container max-w-3xl py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Blog</p>
        <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
          Reputación online sin secretos
        </h1>
        <p className="mt-4 text-muted-foreground">
          Guías prácticas para conseguir más reseñas, responder mejor y hacer
          crecer tu negocio.
        </p>

        <div className="mt-12 space-y-4">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group block rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-primary/40 hover:bg-card"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <time dateTime={p.date}>
                  {new Date(p.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                </time>
                <span className="flex items-center gap-1"><Clock className="size-3" /> {p.readingTime}</span>
              </div>
              <h2 className="mt-2 font-display text-xl font-semibold transition-colors group-hover:text-accent">
                {p.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                Leer <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
