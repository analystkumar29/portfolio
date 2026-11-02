import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NOTES, noteBySlug, type NoteBlock } from "@/lib/notes";
import { Label, Shell } from "@/components/ui";

export function generateStaticParams() {
  return NOTES.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = noteBySlug(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.dek,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: { title: note.title, description: note.dek, type: "article" },
  };
}

function Block({ block }: { block: NoteBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="font-serif text-[clamp(22px,2.4vw,28px)] leading-[1.2] text-ink pt-6">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="flex flex-col gap-2 pl-5 list-disc marker:text-accent">
          {block.items.map((item) => (
            <li key={item} className="text-[16.5px] leading-[1.7] text-body">
              {item}
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-xl border border-line bg-inset p-4 text-[13px] leading-[1.6]">
          <code className="font-mono text-ink">{block.code}</code>
        </pre>
      );
    default:
      return <p className="text-[16.5px] leading-[1.75] text-body">{block.text}</p>;
  }
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = noteBySlug(slug);
  if (!note) notFound();

  const date = new Date(`${note.date}T12:00:00`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="pt-12 sm:pt-16">
      <Shell>
        <div className="max-w-[70ch] flex flex-col gap-6">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-faint hover:text-accent"
          >
            <span aria-hidden="true">←</span> All notes
          </Link>
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
            <Label tone="accent" className="tracking-[0.14em]">
              {note.project}
            </Label>
            <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-fainter">
              {date} · {note.readingMinutes} min read
            </span>
          </div>
          <h1 className="font-serif font-normal text-[clamp(32px,4.2vw,48px)] leading-[1.08] tracking-[-0.02em] text-balance text-ink">
            {note.title}
          </h1>
          <p className="font-serif text-[clamp(18px,1.7vw,21px)] leading-[1.5] text-accent italic">
            {note.dek}
          </p>
          <div className="flex flex-col gap-5 pt-4 border-t border-line">
            {note.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-8 mt-4 border-t border-line">
            <Link
              href={`/work/${note.projectSlug}`}
              className="text-[15px] font-medium text-ink border-b border-accent-line pb-0.5 hover:text-accent"
            >
              Read the {note.project} case study →
            </Link>
            <Link href="/notes" className="text-[15px] text-muted hover:text-accent">
              More notes
            </Link>
          </div>
        </div>
      </Shell>
    </article>
  );
}
