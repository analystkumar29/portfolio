import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Selected work — four live systems";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Selected systems",
    title: "Four businesses. Four different problems behind the screen.",
    footnote: "Case studies",
  });
}
