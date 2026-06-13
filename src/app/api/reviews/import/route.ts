import Papa from "papaparse";
import { requireSession, errorResponse } from "@/lib/guard";
import { prisma } from "@/lib/prisma";
import { ingestRawReviews } from "@/lib/reviews/ingest";
import type { RawReview } from "@/lib/reviews/sources";

export const runtime = "nodejs";

interface CsvRow {
  author?: string;
  autor?: string;
  rating?: string;
  calificacion?: string;
  estrellas?: string;
  text?: string;
  texto?: string;
  review?: string;
  comentario?: string;
  date?: string;
  fecha?: string;
}

function pick(...vals: (string | undefined)[]): string {
  return vals.find((v) => v != null && v !== "")?.toString().trim() ?? "";
}

/**
 * Ingesta manual de reseñas vía CSV.
 * Acepta multipart/form-data (campo "file") o texto plano (body).
 * Columnas reconocidas: author/autor, rating/calificacion/estrellas,
 * text/texto/review/comentario, date/fecha.
 */
export async function POST(req: Request) {
  try {
    const ctx = await requireSession();

    let csvText = "";
    const contentType = req.headers.get("content-type") ?? "";
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const file = form.get("file");
      if (file && file instanceof File) {
        csvText = await file.text();
      }
    } else {
      csvText = await req.text();
    }

    if (!csvText.trim()) {
      return Response.json({ error: "CSV vacío" }, { status: 400 });
    }

    const parsed = Papa.parse<CsvRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim().toLowerCase(),
    });

    if (parsed.errors.length > 0) {
      console.warn("[import] errores de parseo CSV:", parsed.errors.slice(0, 3));
    }

    const now = Date.now();
    const raw: RawReview[] = [];
    parsed.data.forEach((row, i) => {
      const text = pick(row.text, row.texto, row.review, row.comentario);
      const ratingStr = pick(row.rating, row.calificacion, row.estrellas);
      const rating = Math.max(1, Math.min(5, Math.round(Number(ratingStr) || 0)));
      if (!text || !rating) return; // fila inválida

      const dateStr = pick(row.date, row.fecha);
      const publishedAt = dateStr ? new Date(dateStr) : new Date();

      raw.push({
        externalId: `csv-${now}-${i}`,
        author: pick(row.author, row.autor) || "Anónimo",
        rating,
        text,
        publishedAt: isNaN(publishedAt.getTime()) ? new Date() : publishedAt,
        language: "es",
      });
    });

    if (raw.length === 0) {
      return Response.json(
        { error: "No se encontraron filas válidas. Revisa las columnas (text, rating)." },
        { status: 400 }
      );
    }

    // Reutiliza o crea una fuente CSV para la organización.
    let source = await prisma.reviewSource.findFirst({
      where: { orgId: ctx.orgId, type: "CSV" },
    });
    if (!source) {
      source = await prisma.reviewSource.create({
        data: {
          orgId: ctx.orgId,
          type: "CSV",
          label: "Importación CSV",
          status: "CONNECTED",
        },
      });
    }

    const result = await ingestRawReviews(ctx.org, source, raw);

    return Response.json({
      ok: true,
      ...result,
      message:
        `Procesadas ${result.fetched} filas: ${result.created} importadas y analizadas` +
        (result.skippedQuota > 0
          ? `, ${result.skippedQuota} omitidas por límite del plan ${ctx.plan}`
          : "") +
        ".",
    });
  } catch (error) {
    return errorResponse(error);
  }
}
