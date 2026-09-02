import Link from "next/link";
import { gmailComposeUrl, SITE, PROJECTS } from "@/lib/projects";
import { Label } from "@/components/ui";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-sunk mt-24">
      <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_0.85fr] pb-10 border-b border-line">
          <div className="flex flex-col gap-3">
            <p className="font-serif text-[22px] text-ink leading-snug">
              {SITE.name}
            </p>
            <p className="text-[14.5px] leading-[1.6] text-body max-w-[38ch]">
              I build the front door, the handoff behind it, and the workflow that
              follows.
            </p>
            <a
              href={gmailComposeUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14.5px] text-accent hover:text-accent-deep w-fit"
            >
              {SITE.email}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <Label className="tracking-[0.14em]">Case studies</Label>
            {PROJECTS.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="text-[14.5px] text-body hover:text-accent w-fit"
              >
                {project.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Label className="tracking-[0.14em]">Elsewhere on this site</Label>
            <Link href="/work" className="text-[14.5px] text-body hover:text-accent w-fit">
              All work
            </Link>
            <Link href="/#services" className="text-[14.5px] text-body hover:text-accent w-fit">
              What I can build for you
            </Link>
            <Link href="/#about" className="text-[14.5px] text-body hover:text-accent w-fit">
              About
            </Link>
            <Link href="/#contact" className="text-[14.5px] text-body hover:text-accent w-fit">
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <Label className="tracking-[0.14em]">Elsewhere online</Label>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14.5px] text-body hover:text-accent w-fit"
            >
              LinkedIn ↗
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14.5px] text-body hover:text-accent w-fit"
            >
              GitHub ↗
            </a>
            <Link href="/resume" className="text-[14.5px] text-body hover:text-accent w-fit">
              Résumé
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-between pt-6">
          <p className="font-mono text-[11px] text-faint">
            {SITE.name} — {SITE.role}
          </p>
          <p className="font-mono text-[11px] text-faint">Burnaby, BC · 2026</p>
        </div>
      </div>
    </footer>
  );
}
