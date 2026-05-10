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

const SEEDS = [
  {
    title: "Berlin Chinese Food Map",
    slug: "berlin-food-map",
    tag: "App",
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
    tag: "App",
    tagline: "Privacy-first period calendar.",
    description:
      "A small tool, designed without profit as a constraint — to see whether the experience can become good again.",
    body: YIMA_BODY,
    status: "launching" as const,
    link: "https://novawerk.github.io/YIMA/",
    featured: true,
    order: 20,
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
