import { ImageResponse } from "next/og";

export const alt = "Bala Sanjeev C — Software Developer and AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 78px",
          color: "white",
          background:
            "radial-gradient(circle at 85% 18%, #6c63ff 0%, #292356 24%, transparent 52%), linear-gradient(135deg, #090813 0%, #151228 55%, #0d0c1d 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: 24,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#bdb8ff",
          }}
        >
          <span style={{ display: "flex", width: 54, height: 4, background: "#8b83ff" }} />
          Portfolio · 2027 Graduate
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 74, fontWeight: 800, letterSpacing: "-0.04em" }}>
            Bala Sanjeev C
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#d9d7e5" }}>
            Software Developer &amp; AI Engineer
          </div>
          <div style={{ display: "flex", fontSize: 23, color: "#9f9aaf" }}>
            Full-stack software · Secure backend systems · Applied AI
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#8f899e" }}>
          balasanjeev.netlify.app
        </div>
      </div>
    ),
    size,
  );
}
