import { getPayload } from "payload";
import config from "@payload-config";

export interface PortfolioMember {
  id: string;
  name: string;
  role: string;
  photoUrl?: string;
}

export interface PortfolioGalleryItem {
  url: string;
  alt?: string;
  caption?: string;
}

export interface PortfolioItem {
  slug: string;
  title: string;
  tag: string;
  tagline?: string;
  description: string;
  body?: string;
  status: "planning" | "building" | "launching" | "launched" | "archived";
  link?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  members?: PortfolioMember[];
  gallery?: PortfolioGalleryItem[];
  featured?: boolean;
  order?: number;
}

interface PayloadMedia {
  id?: string;
  url?: string;
  alt?: string;
}

interface PayloadTeamMember {
  id: string;
  name: string;
  role: string;
  photo?: PayloadMedia | string | null;
}

interface PayloadPortfolioDoc {
  slug: string;
  title: string;
  tag: string;
  tagline?: string | null;
  description: string;
  body?: string | null;
  status: PortfolioItem["status"];
  link?: string | null;
  coverImage?: PayloadMedia | string | null;
  members?: (PayloadTeamMember | string)[] | null;
  gallery?:
    | { image: PayloadMedia | string; caption?: string | null; id?: string }[]
    | null;
  featured?: boolean | null;
  order?: number | null;
}

const mediaUrl = (m: PayloadMedia | string | null | undefined): string | undefined =>
  typeof m === "object" && m !== null ? m.url : undefined;

const mediaAlt = (m: PayloadMedia | string | null | undefined): string | undefined =>
  typeof m === "object" && m !== null ? m.alt : undefined;

function toItem(doc: PayloadPortfolioDoc): PortfolioItem {
  return {
    slug: doc.slug,
    title: doc.title,
    tag: doc.tag,
    tagline: doc.tagline ?? undefined,
    description: doc.description,
    body: doc.body ?? undefined,
    status: doc.status,
    link: doc.link ?? undefined,
    coverImageUrl: mediaUrl(doc.coverImage),
    coverImageAlt: mediaAlt(doc.coverImage),
    members: (doc.members ?? [])
      .filter((m): m is PayloadTeamMember => typeof m === "object" && m !== null)
      .map((m) => ({
        id: String(m.id),
        name: m.name,
        role: m.role,
        photoUrl: mediaUrl(m.photo),
      })),
    gallery: (doc.gallery ?? []).map((g) => ({
      url: mediaUrl(g.image) ?? "",
      alt: mediaAlt(g.image),
      caption: g.caption ?? undefined,
    })),
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
    depth: 1,
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
    depth: 1,
    limit: 6,
  });
  return result.docs.map((d) => toItem(d as unknown as PayloadPortfolioDoc));
}

export async function getPortfolioItemBySlug(
  slug: string,
): Promise<PortfolioItem | null> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "portfolio-items",
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { not_equals: "archived" } },
      ],
    },
    depth: 2,
    limit: 1,
  });
  const doc = result.docs[0];
  return doc ? toItem(doc as unknown as PayloadPortfolioDoc) : null;
}

export async function getAllPortfolioSlugs(): Promise<string[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "portfolio-items",
    where: { status: { not_equals: "archived" } },
    limit: 500,
  });
  return result.docs.map((d) => (d as unknown as PayloadPortfolioDoc).slug);
}
