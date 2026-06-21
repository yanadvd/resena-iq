import { requireSession, errorResponse } from "@/lib/guard";
import { NextRequest } from "next/server";

export interface PlaceResult {
  placeId: string;
  name: string;
  address: string;
  rating: number | null;
  totalRatings: number | null;
}

/**
 * GET /api/places/search?q=Restaurante+Aurora+Valencia
 * Busca negocios en Google Places (New) por nombre/ciudad.
 * Solo disponible para usuarios autenticados.
 */
export async function GET(req: NextRequest) {
  try {
    await requireSession();
    const q = req.nextUrl.searchParams.get("q")?.trim();
    if (!q || q.length < 3) {
      return Response.json({ places: [] });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "Google Places no configurado" }, { status: 503 });
    }

    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount",
      },
      body: JSON.stringify({ textQuery: q, languageCode: "es", maxResultCount: 5 }),
    });

    if (!res.ok) {
      console.error("[places/search] Google error:", res.status, await res.text());
      return Response.json({ places: [] });
    }

    const data = await res.json();
    const places: PlaceResult[] = (data.places ?? []).map((p: any) => ({
      placeId: p.id,
      name: p.displayName?.text ?? "",
      address: p.formattedAddress ?? "",
      rating: p.rating ?? null,
      totalRatings: p.userRatingCount ?? null,
    }));

    return Response.json({ places });
  } catch (error) {
    return errorResponse(error);
  }
}
