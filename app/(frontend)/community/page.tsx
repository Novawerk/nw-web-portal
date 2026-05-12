import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NovaStar } from "@/components/icons/nova-star";

const PAD_X = "px-7 md:px-12 lg:px-20";

export const metadata = {
  title: "AI-Native Community — Novawerk",
  description:
    "How a non-profit community uses AI agents to run finance, comms, and ops — and which conversations we keep human.",
};

const CHALLENGES = [
  {
    tag: "Finance",
    text: "Receipts, reimbursements, monthly close. The boring stuff that quietly eats a weekend every month.",
  },
  {
    tag: "Member ops",
    text: "Onboarding, role changes, contribution tracking across four membership tiers and four chat platforms.",
  },
  {
    tag: "Comms",
    text: "Newsletter drafts, email replies, event recaps. Volunteers burn out on inbox triage before they get to do the actual work.",
  },
  {
    tag: "Sponsor outreach",
    text: "Researching the right contact, writing the first email, following up three weeks later. Multiplied by every partner pipeline.",
  },
  {
    tag: "Venue scouting",
    text: "Capacity, location, price, A/V, vibe. Comparing six options on a spreadsheet at midnight.",
  },
];

const AGENTS = [
  {
    name: "Finance Agent",
    role: "Bookkeeping & monthly close",
    reads: "Receipts (PDF / photo), bank exports, expense submissions",
    writes: "Categorized ledger draft, monthly P&L, anomaly flags for the treasurer",
  },
  {
    name: "Member Agent",
    role: "Onboarding, role changes, contribution log",
    reads: "Join form submissions, contribution updates, event attendance",
    writes: "Member records (Notion), tier-change proposals, contribution log entries",
  },
  {
    name: "Comms Agent",
    role: "Drafting newsletters, emails, replies",
    reads: "Project updates, blog drafts, inbound member email",
    writes: "Newsletter draft, suggested reply, FAQ updates — always reviewed before send",
  },
  {
    name: "Sponsor Agent",
    role: "Outreach drafts & pipeline follow-up",
    reads: "Partner research, past correspondence, public company signals",
    writes: "Outreach drafts, follow-up reminders, pipeline status notes",
  },
  {
    name: "Venue Agent",
    role: "Venue search, comparison, prereqs",
    reads: "Event briefs, city/date, headcount, budget, prior venue notes",
    writes: "Shortlist of 3–5 venues with side-by-side comparison & a recommendation",
  },
];

const NEVER = [
  {
    title: "Member feedback & project critique",
    body: "Every piece of feedback from a member is read by a human. No summarization, no auto-tagging, no AI in the loop.",
  },
  {
    title: "1-on-1s and conflict resolution",
    body: "Hard conversations are the work. Outsourcing them to an agent would be outsourcing the relationship itself.",
  },
  {
    title: "Decisions about specific people",
    body: "Tier promotions, role assignments, anything that touches a member's standing in the community — humans only.",
  },
  {
    title: "Judging pledge violations",
    body: "The pledge is the social contract. Calling someone in on it is something only a member can do, to another member.",
  },
  {
    title: "Creative direction reviews",
    body: "When a project decides what it is and isn't, that's a conversation between humans who care. AI doesn't get a vote there.",
  },
];

const WEEK = [
  {
    when: "Mon",
    who: "Member Agent",
    body: "Syncs last week's new members into Notion, flags anyone overdue for a welcome touchpoint.",
  },
  {
    when: "Tue",
    who: "Finance Agent",
    body: "Pulls bank exports, drafts category labels for incoming expenses. Treasurer skims and approves.",
  },
  {
    when: "Wed",
    who: "Comms Agent",
    body: "Drafts the weekly newsletter from project updates. Editor reviews, edits, sends Thursday morning.",
  },
  {
    when: "Thu",
    who: "Sponsor Agent",
    body: "Surfaces follow-ups due this week. Partner lead writes the actual replies — agent does the prep, not the persuasion.",
  },
  {
    when: "Fri",
    who: "Venue Agent",
    body: "If there's an upcoming event, returns a shortlist with notes. Organizer picks, books, and tells the agent what worked.",
  },
];

export default function CommunityPage() {
  return (
    <>
      <Hero />
      <Challenges />
      <AgentStack />
      <NeverDelegate />
      <HowItRuns />
      <ClosingCTA />
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

      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-[60px]">
        <Reveal>
          <Eyebrow letter="D">AI-Native Community</Eyebrow>
          <h1 className="mt-4 font-display text-[clamp(48px,8.5vw,140px)] font-bold leading-[0.9] tracking-[-0.045em]">
            We let{" "}
            <em className="font-serif font-normal italic text-accent">
              agents
            </em>
            <br />
            run the back office.
            <br />
            Humans run the{" "}
            <em className="font-serif font-normal italic text-accent">
              conversation
            </em>
            .
          </h1>
          <p className="mt-7 max-w-[52ch] text-[17px] leading-[1.65] text-foreground/85">
            A non-profit community has the same admin load as a small company,
            with none of the budget. So we automate the parts that can be
            automated — and put every minute we save into the parts that
            can&apos;t.
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
              ↳ Principle
            </span>
            <p className="m-0 mb-2">
              · Agents handle <strong>what</strong> the org does.
            </p>
            <p className="m-0 mb-2">
              · Members decide <strong>why</strong>, and <strong>for whom</strong>.
            </p>
            <p className="m-0 mb-2">
              · Every agent output gets a human checkpoint before it leaves the
              building.
            </p>
            <p className="m-0">
              · If automation makes the relationship thinner, we don&apos;t ship
              it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── CHALLENGES ─── */
function Challenges() {
  return (
    <section
      className={`${PAD_X}`}
      style={{
        paddingTop: "clamp(80px, 9vw, 160px)",
        paddingBottom: "clamp(80px, 9vw, 160px)",
      }}
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <Reveal>
          <Eyebrow>What we&apos;re up against</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,4vw,56px)] font-bold leading-none tracking-[-0.03em]">
            The admin
            <br />
            <em className="font-serif font-normal italic text-accent">
              never stops
            </em>
            .
          </h2>
          <p className="mt-4 max-w-[36ch] text-sm leading-[1.6] text-foreground/80">
            Five categories of recurring work that used to eat a volunteer&apos;s
            evening. We mapped each one to an agent — not to replace the human,
            but to take the first 80% off the human&apos;s plate.
          </p>
        </Reveal>

        <ul className="m-0 list-none border-t border-foreground p-0">
          {CHALLENGES.map((c, i) => (
            <Reveal as="li" key={c.tag} delay={i * 0.04}>
              <div className="grid grid-cols-[110px_1fr] items-start gap-5 border-b border-border py-6 transition-[padding] hover:pl-3 md:grid-cols-[160px_1fr] md:gap-8 md:py-7">
                <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                  {c.tag}
                </div>
                <p className="m-0 text-[15px] leading-[1.6] text-foreground/85 md:text-base">
                  {c.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── AGENT STACK ─── */
function AgentStack() {
  return (
    <section
      className={`border-t border-border ${PAD_X}`}
      style={{
        background: "var(--color-paper)",
        paddingTop: "clamp(80px, 9vw, 160px)",
        paddingBottom: "clamp(80px, 9vw, 160px)",
      }}
    >
      <Reveal>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>The stack</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(36px,4.5vw,64px)] font-bold leading-[0.95] tracking-[-0.03em]">
              How the{" "}
              <em className="font-serif font-normal italic text-accent">
                agents
              </em>
              <br />
              work together.
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            5 agents · 1 reviewer per agent
          </span>
        </div>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {AGENTS.map((a, i) => (
          <Reveal key={a.name} delay={i * 0.05}>
            <div className="flex h-full flex-col gap-4 border border-foreground bg-background p-6 md:p-8">
              <div className="flex items-start justify-between gap-3">
                <h3 className="m-0 font-display text-[26px] font-semibold leading-tight tracking-[-0.02em]">
                  {a.name}
                </h3>
                <NovaStar size={18} fill="var(--color-accent)" />
              </div>
              <p className="m-0 text-[15px] leading-[1.55] text-foreground/85">
                {a.role}
              </p>
              <dl className="mt-2 grid gap-2 border-t border-border pt-4 text-[13px] leading-[1.5]">
                <div className="grid grid-cols-[64px_1fr] gap-2">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                    Reads
                  </dt>
                  <dd className="m-0 text-foreground/80">{a.reads}</dd>
                </div>
                <div className="grid grid-cols-[64px_1fr] gap-2">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                    Writes
                  </dt>
                  <dd className="m-0 text-foreground/80">{a.writes}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── NEVER DELEGATE ─── */
function NeverDelegate() {
  return (
    <section
      className={`${PAD_X}`}
      style={{
        background: "var(--color-foreground)",
        color: "var(--color-background)",
        paddingTop: "clamp(80px, 9vw, 160px)",
        paddingBottom: "clamp(80px, 9vw, 160px)",
      }}
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <Reveal>
          <Eyebrow tone="dark">What stays human</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(36px,4.8vw,72px)] font-bold leading-[0.95] tracking-[-0.03em] text-background">
            Things we&apos;ll{" "}
            <em className="font-serif font-normal italic text-accent">
              never
            </em>
            <br />
            hand to an agent.
          </h2>
          <p className="mt-5 max-w-[38ch] text-[15px] leading-[1.6] text-background/75">
            The agents free up our time so we can spend it here. If a process
            shows up on this list, it doesn&apos;t matter how repetitive it
            looks — a real person reads, replies, decides.
          </p>
        </Reveal>

        <ul className="m-0 list-none border-t border-background/20 p-0">
          {NEVER.map((n, i) => (
            <Reveal as="li" key={n.title} delay={i * 0.04}>
              <div className="grid grid-cols-1 items-start gap-3 border-b border-background/20 py-7 md:grid-cols-[280px_1fr] md:gap-8">
                <h3 className="m-0 font-display text-[20px] font-semibold tracking-[-0.01em] text-background">
                  {n.title}
                </h3>
                <p className="m-0 text-[15px] leading-[1.6] text-background/75">
                  {n.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── HOW IT RUNS ─── */
function HowItRuns() {
  return (
    <section
      className={`border-t border-border ${PAD_X}`}
      style={{
        paddingTop: "clamp(80px, 9vw, 160px)",
        paddingBottom: "clamp(80px, 9vw, 160px)",
      }}
    >
      <Reveal>
        <div className="mb-10 max-w-[60ch]">
          <Eyebrow>A typical week</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,4vw,56px)] font-bold leading-none tracking-[-0.03em]">
            What it{" "}
            <em className="font-serif font-normal italic text-accent">
              actually
            </em>{" "}
            looks like.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-foreground/80">
            Agents propose, humans approve. The org runs on a steady drumbeat of
            drafts followed by 10-minute reviews — instead of evenings spent
            doing the drafting from scratch.
          </p>
        </div>
      </Reveal>

      <ul className="m-0 list-none border-t border-foreground p-0">
        {WEEK.map((d, i) => (
          <Reveal as="li" key={d.when} delay={i * 0.04}>
            <div className="grid grid-cols-[70px_1fr] items-start gap-5 border-b border-border py-6 md:grid-cols-[80px_220px_1fr] md:items-center md:gap-8 md:py-7">
              <div className="font-display text-[28px] font-bold leading-none tracking-[-0.02em]">
                {d.when}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                {d.who}
              </div>
              <p className="col-span-2 m-0 text-[15px] leading-[1.55] text-foreground/85 md:col-span-1">
                {d.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ─── CLOSING CTA ─── */
function ClosingCTA() {
  return (
    <section
      className={`border-t border-border ${PAD_X}`}
      style={{
        paddingTop: "clamp(80px, 9vw, 160px)",
        paddingBottom: "clamp(80px, 9vw, 160px)",
      }}
    >
      <Reveal>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-16">
          <div>
            <Eyebrow>Want in?</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(40px,6vw,88px)] font-bold leading-[0.95] tracking-[-0.03em]">
              Help us figure out where{" "}
              <em className="font-serif font-normal italic text-accent">
                the line
              </em>{" "}
              should go.
            </h2>
            <p className="mt-5 max-w-[48ch] text-[15px] leading-[1.6] text-foreground/80">
              Every new project teaches us something about what to automate and
              what to keep slow and human. Join the community — bring an
              opinion.
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5">
            <Link
              href="#join"
              className="inline-flex items-center gap-2.5 rounded-full bg-accent px-[22px] py-3.5 font-mono text-[13px] uppercase tracking-[0.04em] text-background transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-foreground"
            >
              Join the community
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 rounded-full border border-foreground bg-transparent px-[22px] py-3.5 font-mono text-[13px] uppercase tracking-[0.04em] text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Read the manifesto
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
