import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/marketing/site-header";

/**
 * Envoltorio con estilo "documento legal": cabecera, artículo con tipografía
 * cuidada (vía selectores de hijo de Tailwind) y pie. Reutilizado por las
 * páginas /privacidad y /terminos.
 */
export function LegalShell({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh absolute inset-0 -z-10 h-[360px] opacity-60" />
      <SiteHeader />

      <main className="container max-w-3xl py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Volver al inicio
        </Link>

        <h1 className="font-display text-4xl font-semibold md:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Última actualización: {lastUpdated}
        </p>

        <article
          className="
            mt-10
            [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:scroll-mt-24
            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-7 [&_h3]:mb-2
            [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_p]:mb-4
            [&_ul]:mb-4 [&_ul]:space-y-2 [&_ul]:pl-1
            [&_li]:flex [&_li]:gap-2.5 [&_li]:text-[15px] [&_li]:leading-relaxed [&_li]:text-muted-foreground
            [&_li]:before:content-['—'] [&_li]:before:text-accent [&_li]:before:shrink-0
            [&_a]:text-accent [&_a]:underline-offset-2 hover:[&_a]:underline
            [&_strong]:text-foreground [&_strong]:font-semibold
            [&_table]:w-full [&_table]:my-6 [&_table]:text-sm [&_table]:border-collapse
            [&_th]:border [&_th]:border-border [&_th]:bg-secondary/50 [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold
            [&_td]:border [&_td]:border-border [&_td]:p-3 [&_td]:text-muted-foreground [&_td]:align-top
          "
        >
          {children}
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
