"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/projects";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/#after", label: "After the click" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
];

export function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <nav className="sticky top-0 z-60 bg-canvas/90 backdrop-blur-xl backdrop-saturate-150 border-b border-line">
      <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 h-[62px] flex items-center justify-between gap-4">
        <Link href="/" onClick={closeMenu} className="flex items-baseline gap-3 text-ink min-w-0">
          <span className="text-[15.5px] font-semibold tracking-[-0.01em] whitespace-nowrap">
            {SITE.name}
          </span>
          <span className="hidden sm:inline font-mono text-[9.5px] tracking-[0.11em] text-fainter uppercase whitespace-nowrap overflow-hidden text-ellipsis">
            {SITE.role}
          </span>
        </Link>

        <div className="flex items-center gap-2.5 lg:gap-7">
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
            onClick={closeMenu}
            className="text-[13.5px] font-medium text-ink border border-line-strong rounded-full px-[15px] py-[7px] bg-surface whitespace-nowrap transition-colors hover:border-accent hover:text-accent"
          >
            Get in touch
          </Link>
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-site-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="md:hidden text-[13.5px] font-medium text-body border border-line-strong rounded-full px-[13px] py-[7px] bg-surface transition-colors hover:border-accent hover:text-accent"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div id="mobile-site-menu" className="md:hidden border-t border-line bg-canvas">
          <div className="w-full max-w-[1240px] mx-auto px-5 py-5 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-x-5 gap-y-3">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-[15px] text-ink hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-4 border-t border-line-soft">
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-accent hover:text-accent-deep"
              >
                LinkedIn ↗
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-accent hover:text-accent-deep"
              >
                GitHub ↗
              </a>
              <Link href="/resume" onClick={closeMenu} className="text-[14px] text-accent hover:text-accent-deep">
                Résumé →
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
