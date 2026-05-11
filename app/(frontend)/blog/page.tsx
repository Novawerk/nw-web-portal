import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NovaStar } from "@/components/icons/nova-star";
import { BlogList } from "@/components/blog/blog-list";
import { DispatchForm } from "@/components/forms/dispatch-form";
import { getAllPosts, formatDate, type BlogPost } from "@/lib/blog";
import { fallbackBlogPosts } from "@/lib/blog-fallback";

const PAD_X = "px-7 md:px-12 lg:px-20";

export const metadata = {
  title: "Blog — Novawerk",
  description:
    "Field notes from the Novawerk workshop. Methods, mistakes, retros, and conversations as they happen.",
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
      <Reveal delay={0.1} className="h-full">
        <div className="flex h-full flex-col justify-center gap-4">
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
            {post.author ?? "Novawerk"} · {readTime(post.content)} min read
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

const DISPATCH_ITEMS = [
  {
    num: "01",
    title: "Retro of the month",
    body: "What we shipped, what broke, what we'd do differently.",
  },
  {
    num: "02",
    title: "New on the worksite",
    body: "Projects that just left “concept” — and what they need.",
  },
  {
    num: "03",
    title: "Open calls",
    body: "Roles 4hrs/week or less. First reply usually wins.",
  },
  {
    num: "04",
    title: "One long read",
    body: "A piece worth your coffee — from us or borrowed.",
  },
];

const RECENT_ISSUES = [
  { no: "№13", date: "Apr", title: "The non-profit math problem" },
  { no: "№12", date: "Mar", title: "47 restaurants taught us" },
  { no: "№11", date: "Feb", title: "How to write a brief that lands" },
];

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
          className="nw-dispatch overflow-hidden rounded-lg"
          style={{
            background: "var(--color-foreground)",
            color: "var(--color-background)",
          }}
        >
          {/* top meta bar */}
          <div className="nw-dispatch__bar grid grid-cols-2 gap-3 border-b border-background/15 px-8 py-5 font-mono text-[11px] uppercase tracking-[0.08em] text-background/55 md:grid-cols-4 md:px-12">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-accent" />
              Novawerk · Dispatch
            </span>
            <span className="hidden md:inline">Issue №14</span>
            <span className="hidden md:inline">May · 2026</span>
            <span className="text-right">1,284 readers</span>
          </div>

          {/* body */}
          <div className="grid gap-10 px-8 py-12 md:grid-cols-[1.1fr_1fr_1fr] md:gap-12 md:px-12 md:py-14">
            {/* left — headline */}
            <div className="flex flex-col gap-6">
              <h3 className="m-0 font-display text-[clamp(40px,4.4vw,64px)] font-bold leading-[0.95] tracking-[-0.03em]">
                One letter
                <br />
                a month,
                <br />
                <em className="font-serif font-normal italic text-accent">
                  no ads
                </em>
                <br />
                ever.
              </h3>
              <p className="m-0 max-w-[36ch] text-sm leading-[1.6] text-background/65">
                Retros, project launches, and open collaboration calls — pulled
                into a single dispatch the first Monday of every month.
              </p>
            </div>

            {/* middle — what's inside */}
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-background/55">
                <span className="inline-block size-2 rounded-full bg-accent" />
                What&apos;s inside
              </span>
              <ul className="m-0 mt-1 list-none border-t border-background/15 p-0">
                {DISPATCH_ITEMS.map((it) => (
                  <li
                    key={it.num}
                    className="grid grid-cols-[36px_1fr] items-start gap-3 border-b border-background/15 py-4"
                  >
                    <span className="pt-0.5 font-mono text-[11px] tracking-[0.08em] text-background/45">
                      {it.num}
                    </span>
                    <div>
                      <div className="font-display text-[17px] font-semibold leading-tight tracking-[-0.01em] text-background">
                        {it.title}
                      </div>
                      <p className="m-0 mt-1 text-[13px] leading-[1.5] text-background/60">
                        {it.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* right — subscribe card + archive */}
            <div className="flex flex-col gap-7">
              <div
                className="rounded-md border border-background/15 p-6"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <DispatchForm />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-background/55">
                  <span>Recent issues</span>
                  <a
                    href="#"
                    className="link-underline transition-colors hover:text-accent"
                  >
                    Archive →
                  </a>
                </div>
                <ul className="m-0 list-none border-t border-background/15 p-0">
                  {RECENT_ISSUES.map((it) => (
                    <li
                      key={it.no}
                      className="grid grid-cols-[40px_36px_1fr] items-center gap-3 border-b border-background/15 py-3 font-mono text-[12px] tracking-[0.04em] text-background/80 transition-colors hover:text-accent"
                    >
                      <span className="text-background/45">{it.no}</span>
                      <span className="text-background/55">{it.date}</span>
                      <span className="font-sans text-[13px] text-background">
                        {it.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-background/15 px-8 py-5 font-mono text-[11px] uppercase tracking-[0.08em] text-background/55 md:px-12">
            <span>↗ Next dispatch · Mon · Jun 01 · 2026</span>
            <span>No tracking · No ads · No reselling</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
