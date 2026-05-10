# NovaWerk — Site content

Single source-of-truth for everything visible on novawerk.io: brand, IA, page-by-page copy, visual language, and forms. Copy here is the canonical English shipped on the live site (see `app/(frontend)/`). Dynamic content (blog posts, portfolio items, team members) is managed in Payload at `/admin` and is *not* duplicated here.

---

## 1. Brand

**Tagline** — *Not profitable, but meaningful.*

**One-line description** — An open, non-profit community hub focused on creating real positive change in society through collaboration, creativity, and action.

**Vision** — To build an open space that empowers people to transform meaningful ideas into positive change for society.

**Mission** — Lower the barriers to creating positive change by helping people:

- validate and refine meaningful ideas
- break ideas into actionable scopes
- collaborate with like-minded people
- gain practical skills through real projects
- create solutions that contribute positively to society

### Core principles

| # | Title | Long-form |
|---|---|---|
| 01 | **Purposeful Innovation** | We believe innovation should create real positive change for people and society. Rather than following short-term trends or simple replication, we value meaningful ideas, thoughtful execution, and long-term contribution through real action. |
| 02 | **Build, Learn, Together** | NovaWerk is an open community where people come together to learn, build, and grow through practical collaboration and real projects. We welcome individuals from different backgrounds, experiences, and skill levels who share a desire to create positive change together. |
| 03 | **Responsibility for Positive Change** | We believe everyone shares a responsibility to contribute positively to society through their actions, ideas, and participation. Positive change begins when people choose to care, contribute, and take responsibility instead of remaining indifferent or inactive. |

Short-form versions used on the home page:

- **Purposeful Innovation** — Innovation should create real positive change — not chase trends or quick wins.
- **Build, Learn, Together** — An open community where people of all backgrounds learn by building real things.
- **Responsibility for Positive Change** — Everyone shares the responsibility to contribute. Indifference is the only failure.

### Voice

- Direct, plain, low-jargon. Sentences land short.
- "We" + present tense. Speak as the community, not about it.
- Italicized accent words (`<span class="italic text-accent">`) are used sparingly to mark *the* word that carries the meaning of the line — *together*, *meaningful*, *building*, *us*, *making*, *real positive change*, *Let's make it real.*, *workshop*.
- Avoid: "leverage", "ecosystem", "stakeholders", marketing puffery.

---

## 2. Information architecture

| Route | Page | One-liner |
|---|---|---|
| `/` | Home | Manifesto + featured projects + CTA |
| `/about` | About | Why NovaWerk exists, how we operate, principles |
| `/portfolio` | Portfolio index | All non-archived projects |
| `/portfolio/[slug]` | Portfolio detail | Project body + members + gallery |
| `/blog` | Blog index | Field notes & build logs |
| `/blog/[slug]` | Blog post | MDX body |
| `/community` | Community | How to join, contact form, newsletter |
| `/admin` | Payload CMS | Internal — admin/editor only |

### Navigation

**Header** — left: NovaWerk wordmark with accent dot. Center (desktop only): About · Portfolio · Community · Blog. Right: "Join Us" pill button → `/community`.

**Footer** — Big tagline ("Not profitable, but meaningful."), "Join NovaWerk →" pill, copyright + secondary links (About · Portfolio · Blog).

---

## 3. Pages

Pages on `/`, `/blog*`, and `/portfolio*` are server-rendered with `revalidate = 300`. CMS-driven content (featured projects, blog posts, portfolio items) updates within 5 min without redeploy.

### `/` — Home

Sections are numbered editorial-style (`001 / Manifesto`, etc.) — the number labels are part of the visual language and should stay.

**001 / Manifesto** *(hero, full viewport)*

- Animated slogan: per-character entry of *Not profitable, but meaningful.*
- Followed line by line:
  - We don't chase scale.
  - We don't chase trends.
  - We build things that matter — *together*.
- Sub-paragraph: NovaWerk is an open, non-profit community hub. Bring an idea, bring yourself.
- CTA: **Join the workshop →** `/community`
- Footer of section: animated "Scroll ↓" indicator

**Marquee strip** — scrolling tags on dark band: Open · Non-profit · Real projects · Built together · Positive change · Meaningful

**002 / What we do**

- Heading: We turn meaningful ideas into *real positive change* — together.
- Body: We believe great ideas should not remain as concepts. Positive change happens when people come together to build, learn, and collaborate on real projects.

**003 / Principles** — three columns, short-form principle copy (see §1).

**004 / How it works** — three columns:

| # | Title | Body |
|---|---|---|
| 01 | Bring an idea. | Pitch it to the workshop. Validate, refine, scope it down to something shippable. |
| 02 | Find collaborators. | Pair up with builders, designers, researchers from the community. |
| 03 | Ship something useful. | Build in public. Learn by doing. Contribute back. |

**005 / Portfolio** — "Currently building" — pulls `featured = true` portfolio items (max 6, ordered by `order`) from Payload. Card link → `/portfolio/[slug]`. "All projects →" → `/portfolio`.

**006 / Get involved** — dark CTA card.

- Heading: Have a meaningful idea? *Let's make it real.*
- Buttons: **Join NovaWerk →** `/community` · **Get in touch** → `/community#contact`

### `/about`

**Hero** — Eyebrow `About` · H1 *Why NovaWerk* exists. · Lead paragraph:

> We are an open, non-profit community hub focused on creating real positive change in society. Great ideas should not remain as concepts — and positive change happens when people come together to build, learn, and collaborate.

**How we operate** — H2 *Validate, scope, build, ship.* Right column: bullet list of the five mission verbs from §1.

**Our principles** — three-column grid with the **long-form** principle copy (see §1).

> Note: a Team section is in the roadmap but not yet shipped — `team-members` collection is ready in Payload.

### `/portfolio`

**Hero** — Eyebrow `Portfolio` · H1 What we're *building*.

> Real projects, shipped or shipping — built by community members turning meaningful ideas into reality.

**Grid** — every non-archived project from Payload, sorted by `order`. Each card shows tag, status pill, title, description, "Learn more →". Empty state: "No projects yet — check back soon."

Status labels (display): Planning · Building · Launching · Launched. (Archived is filtered out.)

### `/portfolio/[slug]`

Sections (numbered):

1. **Header** — back link · tag + status pill · H1 title · italic *tagline* · description · optional "Visit live ↗" button (`link` field)
2. **Cover image** — 16:9, if `coverImage` is set
3. **001 / About** — markdown body rendered through `next-mdx-remote` with `prose` styling, only if `body` is set
4. **002 / Built by** — two-column grid of credited `members` with avatar + name + role, only if any
5. **003 / Gallery** — two-column grid of gallery images with optional captions, only if any

### `/blog`

**Hero** — Eyebrow `Blog` · H1 Notes from the *workshop*.

> Field notes, build logs, and thinking from inside the community.

**List** — divided list. Each row: date · tag pills · title (hover → accent) · excerpt · "↗" arrow. Empty state: "No posts yet — check back soon."

### `/blog/[slug]`

- Back link → `/blog`
- Date + tags
- H1 title
- Lead paragraph (excerpt) if present
- MDX body rendered with `prose` styling

### `/community`

**Hero** — Eyebrow `Community` · H1 Build with *us*.

> NovaWerk is open. If you have a meaningful idea, want to learn by building, or want to contribute to projects that matter — there's a place for you here.

**How to get involved** — 2×2 grid:

| Title | Body |
|---|---|
| Who we're looking for | Builders, designers, researchers, organizers — anyone who shares our vision and is willing to contribute. Background, experience, or skill level don't matter as much as intent. |
| How to participate | Bring an idea, join an existing project, or contribute your skills to ongoing work. We'll match you with collaborators and scope to make it real. |
| Collaboration model | Open by default. Decisions are made by the people doing the work. We move in small, intentional steps and ship things that are useful. |
| Learning opportunities | Real-world practice on real projects. Pair with experienced builders, get feedback, and grow through doing. |

**`#contact` — Get in touch**

- Eyebrow `Get in touch`
- H2 Tell us what you want to *build*.
- Body: Drop your details — we'll reach out to chat about how you might fit in, what you're working on, and where you might contribute.
- ContactForm (see §5)

**Newsletter** — dark card.

- Eyebrow `Newsletter`
- H2 Stay close to what we're *making*.
- NewsletterForm (see §5)

---

## 4. Visual language

### Color tokens

Defined in `app/(frontend)/globals.css` under `@theme` (Tailwind v4 CSS-first):

| Token | Hex | Use |
|---|---|---|
| `background` | `#f5f2ec` | Body |
| `foreground` | `#14110d` | Body text, dark CTA blocks |
| `muted` | `#6b6358` | Secondary text |
| `muted-foreground` | `#8a8275` | Tertiary marks |
| `border` | `#e0d9cb` | Hairlines |
| `surface` | `#ebe6dc` | Subtle fills |
| `card` | `#ffffff` | Card surfaces |
| `accent` | `#ff5722` | Italic emphasis, hover, brand dot, status |
| `accent-foreground` | `#ffffff` | Text on accent |

Selection uses accent on accent-foreground. A subtle SVG noise grain (~4.5%) overlays the whole frontend via `body::before`.

### Type

- Display + sans: **Satoshi** (loaded via Fontshare CDN), with `font-feature-settings: "ss01", "cv11"`
- Headings: tight (`leading-[0.95]`–`1.05`), letter-spacing `-0.02em`, `text-wrap: balance`
- Body: `text-wrap: pretty`
- Italic accent words use `italic text-accent`

### Motion

- **Smooth scroll** — Lenis (`components/providers/smooth-scroll.tsx`)
- **Reveal** — staggered fade-in-up on scroll (`components/motion/reveal.tsx`); use `delay` to step children
- **Hero animation** — per-character entry of the slogan (`animated-slogan.tsx`)
- **Marquee** — infinite horizontal scroll, 40s loop
- **Magnetic** — primary CTA pulls toward cursor
- **Cursor follower** — soft custom cursor on the frontend
- All decorative animations are silenced under `@media (prefers-reduced-motion: reduce)`.

### Numbered section labels

Editorial micro-headings — uppercase, letter-spacing `0.2em`, `text-muted`, prefixed with a zero-padded number (`001 /`, `002 /`, …). Used on the home page sections and on portfolio detail subsections. Keep them; they carry the visual identity.

---

## 5. Forms

Both forms validate with Zod (`lib/schemas.ts`), submit JSON, and write to Payload + notify via Resend in parallel (`Promise.allSettled` — one success = 200). Both include a hidden `website` honeypot field.

### Contact form — `POST /api/contact`

| Field | Type | Notes |
|---|---|---|
| `name` | text, 1–100 chars | required |
| `email` | email | required |
| `role` | text, 1–200 chars | required, e.g. "Designer", "Student" |
| `motivation` | textarea, 10–2000 chars | required |
| `interests` | multi-select, ≥1 | options below |
| `links` | text, ≤500 chars | optional |
| `website` | hidden | honeypot — non-empty silently 200s |

Interest options: *Building apps & products · Research & exploration · Design & storytelling · Community organizing · Writing & thinking · Other.*

On success: writes a `contact-submissions` row (status `new`) and emails `CONTACT_TO_EMAIL` from `CONTACT_FROM_EMAIL` (default `NovaWerk <info@novawerk.io>`), with `replyTo` set to the submitter.

### Newsletter form — `POST /api/newsletter`

Single field: `email`. Idempotent — re-subscribing flips `subscribed` back to true if previously unsubscribed (soft-unsubscribe; we never delete rows). Notifies `CONTACT_TO_EMAIL`.

---

## 6. Editorial → CMS mapping

What's hardcoded in pages vs. what's editable in `/admin`:

| Lives in code | Lives in Payload |
|---|---|
| Manifesto + slogan + numbered section copy | Blog posts (`blog-posts`) |
| About page principles + how-we-operate | Portfolio items (`portfolio-items`) |
| Community page involvement grid | Team members (`team-members`) |
| Form labels, validation messages | Inbound submissions (`contact-submissions`, `newsletter-subscribers`) |
| Header/Footer nav, theme tokens | Media uploads (`media`) |

Anything that needs frequent editing should move to Payload; anything that's part of the brand stays in code so it survives content edits.
