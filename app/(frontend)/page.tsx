import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedSlogan } from "@/components/motion/animated-slogan";

export default function Home() {
  return (
    <>
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="hidden md:col-span-2 md:flex md:flex-col md:gap-2 md:pt-6">
              <Reveal delay={0.1}>
                <span className="text-xs uppercase tracking-[0.2em] text-muted">
                  001 / Mission
                </span>
              </Reveal>
            </div>
            <div className="md:col-span-10">
              <AnimatedSlogan />
              <Reveal delay={0.55}>
                <p className="mt-12 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
                  NovaWerk is an open, non-profit community turning meaningful
                  ideas into real-world impact — through collaboration,
                  creativity, and action.
                </p>
              </Reveal>
              <Reveal delay={0.7}>
                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <Button href="/community">
                    Join the community <ArrowRight className="size-4" />
                  </Button>
                  <Button href="/about" variant="ghost">
                    Read our principles
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60 py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal as="div" className="md:col-span-4">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                002 / About
              </span>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                Where ideas connect through meaningful movement.
              </h2>
            </Reveal>
            <Reveal
              as="div"
              delay={0.15}
              className="space-y-6 text-lg leading-relaxed text-muted md:col-span-7 md:col-start-6"
            >
              <p>
                Great ideas should not remain as concepts. Through real
                projects, shared learning, and practical collaboration, we
                help people turn meaningful ideas into reality.
              </p>
              <p>
                NovaWerk is not only a place to discuss ideas — it is a space
                where people come together to learn, build, and create
                positive impact together.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60 py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal as="div">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                003 / Vision
              </span>
              <p className="mt-6 font-display text-3xl leading-tight md:text-4xl">
                To build an open platform that empowers people to transform
                meaningful ideas into real-world impact.
              </p>
            </Reveal>
            <Reveal as="div" delay={0.15}>
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                004 / Mission
              </span>
              <p className="mt-6 font-display text-3xl leading-tight md:text-4xl">
                Lower the barriers of innovation —{" "}
                <span className="italic">together</span>.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60 py-24">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted">
                  005 / Portfolio
                </span>
                <h2 className="mt-4 font-display text-4xl md:text-5xl">
                  Currently building
                </h2>
              </div>
              <Button href="/portfolio" variant="ghost">
                All projects <ArrowRight className="size-4" />
              </Button>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal as="article" delay={0.1}>
              <ProjectCard
                tag="Apps"
                title="Restaurant Map"
                description="A community-curated guide to eating well, intentionally."
              />
            </Reveal>
            <Reveal as="article" delay={0.2}>
              <ProjectCard
                tag="Apps"
                title="YiMa App"
                description="Bringing structure to thoughtful daily practice."
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60 py-24">
        <Container>
          <Reveal>
            <div className="rounded-3xl bg-foreground p-10 text-background md:p-16">
              <p className="text-xs uppercase tracking-[0.2em] text-background/60">
                006 / Get Involved
              </p>
              <h2 className="mt-6 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
                Have a meaningful idea? <br />
                <span className="italic text-accent">
                  Let&apos;s build it together.
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
  tag,
  title,
  description,
}: {
  tag: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:scale-[1.01] hover:border-foreground/20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-foreground/[0.04] to-transparent transition-opacity duration-500 group-hover:opacity-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          {tag}
        </span>
        <h3 className="mt-2 font-display text-3xl md:text-4xl">{title}</h3>
        <p className="mt-2 text-muted">{description}</p>
      </div>
    </div>
  );
}
