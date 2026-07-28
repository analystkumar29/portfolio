import { ImageResponse } from "next/og";
import { SITE } from "@/lib/projects";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * The shared Open Graph card.
 *
 * Deliberately typographic: a link preview is seen at thumbnail size in a feed,
 * so a screenshot reads as grey mush. Name, one line of argument, and the
 * site's own colours do more work at 300px wide.
 */
export function ogCard({
  eyebrow,
  title,
  footnote,
}: {
  eyebrow: string;
  title: string;
  footnote?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf8f4",
          padding: "72px 80px",
          borderTop: "14px solid #b4562a",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#8a8374",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 12,
                background: "#3e8d6b",
                display: "flex",
              }}
            />
            {eyebrow}
          </div>

          <div
            style={{
              fontSize: title.length > 64 ? 60 : 72,
              lineHeight: 1.1,
              letterSpacing: -1.6,
              color: "#17150f",
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "2px solid #e8e2d6",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 30, color: "#17150f" }}>{SITE.name}</div>
            <div style={{ fontSize: 22, color: "#6c6557" }}>{SITE.role}</div>
          </div>
          <div style={{ fontSize: 20, color: "#8a8374", display: "flex" }}>
            {footnote ?? "Burnaby, BC"}
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
