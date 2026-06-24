"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search, MapPin, Star, Loader2, CheckCircle2, ArrowRight,
  Sparkles, AlertCircle, Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { PlaceResult } from "@/app/api/places/search/route";

// ─── tipos locales ────────────────────────────────────────────────────────────
type Step = "welcome" | "search" | "syncing" | "done";

interface Props {
  userName: string;
  orgName: string;
}

// ─── componente principal ─────────────────────────────────────────────────────
export function OnboardingWizard({ userName, orgName }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("welcome");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<PlaceResult | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ count: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── búsqueda debounced ───────────────────────────────────────────────────
  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    setSelected(null);
    setError(null);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim().length < 3) { setResults([]); return; }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/places/search?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        setResults(data.places ?? []);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 500);
  }, []);

  // ─── conectar + sincronizar ───────────────────────────────────────────────
  async function connectAndSync() {
    if (!selected) return;
    setSyncing(true);
    setError(null);
    setStep("syncing");
    try {
      const res = await fetch("/api/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "GOOGLE",
          label: selected.name.slice(0, 200),
          externalId: selected.placeId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al conectar");
      setSyncResult({ count: data.ingest?.created ?? 0 });
      setStep("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
      setStep("search");
    } finally {
      setSyncing(false);
    }
  }

  // ─── render por paso ──────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      {/* Indicador de pasos */}
      <div className="mb-10 flex items-center gap-3">
        {(["welcome", "search", "syncing", "done"] as Step[]).map((s, i) => {
          const idx = ["welcome", "search", "syncing", "done"].indexOf(step);
          const thisIdx = i;
          const done = idx > thisIdx;
          const active = idx === thisIdx;
          return (
            <div key={s} className="flex items-center gap-3">
              {i > 0 && (
                <span className={`h-px w-8 transition-colors ${done ? "bg-accent" : "bg-border"}`} />
              )}
              <span
                className={`flex size-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  done
                    ? "bg-accent text-accent-foreground"
                    : active
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground"
                }`}
              >
                {done ? <CheckCircle2 className="size-4" /> : i + 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Paso 1: Bienvenida ── */}
      {step === "welcome" && (
        <div className="w-full max-w-md text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <Sparkles className="size-8 text-primary" />
          </span>
          <h1 className="mt-6 font-display text-3xl font-semibold">
            Bienvenido/a, {userName.split(" ")[0]}
          </h1>
          <p className="mt-3 text-muted-foreground">
            Tu cuenta está lista. En menos de 2 minutos tendrás las reseñas de
            Google de <strong className="text-foreground">{orgName}</strong>{" "}
            analizadas con IA.
          </p>
          <div className="mt-8 space-y-3 rounded-2xl border border-border bg-card/50 p-5 text-left text-sm">
            {[
              "Busca tu negocio por nombre — sin Place IDs, sin tecnicismos.",
              "Importamos tus reseñas de Google automáticamente.",
              "La IA las analiza y te muestra puntos fuertes y mejoras.",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{t}</span>
              </div>
            ))}
          </div>
          <Button size="lg" className="mt-8 w-full" onClick={() => setStep("search")}>
            Empezar <ArrowRight className="size-4" />
          </Button>
        </div>
      )}

      {/* ── Paso 2: Buscar negocio ── */}
      {step === "search" && (
        <div className="w-full max-w-lg">
          <div className="text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10">
              <Search className="size-6 text-primary" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-semibold">
              Busca tu negocio en Google
            </h2>
            <p className="mt-2 text-muted-foreground">
              Escribe el nombre y la ciudad. Lo encontramos nosotros.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                autoFocus
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Ej: Café Aurora Valencia, Clínica Dental López Madrid…"
                className="h-12 pl-10 pr-4 text-base"
              />
              {searching && (
                <Loader2 className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
              )}
            </div>

            {/* Resultados */}
            {results.length > 0 && (
              <div className="space-y-2">
                {results.map((p) => (
                  <button
                    key={p.placeId}
                    type="button"
                    onClick={() => setSelected(p)}
                    className={`w-full rounded-xl border p-4 text-left transition-all ${
                      selected?.placeId === p.placeId
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card/50 hover:border-primary/50 hover:bg-card"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <Building2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{p.name}</p>
                          <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                            <MapPin className="size-3 shrink-0" /> {p.address}
                          </p>
                        </div>
                      </div>
                      {p.rating && (
                        <span className="shrink-0 flex items-center gap-1 rounded-lg bg-secondary/60 px-2 py-1 text-xs font-semibold">
                          <Star className="size-3 fill-current text-[hsl(var(--neutral))]" />
                          {p.rating.toFixed(1)}
                          {p.totalRatings ? (
                            <span className="font-normal text-muted-foreground">
                              ({p.totalRatings})
                            </span>
                          ) : null}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {query.length >= 3 && !searching && results.length === 0 && (
              <p className="rounded-xl border border-border bg-card/50 p-4 text-center text-sm text-muted-foreground">
                No encontramos resultados. Prueba con más detalle: nombre + ciudad.
              </p>
            )}

            {error && (
              <p className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="size-4 shrink-0" /> {error}
              </p>
            )}
          </div>

          <Button
            size="lg"
            className="mt-6 w-full"
            disabled={!selected || syncing}
            onClick={connectAndSync}
          >
            {syncing ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <CheckCircle2 className="size-4" />
            )}
            Conectar {selected ? `"${selected.name}"` : "negocio"}
          </Button>
        </div>
      )}

      {/* ── Paso 3: Sincronizando ── */}
      {step === "syncing" && (
        <div className="w-full max-w-md text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <Loader2 className="size-8 animate-spin text-primary" />
          </span>
          <h2 className="mt-6 font-display text-2xl font-semibold">
            Importando tus reseñas…
          </h2>
          <p className="mt-3 text-muted-foreground">
            Estamos descargando y analizando con IA las reseñas de{" "}
            <strong className="text-foreground">{selected?.name}</strong>.
            Esto solo tarda unos segundos.
          </p>
          <div className="mt-8 space-y-3 text-sm text-muted-foreground">
            {["Conectando con Google…", "Descargando reseñas…", "Analizando sentimiento con IA…"].map(
              (t) => (
                <div key={t} className="flex items-center justify-center gap-2">
                  <Loader2 className="size-3 animate-spin" /> {t}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* ── Paso 4: Listo ── */}
      {step === "done" && (
        <div className="w-full max-w-md text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-accent/15">
            <CheckCircle2 className="size-8 text-accent" />
          </span>
          <h2 className="mt-6 font-display text-3xl font-semibold">
            ¡Todo listo!
          </h2>
          <p className="mt-3 text-muted-foreground">
            Hemos importado{" "}
            <strong className="text-foreground">
              {syncResult?.count ?? 0} reseñas
            </strong>{" "}
            de <strong className="text-foreground">{selected?.name}</strong> y
            la IA ya las ha analizado.
          </p>
          <div className="mt-8 space-y-3 rounded-2xl border border-border bg-card/50 p-5 text-left text-sm">
            {[
              "Tu puntuación de reputación calculada.",
              "Análisis de sentimiento y temas clave.",
              "Alertas activas para nuevas reseñas negativas.",
            ].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <CheckCircle2 className="size-4 shrink-0 text-accent" />
                <span className="text-muted-foreground">{t}</span>
              </div>
            ))}
          </div>
          <Button
            size="lg"
            className="mt-8 w-full"
            onClick={() => router.push("/dashboard")}
          >
            Ver mi dashboard <ArrowRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
