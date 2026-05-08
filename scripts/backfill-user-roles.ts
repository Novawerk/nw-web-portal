import { getPayload } from "payload";
import config from "../payload.config";

async function main() {
  const payload = await getPayload({ config });

  const users = await payload.find({
    collection: "users",
    limit: 100,
  });

  console.log(`Found ${users.totalDocs} user(s).`);

  for (const u of users.docs) {
    const roles = (u as unknown as { roles?: string[] }).roles ?? [];
    if (roles.length === 0) {
      await payload.update({
        collection: "users",
        id: u.id,
        data: { roles: ["admin"] },
      });
      console.log(`+ promoted ${u.email} to admin`);
    } else {
      console.log(`= ${u.email}: ${roles.join(", ")}`);
    }
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Backfill failed:", err);
  process.exit(1);
});
