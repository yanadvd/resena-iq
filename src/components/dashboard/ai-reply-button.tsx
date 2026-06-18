"use client";

import { useState } from "react";
import { Sparkles, Loader2, Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AiReplyButton({
  reviewId,
  initialReply,
}: {
  reviewId: string;
  initialReply?: string | null;
}) {
  const [reply, setReply] = useState(initialReply ?? "");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/reviews/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo generar la respuesta");
      setReply(data.reply);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  function copy() {
    navigator.clipboard.writeText(reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-3 border-t border-border pt-3">
      {!reply ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={generate}
          disabled={loading}
          className="h-8 px-2 text-xs text-accent hover:text-accent"
        >
          {loading ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Sparkles className="size-3.5" />
          )}
          Sugerir respuesta con IA
        </Button>
      ) : (
        <div className="rounded-lg bg-secondary/40 p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-accent">
              <Sparkles className="size-3.5" /> Respuesta sugerida
            </span>
            <button
              type="button"
              onClick={copy}
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {copied ? <Check className="size-3.5 text-accent" /> : <Copy className="size-3.5" />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{reply}</p>
          <button
            type="button"
            onClick={generate}
            disabled={loading}
            className="mt-2 flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <RefreshCw className={`size-3 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Generando…" : "Regenerar"}
          </button>
        </div>
      )}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
