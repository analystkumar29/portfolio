# Manoj Kumar — Portfolio

[![CI](https://github.com/analystkumar29/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/analystkumar29/portfolio/actions/workflows/ci.yml)

Live at **[manojkumar-ca.vercel.app](https://manojkumar-ca.vercel.app)**. Personal portfolio site: **Manoj Kumar, Developer & Data Analyst** (Burnaby, BC).



Built with Next.js 16 (App Router), React 19 and Tailwind CSS v4. Every route is
prerendered as static HTML except `/resume`, which checks for the PDF at request time.

## Routes

| Route | What it does |
| --- | --- |
| `/` | Hiring-first intro and results, the four systems with a customer/operator toggle, smaller projects, skills, experience, client work, contact |
| `/resume` | Serves the résumé PDF if one is present, otherwise a request-by-email panel |
| `/work` | Index of the four case studies |
| `/work/[slug]` | A full case study per project (4 pages, statically generated) |

## Where the content lives

All copy that describes a project lives in [`lib/projects.ts`](lib/projects.ts) — one
typed `Project` object per case study. Editing that file changes the home page, the
work index and the case study together, so the three can't drift apart.

**Sourcing rule:** a claim only goes in if it is visible on the live site or
verifiable in that project's own repository (or its Google Search Console / Google Business Profile). Numbers carry a `source` string that
renders under them on the case study, so anything asserted on the page can be
traced back to where it came from.

## Evidence screenshots

`public/evidence/*.jpg` and `*.png` are screenshots of the four live sites, captured
July 2026 (the Travelling Technicians homepage was refreshed in November 2026). They go stale as the sites change, and publishing shots of client work
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


## How it's built

I build with AI coding agents (Claude Code) as a pair programmer: I write the brief and
the content rules, review every change, and check the result in the browser before it
ships. Commits made that way carry a `Co-Authored-By` line, which is why GitHub lists
Claude as a contributor. `AGENTS.md` / `CLAUDE.md` are the instructions the agent reads.

Every push runs lint, a type-check and a production build in GitHub Actions.

## Licence

The code is MIT-licensed. The written content, case studies, photos, screenshots and
résumé are not — see [`LICENSE`](LICENSE).

## Deployment

Deployed on Vercel from `main`; pushes deploy automatically.
