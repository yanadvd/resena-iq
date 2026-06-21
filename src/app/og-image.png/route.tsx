import { ImageResponse } from "next/og";

type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type OgFont = { name: string; data: ArrayBuffer; weight?: Weight; style?: "normal" | "italic" };

export const runtime = "edge";

const W = 1200;
const H = 630;

const BG = "#0b0c14";
const CARD = "#13141f";
const PRIMARY = "#7c7cf8";
const ACCENT = "#2dd9c2";
const FG = "#f0f0f5";
const MUTED = "#7e7e96";
const BORDER = "#1e1f2e";

export async function GET() {
  try {
    // Carga las fuentes de Google Fonts con timeout
    let fraunces: ArrayBuffer | null = null;
    let manrope: ArrayBuffer | null = null;
    try {
      const [fr, ma] = await Promise.all([
        fetch(
          "https://fonts.gstatic.com/s/fraunces/v31/6NUt8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnDiw.woff",
          { signal: AbortSignal.timeout(4000) }
        ).then((r) => r.arrayBuffer()),
        fetch(
          "https://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59E-_F87jxeN8.woff",
          { signal: AbortSignal.timeout(4000) }
        ).then((r) => r.arrayBuffer()),
      ]);
      fraunces = fr;
      manrope = ma;
    } catch {
      // Continúa sin fuentes personalizadas (usa sans-serif del sistema)
    }

    const fonts: OgFont[] = [];
    if (fraunces) fonts.push({ name: "Fraunces", data: fraunces, weight: 700, style: "italic" });
    if (manrope)  fonts.push({ name: "Manrope",  data: manrope,  weight: 500, style: "normal" });

    const displayFont = fraunces ? "Fraunces" : "serif";
    const bodyFont   = manrope   ? "Manrope"  : "sans-serif";

    return new ImageResponse(
      (
        <div
          style={{
            width: W,
            height: H,
            background: BG,
            display: "flex",
            flexDirection: "column",
            padding: "56px 64px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow superior izquierdo */}
          <div
            style={{
              position: "absolute",
              top: -200,
              left: -150,
              width: 650,
              height: 650,
              borderRadius: 9999,
              background: `radial-gradient(circle, rgba(124,124,248,0.14) 0%, transparent 70%)`,
              display: "flex",
            }}
          />
          {/* Glow inferior derecho */}
          <div
            style={{
              position: "absolute",
              bottom: -180,
              right: -120,
              width: 550,
              height: 550,
              borderRadius: 9999,
              background: `radial-gradient(circle, rgba(45,217,194,0.11) 0%, transparent 70%)`,
              display: "flex",
            }}
          />

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: PRIMARY,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: 22, height: 22, background: "rgba(255,255,255,0.9)", borderRadius: 4, display: "flex" }} />
              </div>
              <div
                style={{
                  fontFamily: displayFont,
                  fontSize: 30,
                  fontWeight: 700,
                  color: FG,
                  display: "flex",
                  gap: 0,
                }}
              >
                <span>Repu</span>
                <span style={{ color: ACCENT }}>sense</span>
              </div>
            </div>
            <div style={{ fontSize: 15, color: MUTED, fontFamily: bodyFont, display: "flex" }}>
              repusense.net
            </div>
          </div>

          {/* Chip */}
          <div
            style={{
              marginTop: 50,
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(124,124,248,0.10)",
              border: `1px solid rgba(124,124,248,0.28)`,
              borderRadius: 99,
              padding: "7px 18px",
              width: "fit-content",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: 9999, background: ACCENT, display: "flex" }} />
            <span style={{ fontSize: 15, color: PRIMARY, fontWeight: 600, fontFamily: bodyFont, display: "flex" }}>
              Análisis de reseñas · Inteligencia Artificial
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              marginTop: 22,
              fontFamily: displayFont,
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: "-1.5px",
              color: FG,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Reputación online</span>
            <span style={{ color: ACCENT, fontStyle: "italic" }}>bajo control.</span>
          </div>

          {/* Subtítulo */}
          <div
            style={{
              marginTop: 22,
              fontSize: 22,
              color: MUTED,
              lineHeight: 1.45,
              maxWidth: 660,
              fontFamily: bodyFont,
              display: "flex",
            }}
          >
            Centraliza tus reseñas de Google, analízalas con IA y recibe
            alertas de reseñas negativas en tiempo real.
          </div>

          {/* Feature pills */}
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              gap: 12,
              flexWrap: "nowrap",
            }}
          >
            {[
              "✦ Sentimiento con IA",
              "✦ Alertas en tiempo real",
              "✦ Puntuación 0–100",
              "✦ PDF y CSV",
            ].map((f) => (
              <div
                key={f}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 11,
                  padding: "11px 18px",
                  fontSize: 14,
                  color: FG,
                  fontFamily: bodyFont,
                  fontWeight: 500,
                }}
              >
                {f}
              </div>
            ))}
          </div>
        </div>
      ),
      { width: W, height: H, fonts }
    );
  } catch (err) {
    console.error("[og-image] error:", err);
    return new Response("Error generando imagen", { status: 500 });
  }
}
