# SEO, and whether this site can actually bring in clients

Written 28 July 2026, after auditing the deployed site.

## The honest summary

The site's **technical** SEO is in good shape. Its **strategic** SEO is close to zero,
and no amount of on-page work changes that until the items in §1 and §3 are done.

Framed properly: this site is a **conversion asset**, not an **acquisition asset**. It
is very good at turning someone who already found you — LinkedIn, a referral, a cold
email, a business card — into a conversation. It will not, by itself, bring strangers
to you through Google.

That is not a failure of the build. It is what a portfolio site is. The things that
*do* acquire clients are listed below, and most of them are not on the website.

---

## 1. Buy a domain — nothing else matters until this is done

`portfolio-blue-three-62.vercel.app` cannot rank. It is a shared subdomain sitting
alongside thousands of throwaway deploys, it carries no authority, and it reads as a
hobby project on a résumé or a client email.

- Buy `manojkumar.ca` if it's free — your email already implies it.
- Add it in Vercel → Project → Settings → Domains, then point the DNS at your registrar.
- Serve **one** canonical host. Pick `www` or apex, and 301 the other to it. Your own
  portfolio calls this out as a thing you check on client sites; Raba Thrift currently
  fails it.
- Update `SITE.url` in `lib/projects.ts` afterwards — canonical tags, the sitemap,
  `robots.txt` and the OG image URLs are all derived from it.

**Effort: an hour. Impact: everything below depends on it.**

---

## 2. Tell Google the site exists

1. **Google Search Console** → add the domain property → verify by DNS → submit
   `https://yourdomain/sitemap.xml`.
2. Use the URL Inspection tool on the homepage and one case study, and request indexing.
3. Check back in two weeks. Search Console is also how you find out which queries you
   are *actually* appearing for, which is usually not the ones you guessed.

**Effort: 30 minutes. Do it the same day the domain resolves.**

---

## 3. Google Business Profile — the real local lever

For queries like "web designer Burnaby", the map pack sits above the organic results.
A Business Profile influences that; on-page SEO barely does.

- Create one as a service-area business (you go to clients; you don't have a storefront).
- Categories: *Website designer*, *Software company*, *Marketing consultant*.
- Service areas: Burnaby, Vancouver, Surrey, Richmond, Coquitlam, Abbotsford.
- Add the site, the phone number, and real photos.
- **Ask every past client for a review.** Reviews are the single biggest ranking factor
  in the map pack, and you have four happy clients.

**Effort: an hour, plus asking. Impact: the highest of anything on this list for local
client work.**

---

## 4. Four backlinks you already own

Backlinks are the currency of ranking, and you control four live business sites:

| Site | What to add |
| --- | --- |
| travelling-technicians.ca | Footer credit → your domain |
| immigrationtimeline.ca | Footer credit → your domain |
| indianburgerjoint.com | Ask the client for a "Site by…" credit |
| rabathrift.ca | Ask the client for a "Site by…" credit |

Two are your own products, so those are yours to add today. These are legitimate,
topically relevant links from real businesses — exactly what a search engine wants to
see, and what a new domain has none of.

Keep it plain: `Site by Manoj Kumar`, linked, in the footer. Don't keyword-stuff it.

---

## 5. What to build, if you want search to bring clients

Nobody searches "Product & Automation Engineer". The site is currently optimised for a
phrase with no commercial demand behind it.

The queries that carry buying intent look like:

- `web designer burnaby` / `website developer vancouver`
- `booking system for repair shop`
- `online booking website for small business bc`
- `ai chat for customer service small business`
- `why am i missing calls from my website`

**You have already built the engine that wins these.** Travelling Technicians ranks
through city × service pages generated from a routes table. The same playbook, aimed at
your own business, is the obvious move:

```
/services/booking-systems
/services/booking-systems/burnaby
/services/customer-service-automation
/services/website-foundations/vancouver
```

Each page needs to be genuinely specific — the problem, what you'd build, what it costs
roughly, and a real example from the four case studies. Thin doorway pages that differ
only by city name are penalised, and deserve to be.

**Effort: real. This is a project, not an afternoon.** But it is the only item on this
list that turns search into a client pipeline, and you have proof you can execute it.

---

## 6. Where your clients will actually come from, first

Be realistic about sequencing. A new domain ranks for nothing for months. In the
meantime:

- **Referrals from the four existing clients.** Ask directly. This is the highest-yield
  channel you have and it costs one message.
- **LinkedIn.** Your case studies are genuinely strong posts. The two-disagreeing-
  estimates card and the k-anonymity floor are the kind of thing that travels.
- **Local business groups and trades**, since your proof is field-service and retail.
- **Cold outreach with a specific observation** — "your booking form goes to an inbox,
  here's what I'd change" beats any brochure. You now have a portfolio to send.

The site's job in every one of these is the same: be the thing you link to. It does
that job well.

---

## 7. Already done, so don't redo it

Verified on the deployed site:

- Server-rendered HTML — crawlers see full content without running JavaScript
- Unique `<title>` and meta description per page
- Canonical tags on every page
- JSON-LD: Person, WebSite, ProfilePage, CollectionPage, BreadcrumbList, Article
- Generated OG cards for every page, so shared links look intentional
- One `<h1>` per page, sensible heading hierarchy
- Alt text on all images
- `sitemap.xml` and `robots.txt`, both live and allowing indexing
- Static prerendering, image optimization, font preloading

## 8. Still open on the site itself

- **Rough analytics.** Vercel Analytics is one line, and tells you what recruiters read.
- **Local service pages** (§5) — the big one.
- **Testimonials.** You have four clients and no quotes on the site. For a business
  owner deciding whether to trust you, one sentence from Raba Thrift outweighs a
  paragraph of your own copy.
