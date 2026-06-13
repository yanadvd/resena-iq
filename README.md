# ReseñaIQ — SaaS de análisis de reseñas con IA

Plataforma SaaS **completa y funcional** donde los negocios conectan sus canales
de reseñas (Google, Yelp, TripAdvisor, Trustpilot o CSV), reciben **análisis
automático con IA** (sentimiento, temas, keywords, resúmenes y puntuación de
reputación) y gestionan su reputación desde un único dashboard — con
**suscripciones mensuales reales vía Stripe**.

> Diseñado para funcionar **out-of-the-box**: si no configuras OpenAI o Resend,
> la app degrada con elegancia a un analizador NLP heurístico local y a alertas
> por consola. Así puedes probar todo el flujo sin claves de pago.

---

## ✨ Funcionalidades

| Módulo | Qué hace | Conexión real |
|---|---|---|
| **Auth** | Email+contraseña y Google OAuth (NextAuth) | Sesiones JWT, multi-tenant por organización |
| **Recopilación** | Adaptadores por plataforma + cron + import CSV | `node-cron` / Vercel Cron → pipeline de ingesta |
| **IA / NLP** | Sentimiento, temas, keywords, resumen ejecutivo, reputación 0-100 | OpenAI (GPT) con *fallback* heurístico |
| **Dashboard** | KPIs, tendencias, distribución, filtros, reseñas | Recharts + agregación en BD |
| **Reportes** | Exportación CSV real + PDF imprimible | Gated por plan |
| **Alertas** | Email automático ante reseñas negativas | Resend (o consola en dev) |
| **Suscripción** | Free / Pro / Business con Stripe Checkout, Portal y Webhooks | El plan **controla el acceso real** a cada función |

**El sistema está conectado de punta a punta:** la automatización alimenta el
dashboard con datos procesados por IA, y la suscripción de Stripe define los
límites (reseñas/mes, canales) y las funciones disponibles (export, alertas
personalizadas, reportes avanzados).

---

## 🧱 Stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript**
- **Tailwind CSS** + componentes estilo **shadcn/ui** (Radix)
- **PostgreSQL** + **Prisma ORM**
- **NextAuth.js** (Credentials + Google)
- **Stripe** (Subscriptions + Customer Portal + Webhooks)
- **OpenAI** (análisis y resúmenes) — opcional
- **node-cron** / **Vercel Cron** (automatización)
- **Resend** (emails) — opcional
- Listo para **Vercel + Supabase**

---

## 📂 Estructura

```
resena-iq/
├── prisma/
│   ├── schema.prisma          # Modelos: User, Organization, ReviewSource, Review, AnalysisSummary, Alert…
│   └── seed.ts                # Datos demo (cuenta de prueba con reseñas analizadas)
├── scripts/
│   └── cron.ts                # Worker de automatización (node-cron) para servidores propios
├── src/
│   ├── app/
│   │   ├── (auth)/            # /login y /register
│   │   ├── api/
│   │   │   ├── auth/          # NextAuth + registro
│   │   │   ├── stripe/        # checkout · portal · webhook
│   │   │   ├── reviews/       # import (CSV) · sync (manual)
│   │   │   ├── cron/sync/     # endpoint de automatización (protegido)
│   │   │   ├── sources/       # conectar/eliminar fuentes
│   │   │   ├── analysis/      # regenerar resumen IA
│   │   │   ├── reports/       # exportar CSV/PDF
│   │   │   ├── alerts/        # alerta de prueba
│   │   │   └── org/           # ajustes del negocio/alertas
│   │   ├── dashboard/         # resumen · reviews · sources · reports · settings
│   │   ├── pricing/           # página de precios pública
│   │   ├── page.tsx           # landing
│   │   ├── layout.tsx
│   │   └── globals.css        # design tokens
│   ├── components/
│   │   ├── ui/                # button, card, input, badge, progress…
│   │   ├── dashboard/         # sidebar, topbar, charts, widgets, managers…
│   │   └── marketing/         # header, footer, pricing-cards
│   ├── lib/
│   │   ├── auth.ts            # config NextAuth
│   │   ├── prisma.ts          # singleton
│   │   ├── stripe.ts          # cliente Stripe
│   │   ├── plans.ts           # ⭐ fuente de la verdad: planes, límites y features
│   │   ├── guard.ts           # requireSession / requireFeature (control de acceso)
│   │   ├── usage.ts           # cuotas (reseñas/mes, canales)
│   │   ├── openai.ts
│   │   ├── email.ts
│   │   ├── organization.ts    # bootstrap de tenant
│   │   ├── dashboard-data.ts  # agregación de métricas
│   │   ├── analysis/          # sentiment.ts · summary.ts
│   │   └── reviews/           # sources.ts (adaptadores) · ingest.ts (pipeline)
│   ├── types/next-auth.d.ts
│   └── middleware.ts          # protege /dashboard
├── .env.example
├── vercel.json                # Vercel Cron → /api/cron/sync
└── package.json
```

---

## 🚀 Instalación paso a paso (local)

### 1. Requisitos

- Node.js 18.18+ (recomendado 20+)
- PostgreSQL 14+ (local, Docker o Supabase)
- (Opcional) Cuenta de Stripe, OpenAI y Resend

### 2. Clonar e instalar

```bash
cd resena-iq
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Rellena al menos lo **mínimo para arrancar**:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/resenaiq?schema=public"
NEXTAUTH_SECRET="<openssl rand -base64 32>"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
CRON_SECRET="<un token cualquiera>"
```

> Sin OpenAI/Resend/Stripe la app funciona en modo demo. Para activar pagos,
> IA real y emails, completa las secciones correspondientes del `.env`.

#### PostgreSQL rápido con Docker (opcional)

```bash
docker run --name resenaiq-db -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=resenaiq -p 5432:5432 -d postgres:16
```

### 4. Crear el esquema y datos demo

```bash
npm run db:push      # crea las tablas en PostgreSQL
npm run db:seed      # crea una cuenta demo con reseñas ya analizadas
```

Cuenta demo creada:
- **Email:** `demo@resenaiq.com`
- **Contraseña:** `demo12345`

### 5. Arrancar

```bash
npm run dev
```

Abre **http://localhost:3000**. Entra con la cuenta demo y explora el dashboard.

### 6. Automatización (opcional, en otra terminal)

```bash
npm run worker       # node-cron: sincroniza todas las orgs cada hora
```

O dispara una sincronización manual desde el dashboard con **“Sincronizar ahora”**.

---

## 💳 Configurar Stripe (suscripciones reales)

1. En el [Dashboard de Stripe](https://dashboard.stripe.com) (modo test) crea **2 productos**:
   - **Pro** → precio recurrente **$29/mes**
   - **Business** → precio recurrente **$79/mes**
2. Copia los **Price ID** (`price_...`) y las API keys al `.env`:
   ```env
   STRIPE_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_PRICE_PRO="price_..."
   STRIPE_PRICE_BUSINESS="price_..."
   ```
3. **Webhooks en local** con la [Stripe CLI](https://stripe.com/docs/stripe-cli):
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   Copia el `whsec_...` que imprime a `STRIPE_WEBHOOK_SECRET`.
4. Activa el **Customer Portal** en Stripe → *Settings → Billing → Customer portal*.

Eventos gestionados por el webhook: `checkout.session.completed`,
`customer.subscription.created/updated/deleted`, `invoice.payment_failed`,
`invoice.payment_succeeded`. Cada uno actualiza el plan/estado de la organización.

**Tarjeta de prueba:** `4242 4242 4242 4242`, fecha futura, CVC cualquiera.

---

## 🔐 Configurar Google OAuth (opcional)

1. [Google Cloud Console](https://console.cloud.google.com) → *Credenciales* → *Crear ID de cliente OAuth*.
2. Tipo: *Aplicación web*. Redirect URI:
   `http://localhost:3000/api/auth/callback/google`
3. Copia `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` al `.env`.

---

## 🤖 Configurar OpenAI (opcional)

```env
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4o-mini"
```

Sin clave, el análisis usa un **motor heurístico local** (sentimiento por rating
+ léxico ES/EN, temas y keywords). Con clave, GPT mejora la precisión y genera
resúmenes ejecutivos en lenguaje natural.

---

## ☁️ Deploy en Vercel + Supabase

1. Crea un proyecto en **Supabase** y usa su `DATABASE_URL` (con `pgbouncer` para
   producción; añade `DIRECT_URL` si usas migraciones).
2. Importa el repo en **Vercel** y define todas las variables del `.env`.
3. `vercel.json` ya programa el cron horario → `/api/cron/sync`.
   Vercel añade automáticamente `Authorization: Bearer $CRON_SECRET` a las
   peticiones de cron, así que define `CRON_SECRET` en el entorno de Vercel.
4. Configura el webhook de Stripe apuntando a
   `https://TU-DOMINIO/api/stripe/webhook`.

---

## 🧪 Comandos útiles

```bash
npm run dev        # desarrollo
npm run build      # build de producción (genera Prisma client)
npm run start      # servir build
npm run db:studio  # explorar la BD con Prisma Studio
npm run db:migrate # crear migraciones versionadas
npm run worker     # worker de automatización (node-cron)
```

---

## 🔎 Cómo se conecta todo (flujo end-to-end)

```
Fuente (Google/Yelp/CSV)
        │  adaptador (lib/reviews/sources.ts)
        ▼
Pipeline de ingesta (lib/reviews/ingest.ts)
        │  ├─ dedupe + cuota del plan (lib/usage.ts)
        │  ├─ análisis IA/NLP (lib/analysis/sentiment.ts)
        │  └─ alerta email si es negativa (lib/email.ts) ──► Resend
        ▼
PostgreSQL (Prisma)
        │
        ├─ resumen ejecutivo (lib/analysis/summary.ts) ──► OpenAI
        ▼
Dashboard (agregación lib/dashboard-data.ts) ──► Recharts

Stripe Checkout ──► Webhook ──► Organization.plan
        │
        └─ guard.ts (requireFeature) controla export, alertas, etc.
```

---

## 📝 Notas de producción

- Los adaptadores de fuentes usan un **generador demo** determinista para que la
  automatización funcione sin credenciales externas. Para producción, sustituye
  el cuerpo de cada adaptador en `src/lib/reviews/sources.ts` por la llamada real
  a la API correspondiente (Google Places, Yelp Fusion, Trustpilot, TripAdvisor).
  **El resto del pipeline (dedupe, IA, alertas, dashboard) no cambia.**
- El scraping de algunas plataformas está sujeto a sus Términos de Servicio; usa
  sus APIs oficiales cuando sea posible.
- Validación con **Zod**, control de acceso por plan en cada endpoint sensible,
  webhooks con verificación de firma, contraseñas con **bcrypt**.

---

Hecho con ☕ y Next.js.
