import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedSlogan } from "@/components/motion/animated-slogan";
import { Marquee } from "@/components/motion/marquee";
import { Magnetic } from "@/components/motion/magnetic";
import { getFeaturedPortfolioItems } from "@/lib/portfolio";

const principles = [
  {
    num: "01",
    title: "Purposeful Innovation",
    body: "Innovation should create real positive change — not chase trends or quick wins.",
  },
  {
    num: "02",
    title: "Build, Learn, Together",
    body: "An open community where people of all backgrounds learn by building real things.",
  },
  {
    num: "03",
    title: "Responsibility for Positive Change",
    body: "Everyone shares the responsibility to contribute. Indifference is the only failure.",
  },
];

const steps = [
  {
    num: "01",
    title: "Bring an idea.",
    body: "Pitch it to the workshop. Validate, refine, scope it down to something shippable.",
  },
  {
    num: "02",
    title: "Find collaborators.",
    body: "Pair up with builders, designers, researchers from the community.",
  },
  {
    num: "03",
    title: "Ship something useful.",
    body: "Build in public. Learn by doing. Contribute back.",
  },
];

const marqueeItems = [
  "Open",
  "Non-profit",
  "Real projects",
  "Built together",
  "Positive change",
  "Meaningful",
];

// Revalidate every 5 minutes so CMS edits show up without a redeploy.
export const revalidate = 300;

export default async function Home() {
  const featured = await getFeaturedPortfolioItems();

  return (
    <>
      {/* 001 / Manifesto — hero */}
      <section className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-between pt-20 pb-12 md:pt-28 md:pb-14">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="hidden md:col-span-2 md:flex md:flex-col md:gap-2 md:pt-6">
              <Reveal delay={0.1}>
                <span className="text-xs uppercase tracking-[0.2em] text-muted">
                  001 / Manifesto
                </span>
              </Reveal>
            </div>
            <div className="md:col-span-10">
              <AnimatedSlogan />

              <div className="mt-10 max-w-3xl space-y-1 text-2xl font-medium leading-tight text-foreground/85 md:mt-16 md:text-4xl">
                {[
                  "We don't chase scale.",
                  "We don't chase trends.",
                  <>
                    We build things that matter —{" "}
                    <span className="italic text-accent">together</span>.
                  </>,
                ].map((line, i) => (
                  <Reveal key={i} delay={0.55 + i * 0.13}>
                    <p>{line}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={1.05}>
                <p className="mt-10 max-w-xl text-base leading-relaxed text-muted">
                  NovaWerk is an open, non-profit community hub. Bring an idea,
                  bring yourself.
                </p>
              </Reveal>

              <Reveal delay={1.2}>
                <div className="mt-10">
                  <Magnetic>
                    <Button href="/community">
                      Join the workshop <ArrowRight className="size-4" />
                    </Button>
                  </Magnetic>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>

        <Container>
          <Reveal delay={1.5}>
            <div className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
              <span className="block h-px w-12 bg-foreground/40 animate-pulse-line" />
              <span>Scroll</span>
              <ArrowDown className="size-3 animate-bounce-soft" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Marquee strip */}
      <Marquee
        items={marqueeItems}
        className="border-y-0 bg-foreground text-background"
      />

      {/* 002 / What we do */}
      <section className="py-32 md:py-48">
        <Container>
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-muted">
              002 / What we do
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 max-w-5xl text-4xl font-medium leading-[1.05] md:text-7xl">
              We turn meaningful ideas into{" "}
              <span className="italic text-accent">real positive change</span>{" "}
              — together.
            </h2>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-12 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              We believe great ideas should not remain as concepts. Positive
              change happens when people come together to build, learn, and
              collaborate on real projects.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 003 / Principles */}
      <section className="border-t border-border/60 py-24 md:py-32">
        <Container>
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-muted">
              003 / Principles
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 max-w-3xl text-4xl font-medium leading-tight md:text-5xl">
              What we believe in.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
            {principles.map((p, i) => (
              <Reveal key={p.num} as="article" delay={0.15 + i * 0.1}>
                <div className="border-t border-foreground pt-6">
                  <span className="font-mono text-xs text-muted">{p.num}</span>
                  <h3 className="mt-3 text-2xl font-medium leading-tight md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 004 / How it works */}
      <section className="border-t border-border/60 py-24 md:py-32">
        <Container>
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-muted">
              004 / How it works
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 max-w-3xl text-4xl font-medium leading-tight md:text-5xl">
              From idea to action, in three steps.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {steps.map((s, i) => (
              <Reveal key={s.num} as="article" delay={0.15 + i * 0.1}>
                <div className="border-t border-foreground pt-6">
                  <span className="font-mono text-xs text-muted">{s.num}</span>
                  <h3 className="mt-3 text-2xl font-medium md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 005 / Currently building */}
      <section className="border-t border-border/60 py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted">
                  005 / Portfolio
                </span>
                <h2 className="mt-4 text-4xl font-medium md:text-5xl">
                  Currently building
                </h2>
              </div>
              <Button href="/portfolio" variant="ghost">
                All projects <ArrowRight className="size-4" />
              </Button>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featured.map((p, i) => (
              <Reveal key={p.slug} as="article" delay={(i + 1) * 0.1}>
                <ProjectCard
                  slug={p.slug}
                  tag={p.tag}
                  title={p.title}
                  description={p.description}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 006 / Get involved */}
      <section className="border-t border-border/60 py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="rounded-3xl bg-foreground p-10 text-background md:p-16">
              <span className="text-xs uppercase tracking-[0.2em] text-background/60">
                006 / Get involved
              </span>
              <h2 className="mt-6 max-w-3xl text-4xl font-medium leading-tight md:text-6xl">
                Have a meaningful idea? <br />
                <span className="italic text-accent">
                  Let&apos;s make it real.
                </span>
              </h2>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/community"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                >
                  Join NovaWerk <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/community#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-background/20 px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-background/10"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function ProjectCard({
  slug,
  tag,
  title,
  description,
}: {
  slug: string;
  tag: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:scale-[1.01] hover:border-foreground/20"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-foreground/[0.04] to-transparent transition-opacity duration-500 group-hover:opacity-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          {tag}
        </span>
        <h3 className="mt-2 text-3xl font-medium md:text-4xl">{title}</h3>
        <p className="mt-2 text-muted">{description}</p>
      </div>
    </Link>
  );
}
