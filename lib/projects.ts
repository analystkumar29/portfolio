/**
 * The content model behind every project card and case study.
 *
 * Sourcing rule for this file: a claim only goes in if it is visible on the
 * live site or verifiable in the project's own repository. Anything that
 * needs Manoj to confirm scope, permission or a number is marked `review`
 * and rendered with a visible flag rather than asserted quietly.
 */

export type Step = { label: string; note?: string };

export type Decision = { title: string; body: string };

export type Project = {
  slug: string;
  index: string;
  name: string;
  domain: string;
  url: string;
  category: string;
  live: boolean;
  /** One-sentence outcome — case-study section 1. */
  outcome: string;
  /** Short form used on the home page and the work index. */
  teaser: string;
  /** The real business problem — section 2, in the first person. */
  problem: string;
  /** What was designed or built — section 3. */
  built: string;
  /** The customer's path through the product. */
  customerJourney: Step[];
  /** What the business receives once the customer acts. */
  operatorJourney: Step[];
  /** The line that explains why the operator side matters here. */
  operatorNote: string;
  /** Key decisions — section 5. Judgment, not features. */
  decisions: Decision[];
  /** Technical and operational proof — section 7. */
  stack: string[];
  /** Numbers that survive scrutiny. */
  metrics: { value: string; label: string; source: string }[];
  /** Outcome or validation — section 8. */
  validation: string[];
  /** What I would improve next — section 9. */
  next: string;
  evidence: { src: string; alt: string; caption: string } | null;
  links: { label: string; href: string }[];
  /** Items needing Manoj's confirmation before this page is promoted. */
  review: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "travelling-technicians",
    index: "01",
    name: "Travelling Technicians",
    domain: "travelling-technicians.ca",
    url: "https://www.travelling-technicians.ca/",
    category: "Field-service platform",
    live: true,
    outcome:
      "A doorstep repair service that can be found, booked, tracked and followed up — without anyone chasing a phone call.",
    teaser:
      "A database-driven SEO engine feeds a Stripe-backed booking funnel that dispatches technicians and issues warranties on its own.",
    problem:
      "A mobile repair business competes against every shop with a storefront and a Google listing. To be found at all, you need a page for the exact thing someone typed — \"iPhone 14 screen repair in Surrey\" — and there are thousands of those combinations. Writing them by hand is impossible, and generating them badly is worse than not having them. Then the harder half starts: a booking has to reach a technician, the customer has to know what it costs before they commit, and somebody has to issue the warranty and collect the review without retyping anything.",
    built:
      "Three machines that feed each other. An SEO page factory generates roughly 5,000 static pages from one catch-all template and a routes table in Postgres. A booking engine takes a three-step booking, prices it from a three-tier model, and settles it through Stripe. An operations layer gives staff a real-time admin surface and technicians a PWA where they claim jobs — with an AI chat assistant and an AI phone receptionist calling the same database tools the admin runs on.",
    customerJourney: [
      { label: "Find the local page", note: "city × service × device" },
      { label: "Price + warranty", note: "before committing" },
      { label: "Postal-code check", note: "do we even cover you" },
      { label: "Book in 3 steps", note: "device, contact, schedule" },
      { label: "Track the repair", note: "status, not silence" },
    ],
    operatorJourney: [
      { label: "Booking created", note: "postal code + device validated" },
      { label: "Technician assigned", note: "real-time admin" },
      { label: "Repair status", note: "visible to the customer" },
      { label: "Payment + confirmation", note: "Stripe webhook · Resend" },
      { label: "Warranty generated", note: "auto-issued with the invoice" },
      { label: "Review collected", note: "feeds the testimonials on the site" },
    ],
    operatorNote:
      "The chat and voice agents call the same business tools the admin uses — so they can create a booking or drop into the callback queue instead of just apologising.",
    decisions: [
      {
        title: "Denormalise the route payload, and let the database keep it honest",
        body: "Every generated page needs a city, a service, a device and a price. Joining five tables per page would make 5,000 pages expensive to build and slow to serve, so each route row carries a pre-joined JSONB payload and rendering a page is a single read. The obvious risk is staleness — so when an admin edits a price, database triggers rebuild the affected routes. The cache is maintained by the database, not by application code somebody has to remember to call.",
      },
      {
        title: "One money function, so a quote and an invoice can never disagree",
        body: "A quote on a service page, the checkout total, the confirmation email and the invoice are four places the same number appears. Computing it four times is how customers end up arguing with staff about $20. All of the money math lives in one function, and Stripe webhooks — not the browser — are what confirm a payment, auto-create the warranty and generate the invoice.",
      },
      {
        title: "Nothing is ever hard-deleted",
        body: "A universal soft-delete flag cascades through triggers, from pricing to routes to device models. Deleting a device model outright would silently break live URLs that Google has already indexed. Keeping history means SEO stability and an audit trail, and costs only a WHERE clause.",
      },
      {
        title: "The assistants get tools, not a script",
        body: "The chat assistant and the phone receptionist both call the live database — real prices, real coverage, real availability. An assistant that can only apologise and take a message is a more expensive contact form. These can quote a price at 11pm and create the booking.",
      },
    ],
    stack: [
      "Next.js",
      "PostgreSQL / Supabase",
      "Catch-all dynamic routes + ISR",
      "Stripe",
      "Resend",
      "AI chat (DeepSeek) + voice receptionist (Retell)",
      "Technician PWA",
    ],
    metrics: [
      { value: "~5,000", label: "static pages generated at build", source: "repo" },
      { value: "5", label: "route types from one template", source: "repo" },
      { value: "86 / 57 / 12", label: "tables, triggers, views in migrations", source: "repo" },
      { value: "4.8 ★", label: "from 57 verified reviews", source: "live site" },
    ],
    validation: [
      "Live across 13 service-area cities in the Lower Mainland.",
      "Booking, payment, warranty and review all run without a manual retype step.",
      "Structured FAQ data on roughly 3,300 pages for rich-result eligibility.",
      "Still maintained by me — the pricing, the routes and the agents are mine to keep honest.",
    ],
    next:
      "The build takes 90+ seconds because all ~5,000 pages render up front. Moving the long tail to on-demand generation and keeping only the high-intent routes prebuilt would cut that sharply — worth doing before the route table grows again.",
    evidence: {
      src: "/evidence/travelling-technicians-home.jpg",
      alt: "The Travelling Technicians homepage: doorstep phone and MacBook repair, with a postal-code serviceability check.",
      caption:
        "The homepage leads with price confidence and a coverage check, not a contact form. Captured July 2026.",
    },
    links: [{ label: "Visit travelling-technicians.ca", href: "https://www.travelling-technicians.ca/" }],
    review: [
      "The current portfolio copy says \"~9,000 SEO pages\"; the repo's own documentation says ~5,000. I have used 5,000. Confirm which is right before this goes in front of an employer.",
      "Confirm the client is comfortable with a homepage screenshot and the 4.8★ / 57-review figure being reproduced here.",
    ],
  },
  {
    slug: "immigration-timeline",
    index: "02",
    name: "Immigration Timeline",
    domain: "immigrationtimeline.ca",
    url: "https://www.immigrationtimeline.ca/",
    category: "Privacy-led data product",
    live: true,
    outcome:
      "A prediction product that is careful about what it doesn't know — and says so.",
    teaser:
      "Aggregates that refuse to compute below 25 people, ranges instead of dates, and a published methodology.",
    problem:
      "People waiting on an immigration decision are anxious, and anxious people are easy to sell false certainty to. A single confident date would convert better and be more shareable. It would also be wrong often enough to make somebody book a flight they lose money on. The product's whole job is to be useful without pretending to know more than it does.",
    built:
      "Applicants report their own milestone dates behind a passwordless sign-in. Those dates are aggregated into cohorts and published as ranges — never a single date — and only where the cohort is large enough to be anonymous. The methodology page explains the thresholds rather than hiding them, and the model's training date is stated on the page instead of implied.",
    customerJourney: [
      { label: "Report your milestones", note: "passwordless, email link" },
      { label: "See a range", note: "a window, with the uncertainty left in" },
      { label: "Read the methodology", note: "published, not summarised" },
      { label: "Come back tomorrow", note: "one reading a day" },
    ],
    operatorJourney: [
      { label: "Milestone reported", note: "readable only by the applicant" },
      { label: "k-anonymity ≥ 25", note: "enforced at rest and in every aggregate" },
      { label: "Cohort degrades", note: "cell → stream → global when too small" },
      { label: "Range computed", note: "never a single date" },
      { label: "Training date published", note: "stated on the page" },
    ],
    operatorNote:
      "Uncertainty is a field, not a disclaimer. If a cohort is too small to be anonymous, the number is not computed at all — it degrades to a broader group rather than being published carefully.",
    decisions: [
      {
        title: "k-anonymity ≥ 25, enforced at rest",
        body: "No aggregate is computed or stored for a cohort smaller than 25 people. The threshold is applied in every aggregate query and in the stored daily statistics — not filtered out at display time, where a second read path or a future API could quietly bypass it. When a cohort is too small, the reading degrades to a broader group instead of getting more specific.",
      },
      {
        title: "Passwordless, because there is no safe way to store what you don't have",
        body: "Access is an emailed one-time link. There is no password to breach, reuse or reset, and the verified address is the only thing keeping automated signups out. For a product holding immigration status data, the account you don't build is the one that can't leak.",
      },
      {
        title: "One reading a day, on purpose",
        body: "Every engagement instinct says add streaks, counters and refresh-worthy movement. This is a product people check when they are frightened. Most days nothing has changed, and the app says so — the anti-engagement choice is the ethical one and, over months of waiting, the retaining one.",
      },
      {
        title: "Publish the methodology, including where the data is thin",
        body: "The page names the two streams there is enough reported data to be honest about, and says plainly that you shouldn't make irreversible plans from an estimate. Documenting the limits is what makes the numbers usable at all.",
      },
    ],
    stack: [
      "Next.js",
      "Supabase / PostgreSQL",
      "Aggregate RPCs with k-anonymity enforced",
      "Passwordless email sign-in",
      "Published methodology page",
    ],
    metrics: [
      { value: "≥ 25", label: "k-anonymity floor on every aggregate", source: "repo + live site" },
      { value: "2", label: "streams with enough data to publish", source: "live site" },
      { value: "0", label: "passwords stored", source: "repo" },
    ],
    validation: [
      "Live, with the aggregation floor stated publicly on the sign-in page.",
      "Express Entry and spousal sponsorship are the only streams published — the ones with enough reported timelines to be defensible.",
      "Predictions are measured against real outcomes, including the stages that have never been checkable.",
    ],
    next:
      "The honest gap is coverage: two streams are published because the rest are too thin. More reported timelines is the only fix, and getting them without resorting to the engagement mechanics the product deliberately avoids is the actual design problem.",
    evidence: {
      src: "/evidence/immigration-timeline-home.jpg",
      alt: "The Immigration Timeline sign-in page, stating that no figure is computed below 25 people.",
      caption:
        "The privacy rules are on the sign-in page, before you hand over anything. Captured July 2026.",
    },
    links: [
      { label: "Visit immigrationtimeline.ca", href: "https://www.immigrationtimeline.ca/" },
      { label: "Read the methodology", href: "https://www.immigrationtimeline.ca/methodology" },
    ],
    review: [
      "State your exact role here in one line — product, UX, frontend, data model, ingestion, analysis, deployment, or all of it. The brief flags this as the one project where an inflated scope claim would be most damaging.",
      "The previous version of this page cited \"126,953 reported timelines\" and a training date. I have left both out until you confirm the figure and that you may publish it.",
      "The live product is now branded IRCC Tracker. Decide which name this case study should use.",
    ],
  },
  {
    slug: "indian-burger-joint",
    index: "03",
    name: "Indian Burger Joint",
    domain: "indianburgerjoint.com",
    url: "https://www.indianburgerjoint.com/",
    category: "Multi-location brand platform",
    live: true,
    outcome:
      "One brand, two funnels: tonight's order and next year's franchise partner.",
    teaser:
      "A loud, food-first brand that keeps a dinner order and a franchise enquiry from competing for the same button.",
    problem:
      "A vegetarian burger is an unfamiliar idea for a lot of people, so the site has to sell the food before it explains anything. But two very different people arrive at the same homepage: someone deciding where to eat in the next twenty minutes, and someone evaluating a franchise investment. Serving both from one funnel makes the page worse for both.",
    built:
      "A brand system that carries past the homepage, locations handled as content rather than hand-built pages, and a genuinely separate franchise route with its own page, its own energy and an information-pack request at the end.",
    customerJourney: [
      { label: "See the food", note: "big, hot, confident" },
      { label: "Pick a location", note: "nearest, not a list" },
      { label: "Order now", note: "handed off per location" },
    ],
    operatorJourney: [
      { label: "Location published", note: "one content source, not six pages" },
      { label: "Store count derived", note: "opening a seventh doesn't create a lie" },
      { label: "Order route", note: "handed off per location" },
      { label: "Franchise enquiry", note: "a separate, higher-value funnel" },
      { label: "Information pack sent", note: "qualified, and tracked separately" },
    ],
    operatorNote:
      "Two audiences, kept apart on purpose. Someone ordering dinner and someone considering a franchise want completely different pages. Blending them would cost both.",
    decisions: [
      {
        title: "Locations are a content type, not six hand-built pages",
        body: "The site scales with the business instead of drifting away from it. This is the difference between a site that ages well and one that quietly starts lying about how many stores there are — a real failure mode I have watched happen to this exact page.",
      },
      {
        title: "Derive the store count instead of writing it down",
        body: "A homepage sentence saying \"5 locations\" above six location cards is a small thing that costs real credibility, and it is guaranteed to happen the moment a number lives in prose rather than in data. Deriving it from published locations means opening a seventh store can't create a contradiction.",
      },
      {
        title: "Give franchising its own funnel",
        body: "A dinner order is a two-minute decision; a franchise is a life decision. They need different pages, different pacing and different calls to action, and the franchise lead is worth enough to justify a route of its own rather than a link in the footer.",
      },
      {
        title: "Loud on purpose",
        body: "This is the highest-volume thing here, and it sits two cards away from the quietest. The restraint on a privacy-led data product and the volume on a food brand are the same skill pointed at different stakes — matching the register to what's actually at risk for the customer.",
      },
    ],
    stack: [
      "Content-modelled locations",
      "Dual conversion paths",
      "Brand system beyond the homepage",
      "Franchise lead capture",
    ],
    metrics: [
      { value: "2", label: "separate conversion funnels", source: "live site" },
      { value: "6", label: "locations published", source: "live site" },
    ],
    validation: [
      "Live, with ordering and franchise routes both reachable from the homepage.",
      "The franchise page carries the same brand identity into a completely different conversion journey.",
    ],
    next:
      "The franchise funnel ends at an information-pack request, which is a lead but not a qualified one. A short structured intake — capital, territory, timeline — would let the client spend their follow-up time on the applicants worth calling.",
    evidence: {
      src: "/evidence/indian-burger-joint-home.jpg",
      alt: "The Indian Burger Joint homepage: a dark, food-led hero reading Authentic Indian Burgers.",
      caption:
        "The loudest thing on this site is the food, and that is the point. Captured July 2026.",
    },
    links: [
      { label: "Visit indianburgerjoint.com", href: "https://www.indianburgerjoint.com/" },
      { label: "See the franchise funnel", href: "https://www.indianburgerjoint.com/franchise" },
    ],
    review: [
      "This is the one project with no repository I could check, so its case study is written from what is publicly visible on the live site. Add the build details you own — CMS, ordering integration, who maintains it.",
      "State your role and the client relationship. Confirm they are happy to be named and screenshotted.",
    ],
  },
  {
    slug: "raba-thrift",
    index: "04",
    name: "Raba Thrift",
    domain: "rabathrift.ca",
    url: "https://www.rabathrift.ca/",
    category: "Community retail & donation engine",
    live: true,
    outcome: "A thrift store's site that creates supply, not just store hours.",
    teaser:
      "Donation-first, with per-city pickup pages and phone, text and WhatsApp treated as real routes.",
    problem:
      "A thrift store runs on donations. Most thrift store websites are built around shopping and opening hours, which optimises the half of the business that isn't the constraint. Stock is the constraint — so donating has to be the main action, and it has to work for people who will never fill in a form.",
    built:
      "A donation-led site where booking a free pickup is the primary action, with per-city pickup pages as a repeatable local-SEO pattern, a Sanity-managed content layer for guides and shop content, and phone, text and WhatsApp presented as first-class routes rather than fallbacks.",
    customerJourney: [
      { label: "Book a free pickup", note: "area + items up front" },
      { label: "Or shop the store", note: "curated secondhand" },
      { label: "Or call / text / WhatsApp", note: "whichever you'd actually do" },
    ],
    operatorJourney: [
      { label: "Pickup requested", note: "area + items captured up front" },
      { label: "Area page", note: "a repeatable local-SEO pattern" },
      { label: "Staff follow-up", note: "a route that makes geographic sense" },
      { label: "Donation received", note: "stock in, community value out" },
    ],
    operatorNote:
      "Phone, text and WhatsApp are first-class. Plenty of donors will never fill in a form. Treating those as real routes instead of fallbacks is the difference between a lead and a lost one.",
    decisions: [
      {
        title: "Optimise for supply, not demand",
        body: "The same service-area pattern as the repair platform, aimed in the opposite direction — at getting stock in rather than customers out. Donating is the primary call to action on every screen, because that is the part of the business that actually limits it.",
      },
      {
        title: "Capture the area before the conversation",
        body: "A pickup request arrives as a structured job with an area and item list attached, so the van route can be planned instead of reconstructed from voicemails. The difference between a lead and a job is whether the information needed to act on it arrived with it.",
      },
      {
        title: "Per-city pickup pages as an acquisition pattern",
        body: "Each area gets a real page rather than one generic pickup form, which is how a local search for \"donation pickup\" in a specific town finds this store instead of a national charity. It is a repeatable pattern, not one-off content.",
      },
      {
        title: "Make the community reason visible",
        body: "The store supports Ruth & Naomi's Mission and Archway Community Services. That is the actual answer to \"why this store instead of the donation bin down the road\", so it belongs on the page rather than in an About section nobody opens.",
      },
    ],
    stack: [
      "Next.js 16",
      "Sanity CMS",
      "Supabase",
      "Resend",
      "Per-city pickup routes",
      "Multi-channel lead capture",
    ],
    metrics: [
      { value: "4.5 ★", label: "on Google, from 24 reviews", source: "live site" },
      { value: "3", label: "contact routes treated as first-class", source: "live site" },
    ],
    validation: [
      "Live in Chilliwack with free-pickup booking, shop content and community pages.",
      "Pickup requests arrive structured, with the area attached.",
      "Supports Ruth & Naomi's Mission and Archway Community Services, stated on the homepage.",
    ],
    next:
      "Pickup requests are structured but not yet routed — batching them into a sensible route for a single van run is the next real operational saving, and it is a scheduling problem rather than a website one.",
    evidence: {
      src: "/evidence/raba-thrift-home.jpg",
      alt: "The Raba Thrift homepage: Discover Unique, Affordable Finds, with a Donate Today call to action.",
      caption:
        "Donating sits beside shopping in the hero, not below the opening hours. Captured July 2026.",
    },
    links: [{ label: "Visit rabathrift.ca", href: "https://www.rabathrift.ca/" }],
    review: [
      "The brief noted the apex domain raba-thrift.ca did not resolve while www.rabathrift.ca was healthy. Worth fixing before this is linked from a portfolio.",
      "Confirm the client is happy to be named and screenshotted.",
    ],
  },
];

export function projectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export const SITE = {
  name: "Manoj Kumar",
  role: "Product & Automation Engineer",
  location: "Burnaby, British Columbia",
  email: "hello@manojkumar.ca",
  /** TODO: replace with the real number — the design shipped with a placeholder. */
  phone: "+1 604 000 0000",
  phoneHref: "tel:+16040000000",
  phoneIsPlaceholder: true,
  url: "https://portfolio-blue-three-62.vercel.app",
  description:
    "I build high-converting websites, customer-service automation, and practical internal workflows that help service businesses respond faster and operate with less manual work.",
};
