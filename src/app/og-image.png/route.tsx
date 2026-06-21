import { ImageResponse } from "next/og";

export const runtime = "edge";

const BG = "#0b0c14";
const CARD = "#13141f";
const PRIMARY = "#7c7cf8";
const ACCENT = "#2dd9c2";
const FG = "#f0f0f5";
const MUTED = "#8f8fa0";
const BORDER = "#1e1f2e";

const W = 1200;
const H = 630;

export async function GET() {
  // Fuentes desde Google Fonts (edge-compatible)
  const [fraunces, manrope] = await Promise.all([
    fetch("https://fonts.gstatic.com/s/fraunces/v31/6NUt8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnDiw.woff").then(
      (r) => r.arrayBuffer()
    ),
    fetch("https://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59E-_F87jxeN8.woff").then(
      (r) => r.arrayBuffer()
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: BG,
          display: "flex",
          flexDirection: "column",
          padding: "56px 64px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Manrope",
        }}
      >
        {/* Glow de fondo — círculo de luz */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -120,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${PRIMARY}22 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT}18 0%, transparent 70%)`,
          }}
        />

        {/* Header: logo + URL */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Logo mark */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: PRIMARY,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.09 8.26L19 6L14.74 10.74L21 12L14.74 13.26L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.26L3 12L9.26 10.74L5 6L10.91 8.26L12 2Z" fill="white" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "Fraunces",
                fontSize: 28,
                fontWeight: 700,
                color: FG,
                letterSpacing: "-0.5px",
              }}
            >
              Repu<span style={{ color: ACCENT }}>sense</span>
            </span>
          </div>
          <span style={{ fontSize: 15, color: MUTED }}>repusense.net</span>
        </div>

        {/* Tagline chip */}
        <div
          style={{
            marginTop: 52,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: `${PRIMARY}18`,
            border: `1px solid ${PRIMARY}40`,
            borderRadius: 99,
            padding: "6px 16px",
            width: "fit-content",
          }}
        >
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT }} />
          <span style={{ fontSize: 14, color: PRIMARY, fontWeight: 600 }}>
            Análisis de reseñas · Inteligencia Artificial
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: 24,
            fontFamily: "Fraunces",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.05,
            color: FG,
            letterSpacing: "-1.5px",
          }}
        >
          Reputación online
          <br />
          <span style={{ color: ACCENT, fontStyle: "italic" }}>bajo control.</span>
        </div>

        {/* Subtítulo */}
        <div
          style={{
            marginTop: 20,
            fontSize: 22,
            color: MUTED,
            lineHeight: 1.4,
            maxWidth: 680,
          }}
        >
          Centraliza tus reseñas de Google, analízalas con IA y recibe
          alertas de reseñas negativas en tiempo real.
        </div>

        {/* Features pills */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: 12,
          }}
        >
          {[
            "Análisis de sentimiento IA",
            "Alertas en tiempo real",
            "Puntuación 0–100",
            "PDF y CSV",
          ].map((f) => (
            <div
              key={f}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderRadius: 10,
                padding: "10px 16px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17L4 12" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 14, color: FG, fontWeight: 500 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 700, style: "italic" },
        { name: "Manrope", data: manrope, weight: 500, style: "normal" },
      ],
    }
  );
}
