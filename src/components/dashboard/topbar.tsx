"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar({
  title,
  userEmail,
}: {
  title: string;
  userEmail: string | null;
}) {
  const router = useRouter();
  const [syncing, setSyncing] = useState(false);
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleSync() {
    setSyncing(true);
    setMsg(null);
    try {
      const res = await fetch("/api/reviews/sync", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al sincronizar");
      setMsg(
        `${data.created} nuevas · ${data.analyzed} analizadas` +
          (data.alertsSent ? ` · ${data.alertsSent} alertas` : "")
      );
      setDone(true);
      setTimeout(() => setDone(false), 2500);
      router.refresh();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Error");
    } finally {
      setSyncing(false);
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
      <div>
        <h1 className="font-display text-xl font-semibold">{title}</h1>
        {msg && <p className="text-xs text-accent">{msg}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleSync} disabled={syncing}>
          {done ? (
            <Check className="size-4 text-accent" />
          ) : (
            <RefreshCw className={`size-4 ${syncing ? "animate-spin" : ""}`} />
          )}
          {syncing ? "Sincronizando…" : "Sincronizar ahora"}
        </Button>
        <span className="hidden text-sm text-muted-foreground md:inline">
          {userEmail}
        </span>
        <Button
          variant="ghost"
          size="icon"
          title="Cerrar sesión"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
