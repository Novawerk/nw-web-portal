import Link from "next/link";
import { Container } from "./container";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/community", label: "Community" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-accent transition-transform group-hover:scale-125" />
            <span className="font-display text-xl tracking-tight">
              NovaWerk
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm md:flex">
            {nav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent"
          >
            Join Us
          </Link>
        </div>
      </Container>
    </header>
  );
}
