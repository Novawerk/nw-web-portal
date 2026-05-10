import Link from "next/link";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-background">
      <Container>
        <div className="flex flex-col gap-12 py-16">
          <div className="grid gap-12 md:grid-cols-2 md:items-end">
            <div>
              <p className="font-display text-4xl leading-[1.05] md:text-6xl">
                Not profitable, <br />
                <span className="italic text-accent">but meaningful.</span>
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <Link
                href="/community"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
              >
                Join NovaWerk →
              </Link>
              <p className="text-sm text-muted">
                Building meaningful impact, together.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t border-border/60 pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} NovaWerk. Built openly.</p>
            <div className="flex gap-6">
              <Link href="/about" className="hover:text-foreground">
                About
              </Link>
              <Link href="/portfolio" className="hover:text-foreground">
                Portfolio
              </Link>
              <Link href="/blog" className="hover:text-foreground">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
