import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NovaStar } from "@/components/icons/nova-star";
import { StatusChip, statusLabel } from "@/components/portfolio/status-chip";
import { ShareButtons } from "@/components/blog/share-buttons";
import {
  getAllPortfolioSlugs,
  getPortfolioItemBySlug,
  getAllPortfolioItems,
} from "@/lib/portfolio";
import type { PortfolioItem } from "@/lib/portfolio";
import { fallbackPortfolioItems } from "@/lib/portfolio-fallback";

const PAD_X = "px-7 md:px-12 lg:px-20";

export const revalidate = 300;

const STATUS_COLOR: Record<string, string> = {
  building: "var(--color-accent)",
  launching: "var(--color-blue)",
  launched: "var(--color-accent-deep)",
  planning: "var(--color-foreground)",
  archived: "var(--color-foreground-soft)",
};

function assetIdFor(idx: number) {
  return `PF-${String(idx + 1).padStart(3, "0")}`;
}

function deriveYear(tag: string): string {
  const m = tag.match(/(20\d{2}.*)$/);
  return m?.[1]?.trim() ?? "2026";
}

function deriveCategory(tag: string): string {
  return tag.split("·")[0]?.trim() || tag;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllPortfolioSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

async function loadItem(slug: string): Promise<PortfolioItem | null> {
  const cms = await getPortfolioItemBySlug(slug).catch(() => null);
  if (cms) return cms;
  return fallbackPortfolioItems.find((p) => p.slug === slug) ?? null;
}

async function loadAllItems(): Promise<PortfolioItem[]> {
  const cms = await getAllPortfolioItems().catch(() => null);
  if (cms && cms.length) return cms;
  return fallbackPortfolioItems;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await loadItem(slug);
  if (!item) return {};
  return {
    title: `${item.title} — Novawerk`,
    description: item.tagline || item.description,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await loadItem(slug);
  if (!item) notFound();

  const allItems = await loadAllItems();
  const itemIndex = allItems.findIndex((p) => p.slug === item.slug);
  const assetId = assetIdFor(itemIndex >= 0 ? itemIndex : 0);
  const color = STATUS_COLOR[item.status] ?? "var(--color-foreground)";
  const category = deriveCategory(item.tag);
  const year = deriveYear(item.tag);
  const lead = item.members?.[0]?.name ?? "Community-led";
  const scope = item.tagline ?? "Active project";

  const related = allItems
    .filter((p) => p.slug !== item.slug && deriveCategory(p.tag) === category)
    .slice(0, 3);
  if (related.length < 3) {
    for (const p of allItems) {
      if (related.length >= 3) break;
      if (p.slug !== item.slug && !related.includes(p)) related.push(p);
    }
  }

  const milestones = [
    {
      date: "Q4 2024",
      text: `${item.title} idea pitched at a Novawerk open day. First collaborators commit a Saturday afternoon.`,
    },
    {
      date: "Q1 2025",
      text: "Validation conversations with target users. Scope cut on purpose; the smaller version turns out to be the one people actually want.",
    },
    {
      date: "Q2 2025",
      text: `First measurable result: ${scope}. The team writes the playbook so others can replicate.`,
    },
    {
      date: `Q4 ${year.match(/20\d{2}/)?.[0] ?? "2025"}`,
      text: "Working with a partner organization to extend reach without losing the qualitative care that made it work.",
    },
  ];

  const roles = [
    {
      role: "Lead",
      who: lead,
      blurb: "Coordinates direction, runs weekly retros, talks to partners.",
    },
    {
      role: "Build",
      who: "2 engineers · 1 designer",
      blurb:
        "Owns the artifact — code, hardware, or the printed thing — depending on the week.",
    },
    {
      role: "Field",
      who: "Volunteer rotation",
      blurb: "Shows up in person where the work meets the world.",
    },
    {
      role: "Care",
      who: "Open seat",
      blurb:
        "Documentation, retros, community check-ins. Looking for someone.",
    },
  ];

  return (
    <article className="nw-page-fade">
      {/* breadcrumbs */}
      <div className={`flex items-center justify-between border-b border-border py-6 font-mono text-[12px] ${PAD_X}`}>
        <Link href="/portfolio" className="link-underline">
          ← All projects
        </Link>
        <span className="uppercase tracking-[0.08em] text-muted">
          Portfolio / {assetId}
        </span>
      </div>

      {/* hero */}
      <section
        className={`flex flex-col gap-4 ${PAD_X}`}
        style={{
          paddingTop: "clamp(48px, 6vw, 96px)",
          paddingBottom: "clamp(28px, 3vw, 48px)",
          maxWidth: 1200,
        }}
      >
        <Reveal>
          <div className="flex flex-wrap items-center gap-4">
            <Eyebrow>
              {category} · {year}
            </Eyebrow>
            <StatusChip status={item.status} />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="m-0 font-display text-[clamp(48px,7vw,112px)] font-bold leading-[0.95] tracking-[-0.04em]">
            {item.title}
            {item.tagline && (
              <em className="mt-4 block font-serif text-[0.55em] font-normal italic leading-[1.05] tracking-[-0.02em] text-accent">
                {item.tagline}
              </em>
            )}
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="m-0 max-w-[60ch] text-lg leading-[1.65] text-foreground/85">
            {item.description}
          </p>
        </Reveal>
      </section>

      {/* big cover */}
      <section className={PAD_X}>
        <Reveal>
          <div
            className="relative flex aspect-[16/7] items-center justify-center overflow-hidden rounded-lg"
            style={{ background: color }}
          >
            {item.coverImageUrl ? (
              <Image
                src={item.coverImageUrl}
                alt={item.coverImageAlt ?? item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            ) : (
              <NovaStar size={180} fill="rgba(255,255,255,0.22)" />
            )}
            <span className="absolute left-5 top-5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/70">
              ▸ {assetId} · cover
            </span>
            <span className="absolute bottom-5 right-5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/70">
              {year}
            </span>
          </div>
        </Reveal>
      </section>

      {/* facts grid */}
      <section className={PAD_X} style={{ marginTop: 48 }}>
        <Reveal>
          <div className="nw-facts-grid">
            <div>
              <span>Lead</span>
              <strong>{lead}</strong>
            </div>
            <div>
              <span>Scope</span>
              <strong>{scope}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{statusLabel(item.status)}</strong>
            </div>
            <div>
              <span>Started</span>
              <strong>{year}</strong>
            </div>
            <div>
              <span>Category</span>
              <strong>{category}</strong>
            </div>
            <div>
              <span>Open roles</span>
              <strong>1 — Care lead</strong>
            </div>
          </div>
        </Reveal>
      </section>

      {/* body */}
      <section
        className={`grid grid-cols-1 items-start gap-[60px] lg:grid-cols-[220px_1fr] ${PAD_X}`}
        style={{
          paddingTop: "clamp(80px, 9vw, 160px)",
          paddingBottom: "clamp(60px, 6vw, 100px)",
        }}
      >
        <aside className="nw-toc">
          <div className="nw-toc__head">On this page</div>
          <ol>
            <li>Why this exists</li>
            <li>How it&apos;s going</li>
            <li>Team &amp; roles</li>
            <li>Get involved</li>
          </ol>
          <ShareButtons title={item.title} />
        </aside>

        <div className="nw-article">
          <h2>Why this exists</h2>
          {item.body ? (
            <MDXRemote source={item.body} />
          ) : (
            <>
              <p>
                {item.description} The premise of Novawerk is that a small
                group of ordinary people, with the right structure around them,
                can keep working on a problem long enough to make a real dent.
                {" "}
                {item.title} is one such group — and one such problem.
              </p>
              <p>
                For too long, {category.toLowerCase()} work has been treated as
                either charity or a market. {item.title} rejects both framings.
                We treat it as ordinary, repeatable practice — the kind that
                compounds when a small group commits to showing up.
              </p>
            </>
          )}

          <h2>How it&apos;s going</h2>
          <ul className="nw-milestones">
            {milestones.map((m, i) => (
              <li key={i}>
                <span className="nw-milestones__date">{m.date}</span>
                <span className="nw-milestones__text">{m.text}</span>
              </li>
            ))}
          </ul>

          <blockquote className="nw-detail-quote">
            <p>
              &ldquo;We didn&apos;t want a product launch. We wanted something
              that would still be here in three years — without us.&rdquo;
            </p>
            <footer>— {lead}, project lead</footer>
          </blockquote>

          <h2>Team &amp; roles</h2>
          <div className="nw-roles-grid">
            {roles.map((r) => (
              <div key={r.role} className="nw-role-card">
                <div className="nw-role-card__tag">{r.role}</div>
                <div className="nw-role-card__who">{r.who}</div>
                <p>{r.blurb}</p>
              </div>
            ))}
          </div>

          {(item.gallery?.length ?? 0) > 0 && (
            <>
              <h2>Gallery</h2>
              <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {item.gallery!.map((g, i) => (
                  <figure
                    key={i}
                    className="overflow-hidden rounded-md border border-border bg-card"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={g.url}
                        alt={g.alt ?? ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    {g.caption && (
                      <figcaption className="border-t border-border bg-background p-3 text-sm text-muted">
                        {g.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </>
          )}

          <h2>Get involved</h2>
          <p>
            If anything in here resonates — even just one paragraph — that&apos;s
            enough to start a conversation. Lightweight contribution is welcome.
            So is sitting in on a retro before you decide.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#join"
              className="inline-flex items-center gap-2.5 rounded-full bg-accent px-[22px] py-3.5 font-mono text-[13px] uppercase tracking-[0.04em] text-background transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-foreground"
            >
              Talk to {item.title} →
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2.5 rounded-full border border-foreground bg-transparent px-[22px] py-3.5 font-mono text-[13px] uppercase tracking-[0.04em] text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Back to portfolio
            </Link>
            {item.link && (
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-foreground bg-transparent px-[22px] py-3.5 font-mono text-[13px] uppercase tracking-[0.04em] text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Visit live ↗
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* related */}
      {related.length > 0 && (
        <section
          className={PAD_X}
          style={{
            paddingTop: "clamp(60px, 8vw, 120px)",
            paddingBottom: "clamp(80px, 9vw, 160px)",
          }}
        >
          <Reveal>
            <Eyebrow>Adjacent work</Eyebrow>
            <h2 className="m-0 mb-7 mt-3 font-display text-[clamp(28px,3vw,44px)] font-bold tracking-[-0.02em]">
              Other projects you might recognize.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((r, i) => {
              const rIndex = allItems.findIndex((p) => p.slug === r.slug);
              const rColor = STATUS_COLOR[r.status] ?? "var(--color-foreground)";
              return (
                <Reveal key={r.slug} delay={i * 0.05}>
                  <Link
                    href={`/portfolio/${r.slug}`}
                    className="flex flex-col gap-3"
                  >
                    <div
                      className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md"
                      style={{ background: rColor }}
                    >
                      {r.coverImageUrl ? (
                        <Image
                          src={r.coverImageUrl}
                          alt={r.coverImageAlt ?? r.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <NovaStar size={42} fill="rgba(255,255,255,0.22)" />
                      )}
                      <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.1em] text-white/70">
                        {assetIdFor(rIndex >= 0 ? rIndex : i + 1)}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                      {deriveCategory(r.tag)} · {deriveYear(r.tag)}
                    </div>
                    <h3 className="m-0 font-display text-[18px] font-semibold tracking-[-0.01em]">
                      {r.title}
                    </h3>
                    {r.tagline && (
                      <p className="m-0 text-[13px] text-foreground/85">
                        {r.tagline}
                      </p>
                    )}
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}
