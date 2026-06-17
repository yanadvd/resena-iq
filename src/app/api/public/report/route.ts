import { generatePublicReport } from "@/lib/public-report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Límite anti-abuso best-effort en memoria. En serverless no es perfecto
// (cada instancia tiene su mapa); para producción robusta usar Upstash/Redis.
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW = 60_000;
const MAX = 5;

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  const now = Date.now();
  const rec = hits.get(ip);
  if (rec && now - rec.ts < WINDOW) {
    if (rec.count >= MAX) {
      return Response.json(
        { ok: false, error: "Demasiadas consultas. Espera un minuto e inténtalo de nuevo." },
        { status: 429 }
      );
    }
    rec.count++;
  } else {
    hits.set(ip, { count: 1, ts: now });
  }

  let query = "";
  try {
    const body = await req.json();
    query = String(body.query ?? "").slice(0, 120);
  } catch {
    return Response.json({ ok: false, error: "Petición inválida." }, { status: 400 });
  }

  const result = await generatePublicReport(query);
  return Response.json(result);
}
