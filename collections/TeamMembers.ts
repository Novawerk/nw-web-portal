import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
    description: "People shown on the About page team section.",
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
      admin: {
        description: 'e.g. "Co-founder", "Designer", "Researcher".',
      },
    },
    {
      name: "bio",
      type: "textarea",
      admin: {
        description: "Short paragraph about what they do at NovaWerk.",
      },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "links",
      type: "array",
      labels: { singular: "Link", plural: "Links" },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "url", type: "text", required: true },
      ],
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
