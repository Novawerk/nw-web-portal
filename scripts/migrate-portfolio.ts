import { getPayload } from "payload";
import config from "../payload.config";

const YIMA_BODY = `## Why we're building this

Most small utility apps used to be good. Somewhere along the way, the pressure to monetize turned them into something else — core features hidden behind paywalls, interfaces bloated with ads and upsells, settings pages that quietly nudge you toward a subscription.

YIMA is a deliberate experiment in the other direction: design a small tool without profit as a constraint, and see whether the experience can become good again. No business model means no reason to compromise the core loop. No ads means no reason to keep you opening the app. No account means no reason to harvest data.

What's left is just the thing itself — a period tracker that tries to be genuinely useful, then gets out of your way.

## Inside the app

- **One-tap logging** — "Period arrived" / "Period ended" buttons, with smart auto-confirm if you forget
- **Three cycles predicted** — based on your own history, with anomaly filtering so one short cycle doesn't skew the forecast
- **Four cycle phases** — Menstrual, Follicular, Ovulation, Luteal — calculated with the medical count-back method
- **Apple Health & Google Health Connect** — bidirectional sync of period data, opt-in
- **Shareable cycle report** — long-image PNG with your full record history, in English or Chinese, so you can save it or send it to a doctor
- **Daily logging** — flow intensity, mood, symptoms, free-text notes
- **Notifications** — opt-in reminders for period, ovulation, or daily check-in

## Privacy by design

Local-only storage. No account, no sign-in, no phone number. No network calls for cycle data, no analytics, no trackers, no ads. Open source — audit the code yourself.

## Built with

Kotlin Multiplatform + Compose Multiplatform — single codebase, Android (SDK 26+) and iOS. Material Design 3 Expressive with Comfortaa typography. Full English + Simplified Chinese localization.

[Source on GitHub →](https://github.com/Novawerk/YIMA)
`;

const BFM_BODY = `## What it is

A community-driven, non-profit digital guide to Chinese restaurants in Berlin. No login, no ads, no tracking — just a clean map and a thoughtful taxonomy of cuisines and formats, contributed and edited by people who actually eat at these places.

## Where we are

Phase 2 of 4. The MVP is in active development — map, search, filter, restaurant detail and settings are functional; favorites and visit history are next. All four components (app, landing, admin, data pipeline) have working prototypes.

| Phase | Focus | Status |
|-------|-------|--------|
| 1 — Kick-off | Data handoff, visual direction, schema | Done |
| 2 — MVP development | Polished map, detail, filter UX, opening-hours signals | **Active** |
| 3 — Beta | Community beta on WeChat / Xiaohongshu | Upcoming |
| 4 — Launch | App Store + Play Store, UGC, curated collections | Upcoming |

## Four pieces, one project

- **Mobile app** — iOS + Android, Kotlin Multiplatform + Compose. Custom map style with cuisine-tagged pill markers; a 22-tag taxonomy across regional and format families; live "open now" status with countdowns.
- **Landing page** — bilingual (EN / ZH), hand-curated copy. Live at [berlinfoodmap.novawerk.io](https://berlinfoodmap.novawerk.io/).
- **Admin panel** — full CRUD for restaurant data, designed for non-technical editors.
- **Data pipeline** — restaurants live as YAML in the GitHub repo. CI validates the 22-tag taxonomy and syncs to Firestore. Pull requests are the contribution mechanism.

## Built with

Kotlin 2.2 · Compose Multiplatform 1.10 · Firebase (anonymous auth + Firestore + Crashlytics) · \`kmp-maps-compose\` (Google Maps on Android, MapKit on iOS) · Coil 3 for images.

Privacy-first telemetry — restaurant IDs and route names only, never search queries or coordinates.

[Source on GitHub →](https://github.com/Novawerk/berlin-chinese-food-map)
`;

const TINKERLAB_BODY = `## Where it started

Tinkerlab began as a weekend question between two engineers and a school teacher: what would it look like to give middle-schoolers — the ones who don't have a parent in tech, don't have an after-school program, don't get a robotics kit on their birthday — an open-source engineering experience that wasn't a watered-down demo?

The first session ran in a borrowed library room. Seven kids, two laptops short, one project: a sensor that emails you when your plant needs water. They all left with a working circuit and a Github repository under their name.

## How a session runs

- **Friday eve** — a remote mentor pairs up with each student for a 30-min "kick" call.
- **Saturday morning** — the local cohort meets in person. The mentor on a screen, snacks on the table.
- **Saturday afternoon** — debugging, building, and breaking. Adults watching, not steering.
- **Sunday** — students push their code, write a short retro, and pick the next thing.

The remote mentor model means a kid in a 4th-tier city can be paired with an engineer in Berlin, Hangzhou, or Bangalore. Nothing about the experience is "regional".

## What we're learning

Three things keep showing up across cities:

1. The bottleneck is rarely the curriculum — it's having an adult who treats the kid as a builder, not a beneficiary.
2. The kids learn by ear before they learn by docs. The mentors who get this in week one are the ones who stay.
3. The right end-of-session question is "what would you build next?" not "did you have fun?"

## Open materials

All session plans, mentor briefs, and project repositories are published under MIT. Translation into Mandarin and Vietnamese is in progress; help welcome.

[Source on GitHub →](https://github.com/Novawerk/tinkerlab)
`;

const COLDCHAIN_BODY = `## The question

Small restaurants pay an outsized share of their margin to keep cold-chain equipment running. Most of them have no visibility into where that energy actually goes — they just see a single power bill at the end of the month and shrug.

ColdChain Watch is a small box and a smaller app that gives the shop owner two numbers: which equipment is using how much, and which hour of the day is wasteful. That's it. That's the entire product.

## What the pilot showed

47 small restaurants in two cities, six months of data. The headlines:

- **18% average reduction** in cold-chain electricity once the owner could see the breakdown.
- **The biggest savings came from one habit**: turning off the standby walk-in freezer overnight in places where evening foot traffic dropped to zero.
- **The dashboard nobody opened was the failure case.** When we shipped a daily WeChat summary instead, daily-active engagement went from 12% to 71%.

## How it actually works

The device is a clamp-on current meter and a tiny LTE modem. Owner installs it themselves in under 10 minutes — no electrician needed. Data syncs every 15 minutes; nothing personal ever leaves the shop, just numbers.

Hardware BOM: under $40. We sell at cost; the project is run by NovaWerk volunteers and one part-time hardware engineer.

## Get involved

We're looking for: shop owners willing to host a unit, hardware folks who can help with the next revision, anyone in Cantonese-speaking neighborhoods who can run a one-day install workshop.

[Pilot results report →](https://github.com/Novawerk/coldchain-watch)
`;

const OPENBENCH_BODY = `## Why citizen data

Most accessibility "audits" in cities rely on outdated maps and assume that "accessible on paper" means "accessible in practice." Anyone who's pushed a stroller, used a cane, or rolled a wheelchair through their neighborhood knows the gap.

OpenBench asks citizens to send a photo and a 1-line note when accessibility infrastructure isn't working — a curb cut blocked by a scooter, a tactile strip painted over, a ramp that ends at a step. Photos get tagged, geocoded, and posted to an open dataset.

## What we're building

- **A 5-tap submission flow** — open the page, take a photo, pick a category, drop a pin, send. No login.
- **An open dataset** — JSON + CSV, updated nightly. Free for researchers, journalists, and city planners.
- **A weekly digest** — for each pilot city, a one-page summary of the week's submissions, sent to the relevant ward office.

We're explicit about one thing: we don't fix the problems. We make them legible. The fixing is the city's job — our job is to make sure they can no longer say "we didn't know."

## Pilot cities

Eight cities in the pilot. Currently active in: Shanghai (Hongkou), Chengdu (Wuhou), Wuhan (Jiangan). Three more onboarding in Q2.

[Project handbook →](https://github.com/Novawerk/openbench)
`;

const MINORMAKERS_BODY = `## A neighborhood maker fair

MinorMakers is a one-day, free, no-registration neighborhood maker fair. We run it on the third Saturday of every month in a different community space — a library back room, a school courtyard, a borrowed café.

People bring whatever they're making: a hand-knit scarf, a Python script, a 3D-printed prosthetic, a sourdough that finally rose. There's no judging, no selling, no platform — just tables, and people behind them ready to explain.

## What it became

We started this in 2024 expecting maybe 20 people. The third edition had 180. By the end of year one, we'd run 14 editions across 7 neighborhoods. About 40% of attendees came back the next month — usually with something new.

The most-shared sentence from feedback: *"I didn't know there were people like me in this neighborhood."*

## What we don't do

- We don't accept corporate sponsorship.
- We don't have a website with featured speakers.
- We don't post photos of attendees online.
- We don't track anything beyond a head count.

It is, intentionally, a very small thing. That's why people keep coming back.

## Run one yourself

We've published a 6-page playbook. Borrow it, modify it, run one in your block. We're happy to spend 30 minutes on a call with anyone who wants to start.

[Playbook PDF →](https://github.com/Novawerk/minormakers)
`;

const SEEDS = [
  {
    title: "Berlin Chinese Food Map",
    slug: "berlin-food-map",
    tag: "App · 2026",
    tagline: "A community-curated guide to eating well in Berlin.",
    description:
      "An open, non-profit digital guide to Chinese restaurants in Berlin — built and edited by the people who actually eat there.",
    body: BFM_BODY,
    status: "building" as const,
    link: "https://berlinfoodmap.novawerk.io/",
    featured: true,
    order: 10,
  },
  {
    title: "YIMA",
    slug: "yima-app",
    tag: "App · 2026",
    tagline: "Privacy-first period calendar.",
    description:
      "A small tool, designed without profit as a constraint — to see whether the experience can become good again.",
    body: YIMA_BODY,
    status: "launching" as const,
    link: "https://novawerk.github.io/YIMA/",
    featured: true,
    order: 20,
  },
  {
    title: "Tinkerlab",
    slug: "tinkerlab",
    tag: "Education · 2025",
    tagline: "Open-source workshop for urban teens.",
    description:
      "Weekend workshops and remote mentors for middle-schoolers with limited extracurricular access — bringing open-source engineering culture beyond the classroom.",
    body: TINKERLAB_BODY,
    status: "building" as const,
    featured: true,
    order: 30,
  },
  {
    title: "ColdChain Watch",
    slug: "coldchain-watch",
    tag: "Climate · 2025",
    tagline: "Cold-chain energy benchmark for small restaurants.",
    description:
      "An affordable energy monitor for small restaurants — helping them spot avoidable waste. Driven by a tiny team.",
    body: COLDCHAIN_BODY,
    status: "launching" as const,
    featured: false,
    order: 40,
  },
  {
    title: "OpenBench",
    slug: "openbench",
    tag: "Public · 2026",
    tagline: "Open dataset on urban accessibility.",
    description:
      "Citizen photos plus an open dataset, mapping how accessibility infrastructure is actually used in cities.",
    body: OPENBENCH_BODY,
    status: "planning" as const,
    featured: false,
    order: 50,
  },
  {
    title: "MinorMakers",
    slug: "minormakers",
    tag: "Community · 2024",
    tagline: "Neighborhood maker fair.",
    description:
      "A monthly neighborhood maker fair, bringing community projects to people who never read tech blogs — and inviting them to build alongside.",
    body: MINORMAKERS_BODY,
    status: "launched" as const,
    featured: true,
    order: 60,
  },
  {
    title: "Quiet Roads",
    slug: "quiet-roads",
    tag: "Public · 2025",
    tagline: "Citizen map of nighttime noise.",
    description:
      "A citizen-led map of nighttime noise in residential blocks — phone-based readings, plotted to ask the question city studies usually skip.",
    status: "building" as const,
    featured: false,
    order: 70,
  },
  {
    title: "ElderCode",
    slug: "eldercode",
    tag: "Education · 2024",
    tagline: "Internet & anti-scam class with elders.",
    description:
      "Plain-language, hand-on internet literacy classes held inside senior centers — designed and run by volunteers who actually listen.",
    status: "launched" as const,
    featured: false,
    order: 80,
  },
];

// One-time slug renames. Older seed records that match a key on the left
// have their slug rewritten to the value on the right before the upsert
// pass runs, so we don't end up with duplicate records after a rename.
const LEGACY_SLUG_RENAMES: Record<string, string> = {
  "restaurant-map": "berlin-food-map",
};

async function main() {
  const payload = await getPayload({ config });

  for (const [oldSlug, newSlug] of Object.entries(LEGACY_SLUG_RENAMES)) {
    const legacy = await payload.find({
      collection: "portfolio-items",
      where: { slug: { equals: oldSlug } },
      limit: 1,
    });
    if (legacy.totalDocs === 0) continue;

    const conflict = await payload.find({
      collection: "portfolio-items",
      where: { slug: { equals: newSlug } },
      limit: 1,
    });
    if (conflict.totalDocs > 0) {
      console.warn(
        `! Legacy slug "${oldSlug}" exists alongside "${newSlug}" — delete the old one in /admin and re-run.`,
      );
      continue;
    }

    await payload.update({
      collection: "portfolio-items",
      id: legacy.docs[0].id,
      data: { slug: newSlug },
    });
    console.log(`~ rename ${oldSlug} → ${newSlug}`);
  }

  for (const seed of SEEDS) {
    const existing = await payload.find({
      collection: "portfolio-items",
      where: { slug: { equals: seed.slug } },
      limit: 1,
    });

    if (existing.totalDocs > 0) {
      await payload.update({
        collection: "portfolio-items",
        id: existing.docs[0].id,
        data: seed,
      });
      console.log(`= update ${seed.slug}`);
    } else {
      await payload.create({
        collection: "portfolio-items",
        data: seed,
      });
      console.log(`+ create ${seed.slug}`);
    }
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
