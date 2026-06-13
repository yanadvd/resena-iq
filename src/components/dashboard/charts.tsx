"use client";

import {
  Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

const COLORS = {
  positive: "hsl(158 70% 48%)",
  neutral: "hsl(42 90% 58%)",
  negative: "hsl(350 80% 62%)",
  primary: "hsl(245 75% 65%)",
  accent: "hsl(172 80% 55%)",
  grid: "hsl(240 10% 16%)",
  muted: "hsl(240 6% 60%)",
};

const tooltipStyle = {
  background: "hsl(240 14% 10%)",
  border: "1px solid hsl(240 10% 18%)",
  borderRadius: 12,
  fontSize: 12,
  color: "#fff",
};

export interface SentimentSlice {
  name: string;
  value: number;
  key: "positive" | "neutral" | "negative";
}

export function SentimentDonut({ data }: { data: SentimentSlice[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) {
    return <EmptyChart label="Sin datos de sentimiento todavía" />;
  }
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={58}
          outerRadius={90}
          paddingAngle={3}
          stroke="none"
        >
          {data.map((d) => (
            <Cell key={d.key} fill={COLORS[d.key]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export interface TrendPoint {
  label: string;
  positive: number;
  neutral: number;
  negative: number;
}

export function TrendArea({ data }: { data: TrendPoint[] }) {
  if (data.every((d) => d.positive + d.neutral + d.negative === 0)) {
    return <EmptyChart label="Aún no hay suficientes reseñas para ver tendencias" />;
  }
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="gPos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.positive} stopOpacity={0.5} />
            <stop offset="100%" stopColor={COLORS.positive} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gNeg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.negative} stopOpacity={0.5} />
            <stop offset="100%" stopColor={COLORS.negative} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="label" stroke={COLORS.muted} fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke={COLORS.muted} fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="positive" name="Positivas" stroke={COLORS.positive} fill="url(#gPos)" strokeWidth={2} />
        <Area type="monotone" dataKey="negative" name="Negativas" stroke={COLORS.negative} fill="url(#gNeg)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export interface RatingBar {
  rating: string;
  count: number;
}

export function RatingBars({ data }: { data: RatingBar[] }) {
  if (data.every((d) => d.count === 0)) {
    return <EmptyChart label="Sin reseñas" />;
  }
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 6, right: 6, left: -24, bottom: 0 }}>
        <XAxis dataKey="rating" stroke={COLORS.muted} fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke={COLORS.muted} fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(240 10% 14%)" }} />
        <Bar dataKey="count" name="Reseñas" radius={[6, 6, 0, 0]}>
          {data.map((d, i) => (
            <Cell key={i} fill={i >= 3 ? COLORS.positive : i === 2 ? COLORS.neutral : COLORS.negative} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex h-[220px] items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
      {label}
    </div>
  );
}
