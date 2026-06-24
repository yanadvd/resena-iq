import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <span className="font-display text-[15px] font-bold tracking-tight">
            Repu<span className="text-primary">sense</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-[13px] text-muted-foreground md:flex">
          <Link
            href="/analisis-gratis"
            className="font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Análisis gratis
          </Link>
          <a href="/#features" className="transition-colors hover:text-foreground">
            Funcionalidades
          </a>
          <a href="/#how" className="transition-colors hover:text-foreground">
            Cómo funciona
          </a>
          <Link href="/pricing" className="transition-colors hover:text-foreground">
            Precios
          </Link>
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button variant="brand" size="sm" asChild>
            <Link href="/register">Empezar gratis</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container flex flex-col items-center justify-between gap-6 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <span className="font-display font-bold text-foreground">
            Repusense
          </span>
          <span className="ml-2">© {new Date().getFullYear()}</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link href="/analisis-gratis" className="hover:text-foreground">Análisis gratis</Link>
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
          <Link href="/pricing" className="hover:text-foreground">Precios</Link>
          <Link href="/login" className="hover:text-foreground">Entrar</Link>
          <Link href="/privacidad" className="hover:text-foreground">Privacidad</Link>
          <Link href="/terminos" className="hover:text-foreground">Términos</Link>
        </nav>
      </div>
    </footer>
  );
}
