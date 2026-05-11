import type { PortfolioItem } from "./portfolio";

// Mirrors the real seeds in scripts/migrate-portfolio.ts. Used as a graceful
// fallback when the CMS is unreachable (typically local dev without a DB).
// Keep this in sync when the migrate script is updated.
export const fallbackPortfolioItems: PortfolioItem[] = [
  {
    slug: "berlin-food-map",
    title: "Berlin Chinese Food Map",
    tag: "App · 2026",
    tagline: "A community-curated guide to eating well in Berlin.",
    description:
      "An open, non-profit digital guide to Chinese restaurants in Berlin — built and edited by the people who actually eat there.",
    status: "building",
    link: "https://berlinfoodmap.novawerk.io/",
    members: [],
    gallery: [],
    featured: true,
    order: 10,
  },
  {
    slug: "yima-app",
    title: "YIMA",
    tag: "App · 2026",
    tagline: "Privacy-first period calendar.",
    description:
      "A small tool, designed without profit as a constraint — to see whether the experience can become good again.",
    status: "launching",
    link: "https://novawerk.github.io/YIMA/",
    members: [],
    gallery: [],
    featured: true,
    order: 20,
  },
  {
    slug: "tinkerlab",
    title: "Tinkerlab",
    tag: "Education · 2025",
    tagline: "Open-source workshop for urban teens.",
    description:
      "Weekend workshops and remote mentors for middle-schoolers with limited extracurricular access — bringing open-source engineering culture beyond the classroom.",
    status: "building",
    members: [],
    gallery: [],
    featured: true,
    order: 30,
  },
  {
    slug: "coldchain-watch",
    title: "ColdChain Watch",
    tag: "Climate · 2025",
    tagline: "Cold-chain energy benchmark for small restaurants.",
    description:
      "An affordable energy monitor for small restaurants — helping them spot avoidable waste. Driven by a tiny team.",
    status: "launching",
    members: [],
    gallery: [],
    featured: false,
    order: 40,
  },
  {
    slug: "openbench",
    title: "OpenBench",
    tag: "Public · 2026",
    tagline: "Open dataset on urban accessibility.",
    description:
      "Citizen photos plus an open dataset, mapping how accessibility infrastructure is actually used in cities.",
    status: "planning",
    members: [],
    gallery: [],
    featured: false,
    order: 50,
  },
  {
    slug: "minormakers",
    title: "MinorMakers",
    tag: "Community · 2024",
    tagline: "Neighborhood maker fair.",
    description:
      "A monthly neighborhood maker fair, bringing community projects to people who never read tech blogs — and inviting them to build alongside.",
    status: "launched",
    members: [],
    gallery: [],
    featured: true,
    order: 60,
  },
  {
    slug: "quiet-roads",
    title: "Quiet Roads",
    tag: "Public · 2025",
    tagline: "Citizen map of nighttime noise.",
    description:
      "A citizen-led map of nighttime noise in residential blocks — phone-based readings, plotted to ask the question city studies usually skip.",
    status: "building",
    members: [],
    gallery: [],
    featured: false,
    order: 70,
  },
  {
    slug: "eldercode",
    title: "ElderCode",
    tag: "Education · 2024",
    tagline: "Internet & anti-scam class with elders.",
    description:
      "Plain-language, hand-on internet literacy classes held inside senior centers — designed and run by volunteers who actually listen.",
    status: "launched",
    members: [],
    gallery: [],
    featured: false,
    order: 80,
  },
];
