# NovaWerk Web Portal

> *Not profitable, but meaningful.*

The community web portal at [novawerk.io](https://novawerk.io) — marketing site, blog, portfolio, contact form, newsletter signup, and an integrated [Payload CMS](https://payloadcms.com) at `/admin` for managing all of it.

## Tech stack

- **Next.js 16** (App Router, Turbopack, route groups)
- **React 19** + TypeScript (strict)
- **Tailwind v4** (CSS-first config in `globals.css`) + `@tailwindcss/typography`
- **Payload v3** with the `@payloadcms/next` adapter — admin and REST/GraphQL share the same Next process
- **Postgres** via `@payloadcms/db-postgres` (Neon in production)
- **Vercel Blob** for media uploads (`@payloadcms/storage-vercel-blob`)
- **Markdown** for long-form bodies — `next-mdx-remote/rsc` renders, `@uiw/react-md-editor` edits
- **Resend** for transactional email; **Zod** + **react-hook-form** for forms
- **Framer Motion** + **Lenis** for motion / smooth scroll

## Local development

```bash
pnpm install
vercel env pull .env.local --environment=production --yes
# Then set DATABASE_URI in .env.local to a direct (non-OIDC) Neon
# connection string — see "Environment variables" below.
pnpm dev
```

- Public site: <http://localhost:3000>
- Payload admin: <http://localhost:3000/admin>

### Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Next dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Run the production build locally |
| `pnpm lint` | ESLint (`eslint-config-next`) |
| `pnpm payload` | Run any Payload CLI command |
| `pnpm generate:types` | Regenerate `payload-types.ts` from collection schemas |
| `pnpm generate:importmap` | Regenerate the admin importMap (run after adding a custom field component) |
| `pnpm migrate` | Apply pending Payload schema migrations |
| `pnpm migrate:create` | Create a new Payload migration from current schema diff |
| `pnpm migrate:blog` | One-shot import of `content/blog/*.mdx` into the `blog-posts` collection |
| `pnpm migrate:portfolio` | One-shot seed of the Restaurant Map + YiMa portfolio items |
| `pnpm backfill:user-roles` | Promote any roleless users to `admin` |

The one-shot migration scripts use `tsx --env-file=.env.local`, so they need a working `.env.local`.

## Project structure

```
app/
  (frontend)/                public marketing site (own root layout)
    layout.tsx               Header/Footer, smooth scroll, cursor follower
    globals.css              Tailwind v4 theme + Satoshi font + grain overlay
    page.tsx                 /
    about/                   /about
    portfolio/               /portfolio  +  /portfolio/[slug]
    blog/                    /blog       +  /blog/[slug]      (MDX body)
    community/               /community  (contact form + newsletter)
    api/contact/route.ts     POST → Payload + Resend (Promise.allSettled)
    api/newsletter/route.ts  POST → Payload + Resend
  (payload)/                 Payload admin (own root layout)
    admin/[[...segments]]/   /admin/* — full CMS UI
    admin/importMap.js       generated; do not edit by hand
    api/[...slug]/           /api/*   — Payload REST catchall
    api/graphql/             /api/graphql
    api/graphql-playground/  /api/graphql-playground
    custom.scss              admin CSS overrides (currently empty)

collections/                 TypeScript source of truth for all content
  Users.ts                   auth + roles (admin / editor)
  Media.ts                   uploads → Vercel Blob (single `alt` field)
  BlogPosts.ts               markdown body, slug, tags, status, cover image
  PortfolioItems.ts          members, gallery, body, status, featured, order
  TeamMembers.ts             name, role, bio, photo, links
  ContactSubmissions.ts      inbound applications (admin-only read)
  NewsletterSubscribers.ts   email-only signups (admin-only read)

components/
  layout/        Header, Footer, Container
  motion/        AnimatedSlogan, Reveal, Marquee, Magnetic, CursorFollower
  forms/         contact-form, newsletter-form (react-hook-form + Zod)
  providers/     SmoothScroll (Lenis)
  ui/            Button
  admin/         markdown-editor.tsx — custom Payload field, live MD preview

lib/
  blog.ts            Payload reader for blog-posts (+ formatDate)
  portfolio.ts       Payload reader for portfolio-items (with media/members)
  team.ts            Payload reader for team-members
  email.ts           Resend wrapper; falls back to console.log if no API key
  payload-write.ts   saveContactSubmission, saveNewsletterSubscriber
  schemas.ts         Zod schemas (forms + Payload re-validation)
  access.ts          isAdmin / isAdminField / isAdminOrSelf / isAuthenticated
  utils.ts           cn() helper

scripts/             one-shot migrations (run via tsx + .env.local)
content/blog/        original MDX backups; live data is now in Payload
payload.config.ts    Payload root — collections, db, plugins, sharp, lexical
payload-types.ts     auto-generated from collections — do not edit by hand
```

### Routing

The `(frontend)` and `(payload)` route groups each have their own `layout.tsx`, so the marketing site and the CMS admin can have completely different chrome (fonts, providers, CSS). The Payload group also owns `/api/*` as a catchall — but **Next route specificity means more-specific routes win**, so `/api/contact` and `/api/newsletter` (defined under the frontend group) are not shadowed.

### Revalidation

`/`, `/blog`, `/blog/[slug]`, `/portfolio`, and `/portfolio/[slug]` export `revalidate = 300`. CMS edits become visible without a redeploy after at most 5 minutes.

### Content model

| Collection | Public read | Body | Notes |
|---|---|---|---|
| `blog-posts` | yes (when `status=published`) | markdown (`textarea` + custom MD editor) | slug auto-derived from title |
| `portfolio-items` | yes (excludes `archived`) | markdown | `featured` + `order` drive home grid; `members` references `team-members` |
| `team-members` | yes | textarea | `order` controls listing position |
| `media` | yes | — | uploaded to Vercel Blob; `alt` required |
| `users` | authed only | — | `auth: true`, `roles: admin | editor` |
| `contact-submissions` | admin only | — | created by anonymous POST `/api/contact` |
| `newsletter-subscribers` | admin only | — | unique on `email`; soft-unsubscribe via `subscribed=false` |

### Access roles

`lib/access.ts` defines four helpers used across the collections:

- **`isAuthenticated`** — any logged-in user (used for `users.read`)
- **`isAdmin`** — user has the `admin` role (CRUD for users, contact submissions, newsletter)
- **`isAdminOrSelf`** — admin, or operating on your own user record
- **`isAdminField`** — field-level guard so only admins can change the `roles` field on a user

`portfolio-items` and `team-members` are editable by any authenticated user (admins or editors); `users` and the inbound submission collections are admin-only.

## Environment variables

Set in **Vercel → Settings → Environment Variables** (Production + Preview + Development), and locally in `.env.local`:

| Key | What | Required for |
|---|---|---|
| `DATABASE_URI` *(or `DATABASE_URL`)* | Direct Postgres connection string (e.g. Neon, `sslmode=require`) | Runtime + local dev |
| `PAYLOAD_SECRET` | Random 32+ char string for session signing — `openssl rand -base64 48` | Always |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token (Vercel → Storage → Blob) | Media uploads |
| `RESEND_API_KEY` | Resend API key — domain `novawerk.io` must be verified | Contact + newsletter emails |
| `CONTACT_TO_EMAIL` | Where contact applications are emailed | Contact form |
| `CONTACT_FROM_EMAIL` | Verified Resend "from" address (default: `NovaWerk <hello@novawerk.io>`) | Contact form |
| `NEXT_PUBLIC_SERVER_URL` | Public app URL (Payload callbacks, OG images) | Always |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (metadata, sitemap) | Always |

The Vercel-Neon marketplace integration auto-injects `DATABASE_URL` and friends as **sensitive OIDC** env vars. Those work at runtime in Vercel functions but **cannot be pulled to local dev**. We accept either name (`DATABASE_URI || DATABASE_URL`) so local dev, the migration scripts, and any non-Vercel host can use a plain direct connection string with the standard `pg` driver.

If `RESEND_API_KEY` is missing, `lib/email.ts` falls back to `console.log` and the form still succeeds — the Payload write is the durable record of truth.

## Deploying

This repo is connected to Vercel via the **GitHub integration** — every push to `main` auto-deploys to production at `novawerk.io`, and every PR gets a preview URL.

For first-time deploy elsewhere:

1. Sign up / log in to <https://vercel.com>
2. Import the repo at <https://vercel.com/new>
3. Add the env vars above
4. Add `novawerk.io` and `www.novawerk.io` to the project domains; configure DNS at your registrar with the records Vercel shows

## Roadmap

- [x] Phase 1 — Next.js scaffold + deps
- [x] Phase 2 — Layout primitives + 5 stub routes
- [x] Phase 3 — Editorial visual language + motion polish (Framer Motion + Lenis)
- [x] Phase 4 — Contact form + newsletter (Zod + Resend)
- [x] Phase 5 — MDX blog with two seed posts
- [x] Phase 6 — Payload CMS integration: blog, forms, portfolio, team, roles & access control
- [x] Phase 7 — Portfolio detail pages with members + gallery
- [x] Markdown editor in admin
- [x] Brand voice + Satoshi-driven home redesign
- [ ] Team page on `/about` (collection ready, awaiting design choice)
- [ ] OG image generation, sitemap.xml, structured data
- [ ] Member profile pages
- [ ] Resend production setup (verify domain, set API key)
- [ ] Search across blog + portfolio

---

## About NovaWerk

NovaWerk is an open, non-profit community hub focused on creating real positive change in society through collaboration, creativity, and action.

**Vision** — to build an open space that empowers people to transform meaningful ideas into positive change for society.

**Mission** — lower the barriers to creating positive change by helping people validate and refine meaningful ideas, break them into actionable scopes, collaborate with like-minded people, gain practical skills through real projects, and create solutions that contribute positively to society.

**Principles**

1. **Purposeful Innovation** — innovation should create real positive change, not chase trends or quick wins.
2. **Build, Learn, Together** — an open community where people of all backgrounds learn by building real things.
3. **Responsibility for Positive Change** — everyone shares the responsibility to contribute. Indifference is the only failure.
