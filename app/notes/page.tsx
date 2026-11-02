import type { Metadata } from "next";
import Link from "next/link";
import { NOTES } from "@/lib/notes";
import { Label, Shell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Short engineering notes from the systems I run: the bugs I hit, how I found them, and the decisions behind them.",
  alternates: { canonical: "/notes" },
};

export default function NotesIndex() {
  return (
    <div className="pt-14 sm:pt-20">
      <Shell>
        <div className="flex flex-col gap-5 max-w-[64ch]">
          <Label className="tracking-[0.14em]">Notes</Label>
          <h1 className="font-serif font-normal text-[clamp(34px,4.6vw,54px)] leading-[1.06] tracking-[-0.02em] text-balance text-ink">
            What broke, what I learned, and why I built it that way.
          </h1>
          <p className="text-[17px] leading-[1.65] text-body">
            The code behind these systems is private because it runs real businesses and
            holds real people&rsquo;s data. These notes are the next best thing: the actual
            problems, written up.
          </p>
        </div>

        <ul className="flex flex-col border-t border-line mt-12">
          {NOTES.map((note) => (
            <li key={note.slug} className="border-b border-line">
              <Link
                href={`/notes/${note.slug}`}
                className="group grid gap-2 py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-10"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-accent">
                    {note.project}
                  </span>
                  <span className="font-serif text-[clamp(22px,2.4vw,28px)] leading-[1.2] text-ink group-hover:text-accent">
                    {note.title}
                  </span>
                  <span className="text-[15px] leading-[1.6] text-body max-w-[70ch]">
                    {note.dek}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-faint sm:pt-7">
                  {note.readingMinutes} min read
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Shell>
    </div>
  );
}
