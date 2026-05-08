import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getPayload } from "payload";
import config from "../payload.config";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

async function main() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.log("No content/blog dir found — nothing to migrate.");
    process.exit(0);
  }

  const payload = await getPayload({ config });

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"));

  if (files.length === 0) {
    console.log("No .mdx files in content/blog — nothing to migrate.");
    process.exit(0);
  }

  console.log(`Found ${files.length} MDX post(s).`);

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);

    const existing = await payload.find({
      collection: "blog-posts",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (existing.totalDocs > 0) {
      console.log(`= skip   ${slug} (already in Payload)`);
      continue;
    }

    await payload.create({
      collection: "blog-posts",
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt ?? "",
        publishedDate: data.date,
        author: data.author ?? "NovaWerk",
        tags: ((data.tags ?? []) as string[]).map((tag) => ({ tag })),
        content,
        status: "published",
      },
    });

    console.log(`+ import ${slug}`);
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
