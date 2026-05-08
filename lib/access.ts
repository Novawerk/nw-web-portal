import type { Access, FieldAccess } from "payload";

const userIsAdmin = (user: unknown): boolean => {
  const roles = (user as { roles?: string[] } | null)?.roles ?? [];
  return roles.includes("admin");
};

/** Reader can see if logged in. */
export const isAuthenticated: Access = ({ req }) => Boolean(req.user);

/** Reader has the `admin` role. */
export const isAdmin: Access = ({ req }) => userIsAdmin(req.user);

/** Reader is an admin OR is acting on their own user record. */
export const isAdminOrSelf: Access = ({ req, id }) => {
  if (!req.user) return false;
  if (userIsAdmin(req.user)) return true;
  return id === req.user.id;
};

/** Field-level access — admins can edit this field. */
export const isAdminField: FieldAccess = ({ req }) => userIsAdmin(req.user);
