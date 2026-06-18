import { z } from "zod";
import { requireSession, requireFeature, errorResponse } from "@/lib/guard";
import { prisma } from "@/lib/prisma";
import { getOpenAI, OPENAI_MODEL } from "@/lib/openai";

const schema = z.object({ reviewId: z.string().min(1) });

/**
 * Genera una respuesta pública sugerida para una reseña, con IA.
 * Funcionalidad del plan Business (feature "aiReplies"). Guarda el resultado
 * en Review.aiReply y lo devuelve.
 */
export async function POST(req: Request) {
  try {
    const ctx = await requireSession();
    requireFeature(ctx, "aiReplies");

    const { reviewId } = schema.parse(await req.json());
    const review = await prisma.review.findFirst({
      where: { id: reviewId, orgId: ctx.orgId },
    });
    if (!review) {
      return Response.json({ error: "Reseña no encontrada" }, { status: 404 });
    }

    let reply: string;
    const openai = getOpenAI();
    if (!openai) {
      // Fallback sin OpenAI: respuesta plantilla según la valoración.
      reply =
        review.rating >= 4
          ? `¡Muchas gracias por tu reseña${review.author ? `, ${review.author}` : ""}! Nos alegra enormemente que hayas tenido una buena experiencia en ${ctx.org.name}. ¡Te esperamos pronto!`
          : `Hola${review.author ? ` ${review.author}` : ""}, sentimos mucho que tu experiencia no fuera la esperada. Nos tomamos muy en serio tu comentario y nos gustaría solucionarlo: escríbenos y lo resolvemos. Gracias por ayudarnos a mejorar.`;
    } else {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              `Eres el responsable de atención al cliente de "${ctx.org.name}". ` +
              "Redacta una respuesta pública breve (2-4 frases), profesional, cercana y empática a la reseña, " +
              "en el MISMO idioma en que está escrita la reseña. " +
              "Si es negativa, discúlpate sin admitir culpa legal e invita a continuar en privado. " +
              "Si es positiva, agradece con calidez. No uses corchetes ni placeholders. " +
              "Devuelve SOLO el texto de la respuesta, sin comillas.",
          },
          {
            role: "user",
            content: `Reseña de ${review.author ?? "un cliente"} (${review.rating}★): "${review.text}"`,
          },
        ],
      });
      reply = completion.choices[0]?.message?.content?.trim() ?? "";
    }

    await prisma.review.update({
      where: { id: review.id },
      data: { aiReply: reply },
    });

    return Response.json({ ok: true, reply });
  } catch (error) {
    return errorResponse(error);
  }
}
