"use client";

import { Analytics } from "@vercel/analytics/next";

/** Vercel's privacy-friendly, cookie-free traffic analytics. */
export function SiteAnalytics() {
  return <Analytics />;
}
