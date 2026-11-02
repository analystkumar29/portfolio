export type NoteBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; lang: string; code: string };

export type Note = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  project: string;
  projectSlug: "travelling-technicians" | "immigration-timeline" | "raba-thrift";
  readingMinutes: number;
  body: NoteBlock[];
};

export const NOTES: Note[] = [
  {
    slug: "the-1000-row-limit-that-quietly-changed-my-prices",
    title: "The 1,000-row limit that quietly changed my prices",
    dek: "When my pricing table passed 1,000 rows, Supabase kept returning exactly 1,000 without an error, and the booking form quoted estimates for 122 catalogue prices it could no longer see.",
    date: "2026-11-02",
    project: "Travelling Technicians",
    projectSlug: "travelling-technicians",
    readingMinutes: 4,
    body: [
      {
        type: "p",
        text: "Travelling Technicians is my doorstep phone and laptop repair business. Every repair price lives in one Postgres table on Supabase, with a row for each model, repair and quality tier. The booking form asks an API route for a quote, and the site’s chat assistant looks prices up through its own database tools.",
      },
      {
        type: "p",
        text: "On July 27 the two disagreed. For the same repair on the same phone, the chat quoted one price and the booking form another. The chat matched the catalogue. Working back through the data, I found the booking form had been wrong for some models since June 18.",
      },
      { type: "h2", text: "What the endpoint was doing" },
      {
        type: "p",
        text: "The quote endpoint selected the entire pricing table, sorted newest first, and searched the result in JavaScript. PostgREST, the API layer Supabase puts in front of Postgres, returns at most 1,000 rows per response. When a query matches more, it sends the first 1,000 with a normal 200 status and no error or flag, so the caller can’t tell a cut-off result from a complete one.",
      },
      {
        type: "code",
        lang: "ts",
        code: `// Before: read the whole table, then search it in JavaScript
const { data: prices } = await db
  .from('prices')
  .select('model_id, repair_id, tier, price')
  .order('created_at', { ascending: false }); // newest first; at most 1,000 rows come back

const match = prices?.find(
  (p) => p.model_id === modelId && p.repair_id === repairId && p.tier === tier,
);
return match ? match.price : estimate(modelId, repairId, tier); // a miss became a number`,
      },
      {
        type: "p",
        text: "On June 11 the table had 723 rows. A week later a batch import of a new brand’s lineup pushed it past 1,000. Because the query sorted newest first, the new rows pushed out the oldest, which were the original January and February catalogue: 122 prices across 66 models became invisible to the endpoint. When the lookup missed, the endpoint didn’t fail; it answered with a hard-coded estimate, which the booking form displayed. Of the 122 prices, 58 came out higher than the catalogue and 64 lower.",
      },
      { type: "h2", text: "Why a bigger limit doesn’t help" },
      {
        type: "p",
        text: "Asking for more rows does nothing. Against production, with the table at 1,122 rows, a plain select, .limit(2000) and a range of 0 to 1999 each returned exactly 1,000. On August 9, .limit(5000) and .range(0, 4999) did the same. A request for rows 1000 to 1121 returned the other 122, so the server will page; it just won’t send more than 1,000 rows at once. Worse, a check like rows.length >= 5000 reads as a guard and can never fire.",
      },
      { type: "h2", text: "The fix" },
      {
        type: "p",
        text: "The quote endpoint now resolves the model and repair from the small lookup tables, then asks for one row filtered by model, repair, tier and the active flag, which can never come close to the cap. For reads that need every row (price ranges, route counts, admin reports) I wrote a small paginator that walks the table in 1,000-row windows until a page comes back short:",
      },
      {
        type: "code",
        lang: "ts",
        code: `const PAGE = 1000; // the server's cap; a bigger page size is ignored

export async function fetchAllRows<T>(
  page: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: unknown }>,
  maxRows = 100_000,
) {
  const rows: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await page(from, from + PAGE - 1);
    if (error) return { rows, error, truncated: false };
    const batch = data ?? [];
    rows.push(...batch);
    if (batch.length < PAGE) return { rows, error: null, truncated: false }; // short page: the end
    if (rows.length >= maxRows) return { rows: rows.slice(0, maxRows), error: null, truncated: true };
  }
}

// A money path refuses a partial catalogue
const { rows, error, truncated } = await fetchAllRows((from, to) =>
  db.from('prices').select('id, model_id, price').eq('is_active', true)
    .order('id', { ascending: true }) // stable, and the column has to exist
    .range(from, to),
);
if (error || truncated) throw new Error('Refusing to price from a partial catalogue');`,
      },
      { type: "p", text: "Three details turned out to matter." },
      {
        type: "ul",
        items: [
          "The walk needs a stable .order() on a column that exists, or rows can repeat or go missing between pages. My first rollout ordered the routes table by id, which it doesn’t have (its primary key is a slug). PostgREST returned an error, the walk stopped with zero rows, and every city on the service-areas page showed 0 routes. Live testing caught it, not the type checker or unit tests, and the log said only “[object Object]” because Supabase errors are plain objects. The helper now unwraps the message.",
          "Money paths treat an error or a truncated walk as a failure. The repair cost guides on the blog throw during the build rather than publish prices from a partial catalogue.",
          "When the total matters, I cross-check it against a head-only count query (count: 'exact', head: true), which returns the row count without any rows.",
        ],
      },
      {
        type: "p",
        text: "That night I audited the eight tables that had grown past 400 rows and fixed eight other reads that were being cut off. On the service-areas page, each city advertised about 11% of its real page count, because the counts came from 1,000 of 8,923 routes. The IndexNow seeder’s .limit(10_000) didn’t lift the cap either, so it submitted 1,000 of 8,923 URLs and reported success.",
      },
      { type: "h2", text: "Tests that check the query" },
      {
        type: "p",
        text: "The quote endpoint’s regression test asserts the shape of the query and fails if the pricing table is read without filters on model, repair, tier and the active flag. The paginator’s tests run against a fake table capped at 1,000 rows per request and cover a 1,122-row table, a mid-walk error and an exact multiple of the page size: 2,000 rows take three requests, and the third proves the end. A separate guard test fails CI on hand-typed prices and numeric fallbacks.",
      },
      { type: "h2", text: "What I’d do differently" },
      {
        type: "p",
        text: "I knew about the cap a week before it hit. On June 11 I measured it, gave the admin pricing list an explicit .limit(1000), and left a comment that it would truncate past 1,000 rows. That commit didn’t touch the booking form’s endpoint, which had the same full-table read. Now I’d fix every unbounded read the day I learn about a limit like this. Knowing about it isn’t enough: on August 9 two new scripts written during the cleanup hit the cap, and in September I found three more admin reads cut at 1,000. My default is to paginate unless I can name the filter that bounds the result; is_active = true doesn’t, since most rows are active.",
      },
      {
        type: "p",
        text: "The cap made rows disappear, but the fallback is what turned a missing row into a wrong price. In September I deleted the estimator. Every quote now goes through one resolver that returns a typed status, and anything it can’t match to an active catalogue row shows “We’ll quote this by phone” instead of a number.",
      },
    ],
  },
  {
    slug: "why-published-cms-edits-werent-reaching-the-live-site",
    title: "Why a client’s published CMS edits weren’t reaching the live site",
    dek: "Published Sanity edits weren’t reaching a client’s Next.js 16 site because untagged fetches were cached with no expiry; the same fix removed a loading screen that hid every page’s content from crawlers that don’t run JavaScript.",
    date: "2026-11-02",
    project: "Raba Thrift",
    projectSlug: "raba-thrift",
    readingMinutes: 3,
    body: [
      {
        type: "p",
        text: "Raba Thrift is a thrift store in Chilliwack. I built its site in Next.js 16 with an embedded Sanity Studio, so the owner can change hours, FAQs, promotions and page copy without waiting for me. The pages are statically prerendered, and a Sanity webhook tells the site when something has been published.",
      },
      {
        type: "p",
        text: "In July the owner sent a round of feedback. I made the code changes, and the copy that lives in Sanity was corrected and published in Studio. The live site kept serving the old text. The About page still had a line that had been taken out, and the Donate page still showed an old FAQ answer and an outdated rule about what the store accepts.",
      },
      {
        type: "p",
        text: "Two problems were stacked on top of each other. The first was in Studio itself. It was routing outside /studio, so the site stopped recognising it and wrapped it in the public header and footer, which pushed Studio’s Publish bar off the bottom of the screen. Setting Sanity’s basePath fixed it, but even with publishing working, the pages didn’t change.",
      },
      { type: "h2", text: "Two caches, and I was clearing one" },
      {
        type: "p",
        text: "Next.js keeps two caches that matter here: the rendered page, and the data each fetch returned while rendering it. On a fully static route, a fetch made during rendering is cached, and with no revalidate time it stays cached indefinitely. My sanityFetch helper only attached cache tags when the caller passed some, and only one of its 14 call sites did, the promo banner in the root layout. Every other Sanity result was pinned in the Data Cache from the first time it was fetched.",
      },
      {
        type: "p",
        text: "The webhook, which I had written that morning, checked a shared secret, read the document type from the payload and called revalidatePath('/', 'layout'), on the assumption that invalidating the root layout would cascade to every page. Pages did render again, but each render read the same cached Sanity responses and produced the same HTML. The blog behaved differently because its pages set an hourly revalidate at the route level, so their data expired on its own. About and Donate were fully static, so theirs never did.",
      },
      { type: "h2", text: "The fix" },
      { type: "p", text: "Three changes went into one commit:" },
      {
        type: "ul",
        items: [
          "Every Sanity query is tagged with its document type (siteSettings, faq, blogPost, testimonial and so on), at all 14 call sites.",
          "The webhook calls revalidateTag(type, 'max') before revalidatePath. Next.js 16 expects a cache-life profile as the second argument, and the one-argument form is deprecated.",
          "The fetch helper applies a default revalidate of one hour when the caller doesn’t pass one. Tags are still the fast path, but a query someone forgets to tag is now stale for an hour at most.",
        ],
      },
      {
        type: "code",
        lang: "ts",
        code: `const DEFAULT_REVALIDATE = 3600; // nothing stays stale for more than an hour

export function cmsFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  opts: { tags?: string[]; revalidate?: number | false } = {},
) {
  return client.fetch<T>(query, params, {
    next: { tags: opts.tags, revalidate: opts.revalidate ?? DEFAULT_REVALIDATE },
  });
}

// On a page: tag by the document type the query reads
const faqs = await cmsFetch<Faq[]>(allFaqsQuery, {}, { tags: ['faq'] });

// In the publish webhook, after checking the shared secret
const { _type } = await req.json();
revalidateTag(_type, 'max'); // mark the cached data stale first
revalidatePath('/', 'layout'); // then the rendered pages`,
      },
      { type: "h2", text: "The loading screen crawlers saw" },
      {
        type: "p",
        text: "The same commit deleted a file I had added in March as polish: a root loading.tsx with an animated logo. In the App Router that file wraps every route in a Suspense boundary. On these prerendered pages, the HTML arrived with a main element holding only the spinner and the word “Loading…”, while the real page body, including the FAQPage and BreadcrumbList structured data, sat further down in a div with the hidden attribute until JavaScript swapped it in. In a browser the swap is instant, so the pages looked fine. A crawler that doesn’t run JavaScript got a loading screen on every page, for about four months. Every page was prerendered anyway, so the boundary bought nothing, and removing it didn’t change what visitors see.",
      },
      { type: "h2", text: "What I’d do differently" },
      {
        type: "p",
        text: "I’d test the publishing path the way a crawler sees it: change a real piece of content, publish it, then fetch the live page with curl. That one request would have shown both problems, the old copy and the “Loading…” placeholder sitting where the content should be.",
      },
      {
        type: "p",
        text: "I’d also change the profile in the webhook. 'max' marks the tag stale instead of expiring it, so the first visitor after a publish can still get the old page while the fresh one renders in the background. That is what an owner sees if they publish and refresh straight away, and it looks like the original bug. The Next.js 16 docs cover this case: a webhook that needs data to expire immediately can pass { expire: 0 } instead of 'max'.",
      },
    ],
  },
  {
    slug: "refusing-to-compute-below-25-people",
    title: "Refusing to compute below 25 people",
    dek: "Immigration Timeline computes no community figure for fewer than 25 people, with one disclosed exception; the floor lives in a database CHECK and the aggregate queries rather than the UI, and the person asking never counts toward it.",
    date: "2026-11-02",
    project: "Immigration Timeline",
    projectSlug: "immigration-timeline",
    readingMinutes: 4,
    body: [
      {
        type: "p",
        text: "Immigration Timeline lets people waiting on a Canadian immigration application record the dates their file moved and see how long each stage is taking for others in the same stream. Applicants are grouped by stream and by the month their file started. The data is sensitive, and at launch volumes most of those groups are small.",
      },
      {
        type: "p",
        text: "In a small group, a statistic stops describing a pattern and starts describing a person. If a stream has three applicants and the daily digest says one of them reached the next stage today, the other two can work out who. So the product has one rule, with one exception I’ll come to: no community figure is computed for fewer than 25 people. Below 25 there is no number at all, not a hidden or rounded one.",
      },
      { type: "h2", text: "Not a display filter" },
      {
        type: "p",
        text: "The easy version is a UI filter that hides rows with small counts. A display filter only protects the screens you remember to filter, though, and a new API route, an export or an email digest is a second read path it doesn’t cover. So the floor sits where every path has to pass through it:",
      },
      {
        type: "ul",
        items: [
          "At rest. The table of stored daily statistics has a CHECK constraint, cohort_size >= 25, on every row, so the database refuses to store a smaller group’s numbers.",
          "In the aggregate functions. Signed-in screens can’t read tables directly. Every community number they show comes from a database function, and those functions only return figures that clear the floor.",
          "On the public pages. The server-side query selects only bands that rest on at least 25 weighted cases (recent timelines count for more) and were measured rather than filled in from a prior. The code checks the same condition again afterwards, so a loosened query publishes nothing.",
        ],
      },
      {
        type: "code",
        lang: "sql",
        code: `-- At rest: no stored row may describe fewer than 25 applications
alter table daily_stats
  add constraint daily_stats_kanon_ck check (cohort_size >= 25);

-- Comparison function: the reader is never part of the population
with peers as (
  select a.id, a.anchor_date
  from applications a
  join me on a.program = me.program and a.stream = me.stream and a.cohort = me.cohort
  where a.user_id <> auth.uid()
),
gaps as (
  select t.milestone, t.application_id, t.event_date - p.anchor_date as days
  from timeline t
  join peers p on p.id = t.application_id
)
select milestone,
       percentile_cont(0.5) within group (order by days) as median_days
from gaps
group by milestone
having count(distinct application_id) >= 25;`,
      },
      { type: "h2", text: "The hole in my first version" },
      {
        type: "p",
        text: "My first constraint was check (cohort is null or cohort_size >= 25). A cohort too small to publish was folded into a stream-level rollup row with no cohort, and the constraint exempted rollup rows. That is only safe if every stream has at least 25 people, and nothing checked it: in a stream of three applicants, the daily digest could publish counts derived from those three. A review pass in the first week caught it. Now the rollup needs 25 applications at the stream level too, and the CHECK applies to every row.",
      },
      { type: "h2", text: "You are not one of the 25" },
      {
        type: "p",
        text: "Signed-in users can compare their stage times with their cohort’s median. The first version of that function counted the reader as one of the 25, so 24 other people plus you were enough to switch it on, and the number labelled “their median” included your own. A later migration removed the reader from the population. The floor is now 25 other applicants, comparisons switch on at 26 people, and the on-screen copy changed in the same commit.",
      },
      { type: "h2", text: "Broader, not sharper" },
      {
        type: "p",
        text: "When a group is too small, the answer gets broader instead of more specific. That costs nothing in privacy, where lowering the threshold for small groups would. A cohort under 25 folds into its stream’s rollup, which needs 25 of its own. The Express Entry pages label their provincial nominee figures as covering all of Express Entry, because one of the two nominee groups sits just under the floor. The prediction model has the same shape: a narrow cell falls back to the stream and then to the global estimate, and every band records which level it came from.",
      },
      {
        type: "p",
        text: "Estimates are shown as ranges: the public tables give the 10th to 90th percentile of elapsed days with the 25th to 75th as a middle band, and personal estimates come with their window. Sign-in is an emailed one-time link, so there is no password to store or leak, and every request belongs to a verified email address, which is what makes per-user rate limits work alongside Turnstile.",
      },
      { type: "h2", text: "The one exception" },
      {
        type: "p",
        text: "The weekly email is the one exception, and the privacy page describes it. Once five applications are in your stream, it may tell you how many people in that stream reported each stage that week: counts only, at stream level, never a cohort, date, province, country or handle. Your own entries are left out, and the figure is computed for the email and never written to the stored statistics, whose constraint stays at 25. The safer option was to keep 25 and fill that space with IRCC’s official queue data and the model’s expectation. I chose five because at the site’s volumes a floor of 25 would have left it empty for months. The residual risk is written down beside it: a count of one in a small stream can identify someone to a person who already knows who was waiting on that stage.",
      },
      { type: "h2", text: "What I’d do differently" },
      {
        type: "p",
        text: "The CHECK constraint enforces itself, but the rule that every aggregate function contains the floor is checked by a text search over two named functions, a manual probe of the comparison endpoint, and review. The weekly email’s function isn’t in that search. I’d replace it with an automated test that seeds a cohort of 24 and asserts every aggregate function returns nothing, and that the email’s counts stay empty for a stream of four. Unlike the search, the test would also cover functions added later.",
      },
    ],
  },
];

export function noteBySlug(slug: string): Note | undefined {
  return NOTES.find((note) => note.slug === slug);
}
