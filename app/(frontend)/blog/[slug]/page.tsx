import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { getAllPostSlugs, getPostBySlug, formatDate } from "@/lib/blog";

const PAD_X = "px-7 md:px-12 lg:px-20";

// Revalidate every 5 minutes so CMS edits show up without a redeploy.
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
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return {};
  return {
    title: `${post.title} — NovaWerk`,
    description: post.excerpt,
  };
}

function readTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();

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
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-3.5" />
          Back to blog
        </Link>
      </Reveal>

      <header className="mt-10 max-w-4xl">
        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
            <time dateTime={post.date} className="text-accent">
              {formatDate(post.date)}
            </time>
            <span>·</span>
            <span>{readTime(post.content)} min read</span>
            {post.tags?.length ? <span>·</span> : null}
            {post.tags?.map((tag) => (
              <span key={tag} className="text-accent">
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="mt-6 font-display text-[clamp(40px,7vw,108px)] font-bold leading-[0.95] tracking-[-0.04em]">
            {post.title}
          </h1>
        </Reveal>
        {post.excerpt && (
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-3xl font-serif text-2xl italic leading-[1.4] text-foreground/85 md:text-3xl">
              {post.excerpt}
            </p>
          </Reveal>
        )}
        {post.author && (
          <Reveal delay={0.3}>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
              By {post.author}
            </p>
          </Reveal>
        )}
      </header>

      <Reveal delay={0.35}>
        <div className="mx-auto mt-14 max-w-3xl border-t border-border pt-12">
          <div className="prose prose-lg prose-stone max-w-none prose-headings:font-display prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-2xl prose-a:text-foreground prose-a:underline-offset-4 hover:prose-a:text-accent prose-strong:text-foreground prose-blockquote:border-accent prose-blockquote:text-foreground prose-ol:marker:text-muted prose-ul:marker:text-muted prose-code:text-accent prose-code:before:content-none prose-code:after:content-none">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </Reveal>
    </article>
  );
}
