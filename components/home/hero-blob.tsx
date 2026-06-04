"use client";

import { useEffect, useRef, useState } from "react";

export function HeroBlob() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 35 });

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setPos({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        });
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute -inset-[10%] -z-10 blur-[40px] transition-[background] duration-300"
      style={{
        background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, color-mix(in srgb, var(--color-accent) 28%, transparent), transparent 55%)`,
      }}
    />
  );
}
