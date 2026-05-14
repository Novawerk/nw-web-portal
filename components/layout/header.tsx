"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", num: "01" },
  { href: "/portfolio", label: "Portfolio", num: "02" },
  { href: "/blog", label: "Blog", num: "03" },
  { href: "/community", label: "AI-Native", num: "04" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname() ?? "/";

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between border-b border-border px-6 py-[18px] backdrop-blur-xl md:px-10 lg:px-20"
      style={{
        background:
          "color-mix(in srgb, var(--color-background) 92%, transparent)",
      }}
    >
      <Link href="/" className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/nova-star-horizontal.svg"
          alt="Novawerk"
          width={120}
          height={31}
          className="h-7 w-auto select-none"
          draggable={false}
        />
        <span className="ml-1 hidden font-mono text-[11px] uppercase tracking-[0.08em] text-mute md:inline">
          ⌐ Community · Est. 2025
        </span>
      </Link>

      <nav className="hidden items-center gap-1 rounded-full border border-border bg-surface p-1 md:flex">
        {tabs.map((t) => {
          const active = isActive(pathname, t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-2 font-mono text-[12px] uppercase tracking-[0.06em] transition-colors",
                active
                  ? "bg-foreground text-background"
                  : "text-foreground/70 hover:text-foreground",
              )}
            >
              <span className="mr-1.5 opacity-50">{t.num}</span>
              {t.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="#join"
        className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.06em] text-background transition-colors hover:border-accent hover:bg-accent"
      >
        Join us
        <ArrowRight className="size-3.5" />
      </Link>
    </header>
  );
}
