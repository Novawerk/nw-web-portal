import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import {
  getAllPortfolioSlugs,
  getPortfolioItemBySlug,
} from "@/lib/portfolio";

const statusLabel: Record<string, string> = {
  planning: "Planning",
  building: "Building",
  launching: "Launching",
  launched: "Launched",
  archived: "Archived",
};

// Revalidate every 5 minutes so CMS edits show up without a redeploy.
export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getAllPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);
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
  const item = await getPortfolioItemBySlug(slug);
  if (!item) notFound();

  const hasMembers = (item.members?.length ?? 0) > 0;
  const hasGallery = (item.gallery?.length ?? 0) > 0;
  const hasBody = !!item.body;

  return (
    <article className="pt-20 pb-32 md:pt-32">
      <Container>
        <Reveal>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Back to portfolio
          </Link>
        </Reveal>

        <header className="mt-12 max-w-4xl">
          <Reveal delay={0.05}>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
              <span>{item.tag}</span>
              <span className="rounded-full border border-border px-3 py-1">
                {statusLabel[item.status] ?? item.status}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] md:text-7xl">
              {item.title}
            </h1>
          </Reveal>
          {item.tagline && (
            <Reveal delay={0.25}>
              <p className="mt-6 max-w-2xl font-display text-2xl italic text-muted md:text-3xl">
                {item.tagline}
              </p>
            </Reveal>
          )}
          <Reveal delay={0.35}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
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
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
                >
                  Visit live <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          )}
        </header>

        {item.coverImageUrl && (
          <Reveal delay={0.5}>
            <div className="relative mt-16 aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-card">
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
          <section className="mt-24 border-t border-border/60 pt-16">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                001 / About
              </span>
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
          <section className="mt-24 border-t border-border/60 pt-16">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                002 / Built by
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-2">
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
          <section className="mt-24 border-t border-border/60 pt-16">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                003 / Gallery
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {item.gallery!.map((g, i) => (
                  <figure
                    key={i}
                    className="group overflow-hidden rounded-2xl border border-border bg-card"
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
      </Container>
    </article>
  );
}
