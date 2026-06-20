import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star, Bell, Bot, TrendingUp, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/marketing/site-header";

const TITLE = "Software de gestión de reseñas para restaurantes | Repusense";
const DESCRIPTION =
  "Analiza y mejora la reputación de tu restaurante con IA: centraliza tus reseñas de Google, detecta qué gusta y qué no, y recibe alertas de reseñas negativas.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/para/restaurantes" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

const BENEFITS = [
  { icon: Bot, title: "Sabe qué piensan de tu cocina", desc: "La IA detecta los platos y temas más comentados: comida, servicio, espera, precio, ambiente." },
  { icon: Bell, title: "Reacciona antes de perder clientes", desc: "Alerta inmediata por cada reseña negativa para que respondas a tiempo." },
  { icon: TrendingUp, title: "Sube tu nota en Google", desc: "Identifica qué mejorar para subir tu valoración y atraer más comensales." },
  { icon: Star, title: "Todo en un panel", desc: "Tus reseñas de Google centralizadas, con tu puntuación de reputación al día." },
];

export default function RestaurantesPage() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh absolute inset-0 -z-10 h-[600px] opacity-80" />
      <SiteHeader />

      <section className="container pt-16 pb-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <UtensilsCrossed className="size-3.5 text-accent" /> Para restaurantes y hostelería
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight md:text-6xl">
            La reputación de tu restaurante,
            <span className="block italic text-accent">bajo control</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Repusense analiza con IA las reseñas de tu restaurante en Google, te
            dice qué gusta y qué no, y te avisa de las negativas. Más reseñas
            positivas, más mesas llenas.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/analisis-gratis">Analiza tu restaurante gratis <ArrowRight className="size-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">Crear cuenta</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-5 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card/50 p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <b.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-10 text-center">
          <h2 className="font-display text-3xl font-semibold">¿Cuántas estrellas tiene tu restaurante hoy?</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Descúbrelo gratis en 30 segundos, con el análisis de IA de Repusense.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/analisis-gratis">Ver mi informe gratis <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
