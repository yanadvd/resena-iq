"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, MessageSquareQuote, Plug, FileBarChart, Settings, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Resumen", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/reviews", label: "Reseñas", icon: MessageSquareQuote },
  { href: "/dashboard/sources", label: "Fuentes", icon: Plug },
  { href: "/dashboard/reports", label: "Reportes", icon: FileBarChart },
  { href: "/dashboard/settings", label: "Suscripción", icon: Settings },
];

export function Sidebar({ planLabel }: { planLabel: string }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card/40 lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </span>
        <span className="font-display text-lg font-semibold">
          Repu<span className="text-accent">sense</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="size-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="m-4 rounded-2xl border border-border bg-secondary/50 p-4">
        <p className="text-xs text-muted-foreground">Plan actual</p>
        <p className="font-display text-lg font-semibold">{planLabel}</p>
        <Link
          href="/dashboard/settings"
          className="mt-2 inline-block text-xs font-semibold text-accent hover:underline"
        >
          Gestionar suscripción →
        </Link>
      </div>
    </aside>
  );
}
