import type { CollectionConfig } from "payload";
import {
  isAdmin,
  isAdminField,
  isAdminOrSelf,
  isAuthenticated,
} from "../lib/access";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "roles"],
  },
  auth: true,
  access: {
    read: isAuthenticated,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    { name: "name", type: "text" },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      defaultValue: ["admin"],
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      access: {
        // Only admins can change roles — editors can't promote themselves.
        update: isAdminField,
      },
      admin: {
        description:
          'Admin: full access. Editor: can manage content but not users or roles.',
      },
    },
  ],
};
