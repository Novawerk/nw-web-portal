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
    status: "launched",
    link: "https://novawerk.github.io/YIMA/",
    members: [],
    gallery: [],
    featured: true,
    order: 20,
  },
];
