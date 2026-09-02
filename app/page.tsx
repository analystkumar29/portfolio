import Link from "next/link";
import Image from "next/image";
import { WorkShowcase } from "@/components/work-showcase";
import {
  Chip,
  GhostLink,
  Label,
  LiveDot,
  PrimaryLink,
  SectionHeading,
  Shell,
} from "@/components/ui";
import { SITE } from "@/lib/projects";
import { homeSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { ContactForm } from "@/components/contact-form";

const PROOF_CHIPS = [
  "Booking & service operations",
  "Local SEO & multi-location content",
  "AI chat / voice workflows",
  "Privacy-aware product design",
];

const AFTER_STEPS = [
  {
    title: "A customer finds you",
    body: "Local search, a real page for their problem, not a generic homepage.",
  },
  {
    title: "They understand and act",
    body: "Price, coverage and warranty answered before you ask them to commit.",
  },
  {
    title: "The business gets a useful handoff",
    body: 'A structured job with everything attached — not an email saying "hi, interested".',
  },
  {
    title: "A workflow helps the team respond",
    body: "Assignment, status, reminders and confirmations that don't depend on memory.",
  },
  {
    title: "The customer gets a better outcome",
    body: "Which is the only part of this they'll ever describe to a friend.",
  },
];

const LANES = [
  {
    lane: "Lane 01",
    title: "Website foundations",
    forWho: "For a business that needs a credible front door.",
    items: [
      "A clear offer and obvious next step",
      "Service-area or multi-location structure",
      "SEO-ready pages and an analytics foundation",
      "Contact routes that match how you actually reply",
    ],
  },
  {
    lane: "Lane 02",
    title: "Lead & booking systems",
    forWho: "For when a contact form isn't enough.",
    items: [
      "Guided booking or quote flows",
      "Availability and serviceability checks",
      "Confirmation and follow-up logic",
      "A simple team view of what's come in",
    ],
  },
  {
    lane: "Lane 03",
    title: "Customer-service automation",
    forWho: "For the questions you answer forty times a week.",
    items: [
      "Chat that answers from your approved information",
      "AI-assisted intake and callback routing",
      "A designed handoff to a human — always",
      "Conversation review, so it gets better",
    ],
  },
  {
    lane: "Lane 04",
    title: "Workflow cleanup",
    forWho: "For work that lives in inboxes, spreadsheets and memory.",
    items: [
      "Map what actually happens today",
      "Connect forms, email, calendar, CRM, database",
      "One operating dashboard, not five tabs",
      "Documented, so your team can own it",
    ],
  },
];

const HOW_I_WORK = [
  {
    title: "Understand both sides",
    body: "The customer's problem and the operator's problem are never the same problem. You have to hear both before you draw anything.",
  },
  {
    title: "Build the smallest useful system",
    body: "Not the first attractive screen. The smallest thing that changes what happens on a Tuesday afternoon.",
  },
  {
    title: "Connect it end to end",
    body: "Then walk the whole path myself — as a customer and as staff — before anyone else has to.",
  },
  {
    title: "Improve after launch",
    body: "Because that's when you find out what's actually true. All four sites above are still mine to keep honest.",
  },
];

const HONEST = [
  {
    title: "One source for every number",
    body: "Review counts, locations and prices come from data — not a sentence someone forgot to update.",
  },
  {
    title: "One canonical address",
    body: "Apex and www resolve to the same place, with canonical tags that agree.",
  },
  {
    title: "Watch what breaks after deploy",
    body: "A counter that renders as 0 is a data problem, and only real page checks catch it.",
  },
  {
    title: "Listen to the floor",
    body: "Whoever uses the admin every day writes the best bug report you'll ever get.",
  },
];

const BACKGROUND = [
  "IT support",
  "Device repair",
  "Customer service",
  "Supervision",
  "Computer science",
  "Data analytics",
];

export default function Home() {
  return (
    <>
      <JsonLd data={homeSchema()} />

      {/* Hero */}
      <header id="top" className="pt-14 sm:pt-20 pb-16 sm:pb-24">
        <Shell className="grid gap-10 lg:gap-16 lg:grid-cols-[1.05fr_1fr] items-center">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <LiveDot />
              <Label>Four live systems · Burnaby, BC</Label>
            </div>

            <h1 className="font-serif font-normal text-[clamp(38px,5.4vw,64px)] leading-[1.04] tracking-[-0.022em] text-balance text-ink">
              From first click to follow-up: websites and workflows that{" "}
              <em className="italic text-accent">run the business</em>.
            </h1>

            <p className="text-[clamp(16.5px,1.35vw,18.5px)] leading-[1.62] text-body max-w-[53ch]">
              I&rsquo;m Manoj. I build the front door, the handoff behind it, and the
              workflow that follows — websites, booking and lead flows, AI customer
              service, and the internal plumbing that keeps all of it useful after
              launch.
            </p>

            <div className="flex flex-wrap gap-3 pt-0.5">
              <PrimaryLink href="/work">
                See the systems
                <span aria-hidden="true" className="font-mono text-[13px]">
                  ↓
                </span>
              </PrimaryLink>
              <GhostLink href="#contact">Talk about a project</GhostLink>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2.5 pt-2 border-t border-line mt-1.5">
              {[
                "Service · Data · Restaurant · Retail",
                "Product, automation, support, operations",
                "Working across BC and remotely",
              ].map((line) => (
                <p key={line} className="font-mono text-[11px] text-faint pt-3.5">
                  {line}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 items-center">
              <span className="font-mono text-[10px] tracking-[0.13em] uppercase text-ghost">
                For hiring
              </span>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent border-b border-accent-line pb-px hover:text-accent-deep"
              >
                LinkedIn ↗
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent border-b border-accent-line pb-px hover:text-accent-deep"
              >
                GitHub ↗
              </a>
              <Link
                href="/resume"
                className="text-sm font-medium text-accent border-b border-accent-line pb-px hover:text-accent-deep"
              >
                Résumé →
              </Link>
              <span className="font-mono text-[10px] tracking-[0.13em] uppercase text-ghost sm:ml-2">
                For a project
              </span>
              <Link
                href="#services"
                className="text-sm font-medium text-accent border-b border-accent-line pb-px hover:text-accent-deep"
              >
                I need a better website or workflow →
              </Link>
            </div>
          </div>

          <figure className="self-start overflow-hidden rounded-2xl border border-[#e4ddd0] bg-surface shadow-[0_1px_2px_rgba(26,24,20,0.03),0_26px_50px_-34px_rgba(26,24,20,0.35)]">
            <div className="relative aspect-square bg-inset">
              <Image
                src="/manoj-kumar-portrait.webp"
                alt="Manoj Kumar, Product and Automation Engineer"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="flex flex-wrap items-end justify-between gap-4 border-t border-line bg-surface px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex flex-col gap-1">
                <Label tone="accent" className="tracking-[0.14em]">
                  Manoj Kumar · Burnaby, BC
                </Label>
                <p className="font-serif text-[21px] leading-tight text-ink">
                  Product &amp; Automation Engineer
                </p>
              </div>
              <p className="max-w-[19ch] text-right font-mono text-[10px] leading-[1.55] tracking-[0.08em] uppercase text-faint">
                Open to roles and select client work
              </p>
            </figcaption>
          </figure>
        </Shell>
      </header>

      {/* Proof strip */}
      <section className="border-y border-line bg-sunk">
        <Shell className="py-6 flex flex-wrap items-center gap-x-7 gap-y-3.5">
          <p className="font-serif text-[18px] text-[#3b362d] italic">
            Built for real users, real operations, and real next steps.
          </p>
          <ul className="flex flex-wrap gap-2 lg:ml-auto">
            {PROOF_CHIPS.map((chip) => (
              <Chip key={chip}>{chip}</Chip>
            ))}
          </ul>
        </Shell>
      </section>

      {/* Selected systems */}
      <section id="work" className="scroll-mt-[62px] pt-16 sm:pt-24">
        <Shell>
          <SectionHeading
            index="01"
            eyebrow="Selected systems"
            title="Four businesses. Four different problems behind the screen."
            lede="Every one of these is live, and I built all of it myself — the domain, the design, the database, the SEO, the automation, and the maintenance since. Switch the view to see what the business gets, not just what the customer sees."
          />
        </Shell>

        <WorkShowcase />

        <Shell className="pt-14 sm:pt-20">
          <div className="border border-line rounded-2xl bg-sunk p-6 sm:p-10">
            <Label tone="accent" className="tracking-[0.14em]">
              Keeping live systems honest
            </Label>
            <h3 className="font-serif text-[clamp(24px,2.6vw,32px)] leading-[1.15] text-ink pt-3 pb-2">
              Launch is a checkpoint, not the finish.
            </h3>
            <p className="text-[15px] leading-[1.6] text-body max-w-[60ch]">
              Four things I check on my own sites, because live systems drift.
            </p>
            <ul className="grid gap-6 sm:grid-cols-2 pt-8">
              {HONEST.map((item) => (
                <li key={item.title} className="flex flex-col gap-1.5">
                  <p className="text-[15px] font-medium text-ink">{item.title}</p>
                  <p className="text-[14px] leading-[1.6] text-body">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Shell>
      </section>

      {/* After the click */}
      <section id="after" className="scroll-mt-[62px] pt-20 sm:pt-28">
        <Shell>
          <SectionHeading
            index="02"
            eyebrow="What happens after the click"
            title="Most websites stop at the form. I care about what happens next."
            lede="The click is the cheap part. The expensive part is the missed call, the form that lands in an inbox nobody owns, the staff member retyping an address into a third tool, and the customer who books somewhere else while they wait."
          />

          <ol className="grid gap-px bg-line border border-line rounded-2xl overflow-hidden mt-4">
            {AFTER_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="bg-canvas p-6 sm:p-7 grid gap-x-5 gap-y-1.5 sm:grid-cols-[auto_minmax(0,26ch)_1fr] sm:items-baseline"
              >
                <span className="font-mono text-[11px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[16px] font-medium text-ink">{step.title}</span>
                <span className="text-[14.5px] leading-[1.6] text-body">
                  {step.body}
                </span>
              </li>
            ))}
          </ol>
        </Shell>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-[62px] pt-20 sm:pt-28">
        <Shell>
          <SectionHeading
            index="03"
            eyebrow="What I can build for you"
            title="Four kinds of work, depending on where it's stuck."
            lede="These aren't packages. Most projects are one lane with a bit of the next one, and the honest scoping conversation is free."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {LANES.map((lane) => (
              <div
                key={lane.lane}
                className="border border-line rounded-2xl bg-surface p-6 sm:p-7 flex flex-col gap-3"
              >
                <Label className="tracking-[0.14em]">{lane.lane}</Label>
                <h3 className="font-serif text-[24px] leading-tight text-ink">
                  {lane.title}
                </h3>
                <p className="text-[14.5px] text-muted italic">{lane.forWho}</p>
                <ul className="flex flex-col gap-2 pt-2 mt-1 border-t border-line-soft">
                  {lane.items.map((item) => (
                    <li
                      key={item}
                      className="text-[14.5px] leading-[1.55] text-body flex gap-2.5 pt-1"
                    >
                      <span
                        aria-hidden="true"
                        className="font-mono text-accent text-xs pt-1"
                      >
                        ·
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="font-serif text-[clamp(18px,2vw,23px)] leading-[1.5] text-ink italic text-balance max-w-[62ch] pt-10">
            I&rsquo;m usually most useful when a business already has real demand, but
            the path from inquiry to action is manual, unclear, or inconsistent.
          </p>
        </Shell>
      </section>

      {/* How I work */}
      <section className="pt-20 sm:pt-28">
        <Shell>
          <SectionHeading index="04" eyebrow="How I work" title="How I work." />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_I_WORK.map((step, i) => (
              <li
                key={step.title}
                className="border-t-2 border-accent-line pt-4 flex flex-col gap-2"
              >
                <span className="font-mono text-[11px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[16px] font-medium text-ink">{step.title}</p>
                <p className="text-[14.5px] leading-[1.6] text-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </Shell>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-[62px] pt-20 sm:pt-28">
        <Shell>
          <SectionHeading
            index="05"
            eyebrow="About"
            title="I've been the person on the other end of a bad system."
          />
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] items-start">
            <div className="flex flex-col gap-4 max-w-[62ch]">
              <p className="text-[16px] leading-[1.7] text-body">
                Before I was building products, I was doing IT support, repairing
                devices, handling customer service and supervising a team. I&rsquo;ve
                been the one retyping a booking into a second system, and the one
                explaining to a customer why nobody called them back.
              </p>
              <p className="text-[16px] leading-[1.7] text-body">
                That&rsquo;s the part I think makes the work different. When I design a
                booking flow now, I&rsquo;m thinking about the shift on a Tuesday
                afternoon as much as the homepage. A screen that looks great and
                creates twenty minutes of manual cleanup isn&rsquo;t finished.
              </p>
              <p className="text-[16px] leading-[1.7] text-body">
                Everything on this page — the domains, the design, the database, the
                SEO, the agents, the maintenance since — I built and still run myself.
                Computer science and data analytics behind it; support, repair and
                operations underneath it.
              </p>
              <p className="text-[16px] leading-[1.7] text-body">
                I&rsquo;m open to product engineering, AI and workflow automation,
                technical implementation and support engineering roles in BC or
                remotely — and I take on client work directly.
              </p>
            </div>

            <div className="border border-line rounded-2xl bg-surface p-6 flex flex-col gap-4">
              <Label className="tracking-[0.14em]">What&rsquo;s underneath it</Label>
              <ul className="flex flex-wrap gap-2">
                {BACKGROUND.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </ul>
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-4 mt-1 border-t border-line-soft">
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14.5px] text-accent hover:text-accent-deep"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14.5px] text-accent hover:text-accent-deep"
                >
                  GitHub ↗
                </a>
                <Link href="/resume" className="text-[14.5px] text-accent hover:text-accent-deep">
                  Résumé →
                </Link>
              </div>
              <p className="font-mono text-[11px] text-faint pt-4 mt-1 border-t border-line-soft">
                {SITE.name} · {SITE.location}
              </p>
            </div>
          </div>
        </Shell>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-[62px] pt-20 sm:pt-28">
        <Shell>
          <SectionHeading index="06" eyebrow="Contact" title="Contact." />
          <div className="border border-line rounded-2xl bg-sunk p-6 sm:p-10">
            <p className="font-serif text-[clamp(24px,3vw,38px)] leading-[1.18] tracking-[-0.015em] text-balance text-ink max-w-[26ch]">
              If your customers are waiting on a reply, your team is copying
              information between tools, or your website isn&rsquo;t pulling its weight
              — <em className="italic text-accent">tell me where it gets stuck</em>.
            </p>
            <p className="text-[15.5px] leading-[1.65] text-body max-w-[56ch] pt-5">
              I&rsquo;ll tell you what I&rsquo;d do about it. That conversation costs
              nothing, and I&rsquo;ll say so if it isn&rsquo;t work I&rsquo;m the right
              person for.
            </p>

            <div className="grid gap-10 lg:gap-14 lg:grid-cols-[1fr_1.1fr] pt-9 mt-8 border-t border-line">
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-1.5">
                  <Label className="tracking-[0.14em]">Email</Label>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-[17px] text-accent hover:text-accent-deep w-fit"
                  >
                    {SITE.email}
                  </a>
                  <p className="text-[13.5px] text-muted">
                    Best for scoping a project or a role.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="tracking-[0.14em]">Call or text</Label>
                  <a
                    href={SITE.phoneHref}
                    className="text-[17px] text-accent hover:text-accent-deep w-fit"
                  >
                    {SITE.phone}
                  </a>
                  <p className="text-[13.5px] text-muted">
                    Text is fine, and usually faster.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="tracking-[0.14em]">Or start here</Label>
                  <Link
                    href="/work/travelling-technicians"
                    className="text-[14.5px] text-body hover:text-accent w-fit"
                  >
                    Hiring? Open the flagship system map &rarr;
                  </Link>
                  <Link
                    href="#services"
                    className="text-[14.5px] text-body hover:text-accent w-fit"
                  >
                    Running a business? See the four lanes &rarr;
                  </Link>
                </div>
              </div>

              {process.env.RESEND_API_KEY ? (
                <ContactForm />
              ) : (
                <div className="border border-line rounded-2xl bg-surface p-6 sm:p-8 flex flex-col items-start gap-4">
                  <Label tone="accent" className="tracking-[0.14em]">
                    The fastest route
                  </Label>
                  <p className="font-serif text-[clamp(22px,2.4vw,30px)] leading-[1.25] text-ink text-balance">
                    Email or text me directly.
                  </p>
                  <p className="text-[15px] leading-[1.65] text-body max-w-[45ch]">
                    Whether you&rsquo;re hiring or have a project in mind, a few lines
                    about the role or the problem is plenty. I read every message
                    myself.
                  </p>
                  <a
                    href={`mailto:${SITE.email}?subject=Portfolio%20enquiry`}
                    className="inline-flex items-center gap-2.5 bg-ink text-canvas text-[15px] font-medium px-[22px] py-[13px] rounded-full transition-colors hover:bg-accent"
                  >
                    Email Manoj
                    <span aria-hidden="true" className="font-mono text-[13px]">
                      →
                    </span>
                  </a>
                  <p className="font-mono text-[10.5px] tracking-[0.06em] text-faint">
                    {SITE.email} · {SITE.phone}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Shell>
      </section>
    </>
  );
}
