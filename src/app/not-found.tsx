import Link from "next/link";
import { Sparkles, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="bg-mesh absolute inset-0 -z-10 opacity-60" />

      <Link href="/" className="absolute left-6 top-6 flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </span>
        <span className="font-display font-bold">
          Repu<span className="text-primary">sense</span>
        </span>
      </Link>

      <p className="font-mono-label text-primary">ERROR 404</p>
      <h1 className="mt-4 font-display text-6xl font-semibold tracking-tight md:text-7xl">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        La página que buscas no existe o se ha movido. Comprueba la dirección o
        vuelve al inicio para seguir explorando Repusense.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/">
            <Home className="size-4" /> Volver al inicio
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/analisis-gratis">
            <Search className="size-4" /> Analizar mi negocio gratis
          </Link>
        </Button>
      </div>
    </div>
  );
}
