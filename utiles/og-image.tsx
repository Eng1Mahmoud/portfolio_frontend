import { ImageResponse } from "next/og";
import { siteUrl } from "@/utiles/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt =
  "Mahmoud Mohamed — Frontend Software Engineer (React.js, Next.js)";

// Shared social card used by both opengraph-image and twitter-image.
// Rendered by Satori, so keep to the CSS subset it supports (flex + solid
// colors + linear-gradient) and avoid filters/background-clip.
export function renderOgImage(profileImageUrl?: string) {
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
          // The site's own ground and ink, so a shared link does not preview in
          // a palette the page never uses.
          backgroundColor: "#171A16",
          color: "#E8EBE5",
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
          {profileImageUrl ? (
            // next/og renders through Satori, so a plain img is required here.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profileImageUrl}
              alt=""
              width={96}
              height={96}
              style={{
                width: 96,
                height: 96,
                borderRadius: 999,
                objectFit: "cover",
                border: "4px solid #9DC2A6",
              }}
            />
          ) : (
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 999,
                backgroundColor: "#9DC2A6",
                color: "#171A16",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
                fontWeight: 700,
              }}
            >
              MM
            </div>
          )}
          <div
            style={{
              fontSize: 24,
              letterSpacing: 6,
              color: "#8A9085",
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
            fontSize: 38,
            color: "#BCC2B7",
            marginTop: 18,
          }}
        >
          Frontend Software Engineer · React.js &amp; Next.js
        </div>

        <div
          style={{
            width: 180,
            height: 10,
            borderRadius: 99,
            marginTop: 44,
            backgroundImage: "linear-gradient(90deg, #9DC2A6, #4C6B54)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#8A9085",
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
