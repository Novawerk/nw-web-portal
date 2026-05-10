import type { BlogPost } from "./blog";

// Mirrors the real seeds in content/blog/*.mdx (the source for
// `pnpm migrate:blog`). Used when CMS is unreachable so previews still
// reflect what production readers see. Keep in sync with the .mdx files.
export const fallbackBlogPosts: BlogPost[] = [
  {
    slug: "first-30-days",
    title:
      "First 30 days of a non-profit project — the 7 mistakes we made",
    excerpt:
      "Tinkerlab's founder revisits the most consequential calls of the launch period — recruitment pace, resource boundaries, and what \"done\" actually means.",
    date: "2026-04-28",
    tags: ["Field Note", "retrospective"],
    author: "Min Z.",
    content:
      "The first 30 days of Tinkerlab broke at least four assumptions I'd held for years.\n\nThis isn't a guide. It's a list, written with the embarrassment of someone who's now run a real session and is less sure of what she knew last month.\n\n## We recruited too fast\n\nWe opened the volunteer signup on day three. By day ten, we had 41 mentors and one running session. Each mentor needs a real student to be paired with, and we hadn't decided what a session looked like.\n\n## We let MVP mean fast instead of small\n\nThe fix was to admit that the only thing we needed in the first 30 days was *one* component that worked — the in-person session. We could fake the rest until we knew that mattered.",
  },
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
    slug: "minimum-accountable-unit",
    title:
      "Breaking vision into a minimum accountable unit — from daydream to weekly plan",
    excerpt:
      "Cutting \"change the world\" into a scope a single person can ship in two weeks — that's the real watershed for whether a project ever starts.",
    date: "2026-04-12",
    tags: ["Method", "operations"],
    author: "Jiawei",
    content:
      "The most useful thing I learned at NovaWerk is this: a project doesn't fail at the strategy level. It fails at the *scope* level.\n\n## Why accountable not viable\n\nViable is a marketing word. It asks whether something is good enough to ship to a user. The right question is: can one person finish this and tell the team, in plain language, whether they finished it?\n\n## How to find your MAU\n\nWe use four questions: what's the artifact? who's responsible? what does done look like? by when?",
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
  {
    slug: "tinkerlab-interview",
    title:
      "Conversation with Tinkerlab — when kids outside the classroom write real code for the first time",
    excerpt:
      "One interview, three students, and an unexpected piece of methodology about teachers stepping back.",
    date: "2026-03-20",
    tags: ["Interview", "education"],
    author: "Editors",
    content:
      "We sat down with three Tinkerlab students between sessions in late March. None of them had touched code six months ago. All three have a project they're now too defensive to abandon.\n\n## What changed\n\nYuxuan, 13: I stopped asking permission. The mentors don't give permission — they ask what I think will happen if I try the thing. That's a different kind of question.\n\nRiley, 12: I read the documentation. Not because anyone told me to. Because I needed to.",
  },
  {
    slug: "indifference-is-the-only-failure",
    title: "If indifference is the only failure, how do we stay?",
    excerpt:
      "Showing up consistently is harder than burning bright once. How do we build a rhythm that doesn't rely on individual heroism?",
    date: "2026-03-02",
    tags: ["Reflection", "community"],
    author: "Yuan L.",
    content:
      "The line on our home page reads: indifference is the only failure.\n\nI sometimes wish I hadn't written it, because it's the kind of phrase that's easy to nod at and hard to live with.\n\n## The first burst is easy\n\nThe first month of any project is mostly adrenaline. The interesting question is what happens between months three and twelve.\n\n## What staying actually requires\n\nA rhythm someone else maintains. A reason to show up that isn't the work. An exit that isn't a betrayal. Visible small wins.",
  },
];
