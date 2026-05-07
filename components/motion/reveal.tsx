"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "li";
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });
  const reduce = useReducedMotion();

  const Component = motion[as];
  const initial = reduce ? { opacity: 0 } : { opacity: 0, y };
  const animate = inView
    ? reduce
      ? { opacity: 1 }
      : { opacity: 1, y: 0 }
    : initial;

  return (
    <Component
      ref={ref as never}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
