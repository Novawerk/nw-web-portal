import { getPayload } from "payload";
import config from "../payload.config";

const SEEDS = [
  {
    title: "Restaurant Map",
    slug: "restaurant-map",
    tag: "App",
    description:
      "A community-curated guide to eating well, intentionally.",
    status: "launching" as const,
    featured: true,
    order: 10,
  },
  {
    title: "YiMa App",
    slug: "yima-app",
    tag: "App",
    description: "Bringing structure to thoughtful daily practice.",
    status: "launching" as const,
    featured: true,
    order: 20,
  },
];

async function main() {
  const payload = await getPayload({ config });

  for (const seed of SEEDS) {
    const existing = await payload.find({
      collection: "portfolio-items",
      where: { slug: { equals: seed.slug } },
      limit: 1,
    });

    if (existing.totalDocs > 0) {
      console.log(`= skip   ${seed.slug} (already in Payload)`);
      continue;
    }

    await payload.create({
      collection: "portfolio-items",
      data: seed,
    });
    console.log(`+ import ${seed.slug}`);
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
