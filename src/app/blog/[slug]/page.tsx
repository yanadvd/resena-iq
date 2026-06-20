import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/marketing/site-header";
import { BLOG_POSTS, getPost } from "@/content/blog";
import { BreadcrumbJsonLd } from "@/components/marketing/json-ld";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://repusense.net";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Repusense`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function BlogArticle({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Repusense" },
    publisher: { "@type": "Organization", name: "Repusense" },
    mainEntityOfPage: `${APP_URL}/blog/${post.slug}`,
  };

  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh absolute inset-0 -z-10 h-[300px] opacity-50" />
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <main className="container max-w-2xl py-14">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" /> Blog
        </Link>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
          </time>
          <span className="flex items-center gap-1"><Clock className="size-3" /> {post.readingTime}</span>
        </div>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>

        <article
          className="
            mt-10
            [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3
            [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-foreground/90 [&_p]:mb-4
            [&_ul]:mb-4 [&_ul]:space-y-2 [&_ul]:pl-1
            [&_li]:flex [&_li]:gap-2.5 [&_li]:text-[15px] [&_li]:leading-relaxed [&_li]:text-foreground/90
            [&_li]:before:content-['—'] [&_li]:before:text-accent [&_li]:before:shrink-0
            [&_a]:text-accent [&_a]:underline-offset-2 hover:[&_a]:underline
            [&_strong]:text-foreground [&_strong]:font-semibold
            [&_em]:text-muted-foreground
          "
        >
          {post.body}
        </article>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-7 text-center">
          <h3 className="font-display text-xl font-semibold">Analiza tu reputación gratis</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Mira en 30 segundos qué dicen tus clientes en Google, con IA.
          </p>
          <Link
            href="/analisis-gratis"
            className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Probar gratis
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
