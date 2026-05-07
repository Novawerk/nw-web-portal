"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import {
  contactSubmissionSchema,
  interestOptions,
  type ContactSubmission,
} from "@/lib/schemas";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full border-b border-border bg-transparent py-3 text-base text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors";
const labelClass = "block text-xs uppercase tracking-[0.2em] text-muted";
const errorClass = "mt-2 text-xs text-accent";

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
          className="rounded-2xl border border-border bg-card p-8 md:p-10"
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Check className="size-5" />
          </div>
          <h3 className="mt-6 font-display text-3xl md:text-4xl">Thanks for reaching out.</h3>
          <p className="mt-3 text-muted">
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
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>Name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                className={fieldClass}
                {...register("name")}
              />
              {errors.name && <p className={errorClass}>{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={fieldClass}
                {...register("email")}
              />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="role" className={labelClass}>Role / Background</label>
            <input
              id="role"
              type="text"
              placeholder="Designer, ML researcher, organizer, …"
              className={fieldClass}
              {...register("role")}
            />
            {errors.role && <p className={errorClass}>{errors.role.message}</p>}
          </div>

          <div>
            <label htmlFor="motivation" className={labelClass}>
              Why do you want to join NovaWerk?
            </label>
            <textarea
              id="motivation"
              rows={5}
              placeholder="What are you hoping to build, learn, or contribute?"
              className={cn(fieldClass, "resize-y")}
              {...register("motivation")}
            />
            {errors.motivation && <p className={errorClass}>{errors.motivation.message}</p>}
          </div>

          <div>
            <span className={labelClass}>Interests</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {interestOptions.map((opt) => (
                <label
                  key={opt}
                  className="group inline-flex cursor-pointer items-center rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors has-[:checked]:border-foreground has-[:checked]:bg-foreground has-[:checked]:text-background hover:border-foreground/40"
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
            {errors.interests && <p className={errorClass}>{errors.interests.message}</p>}
          </div>

          <div>
            <label htmlFor="links" className={labelClass}>
              Portfolio / LinkedIn / GitHub <span className="text-muted-foreground/60">(optional)</span>
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

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Send application"}
              <ArrowRight className="size-4" />
            </button>
            {status === "error" && errorMsg && (
              <p className="text-sm text-accent">{errorMsg}</p>
            )}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
