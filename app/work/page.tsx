import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { BrowserFrame } from "@/components/browser-frame";
import { Label, LiveDot, Shell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Four live systems — a field-service platform, a privacy-led data product, a multi-location brand platform, and a community donation engine.",
};

export default function WorkIndex() {
  return (
    <div className="pt-14 sm:pt-20">
      <Shell>
        <div className="flex flex-col gap-5 max-w-[64ch]">
          <Label className="tracking-[0.14em]">Selected systems</Label>
          <h1 className="font-serif font-normal text-[clamp(34px,4.6vw,54px)] leading-[1.06] tracking-[-0.02em] text-balance text-ink">
            Four businesses. Four different problems behind the screen.
          </h1>
          <p className="text-[17px] leading-[1.65] text-body">
            Each of these is live. Each case study is written the same way: the real
            business problem, what got built, both sides of the handoff, the decisions
            that took judgment, and what I&rsquo;d improve next.
          </p>
        </div>

        <ul className="flex flex-col gap-14 sm:gap-20 pt-14">
          {PROJECTS.map((project, i) => (
            <li
              key={project.slug}
              className="grid gap-7 lg:gap-12 lg:grid-cols-[1fr_1.1fr] items-center"
            >
              <Link
                href={`/work/${project.slug}`}
                className={`block ${i % 2 === 1 ? "lg:order-2" : ""}`}
              >
                {project.evidence ? (
                  <BrowserFrame
                    domain={project.domain}
                    src={project.evidence.src}
                    alt={project.evidence.alt}
                    priority={i === 0}
                  />
                ) : null}
              </Link>

              <div className="flex flex-col gap-3.5">
                <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
                  <span className="font-mono text-[11px] tracking-[0.1em] text-accent">
                    {project.index}
                  </span>
                  <Label className="tracking-[0.14em]">{project.category}</Label>
                  {project.live ? (
                    <span className="flex items-center gap-1.5">
                      <LiveDot />
                      <span className="font-mono text-[9.5px] tracking-[0.13em] uppercase text-operator">
                        Live
                      </span>
                    </span>
                  ) : null}
                </div>

                <h2 className="font-serif font-normal text-[clamp(26px,3vw,36px)] leading-[1.12] tracking-[-0.018em] text-ink">
                  <Link href={`/work/${project.slug}`} className="hover:text-accent">
                    {project.name}
                  </Link>
                </h2>

                <p className="font-serif text-[clamp(17px,1.5vw,20px)] leading-[1.45] text-accent italic">
                  {project.outcome}
                </p>

                <p className="text-[15px] leading-[1.65] text-body max-w-[52ch]">
                  {project.teaser}
                </p>

                <dl className="flex flex-wrap gap-x-8 gap-y-3 pt-3 mt-1 border-t border-line">
                  {project.metrics.slice(0, 3).map((metric) => (
                    <div key={metric.label} className="flex flex-col gap-0.5">
                      <dt className="font-serif text-[22px] leading-none text-ink">
                        {metric.value}
                      </dt>
                      <dd className="font-mono text-[10px] tracking-[0.06em] text-faint max-w-[22ch]">
                        {metric.label}
                      </dd>
                    </div>
                  ))}
                </dl>

                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-2 text-[15px] font-medium text-ink border-b border-accent-line pb-0.5 w-fit mt-2 transition-colors hover:text-accent hover:border-accent"
                >
                  Read the case study
                  <span aria-hidden="true" className="font-mono text-[13px]">
                    →
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Shell>
    </div>
  );
}
