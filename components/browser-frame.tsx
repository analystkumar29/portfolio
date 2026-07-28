import Image from "next/image";

/**
 * The customer side: a real screenshot of the live site in a browser chrome,
 * so the evidence reads as something that exists rather than a mockup.
 */
export function BrowserFrame({
  domain,
  src,
  alt,
  priority = false,
  animate = false,
}: {
  domain: string;
  src: string;
  alt: string;
  priority?: boolean;
  animate?: boolean;
}) {
  return (
    <figure
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
      <div className="relative aspect-16/10 bg-shot">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 600px"
          className="object-cover object-top"
          priority={priority}
        />
      </div>
    </figure>
  );
}
