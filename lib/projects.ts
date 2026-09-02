/**
 * The content model behind every project card and case study.
 *
 * Sourcing rule for this file: a claim only goes in if it is visible on the
 * live site, a project repository, or Manoj's confirmed implementation scope.
 */

export type Step = { label: string; note?: string };

export type Decision = { title: string; body: string };

export type Shot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  domain: string;
  url: string;
  category: string;
  /** Concise period shown on the public case study. */
  timeframe: string;
  live: boolean;
  /** Own product vs client work — the single most useful framing for both audiences. */
  ownership: "Own product" | "Client work";
  /** Exact scope, in Manoj's words. No inflated titles. */
  role: string;
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
  evidence: Shot | null;
  /** Additional annotated evidence, shown as a gallery on the case study. */
  gallery: Shot[];
  links: { label: string; href: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "travelling-technicians",
    index: "01",
    name: "Travelling Technicians",
    domain: "travelling-technicians.ca",
    url: "https://www.travelling-technicians.ca/",
    category: "Field-service platform",
    timeframe: "2025–present",
    live: true,
    ownership: "Own product",
    role: "Everything: idea, product, design, database, SEO system, booking and payments, admin and technician tooling, the AI agents, and the maintenance since.",
    outcome:
      "A doorstep repair service that can be found, booked, tracked and followed up — without anyone chasing a phone call.",
    teaser:
      "A database-driven SEO engine feeds a Stripe-backed booking funnel that dispatches technicians and issues warranties on its own.",
    problem:
      "A mobile repair business competes against every shop with a storefront and a Google listing. To be found at all, you need a page for the exact thing someone typed — \"iPhone 14 screen repair in Surrey\" — and there are thousands of those combinations. Writing them by hand is impossible, and generating them badly is worse than not having them. Then the harder half starts: a booking has to reach a technician, the customer has to know what it costs before they commit, and somebody has to issue the warranty and collect the review without retyping anything.",
    built:
      "Three machines that feed each other. An SEO page factory turns a routes table in Postgres into roughly 9,000 addressable pages from a single catch-all template — about 5,000 prebuilt at deploy time and 6,000 published in the sitemap, with the rest rendering on first request and caching. A booking engine takes a three-step booking, prices it from a three-tier model, and settles it through Stripe. An operations layer gives staff a real-time admin surface and technicians a PWA where they claim jobs — with an AI chat assistant and AI phone receptionist calling the same database tools the admin runs on. A dedicated Google Business Profile MCP server lets AI workflows work with a real business surface rather than a disconnected prompt.",
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
        body: "The chat assistant and the phone receptionist both call the live database — real prices, real coverage, real availability — and the assistant knows which page it was opened from, so on the warranty page it opens by offering a warranty lookup. An assistant that can only apologise and take a message is a more expensive contact form. These can quote a price at 11pm and create the booking.",
      },
      {
        title: "Never trust a price from the browser",
        body: "The quoted price is re-checked against the database before anything is charged, and booking reference numbers are generated by the database rather than the client. Admin access has to clear three independent gates \u2014 server middleware, a layout gate, and per-endpoint token verification \u2014 with the JWT riding in both a Bearer header and an HttpOnly cookie so a cross-site script cannot read it. Row-level security is on across the tables, and anonymous access to customer data is revoked outright.",
      },
      {
        title: "Answer \u201cdo you even come here\u201d before anything else",
        body: "The first interaction on the homepage is a postal code check, and every generated city page lists the postal codes it actually serves. Telling someone you don\u2019t cover them in five seconds is a better experience than taking their booking and cancelling it, and it keeps the operations side clean — no bookings that have to be unwound by a human.",
      },
      {
        title: "Three price tiers, because \u201chow much\u201d has more than one honest answer",
        body: "Value, Recommended and Premium carry different parts and different warranty lengths, up to twelve months. A single price would either lose the budget customer or under-serve the one who wants the better screen. The tier chosen in step one of the booking is the same number that reaches Stripe, the invoice and the warranty record.",
      },
    ],
    stack: [
      "Next.js",
      "PostgreSQL / Supabase",
      "Catch-all dynamic routes + ISR",
      "Stripe",
      "Resend",
      "AI chat (DeepSeek) + voice receptionist (Retell)",
      "Google Business Profile MCP server",
      "Web push, QR codes + IndexNow",
      "Technician PWA",
    ],
    metrics: [
      { value: "8,948", label: "routes in the live index queue", source: "index run, Jul 2026" },
      { value: "6,000", label: "URLs published in the sitemap", source: "live sitemap" },
      { value: "94 / 203 / 617", label: "migrations, API routes and source files", source: "repo" },
      { value: "4.8 ★", label: "from 57 verified reviews", source: "live site" },
    ],
    validation: [
      "Live across 13 service-area cities in the Lower Mainland.",
      "Five route types — city, city+model, city+service, city+service+model, neighbourhood — all served from one template file.",
      "Booking, payment, warranty and review all run without a manual retype step.",
      "Structured FAQ data on roughly 3,300 pages for rich-result eligibility.",
      "Warranty coverage is self-serve: a customer can check it months later with a warranty number or booking reference, with no account.",
      "Payments run through Stripe with pay-later links, and Affirm, Klarna and Afterpay offered at checkout.",
      "The AI layer includes a dedicated Google Business Profile MCP server, so business-profile work can use real tools instead of a generic chat script.",
      "Still maintained by me — the pricing, the routes and the agents are mine to keep honest.",
    ],
    next:
      "The build takes 90+ seconds because ~5,000 pages render up front. Pushing more of the long tail to on-demand generation and prebuilding only the high-intent routes would cut that sharply — worth doing before the route table grows again.",
    evidence: {
      src: "/evidence/tt-home.jpg",
      width: 1568,
      height: 667,
      alt: "The Travelling Technicians homepage: doorstep phone and MacBook repair, with repair time, warranty and rating, and a postal-code serviceability check.",
      caption:
        "Repair time, warranty length and rating sit above the fold, and the first interaction is \u201cdo we cover you\u201d \u2014 not a contact form.",
    },
    gallery: [
      {
        src: "/evidence/tt-seo-page.jpg",
        width: 1470,
        height: 745,
        alt: "Generated page for screen replacement in Burnaby, showing a from-price, warranty, and the postal codes served.",
        caption:
          "One of ~9,000 generated pages: city \u00d7 service \u00d7 device, with a from-price, the warranty, and the actual postal codes covered. Every one of these is a row in the routes table, not a file.",
      },
      {
        src: "/evidence/tt-booking.jpg",
        width: 1470,
        height: 745,
        alt: "The booking flow at step 1 of 3, showing device, contact and schedule steps.",
        caption:
          "Three steps, with progress shown and the next step named. The device choice determines the price tier that later becomes the Stripe charge, the invoice and the warranty.",
      },
      {
        src: "/evidence/tt-assistant.jpg",
        width: 1470,
        height: 745,
        alt: "The AI assistant open on the warranty page, offering to look up a warranty by number or booking reference.",
        caption:
          "The assistant knows which page it was opened on. On the warranty page it opens by offering a lookup and naming the two reference formats \u2014 because it is calling the same database the admin runs on.",
      },
      {
        src: "/evidence/tt-warranty.jpg",
        width: 1470,
        height: 745,
        alt: "The warranty status page, accepting either a warranty number or a booking reference plus email.",
        caption:
          "Warranties are records, not PDFs in an inbox. A customer can check coverage months later with the reference they were emailed \u2014 no account, no phone call.",
      },
    ],
    links: [{ label: "Visit travelling-technicians.ca", href: "https://www.travelling-technicians.ca/" }],
  },
  {
    slug: "immigration-timeline",
    index: "02",
    name: "Immigration Timeline",
    domain: "immigrationtimeline.ca",
    url: "https://www.immigrationtimeline.ca/",
    category: "Privacy-led data product",
    timeframe: "2026–present",
    live: true,
    ownership: "Own product",
    role: "Idea to production, solo — the concept, the data model, the ingestion, the privacy thresholds, the prediction work, the interface and the deployment.",
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
      "Kaplan–Meier survival estimates",
      "Aggregate RPCs with k-anonymity enforced",
      "Passwordless email sign-in",
      "Cloudflare Turnstile",
      "Cohort chat + daily digest notifications",
      "Installable offline PWA",
      "Python retraining + calibration backtests",
      "Upstash rate limiting + BotID",
      "Architecture decision records",
      "Published methodology page",
    ],
    metrics: [
      { value: "126,953", label: "recorded stage transitions behind the model", source: "methodology page" },
      { value: "≥ 25", label: "weighted cases before anything is published", source: "repo + live site" },
      { value: "22 Jul 2026", label: "last trained, stated on the page", source: "methodology page" },
      { value: "0", label: "passwords stored", source: "repo" },
      { value: "69.8% / 88.1%", label: "measured IPCW coverage for published p25–p75 / p10–p90 bands", source: "repo backtest" },
    ],
    validation: [
      "Live, with the aggregation floor stated publicly on the sign-in page and again in the methodology.",
      "Express Entry and spousal sponsorship are the only streams published — the ones with enough reported timelines to be defensible.",
      "Every published row carries its own range and sample size, and stages the model has never been able to score are labelled as such.",
      "The methodology page states that today's model was built from a pre-launch community corpus, not from the site's own users — and says it will change when that changes.",
      "The published backtest reports the uncomfortable result too: the bands measured 69.8% coverage for a p25–p75 label and 88.1% for p10–p90; eleven late-stage milestones, including PPR, eCOPR and landing, are explicitly excluded from the coverage gate because the observation window cannot score them fairly.",
    ],
    next:
      "The honest gap is coverage: two streams are published because the rest are too thin. More reported timelines is the only fix, and getting them without resorting to the engagement mechanics the product deliberately avoids is the actual design problem.",
    evidence: {
      src: "/evidence/it-timeline.jpg",
      width: 1547,
      height: 784,
      alt: "The signed-in timeline: queue position, two disagreeing completion estimates with an explanation, and the applicant\u2019s logged milestones.",
      caption:
        "The signed-in product, on a test file. Two estimates are shown side by side precisely because they disagree \u2014 and the page explains why rather than picking the friendlier one.",
    },
    gallery: [
      {
        src: "/evidence/it-two-estimates.png",
        width: 1294,
        height: 636,
        alt: "Close-up: IRCC projects March 2027, applicants report December 2026, with a caution that the second comes from a stage the model has never been scored against.",
        caption:
          "This is the whole product in one card. Most trackers would show one date. This shows both, says they measure different things, and then warns that the more optimistic one comes from a stage the model has never been able to check \u2014 \u201ctreat it as the optimistic end, not a plan.\u201d",
      },
      {
        src: "/evidence/it-quiet-day.png",
        width: 1294,
        height: 256,
        alt: "The Today view reading: Nothing moved on your file. Most days read like this. A quiet day is not a delay.",
        caption:
          "The daily view, on a day when nothing happened \u2014 which is most days. Every engagement instinct says manufacture movement here. Telling an anxious person that a quiet day is normal is worth more than a streak counter.",
      },
      {
        src: "/evidence/it-not-counted.png",
        width: 1294,
        height: 380,
        alt: "In-product notice explaining that comparisons switch on only once 25 other people in the same month have reported.",
        caption:
          "The privacy floor explained to the user, in the product, at the moment it affects them: comparisons switch on once 25 others in the same cohort have reported, because below that a figure could describe a person. Note the footer link \u2014 \u201cHow wrong we have been.\u201d",
      },
      {
        src: "/evidence/it-spousal.jpg",
        width: 1547,
        height: 784,
        alt: "The public spousal sponsorship timeline page, showing IRCC official estimates beside stage-by-stage reported figures with ranges and sample sizes.",
        caption:
          "The public pages do the same job without an account: IRCC\u2019s number, then what applicants reported at each stage, each row carrying its range and its sample size.",
      },
      {
        src: "/evidence/it-methodology.jpg",
        width: 1547,
        height: 784,
        alt: "The methodology page explaining corpus size, training date, Kaplan-Meier quantiles and the 25-case publication floor.",
        caption:
          "The methodology page publishes the model\u2019s error whether or not it flatters the product: 126,953 recorded stage transitions, last trained 22 July 2026, Kaplan\u2013Meier quantiles weighted so unfinished cases still count, and a stated floor of 25 weighted cases.",
      },
      {
        src: "/evidence/it-express-entry.jpg",
        width: 1547,
        height: 784,
        alt: "The Express Entry timeline page showing IRCC estimates and reported stage data with sample sizes.",
        caption:
          "Fewer stages appear on the Express Entry page than the spousal one \u2014 not a design choice, but the publication floor doing its job.",
      },
    ],
    links: [
      { label: "Visit immigrationtimeline.ca", href: "https://www.immigrationtimeline.ca/" },
      { label: "Read the methodology", href: "https://www.immigrationtimeline.ca/methodology" },
    ],
  },
  {
    slug: "indian-burger-joint",
    index: "03",
    name: "Indian Burger Joint",
    domain: "indianburgerjoint.com",
    url: "https://www.indianburgerjoint.com/",
    category: "Multi-location brand platform",
    timeframe: "2025–present",
    live: true,
    ownership: "Client work",
    role: "Client project — website, brand system, location architecture and the franchise funnel.",
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
      src: "/evidence/ibj-home.jpg",
      width: 1470,
      height: 745,
      alt: "The Indian Burger Joint homepage: a flame-lit burger fills the screen beside the words Authentic Indian Burgers.",
      caption:
        "The loudest thing I have built, and deliberately so. The food does the selling before a single word of explanation.",
    },
    gallery: [
      {
        src: "/evidence/ibj-locations.jpg",
        width: 1547,
        height: 784,
        alt: "The locations section, with a card per restaurant showing address, phone, today\u2019s hours and ordering options.",
        caption:
          "Each location carries its own address, phone, today\u2019s hours and ordering routes \u2014 dine-in, takeout, delivery, late night. Adding a restaurant is a content change, not a new page build.",
      },
      {
        src: "/evidence/ibj-franchise.jpg",
        width: 1547,
        height: 784,
        alt: "The franchise page: Join the Revolution, with Start Your Journey and Download Info Pack calls to action.",
        caption:
          "The franchise route is a separate page with its own pacing and its own two calls to action. A dinner order and a partnership enquiry never compete for the same button.",
      },
    ],
    links: [
      { label: "Visit indianburgerjoint.com", href: "https://www.indianburgerjoint.com/" },
      { label: "See the franchise funnel", href: "https://www.indianburgerjoint.com/franchise" },
    ],
  },
  {
    slug: "raba-thrift",
    index: "04",
    name: "Raba Thrift",
    domain: "rabathrift.ca",
    url: "https://www.rabathrift.ca/",
    category: "Community retail & donation engine",
    timeframe: "2026–present",
    live: true,
    ownership: "Client work",
    role: "Client project — website, Sanity content layer, per-city pickup pages and the donation intake flow.",
    outcome: "A thrift store's site that creates supply, not just store hours.",
    teaser:
      "Donation-first, with per-city pickup pages and phone, text and WhatsApp treated as real routes.",
    problem:
      "A thrift store runs on donations. Most thrift store websites are built around shopping and opening hours, which optimises the half of the business that isn't the constraint. Stock is the constraint — so donating has to be the main action, and it has to work for people who will never fill in a form.",
    built:
      "A donation-led site where booking a free pickup is the primary action, with 22+ pages across seven Fraser Valley cities, intent-specific acquisition pages for junk removal, moving cleanouts, estate cleanouts and free furniture removal, and an objection-handling content layer for what the store does and does not accept. A full Sanity Studio gives the client control of ten content types, and on-demand revalidation publishes their edits without a developer deploy. Phone, text and WhatsApp are presented as first-class routes rather than fallbacks.",
    customerJourney: [
      { label: "Book a free pickup", note: "area + items up front" },
      { label: "Find the right cleanout route", note: "junk, moving, estate or furniture" },
      { label: "Check what is accepted", note: "before arranging a pickup" },
      { label: "Or shop the store", note: "curated secondhand" },
      { label: "Or call / text / WhatsApp", note: "whichever you'd actually do" },
    ],
    operatorJourney: [
      { label: "Pickup requested", note: "area + items captured up front" },
      { label: "Area page", note: "a repeatable local-SEO pattern" },
      { label: "Sanity edit published", note: "on-demand revalidation, no deploy" },
      { label: "Staff follow-up", note: "a route that makes geographic sense" },
      { label: "Donation received", note: "stock in, community value out" },
    ],
    operatorNote:
      "The client can own the daily work: Sanity Studio controls content, promotions, FAQs and more, while on-demand revalidation makes a published change live without asking a developer to redeploy. Phone, text and WhatsApp remain first-class routes for donors who will never fill in a form.",
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
        title: "Meet disposal intent with a better alternative",
        body: "The most useful search visitor is not always looking for a thrift store. Four specific routes — junk removal, moving cleanouts, estate cleanouts and free furniture removal — meet the job they are trying to do, then explain when a free donation pickup is a better outcome. The junk-removal page makes the contrast concrete: a typical $200–$600 haul versus a free pickup for usable goods.",
      },
      {
        title: "Give the client a publishing system, not a handoff dependency",
        body: "The site includes a Sanity Studio with ten editable content types and an on-demand revalidation route. Blog posts, promotions, hours, FAQs and content updates can go live from the client’s own workspace without a deployment or a support ticket.",
      },
      {
        title: "Handle objections before the form",
        body: "Acceptance and non-acceptance pages, guides and city pages answer the questions that otherwise turn into unqualified calls: Can you take this? Do you serve my area? What happens next? That makes the pickup request more useful for both the donor and staff.",
      },
      {
        title: "Make the community reason visible",
        body: "The store supports Ruth & Naomi's Mission and Archway Community Services. That is the actual answer to \"why this store instead of the donation bin down the road\", so it belongs on the page rather than in an About section nobody opens.",
      },
    ],
    stack: [
      "Next.js 16",
      "Sanity CMS",
      "10 editable content schemas",
      "On-demand revalidation",
      "Supabase",
      "Resend",
      "Per-city pickup routes",
      "Multi-channel lead capture",
    ],
    metrics: [
      { value: "22+", label: "acquisition and content pages", source: "project content plan" },
      { value: "7", label: "Fraser Valley cities covered", source: "live pickup pages" },
      { value: "$200–$600 → free", label: "junk-removal cost comparison", source: "live service page" },
      { value: "10", label: "content types client can edit", source: "Sanity Studio" },
    ],
    validation: [
      "Live in Chilliwack with free-pickup booking, shop content and community pages.",
      "Four intent-specific acquisition pages turn cleanout and disposal searches into an appropriate donation-pickup route.",
      "Client-managed Sanity content publishes through on-demand revalidation, so ordinary site changes do not wait on a developer.",
      "Pickup requests arrive structured, with the area attached.",
      "Supports Ruth & Naomi's Mission and Archway Community Services, stated on the homepage.",
    ],
    next:
      "Pickup requests are structured but not yet routed — batching them into a sensible route for a single van run is the next real operational saving, and it is a scheduling problem rather than a website one.",
    evidence: {
      src: "/evidence/raba-home.jpg",
      width: 1470,
      height: 745,
      alt: "The Raba Thrift homepage over a photo of the storefront, with Explore What We Carry and Donate Today side by side.",
      caption:
        "Donate Today sits beside the shopping call to action in the hero, and the charities the store supports are named in the same breath \u2014 not buried in an About page.",
    },
    gallery: [
      {
        src: "/evidence/raba-junk-removal.jpg",
        width: 1280,
        height: 720,
        alt: "Raba Thrift's Free Alternative to Junk Removal in Chilliwack page, contrasting a typical $200 to $600 junk-removal load with a free pickup for usable goods.",
        caption:
          "A page for the job a person is actually trying to do. Rather than waiting for someone to search for a thrift store, it intercepts \"junk removal Chilliwack\" intent and shows when a free pickup is the better alternative.",
      },
      {
        src: "/evidence/raba-acceptance.jpg",
        width: 1280,
        height: 720,
        alt: "Raba Thrift's What We Accept page, explaining which items can be donated, sold or brought to the store.",
        caption:
          "Clear acceptance guidance is not filler content. It removes the uncertainty that creates unqualified pickups and lets donors decide before they call or submit a form.",
      },
      {
        src: "/evidence/raba-pickup-flow.jpg",
        width: 1280,
        height: 720,
        alt: "Raba Thrift's Free Donation Pickup page explaining the three steps from item details to a confirmation call and free pickup.",
        caption:
          "The pickup route makes the operational handoff visible: share what you have, confirm within 24 hours, then arrange the pickup. It sets the expectation before staff ever pick up the phone.",
      },
      {
        src: "/evidence/raba-pickup.jpg",
        width: 1547,
        height: 784,
        alt: "The free donation pickup page: Chilliwack to Abbotsford, seven days a week, with a three-step explanation of how pickup works.",
        caption:
          "The pickup page states the coverage, the cadence and the three steps up front \u2014 including that a human calls within 24 hours. Donors who will never fill in a form get a phone number in the header instead.",
      },
    ],
    links: [{ label: "Visit rabathrift.ca", href: "https://www.rabathrift.ca/" }],
  },
];

export function projectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export const SITE = {
  name: "Manoj Kumar",
  role: "Product & Automation Engineer",
  location: "Burnaby, British Columbia",
  email: "analystkumar29@gmail.com",
  phone: "+1 604 849 5329",
  phoneHref: "tel:+16048495329",
  url: "https://portfolio-blue-three-62.vercel.app",
  linkedin: "https://www.linkedin.com/in/analystkumar",
  github: "https://github.com/analystkumar29",
  description:
    "I build high-converting websites, customer-service automation, and practical internal workflows that help service businesses respond faster and operate with less manual work.",
};

/**
 * Opens a compose window even when a visitor has not configured a default
 * email application for `mailto:` links (common on mobile browsers).
 */
export function gmailComposeUrl(subject = "Portfolio enquiry", body?: string) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: SITE.email,
    su: subject,
  });

  if (body) params.set("body", body);

  return `https://mail.google.com/mail/?${params.toString()}`;
}
