import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, projectBySlug } from "@/lib/projects";
import { BrowserFrame } from "@/components/browser-frame";
import { SystemMap } from "@/components/system-map";
import { EvidenceGallery } from "@/components/evidence-gallery";
import { TTArchitecture } from "@/components/tt-architecture";
import { Label, LiveDot, ReviewNote, Shell } from "@/components/ui";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} — case study`,
    description: project.outcome,
    openGraph: {
      title: `${project.name} — ${project.category}`,
      description: project.outcome,
      type: "article",
      images: project.evidence ? [project.evidence.src] : undefined,
    },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const others = PROJECTS.filter((p) => p.slug !== project.slug);

  return (
    <article className="pt-12 sm:pt-16">
      {/* 1 — One-sentence outcome */}
      <Shell>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-faint hover:text-accent"
        >
          <span aria-hidden="true">←</span> All work
        </Link>

        <header className="flex flex-col gap-5 pt-7 max-w-[68ch]">
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

          <h1 className="font-serif font-normal text-[clamp(34px,4.6vw,54px)] leading-[1.06] tracking-[-0.02em] text-balance text-ink">
            {project.name}
          </h1>

          <p className="font-serif text-[clamp(20px,2.2vw,27px)] leading-[1.4] text-accent italic text-balance">
            {project.outcome}
          </p>

          <dl className="flex flex-col sm:flex-row gap-x-10 gap-y-4 border-y border-line py-5 my-1">
            <div className="flex flex-col gap-1 shrink-0">
              <dt className="font-mono text-[10px] tracking-[0.13em] uppercase text-fainter">
                Relationship
              </dt>
              <dd className="text-[15px] font-medium text-ink">{project.ownership}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-mono text-[10px] tracking-[0.13em] uppercase text-fainter">
                My role
              </dt>
              <dd className="text-[15px] leading-[1.6] text-body">{project.role}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[15px] font-medium text-ink border-b border-accent-line pb-0.5 transition-colors hover:text-accent hover:border-accent"
              >
                {link.label}
                <span aria-hidden="true" className="font-mono text-[11px]">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </header>

        {/* Metrics */}
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 border-y border-line py-8 my-12">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-1">
              <dt className="font-serif text-[clamp(28px,3vw,36px)] leading-none text-ink">
                {metric.value}
              </dt>
              <dd className="text-[13.5px] leading-[1.5] text-body">
                {metric.label}
                <span className="block font-mono text-[10px] tracking-[0.06em] text-ghost pt-1 uppercase">
                  verified · {metric.source}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        {/* 2 & 3 — The problem, and what got built */}
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 pb-14">
          <section className="flex flex-col gap-4">
            <Label tone="accent" className="tracking-[0.14em]">
              The real problem
            </Label>
            <p className="text-[16px] leading-[1.7] text-body">{project.problem}</p>
          </section>
          <section className="flex flex-col gap-4">
            <Label tone="accent" className="tracking-[0.14em]">
              What got built
            </Label>
            <p className="text-[16px] leading-[1.7] text-body">{project.built}</p>
          </section>
        </div>

        {/* Lead evidence */}
        {project.evidence ? (
          <figure className="flex flex-col gap-3 pb-16">
            <BrowserFrame
              domain={project.domain}
              shot={project.evidence}
              priority
              sizes="(max-width: 1240px) 100vw, 1144px"
            />
            <figcaption className="font-mono text-[11px] leading-[1.6] text-faint">
              {project.evidence.caption}
            </figcaption>
          </figure>
        ) : null}
      </Shell>

      {/* 4 — Both sides of the handoff */}
      <section className="border-y border-line bg-sunk py-16 sm:py-20">
        <Shell>
          <div className="flex flex-col gap-3 pb-10 max-w-[58ch]">
            <Label className="tracking-[0.14em]">One request, two sides</Label>
            <h2 className="font-serif font-normal text-[clamp(26px,3.2vw,38px)] leading-[1.12] tracking-[-0.018em] text-ink">
              What the customer does, and what the business receives.
            </h2>
          </div>

          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-start">
            <div className="border border-line rounded-2xl bg-surface p-6 sm:p-7">
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-accent pb-4 border-b border-line-soft">
                Customer journey · what a person sees and does
              </p>
              <ol className="flex flex-col pt-4">
                {project.customerJourney.map((step, i) => (
                  <li key={step.label} className="contents">
                    <div className="grid grid-cols-[26px_1fr] gap-x-3.5 items-center">
                      <span className="w-[26px] h-[26px] rounded-[7px] border border-line-firm bg-inset grid place-items-center font-mono text-[10px] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                        <span className="text-[14.5px] font-medium text-ink">
                          {step.label}
                        </span>
                        {step.note ? (
                          <span className="font-mono text-[10.5px] text-faint">
                            {step.note}
                          </span>
                        ) : null}
                      </span>
                    </div>
                    {i < project.customerJourney.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="h-3.5 w-px bg-line-strong ml-[13px]"
                      />
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>

            <SystemMap
              title="Operator journey · what the business receives"
              steps={project.operatorJourney}
              note={project.operatorNote}
            />
          </div>
        </Shell>
      </section>

      {/* 5 — Key decisions */}
      <section className="pt-16 sm:pt-24">
        <Shell>
          <div className="flex flex-col gap-3 pb-10 max-w-[58ch]">
            <Label tone="accent" className="tracking-[0.14em]">
              Key decisions
            </Label>
            <h2 className="font-serif font-normal text-[clamp(26px,3.2vw,38px)] leading-[1.12] tracking-[-0.018em] text-ink">
              The parts that took judgment, not just work.
            </h2>
          </div>

          <ol className="grid gap-px bg-line border border-line rounded-2xl overflow-hidden">
            {project.decisions.map((decision, i) => (
              <li
                key={decision.title}
                className="bg-canvas p-6 sm:p-8 grid gap-x-6 gap-y-2 lg:grid-cols-[auto_minmax(0,32ch)_1fr] lg:items-baseline"
              >
                <span className="font-mono text-[11px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[17px] font-medium leading-snug text-ink">
                  {decision.title}
                </h3>
                <p className="text-[15px] leading-[1.7] text-body">{decision.body}</p>
              </li>
            ))}
          </ol>
        </Shell>
      </section>

      {/* The flagship gets a drawn system map — it is the one with a system worth drawing. */}
      {project.slug === "travelling-technicians" ? <TTArchitecture /> : null}

      {/* 6 — Selected evidence */}
      <EvidenceGallery shots={project.gallery} domain={project.domain} />

      {/* 7 & 8 — Proof and validation */}
      <section className="pt-16 sm:pt-24">
        <Shell>
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-[1fr_1.2fr]">
            <div className="flex flex-col gap-4">
              <Label tone="accent" className="tracking-[0.14em]">
                Built with / connected to
              </Label>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[11px] text-[#5c564a] bg-surface border border-line-firm rounded-full px-[13px] py-1.5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <Label tone="accent" className="tracking-[0.14em]">
                Where it stands
              </Label>
              <ul className="flex flex-col gap-2.5">
                {project.validation.map((item) => (
                  <li
                    key={item}
                    className="text-[15px] leading-[1.65] text-body flex gap-3"
                  >
                    <span aria-hidden="true" className="font-mono text-operator text-xs pt-1">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Shell>
      </section>

      {/* 9 — What I'd improve next */}
      <section className="pt-16 sm:pt-24">
        <Shell>
          <div className="border border-line rounded-2xl bg-sunk p-6 sm:p-10 flex flex-col gap-4">
            <Label tone="accent" className="tracking-[0.14em]">
              What I&rsquo;d improve next
            </Label>
            <p className="font-serif text-[clamp(19px,2.2vw,26px)] leading-[1.45] text-ink text-balance max-w-[54ch]">
              {project.next}
            </p>
          </div>
        </Shell>
      </section>

      {/* Open items for Manoj */}
      {project.review.length ? (
        <section className="pt-10">
          <Shell>
            <ReviewNote items={project.review} />
          </Shell>
        </section>
      ) : null}

      {/* Next case studies */}
      <section className="pt-16 sm:pt-24">
        <Shell>
          <Label className="tracking-[0.14em]">Keep reading</Label>
          <ul className="grid gap-5 sm:grid-cols-3 pt-5">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/work/${other.slug}`}
                  className="flex flex-col gap-2 h-full border border-line rounded-2xl bg-surface p-6 transition-colors hover:border-accent-line"
                >
                  <span className="font-mono text-[10px] tracking-[0.13em] uppercase text-fainter">
                    {other.category}
                  </span>
                  <span className="font-serif text-[21px] leading-tight text-ink">
                    {other.name}
                  </span>
                  <span className="text-[14px] leading-[1.6] text-body">
                    {other.teaser}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Shell>
      </section>
    </article>
  );
}
