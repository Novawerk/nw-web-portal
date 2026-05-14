import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NovaStar } from "@/components/icons/nova-star";
import {
  WorkflowFlipList,
  type Workflow,
} from "@/components/community/workflow-flip";

const PAD_X = "px-7 md:px-12 lg:px-20";

export const metadata = {
  title: "AI-Native Community — Novawerk",
  description:
    "How a non-profit community uses AI agents to run finance, comms, and ops — and which conversations we keep human.",
};

const WORKFLOWS: Workflow[] = [
  {
    tag: "Finance",
    challenge: "Receipts. Reimbursements. Monthly close at 1am.",
    agent: "Finance Agent",
    role: "Bookkeeping & monthly close",
    reads: "Receipts (PDF / photo), bank exports, expense submissions",
    writes:
      "Categorized ledger draft, monthly P&L, anomaly flags for the treasurer",
    variant: "paper",
    span: "md:col-span-3",
  },
  {
    tag: "Member ops",
    challenge: "Four tiers, four chat apps, one mess.",
    agent: "Member Agent",
    role: "Onboarding, role changes, contribution log",
    reads: "Join form submissions, contribution updates, event attendance",
    writes:
      "Member records (Notion), tier-change proposals, contribution log entries",
    variant: "accent",
    span: "md:col-span-3",
  },
  {
    tag: "Comms",
    challenge: "Newsletter. Replies. Recaps. Inbox triage forever.",
    agent: "Comms Agent",
    role: "Drafting newsletters, emails, replies",
    reads: "Project updates, blog drafts, inbound member email",
    writes:
      "Newsletter draft, suggested reply, FAQ updates — always reviewed before send",
    variant: "dark",
    span: "md:col-span-2",
  },
  {
    tag: "Sponsor outreach",
    challenge: "Research. Email. Wait three weeks. Repeat.",
    agent: "Sponsor Agent",
    role: "Outreach drafts & pipeline follow-up",
    reads: "Partner research, past correspondence, public company signals",
    writes: "Outreach drafts, follow-up reminders, pipeline status notes",
    variant: "paper",
    span: "md:col-span-2",
  },
  {
    tag: "Venue scouting",
    challenge: "Capacity, location, price — compared at midnight.",
    agent: "Venue Agent",
    role: "Venue search, comparison, prereqs",
    reads: "Event briefs, city/date, headcount, budget, prior venue notes",
    writes:
      "Shortlist of 3–5 venues with side-by-side comparison & a recommendation",
    variant: "paper",
    span: "md:col-span-2",
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

export default function CommunityPage() {
  return (
    <>
      <Hero />
      <ChallengesToAgents />
      <NeverDelegate />
      <WhyThisWay />
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
              className="absolute left-4 -top-[10px] px-2 font-mono text-[10px] uppercase tracking-[0.1em] text-mute"
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

/* ─── CHALLENGES → AGENTS (FLIP-CARD GRID) ─── */
function ChallengesToAgents() {
  return (
    <section
      className={`${PAD_X}`}
      style={{
        paddingTop: "clamp(80px, 9vw, 160px)",
        paddingBottom: "clamp(80px, 9vw, 160px)",
      }}
    >
      <Reveal>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <Eyebrow>What we&apos;re up against</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(40px,5.4vw,84px)] font-bold leading-[0.95] tracking-[-0.03em]">
              The admin{" "}
              <em className="font-serif font-normal italic text-accent">
                never stops
              </em>
              .
            </h2>
          </div>
          <p className="max-w-[36ch] text-[15px] leading-[1.55] text-foreground/80 md:text-right">
            Five problems that used to eat volunteers&apos; evenings.
            <br />
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
              → Hover or tap a card — meet the agent.
            </span>
          </p>
        </div>
      </Reveal>

      <WorkflowFlipList workflows={WORKFLOWS} />
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

/* ─── WHY THIS WAY ─── */
function WhyThisWay() {
  return (
    <section
      className={`border-t border-border ${PAD_X}`}
      style={{
        paddingTop: "clamp(80px, 9vw, 160px)",
        paddingBottom: "clamp(80px, 9vw, 160px)",
      }}
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <Eyebrow>The reason</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(36px,4.8vw,72px)] font-bold leading-[0.95] tracking-[-0.03em]">
              Why we built it{" "}
              <em className="font-serif font-normal italic text-accent">
                this way
              </em>
              .
            </h2>
            <p className="mt-5 max-w-[34ch] font-mono text-[12px] uppercase leading-[1.7] tracking-[0.06em] text-mute">
              ↳ The argument for letting agents in — and the line we won&apos;t
              cross.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-6 text-[17px] leading-[1.7] text-foreground/85 md:text-[18px]">
            <p className="m-0">
              Non-profits live in a bind. The mission demands a small-company
              workload — accounting, comms, partnerships, member ops — but the
              budget is zero, the staff is volunteer, and the cost of asking
              someone to spend their evening formatting expense reports is{" "}
              <em className="font-serif italic text-accent">
                real human burnout
              </em>
              .
            </p>

            <p className="m-0">
              The traditional answer is to do less. Run fewer events. Reply
              slower. Skip the partner outreach. Let the newsletter slip. We
              have watched good communities die this way — not from a lack of
              passion, but from the quiet attrition of people who joined to
              build things and ended up doing inbox triage for a year.
            </p>

            <p className="m-0">
              We think there is a third option now. Most of the admin load —
              the part that is repetitive, structured, and rule-following — can
              be drafted by an agent. The judgment, the relationships, the
              actual decisions stay with members. The same volunteer who used
              to spend three hours on reimbursements now spends fifteen minutes
              reviewing an agent&apos;s draft, and{" "}
              <em className="font-serif italic text-accent">
                gets the other two hours back
              </em>{" "}
              — to talk to a new member, ship a project, or just rest.
            </p>

            <figure
              className="m-0 border-l-2 border-accent pl-6 py-2"
              style={{ background: "transparent" }}
            >
              <blockquote className="m-0 font-serif text-[clamp(22px,2.4vw,30px)] italic leading-[1.35] text-foreground">
                The agents are interns who never sleep and never get bored.
                We&apos;re the ones who decide what they&apos;re allowed to
                ship.
              </blockquote>
            </figure>

            <p className="m-0">
              This isn&apos;t about pretending humans aren&apos;t there. Every
              agent output crosses a human checkpoint before it leaves the
              building. The drafts are cheap; the review is the work. If an
              agent draft would embarrass us in front of a member, it
              doesn&apos;t go out — and the next prompt gets tightened.
            </p>

            <p className="m-0">
              What we are trying to find out is exactly where the line goes.
              There is a healthy version of this where the org runs leaner,
              members spend more time on what they came for, and nobody loses
              the connection to how decisions get made. There is also a bad
              version where automation makes the relationship thinner and the
              community becomes a brand instead of a place.{" "}
              <em className="font-serif italic text-accent">
                We are betting we can find the first one.
              </em>{" "}
              This page is the public record of how we are trying.
            </p>
          </div>
        </Reveal>
      </div>
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
