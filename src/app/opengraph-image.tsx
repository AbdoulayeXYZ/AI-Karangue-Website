import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI-Karangué | N°1 Gestion de Flotte & Télématique au Sénégal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0F1C",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Teal glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,210,190,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div style={{ width: 40, height: 2, background: "#00D2BE" }} />
          <span
            style={{
              color: "#00D2BE",
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Sénégal · Afrique de l&apos;Ouest
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: 28,
            maxWidth: 900,
          }}
        >
          Gestion de Flotte
          <span style={{ color: "#00D2BE" }}> Intelligente</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 26,
            fontWeight: 500,
            lineHeight: 1.4,
            maxWidth: 700,
            marginBottom: 56,
          }}
        >
          GPS temps réel · ADAS · DSM · DualCam — Plateforme Karangué221
        </div>

        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "16px 28px",
            background: "rgba(0,210,190,0.12)",
            border: "1px solid rgba(0,210,190,0.3)",
            borderRadius: 16,
          }}
        >
          <span style={{ color: "#00D2BE", fontSize: 20, fontWeight: 900 }}>
            AI-Karangué
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 20 }}>·</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, fontWeight: 600 }}>
            aikarangue.artbeaurescence.sn
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
