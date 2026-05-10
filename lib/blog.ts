import { getPayload } from "payload";
import config from "@payload-config";
import { formatDate } from "./format";

export { formatDate };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  author?: string;
  content: string;
}

interface PayloadBlogDoc {
  slug: string;
  title: string;
  excerpt?: string | null;
  publishedDate: string;
  tags?: { tag: string; id?: string }[] | null;
  author?: string | null;
  content: string;
}

function toBlogPost(doc: PayloadBlogDoc): BlogPost {
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt ?? "",
    date: doc.publishedDate,
    tags: doc.tags?.map((t) => t.tag),
    author: doc.author ?? undefined,
    content: doc.content,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "blog-posts",
    where: { status: { equals: "published" } },
    sort: "-publishedDate",
    limit: 100,
  });
  return result.docs.map((d) => toBlogPost(d as unknown as PayloadBlogDoc));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "blog-posts",
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: "published" } },
      ],
    },
    limit: 1,
  });
  const doc = result.docs[0];
  return doc ? toBlogPost(doc as unknown as PayloadBlogDoc) : null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "blog-posts",
    where: { status: { equals: "published" } },
    limit: 500,
  });
  return result.docs.map((d) => (d as unknown as PayloadBlogDoc).slug);
}

