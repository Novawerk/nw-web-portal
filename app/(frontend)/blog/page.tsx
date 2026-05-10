import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NovaStar } from "@/components/icons/nova-star";
import { BlogList } from "@/components/blog/blog-list";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { getAllPosts, formatDate, type BlogPost } from "@/lib/blog";
import { fallbackBlogPosts } from "@/lib/blog-fallback";

const PAD_X = "px-7 md:px-12 lg:px-20";

export const metadata = {
  title: "Blog — NovaWerk",
  description:
    "Field notes from the NovaWerk workshop. Methods, mistakes, retros, and conversations as they happen.",
};

// Revalidate every 5 minutes so CMS edits show up without a redeploy.
export const revalidate = 300;

function readTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogPage() {
  // Fall back to the real-seed mirror when the CMS is unreachable so local
  // dev without a DB still shows what production readers see.
  const result = await Promise.allSettled([getAllPosts()]);
  const cmsPosts: BlogPost[] =
    result[0].status === "fulfilled" ? result[0].value : [];
  const posts = cmsPosts.length > 0 ? cmsPosts : fallbackBlogPosts;

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <section
        className={`grid gap-10 border-b border-border md:grid-cols-[1.4fr_1fr] md:items-end md:gap-[60px] ${PAD_X}`}
        style={{
          paddingTop: "clamp(60px, 8vw, 120px)",
          paddingBottom: "clamp(40px, 5vw, 64px)",
        }}
      >
        <Reveal>
          <Eyebrow letter="C">Blog · Field notes</Eyebrow>
          <h1 className="mt-4 font-display text-[clamp(56px,10vw,168px)] font-bold leading-[0.92] tracking-[-0.045em]">
            <em className="font-serif font-normal italic text-accent">
              Process
            </em>
            <br />
            over result.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="m-0 max-w-[44ch] text-base leading-[1.6] text-foreground/85">
            No marketing posts here. We log methods, mistakes, retros and
            conversations as they happen. Watch how an idea moves from paper
            to the real world — and how the real world rewrites it, again and
            again.
          </p>
        </Reveal>
      </section>

      {featured && <FeaturedPost post={featured} />}

      {rest.length > 0 ? (
        <BlogList posts={rest} />
      ) : (
        !featured && (
          <section
            className={PAD_X}
            style={{
              paddingTop: "clamp(80px, 9vw, 160px)",
              paddingBottom: "clamp(80px, 9vw, 160px)",
            }}
          >
            <Reveal>
              <p className="max-w-[44ch] font-display text-[clamp(28px,3vw,40px)] font-medium leading-[1.18] tracking-[-0.02em] text-foreground/70">
                The first field notes are still in drafts. Subscribe below and
                we&apos;ll send the first one to you.
              </p>
            </Reveal>
          </section>
        )
      )}

      <NewsletterSection />
    </>
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <section
      className={`grid gap-12 border-b border-border md:grid-cols-[1.4fr_1fr] md:gap-[48px] ${PAD_X}`}
      style={{
        paddingTop: "clamp(48px, 6vw, 80px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
      }}
    >
      <Reveal>
        <Link
          href={`/blog/${post.slug}`}
          className="group relative block aspect-[5/4] overflow-hidden rounded-md bg-foreground"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <NovaStar
              size={220}
              fill="var(--color-accent)"
              spin
              className="opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <span className="absolute left-5 top-5 font-mono text-[11px] uppercase tracking-[0.1em] text-background/70">
            ▸ Featured · {formatDate(post.date)}
          </span>
          <span className="absolute bottom-5 right-5 font-mono text-[11px] uppercase tracking-[0.1em] text-background/70">
            Editor&apos;s pick
          </span>
        </Link>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="flex flex-col justify-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
            {post.tags?.[0] ?? "Note"} · {formatDate(post.date)}
          </span>
          <h2 className="m-0 font-display text-[clamp(34px,4vw,60px)] font-bold leading-none tracking-[-0.03em]">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="m-0 text-base leading-[1.6] text-foreground/85">
              {post.excerpt}
            </p>
          )}
          <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
            {post.author ?? "NovaWerk"} · {readTime(post.content)} min read
          </div>
          <div className="mt-2">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2.5 rounded-full bg-foreground px-[22px] py-3.5 font-mono text-[13px] uppercase tracking-[0.04em] text-background transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-accent"
            >
              Read full
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section
      className={PAD_X}
      style={{
        paddingTop: "clamp(48px, 6vw, 96px)",
        paddingBottom: "clamp(80px, 9vw, 160px)",
      }}
    >
      <Reveal>
        <div
          className="grid gap-10 rounded-lg p-10 md:grid-cols-[1.1fr_1fr] md:items-center md:p-14"
          style={{
            background: "var(--color-foreground)",
            color: "var(--color-background)",
          }}
        >
          <div>
            <Eyebrow tone="dark">Newsletter · Monthly</Eyebrow>
            <h3 className="mt-4 font-display text-[clamp(32px,4vw,56px)] font-bold leading-none tracking-[-0.03em]">
              One letter a month,
              <br />
              <em className="font-serif font-normal italic text-accent">
                no ads ever
              </em>
              .
            </h3>
            <p className="mt-4 max-w-[44ch] text-sm leading-[1.6] text-background/70">
              We pull this month&apos;s retros, newly-launched projects, and
              open collaboration calls into a single letter.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </Reveal>
    </section>
  );
}
