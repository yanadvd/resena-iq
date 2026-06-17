"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Plus, Trash2, Upload, Loader2, CheckCircle2, AlertCircle, Plug,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SOURCE_META } from "@/lib/reviews/sources";
import type { ReviewSource, SourceType } from "@prisma/client";

const CONNECTABLE: SourceType[] = ["GOOGLE", "YELP", "TRIPADVISOR", "TRUSTPILOT"];
// Plataformas con integración real activa. El resto se muestran como "Pronto".
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

  async function addSource(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setAdding(true);
    try {
      const res = await fetch("/api/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, label: label || SOURCE_META[type].label, url, externalId }),
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
              <a href="/dashboard/settings" className="font-semibold text-accent hover:underline">
                Mejora tu plan
              </a>{" "}
              para conectar más.
            </div>
          ) : (
            <form onSubmit={addSource} className="space-y-4">
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
                        onClick={() => available && setType(t)}
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
              <div className="space-y-2">
                <Label htmlFor="label">Etiqueta</Label>
                <Input id="label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder={`${SOURCE_META[type].label} - Sucursal Centro`} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL del perfil (opcional)</Label>
                <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
              </div>
              {(type === "GOOGLE" || type === "YELP") && (
                <div className="space-y-2">
                  <Label htmlFor="extId">
                    {type === "GOOGLE" ? "Place ID de Google" : "Business ID / alias de Yelp"}
                  </Label>
                  <Input
                    id="extId"
                    value={externalId}
                    onChange={(e) => setExternalId(e.target.value)}
                    placeholder={type === "GOOGLE" ? "ChIJ..." : "restaurant-shusui-venray"}
                  />
                  <p className="text-xs text-muted-foreground">
                    {type === "GOOGLE" ? (
                      <>
                        Pégalo desde el{" "}
                        <a
                          href="https://developers.google.com/maps/documentation/places/web-service/place-id"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          buscador de Place ID
                        </a>{" "}
                        de Google (de un negocio con ficha). Necesario para reseñas reales.
                      </>
                    ) : (
                      "El ID o alias del negocio en Yelp (aparece en la URL de su ficha). Yelp solo expone ~3 reseñas. Necesario para reseñas reales."
                    )}
                  </p>
                </div>
              )}
              <Button type="submit" disabled={adding} className="w-full">
                {adding ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                Conectar y sincronizar
              </Button>
              {msg && (
                <p className={`flex items-center gap-1.5 text-sm ${msg.ok ? "text-accent" : "text-destructive"}`}>
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
          {sources.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aún no has conectado ninguna fuente.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {sources.map((s) => (
                <li key={s.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg" style={{ background: `${SOURCE_META[s.type].color}22` }}>
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
                  <Button variant="ghost" size="icon" onClick={() => removeSource(s.id)} title="Eliminar fuente">
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
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
        <Button variant="outline" className="w-full" disabled={uploading} onClick={() => fileRef.current?.click()}>
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          Seleccionar archivo CSV
        </Button>
        {msg && (
          <p className={`mt-3 flex items-center gap-1.5 text-sm ${msg.ok ? "text-accent" : "text-destructive"}`}>
            {msg.ok ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
            {msg.text}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
