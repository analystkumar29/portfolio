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
import { gmailComposeUrl, SITE } from "@/lib/projects";
import { homeSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";

const PROOF_STATS = [
  {
    value: "547K",
    label: "Google search impressions",
    source: "Travelling Technicians · Feb–Oct 2026",
  },
  {
    value: "~9,000",
    label: "pages generated from one Postgres table",
    source: "Travelling Technicians",
  },
  {
    value: "336",
    label: "monthly active users, in 33 countries",
    source: "Immigration Timeline · Nov 2026",
  },
  {
    value: "1,400+",
    label: "commits shipped since April 2025",
    source: "Travelling Technicians repo",
  },
];

const ALSO_BUILT = [
  {
    name: "KhetBuddy",
    meta: "Farming app for Apple Ber growers in Haryana · 2026 prototype",
    body: "A bilingual Hindi/English PWA on Next.js and Supabase Postgres (17 tables). A leaf photo goes through a two-step AI diagnosis — Gemini describes it, DeepSeek returns a structured result, and Claude takes over if either step fails — and daily wholesale-market prices are pulled from India’s open-data API and cached in Postgres.",
    tags: ["Next.js", "Supabase", "Open-data API", "Multi-model AI", "ESP32 sensor design"],
  },
  {
    name: "Metabolic Momentum",
    meta: "Smartwatch app for the Amazfit Active 2 · 2026",
    body: "Estimates calories left for the day in real time from heart rate, combining the Mifflin-St Jeor and Keytel formulas, with a median filter that drops bad sensor readings. Food lookups use the USDA FoodData Central API. Over 100 unit and integration tests, and profiled for memory and battery on a real watch.",
    tags: ["Zepp OS", "JavaScript", "Signal filtering", "100+ tests"],
  },
  {
    name: "SkyAptitude",
    meta: "Aptitude-test trainer for pilot and air-traffic-control applicants · 2026",
    body: "Eight generated question modules and seven employer presets. A verification script enumerates every possible answer to prove each generated question has exactly one correct one, alongside Playwright end-to-end tests, strict security headers and accessibility fixes.",
    tags: ["JavaScript", "Vercel serverless", "Playwright", "Generated content, verified"],
  },
];

const SKILLS = [
  {
    group: "Data",
    items: [
      "SQL · PostgreSQL",
      "Python · Pandas · scikit-learn",
      "Survival analysis (Kaplan–Meier)",
      "Power BI",
      "Excel",
      "Google Search Console",
    ],
  },
  {
    group: "Web & back end",
    items: [
      "TypeScript",
      "React · Next.js",
      "Node.js",
      "Tailwind CSS",
      "Supabase",
      "REST APIs · webhooks",
      "Stripe",
      "Cloudflare Workers",
    ],
  },
  {
    group: "AI",
    items: [
      "Claude Code · Cursor · Codex",
      "LLM tool calling",
      "Chat + voice agents",
      "MCP servers",
    ],
  },
  {
    group: "Practices & support",
    items: [
      "Git · GitHub Actions",
      "Jest",
      "Docker",
      "Vercel",
      "IT support · UAT",
      "Apple ACMT + ACiT (2023)",
    ],
  },
];

const EXPERIENCE = [
  {
    role: "Founder & Full-Stack Developer",
    org: "The Travelling Technicians · Burnaby",
    dates: "Jul 2024 – present",
    note: "Built and run the booking, payments, dispatch and AI-agent platform behind my doorstep phone and laptop repair business — and do the repairs.",
  },
  {
    role: "Store Supervisor, promoted from Service Technician",
    org: "London Drugs · Squamish",
    dates: "Jan 2023 – Jul 2024",
    note: "Promoted twice in ten months after earning Apple ACMT and ACiT certifications. Ran schedules and escalations, and led a team of eight through the yearly inventory count.",
  },
  {
    role: "Restaurant Operations Manager",
    org: "Payal Chaat House · Surrey",
    dates: "2021",
    note: "Daily operations, staff scheduling, inventory and customer service.",
  },
  {
    role: "Customer Support & Platform Specialist",
    org: "Intelnet Global Service · New Delhi",
    dates: "Jun 2018 – Aug 2019",
    note: "Supported MakeMyTrip travellers and Snapdeal sellers, trained users, reported recurring issues and helped with user acceptance testing.",
  },
];

const EDUCATION = [
  { what: "Post-Degree Diploma, Data Analytics", where: "Langara College, Vancouver · 2020" },
  {
    what: "B.Tech, Computer Science and Engineering",
    where: "Maharshi Dayanand University, India · 2018",
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
              <Label>Open to work · Burnaby, BC · Available now</Label>
            </div>

            <h1 className="font-serif font-normal text-[clamp(38px,5.4vw,64px)] leading-[1.04] tracking-[-0.022em] text-balance text-ink">
              Developer &amp; data analyst. Four systems I built are live, and{" "}
              <em className="italic text-accent">people use them</em>.
            </h1>

            <p className="text-[clamp(16.5px,1.35vw,18.5px)] leading-[1.62] text-body max-w-[56ch]">
              I&rsquo;m Manoj. I built and still run the booking platform behind my own
              repair business — Next.js, PostgreSQL and Stripe, about 9,000 generated
              pages and 547,000 Google search impressions since February — and a
              privacy-first data product that estimates immigration wait times for 336
              monthly users. A computer science degree, a data analytics diploma, and
              years of IT support and repair behind it.
            </p>

            <div className="flex flex-wrap gap-3 pt-0.5">
              <PrimaryLink href="/resume">
                Download résumé
                <span aria-hidden="true" className="font-mono text-[13px]">
                  ↓
                </span>
              </PrimaryLink>
              <GhostLink href="#work">See the work</GhostLink>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2.5 pt-2 border-t border-line mt-1.5">
              {[
                "Developer · Data analyst · Application support",
                "Full-time · BC or remote",
                "Canadian PR · no sponsorship needed",
              ].map((line) => (
                <p key={line} className="font-mono text-[11px] text-faint pt-3.5">
                  {line}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 items-center">
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
              <a
                href={gmailComposeUrl("Role for Manoj Kumar")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent border-b border-accent-line pb-px hover:text-accent-deep"
              >
                Email ↗
              </a>
              <Link
                href="#services"
                className="text-sm text-muted border-b border-line-strong pb-px hover:text-accent sm:ml-2"
              >
                Running a business? Client work →
              </Link>
            </div>
          </div>

          <figure className="self-start overflow-hidden rounded-2xl border border-[#e4ddd0] bg-surface shadow-[0_1px_2px_rgba(26,24,20,0.03),0_26px_50px_-34px_rgba(26,24,20,0.35)]">
            <div className="relative aspect-square bg-inset">
              <Image
                src="/manoj-kumar-portrait.webp"
                alt="Manoj Kumar, developer and data analyst"
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
                  {SITE.role}
                </p>
              </div>
              <p className="max-w-[19ch] text-right font-mono text-[10px] leading-[1.55] tracking-[0.08em] uppercase text-faint">
                Open to full-time roles · BC or remote
              </p>
            </figcaption>
          </figure>
        </Shell>
      </header>

      {/* Proof strip */}
      <section className="border-y border-line bg-sunk">
        <Shell className="py-7 sm:py-8">
          <ul className="grid gap-x-8 gap-y-6 grid-cols-2 lg:grid-cols-4">
            {PROOF_STATS.map((stat) => (
              <li key={stat.label} className="flex flex-col gap-1">
                <span className="font-serif text-[clamp(30px,3.4vw,42px)] leading-none tracking-[-0.02em] text-ink">
                  {stat.value}
                </span>
                <span className="text-[14px] leading-[1.45] text-body">{stat.label}</span>
                <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-faint">
                  {stat.source}
                </span>
              </li>
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
            title="Four live systems. Four different problems behind the screen."
            lede="Every one of these is live, and I built all of it myself — the domain, the design, the database, the SEO, the automation, and the maintenance since. Switch the view to see what the customer sees."
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

      {/* Also built */}
      <section className="pt-16 sm:pt-20">
        <Shell>
          <div className="flex flex-col gap-2 pb-6">
            <Label tone="accent" className="tracking-[0.14em]">
              Also built
            </Label>
            <h3 className="font-serif text-[clamp(24px,2.6vw,32px)] leading-[1.15] text-ink">
              Smaller projects, same habits.
            </h3>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {ALSO_BUILT.map((item) => (
              <div
                key={item.name}
                className="border border-line rounded-2xl bg-surface p-6 flex flex-col gap-3"
              >
                <p className="font-serif text-[22px] leading-tight text-ink">{item.name}</p>
                <p className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-faint">
                  {item.meta}
                </p>
                <p className="text-[14.5px] leading-[1.6] text-body">{item.body}</p>
                <ul className="flex flex-wrap gap-2 pt-1 mt-auto">
                  {item.tags.map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* Skills */}
      <section id="skills" className="scroll-mt-[62px] pt-20 sm:pt-28">
        <Shell>
          <SectionHeading
            index="02"
            eyebrow="Skills"
            title="What I work with every day."
            lede="Each of these is in use in the live projects above or was part of my data analytics training."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SKILLS.map((block) => (
              <div
                key={block.group}
                className="border border-line rounded-2xl bg-surface p-6 flex flex-col gap-3"
              >
                <Label tone="accent" className="tracking-[0.14em]">
                  {block.group}
                </Label>
                <ul className="flex flex-col gap-2 pt-1">
                  {block.items.map((item) => (
                    <li key={item} className="text-[14.5px] leading-[1.5] text-body">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* Experience */}
      <section id="about" className="scroll-mt-[62px] pt-20 sm:pt-28">
        <Shell>
          <SectionHeading
            index="03"
            eyebrow="Experience"
            title="I&rsquo;ve been the person on the other end of a bad system."
          />
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] items-start">
            <div className="flex flex-col gap-4 max-w-[62ch]">
              <p className="text-[16px] leading-[1.7] text-body">
                Before I wrote production code, I did IT support, repaired devices,
                handled customer service and supervised a team. I&rsquo;ve been the one
                retyping a booking into a second system, and the one explaining to a
                customer why nobody called them back. That&rsquo;s why I build the staff
                side of a system as carefully as the customer side.
              </p>
              <p className="text-[16px] leading-[1.7] text-body">
                Everything on this page — the domains, the design, the database, the SEO,
                the AI agents and the maintenance since — I built and still run myself. I
                use AI coding agents (Claude Code, Cursor, Codex) as my main tools, and
                tests to check what they produce.
              </p>
              <p className="text-[16px] leading-[1.7] text-body">
                I&rsquo;m looking for a full-time developer, data analyst or application
                support role in BC or remote. Canadian Permanent Resident, available
                immediately.
              </p>

              <ol className="flex flex-col border-t border-line mt-4">
                {EXPERIENCE.map((job) => (
                  <li
                    key={job.role}
                    className="grid gap-x-6 gap-y-1 py-5 border-b border-line sm:grid-cols-[minmax(0,1fr)_auto]"
                  >
                    <p className="text-[16px] font-medium text-ink">{job.role}</p>
                    <p className="font-mono text-[11px] text-faint sm:text-right sm:pt-1">
                      {job.dates}
                    </p>
                    <p className="text-[14px] text-muted sm:col-span-2">{job.org}</p>
                    <p className="text-[14.5px] leading-[1.6] text-body sm:col-span-2 pt-1">
                      {job.note}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border border-line rounded-2xl bg-surface p-6 flex flex-col gap-4">
              <Label className="tracking-[0.14em]">Education</Label>
              <ul className="flex flex-col gap-3">
                {EDUCATION.map((item) => (
                  <li key={item.what} className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-medium text-ink">{item.what}</span>
                    <span className="text-[13.5px] text-muted">{item.where}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 mt-1 border-t border-line-soft flex flex-col gap-3">
                <Label className="tracking-[0.14em]">What&rsquo;s underneath it</Label>
                <ul className="flex flex-wrap gap-2">
                  {BACKGROUND.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-4 mt-1 border-t border-line-soft">
                <Link href="/resume" className="text-[14.5px] text-accent hover:text-accent-deep">
                  Résumé (PDF) ↓
                </Link>
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
              </div>
              <p className="font-mono text-[11px] text-faint pt-4 mt-1 border-t border-line-soft">
                {SITE.name} · {SITE.location}
              </p>
            </div>
          </div>
        </Shell>
      </section>

      {/* For businesses */}
      <section id="services" className="scroll-mt-[62px] pt-20 sm:pt-28">
        <Shell>
          <SectionHeading
            index="04"
            eyebrow="For businesses"
            title="I also take on select client projects."
            lede="Two of the four systems above are client work. If your business has real demand but the path from inquiry to action is manual, these are the four kinds of work I do."
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
        </Shell>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-[62px] pt-20 sm:pt-28">
        <Shell>
          <SectionHeading index="05" eyebrow="Contact" title="Contact." />
          <div className="border border-line rounded-2xl bg-sunk p-6 sm:p-10">
            <p className="font-serif text-[clamp(24px,3vw,38px)] leading-[1.18] tracking-[-0.015em] text-balance text-ink max-w-[26ch]">
              Hiring a developer or data analyst?{" "}
              <em className="italic text-accent">Let&rsquo;s talk.</em>
            </p>
            <p className="text-[15.5px] leading-[1.65] text-body max-w-[56ch] pt-5">
              A few lines about the role is plenty, and my résumé is one click away. If
              you run a business and need a website or workflow fixed, the same email
              works.
            </p>

            <div className="grid gap-10 lg:gap-14 lg:grid-cols-[1fr_1.1fr] pt-9 mt-8 border-t border-line">
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-1.5">
                  <Label className="tracking-[0.14em]">Email</Label>
                  <a
                    href={gmailComposeUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[17px] text-accent hover:text-accent-deep w-fit"
                  >
                    {SITE.email}
                  </a>
                  <p className="text-[13.5px] text-muted">
                    Best for a role or a project.
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
                  <Link href="/resume" className="text-[14.5px] text-body hover:text-accent w-fit">
                    Download my résumé &rarr;
                  </Link>
                  <Link
                    href="/work/travelling-technicians"
                    className="text-[14.5px] text-body hover:text-accent w-fit"
                  >
                    Read the flagship case study &rarr;
                  </Link>
                  <Link
                    href="#services"
                    className="text-[14.5px] text-body hover:text-accent w-fit"
                  >
                    Running a business? See client work &rarr;
                  </Link>
                </div>
              </div>
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
                  href={gmailComposeUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
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
            </div>
          </div>
        </Shell>
      </section>
    </>
  );
}
