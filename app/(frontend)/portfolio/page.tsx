import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { getAllPortfolioItems } from "@/lib/portfolio";
import { fallbackPortfolioItems } from "@/lib/portfolio-fallback";

const PAD_X = "px-7 md:px-12 lg:px-20";

export const metadata = {
  title: "Portfolio — Novawerk",
  description:
    "What's happening at Novawerk right now. Not a showcase — a worksite. Every entry is still being improved.",
};

// Revalidate every 5 minutes so CMS edits show up without a redeploy.
export const revalidate = 300;

export default async function PortfolioPage() {
  // Fall back to the real-seed mirror when the CMS is unreachable so local
  // dev without a DB still shows what production users see.
  const result = await Promise.allSettled([getAllPortfolioItems()]);
  const cmsProjects =
    result[0].status === "fulfilled" ? result[0].value : [];
  const projects =
    cmsProjects.length > 0 ? cmsProjects : fallbackPortfolioItems;

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
          <Eyebrow letter="B">Portfolio · Project Index</Eyebrow>
          <h1 className="mt-4 font-display text-[clamp(56px,10vw,168px)] font-bold leading-[0.92] tracking-[-0.045em]">
            What&apos;s
            <br />
            <em className="font-serif font-normal italic text-accent">
              happening
            </em>
            .
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="m-0 max-w-[44ch] text-base leading-[1.6] text-foreground/85">
            Every project starts as one ordinary person&apos;s &ldquo;what
            if&rdquo;. Then a group catches it, breaks it down, and pushes it
            to the next step. This isn&apos;t a showcase — it&apos;s a
            worksite. Every entry is still being improved.
          </p>
        </Reveal>
      </section>

      {projects.length > 0 ? (
        <PortfolioGrid projects={projects} />
      ) : (
        <section
          className={PAD_X}
          style={{
            paddingTop: "clamp(80px, 9vw, 160px)",
            paddingBottom: "clamp(80px, 9vw, 160px)",
          }}
        >
          <Reveal>
            <p className="max-w-[44ch] font-display text-[clamp(28px,3vw,40px)] font-medium leading-[1.18] tracking-[-0.02em] text-foreground/70">
              The first projects are being scoped right now. Come back soon —
              or{" "}
              <Link href="/community" className="link-underline text-accent">
                bring an idea yourself
              </Link>
              .
            </p>
          </Reveal>
        </section>
      )}

      <section
        className={PAD_X}
        style={{
          paddingTop: 40,
          paddingBottom: "clamp(80px, 9vw, 160px)",
        }}
      >
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-md border border-dashed border-[var(--color-border-strong)] p-8 md:p-10">
            <div>
              <Eyebrow>Still in your head?</Eyebrow>
              <p className="mt-3 max-w-[40ch] font-display text-[clamp(24px,2.4vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em]">
                Put your &ldquo;what if&rdquo;{" "}
                <em className="font-serif font-normal italic text-accent">
                  on this list
                </em>
                .
              </p>
            </div>
            <Link
              href="/community"
              className="inline-flex items-center gap-2.5 rounded-full bg-accent px-[22px] py-3.5 font-mono text-[13px] uppercase tracking-[0.04em] text-background transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-foreground"
            >
              Submit an idea
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
