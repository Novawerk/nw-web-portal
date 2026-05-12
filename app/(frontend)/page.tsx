import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { NovaStar } from "@/components/icons/nova-star";
import { HeroBlob } from "@/components/home/hero-blob";
import { HeroTitle } from "@/components/home/hero-title";
import { NumbersGrid } from "@/components/home/numbers-counter";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getFeaturedPortfolioItems } from "@/lib/portfolio";
import { fallbackPortfolioItems } from "@/lib/portfolio-fallback";
import { getAllPosts, formatDate } from "@/lib/blog";
import { fallbackBlogPosts } from "@/lib/blog-fallback";

export const revalidate = 300;

const PAD_X = "px-7 md:px-12 lg:px-20";

const wwd = [
  {
    num: "01",
    en: "Validate",
    title: "Validate",
    body: "Sharpen a vague idea into a clear problem statement worth solving.",
  },
  {
    num: "02",
    en: "Break Down",
    title: "Break Down",
    body: "Slice ambition into milestones small enough to ship next week.",
  },
  {
    num: "03",
    en: "Collaborate",
    title: "Collaborate",
    body: "Find designers, engineers, researchers and community folk who complete your team.",
  },
  {
    num: "04",
    en: "Build for Real",
    title: "Build for Real",
    body: "We don't make demos. We make things that have to be handed over.",
  },
];

const principles = [
  {
    tag: "Principle 01",
    title: "Purposeful Innovation",
    body: "Innovation should bring real, positive change — not chase trends or quick wins. The question we care about: when this thing exists, is the world a little better?",
    color: "var(--color-accent)",
  },
  {
    tag: "Principle 02",
    title: "Build, Learn, Together",
    body: "An open community where people from any background learn by building real things. Skills are a side-effect of the project. So are friendships.",
    color: "var(--color-blue)",
  },
  {
    tag: "Principle 03",
    title: "Responsibility for Change",
    body: "We share the responsibility of making the world a little better. Indifference is the only failure. You don't need to be ready — you just need to start.",
    color: "var(--color-foreground)",
  },
];

// Design rotates featured tiles through accent / blue / green / ink. We
// follow the same rotation so the home grid feels intentional even when
// the CMS doesn't tag colors.
const FEATURED_COLORS = [
  "var(--color-accent)",
  "var(--color-blue)",
  "var(--color-accent-deep)",
  "var(--color-foreground)",
];

const paths = [
  {
    num: "I",
    en: "Bring an idea",
    body: "You've got a thing you want to make. Come tell us. We'll help you check it, find people, and push it to the next step.",
  },
  {
    num: "II",
    en: "Join a project",
    body: "Look at the portfolio, pick a project that resonates, talk to the lead directly. Lightweight contribution welcome.",
  },
  {
    num: "III",
    en: "Just look around",
    body: "Subscribe to our newsletter, or come to a monthly open day. Just listen to what others are working on.",
  },
];

const marqueeItems = [
  "Purposeful Innovation",
  "Build · Learn · Together",
  "Indifference is the only failure",
  "Made for ideas that matter",
  "Not for profit · For purpose",
  "The next Nova is you",
];

export default async function Home() {
  // The home page can render without the CMS — fall back to demo content if
  // Payload can't reach the database (local dev without .env.local, etc).
  const [featuredCmsResult, postsResult] = await Promise.allSettled([
    getFeaturedPortfolioItems(),
    getAllPosts(),
  ]);
  const featuredCms =
    featuredCmsResult.status === "fulfilled" ? featuredCmsResult.value : [];
  const posts = postsResult.status === "fulfilled" ? postsResult.value : [];

  const featuredSource = featuredCms.length
    ? featuredCms
    : fallbackPortfolioItems.filter((p) => p.featured);

  const featured = featuredSource.slice(0, 4).map((p, i) => {
    const category = p.tag.split("·")[0]?.trim() || p.tag;
    const yearMatch = p.tag.match(/(20\d{2}.*)$/);
    return {
      slug: p.slug,
      tag: category,
      title: p.title,
      description: p.description,
      stat: p.tagline ?? "",
      color: FEATURED_COLORS[i % FEATURED_COLORS.length],
      asset: `PF-${String(i + 1).padStart(3, "0")}`,
      year: yearMatch?.[1]?.trim() ?? "",
    };
  });

  const recentPosts = posts.length ? posts.slice(0, 4) : fallbackBlogPosts.slice(0, 4);

  return (
    <>
      <Hero />
      <Marquee items={marqueeItems} />
      <WhatWeDo />
      <Principles />
      <Projects featured={featured} />
      <Numbers />
      <Manifesto />
      <BlogTeaser
        posts={recentPosts.map((p) => ({
          date: formatDate(p.date),
          cat: p.tags?.[0] ?? "Note",
          title: p.title,
          slug: p.slug,
          read: `${Math.max(
            1,
            Math.round(p.content.trim().split(/\s+/).length / 200),
          )} min`,
        }))}
      />
      <HowToJoin />
    </>
  );
}

/* ─────── HERO ─────── */
function Hero() {
  return (
    <section
      className={`relative isolate overflow-hidden border-b border-border ${PAD_X}`}
      style={{ paddingTop: "clamp(60px, 8vw, 120px)", paddingBottom: "clamp(48px, 6vw, 96px)" }}
    >
      <HeroBlob />

      <div className="mb-12 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center md:[margin-bottom:clamp(48px,8vw,96px)]">
        <Eyebrow>A non-profit community · est. 2025</Eyebrow>
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          [N°001] · Index
        </div>
      </div>

      <HeroTitle />

      <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-[60px]">
        <div>
          <p className="max-w-[50ch] text-[15px] leading-[1.6] text-foreground/85 md:text-lg">
            Novawerk is an open, non-profit community hub. We believe innovation
            shouldn&apos;t chase trends — it should create real value for the
            world. Here, anyone can bring an idea, find collaborators, and turn
            it into a real project.
          </p>
          <div className="mt-7 flex flex-wrap gap-3.5">
            <Link
              href="#join"
              className="inline-flex items-center gap-2.5 rounded-full bg-accent px-[22px] py-3.5 font-mono text-[13px] uppercase tracking-[0.04em] text-background transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-foreground"
            >
              Join the community
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2.5 rounded-full border border-foreground bg-transparent px-[22px] py-3.5 font-mono text-[13px] uppercase tracking-[0.04em] text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              See what we ship
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-md border border-dashed border-border-strong p-[18px] text-center">
            <div className="font-display text-[44px] font-bold leading-none tracking-[-0.03em] text-accent">
              N+1
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.06em] leading-[1.5] text-muted">
              The next project
              <br />
              could be yours
            </div>
          </div>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 font-mono text-[12px] uppercase tracking-[0.04em] text-foreground">
            {["Validate ideas", "Break it down", "Find collaborators", "Build · learn · ship"].map(
              (item, i) => (
                <li
                  key={item}
                  className="grid grid-cols-[30px_1fr] border-t border-border pt-2 last:border-b last:pb-2"
                >
                  <span className="text-accent">0{i + 1}</span>
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="absolute bottom-6 right-7 hidden flex-col items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted md:flex md:right-12 lg:right-20">
        <span>Scroll</span>
        <ArrowDown className="size-3 animate-bounce-soft" />
      </div>
    </section>
  );
}

/* ─────── WHAT WE DO ─────── */
function WhatWeDo() {
  return (
    <section
      className={`${PAD_X}`}
      style={{ paddingTop: "clamp(80px, 9vw, 160px)", paddingBottom: "clamp(80px, 9vw, 160px)" }}
    >
      <Reveal>
        <div className="mb-14 flex flex-col gap-4">
          <Eyebrow letter="A">What we do</Eyebrow>
          <h2 className="font-display text-[clamp(48px,7.6vw,124px)] font-bold leading-[0.92] tracking-[-0.04em]">
            From <em className="font-serif font-normal italic text-accent">zero</em>
            <br />
            to one.
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {wwd.map((it, i) => (
          <Reveal key={it.num} delay={i * 0.08}>
            <article className="flex flex-col gap-2.5">
              <div className="font-mono text-xs tracking-[0.08em] text-accent">
                {it.num} · {it.en}
              </div>
              <h3 className="mb-1 mt-1.5 font-display text-[clamp(22px,2vw,30px)] font-semibold leading-[1.1] tracking-[-0.02em]">
                {it.title}
              </h3>
              <p className="m-0 text-sm leading-[1.6] text-foreground/85">
                {it.body}
              </p>
              <div className="mt-4 h-px w-full bg-foreground" />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────── PRINCIPLES ─────── */
function Principles() {
  return (
    <section
      className="border-y border-border"
      style={{
        background: "var(--color-paper)",
        paddingTop: "clamp(80px, 9vw, 160px)",
        paddingBottom: "clamp(80px, 9vw, 160px)",
      }}
    >
      <div className={PAD_X}>
        <Reveal>
          <div className="mb-14 flex flex-col gap-4">
            <Eyebrow letter="B">Principles</Eyebrow>
            <h2 className="font-display text-[clamp(48px,7.6vw,124px)] font-bold leading-[0.92] tracking-[-0.04em]">
              Three things
              <br />
              we{" "}
              <em className="font-serif font-normal italic text-accent">
                believe
              </em>
              .
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="flex flex-col">
        {principles.map((p, i) => (
          <Reveal key={p.tag} delay={i * 0.06}>
            <div
              className={`group border-t border-border transition-colors hover:bg-[color-mix(in_srgb,var(--color-accent)_10%,var(--color-paper))] ${
                i === principles.length - 1 ? "border-b" : ""
              }`}
            >
              <div
                className={`grid items-start gap-10 py-10 lg:grid-cols-[160px_110px_minmax(0,1fr)] lg:py-14 ${PAD_X}`}
              >
                <div className="flex flex-col gap-3.5 pt-2">
                  <NovaStar size={28} fill={p.color} />
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                    {p.tag}
                  </div>
                </div>
                <div
                  className="font-display text-[clamp(56px,6.5vw,96px)] font-bold leading-[0.85] tracking-[-0.04em]"
                  style={{ color: p.color }}
                >
                  0{i + 1}
                </div>
                <div>
                  <h3 className="mb-4 font-display text-[clamp(30px,3.6vw,52px)] font-bold leading-[0.98] tracking-[-0.03em] [overflow-wrap:break-word] [word-break:break-word]">
                    {p.title}
                  </h3>
                  <p className="m-0 max-w-[56ch] text-base leading-[1.65] text-foreground/85">
                    {p.body}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────── PROJECTS ─────── */
interface FeaturedProject {
  slug: string;
  tag: string;
  title: string;
  description: string;
  stat: string;
  color: string;
  asset: string;
  year: string;
}

function Projects({ featured }: { featured: FeaturedProject[] }) {
  return (
    <section
      className={PAD_X}
      style={{ paddingTop: "clamp(80px, 9vw, 160px)", paddingBottom: "clamp(80px, 9vw, 160px)" }}
    >
      <Reveal>
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <Eyebrow letter="C">Featured · Portfolio</Eyebrow>
            <h2 className="font-display text-[clamp(48px,7.6vw,124px)] font-bold leading-[0.92] tracking-[-0.04em]">
              What&apos;s{" "}
              <em className="font-serif font-normal italic text-accent">
                happening
              </em>
              <br />
              right now.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2.5 rounded-full border border-foreground px-5 py-3 font-mono text-[12px] uppercase tracking-[0.06em] text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            See all <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-9 md:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <Link href={`/portfolio/${p.slug}`} className="group flex flex-col gap-4">
              <div
                className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                style={{ background: p.color }}
              >
                <span className="absolute left-3.5 top-3.5 rounded-sm bg-black/20 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white/70">
                  {p.asset}
                </span>
                <NovaStar size={48} fill="rgba(255,255,255,0.18)" />
                {(p.tag || p.year) && (
                  <div className="absolute inset-x-3.5 bottom-3.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-white/85">
                    <span>{p.tag}</span>
                    {p.year && <span>{p.year}</span>}
                  </div>
                )}
              </div>
              <div>
                <h3 className="m-0 font-display text-[clamp(22px,2.4vw,32px)] font-semibold leading-[1.05] tracking-[-0.02em]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.6] text-foreground/85">
                  {p.description}
                </p>
                <div className="mt-3 flex justify-between border-t border-border pt-3 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
                  <span>{p.stat || "—"}</span>
                  <span className="link-underline">Case →</span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────── NUMBERS ─────── */
function Numbers() {
  return (
    <section
      className="bg-foreground text-background"
      style={{
        paddingTop: "clamp(80px, 9vw, 160px)",
        paddingBottom: "clamp(80px, 9vw, 160px)",
      }}
    >
      <div className={PAD_X}>
        <Reveal>
          <div className="mb-12 flex flex-col gap-4">
            <Eyebrow letter="D" tone="dark">
              By the numbers
            </Eyebrow>
            <h2 className="font-display text-[clamp(48px,7.6vw,124px)] font-bold leading-[0.92] tracking-[-0.04em] text-background">
              One{" "}
              <em
                className="font-serif font-normal italic"
                style={{ color: "var(--color-yellow)" }}
              >
                year
              </em>
              <br />
              and counting.
            </h2>
          </div>
        </Reveal>

        <NumbersGrid />
      </div>
    </section>
  );
}

/* ─────── MANIFESTO ─────── */
function Manifesto() {
  return (
    <section
      className="border-y border-border"
      style={{
        background: "var(--color-paper)",
        paddingTop: "clamp(80px, 9vw, 160px)",
        paddingBottom: "clamp(80px, 9vw, 160px)",
      }}
    >
      <div className={PAD_X}>
        <Reveal>
          <Eyebrow letter="E">Manifesto</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-9 flex max-w-[52ch] flex-col gap-7">
            <p className="m-0 font-display text-[clamp(28px,3.4vw,48px)] font-medium leading-[1.18] tracking-[-0.02em]">
              We live in a world{" "}
              <em className="font-serif font-normal italic text-accent">
                full of unfinished things
              </em>
              . So many ideas that could make life better are stuck at step
              one. Not because they aren&apos;t smart enough — but because
              there&apos;s no structure to push them through. No one to
              validate, no one to build with, no time to break them down.
            </p>
            <p className="m-0 font-display text-[clamp(28px,3.4vw,48px)] font-medium leading-[1.18] tracking-[-0.02em]">
              <em className="font-serif font-normal italic text-accent">
                Novawerk is that place
              </em>
              : a group of ordinary people who decided to put a small slice of
              their time and ability into things that{" "}
              <em className="font-serif font-normal italic text-accent">
                actually matter
              </em>
              . We don&apos;t sell dreams. We don&apos;t run hype. We make
              things, and we hand them over.
            </p>
            <p className="m-0 font-display text-[clamp(28px,3.4vw,48px)] font-medium leading-[1.18] tracking-[-0.02em]">
              If you look at the news, at your block, at yourself — and feel
              something is off,{" "}
              <em className="font-serif font-normal italic text-accent">
                that &ldquo;off&rdquo;
              </em>{" "}
              might just be the start of your next project.
              <span className="mt-7 block font-mono text-xs uppercase tracking-[0.1em] text-muted">
                — Novawerk Community
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────── BLOG TEASER ─────── */
function BlogTeaser({
  posts,
}: {
  posts: { date: string; cat: string; title: string; slug: string; read: string }[];
}) {
  return (
    <section
      className={PAD_X}
      style={{ paddingTop: "clamp(80px, 9vw, 160px)", paddingBottom: "clamp(80px, 9vw, 160px)" }}
    >
      <Reveal>
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <Eyebrow letter="F">Field notes</Eyebrow>
            <h2 className="font-display text-[clamp(48px,7.6vw,124px)] font-bold leading-[0.92] tracking-[-0.04em]">
              What we&apos;re{" "}
              <em className="font-serif font-normal italic text-accent">
                thinking
              </em>
              .
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2.5 rounded-full border border-foreground px-5 py-3 font-mono text-[12px] uppercase tracking-[0.06em] text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            All posts <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </Reveal>

      <ul className="m-0 list-none border-t border-foreground p-0">
        {posts.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 0.05}>
            <Link
              href={`/blog/${p.slug}`}
              className="group grid grid-cols-[110px_1fr] items-center gap-4 border-b border-border px-1 py-6 text-base transition-[padding,color] duration-300 hover:pl-4 hover:text-accent md:grid-cols-[130px_130px_1fr_110px] md:gap-5"
            >
              <span className="font-mono text-[11px] tracking-[0.08em] text-muted">
                {p.date}
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.08em] text-accent md:block">
                {p.cat}
              </span>
              <span className="font-display text-[clamp(18px,1.6vw,24px)] font-semibold leading-[1.2] tracking-[-0.02em]">
                {p.title}
              </span>
              <span className="hidden text-right font-mono text-[11px] uppercase tracking-[0.06em] text-muted md:inline">
                {p.read} <span className="ml-4">→</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ─────── HOW TO JOIN ─────── */
function HowToJoin() {
  return (
    <section
      className={PAD_X}
      style={{ paddingTop: "clamp(80px, 9vw, 160px)", paddingBottom: "clamp(80px, 9vw, 160px)" }}
    >
      <Reveal>
        <div className="mb-14 flex flex-col gap-4">
          <Eyebrow letter="G">How to join</Eyebrow>
          <h2 className="font-display text-[clamp(48px,7.6vw,124px)] font-bold leading-[0.92] tracking-[-0.04em]">
            <em className="font-serif font-normal italic text-accent">Three</em>{" "}
            ways
            <br />
            to join.
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {paths.map((p, i) => (
          <Reveal key={p.num} delay={i * 0.08}>
            <Link
              href="#join"
              className="group flex h-full flex-col gap-3 rounded-md border border-border-strong bg-background p-8 transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[var(--color-paper)] hover:shadow-[6px_6px_0_var(--color-foreground)]"
            >
              <div className="font-serif text-[56px] italic leading-none text-accent">
                {p.num}
              </div>
              <div
                className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted"
                style={{ marginBottom: "-4px" }}
              >
                {p.en}
              </div>
              <h3 className="m-0 font-display text-[26px] font-semibold tracking-[-0.02em]">
                {p.en}
              </h3>
              <p className="m-0 mb-1.5 flex-1 text-sm leading-[1.6] text-foreground/85">
                {p.body}
              </p>
              <span className="self-start font-mono text-xs uppercase tracking-[0.06em] text-foreground link-underline">
                Pick this →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

