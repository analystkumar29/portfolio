import Link from "next/link";
import type { ReactNode } from "react";

/** The small uppercase mono label used throughout the site. */
export function Label({
  children,
  tone = "faint",
  className = "",
}: {
  children: ReactNode;
  tone?: "faint" | "accent" | "operator" | "ghost";
  className?: string;
}) {
  const tones = {
    faint: "text-fainter",
    accent: "text-accent",
    operator: "text-operator-bright",
    ghost: "text-ghost",
  };
  return (
    <span
      className={`font-mono text-[10.5px] tracking-[0.13em] uppercase ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="font-mono text-[11px] text-[#5c564a] bg-surface border border-line-firm rounded-full px-[13px] py-1.5">
      {children}
    </li>
  );
}

export function LiveDot() {
  return (
    <span
      aria-hidden="true"
      className="w-1.5 h-1.5 rounded-full bg-live block animate-[live-pulse_2.6s_ease-in-out_infinite]"
    />
  );
}

export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

export function PrimaryLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const cls =
    "inline-flex items-center gap-2.5 bg-ink text-canvas text-[15px] font-medium px-[22px] py-[13px] rounded-full transition-colors hover:bg-accent";
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function GhostLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const cls =
    "inline-flex items-center gap-2.5 text-ink text-[15px] font-medium px-[22px] py-[13px] rounded-full border border-line-strong bg-surface transition-colors hover:border-ink";
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="grid gap-6 lg:gap-x-15 lg:grid-cols-[1fr_minmax(0,46ch)] items-end pb-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.1em] text-accent">{index}</span>
          <Label className="tracking-[0.14em]">{eyebrow}</Label>
        </div>
        <h2 className="font-serif font-normal text-[clamp(30px,3.6vw,46px)] leading-[1.1] tracking-[-0.018em] text-balance text-ink">
          {title}
        </h2>
      </div>
      {lede ? <p className="text-base leading-[1.62] text-body">{lede}</p> : null}
    </div>
  );
}

/**
 * A visible flag for anything Manoj still needs to confirm. Deliberately not
 * subtle — an unverified claim on a portfolio is worse than a missing one.
 */
export function ReviewNote({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <aside className="border border-accent-line bg-[#fdf6f1] rounded-xl p-5 sm:p-6">
      <Label tone="accent" className="tracking-[0.14em]">
        Before this goes public · {items.length} to confirm
      </Label>
      <ul className="flex flex-col gap-2.5 pt-3.5">
        {items.map((item) => (
          <li key={item} className="text-[14px] leading-[1.6] text-body flex gap-2.5">
            <span aria-hidden="true" className="font-mono text-accent text-xs pt-0.5">
              ›
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
