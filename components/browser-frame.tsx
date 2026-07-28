import Image from "next/image";
import type { Shot } from "@/lib/projects";

/**
 * A screenshot of a live site in browser chrome, so the evidence reads as
 * something that exists rather than a mockup.
 *
 * The image is rendered at its natural aspect ratio rather than cropped to a
 * fixed frame — a cropped screenshot is worse than no screenshot, because the
 * part that proves the point is usually the part that gets cut.
 */
export function BrowserFrame({
  domain,
  shot,
  priority = false,
  animate = false,
  sizes = "(max-width: 1024px) 100vw, 600px",
}: {
  domain: string;
  shot: Shot;
  priority?: boolean;
  animate?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={`border border-[#e0d9cc] rounded-[14px] overflow-hidden bg-white shadow-[0_1px_2px_rgba(26,24,20,0.04),0_22px_44px_-28px_rgba(26,24,20,0.4)] ${
        animate ? "animate-[layerIn_0.35s_ease_both]" : ""
      }`}
    >
      <div className="flex items-center gap-2.5 px-3 py-2.5 bg-chrome border-b border-[#e7e0d3]">
        <span aria-hidden="true" className="flex gap-[5px]">
          <span className="w-2 h-2 rounded-full bg-[#d8cfc0] block" />
          <span className="w-2 h-2 rounded-full bg-[#d8cfc0] block" />
          <span className="w-2 h-2 rounded-full bg-[#d8cfc0] block" />
        </span>
        <span className="flex-1 font-mono text-[10px] tracking-[0.03em] text-[#8a8375] bg-[#fbf9f5] border border-[#e7e0d3] rounded-[5px] px-2.5 py-1 text-center overflow-hidden whitespace-nowrap text-ellipsis">
          {domain}
        </span>
      </div>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        className="block w-full h-auto bg-shot"
        priority={priority}
      />
    </div>
  );
}
