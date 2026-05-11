"use client";

import { motion, useReducedMotion } from "framer-motion";

type Segment =
  | { kind: "plain"; text: string }
  | { kind: "italic"; text: string }
  | { kind: "boxed"; text: string }
  | { kind: "underline"; text: string };

// Mirrors `.nw-hero__title.lng-en` in the design: each line is a mix of
// plain Bricolage and one styled segment (italic serif, inverted pill, or
// thick underline). Important: italic only applies to "meaningful" (not
// "ideas"); underline only applies to "change" (not the period).
const LINES: Segment[][] = [
  [{ kind: "plain", text: "Turn" }],
  [
    { kind: "italic", text: "meaningful" },
    { kind: "plain", text: " ideas" },
  ],
  [
    { kind: "plain", text: "into " },
    { kind: "boxed", text: "real" },
  ],
  [
    { kind: "underline", text: "change" },
    { kind: "plain", text: "." },
  ],
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const A11Y_LABEL = LINES.map((line) =>
  line.map((s) => s.text).join(""),
).join(" ");

export function HeroTitle() {
  const reduce = useReducedMotion();

  return (
    <h1
      className="font-display text-[clamp(58px,11.5vw,200px)] font-bold leading-[0.9] tracking-[-0.045em]"
      aria-label={A11Y_LABEL}
    >
      {LINES.map((segments, i) => (
        <span key={i} aria-hidden className="block overflow-hidden pb-[0.06em]">
          <motion.span
            initial={reduce ? { opacity: 0 } : { y: "110%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            transition={{
              duration: reduce ? 0.4 : 0.95,
              ease: EASE,
              delay: reduce ? 0 : 0.12 + i * 0.13,
            }}
            className="inline-block origin-bottom"
          >
            {segments.map((seg, j) => renderSegment(seg, j))}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

function renderSegment(seg: Segment, key: number) {
  switch (seg.kind) {
    case "italic":
      return (
        <em
          key={key}
          className="font-serif font-normal italic text-accent tracking-[-0.02em]"
        >
          {seg.text}
        </em>
      );
    case "boxed":
      return (
        <span
          key={key}
          className="inline-block bg-foreground px-[0.18em] pb-[0.06em] text-background"
          style={{ transform: "skew(-3deg)", borderRadius: "0.06em" }}
        >
          {seg.text}
        </span>
      );
    case "underline":
      // Word stays ink; underline picks up the accent green so it rhymes
      // visually with the italic "meaningful". Native text-decoration
      // avoids the animation wrapper's overflow clip that the design's
      // background-image-on-<u> approach would hit.
      return (
        <span
          key={key}
          className="inline"
          style={{
            textDecoration: "underline",
            textDecorationColor: "var(--color-accent)",
            textDecorationThickness: "8px",
            textUnderlineOffset: "0.04em",
            textDecorationSkipInk: "none",
          }}
        >
          {seg.text}
        </span>
      );
    case "plain":
    default:
      return <span key={key}>{seg.text}</span>;
  }
}
