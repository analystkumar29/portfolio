import { BrowserFrame } from "@/components/browser-frame";
import { Label } from "@/components/ui";
import type { Shot } from "@/lib/projects";

/**
 * Selected evidence — case-study section 6. Each shot is annotated with what
 * it proves, because a screenshot with no argument attached is decoration.
 */
export function EvidenceGallery({
  shots,
  domain,
}: {
  shots: Shot[];
  domain: string;
}) {
  if (!shots.length) return null;

  return (
    <section className="pt-16 sm:pt-24">
      <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-3 pb-10 max-w-[58ch]">
          <Label tone="accent" className="tracking-[0.14em]">
            Selected evidence
          </Label>
          <h2 className="font-serif font-normal text-[clamp(26px,3.2vw,38px)] leading-[1.12] tracking-[-0.018em] text-ink">
            What it actually looks like, and what each screen proves.
          </h2>
        </div>

        <ul className="flex flex-col gap-14 sm:gap-20">
          {shots.map((shot, i) => (
            <li
              key={shot.src}
              className="grid gap-6 lg:gap-10 lg:grid-cols-[1.75fr_1fr] items-center"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                <BrowserFrame
                  domain={domain}
                  shot={shot}
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
              <figcaption className="flex flex-col gap-3">
                <span className="font-mono text-[11px] tracking-[0.1em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[15.5px] leading-[1.7] text-body">
                  {shot.caption}
                </p>
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
