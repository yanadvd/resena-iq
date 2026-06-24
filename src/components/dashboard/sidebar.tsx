"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, MessageSquareQuote, Plug, FileBarChart, Settings, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/dashboard",          label: "Vista general", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/reviews",  label: "Reseñas",       icon: MessageSquareQuote },
  { href: "/dashboard/sources",  label: "Fuentes",       icon: Plug },
  { href: "/dashboard/reports",  label: "Reportes",      icon: FileBarChart },
];

export function Sidebar({ planLabel }: { planLabel: string }) {
  const pathname = usePathname();
  const isFree = planLabel === "Free";

  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-secondary border-r border-border lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-border bg-card px-5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </span>
        <div>
          <span className="font-display text-[15px] font-bold tracking-tight text-foreground">
            Repu<span className="text-primary">sense</span>
          </span>
          <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground -mt-0.5">
            Intelligence Layer
          </p>
        </div>
      </div>

      {/* Nav principal */}
      <nav className="flex-1 space-y-0.5 p-3 pt-4">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium transition-all relative rounded-lg",
                active
                  ? "text-primary font-semibold bg-primary/10 border-r-[3px] border-primary"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
              )}
            >
              <item.icon className={cn("size-[17px] shrink-0", active && "text-primary")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: upgrade + settings */}
      <div className="p-3 border-t border-border space-y-1">
        {isFree && (
          <div className="rounded-xl bg-primary/[8%] border border-primary/20 p-3 mb-2">
            <p className="text-[11px] font-semibold text-primary mb-1">Plan {planLabel}</p>
            <p className="text-[11px] text-muted-foreground mb-2.5 leading-relaxed">
              Mejora para desbloquear reportes PDF, alertas y más canales.
            </p>
            <Button size="sm" className="w-full text-xs" asChild>
              <Link href="/dashboard/settings">Mejorar plan</Link>
            </Button>
          </div>
        )}
        {!isFree && (
          <div className="px-3 py-2 mb-1">
            <p className="text-[11px] text-muted-foreground">Plan actual</p>
            <p className="text-[13px] font-semibold text-foreground">{planLabel}</p>
          </div>
        )}
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium transition-all rounded-lg",
            pathname.startsWith("/dashboard/settings")
              ? "text-primary font-semibold bg-primary/10 border-r-[3px] border-primary"
              : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
          )}
        >
          <Settings className="size-[17px] shrink-0" />
          Suscripción
        </Link>
      </div>
    </aside>
  );
}
