import { Container } from "@/components/layout/container";

export default function BlogPage() {
  return (
    <section className="pt-20 pb-32 md:pt-32">
      <Container>
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          Blog
        </span>
        <h1 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
          Notes from the{" "}
          <span className="italic text-accent">workshop</span>.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          Field notes, build logs, and thinking from inside the community.
        </p>

        <div className="mt-16 rounded-2xl border border-border bg-card p-10 text-center md:p-16">
          <p className="font-display text-2xl text-muted md:text-3xl">
            No posts yet — Phase 5 wires up MDX rendering.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted">
            Posts will live in <code className="font-mono">content/blog/</code>{" "}
            and render with full typography styling.
          </p>
        </div>
      </Container>
    </section>
  );
}
