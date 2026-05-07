# NovaWerk Web Portal

Marketing site, blog, and community contact form for [NovaWerk](https://novawerk.io) — an open, non-profit community turning meaningful ideas into real-world impact.

Built with Next.js 16 (App Router), TypeScript, Tailwind v4, and MDX.

## Local development

```bash
pnpm install
cp .env.local.example .env.local   # fill in keys when needed
pnpm dev
```

Open <http://localhost:3000>.

### Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run the production build locally |
| `pnpm lint` | ESLint |

## Project structure

```
app/                   # Next.js App Router routes
  page.tsx             #   /          home
  about/               #   /about
  portfolio/           #   /portfolio
  community/           #   /community
  blog/                #   /blog       (MDX rendering — Phase 5)
  api/                 #   /api/*      route handlers (Phase 4)
components/
  layout/              # Header, Footer, Container
  ui/                  # Button and other primitives
content/blog/          # MDX posts (Phase 5)
lib/                   # utils, schemas, mdx helpers
```

## Deploying to Vercel + novawerk.io

### One-time setup (you, in your accounts)

1. **Create a GitHub repo** for this project (private or public).
2. **Push this code** to the new repo:
   ```bash
   git remote add origin git@github.com:<your-org>/nw-web-portal.git
   git add -A && git commit -m "Initial NovaWerk portal scaffold"
   git push -u origin main
   ```
3. **Sign up / log in** to <https://vercel.com>.
4. **Import the repo** at <https://vercel.com/new> → "Add GitHub Account" → select `nw-web-portal`. Vercel auto-detects Next.js — accept defaults and click Deploy. You'll get a `*.vercel.app` URL within ~1 minute.

### Connect novawerk.io

1. In your Vercel project: **Settings → Domains → Add** → enter `novawerk.io`.
2. Repeat for `www.novawerk.io` and set it to redirect to the apex.
3. Vercel will show the DNS records you need. At your domain registrar (wherever `novawerk.io` is registered), add:

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

   (Vercel may show slightly different values — always use what the dashboard says.)
4. SSL is auto-issued once DNS propagates (usually minutes, sometimes hours).

### Environment variables

Set these in **Vercel → Settings → Environment Variables** for the **Production** environment (and copy to **Preview** if you want them on PR previews):

| Key | When needed |
|---|---|
| `RESEND_API_KEY` | Phase 4 — contact form email delivery |
| `CONTACT_TO_EMAIL` | Phase 4 — destination address |
| `NEXT_PUBLIC_SITE_URL` | Phase 3+ — absolute URLs in metadata / sitemap |

### Auto-deploys

Once linked, every push to `main` deploys to production. Every PR gets a preview URL.

## Roadmap

- [x] Phase 1 — Bootstrap (Next.js + Tailwind + deps)
- [x] Phase 2 — Layout primitives + 5 stub routes
- [ ] Phase 3 — Fill out content from brief, motion polish (Framer Motion + Lenis)
- [ ] Phase 4 — Contact form (Zod + react-hook-form + Resend)
- [ ] Phase 5 — Blog MDX rendering + seed posts
- [ ] Phase 6 — README, sitemap, OG images, analytics
