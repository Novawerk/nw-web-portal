import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Novawerk — Not profitable, but meaningful.";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#0f0f0f",
          color: "#efe9d8",
          padding: "80px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z"
              fill="#efe9d8"
            />
            <path
              d="M50 36 L51.4 48.6 L64 50 L51.4 51.4 L50 64 L48.6 51.4 L36 50 L48.6 48.6 Z"
              fill="#0f0f0f"
            />
          </svg>
          <div
            style={{
              fontSize: 108,
              fontWeight: 800,
              letterSpacing: "-4px",
              lineHeight: 1,
            }}
          >
            Novawerk
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: "-1.5px",
              lineHeight: 1.05,
              maxWidth: "900px",
            }}
          >
            Not profitable, but meaningful.
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              opacity: 0.6,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            novawerk.io · open community for AI-native projects
          </div>
        </div>
      </div>
    ),
    { width: size.width, height: size.height },
  );
}
