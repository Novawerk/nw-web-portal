import type { BlogPost } from "./blog";

// Mirrors the real seeds in content/blog/*.mdx (the source for
// `pnpm migrate:blog`). Used when CMS is unreachable so previews still
// reflect what production readers see. Keep in sync with the .mdx files.
export const fallbackBlogPosts: BlogPost[] = [
  {
    slug: "why-we-build-in-the-open",
    title: "Why we build in the open",
    excerpt:
      "Open by default isn't a marketing position — it's a working constraint that changes what we make.",
    date: "2026-04-26",
    tags: ["principles", "operations"],
    author: "NovaWerk",
    content:
      "Open by default is one of those phrases that sounds like a slogan and ends up being a liability.\n\nPeople put it on websites because it tests well. They mean we are friendly, transparent, and good. Then a quarter goes by and the docs are private, the decisions happen in DMs, and the only people who actually know what's happening are the four who started it.\n\nWe've made that mistake. So when we say NovaWerk is open by default, we mean it as a working constraint, not a vibe.\n\n## What open actually requires\n\nThree things, in order: the work is visible to the people doing it; decisions leave a trail; the default is say yes to participation. None of these are profound. They are just easy to skip when the team is small and tired.",
  },
  {
    slug: "welcome-to-novawerk",
    title: "Welcome to NovaWerk",
    excerpt:
      "What we're building, why it exists, and the kind of community we want to grow.",
    date: "2026-04-12",
    tags: ["intro", "community"],
    author: "NovaWerk",
    content:
      "Most good ideas die in conversation.\n\nSomeone has a thought worth taking seriously. They mention it at dinner, in a Slack channel, or as a half-finished doc in a folder no one opens. A few people nod. Maybe someone says we should really build that. And then everyone goes back to whatever was paying them that week.\n\nNovaWerk exists for the small fraction of those ideas that deserve to make it out of the conversation.\n\n## What we are\n\nWe are an open, non-profit community focused on turning meaningful ideas into real-world impact. We are not a company, not an accelerator, and not a study group. The closest description is a workshop: a place where people show up, share what they're working on, and help each other ship.",
  },
];
