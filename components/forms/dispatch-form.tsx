"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  newsletterSignupSchema,
  type NewsletterSignup,
} from "@/lib/schemas";

export function DispatchForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterSignup>({
    resolver: zodResolver(newsletterSignupSchema),
    defaultValues: { email: "", website: "" },
  });

  const onSubmit = async (data: NewsletterSignup) => {
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body.error ?? "Something went wrong");
        setStatus("error");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setErrorMsg("Network error — try again");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="ok"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-background/60">
            ✺ Thank you
          </span>
          <p className="m-0 font-serif text-2xl italic text-accent">
            See you next month.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-5"
          noValidate
        >
          <label
            htmlFor="dispatch-email"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-background/55"
          >
            Your email
          </label>
          <input
            id="dispatch-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full border-0 border-b border-background/40 bg-transparent pb-3 pt-1 font-display text-2xl tracking-[-0.01em] text-background placeholder:text-background/35 focus:border-accent focus:outline-none"
            {...register("email")}
          />
          {(errors.email || errorMsg) && (
            <p className="-mt-3 font-mono text-[11px] uppercase tracking-[0.06em] text-accent">
              {errors.email?.message ?? errorMsg}
            </p>
          )}
          <div
            aria-hidden="true"
            className="absolute -left-[9999px]"
            tabIndex={-1}
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-6 py-4 font-mono text-[13px] uppercase tracking-[0.08em] text-background transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-accent-deep disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Subscribe — it's free"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <p className="m-0 font-mono text-[11px] leading-[1.6] tracking-[0.04em] text-background/55">
            One email per month. Unsubscribe in one click.
            <br />
            We never share your address.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
