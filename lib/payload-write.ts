import { getPayload } from "payload";
import config from "@payload-config";
import type { ContactSubmission, NewsletterSignup } from "./schemas";

export async function saveContactSubmission(submission: ContactSubmission) {
  const payload = await getPayload({ config });
  return payload.create({
    collection: "contact-submissions",
    data: {
      name: submission.name,
      email: submission.email,
      role: submission.role,
      motivation: submission.motivation,
      interests: submission.interests,
      links: submission.links || undefined,
      status: "new",
    },
  });
}

export async function saveNewsletterSubscriber(signup: NewsletterSignup) {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "newsletter-subscribers",
    where: { email: { equals: signup.email } },
    limit: 1,
  });

  if (existing.docs[0]) {
    if (!existing.docs[0].subscribed) {
      return payload.update({
        collection: "newsletter-subscribers",
        id: existing.docs[0].id,
        data: { subscribed: true },
      });
    }
    return existing.docs[0];
  }

  return payload.create({
    collection: "newsletter-subscribers",
    data: {
      email: signup.email,
      subscribed: true,
      source: "website",
    },
  });
}
