import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StatusChip } from "@/components/portfolio/status-chip";
import {
  getAllPortfolioSlugs,
  getPortfolioItemBySlug,
} from "@/lib/portfolio";

const PAD_X = "px-7 md:px-12 lg:px-20";

// Revalidate every 5 minutes so CMS edits show up without a redeploy.
export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const slugs = await getAllPortfolioSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug).catch(() => null);
  if (!item) return {};
  return {
    title: `${item.title} — NovaWerk`,
    description: item.tagline || item.description,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug).catch(() => null);
  if (!item) notFound();

  const hasMembers = (item.members?.length ?? 0) > 0;
  const hasGallery = (item.gallery?.length ?? 0) > 0;
  const hasBody = !!item.body;

  return (
    <article
      className={PAD_X}
      style={{
        paddingTop: "clamp(48px, 6vw, 96px)",
        paddingBottom: "clamp(80px, 9vw, 160px)",
      }}
    >
      <Reveal>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-3.5" />
          Back to portfolio
        </Link>
      </Reveal>

      <header className="mt-10 max-w-5xl">
        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
            <span className="text-accent">{item.tag}</span>
            <StatusChip status={item.status} />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="mt-6 font-display text-[clamp(48px,9vw,140px)] font-bold leading-[0.92] tracking-[-0.045em]">
            {item.title}
          </h1>
        </Reveal>
        {item.tagline && (
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-3xl font-serif text-2xl italic text-foreground/85 md:text-3xl">
              {item.tagline}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.35}>
          <p className="mt-6 max-w-2xl text-base leading-[1.6] text-foreground/85 md:text-lg">
            {item.description}
          </p>
        </Reveal>
        {item.link && (
          <Reveal delay={0.45}>
            <div className="mt-10">
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-foreground px-[22px] py-3.5 font-mono text-[13px] uppercase tracking-[0.04em] text-background transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-accent"
              >
                Visit live <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </Reveal>
        )}
      </header>

      {item.coverImageUrl && (
        <Reveal delay={0.5}>
          <div className="relative mt-14 aspect-[16/9] overflow-hidden rounded-md border border-border bg-card">
            <Image
              src={item.coverImageUrl}
              alt={item.coverImageAlt ?? item.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      )}

      {hasBody && (
        <section className="mt-20 border-t border-border pt-14">
          <Reveal>
            <Eyebrow>001 / About</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-8 max-w-3xl">
              <div className="prose prose-lg prose-stone max-w-none prose-headings:font-display prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-2xl prose-a:text-foreground prose-a:underline-offset-4 hover:prose-a:text-accent prose-strong:text-foreground prose-blockquote:border-accent prose-blockquote:text-foreground prose-ol:marker:text-muted prose-ul:marker:text-muted prose-code:text-accent prose-code:before:content-none prose-code:after:content-none">
                <MDXRemote source={item.body!} />
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {hasMembers && (
        <section className="mt-20 border-t border-border pt-14">
          <Reveal>
            <Eyebrow>002 / Built by</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-px overflow-hidden rounded-md bg-border md:grid-cols-2">
              {item.members!.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-5 bg-background p-6 md:p-8"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-border bg-surface">
                    {m.photoUrl && (
                      <Image
                        src={m.photoUrl}
                        alt={m.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-display text-xl">{m.name}</p>
                    <p className="text-sm text-muted">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {hasGallery && (
        <section className="mt-20 border-t border-border pt-14">
          <Reveal>
            <Eyebrow>003 / Gallery</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {item.gallery!.map((g, i) => (
                <figure
                  key={i}
                  className="group overflow-hidden rounded-md border border-border bg-card"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={g.url}
                      alt={g.alt ?? ""}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  {g.caption && (
                    <figcaption className="border-t border-border bg-background p-4 text-sm text-muted">
                      {g.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </Reveal>
        </section>
      )}
    </article>
  );
}
