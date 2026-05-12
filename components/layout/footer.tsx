import Link from "next/link";

const sitemap = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/community", label: "AI-Native Community" },
];

const community = [
  { label: "Discord", href: "#" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Xiaohongshu", href: "#" },
  { label: "Newsletter", href: "#join" },
];

const contact = [
  { label: "info@novawerk.io", href: "mailto:info@novawerk.io" },
  { label: "Volunteer with us", href: "#join" },
  { label: "Partners / sponsors", href: "#join" },
  { label: "Press inquiries", href: "mailto:info@novawerk.io" },
];

export function Footer() {
  return (
    <footer className="mt-16 bg-foreground px-6 pb-7 pt-20 text-background md:px-10 md:pt-24 lg:px-20">
      <div className="grid grid-cols-1 gap-10 border-b border-background/15 pb-14 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-5xl font-bold leading-[0.95] tracking-[-0.04em] md:text-7xl lg:text-[96px]">
            Turn ideas
            <br />
            into{" "}
            <span className="font-serif italic font-normal text-accent">
              real change
            </span>
            .
          </p>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-background/70">
            Novawerk is an open, non-profit community where people validate
            ideas together, build with each other, pick up real skills, and
            push things that matter to the next step.
          </p>
        </div>

        <FooterColumn title="Sitemap" items={sitemap} />
        <FooterColumn title="Community" items={community} />
        <FooterColumn title="Contact" items={contact} />
      </div>

      <div className="flex flex-col gap-3 pt-6 font-mono text-[11px] uppercase tracking-[0.06em] text-background/55 md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} Novawerk · Non-profit community</span>
        <span>Built by the community · Not for profit, for purpose.</span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <h5 className="mb-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-background/55">
        {title}
      </h5>
      <ul className="flex flex-col gap-2 text-sm">
        {items.map((it) => (
          <li key={it.label}>
            <Link href={it.href} className="link-underline">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
