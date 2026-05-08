"use client";

import { motion, useReducedMotion } from "framer-motion";

const lines = [
  { text: "Not profitable," },
  { text: "but meaningful.", italic: true, accent: true },
];

export function AnimatedSlogan() {
  const reduce = useReducedMotion();
  const variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: "55%" },
    visible: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
  };

  return (
    <h1 className="font-display text-[clamp(2.75rem,9vw,8rem)] leading-[0.95] tracking-tight">
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.05em]">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15 + i * 0.14,
            }}
            className={
              line.italic
                ? `block italic${line.accent ? " text-accent" : ""}`
                : "block"
            }
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
