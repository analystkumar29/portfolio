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
      "Three machines that feed each other. An SEO page factory turns a routes table in Postgres into roughly 9,000 addressable pages from a single catch-all template — about 5,000 prebuilt at deploy time and 6,000 published in the sitemap, with the rest rendering on first request and caching. A booking engine takes a three-step booking, prices it from a three-tier model, and settles it through Stripe. An operations layer gives staff a real-time admin surface and technicians a PWA where they claim jobs — with an AI chat assistant and AI phone receptionist calling the same database tools the admin runs on. The same tools are also published as a public MCP server at /api/mcp, so outside AI assistants can look up real prices, coverage and open slots instead of guessing from a scraped page.",
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
      { label: "Review requested", note: "shown only after I approve it" },
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
        body: "The quoted price is re-checked against the database before anything is charged. If the catalogue moved since the customer saw it, the booking stops and shows the current price instead of quietly charging a different one. Booking reference numbers are generated on the server, never taken from the client. Admin access has to clear three independent gates \u2014 server middleware, a layout gate, and per-endpoint token verification. Row-level security is on across the tables, and anonymous access to customer data is revoked outright.",
      },
      {
        title: "Answer \u201cdo you even come here\u201d before anything else",
        body: "The homepage answers \u201cdo you come to my home or office?\u201d before anything else and offers a postal-code check, and every generated city page lists the postal codes it actually serves. Every channel \u2014 the booking form, checkout, the admin and the AI agents \u2014 checks coverage against one list through one resolver. A listed postal code books normally; one that isn\u2019t listed still gets in as a request I confirm by hand, so a customer at the edge of the map is never turned away by a form. The postal code, not a dropdown, decides the city and the travel fee.",
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
      "Public MCP server (read-only, rate-limited)",
      "Web push, QR codes + IndexNow",
      "Technician PWA",
    ],
    metrics: [
      { value: "8,948", label: "routes in the live index queue", source: "index run, Jul 2026" },
      { value: "547K", label: "Google search impressions since the Feb 2026 launch", source: "Search Console, Nov 2026" },
      { value: "130 / 211 / 674", label: "migrations, API routes and source files", source: "repo, Nov 2026" },
      { value: "5.0 ★", label: "from 31 Google reviews", source: "Google, Nov 2026" },
    ],
    validation: [
      "Live across 13 service-area cities in the Lower Mainland.",
      "Five route types — city, city+model, city+service, city+service+model, neighbourhood — all served from one template file.",
      "Booking, payment, warranty and review all run without a manual retype step.",
      "Structured FAQ data on roughly 3,300 pages for rich-result eligibility.",
      "Warranty coverage is self-serve: a customer can check it months later with a warranty number or booking reference, with no account.",
      "Payments run through Stripe with pay-later links, and Affirm, Klarna and Afterpay offered at checkout.",
      "The public MCP endpoint exposes nine read-only tools, rate-limited per visitor; customer data and anything that writes to the database are left off it until they sit behind sign-in.",
      "Still maintained by me — the pricing, the routes and the agents are mine to keep honest.",
    ],
    next:
      "The build takes 90+ seconds because ~5,000 pages render up front. Pushing more of the long tail to on-demand generation and prebuilding only the high-intent routes would cut that sharply — worth doing before the route table grows again.",
    evidence: {
      src: "/evidence/tt-home.jpg",
      width: 1120,
      height: 679,
      alt: "The Travelling Technicians homepage: doorstep phone and MacBook repair, answering \u201cdo you come to my home or office?\u201d, with typical repair time, warranty length, the Google rating and a postal-code check.",
      caption:
        "Coverage is answered first, then repair time, warranty length and the Google rating \u2014 all above the fold, and none of it behind a contact form.",
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
    role: "Idea to production, solo, directing AI coding agents — the concept, the data model, the ingestion, the privacy thresholds, the prediction work, the interface and the deployment.",
    outcome:
      "A prediction product that is careful about what it doesn't know — and says so.",
    teaser:
      "Public figures that refuse to compute below 25 people, ranges instead of dates, and a published methodology with the model\u2019s measured error.",
    problem:
      "People waiting on an immigration decision are anxious, and anxious people are easy to sell false certainty to. A single confident date would convert better and be more shareable. It would also be wrong often enough to make somebody book a flight they lose money on. The product's whole job is to be useful without pretending to know more than it does.",
    built:
      "Applicants log their own milestone dates behind a passwordless sign-in and get a personal estimate as a range, never a single date. The public pages publish stage-by-stage ranges from a censoring-aware Kaplan\u2013Meier model trained on 127,684 community-reported stage transitions, only where at least 25 weighted cases stand behind a figure. A Python pipeline retrains the model and backtests it before an atomic swap with rollback, and the methodology page states the training date and the measured error instead of implying them.",
    customerJourney: [
      { label: "Report your milestones", note: "passwordless, email link" },
      { label: "See a range", note: "a window, with the uncertainty left in" },
      { label: "Read the methodology", note: "published, not summarised" },
      { label: "Come back tomorrow", note: "one reading a day" },
    ],
    operatorJourney: [
      { label: "Milestone reported", note: "readable only by the applicant" },
      { label: "k-anonymity ≥ 25", note: "enforced at rest and in every public aggregate" },
      { label: "Cohort degrades", note: "cell → stream → global when too small" },
      { label: "Range computed", note: "never a single date" },
      { label: "Training date published", note: "stated on the page" },
    ],
    operatorNote:
      "Uncertainty is a field, not a disclaimer. If a cohort is too small to be anonymous, the number is not computed at all — it degrades to a broader group rather than being published carefully.",
    decisions: [
      {
        title: "k-anonymity ≥ 25, enforced at rest",
        body: "No public aggregate is computed or stored for a cohort smaller than 25 people. The floor is a database constraint on the stored daily statistics and part of every public aggregate query \u2014 not filtered out at display time, where a second read path or a future API could quietly bypass it. When a cohort is too small, the reading degrades to a broader group instead of getting more specific. The one deliberate exception is disclosed on the privacy page: the weekly email shows stream-level counts once five applications are in a stream \u2014 counts only, never stored.",
      },
      {
        title: "Passwordless, because there is no safe way to store what you don't have",
        body: "Access is an emailed one-time link. There is no password to breach, reuse or reset, and a verified email address, behind Turnstile and rate limits, is the only way in. For a product holding immigration status data, the account you don't build is the one that can't leak.",
      },
      {
        title: "One reading a day, on purpose",
        body: "Every engagement instinct says add streaks, counters and refresh-worthy movement. This is a product people check when they are frightened. Most days nothing has changed, and the app says so — the anti-engagement choice is the ethical one.",
      },
      {
        title: "Follow the data, even when it says the feature failed",
        body: "The daily digest and push notifications were the obvious way to reach people. The numbers said otherwise: by September, 12 of 470 daily digests had ever been read and nobody had subscribed to push. So I shipped a weekly email instead \u2014 one-click unsubscribe, signed links and idempotent sends, sized to stay inside the free tier.",
      },
      {
        title: "Publish the methodology, including where the data is thin",
        body: "The page names the two streams there is enough reported data to be honest about, and says plainly that you shouldn't make irreversible plans from an estimate. Documenting the limits is what makes the numbers usable at all.",
      },
    ],
    stack: [
      "Next.js + TypeScript",
      "Supabase / PostgreSQL",
      "Python (pandas, lifelines)",
      "Kaplan–Meier survival estimates",
      "Retraining + time-split backtests",
      "Aggregate RPCs with k-anonymity enforced",
      "Passwordless email sign-in",
      "Cloudflare Turnstile + Upstash + BotID",
      "Cohort chat, in-app digest + weekly email (Resend)",
      "Installable offline PWA",
      "GitHub Actions: nightly encrypted backups + restore test",
      "Architecture decision records",
    ],
    metrics: [
      { value: "336", label: "active users in the last 30 days \u2014 417 accounts in 33 countries, 2,641 milestones logged", source: "owner stats, Nov 2026" },
      { value: "127,684", label: "recorded stage transitions behind the model (Oct 2026 run)", source: "methodology page" },
      { value: "54.3% / 79.5%", label: "of real outcomes fell inside the bands labelled 50% / 80%, in a time-split backtest of 7,562 events", source: "methodology page" },
      { value: "≥ 25", label: "weighted cases before anything is published", source: "repo + live site" },
      { value: "0", label: "password fields \u2014 sign-in is an emailed one-time link", source: "repo + live site" },
    ],
    validation: [
      "Live, with the aggregation floor stated publicly on the sign-in page and again in the methodology.",
      "Express Entry and spousal sponsorship are the only streams published — the ones with enough reported timelines to be defensible.",
      "Every published row carries its own range and sample size, and stages the model has never been able to score are labelled as such.",
      "The methodology page states that today's model is built entirely from community-reported timelines \u2014 a pre-launch corpus plus periodic batches shared in forums \u2014 and none from the site's own users yet, and says it will change when that changes.",
      "The methodology page publishes the backtest, flattering or not: trained on timelines before June 2025 and scored on 7,562 later milestone events, the band labelled p25\u2013p75 caught 54.3% of outcomes (target 50%) and p10\u2013p90 caught 79.5% (target 80%). Eleven stages, including spousal PPR, passport stamped and eCoPR, happen too far out to score yet and are labelled \u201cnever scored\u201d instead of being given a number.",
      "Users can export their data as JSON or delete their account immediately, and the database is backed up nightly, encrypted, with a weekly automated restore test.",
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
          "The public pages do the same job without an account: IRCC\u2019s number, then what applicants reported at each stage, each row carrying its range and its sample size (captured July 2026).",
      },
      {
        src: "/evidence/it-methodology.jpg",
        width: 850,
        height: 735,
        alt: "The methodology page: where the timelines come from, corpus size and training date, why estimates are ranges, and the 25-case publication floor.",
        caption:
          "The methodology page says where the numbers come from and where they fail: 127,684 recorded stage transitions, last trained 14 October 2026, none from the site\u2019s own users yet, Kaplan\u2013Meier quantiles weighted so unfinished cases still count, and a floor of 25 weighted cases.",
      },
      {
        src: "/evidence/it-express-entry.jpg",
        width: 1547,
        height: 784,
        alt: "The Express Entry timeline page showing IRCC estimates and reported stage data with sample sizes.",
        caption:
          "Fewer stages appear on the Express Entry page than the spousal one \u2014 partly the publication floor doing its job (captured July 2026).",
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
    category: "Multi-location restaurant website",
    timeframe: "June 2025",
    live: false,
    ownership: "Client work",
    role: "Client project for a friend's restaurant group — designed and built the website in a few days: a food-first homepage, location cards with per-location ordering, and a separate franchise page.",
    outcome:
      "One brand, two funnels: tonight's order and next year's franchise partner.",
    teaser:
      "A loud, food-first brand that keeps a dinner order and a franchise enquiry from competing for the same button.",
    problem:
      "A vegetarian burger is an unfamiliar idea for a lot of people, so the site has to sell the food before it explains anything. But two very different people arrive at the same homepage: someone deciding where to eat in the next twenty minutes, and someone evaluating a franchise investment. Serving both from one funnel makes the page worse for both.",
    built:
      "A food-first homepage, a card for every restaurant with its own address, hours and ordering routes, and a genuinely separate franchise page with its own pacing and its own calls to action \u2014 designed, built and launched in a few days.",
    customerJourney: [
      { label: "See the food", note: "big, hot, confident" },
      { label: "Pick a location", note: "address, phone and hours on every card" },
      { label: "Order now", note: "handed off per location" },
    ],
    operatorJourney: [
      { label: "Location card", note: "the same fields for every restaurant" },
      { label: "Order route", note: "handed off per location" },
      { label: "Franchise enquiry", note: "a separate, higher-value page" },
      { label: "Info pack offered", note: "from the franchise page" },
    ],
    operatorNote:
      "Two audiences, kept apart on purpose. Someone ordering dinner and someone considering a franchise want completely different pages. Blending them would cost both.",
    decisions: [
      {
        title: "Every location card answers the same questions",
        body: "Address, click-to-call phone, today\u2019s hours, what the store offers \u2014 dine-in, takeout, delivery, late night \u2014 and its own ordering buttons. A hungry customer should never need a second page to decide where to go.",
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
      "Location cards with per-store ordering",
      "Separate franchise page",
      "Click-to-call + delivery hand-offs",
      "Shipped in a few days",
    ],
    metrics: [
      { value: "2", label: "calls to action kept apart: order now and franchise", source: "live site" },
      { value: "Days", label: "from brief to launch, June 2025", source: "project history" },
    ],
    validation: [
      "Ordering and franchise routes both reachable from the homepage (as captured in July 2026).",
      "The franchise page carries the same brand identity into a completely different conversion journey.",
    ],
    next:
      "The franchise page ends at an info-pack download, which is a lead but not a qualified one. A short structured intake — capital, territory, timeline — would let the client spend their follow-up time on the applicants worth calling.",
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
          "Each location carries its own address, phone, today\u2019s hours and ordering routes \u2014 dine-in, takeout, delivery, late night.",
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
    links: [],
  },
  {
    slug: "raba-thrift",
    index: "04",
    name: "Raba Thrift",
    domain: "rabathrift.ca",
    url: "https://www.rabathrift.ca/",
    category: "Thrift store website, CMS and donation intake",
    timeframe: "2026–present",
    live: true,
    ownership: "Client work",
    role: "Client project — website, Sanity content layer, per-community pickup pages and the donation intake flow.",
    outcome: "A thrift store's site that creates supply, not just store hours.",
    teaser:
      "Donation-first, with per-community pickup pages and phone, text and WhatsApp treated as real routes.",
    problem:
      "A thrift store runs on donations. Most thrift store websites are built around shopping and opening hours, which optimises the half of the business that isn't the constraint. Stock is the constraint — so donating has to be the main action, and it has to work for people who will never fill in a form.",
    built:
      "A donation-led site with 55 indexed pages, most generated from typed data: a pickup page for each of seven Fraser Valley communities, shop categories, guides, intent-specific pages for junk removal, moving cleanouts, estate cleanouts and free furniture removal, and an objection-handling layer for what the store does and does not accept. Donating is the main job \u2014 a \u201cDonate Today\u201d button in the header of every page, no-appointment drop-off as the main route, and free pickup for donors who can\u2019t come in. Every pickup request is validated on the server, saved to a Supabase leads table with a status pipeline, and emailed to the store through Resend. A full Sanity Studio gives the client control of ten content types, and on-demand revalidation publishes their edits without a developer deploy. Phone, text and WhatsApp are presented as first-class routes rather than fallbacks.",
    customerJourney: [
      { label: "Drop off, no appointment", note: "directions, hours, back-lane photos" },
      { label: "Or book a free pickup", note: "address + items up front" },
      { label: "Find the right cleanout route", note: "junk, moving, estate or furniture" },
      { label: "Check what is accepted", note: "before arranging a pickup" },
      { label: "Or call / text / WhatsApp", note: "whichever you'd actually do" },
    ],
    operatorJourney: [
      { label: "Pickup requested", note: "saved to Supabase + emailed to the store" },
      { label: "Area page", note: "a repeatable local-SEO pattern" },
      { label: "Sanity edit published", note: "on-demand revalidation, no deploy" },
      { label: "Staff follow-up", note: "a call within 24 hours to confirm" },
      { label: "Donation received", note: "stock in, community value out" },
    ],
    operatorNote:
      "The client can own the daily work: Sanity Studio controls content, promotions, FAQs and more, while on-demand revalidation makes a published change live without asking a developer to redeploy. Phone, text and WhatsApp remain first-class routes for donors who will never fill in a form.",
    decisions: [
      {
        title: "Optimise for supply, not demand",
        body: "The same service-area pattern as the repair platform, aimed in the opposite direction — at getting stock in rather than customers out. \u201cDonate Today\u201d is the one filled button in the header of every page, because donations are the part of the business that actually limits it.",
      },
      {
        title: "Capture the area before the conversation",
        body: "A pickup request arrives as a structured job \u2014 items, address, phone and the page it came from \u2014 saved to the database and emailed to the store, so the pickup run can be planned instead of reconstructed from voicemails. The difference between a lead and a job is whether the information needed to act on it arrived with it.",
      },
      {
        title: "Per-community pickup pages as an acquisition pattern",
        body: "Each area gets a real page rather than one generic pickup form, which gives a local search for \"donation pickup\" in a specific town a page that actually answers it. It is a repeatable pattern, not one-off content.",
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
        title: "Make a published edit actually reach the live site",
        body: "When the client\u2019s published Studio edits stopped appearing in production, I traced it to Next.js caching untagged data fetches. Every Sanity query is now tagged by content type, and the publish webhook revalidates by tag as well as by path, with an hourly safety refresh behind it.",
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
      "Next.js 16 + React 19",
      "TypeScript",
      "Sanity CMS (10 schemas)",
      "On-demand revalidation",
      "Server Actions + Zod",
      "Supabase Postgres (RLS)",
      "Resend",
      "Vercel Cron",
      "JSON-LD structured data",
    ],
    metrics: [
      { value: "55", label: "indexed pages, most generated from typed data", source: "live sitemap, Nov 2026" },
      { value: "7", label: "Fraser Valley communities with their own pickup page", source: "live pickup pages" },
      { value: "$200–$600 → free", label: "junk-removal cost comparison", source: "live service page" },
      { value: "10", label: "content types client can edit", source: "Sanity Studio" },
    ],
    validation: [
      "Live in Chilliwack with no-appointment drop-off, free-pickup booking, shop pages and community pages.",
      "Four intent-specific acquisition pages turn cleanout and disposal searches into an appropriate donation-pickup route.",
      "Client-managed Sanity content publishes through on-demand revalidation, so ordinary site changes do not wait on a developer.",
      "Pickup requests are saved to a database with a status pipeline and emailed to the store straight away \u2014 and the request is kept even if the email fails.",
      "Removed a loading wrapper that hid page content and structured data from crawlers that don\u2019t run JavaScript.",
      "Supports Ruth & Naomi's Mission and Archway Community Services, stated on the homepage.",
    ],
    next:
      "The leads table already has a status pipeline and an activity log. A small staff view on top of it, then batching pickups into a sensible route, is the next real operational saving \u2014 a scheduling problem rather than a website one.",
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
  role: "Developer & Data Analyst",
  location: "Burnaby, British Columbia",
  email: "analystkumar29@gmail.com",
  phone: "+1 604 849 5329",
  phoneHref: "tel:+16048495329",
  url: "https://manojkumar-ca.vercel.app",
  linkedin: "https://www.linkedin.com/in/meet-manoj/",
  github: "https://github.com/analystkumar29",
  description:
    "Developer and data analyst in Burnaby, BC. I build and run production web systems — a booking platform with ~9,000 generated pages, AI chat and voice agents, and a privacy-first data product with 336 monthly users. Open to full-time roles.",
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
