"use client";

import { useEffect, useRef, useState } from "react";

// Two-element cursor: a small dot that tracks tightly, plus a larger ring
// that lags behind. Both use `mix-blend-mode: difference` so they invert
// over light/dark backgrounds. On hover over interactive elements the ring
// inflates and picks up the brand accent.
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    setActive(true);

    const state = { x: -100, y: -100, dx: -100, dy: -100, rx: -100, ry: -100 };

    const onMove = (e: MouseEvent) => {
      state.x = e.clientX;
      state.y = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [role="button"], [data-cursor="hover"]',
      );
      const text = target.closest(
        'input, textarea, [contenteditable], [data-cursor="text"]',
      );
      const ring = ringRef.current;
      if (!ring) return;
      if (text) ring.dataset.state = "text";
      else if (interactive) ring.dataset.state = "hover";
      else ring.dataset.state = "";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    let raf = 0;
    const tick = () => {
      // Dot tracks tightly (lerp 0.55), ring trails behind (lerp 0.18) for
      // a satellite effect.
      state.dx += (state.x - state.dx) * 0.55;
      state.dy += (state.y - state.dy) * 0.55;
      state.rx += (state.x - state.rx) * 0.18;
      state.ry += (state.y - state.ry) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${state.dx}px, ${state.dy}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${state.rx}px, ${state.ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[100] hidden size-[38px] rounded-full border border-[#f1ecdf] mix-blend-difference will-change-transform md:block"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden size-1.5 rounded-full bg-[#f1ecdf] mix-blend-difference will-change-transform md:block"
      />
    </>
  );
}
