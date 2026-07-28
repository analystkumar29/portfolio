# Manoj Kumar — Portfolio

Personal portfolio site: **Product & Automation Engineer for service businesses.**

Built with Next.js 16 (App Router), React 19 and Tailwind CSS v4. Every route is
prerendered as static HTML.

## Routes

| Route | What it does |
| --- | --- |
| `/` | Positioning, the four systems with a customer/operator toggle, services, about, contact |
| `/work` | Index of the four case studies |
| `/work/[slug]` | A full case study per project (4 pages, statically generated) |

## Where the content lives

All copy that describes a project lives in [`lib/projects.ts`](lib/projects.ts) — one
typed `Project` object per case study. Editing that file changes the home page, the
work index and the case study together, so the three can't drift apart.

**Sourcing rule:** a claim only goes in if it is visible on the live site or
verifiable in that project's own repository. Anything needing Manoj to confirm scope,
permission or a number goes in the project's `review` array, which renders as a
visible "Before this goes public" panel on the case study rather than being asserted
quietly. Ship-blocking items should be cleared before the site is shared widely.

## Evidence screenshots

`public/evidence/*.jpg` are screenshots of the four live client sites, captured July
2026. They go stale as clients rebrand, and publishing them assumes client
permission — see each case study's `review` list.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Deployment

Deployed on Vercel from `main`; pushes deploy automatically.
