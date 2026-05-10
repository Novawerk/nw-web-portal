import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NovaStar } from "@/components/icons/nova-star";
import { ContactForm } from "@/components/forms/contact-form";

const PAD_X = "px-7 md:px-12 lg:px-20";

export const metadata = {
  title: "Join Us — NovaWerk",
  description:
    "Indifference is the only failure. Join NovaWerk to validate ideas, build with collaborators, and ship things that matter.",
};

const PLEDGE = [
  "I'll show up with something concrete, not just an idea.",
  "I'll let others see my progress — and look at theirs.",
  "I'll value what got done over what got said.",
  "I accept failure. I refuse indifference.",
];

const PATHS = [
  {
    num: "I",
    tag: "Path 01 · Initiator",
    title: "Bring an idea",
    body: "You've got something you want to make. We help you sharpen it until it's clear, discussable, and ready to start. Within two weeks: a validation checklist and your first collaborators.",
  },
  {
    num: "II",
    tag: "Path 02 · Builder",
    title: "Join a project",
    body: "Browse the portfolio, pick a direction that resonates. Lightweight is fine — 4 hours a week, half a year of motion.",
  },
  {
    num: "III",
    tag: "Path 03 · Supporter",
    title: "Just look around",
    body: "Subscribe to the newsletter, or come to a monthly open day. Watch for a while, then decide.",
  },
];

const UPCOMING = [
  {
    date: "05 / 18",
    weekday: "Sun",
    cat: "Open House",
    title: "May open day · short demos from every active project",
  },
  {
    date: "05 / 24",
    weekday: "Sat",
    cat: "Workshop",
    title: 'Workshop · turn "I want to make X" into a weekly plan',
  },
  {
    date: "06 / 14",
    weekday: "Sat",
    cat: "Online",
    title: "Online AMA · launching a non-profit without burning cash",
  },
];

export default function CommunityPage() {
  return (
    <>
      <Hero />
      <Paths />
      <FormSection />
      <Events />
    </>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section
      className={`relative isolate overflow-hidden border-b border-border ${PAD_X}`}
      style={{
        paddingTop: "clamp(60px, 8vw, 120px)",
        paddingBottom: "clamp(48px, 6vw, 96px)",
        background:
          "radial-gradient(ellipse at top right, color-mix(in srgb, var(--color-accent) 22%, transparent) 0%, transparent 55%), var(--color-background)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-16 z-[-1] opacity-25"
      >
        <NovaStar size={360} fill="var(--color-accent)" spin />
      </div>

      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-[60px]">
        <Reveal>
          <Eyebrow letter="D">Join Us</Eyebrow>
          <h1 className="mt-4 font-display text-[clamp(56px,10vw,168px)] font-bold leading-[0.9] tracking-[-0.045em]">
            <em className="font-serif font-normal italic text-accent">
              Indifference
            </em>
            <br />
            is the only
            <br />
            failure.
          </h1>
          <p className="mt-7 max-w-[44ch] text-[17px] leading-[1.65] text-foreground/85">
            You don&apos;t have to wait until you&apos;re ready. You don&apos;t
            have to stockpile contacts, skills, time, or courage first. You
            only have to decide to start — and from that moment, this thing is
            already different.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative border border-foreground p-7 text-sm leading-[1.7]"
            style={{ background: "var(--color-paper)" }}
          >
            <span
              className="absolute left-4 -top-[10px] px-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
              style={{ background: "var(--color-background)" }}
            >
              ↳ Pledge
            </span>
            {PLEDGE.map((line) => (
              <p key={line} className="m-0 mb-2 last:mb-0">
                · {line}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── PATHS ─── */
function Paths() {
  return (
    <section
      className={`grid gap-12 ${PAD_X}`}
      style={{
        paddingTop: "clamp(80px, 9vw, 160px)",
        paddingBottom: "clamp(80px, 9vw, 160px)",
        gridTemplateColumns: "minmax(0, 1fr)",
      }}
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Three ways in</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,4vw,56px)] font-bold leading-none tracking-[-0.03em]">
            Pick the path
            <br />
            <em className="font-serif font-normal italic text-accent">
              that fits you
            </em>
            .
          </h2>
        </Reveal>

        <ul className="m-0 list-none border-t border-foreground p-0">
          {PATHS.map((p, i) => (
            <Reveal as="li" key={p.num} delay={i * 0.05}>
              <div className="grid grid-cols-[40px_1fr] items-start gap-5 border-b border-border px-1 py-7 transition-[padding] hover:pl-4 sm:grid-cols-[50px_180px_1fr_auto] sm:items-center sm:gap-6">
                <div className="font-serif text-3xl italic leading-none text-accent">
                  {p.num}
                </div>
                <div className="col-span-1">
                  <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                    {p.tag}
                  </div>
                  <div className="mt-1.5 font-display text-2xl font-semibold tracking-[-0.02em]">
                    {p.title}
                  </div>
                </div>
                <p className="col-span-2 m-0 text-sm leading-[1.6] text-foreground/80 sm:col-span-1">
                  {p.body}
                </p>
                <span className="hidden font-mono text-[12px] uppercase tracking-[0.08em] text-muted sm:inline">
                  Pick this →
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── FORM ─── */
function FormSection() {
  return (
    <section
      id="contact"
      className={`scroll-mt-24 border-t border-border ${PAD_X}`}
      style={{
        background: "var(--color-paper)",
        paddingTop: "clamp(80px, 9vw, 160px)",
        paddingBottom: "clamp(80px, 9vw, 160px)",
      }}
    >
      <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:items-start md:gap-[60px]">
        <Reveal>
          <div className="md:sticky md:top-28">
            <Eyebrow>A short intro</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(32px,4vw,56px)] font-bold leading-none tracking-[-0.03em]">
              Two minutes,
              <br />
              <em className="font-serif font-normal italic text-accent">
                tops
              </em>
              .
            </h2>
            <p className="mt-4 max-w-[30ch] text-sm leading-[1.6] text-foreground/85">
              We read every submission and usually reply within a few days. The
              more specific you are, the easier it is to match you with
              collaborators.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

/* ─── EVENTS ─── */
function Events() {
  return (
    <section
      className={`border-t border-border ${PAD_X}`}
      style={{
        paddingTop: "clamp(80px, 9vw, 160px)",
        paddingBottom: "clamp(48px, 6vw, 96px)",
      }}
    >
      <Reveal>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Want to look first?</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(32px,4vw,56px)] font-bold leading-none tracking-[-0.03em]">
              Upcoming{" "}
              <em className="font-serif font-normal italic text-accent">
                events
              </em>
              <span className="text-foreground/60"> · in-person / online</span>
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            Open day every 3rd Sunday
          </span>
        </div>
      </Reveal>

      <ul className="m-0 list-none border-t border-foreground p-0">
        {UPCOMING.map((e, i) => (
          <Reveal as="li" key={e.title} delay={i * 0.05}>
            <div className="grid grid-cols-[80px_1fr] items-center gap-4 border-b border-border py-6 sm:grid-cols-[100px_130px_1fr_120px] sm:gap-6">
              <div className="font-display text-[32px] font-bold leading-none tracking-[-0.02em]">
                {e.date}
                <small className="mt-1 block font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-muted">
                  {e.weekday}
                </small>
              </div>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.08em] text-accent sm:inline">
                {e.cat}
              </span>
              <span className="font-display text-lg font-semibold tracking-[-0.02em]">
                {e.title}
              </span>
              <span className="hidden text-right font-mono text-[11px] uppercase tracking-[0.08em] text-foreground sm:inline">
                RSVP →
              </span>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

