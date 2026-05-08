# NovaWerk Web Portal

> *Not profitable, but meaningful.*

The community web portal at [novawerk.io](https://novawerk.io) — marketing site, MDX blog, contact form, newsletter signup, and an integrated [Payload CMS](https://payloadcms.com) at `/admin` for managing blog posts, portfolio items, team members, and inbound submissions.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, MDX, Payload v3, and Postgres on Neon.

---

## About NovaWerk

NovaWerk is an open, non-profit community hub focused on creating real positive change in society through collaboration, creativity, and action.

We believe great ideas should not remain as concepts, and that positive change happens when people come together to build, learn, and collaborate on real projects that turn ideas into reality.

### Vision

To build an open space that empowers people to transform meaningful ideas into positive change for society.

### Mission

NovaWerk exists to lower the barriers to creating positive change by helping people:

- validate and refine meaningful ideas
- break ideas into actionable scopes
- collaborate with like-minded people
- gain practical skills through real projects
- create solutions that contribute positively to society

### Core Principles

**01 — Purposeful Innovation**
We believe innovation should create real positive change for people and society. Rather than following short-term trends or simple replication, we value meaningful ideas, thoughtful execution, and long-term contribution through real action.

**02 — Build, Learn, Together**
NovaWerk is an open community where people come together to learn, build, and grow through practical collaboration and real projects. We welcome individuals from different backgrounds, experiences, and skill levels who share a desire to create positive change together.

**03 — Responsibility for Positive Change**
We believe everyone shares a responsibility to contribute positively to society through their actions, ideas, and participation. Positive change begins when people choose to care, contribute, and take responsibility instead of remaining indifferent or inactive.

---

## Local development

```bash
pnpm install
vercel env pull .env.local --environment=production --yes
# Manually set DATABASE_URL in .env.local to the direct Neon connection
# string (Vercel's marketplace-managed one is OIDC-only and not pullable)
pnpm dev
```

Open <http://localhost:3000> for the public site, <http://localhost:3000/admin> for the CMS.

### Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Run the production build locally |
| `pnpm lint` | ESLint |
| `pnpm payload` | Run any Payload CLI command |
| `pnpm generate:types` | Regenerate `payload-types.ts` from collections |
| `pnpm generate:importmap` | Regenerate the admin importMap (run after adding custom field components) |
| `pnpm migrate:blog` | One-time import of `content/blog/*.mdx` into Payload |
| `pnpm migrate:portfolio` | One-time seed of Restaurant Map + YiMa portfolio items |
| `pnpm backfill:user-roles` | Promote any roleless users to `admin` |

## Project structure

```
app/
  (frontend)/              public marketing site (its own root layout)
    page.tsx               /
    about/, portfolio/, community/, blog/
    portfolio/[slug]/      portfolio detail pages
    blog/[slug]/           blog post pages (MDX)
    api/                   /api/contact, /api/newsletter (forms)
  (payload)/               Payload admin (its own root layout)
    admin/[[...segments]]/ /admin/* — full CMS UI
    api/[...slug]/         /api/* — Payload REST/GraphQL (catchall, falls
                            through specific /api/contact + /api/newsletter)
collections/               Payload collection schemas (TS source of truth)
  Users.ts                 auth + roles (admin/editor)
  Media.ts                 uploads → Vercel Blob
  BlogPosts.ts             markdown body, slug, tags, status, cover image
  PortfolioItems.ts        members, gallery, body, status, featured flag
  TeamMembers.ts           name, role, bio, photo, links
  ContactSubmissions.ts    inbound applications (admin-only)
  NewsletterSubscribers.ts email-only signups (admin-only)
components/
  layout/, motion/, forms/, ui/, providers/
  admin/markdown-editor.tsx custom Payload field — live-preview MD editor
content/blog/              original MDX backups (live data is now in Payload)
lib/
  blog.ts, portfolio.ts, team.ts   Payload read helpers
  email.ts                 Resend wrapper (falls back to console log)
  payload-write.ts         saveContactSubmission, saveNewsletterSubscriber
  schemas.ts               Zod schemas (forms + Payload re-validation)
  access.ts                isAdmin / isAdminField / isAuthenticated
  utils.ts, mdx.ts (deprecated — replaced by lib/blog.ts)
scripts/
  migrate-blog.ts, migrate-portfolio.ts, backfill-user-roles.ts
payload.config.ts          Payload root config — collections, db, plugins
payload-types.ts           Auto-generated TS types from collections
```

## Environment variables

Set in **Vercel → Settings → Environment Variables** (Production + Preview + Development):

| Key | What | Required for |
|---|---|---|
| `DATABASE_URI` | Direct Neon connection string (pooled, sslmode=require) | Production runtime + local dev |
| `PAYLOAD_SECRET` | Random 32+ char string for session signing | Always |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token | Media uploads |
| `RESEND_API_KEY` | Resend API key (sign up at resend.com, verify novawerk.io) | Contact form / newsletter emails |
| `CONTACT_TO_EMAIL` | Where contact applications are emailed | Contact form |
| `CONTACT_FROM_EMAIL` | Verified Resend "from" address (default: `NovaWerk <hello@novawerk.io>`) | Contact form |
| `NEXT_PUBLIC_SERVER_URL` | Public app URL | Payload callbacks |
| `NEXT_PUBLIC_SITE_URL` | Public site URL | Metadata / sitemap |

The Vercel-Neon marketplace integration auto-injects `DATABASE_URL` and friends as **sensitive** OIDC-resolved env vars. These work at runtime in Vercel functions but cannot be pulled to local dev. We use a separate `DATABASE_URI` (direct Neon string) so local dev, migrations, and any non-Vercel host can connect with the standard `pg` driver.

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
- [ ] Team page on `/about` (collection ready, awaiting design choice)
- [ ] OG image generation, sitemap.xml, structured data
- [ ] Member profile pages
- [ ] Resend production setup (verify domain, set API key)
- [ ] Search across blog + portfolio
