import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Manoj Kumar — Developer & Data Analyst";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Developer & data analyst",
    title: "Websites and workflows that run the business.",
  });
}
