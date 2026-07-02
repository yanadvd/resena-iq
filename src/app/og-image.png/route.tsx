import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#f8f9ff",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: 72,
          gap: 0,
        }}
      >
        {/* Logo + nombre */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#0058be",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 24, height: 24, background: "white", borderRadius: 5, display: "flex" }} />
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#0b1c30", display: "flex" }}>
            Repu<span style={{ color: "#0058be" }}>sense</span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: 64,
            fontSize: 72,
            fontWeight: 700,
            color: "#0b1c30",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Reputación online</span>
          <span style={{ color: "#0058be" }}>bajo control.</span>
        </div>

        {/* Subtítulo */}
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "#45464d",
            display: "flex",
          }}
        >
          Análisis de reseñas con IA para negocios locales
        </div>

        {/* URL */}
        <div
          style={{
            marginTop: 64,
            fontSize: 20,
            fontWeight: 600,
            color: "#0058be",
            display: "flex",
          }}
        >
          repusense.net
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
