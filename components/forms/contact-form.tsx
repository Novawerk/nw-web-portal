"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import {
  contactSubmissionSchema,
  interestOptions,
  type ContactSubmission,
} from "@/lib/schemas";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full border-b border-foreground bg-transparent py-2.5 font-display text-xl font-medium tracking-[-0.01em] text-foreground placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors";
const labelClass =
  "flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-muted";
const stepClass = "text-accent";
const errorClass = "mt-2 font-mono text-[11px] text-accent";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactSubmission>({
    resolver: zodResolver(contactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      motivation: "",
      interests: [],
      links: "",
      website: "",
    },
  });

  const onSubmit = async (data: ContactSubmission) => {
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body.error ?? "Something went wrong. Try again?");
        setStatus("error");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setErrorMsg("Network error — please try again.");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-md border border-accent bg-paper p-10 text-center md:p-14"
        >
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-background">
            <Check className="size-5" />
          </div>
          <h3 className="mt-6 font-display text-[clamp(28px,3.4vw,42px)] font-bold leading-tight tracking-[-0.02em]">
            ✺ Got it.
          </h3>
          <p className="mt-3 text-base leading-[1.6] text-foreground/80">
            We&apos;ll be in touch soon — usually within a few days. In the
            meantime, follow along with what we&apos;re building.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-8"
          noValidate
        >
          <div className="grid gap-7 md:grid-cols-2 md:gap-x-6 md:gap-y-7">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className={labelClass}>
                <span>Name</span>
                <span className={stepClass}>01 / 06</span>
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Name or handle, either works"
                className={fieldClass}
                {...register("name")}
              />
              {errors.name && <p className={errorClass}>{errors.name.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={labelClass}>
                <span>Email</span>
                <span className={stepClass}>02 / 06</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="hello@you.com"
                className={fieldClass}
                {...register("email")}
              />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="role" className={labelClass}>
              <span>Role / Background</span>
              <span className={stepClass}>03 / 06</span>
            </label>
            <input
              id="role"
              type="text"
              placeholder="Designer, ML researcher, organizer, …"
              className={fieldClass}
              {...register("role")}
            />
            {errors.role && <p className={errorClass}>{errors.role.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="motivation" className={labelClass}>
              <span>Why do you want to join Novawerk?</span>
              <span className={stepClass}>04 / 06</span>
            </label>
            <textarea
              id="motivation"
              rows={4}
              placeholder="What are you hoping to build, learn, or contribute?"
              className={cn(
                fieldClass,
                "resize-y text-base font-sans font-normal tracking-normal leading-relaxed",
              )}
              {...register("motivation")}
            />
            {errors.motivation && (
              <p className={errorClass}>{errors.motivation.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <span className={labelClass}>
              <span>Interests · pick a few</span>
              <span className={stepClass}>05 / 06</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((opt) => (
                <label
                  key={opt}
                  className="group inline-flex cursor-pointer items-center rounded-full border border-[var(--color-border-strong)] px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.06em] text-foreground/70 transition-colors has-[:checked]:border-foreground has-[:checked]:bg-foreground has-[:checked]:text-background hover:text-foreground"
                >
                  <input
                    type="checkbox"
                    value={opt}
                    className="sr-only"
                    {...register("interests")}
                  />
                  {opt}
                </label>
              ))}
            </div>
            {errors.interests && (
              <p className={errorClass}>{errors.interests.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="links" className={labelClass}>
              <span>Portfolio / LinkedIn / GitHub · optional</span>
              <span className={stepClass}>06 / 06</span>
            </label>
            <input
              id="links"
              type="text"
              placeholder="https://…"
              className={fieldClass}
              {...register("links")}
            />
            {errors.links && <p className={errorClass}>{errors.links.message}</p>}
          </div>

          {/* Honeypot — bots fill this, humans don't see it */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
            <label htmlFor="website">Website (leave blank)</label>
            <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-5 border-t border-foreground pt-5">
            <p className="max-w-[50ch] font-mono text-[11px] leading-[1.6] tracking-[0.04em] text-muted">
              Submitting means you back the pledge. We don&apos;t share your
              info with third parties — email us anytime to remove it.
            </p>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-3.5 rounded-full border border-accent bg-accent px-9 py-4 font-display text-2xl font-semibold tracking-[-0.02em] text-background transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-foreground hover:bg-foreground disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Send it"}
              <span aria-hidden>✺</span>
            </button>
            {status === "error" && errorMsg && (
              <p className="w-full font-mono text-[11px] text-accent">
                {errorMsg}
              </p>
            )}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
