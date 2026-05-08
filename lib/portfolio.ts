import { getPayload } from "payload";
import config from "@payload-config";

export interface PortfolioItem {
  slug: string;
  title: string;
  tag: string;
  description: string;
  status: "planning" | "building" | "launching" | "launched" | "archived";
  link?: string;
  coverImageUrl?: string;
  featured?: boolean;
  order?: number;
}

interface PayloadPortfolioDoc {
  slug: string;
  title: string;
  tag: string;
  description: string;
  status: PortfolioItem["status"];
  link?: string | null;
  coverImage?: { url?: string } | string | null;
  featured?: boolean | null;
  order?: number | null;
}

function toItem(doc: PayloadPortfolioDoc): PortfolioItem {
  const cover = doc.coverImage;
  const coverImageUrl =
    typeof cover === "object" && cover !== null ? cover.url : undefined;
  return {
    slug: doc.slug,
    title: doc.title,
    tag: doc.tag,
    description: doc.description,
    status: doc.status,
    link: doc.link ?? undefined,
    coverImageUrl,
    featured: doc.featured ?? false,
    order: doc.order ?? 100,
  };
}

export async function getAllPortfolioItems(): Promise<PortfolioItem[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "portfolio-items",
    where: { status: { not_equals: "archived" } },
    sort: "order",
    limit: 100,
  });
  return result.docs.map((d) => toItem(d as unknown as PayloadPortfolioDoc));
}

export async function getFeaturedPortfolioItems(): Promise<PortfolioItem[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "portfolio-items",
    where: {
      and: [
        { featured: { equals: true } },
        { status: { not_equals: "archived" } },
      ],
    },
    sort: "order",
    limit: 6,
  });
  return result.docs.map((d) => toItem(d as unknown as PayloadPortfolioDoc));
}
