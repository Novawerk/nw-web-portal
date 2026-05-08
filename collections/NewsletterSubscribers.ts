import type { CollectionConfig } from "payload";
import { isAdmin } from "../lib/access";

export const NewsletterSubscribers: CollectionConfig = {
  slug: "newsletter-subscribers",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "subscribed", "source", "createdAt"],
    description:
      "Newsletter signups from /community. Admin-only — contains email addresses. Mark unsubscribed instead of deleting.",
  },
  access: {
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "subscribed",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description:
          "Soft-unsubscribe — uncheck instead of deleting so we don't re-spam returning users.",
      },
    },
    {
      name: "source",
      type: "text",
      defaultValue: "website",
      admin: { position: "sidebar" },
    },
  ],
};
