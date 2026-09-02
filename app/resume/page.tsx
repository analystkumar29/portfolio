import { access } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Label, Shell } from "@/components/ui";
import { gmailComposeUrl, SITE } from "@/lib/projects";

const RESUME_FILENAME = "manoj-kumar-resume.pdf";
const RESUME_PATH = path.join(process.cwd(), "public", "resume", RESUME_FILENAME);
const RESUME_REQUEST_MESSAGE = [
  "Hello Manoj,",
  "",
  "Please send me your current résumé for the role below.",
  "",
  "Role/company:",
  "",
  "Thank you,",
  "[Your name]",
].join("\n");

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Current résumé for ${SITE.name}.`,
  alternates: { canonical: "/resume" },
};

export default async function ResumePage() {
  try {
    await access(RESUME_PATH);
  } catch {
    return (
      <div className="pt-16 sm:pt-24">
        <Shell>
          <section className="max-w-[62ch] border border-line rounded-2xl bg-surface p-7 sm:p-10 flex flex-col items-start gap-5">
            <Label tone="accent" className="tracking-[0.14em]">
              Résumé
            </Label>
            <h1 className="font-serif text-[clamp(30px,4vw,46px)] leading-[1.08] tracking-[-0.02em] text-ink">
              A current copy is available on request.
            </h1>
            <p className="text-[16px] leading-[1.7] text-body max-w-[52ch]">
              I&rsquo;m keeping this link current instead of leaving an old PDF online.
              Email me and I&rsquo;ll send the version most relevant to the role.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={gmailComposeUrl("Résumé request", RESUME_REQUEST_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-ink text-canvas text-[15px] font-medium px-[22px] py-[13px] rounded-full transition-colors hover:bg-accent"
              >
                Request my résumé
                <span aria-hidden="true" className="font-mono text-[13px]">
                  →
                </span>
              </a>
              <Link
                href="/work"
                className="inline-flex items-center gap-2.5 text-ink text-[15px] font-medium px-[22px] py-[13px] rounded-full border border-line-strong bg-surface transition-colors hover:border-ink"
              >
                View the work
              </Link>
            </div>
          </section>
        </Shell>
      </div>
    );
  }

  redirect(`/resume/${RESUME_FILENAME}`);
}
