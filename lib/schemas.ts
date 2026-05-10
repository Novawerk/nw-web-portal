import { z } from "zod";

export const interestOptions = [
  "Building apps & products",
  "Research & exploration",
  "Design & storytelling",
  "Community organizing",
  "Writing & thinking",
  "Other",
] as const;

export const contactSubmissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .max(100, "Keep your name under 100 characters"),
  email: z
    .string()
    .trim()
    .min(1, "We need an email to reach you")
    .email("That doesn't look like a valid email"),
  role: z
    .string()
    .trim()
    .min(1, "Tell us what you do")
    .max(200, "Keep this under 200 characters"),
  motivation: z
    .string()
    .trim()
    .min(10, "A bit more context, please (10+ chars)")
    .max(2000, "Keep this under 2000 characters"),
  interests: z
    .array(z.enum(interestOptions))
    .min(1, "Pick at least one interest"),
  links: z
    .string()
    .trim()
    .max(500, "Keep links under 500 characters")
    .optional()
    .or(z.literal("")),
  // Honeypot — bots fill this, humans don't see it.
  website: z.string().max(0, "bot").optional().or(z.literal("")),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

export const newsletterSignupSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("That doesn't look like a valid email"),
  website: z.string().max(0, "bot").optional().or(z.literal("")),
});

export type NewsletterSignup = z.infer<typeof newsletterSignupSchema>;
