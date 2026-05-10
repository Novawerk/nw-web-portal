"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface Line {
  text: string;
  italic?: boolean;
  accent?: boolean;
}

const lines: Line[] = [
  { text: "Not profitable," },
  { text: "but meaningful.", italic: true, accent: true },
];

const CHAR_STAGGER = 0.022;
const LINE_GAP = 0.08;
const BASE_DELAY = 0.12;
const DURATION = 0.95;

// Long-tail decel — chars launch hard then settle slowly so the size change
// is felt, not glimpsed.
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface CharData {
  char: string;
  delay: number;
}

interface ProcessedLine extends Line {
  chars: CharData[];
}

function processLines(): ProcessedLine[] {
  let running = BASE_DELAY;
  return lines.map((line) => {
    const chars: CharData[] = Array.from(line.text).map((char, i) => ({
      char,
      delay: running + i * CHAR_STAGGER,
    }));
    running += line.text.length * CHAR_STAGGER + LINE_GAP;
    return { ...line, chars };
  });
}

export function AnimatedSlogan() {
  const reduce = useReducedMotion();
  const processed = useMemo(processLines, []);
  const fullText = lines.map((l) => l.text).join(" ");

  return (
    <h1
      className="font-display text-[clamp(3rem,13vw,12rem)] font-black leading-[0.88] tracking-[-0.04em]"
      aria-label={fullText}
    >
      {processed.map((line, lineIdx) => (
        <span
          key={lineIdx}
          aria-hidden
          className="block overflow-hidden pb-[0.12em]"
        >
          <span
            className={
              line.italic
                ? `inline-block italic${line.accent ? " text-accent" : ""}`
                : "inline-block"
            }
          >
            {line.chars.map(({ char, delay }, i) => {
              const isSpace = char === " ";
              return (
                <motion.span
                  key={i}
                  initial={
                    reduce
                      ? { opacity: 0 }
                      : {
                          y: "115%",
                          scale: 1.55,
                          opacity: 0,
                          filter: "blur(8px)",
                        }
                  }
                  animate={
                    reduce
                      ? { opacity: 1 }
                      : {
                          y: 0,
                          scale: 1,
                          opacity: 1,
                          filter: "blur(0px)",
                        }
                  }
                  transition={{
                    duration: reduce ? 0.4 : DURATION,
                    ease: EASE,
                    delay: reduce ? 0 : delay,
                  }}
                  className="inline-block origin-bottom will-change-transform"
                  style={isSpace ? { whiteSpace: "pre" } : undefined}
                >
                  {isSpace ? " " : char}
                </motion.span>
              );
            })}
          </span>
        </span>
      ))}
    </h1>
  );
}
