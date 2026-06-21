import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0b0c14",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: 64,
          gap: 0,
        }}
      >
        {/* Logo + nombre */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "#7c7cf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 22, height: 22, background: "white", borderRadius: 4, display: "flex" }} />
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#f0f0f5", display: "flex" }}>
            Repu<span style={{ color: "#2dd9c2" }}>sense</span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: 56,
            fontSize: 68,
            fontWeight: 700,
            color: "#f0f0f5",
            lineHeight: 1.06,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Reputación online</span>
          <span style={{ color: "#2dd9c2" }}>bajo control.</span>
        </div>

        {/* Subtítulo */}
        <div
          style={{
            marginTop: 24,
            fontSize: 24,
            color: "#7e7e96",
            display: "flex",
          }}
        >
          Análisis de reseñas con IA para negocios locales
        </div>

        {/* URL */}
        <div
          style={{
            marginTop: 64,
            fontSize: 18,
            color: "#7c7cf8",
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
