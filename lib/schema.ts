import { PROJECTS, SITE, type Project } from "@/lib/projects";

/**
 * JSON-LD. Every claim here has to match what a human reads on the page —
 * structured data that disagrees with the visible content is worse than none,
 * because it is the version search engines trust.
 */

const PERSON = {
  "@type": "Person",
  "@id": `${SITE.url}/#manoj`,
  name: SITE.name,
  jobTitle: SITE.role,
  description: SITE.description,
  email: `mailto:${SITE.email}`,
  telephone: SITE.phone,
  url: SITE.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Burnaby",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  knowsAbout: [
    "Web application development",
    "Booking and lead systems",
    "Customer-service automation",
    "Local SEO and multi-location content",
    "Workflow automation",
    "Privacy-aware product design",
  ],
};

export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      PERSON,
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: `${SITE.name} — ${SITE.role}`,
        description: SITE.description,
        publisher: { "@id": `${SITE.url}/#manoj` },
        inLanguage: "en-CA",
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE.url}/#profile`,
        url: SITE.url,
        name: `${SITE.name} — ${SITE.role}`,
        about: { "@id": `${SITE.url}/#manoj` },
        isPartOf: { "@id": `${SITE.url}/#website` },
      },
    ],
  };
}

export function workIndexSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumb([{ name: "Work", path: "/work" }]),
      {
        "@type": "CollectionPage",
        "@id": `${SITE.url}/work#page`,
        url: `${SITE.url}/work`,
        name: "Work",
        about: { "@id": `${SITE.url}/#manoj` },
        hasPart: PROJECTS.map((p) => ({
          "@type": "CreativeWork",
          name: p.name,
          url: `${SITE.url}/work/${p.slug}`,
          abstract: p.outcome,
        })),
      },
    ],
  };
}

export function caseStudySchema(project: Project) {
  const url = `${SITE.url}/work/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumb([
        { name: "Work", path: "/work" },
        { name: project.name, path: `/work/${project.slug}` },
      ]),
      {
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        headline: `${project.name} — ${project.category}`,
        description: project.outcome,
        articleSection: "Case study",
        author: { "@id": `${SITE.url}/#manoj` },
        publisher: { "@id": `${SITE.url}/#manoj` },
        inLanguage: "en-CA",
        image: project.evidence ? `${SITE.url}${project.evidence.src}` : undefined,
        about: {
          "@type": "CreativeWork",
          name: project.name,
          url: project.url,
          abstract: project.outcome,
        },
        mentions: project.stack.map((tool) => ({ "@type": "Thing", name: tool })),
      },
    ],
  };
}

function breadcrumb(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      ...trail.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: crumb.name,
        item: `${SITE.url}${crumb.path}`,
      })),
    ],
  };
}
