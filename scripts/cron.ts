/**
 * Worker de automatización para desarrollo / despliegues con servidor propio.
 *
 *   npm run worker
 *
 * Programa la sincronización periódica de todas las organizaciones llamando al
 * endpoint protegido /api/cron/sync. En Vercel se usa Vercel Cron (vercel.json)
 * en lugar de este worker.
 *
 * Variables usadas: NEXT_PUBLIC_APP_URL, CRON_SECRET, CRON_SCHEDULE (opcional).
 */
import cron from "node-cron";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const SECRET = process.env.CRON_SECRET;
// Por defecto: cada hora. Ajusta con CRON_SCHEDULE (sintaxis cron).
const SCHEDULE = process.env.CRON_SCHEDULE || "0 * * * *";

if (!SECRET) {
  console.error("[worker] Falta CRON_SECRET en el entorno. Abortando.");
  process.exit(1);
}

async function runSync() {
  const startedAt = new Date().toISOString();
  console.log(`[worker] ${startedAt} — lanzando sincronización…`);
  try {
    const res = await fetch(`${APP_URL}/api/cron/sync`, {
      method: "POST",
      headers: { Authorization: `Bearer ${SECRET}` },
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("[worker] error:", data);
      return;
    }
    console.log("[worker] resultado:", data);
  } catch (err) {
    console.error("[worker] fallo de red:", err);
  }
}

console.log(`[worker] iniciado. Programación: "${SCHEDULE}" (objetivo: ${APP_URL})`);
cron.schedule(SCHEDULE, runSync);

// Ejecuta una vez al arrancar para no esperar al primer tick.
runSync();
