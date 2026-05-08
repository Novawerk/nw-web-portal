import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { getAllPortfolioItems } from "@/lib/portfolio";

const statusLabel: Record<string, string> = {
  planning: "Planning",
  building: "Building",
  launching: "Launching",
  launched: "Launched",
};

// Revalidate every 5 minutes so CMS edits show up without a redeploy.
export const revalidate = 300;

export default async function PortfolioPage() {
  const projects = await getAllPortfolioItems();

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
          {projects.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center md:p-16">
              <p className="font-display text-2xl text-muted md:text-3xl">
                No projects yet — check back soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((p, i) => (
                <Reveal key={p.slug} as="article" delay={i * 0.1}>
                  <Link
                    href={`/portfolio/${p.slug}`}
                    className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:scale-[1.01] hover:border-foreground/20 md:p-10"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-foreground/[0.04] to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex items-start justify-between">
                      <span className="text-xs uppercase tracking-[0.2em] text-muted">
                        {p.tag}
                      </span>
                      <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                        {statusLabel[p.status] ?? p.status}
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
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
