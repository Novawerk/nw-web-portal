"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { ContactForm } from "@/components/forms/contact-form";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NovaStar } from "@/components/icons/nova-star";
import { cn } from "@/lib/utils";

const PLEDGE = [
  "I'll show up with something concrete, not just an idea.",
  "I'll let others see my progress — and look at theirs.",
  "I'll value what got done over what got said.",
  "I accept failure. I refuse indifference.",
];

const ROLES = [
  {
    num: "I",
    name: "Werker",
    tier: "General audience",
    body: "Join the community, subscribe to the newsletter, and get priority access to upcoming events. Bring the everyday problems you wish someone would fix.",
  },
  {
    num: "II",
    name: "Ambassador",
    tier: "Core contributor",
    body: "Collect signals from the wider world and surface them. Pitch the problems worth solving — and the people we should hear from.",
  },
  {
    num: "III",
    name: "Architect",
    tier: "Core member",
    body: "Help shape how the community runs. Service work, build work, governance. Contributions and milestones are logged so the work doesn't disappear.",
  },
  {
    num: "IV",
    name: "Partner",
    tier: "Strategic partner",
    body: "Brands and orgs co-hosting events, providing space, listed in the annual report and media coverage. Long-term alignment, not sponsor logos in a footer.",
  },
];

const TRANSITION_OPEN = {
  type: "spring" as const,
  damping: 32,
  stiffness: 320,
  mass: 0.9,
};
const TRANSITION_CLOSE = { duration: 0.25, ease: [0.4, 0, 1, 1] as const };

export function JoinSheet() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const titleId = useId();
  const triggerRef = useRef<HTMLElement | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync state with URL hash on mount and whenever path or hash changes.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sync = () => {
      const shouldOpen = window.location.hash === "#join";
      setOpen((prev) => {
        if (shouldOpen && !prev) {
          triggerRef.current =
            document.activeElement instanceof HTMLElement
              ? document.activeElement
              : null;
        }
        return shouldOpen;
      });
    };

    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, [pathname]);

  // Delegate clicks on `#join` anchors so Next.js <Link> (which uses pushState
  // and skips `hashchange`) still opens the sheet. We attach in the capture
  // phase so we always run regardless of what other handlers do.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
        return;
      const target = e.target instanceof Element ? e.target.closest("a") : null;
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;
      if (href !== "#join" && !href.endsWith("#join")) return;
      e.preventDefault();
      e.stopPropagation();
      triggerRef.current = target as HTMLElement;
      if (window.location.hash !== "#join") {
        const next =
          window.location.pathname + window.location.search + "#join";
        window.history.pushState(null, "", next);
      }
      setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const close = useCallback(() => {
    if (typeof window !== "undefined" && window.location.hash === "#join") {
      const url = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", url);
    }
    setOpen(false);
    // Restore focus to whatever triggered the modal.
    requestAnimationFrame(() => {
      triggerRef.current?.focus?.();
    });
  }, []);

  // ESC to close + scroll lock + focus management.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "Tab") {
        // Simple focus trap: cycle within sheet.
        const root = sheetRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const prevOverflow = document.body.style.overflow;
    const prevPadRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    window.addEventListener("keydown", onKey);

    // Focus the close button after the slide-in completes.
    const focusTimer = window.setTimeout(() => {
      const root = sheetRef.current;
      const closeBtn = root?.querySelector<HTMLElement>("[data-sheet-close]");
      closeBtn?.focus();
    }, 80);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadRight;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, close]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden={false}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 bg-black/45 backdrop-blur-[6px]"
          />

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={cn(
              "relative flex w-full flex-col overflow-hidden bg-background shadow-[0_-12px_50px_rgba(0,0,0,0.25)]",
              "h-[100dvh] md:h-[92vh] md:max-w-[1180px] md:rounded-t-3xl",
              "border border-border md:border-t md:border-x",
            )}
            initial={reduce ? { opacity: 0 } : { y: "100%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: "100%" }}
            transition={reduce ? { duration: 0.2 } : TRANSITION_OPEN}
          >
            <SheetHeader onClose={close} />
            <div
              className="flex-1 overflow-y-auto overscroll-contain"
              data-lenis-prevent
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <HeroSection titleId={titleId} />
              <RolesSection />
              <FormSection />
              <Closer />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function SheetHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-5 py-3 backdrop-blur md:px-8 md:py-4">
      <div className="flex items-center gap-3">
        <span className="hidden h-1 w-10 rounded-full bg-foreground/20 md:inline-block" />
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
          <NovaStar size={14} fill="var(--color-accent)" />
          Join Novawerk
        </span>
      </div>
      <button
        type="button"
        onClick={onClose}
        data-sheet-close
        aria-label="Close join panel"
        className="-mr-2 inline-flex size-10 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-foreground hover:text-background"
      >
        <X className="size-5" strokeWidth={1.5} />
      </button>
    </div>
  );
}

function HeroSection({ titleId }: { titleId: string }) {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-border px-6 pt-10 pb-12 md:px-12 md:pt-14 md:pb-16 lg:px-16"
      style={{
        background:
          "radial-gradient(ellipse at top right, color-mix(in srgb, var(--color-accent) 22%, transparent) 0%, transparent 55%), var(--color-background)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-16 z-[-1] opacity-20"
      >
        <NovaStar size={280} fill="var(--color-accent)" spin />
      </div>

      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12">
        <div>
          <Eyebrow letter="D">Join Us</Eyebrow>
          <h2
            id={titleId}
            className="mt-4 font-display text-[clamp(40px,7.5vw,96px)] font-bold leading-[0.92] tracking-[-0.04em]"
          >
            <em className="font-serif font-normal italic text-accent">
              Indifference
            </em>
            <br />
            is the only
            <br />
            failure.
          </h2>
          <p className="mt-6 max-w-[44ch] text-[16px] leading-[1.65] text-foreground/85">
            You don&apos;t have to wait until you&apos;re ready. You don&apos;t
            have to stockpile contacts, skills, time, or courage first. You only
            have to decide to start — and from that moment, this thing is already
            different.
          </p>
        </div>

        <div
          className="relative border border-foreground p-6 text-sm leading-[1.7] md:p-7"
          style={{ background: "var(--color-paper)" }}
        >
          <span
            className="absolute left-4 -top-[10px] px-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
            style={{ background: "var(--color-background)" }}
          >
            ↳ Pledge
          </span>
          {PLEDGE.map((line) => (
            <p key={line} className="m-0 mb-2 last:mb-0">
              · {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function RolesSection() {
  return (
    <section className="border-b border-border px-6 py-14 md:px-12 md:py-20 lg:px-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <Eyebrow>Four ways to belong</Eyebrow>
          <h3 className="mt-4 font-display text-[clamp(28px,4vw,48px)] font-bold leading-none tracking-[-0.03em]">
            Pick the layer
            <br />
            <em className="font-serif font-normal italic text-accent">
              that fits you
            </em>
            .
          </h3>
          <p className="mt-4 max-w-[36ch] text-sm leading-[1.6] text-foreground/80">
            Werker → Ambassador → Architect → Partner. You can move between
            layers freely — most people start at the top of the list and migrate
            inward when something pulls them in.
          </p>
        </div>

        <ul className="m-0 list-none border-t border-foreground p-0">
          {ROLES.map((r) => (
            <li
              key={r.name}
              className="grid grid-cols-[40px_1fr] items-start gap-4 border-b border-border px-1 py-6 transition-[padding] hover:pl-3 sm:grid-cols-[50px_160px_1fr] sm:gap-6 sm:py-7"
            >
              <div className="font-serif text-3xl italic leading-none text-accent">
                {r.num}
              </div>
              <div className="col-span-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                  {r.tier}
                </div>
                <div className="mt-1.5 font-display text-2xl font-semibold tracking-[-0.02em]">
                  {r.name}
                </div>
              </div>
              <p className="col-span-2 m-0 text-sm leading-[1.6] text-foreground/80 sm:col-span-1">
                {r.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FormSection() {
  return (
    <section
      className="px-6 py-14 md:px-12 md:py-20 lg:px-16"
      style={{ background: "var(--color-paper)" }}
    >
      <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-12">
        <div>
          <Eyebrow>A short intro</Eyebrow>
          <h3 className="mt-4 font-display text-[clamp(28px,4vw,48px)] font-bold leading-none tracking-[-0.03em]">
            Two minutes,
            <br />
            <em className="font-serif font-normal italic text-accent">
              tops
            </em>
            .
          </h3>
          <p className="mt-4 max-w-[32ch] text-sm leading-[1.6] text-foreground/80">
            We read every submission and usually reply within a few days. The
            more specific you are, the easier it is to match you with
            collaborators.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function Closer() {
  return (
    <div className="px-6 py-10 text-center md:px-12 md:py-14">
      <p className="mx-auto max-w-[40ch] font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
        Not ready? Just lurk on the newsletter — we&apos;ll knock on the door
        again next month.
      </p>
    </div>
  );
}
