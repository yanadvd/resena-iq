import { prisma } from "@/lib/prisma";
import { syncOrganization } from "@/lib/reviews/ingest";
import { generateSummary } from "@/lib/analysis/summary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Permite ejecuciones largas en Vercel (plan Pro). Ajusta según tu infra.
export const maxDuration = 300;

/**
 * Endpoint de automatización. Lo invoca:
 *   - Vercel Cron (vercel.json -> /api/cron/sync)
 *   - El worker local node-cron (scripts/cron.ts)
 *   - Cualquier scheduler externo
 *
 * Protegido con CRON_SECRET vía header Authorization: Bearer <secret>
 * o query ?secret=<secret>.
 *
 * Recorre todas las organizaciones, sincroniza sus fuentes, ejecuta el
 * análisis IA y regenera los resúmenes. Esto alimenta el dashboard.
 */
async function handle(req: Request) {
  const secret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  const url = new URL(req.url);
  const provided =
    authHeader?.replace("Bearer ", "") ?? url.searchParams.get("secret");

  if (!secret || provided !== secret) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const orgs = await prisma.organization.findMany({
    select: { id: true, name: true },
  });

  const summary = {
    organizations: orgs.length,
    created: 0,
    analyzed: 0,
    alertsSent: 0,
    errors: 0,
  };

  for (const org of orgs) {
    try {
      const r = await syncOrganization(org.id);
      summary.created += r.created;
      summary.analyzed += r.analyzed;
      summary.alertsSent += r.alertsSent;
      if (r.created > 0) {
        await generateSummary(org.id);
      }
    } catch (err) {
      summary.errors++;
      console.error(`[cron] error en org ${org.id}:`, err);
    }
  }

  console.log("[cron] sync completado:", summary);
  return Response.json({ ok: true, ranAt: new Date().toISOString(), ...summary });
}

export async function GET(req: Request) {
  return handle(req);
}
export async function POST(req: Request) {
  return handle(req);
}
