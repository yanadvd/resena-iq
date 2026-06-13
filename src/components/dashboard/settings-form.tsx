"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Bell, Send, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  initial: {
    name: string;
    industry: string;
    website: string;
    alertEmail: string;
    alertsEnabled: boolean;
    alertRatingThreshold: number;
  };
  canCustomAlerts: boolean;
}

export function SettingsForm({ initial, canCustomAlerts }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/org", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al guardar");
      setMsg({ ok: true, text: "Cambios guardados." });
      router.refresh();
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Error" });
    } finally {
      setSaving(false);
    }
  }

  async function sendTest() {
    setTesting(true);
    setMsg(null);
    try {
      const res = await fetch("/api/alerts/test", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      setMsg({ ok: true, text: data.message });
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Error" });
    } finally {
      setTesting(false);
    }
  }

  return (
    <form onSubmit={save} className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Perfil del negocio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del negocio</Label>
            <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Sector</Label>
            <Input id="industry" value={form.industry} onChange={(e) => set("industry", e.target.value)} placeholder="Restauración, retail, salud…" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Sitio web</Label>
            <Input id="website" value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="https://tunegocio.com" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center gap-2">
          <Bell className="size-5 text-accent" />
          <CardTitle>Alertas por email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="flex items-center justify-between rounded-xl border border-border p-3">
            <span className="text-sm">Activar alertas de reseñas negativas</span>
            <input
              type="checkbox"
              checked={form.alertsEnabled}
              onChange={(e) => set("alertsEnabled", e.target.checked)}
              className="size-5 accent-[hsl(var(--primary))]"
            />
          </label>
          <div className="space-y-2">
            <Label htmlFor="alertEmail">Email de alertas</Label>
            <Input id="alertEmail" type="email" value={form.alertEmail} onChange={(e) => set("alertEmail", e.target.value)} placeholder="alertas@tunegocio.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="threshold" className="flex items-center gap-1.5">
              Avisar si la calificación es ≤
              {!canCustomAlerts && <Lock className="size-3.5 text-muted-foreground" />}
            </Label>
            <select
              id="threshold"
              value={form.alertRatingThreshold}
              disabled={!canCustomAlerts}
              onChange={(e) => set("alertRatingThreshold", Number(e.target.value))}
              className="flex h-11 w-full rounded-xl border border-input bg-secondary/40 px-4 text-sm disabled:opacity-50"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>{n} estrella{n > 1 ? "s" : ""} o menos</option>
              ))}
            </select>
            {!canCustomAlerts && (
              <p className="text-xs text-muted-foreground">
                Personalizar el umbral requiere el plan <span className="font-semibold">Business</span> (por defecto: ≤ 2★).
              </p>
            )}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={sendTest} disabled={testing}>
            {testing ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            Enviar alerta de prueba
          </Button>
        </CardContent>
      </Card>

      <div className="lg:col-span-2 flex items-center gap-4">
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Guardar cambios
        </Button>
        {msg && (
          <span className={`text-sm ${msg.ok ? "text-accent" : "text-destructive"}`}>{msg.text}</span>
        )}
      </div>
    </form>
  );
}
