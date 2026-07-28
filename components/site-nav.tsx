import Link from "next/link";
import { SITE } from "@/lib/projects";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/#after", label: "After the click" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
];

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-60 bg-canvas/90 backdrop-blur-xl backdrop-saturate-150 border-b border-line">
      <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 h-[62px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-baseline gap-3 text-ink min-w-0">
          <span className="text-[15.5px] font-semibold tracking-[-0.01em] whitespace-nowrap">
            {SITE.name}
          </span>
          <span className="hidden sm:inline font-mono text-[9.5px] tracking-[0.11em] text-fainter uppercase whitespace-nowrap overflow-hidden text-ellipsis">
            {SITE.role}
          </span>
        </Link>

        <div className="flex items-center gap-3.5 lg:gap-7">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden md:inline text-sm text-body whitespace-nowrap transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="text-[13.5px] font-medium text-ink border border-line-strong rounded-full px-[15px] py-[7px] bg-surface whitespace-nowrap transition-colors hover:border-accent hover:text-accent"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </nav>
  );
}
