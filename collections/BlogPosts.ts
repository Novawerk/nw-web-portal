import type { CollectionConfig } from "payload";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedDate", "status"],
    description:
      "Field notes, build logs, and posts published at /blog. Markdown body.",
  },
  access: {
    read: () => true,
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
      admin: {
        description:
          "URL slug — auto-derived from title if left blank.",
      },
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
      name: "excerpt",
      type: "textarea",
      admin: {
        description: "1–2 sentence summary shown on the blog index.",
      },
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: { pickerAppearance: "dayOnly" },
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      required: true,
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "author",
      type: "text",
      defaultValue: "NovaWerk",
      admin: { position: "sidebar" },
    },
    {
      name: "tags",
      type: "array",
      labels: { singular: "Tag", plural: "Tags" },
      fields: [{ name: "tag", type: "text", required: true }],
      admin: { position: "sidebar" },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Optional hero image at the top of the post.",
      },
    },
    {
      name: "content",
      type: "textarea",
      required: true,
      admin: {
        description: "Markdown body. Renders via next-mdx-remote on the site.",
        components: {
          Field: "/components/admin/markdown-editor#MarkdownEditor",
        },
      },
    },
  ],
};
