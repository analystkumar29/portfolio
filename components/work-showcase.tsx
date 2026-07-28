"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { BrowserFrame } from "@/components/browser-frame";
import { SystemMap } from "@/components/system-map";
import { Label, LiveDot } from "@/components/ui";

type View = "customer" | "operator";

/**
 * The signature idea: the same four systems, seen from either side of the
 * handoff. The toggle is the only interactive thing on the page, so it holds
 * the state for all four projects rather than each managing its own.
 */
export function WorkShowcase() {
  const [view, setView] = useState<View>("customer");
  const isCustomer = view === "customer";

  return (
    <>
      <div className="sticky top-[62px] z-40 bg-canvas/95 backdrop-blur-md border-y border-line">
        <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 py-2.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <p className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-fainter">
            The same four systems, from two sides
          </p>
          <div
            role="tablist"
            aria-label="Choose a view"
            className="inline-flex p-[3px] bg-inset border border-line-firm rounded-full gap-[3px]"
          >
            <ViewTab
              selected={isCustomer}
              onSelect={() => setView("customer")}
              label="Customer view"
            />
            <ViewTab
              selected={!isCustomer}
              onSelect={() => setView("operator")}
              label="Operator view"
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 pt-12 sm:pt-20 flex flex-col gap-14 sm:gap-24">
        {PROJECTS.map((project, i) => (
          <article
            key={project.slug}
            id={i === 0 ? "depth" : undefined}
            className="grid gap-8 lg:gap-14 lg:grid-cols-2 items-center scroll-mt-[132px]"
          >
            <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
              {isCustomer && project.evidence ? (
                <BrowserFrame
                  domain={project.domain}
                  shot={project.evidence}
                  priority={i === 0}
                  animate
                />
              ) : (
                <SystemMap
                  title="System map · what the business receives"
                  steps={project.operatorJourney}
                  note={project.operatorNote}
                  animate
                />
              )}
            </div>

            <div className="flex flex-col gap-4">
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

              <h3 className="font-serif font-normal text-[clamp(26px,3vw,36px)] leading-[1.12] tracking-[-0.018em] text-ink">
                {project.name}
              </h3>

              <p className="font-serif text-[clamp(17px,1.5vw,20px)] leading-[1.45] text-accent italic">
                {project.outcome}
              </p>

              <p className="text-[15px] leading-[1.65] text-body">
                {isCustomer ? project.problem : project.built}
              </p>

              <ul className="flex flex-wrap gap-2 pt-1">
                {(isCustomer
                  ? project.customerJourney.map((s) => s.label)
                  : project.stack
                ).map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[11px] text-[#5c564a] bg-surface border border-line-firm rounded-full px-3 py-1.5"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-2 text-[15px] font-medium text-ink border-b border-accent-line pb-0.5 transition-colors hover:text-accent hover:border-accent"
                >
                  Read the case study
                  <span aria-hidden="true" className="font-mono text-[13px]">
                    →
                  </span>
                </Link>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[14px] text-muted transition-colors hover:text-accent"
                >
                  Visit {project.domain}
                  <span aria-hidden="true" className="font-mono text-[11px]">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function ViewTab({
  selected,
  onSelect,
  label,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onSelect}
      className={`border-0 rounded-full px-4 py-[7px] text-[13.5px] font-medium transition-colors ${
        selected
          ? "bg-surface text-ink shadow-[0_1px_2px_rgba(26,24,20,0.12)]"
          : "bg-transparent text-muted hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
