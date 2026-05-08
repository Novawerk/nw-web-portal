import type { CollectionConfig } from "payload";
import { interestOptions } from "../lib/schemas";
import { isAdmin } from "../lib/access";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "status", "createdAt"],
    description:
      "Inbound applications submitted from /community. Admin-only — these contain personal data.",
  },
  access: {
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
      index: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
    },
    {
      name: "motivation",
      type: "textarea",
      required: true,
    },
    {
      name: "interests",
      type: "select",
      hasMany: true,
      required: true,
      options: interestOptions.map((opt) => ({ label: opt, value: opt })),
    },
    {
      name: "links",
      type: "text",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      required: true,
      admin: { position: "sidebar" },
      options: [
        { label: "New", value: "new" },
        { label: "Replied", value: "replied" },
        { label: "Archived", value: "archived" },
      ],
    },
    {
      name: "notes",
      type: "textarea",
      admin: {
        position: "sidebar",
        description: "Internal notes — not visible to the submitter.",
      },
    },
  ],
};
