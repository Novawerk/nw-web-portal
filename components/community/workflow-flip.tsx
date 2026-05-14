"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { NovaStar } from "@/components/icons/nova-star";
import { cn } from "@/lib/utils";

export type WorkflowVariant = "paper" | "accent" | "dark";

export interface Workflow {
  tag: string;
  challenge: string;
  agent: string;
  role: string;
  reads: string;
  writes: string;
  variant?: WorkflowVariant;
  /** Tailwind grid column span at the `md:` breakpoint. */
  span?: string;
}

export function WorkflowFlipList({ workflows }: { workflows: Workflow[] }) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  return (
    <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-6 md:gap-4">
      {workflows.map((w, i) => (
        <Reveal
          as="li"
          key={w.tag}
          delay={i * 0.05}
          className={cn("block", w.span ?? "md:col-span-2")}
        >
          <WorkflowCard
            workflow={w}
            index={i}
            isRevealed={!!revealed[i]}
            onToggle={() =>
              setRevealed((prev) => ({ ...prev, [i]: !prev[i] }))
            }
          />
        </Reveal>
      ))}
    </ul>
  );
}

const VARIANT_STYLES: Record<
  WorkflowVariant,
  {
    bg: string;
    text: string;
    mono: string;
    starFill: string;
    border: string;
    revealHint: string;
  }
> = {
  paper: {
    bg: "bg-paper",
    text: "text-foreground",
    mono: "text-mute",
    starFill: "var(--color-accent)",
    border: "border-foreground",
    revealHint: "text-mute",
  },
  accent: {
    bg: "bg-accent",
    text: "text-background",
    mono: "text-background/70",
    starFill: "var(--color-background)",
    border: "border-accent",
    revealHint: "text-background/70",
  },
  dark: {
    bg: "bg-foreground",
    text: "text-background",
    mono: "text-background/55",
    starFill: "var(--color-accent)",
    border: "border-foreground",
    revealHint: "text-background/55",
  },
};

function WorkflowCard({
  workflow,
  index,
  isRevealed,
  onToggle,
}: {
  workflow: Workflow;
  index: number;
  isRevealed: boolean;
  onToggle: () => void;
}) {
  const variant: WorkflowVariant = workflow.variant ?? "paper";
  const s = VARIANT_STYLES[variant];
  const num = String(index + 1).padStart(2, "0");

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isRevealed}
      aria-label={`Show agent that handles ${workflow.tag}`}
      className={cn(
        "group relative block h-full w-full overflow-hidden border text-left",
        "min-h-[240px] md:min-h-[280px]",
        "transition-colors duration-500",
        s.bg,
        s.text,
        s.border,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
      )}
    >
      {/* Sliding track holds [Challenge | Agent] side-by-side. */}
      <div
        className={cn(
          "flex h-full w-[200%]",
          "transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:duration-150",
          "group-hover:-translate-x-1/2",
          isRevealed && "-translate-x-1/2",
        )}
      >
        {/* Front — challenge */}
        <div className="flex w-1/2 shrink-0 flex-col gap-5 p-6 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <span
              className={cn(
                "font-mono text-[11px] uppercase tracking-[0.12em]",
                s.mono,
              )}
            >
              {num} · {workflow.tag}
            </span>
            <NovaStar
              size={16}
              fill={s.starFill}
              noCore
              className={cn(
                "transition-transform duration-700 group-hover:rotate-90",
                isRevealed && "rotate-90",
              )}
            />
          </div>

          <p
            className={cn(
              "m-0 mt-auto font-display font-medium leading-[1.15] tracking-[-0.02em]",
              "text-[clamp(22px,2.2vw,34px)]",
            )}
          >
            {workflow.challenge}
          </p>

          <div
            className={cn(
              "mt-2 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.12em]",
              s.revealHint,
            )}
          >
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className={cn(
                  "inline-block size-1.5 rounded-full bg-current opacity-70 transition-transform duration-500 group-hover:scale-150",
                  isRevealed && "scale-150",
                )}
              />
              meet the agent
            </span>
            <span
              aria-hidden
              className={cn(
                "transition-transform duration-700 group-hover:translate-x-2",
                isRevealed && "translate-x-2",
              )}
            >
              →
            </span>
          </div>
        </div>

        {/* Back — agent details. Always paper bg + foreground text for legibility. */}
        <div className="flex w-1/2 shrink-0 flex-col gap-3 bg-paper p-6 text-foreground md:p-8">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
              {num} · {workflow.tag} → agent
            </span>
            <span aria-hidden className="font-mono text-[14px] text-accent">
              ✺
            </span>
          </div>

          <h3 className="m-0 font-display text-[clamp(22px,2.4vw,30px)] font-semibold leading-[1.1] tracking-[-0.02em]">
            {workflow.agent}
          </h3>
          <p className="m-0 text-[13px] leading-[1.5] text-foreground/75">
            {workflow.role}
          </p>

          <dl className="mt-auto grid gap-2 border-t border-border pt-3 text-[12.5px] leading-[1.5]">
            <div className="grid grid-cols-[58px_1fr] gap-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-mute">
                Reads
              </dt>
              <dd className="m-0 text-foreground/85">{workflow.reads}</dd>
            </div>
            <div className="grid grid-cols-[58px_1fr] gap-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                Writes
              </dt>
              <dd className="m-0 text-foreground/85">{workflow.writes}</dd>
            </div>
          </dl>

          <div className="mt-1 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-mute">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="inline-block size-1.5 rounded-full bg-accent" />
              human reviews every output
            </span>
            <span aria-hidden className="text-accent">
              ←
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
