import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

const principles = [
  {
    num: "01",
    title: "Purposeful Innovation",
    body: "We believe innovation should create real positive change for people and society. Rather than following short-term trends or simple replication, we value meaningful ideas, thoughtful execution, and long-term contribution through real action.",
  },
  {
    num: "02",
    title: "Build, Learn, Together",
    body: "NovaWerk is an open community where people come together to learn, build, and grow through practical collaboration and real projects. We welcome individuals from different backgrounds, experiences, and skill levels who share a desire to create positive change together.",
  },
  {
    num: "03",
    title: "Responsibility for Positive Change",
    body: "We believe everyone shares a responsibility to contribute positively to society through their actions, ideas, and participation. Positive change begins when people choose to care, contribute, and take responsibility instead of remaining indifferent or inactive.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-20 pb-24 md:pt-32">
        <Container>
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-muted">
              About
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
              Why NovaWerk{" "}
              <span className="italic text-accent">exists</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-12 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              We are an open, non-profit community hub focused on creating
              real positive change in society. Great ideas should not remain
              as concepts — and positive change happens when people come
              together to build, learn, and collaborate.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border/60 py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                How we operate
              </span>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                Validate, scope, build, ship.
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed text-muted md:col-span-7 md:col-start-6">
              <p>NovaWerk exists to lower the barriers to creating positive change — helping people:</p>
              <ul className="space-y-3 pl-0">
                <li className="flex gap-4 border-t border-border/60 pt-3">
                  <span className="text-muted-foreground">→</span>
                  <span>validate and refine meaningful ideas</span>
                </li>
                <li className="flex gap-4 border-t border-border/60 pt-3">
                  <span className="text-muted-foreground">→</span>
                  <span>break ideas into actionable scopes</span>
                </li>
                <li className="flex gap-4 border-t border-border/60 pt-3">
                  <span className="text-muted-foreground">→</span>
                  <span>collaborate with like-minded people</span>
                </li>
                <li className="flex gap-4 border-t border-border/60 pt-3">
                  <span className="text-muted-foreground">→</span>
                  <span>gain practical skills through real projects</span>
                </li>
                <li className="flex gap-4 border-t border-border/60 pt-3">
                  <span className="text-muted-foreground">→</span>
                  <span>create solutions that contribute positively to society</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60 py-24">
        <Container>
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                Our principles
              </span>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                What we believe in.
              </h2>
            </div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal
                key={p.num}
                as="article"
                delay={i * 0.08}
                className="flex flex-col gap-4 bg-background p-8 md:p-10"
              >
                <span className="font-mono text-xs text-muted">{p.num}</span>
                <h3 className="font-display text-2xl md:text-3xl">{p.title}</h3>
                <p className="text-muted leading-relaxed">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
