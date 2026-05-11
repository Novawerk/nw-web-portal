"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 412, suffix: "+", label: "Members" },
  { value: 27, label: "Building" },
  { value: 14, label: "Shipped" },
  { value: 38, label: "Workshops" },
];

export function NumbersGrid() {
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
        {stat.suffix ?? ""}
      </div>
      <div className="font-mono text-xs uppercase tracking-[0.06em] text-background/65">
        {stat.label}
      </div>
    </div>
  );
}
