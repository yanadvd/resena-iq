"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ReviewCard } from "@/components/dashboard/widgets";
import type { Review, Sentiment, SourceType } from "@prisma/client";

const SENTIMENTS: { value: Sentiment | "ALL"; label: string }[] = [
  { value: "ALL", label: "Todos" },
  { value: "POSITIVE", label: "Positivas" },
  { value: "NEUTRAL", label: "Neutras" },
  { value: "NEGATIVE", label: "Negativas" },
];

export function ReviewsExplorer({
  reviews,
  sources,
}: {
  reviews: Review[];
  sources: SourceType[];
}) {
  const [query, setQuery] = useState("");
  const [sentiment, setSentiment] = useState<Sentiment | "ALL">("ALL");
  const [source, setSource] = useState<SourceType | "ALL">("ALL");
  const [rating, setRating] = useState<number | "ALL">("ALL");

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      if (sentiment !== "ALL" && r.sentiment !== sentiment) return false;
      if (source !== "ALL" && r.source !== source) return false;
      if (rating !== "ALL" && r.rating !== rating) return false;
      if (query && !r.text.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });
  }, [reviews, sentiment, source, rating, query]);

  const chip = (active: boolean) =>
    `rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
      active
        ? "bg-primary text-primary-foreground"
        : "bg-secondary text-muted-foreground hover:text-foreground"
    }`;

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="space-y-3 rounded-2xl border border-border bg-card/50 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en el texto de las reseñas…"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase text-muted-foreground">Sentimiento:</span>
          {SENTIMENTS.map((s) => (
            <button key={s.value} className={chip(sentiment === s.value)} onClick={() => setSentiment(s.value)}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase text-muted-foreground">Estrellas:</span>
          <button className={chip(rating === "ALL")} onClick={() => setRating("ALL")}>Todas</button>
          {[5, 4, 3, 2, 1].map((n) => (
            <button key={n} className={chip(rating === n)} onClick={() => setRating(n)}>{n}★</button>
          ))}
        </div>
        {sources.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase text-muted-foreground">Fuente:</span>
            <button className={chip(source === "ALL")} onClick={() => setSource("ALL")}>Todas</button>
            {sources.map((s) => (
              <button key={s} className={chip(source === s)} onClick={() => setSource(s)}>{s}</button>
            ))}
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "reseña" : "reseñas"}
      </p>

      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No hay reseñas que coincidan con los filtros.
        </div>
      )}
    </div>
  );
}
