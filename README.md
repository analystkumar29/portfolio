# Manoj Kumar — Portfolio

Personal portfolio site: **Product & Automation Engineer for service businesses.**

Built with Next.js 16 (App Router), React 19 and Tailwind CSS v4. Every route is
prerendered as static HTML except `/resume`, which checks for the PDF at request time.

## Routes

| Route | What it does |
| --- | --- |
| `/` | Positioning, the four systems with a customer/operator toggle, services, about, contact |
| `/resume` | Serves the résumé PDF if one is present, otherwise a request-by-email panel |
| `/work` | Index of the four case studies |
| `/work/[slug]` | A full case study per project (4 pages, statically generated) |

## Where the content lives

All copy that describes a project lives in [`lib/projects.ts`](lib/projects.ts) — one
typed `Project` object per case study. Editing that file changes the home page, the
work index and the case study together, so the three can't drift apart.

**Sourcing rule:** a claim only goes in if it is visible on the live site or
verifiable in that project's own repository. Numbers carry a `source` string that
renders under them on the case study, so anything asserted on the page can be
traced back to where it came from.

## Evidence screenshots

`public/evidence/*.jpg` and `*.png` are screenshots of the four live sites, captured
July 2026. They go stale as the sites change, and publishing shots of client work
assumes the client is happy for it to be shown.

## Environment variables

None. The site is fully static and has no server-side secrets — contact runs
through email and phone links, not a form that needs a delivery provider.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Deployment

Deployed on Vercel from `main`; pushes deploy automatically.
