"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Plus, Trash2, Upload, Loader2, CheckCircle2, AlertCircle, Plug,
  Search, MapPin, Star, Building2, X, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SOURCE_META } from "@/lib/reviews/sources";
import type { PlaceResult } from "@/app/api/places/search/route";
import type { ReviewSource, SourceType } from "@prisma/client";

const CONNECTABLE: SourceType[] = ["GOOGLE", "YELP", "TRIPADVISOR", "TRUSTPILOT"];
const AVAILABLE_SOURCES: SourceType[] = ["GOOGLE"];

export function SourcesManager({
  sources,
  canAddMore,
  planName,
}: {
  sources: ReviewSource[];
  canAddMore: boolean;
  planName: string;
}) {
  const router = useRouter();
  const [type, setType] = useState<SourceType>("GOOGLE");
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [externalId, setExternalId] = useState("");
  const [adding, setAdding] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [resyncing, setResyncing] = useState<string | null>(null);

  // Google Places search state
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<PlaceResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    setSelected(null);
    setExternalId("");
    setLabel("");
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

  function selectPlace(p: PlaceResult) {
    setSelected(p);
    setExternalId(p.placeId);
    setLabel(p.name.slice(0, 200));
    setResults([]);
    setQuery(p.name);
  }

  function clearSelection() {
    setSelected(null);
    setExternalId("");
    setLabel("");
    setQuery("");
    setResults([]);
  }

  async function addSource(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setAdding(true);
    try {
      const res = await fetch("/api/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          label: (label || SOURCE_META[type].label).slice(0, 200),
          url,
          externalId: externalId || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      setMsg({
        ok: true,
        text: `Fuente conectada. ${data.ingest?.created ?? 0} reseñas importadas y analizadas.`,
      });
      setLabel("");
      setUrl("");
      setExternalId("");
      setQuery("");
      setSelected(null);
      router.refresh();
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Error" });
    } finally {
      setAdding(false);
    }
  }

  async function removeSource(id: string) {
    await fetch(`/api/sources?id=${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function resyncSource(id: string) {
    setResyncing(id);
    try {
      const res = await fetch(`/api/sources/resync?id=${id}`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      setMsg({
        ok: true,
        text: `Reimportadas ${data.ingest?.created ?? 0} reseñas en idioma original.`,
      });
      router.refresh();
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Error al reimportar" });
    } finally {
      setResyncing(null);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Connect new */}
      <Card>
        <CardHeader>
          <CardTitle>Conectar una fuente</CardTitle>
        </CardHeader>
        <CardContent>
          {!canAddMore ? (
            <div className="rounded-xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
              Has alcanzado el límite de canales del plan {planName}.{" "}
              <a href="/dashboard/settings" className="font-semibold text-primary hover:underline">
                Mejora tu plan
              </a>{" "}
              para conectar más.
            </div>
          ) : (
            <form onSubmit={addSource} className="space-y-4">
              {/* Platform selector */}
              <div className="space-y-2">
                <Label>Plataforma</Label>
                <div className="grid grid-cols-2 gap-2">
                  {CONNECTABLE.map((t) => {
                    const available = AVAILABLE_SOURCES.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        disabled={!available}
                        title={available ? undefined : "Disponible próximamente"}
                        onClick={() => {
                          if (available) {
                            setType(t);
                            clearSelection();
                          }
                        }}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                          type === t
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border text-muted-foreground hover:bg-secondary"
                        } ${!available ? "cursor-not-allowed opacity-50 hover:bg-transparent" : ""}`}
                      >
                        <span className="size-2.5 rounded-full" style={{ background: SOURCE_META[t].color }} />
                        <span className="truncate">{SOURCE_META[t].label}</span>
                        {!available && (
                          <span className="ml-auto shrink-0 rounded bg-secondary px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                            Pronto
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Google: buscador de negocio */}
              {type === "GOOGLE" && (
                <div className="space-y-2">
                  <Label>Busca tu negocio</Label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(e) => handleQueryChange(e.target.value)}
                      placeholder="Nombre del negocio + ciudad…"
                      className="pl-9 pr-9"
                      disabled={!!selected}
                    />
                    {selected && (
                      <button
                        type="button"
                        onClick={clearSelection}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                    {searching && !selected && (
                      <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
                    )}
                  </div>

                  {/* Resultados del buscador */}
                  {results.length > 0 && !selected && (
                    <div className="space-y-1.5">
                      {results.map((p) => (
                        <button
                          key={p.placeId}
                          type="button"
                          onClick={() => selectPlace(p)}
                          className="w-full rounded-xl border border-border bg-card/60 p-3 text-left transition-all hover:border-primary/50 hover:bg-card"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-start gap-2.5">
                              <Building2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">{p.name}</p>
                                <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
                                  <MapPin className="size-3 shrink-0" /> {p.address}
                                </p>
                              </div>
                            </div>
                            {p.rating && (
                              <span className="shrink-0 flex items-center gap-1 rounded-lg bg-secondary/60 px-2 py-1 text-xs font-semibold">
                                <Star className="size-3 fill-current text-[hsl(var(--neutral))]" />
                                {p.rating.toFixed(1)}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {query.length >= 3 && !searching && results.length === 0 && !selected && (
                    <p className="rounded-xl border border-border bg-card/50 p-3 text-center text-xs text-muted-foreground">
                      No encontramos resultados. Prueba con más detalle: nombre + ciudad.
                    </p>
                  )}

                  {/* Negocio seleccionado */}
                  {selected && (
                    <div className="flex items-center gap-2.5 rounded-xl border border-primary/40 bg-primary/5 p-3">
                      <CheckCircle2 className="size-4 shrink-0 text-primary" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{selected.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{selected.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Etiqueta personalizada (opcional) */}
              <div className="space-y-2">
                <Label htmlFor="label">
                  Etiqueta{" "}
                  <span className="text-muted-foreground font-normal">(opcional)</span>
                </Label>
                <Input
                  id="label"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder={
                    selected
                      ? selected.name
                      : `${SOURCE_META[type].label} - Sucursal Centro`
                  }
                />
              </div>

              {/* URL opcional */}
              <div className="space-y-2">
                <Label htmlFor="url">
                  URL del perfil{" "}
                  <span className="text-muted-foreground font-normal">(opcional)</span>
                </Label>
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <Button type="submit" disabled={adding} className="w-full">
                {adding ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                Conectar y sincronizar
              </Button>

              {msg && (
                <p className={`flex items-center gap-1.5 text-sm ${msg.ok ? "text-primary" : "text-destructive"}`}>
                  {msg.ok ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
                  {msg.text}
                </p>
              )}
            </form>
          )}
        </CardContent>
      </Card>

      {/* CSV import */}
      <CsvImport />

      {/* Connected list */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Fuentes conectadas</CardTitle>
        </CardHeader>
        <CardContent>
          {msg && (
            <p className={`mb-4 flex items-center gap-1.5 text-sm ${msg.ok ? "text-primary" : "text-destructive"}`}>
              {msg.ok ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
              {msg.text}
            </p>
          )}
          {sources.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aún no has conectado ninguna fuente.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {sources.map((s) => (
                <li key={s.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-9 items-center justify-center rounded-lg"
                      style={{ background: `${SOURCE_META[s.type].color}22` }}
                    >
                      <Plug className="size-4" style={{ color: SOURCE_META[s.type].color }} />
                    </span>
                    <div>
                      <p className="font-medium">{s.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {SOURCE_META[s.type].label}
                        {s.lastSyncedAt
                          ? ` · sincronizado ${new Date(s.lastSyncedAt).toLocaleDateString("es-ES")}`
                          : " · sin sincronizar"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => resyncSource(s.id)}
                      disabled={resyncing === s.id}
                      title="Reimportar reseñas en idioma original"
                    >
                      {resyncing === s.id
                        ? <Loader2 className="size-4 animate-spin text-muted-foreground" />
                        : <RefreshCw className="size-4 text-muted-foreground" />
                      }
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSource(s.id)}
                      title="Eliminar fuente"
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function CsvImport() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMsg(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/reviews/import", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al importar");
      setMsg({ ok: true, text: data.message });
      router.refresh();
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Error" });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <Card id="import">
      <CardHeader>
        <CardTitle>Importar reseñas (CSV)</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Sube un CSV con columnas <code className="text-foreground">author</code>,{" "}
          <code className="text-foreground">rating</code>,{" "}
          <code className="text-foreground">text</code>,{" "}
          <code className="text-foreground">date</code>. Se analizarán
          automáticamente con IA.
        </p>
        <input ref={fileRef} type="file" accept=".csv,text/csv" onChange={handleFile} className="hidden" />
        <Button
          variant="outline"
          className="w-full"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          Seleccionar archivo CSV
        </Button>
        {msg && (
          <p className={`mt-3 flex items-center gap-1.5 text-sm ${msg.ok ? "text-primary" : "text-destructive"}`}>
            {msg.ok ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
            {msg.text}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
