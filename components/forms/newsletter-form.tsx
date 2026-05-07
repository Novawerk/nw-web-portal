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

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
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
        <motion.p
          key="ok"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-background/80"
        >
          You&apos;re on the list. Talk soon.
        </motion.p>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-start"
          noValidate
        >
          <div className="flex-1">
            <label htmlFor="newsletter-email" className="sr-only">Email</label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-full border border-background/20 bg-transparent px-5 py-3 text-sm text-background placeholder:text-background/40 focus:border-accent focus:outline-none"
              {...register("email")}
            />
            {(errors.email || errorMsg) && (
              <p className="mt-2 px-2 text-xs text-accent">
                {errors.email?.message ?? errorMsg}
              </p>
            )}
          </div>
          <div aria-hidden="true" className="absolute -left-[9999px]" tabIndex={-1}>
            <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "submitting" ? "…" : "Subscribe"}
            <ArrowRight className="size-4" />
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
