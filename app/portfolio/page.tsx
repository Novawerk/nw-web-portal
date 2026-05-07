import { Container } from "@/components/layout/container";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const projects = [
  {
    tag: "App",
    title: "Restaurant Map",
    description:
      "A community-curated guide to eating well, intentionally.",
    status: "Launching",
  },
  {
    tag: "App",
    title: "YiMa App",
    description: "Bringing structure to thoughtful daily practice.",
    status: "Launching",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="pt-20 pb-16 md:pt-32">
        <Container>
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-muted">
              Portfolio
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
              What we&apos;re{" "}
              <span className="italic text-accent">building</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Real projects, shipped or shipping — built by community members
              turning meaningful ideas into reality.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal
                key={p.title}
                as="article"
                delay={i * 0.1}
                className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:scale-[1.01] hover:border-foreground/20 md:p-10"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-foreground/[0.04] to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-start justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">
                    {p.tag}
                  </span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                    {p.status}
                  </span>
                </div>
                <div className="relative">
                  <h3 className="font-display text-3xl md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-muted">{p.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-foreground transition-transform duration-500 group-hover:translate-x-1">
                    Learn more <ArrowUpRight className="size-4" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
