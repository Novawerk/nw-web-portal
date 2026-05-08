import type { CollectionConfig } from "payload";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const PortfolioItems: CollectionConfig = {
  slug: "portfolio-items",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "tag", "status", "featured", "order"],
    description:
      "Projects shown on the /portfolio page and home featured grid.",
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return slugify(String(value));
            if (data?.title) return slugify(String(data.title));
            return value;
          },
        ],
      },
    },
    {
      name: "tag",
      type: "text",
      required: true,
      defaultValue: "App",
      admin: {
        description: 'Short label, e.g. "App", "Project", "Tool".',
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      admin: {
        description: "1–2 sentence pitch shown on cards.",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "building",
      options: [
        { label: "Planning", value: "planning" },
        { label: "Building", value: "building" },
        { label: "Launching", value: "launching" },
        { label: "Launched", value: "launched" },
        { label: "Archived", value: "archived" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "link",
      type: "text",
      admin: {
        description: "Optional outbound URL (the live app, GitHub, etc.).",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: 'Show in the home page "Currently building" grid.',
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 100,
      admin: {
        position: "sidebar",
        description: "Lower = shown first. Defaults to 100.",
      },
    },
  ],
};
