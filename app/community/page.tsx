import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const involve = [
  {
    title: "Who we're looking for",
    body: "Builders, designers, researchers, organizers — anyone who shares our vision and is willing to contribute. Background, experience, or skill level don't matter as much as intent.",
  },
  {
    title: "How to participate",
    body: "Bring an idea, join an existing project, or contribute your skills to ongoing work. We'll match you with collaborators and scope to make it real.",
  },
  {
    title: "Collaboration model",
    body: "Open by default. Decisions are made by the people doing the work. We move in small, intentional steps and ship things that are useful.",
  },
  {
    title: "Learning opportunities",
    body: "Real-world practice on real projects. Pair with experienced builders, get feedback, and grow through doing.",
  },
];

export default function CommunityPage() {
  return (
    <>
      <section className="pt-20 pb-16 md:pt-32">
        <Container>
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            Community
          </span>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
            Build with{" "}
            <span className="italic text-accent">us</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            NovaWerk is open. If you have a meaningful idea, want to learn by
            building, or want to contribute to projects that matter — there&apos;s
            a place for you here.
          </p>
        </Container>
      </section>

      <section className="border-t border-border/60 py-24">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-2">
            {involve.map((item) => (
              <article
                key={item.title}
                className="flex flex-col gap-3 bg-background p-8 md:p-10"
              >
                <h2 className="font-display text-2xl md:text-3xl">
                  {item.title}
                </h2>
                <p className="text-muted leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="contact"
        className="scroll-mt-24 border-t border-border/60 py-24"
      >
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                Get in touch
              </span>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                Tell us what you want to <span className="italic">build</span>.
              </h2>
              <p className="mt-6 text-muted leading-relaxed">
                Drop your details — we&apos;ll reach out to chat about how you
                might fit in, what you&apos;re working on, and where you might
                contribute.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
                <p className="font-display text-xl text-muted">
                  Contact form coming in Phase 4 of the build.
                </p>
                <p className="mt-3 text-sm text-muted">
                  Will collect: name, email, role/background, why you want to
                  join, interests, and optional links.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60 py-24">
        <Container>
          <div className="rounded-3xl bg-foreground p-10 text-background md:p-16">
            <span className="text-xs uppercase tracking-[0.2em] text-background/60">
              Newsletter
            </span>
            <h2 className="mt-6 max-w-2xl font-display text-3xl leading-tight md:text-5xl">
              Stay close to what we&apos;re{" "}
              <span className="italic text-accent">making</span>.
            </h2>
            <div className="mt-8">
              <Button href="/community#contact" variant="accent">
                Join the list <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
