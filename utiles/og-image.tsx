import { ImageResponse } from "next/og";
import { siteUrl } from "@/utiles/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = "Mahmoud Mohamed — Frontend Engineer";

// Shared social card used by both opengraph-image and twitter-image.
// Rendered by Satori, so keep to the CSS subset it supports (flex + solid
// colors + linear-gradient) and avoid filters/background-clip.
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          backgroundColor: "#0a1326",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 99,
              backgroundColor: "#22d3ee",
            }}
          />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 6,
              color: "#94a3b8",
            }}
          >
            PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 86, fontWeight: 700 }}>
          Mahmoud Mohamed
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#cbd5e1",
            marginTop: 18,
          }}
        >
          Frontend Engineer · React &amp; Next.js
        </div>

        <div
          style={{
            width: 180,
            height: 10,
            borderRadius: 99,
            marginTop: 44,
            backgroundImage: "linear-gradient(90deg, #22d3ee, #a855f7)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#64748b",
            marginTop: 44,
          }}
        >
          {siteUrl.replace("https://", "")}
        </div>
      </div>
    ),
    ogSize,
  );
}
