import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Review, Sentiment } from "@prisma/client";

export function StatCard({
  label,
  value,
  hint,
  accent,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        {Icon && <Icon className="size-4 text-muted-foreground" />}
      </div>
      <p
        className={cn(
          "mt-2 font-display text-3xl font-semibold",
          accent && "text-accent"
        )}
      >
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </Card>
  );
}

const SENTIMENT_META: Record<
  Sentiment,
  { label: string; variant: "positive" | "neutral" | "negative" }
> = {
  POSITIVE: { label: "Positiva", variant: "positive" },
  NEUTRAL: { label: "Neutra", variant: "neutral" },
  NEGATIVE: { label: "Negativa", variant: "negative" },
};

export function SentimentBadge({ sentiment }: { sentiment: Sentiment | null }) {
  if (!sentiment) return <Badge variant="secondary">Sin analizar</Badge>;
  const meta = SENTIMENT_META[sentiment];
  return <Badge variant={meta.variant}>{meta.label}</Badge>;
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < rating
              ? "fill-[hsl(var(--neutral))] text-[hsl(var(--neutral))]"
              : "text-muted-foreground/30"
          )}
        />
      ))}
    </span>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border border-border bg-card/50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate font-medium">{review.author ?? "Anónimo"}</span>
            <Stars rating={review.rating} />
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {review.source} ·{" "}
            {new Date(review.publishedAt).toLocaleDateString("es-ES")}
          </p>
        </div>
        <SentimentBadge sentiment={review.sentiment} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">
        {review.text}
      </p>
      {review.themes.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {review.themes.map((t) => (
            <span
              key={t}
              className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
