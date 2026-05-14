"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  tooltip?: string;
}

export function NumbersGrid({
  blogCount,
  buildingCount,
}: {
  blogCount: number;
  buildingCount: number;
}) {
  const stats: Stat[] = [
    {
      value: 2,
      suffix: "?",
      label: "Members",
      tooltip:
        "OK, technically 2 humans — plus ~20 AI agents pulling the night shift. They run on tokens, not coffee.",
    },
    { value: buildingCount, label: "Building" },
    { value: blogCount, label: "Field Notes" },
    { value: 0, label: "Workshops" },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setSeen(true));
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-6 border-t border-background/15 pt-9 md:grid-cols-4"
    >
      {stats.map((s, i) => (
        <CountStat key={s.label} stat={s} active={seen} delay={i * 200} />
      ))}
    </div>
  );
}

function CountStat({
  stat,
  active,
  delay,
}: {
  stat: Stat;
  active: boolean;
  delay: number;
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1500;
    let raf = 0;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t + delay;
      if (t < start) {
        raf = requestAnimationFrame(step);
        return;
      }
      const p = Math.min(1, (t - start) / duration);
      setV(Math.floor(stat.value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, delay, stat.value]);

  return (
    <div className="flex flex-col gap-1">
      <div className="font-display text-[clamp(72px,10vw,160px)] font-bold leading-[0.9] tracking-[-0.05em]">
        {v}
        {stat.suffix && stat.tooltip ? (
          <TooltipSuffix suffix={stat.suffix} tooltip={stat.tooltip} />
        ) : (
          (stat.suffix ?? "")
        )}
      </div>
      <div className="font-mono text-xs uppercase tracking-[0.06em] text-background/65">
        {stat.label}
      </div>
    </div>
  );
}

function TooltipSuffix({
  suffix,
  tooltip,
}: {
  suffix: string;
  tooltip: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block align-top">
      <button
        type="button"
        aria-label="What's the catch?"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        className="cursor-help bg-transparent p-0 italic text-[color:var(--color-yellow)] transition-transform hover:-translate-y-0.5"
        style={{ font: "inherit", lineHeight: "inherit" }}
      >
        {suffix}
      </button>
      <span
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-[min(20rem,70vw)] -translate-x-1/2 rounded-md bg-background px-4 py-3 text-left font-mono text-[12px] normal-case leading-snug tracking-normal text-foreground shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition duration-150 ${
          open
            ? "translate-y-0 opacity-100"
            : "-translate-y-1 opacity-0"
        }`}
      >
        <span className="block text-[10px] uppercase tracking-[0.12em] text-foreground/55">
          Plot twist
        </span>
        <span className="mt-1 block">{tooltip}</span>
      </span>
    </span>
  );
}
