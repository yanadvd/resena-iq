# 🚀 Despliegue a producción — ReseñaIQ

Guía paso a paso para poner ReseñaIQ en producción en **Vercel + Postgres gestionado**.
El proyecto ya está preparado: migraciones versionadas, pooling de BD, cabeceras
de seguridad, cron y build de despliegue.

---

## 0. Resumen de lo que ya está listo en el código

- ✅ `npm run build` ejecuta `prisma generate && prisma migrate deploy && next build`
  → cada despliegue aplica las migraciones automáticamente.
- ✅ Migración inicial en `prisma/migrations/0_init`.
- ✅ `schema.prisma` con `directUrl` (pooling para serverless).
- ✅ `vercel.json` con Vercel Cron horario → `/api/cron/sync`.
- ✅ Cabeceras de seguridad y `poweredByHeader: false` en `next.config.mjs`.
- ✅ Webhook de Stripe con verificación de firma.
- ✅ Modo degradado: sin OpenAI/Resend/Stripe la app no rompe.

---

## 1. Base de datos de producción (Postgres)

Recomendado: **Neon** o **Supabase** (free tier suficiente para empezar).

1. Crea un proyecto Postgres.
2. Copia **dos** cadenas de conexión:
   - **Pooled** (PgBouncer) → variable `DATABASE_URL`
     - Neon: la que incluye `-pooler`. Supabase: puerto **6543** + `?pgbouncer=true`.
   - **Direct** → variable `DIRECT_URL` (puerto **5432**).

> El `DIRECT_URL` es obligatorio para que `prisma migrate deploy` funcione en el build.

---

## 2. Desplegar en Vercel

### Opción A — Conectando un repositorio Git (recomendado)
1. Sube el proyecto a GitHub/GitLab (ver §6).
2. En [vercel.com](https://vercel.com) → **Add New → Project** → importa el repo.
3. Framework: **Next.js** (autodetectado). Root: `resena-iq` si está en subcarpeta.
4. Añade **todas** las variables de entorno (§4) antes del primer deploy.
5. **Deploy**.

### Opción B — Vercel CLI (sin Git)
```bash
npm i -g vercel
vercel login
cd resena-iq
vercel link          # crea el proyecto
vercel env add ...   # añade cada variable (o pégalas en el dashboard)
vercel --prod        # despliega
```

---

## 3. Dominio

- En Vercel → Project → **Settings → Domains** → añade tu dominio y configura el DNS
  (un registro `CNAME`/`A` según indique Vercel).
- Actualiza `NEXTAUTH_URL` y `NEXT_PUBLIC_APP_URL` al dominio final (https).

---

## 4. Variables de entorno (Production)

| Variable | Valor |
|---|---|
| `DATABASE_URL` | Postgres **pooled** |
| `DIRECT_URL` | Postgres **direct** |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` (uno nuevo para prod) |
| `NEXTAUTH_URL` | `https://tudominio.com` |
| `NEXT_PUBLIC_APP_URL` | `https://tudominio.com` |
| `CRON_SECRET` | token aleatorio (Vercel lo manda como Bearer al cron) |
| `OPENAI_API_KEY` | tu key de OpenAI |
| `OPENAI_MODEL` | `gpt-4o-mini` (o `gpt-4o`) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | OAuth (§5) |
| `STRIPE_SECRET_KEY` | `sk_live_...` (o `sk_test_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` del webhook de prod (§7) |
| `STRIPE_PRICE_PRO` / `STRIPE_PRICE_BUSINESS` | Price IDs |
| `RESEND_API_KEY` | API key de Resend |
| `ALERTS_FROM_EMAIL` | `alertas@tudominio.com` (dominio verificado) |

---

## 5. Google OAuth (login con Google)

1. [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → **Credentials**.
2. **Create credentials → OAuth client ID → Web application**.
3. **Authorized redirect URIs**:
   `https://tudominio.com/api/auth/callback/google`
4. Copia Client ID y Secret a las variables de entorno.
5. (Para publicar fuera de “testing”, completa la **OAuth consent screen**.)

---

## 6. Subir a Git

```bash
cd resena-iq
git init
git add .
git commit -m "ReseñaIQ - initial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/resena-iq.git
git push -u origin main
```
> El `.gitignore` ya excluye `.env`, `node_modules` y `.next`. **Nunca subas `.env`.**

---

## 7. Stripe (suscripciones)

1. Crea los **2 productos** (Pro $29/mes, Business $79/mes) con precios recurrentes;
   copia los Price IDs.
2. **Webhook de producción**: Stripe → Developers → Webhooks → **Add endpoint**:
   - URL: `https://tudominio.com/api/stripe/webhook`
   - Eventos: `checkout.session.completed`, `customer.subscription.created`,
     `customer.subscription.updated`, `customer.subscription.deleted`,
     `invoice.payment_failed`, `invoice.payment_succeeded`.
   - Copia el **Signing secret** (`whsec_...`) a `STRIPE_WEBHOOK_SECRET`.
3. Activa el **Customer Portal** (Settings → Billing → Customer portal).
4. Para cobrar de verdad, activa tu cuenta Stripe (datos de negocio) y usa `sk_live_...`.

---

## 8. Email (Resend)

1. [Resend](https://resend.com) → API Keys → crea una.
2. **Verifica tu dominio** (añade los registros DNS que te indica) para enviar desde
   `alertas@tudominio.com`. Sin dominio verificado solo puedes enviar pruebas.

---

## 9. Automatización (cron) en producción

- `vercel.json` ya programa `/api/cron/sync` cada hora.
- Define `CRON_SECRET` en Vercel: las llamadas de Vercel Cron incluyen
  `Authorization: Bearer $CRON_SECRET` automáticamente, y el endpoint las valida.
- Nota: el plan **Hobby** de Vercel limita los cron (p. ej. 1/día). Para cron horario
  necesitas **Vercel Pro**, o usa un scheduler externo (cron-job.org) llamando a
  `https://tudominio.com/api/cron/sync?secret=TU_CRON_SECRET`.

---

## 10. Post-despliegue (checklist de humo)

- [ ] La landing carga en `https://tudominio.com`.
- [ ] Registro + login (email y Google) funcionan.
- [ ] `/dashboard` carga; “Sincronizar ahora” trae reseñas y las analiza.
- [ ] Checkout de Stripe redirige y, tras pagar (tarjeta `4242…` en test), el plan
      cambia (webhook OK).
- [ ] Llega un email de alerta de prueba (Resend).
- [ ] El cron corre (revisa los logs en Vercel).

---

## Alternativa: VPS / Docker

Si prefieres servidor propio: `npm run build` + `npm run start` detrás de Nginx,
Postgres gestionado o en el mismo host, y `npm run worker` (node-cron) como servicio
para la automatización en vez de Vercel Cron.
