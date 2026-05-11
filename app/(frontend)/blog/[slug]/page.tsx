import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NovaStar } from "@/components/icons/nova-star";
import { ShareButtons } from "@/components/blog/share-buttons";
import { getAllPostSlugs, getPostBySlug, getAllPosts, formatDate } from "@/lib/blog";
import { fallbackBlogPosts } from "@/lib/blog-fallback";
import type { BlogPost } from "@/lib/blog";

const PAD_X = "px-7 md:px-12 lg:px-20";

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
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
  const post = await loadPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Novawerk`,
    description: post.excerpt,
  };
}

async function loadPost(slug: string): Promise<BlogPost | null> {
  const cms = await getPostBySlug(slug).catch(() => null);
  if (cms) return cms;
  return fallbackBlogPosts.find((p) => p.slug === slug) ?? null;
}

async function loadAllPosts(): Promise<BlogPost[]> {
  const cms = await getAllPosts().catch(() => null);
  if (cms && cms.length) return cms;
  return fallbackBlogPosts;
}

function readTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function extractHeadings(md: string): string[] {
  return md
    .split("\n")
    .filter((line) => /^##\s+/.test(line))
    .map((line) => line.replace(/^##\s+/, "").trim())
    .filter(Boolean)
    .slice(0, 6);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const allPosts = await loadAllPosts();
  const category = post.tags?.[0] ?? "Note";
  const headings = extractHeadings(post.content);
  const read = readTime(post.content);

  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.tags?.[0] === category)
    .slice(0, 3);
  if (related.length < 3) {
    for (const p of allPosts) {
      if (related.length >= 3) break;
      if (p.slug !== post.slug && !related.includes(p)) related.push(p);
    }
  }

  return (
    <article className="nw-page-fade">
      {/* breadcrumbs */}
      <div className={`flex items-center justify-between border-b border-border py-6 font-mono text-[12px] ${PAD_X}`}>
        <Link
          href="/blog"
          className="link-underline inline-flex items-center gap-1"
        >
          ← All posts
        </Link>
        <span className="uppercase tracking-[0.08em] text-muted">
          Blog / {category}
        </span>
      </div>

      {/* hero */}
      <section
        className={`flex flex-col gap-4 ${PAD_X}`}
        style={{
          paddingTop: "clamp(48px, 6vw, 96px)",
          paddingBottom: "clamp(28px, 3vw, 48px)",
          maxWidth: 1100,
        }}
      >
        <Reveal>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
              {category}
            </span>
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted">
              {formatDate(post.date)} · {read} min read
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="m-0 max-w-[22ch] font-display text-[clamp(40px,5.5vw,80px)] font-bold leading-none tracking-[-0.035em]">
            {post.title}
          </h1>
        </Reveal>
        {post.excerpt && (
          <Reveal delay={0.15}>
            <p className="m-0 max-w-[60ch] font-serif text-[22px] italic leading-[1.5] text-foreground/85">
              {post.excerpt}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.2}>
          <div className="mt-2 flex items-center gap-3.5">
            <div className="flex size-11 items-center justify-center rounded-full bg-foreground">
              <NovaStar size={20} fill="var(--color-background)" />
            </div>
            <div>
              <div className="font-display text-base font-semibold tracking-[-0.01em]">
                {post.author ?? "Novawerk"}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
                Contributor · Novawerk
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* big cover */}
      <section className={PAD_X}>
        <Reveal>
          <div className="relative flex aspect-[16/7] items-center justify-center overflow-hidden rounded-lg bg-foreground">
            <NovaStar size={220} fill="var(--color-accent)" spin />
            <span className="absolute left-5 top-5 font-mono text-[11px] uppercase tracking-[0.1em] text-background/70">
              ▸ Hero image · {category}
            </span>
            <span className="absolute bottom-5 right-5 font-mono text-[11px] uppercase tracking-[0.1em] text-background/70">
              {formatDate(post.date)}
            </span>
          </div>
        </Reveal>
      </section>

      {/* body */}
      <section
        className={`grid grid-cols-1 items-start gap-[60px] lg:grid-cols-[220px_1fr] ${PAD_X}`}
        style={{
          paddingTop: "clamp(80px, 9vw, 160px)",
          paddingBottom: "clamp(80px, 9vw, 160px)",
        }}
      >
        <aside className="nw-toc">
          <div className="nw-toc__head">In this post</div>
          <ol>
            {(headings.length ? headings : ["Introduction", "What we found", "What's next"]).map(
              (h, i) => (
                <li key={i}>{h}</li>
              ),
            )}
          </ol>
          <ShareButtons title={post.title} />
        </aside>

        <div className="nw-article">
          <MDXRemote source={post.content} />
          <div className="nw-sig">
            <div className="nw-sig__rule" />
            <p className="nw-sig__text">
              <em>— Written for the Novawerk community.</em>
              <br />
              If you got something out of this, the most useful thing you can do
              is forward it to one person who would also care.
            </p>
          </div>
        </div>
      </section>

      {/* author block */}
      <section
        className={`grid items-center gap-7 border-y border-border md:grid-cols-[auto_1fr_auto] ${PAD_X}`}
        style={{
          background: "var(--color-paper)",
          paddingTop: 36,
          paddingBottom: 36,
        }}
      >
        <div className="flex size-24 items-center justify-center rounded-full bg-foreground">
          <NovaStar size={56} fill="var(--color-accent)" />
        </div>
        <div>
          <Eyebrow>Written by</Eyebrow>
          <h3 className="m-0 mt-2 font-display text-[32px] font-semibold tracking-[-0.02em]">
            {post.author ?? "Novawerk"}
          </h3>
          <p className="m-0 mt-2 max-w-[60ch] text-base leading-[1.6] text-foreground/85">
            Writes about how things actually get made — methods, mistakes,
            retrospectives. Has been part of Novawerk since the early open days.
          </p>
        </div>
        <Link
          href="/community"
          className="inline-flex items-center gap-2.5 self-start rounded-full border border-foreground px-5 py-3 font-mono text-[12px] uppercase tracking-[0.06em] text-foreground transition-colors hover:bg-foreground hover:text-background md:self-center"
        >
          Get in touch →
        </Link>
      </section>

      {/* related */}
      {related.length > 0 && (
        <section
          className={PAD_X}
          style={{
            paddingTop: "clamp(80px, 9vw, 160px)",
            paddingBottom: "clamp(80px, 9vw, 160px)",
          }}
        >
          <Reveal>
            <Eyebrow>Keep reading</Eyebrow>
            <h2 className="m-0 mb-7 mt-3 font-display text-[clamp(28px,3vw,44px)] font-bold tracking-[-0.02em]">
              More from the {category.toLowerCase()} desk.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-9 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.05}>
                <Link
                  href={`/blog/${r.slug}`}
                  className="flex flex-col gap-3 border-t border-foreground pt-4 transition-colors hover:text-accent"
                >
                  <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
                    <span className="text-accent">{r.tags?.[0] ?? "Note"}</span>
                    <span>{formatDate(r.date)}</span>
                  </div>
                  <h3 className="m-0 font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.02em]">
                    {r.title}
                  </h3>
                  {r.excerpt && (
                    <p className="m-0 text-sm leading-[1.6] text-foreground/85">
                      {r.excerpt}
                    </p>
                  )}
                  <div className="mt-auto pt-2 font-mono text-[11px] uppercase tracking-[0.04em] text-muted">
                    {r.author ?? "Novawerk"} · {readTime(r.content)} min
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

