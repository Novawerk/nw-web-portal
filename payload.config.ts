import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { BlogPosts } from "./collections/BlogPosts";
import { ContactSubmissions } from "./collections/ContactSubmissions";
import { NewsletterSubscribers } from "./collections/NewsletterSubscribers";
import { PortfolioItems } from "./collections/PortfolioItems";
import { TeamMembers } from "./collections/TeamMembers";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " — NovaWerk CMS",
    },
  },
  collections: [
    Users,
    Media,
    BlogPosts,
    ContactSubmissions,
    NewsletterSubscribers,
    PortfolioItems,
    TeamMembers,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      // Accept either DATABASE_URI (Payload convention) or DATABASE_URL
      // (Vercel/Neon/most platforms). Same string, different env name.
      connectionString:
        process.env.DATABASE_URI || process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
});
