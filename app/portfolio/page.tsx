import { Container } from "@/components/layout/container";
import { ArrowUpRight } from "lucide-react";

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
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            Portfolio
          </span>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
            What we&apos;re{" "}
            <span className="italic text-accent">building</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            Real projects, shipped or shipping — built by community members
            turning meaningful ideas into reality.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <article
                key={p.title}
                className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-8 transition-transform hover:scale-[1.01] md:p-10"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-foreground/[0.04] to-transparent" />
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
                  <div className="mt-6 flex items-center gap-2 text-sm text-foreground transition-transform group-hover:translate-x-1">
                    Learn more <ArrowUpRight className="size-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
