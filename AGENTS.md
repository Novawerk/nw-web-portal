<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Novawerk web portal — agent guide

Stack at a glance: **Next.js 16 App Router** + **React 19** + **Payload v3** + **Postgres (Neon)** + **Tailwind v4** + **Vercel Blob**. Package manager is **pnpm** (see `pnpm-workspace.yaml`).

## Layout

- Two route groups, two root layouts:
  - `app/(frontend)/` — public marketing site, owns its own `globals.css` (Tailwind v4) and chrome.
  - `app/(payload)/` — Payload admin + REST/GraphQL API, owns the Payload CSS.
- Specific routes win over the Payload `/api/[...slug]` catchall — that's how `/api/contact` and `/api/newsletter` keep working.
- Path aliases: `@/*` → repo root, `@payload-config` → `payload.config.ts`.

## Source of truth

- **Collections** (`collections/*.ts`) define all content. After editing one, run `pnpm generate:types` to refresh `payload-types.ts`.
- **`payload-types.ts` is generated** — never hand-edit.
- **`app/(payload)/admin/importMap.js` is generated** — run `pnpm generate:importmap` after adding or moving a custom field component (e.g. `components/admin/markdown-editor.tsx`).
- **Schema migrations** live in Payload's built-in mechanism: `pnpm migrate:create` to author one, `pnpm migrate` to apply.

## Reading content

Don't call `getPayload` from page components directly. Use the helpers in `lib/`:

- `lib/blog.ts` — `getAllPosts`, `getPostBySlug`, `getAllPostSlugs`, `formatDate`
- `lib/portfolio.ts` — `getAllPortfolioItems`, `getFeaturedPortfolioItems`, `getPortfolioItemBySlug`, `getAllPortfolioSlugs`
- `lib/team.ts` — `getAllTeamMembers`

These flatten Payload's nested doc shape into thin DTOs and filter by status (`published`, not `archived`, etc.). Pages import the DTOs, not the raw collection types.

Public-facing pages (`/`, `/blog`, `/blog/[slug]`, `/portfolio`, `/portfolio/[slug]`) export `revalidate = 300`. CMS edits show up within ~5 min without a redeploy.

## Writing content

User-facing forms write through `lib/payload-write.ts` and notify via `lib/email.ts` (Resend). Both run under `Promise.allSettled` in the route handler — if either succeeds the request returns 200. The honeypot field `website` short-circuits silently with 200.

Validate everything at the route boundary with the Zod schemas in `lib/schemas.ts`.

## Markdown vs. Lexical

`payload.config.ts` registers `lexicalEditor()` as the default rich-text editor, but the long-form bodies on `BlogPosts.content` and `PortfolioItems.body` are **plain `textarea` Markdown** rendered through a custom field component (`components/admin/markdown-editor.tsx`, registered in `importMap`) and displayed on the site via `next-mdx-remote/rsc`. Don't replace these with Lexical without coordination.

## Access & roles

`lib/access.ts` exports `isAdmin`, `isAdminOrSelf`, `isAdminField`, `isAuthenticated`. Use these — don't open-code `req.user` checks. `users.roles` is field-level guarded by `isAdminField` so editors can't promote themselves. Inbound submission collections (`contact-submissions`, `newsletter-subscribers`) are admin-only on read because they hold personal data.

## Env vars

Either `DATABASE_URI` (Payload convention) or `DATABASE_URL` (Vercel/Neon) works — `payload.config.ts` falls back. The Vercel-Neon marketplace integration injects an OIDC `DATABASE_URL` that **cannot be pulled to local dev**, so the `.env.local` workflow needs a direct Neon string in `DATABASE_URI`. Don't commit `.env*.local`.

`RESEND_API_KEY` is optional — `lib/email.ts` logs to console if it's missing, and the Payload write is the durable record.

## Tailwind v4

Theme tokens (`--color-*`, fonts) live in `app/(frontend)/globals.css` under `@theme`. There is no `tailwind.config.{js,ts}`. Add new tokens there, not in JS config.

## Don't

- Don't add backwards-compat shims for the OIDC vs. direct Neon string split — the dual-name fallback is the contract.
- Don't hand-edit `payload-types.ts` or `importMap.js`.
- Don't bypass `lib/blog.ts` / `lib/portfolio.ts` / `lib/team.ts` from page components.
- Don't introduce `tailwind.config.*` — Tailwind v4 is CSS-first here.
- Don't delete the original `content/blog/*.mdx` — they're the seed source for `pnpm migrate:blog`.
