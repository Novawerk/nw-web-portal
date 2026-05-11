"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";

export interface BlogListPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  author?: string;
  content: string;
}

interface BlogListProps {
  posts: BlogListPost[];
}

const PAD_X = "px-7 md:px-12 lg:px-20";

function readTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function BlogList({ posts }: BlogListProps) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.tags?.[0]) set.add(p.tags[0]);
    });
    return ["All", ...Array.from(set).sort()];
  }, [posts]);

  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? posts
      : posts.filter((p) => p.tags?.[0] === active);

  return (
    <>
      <div
        className={cn(
          "flex flex-wrap gap-2 border-b border-border py-7",
          PAD_X,
        )}
      >
        {categories.map((c) => {
          const count =
            c === "All"
              ? posts.length
              : posts.filter((p) => p.tags?.[0] === c).length;
          const isActive = active === c;
          return (
            <button
              key={c}
              aria-pressed={isActive}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors",
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-[var(--color-border-strong)] text-foreground/70 hover:text-foreground",
              )}
            >
              {c}
              {c !== "All" && (
                <span className="ml-2 opacity-50">{count}</span>
              )}
            </button>
          );
        })}
      </div>

      <div
        className={cn("grid grid-cols-1 gap-9 md:grid-cols-3", PAD_X)}
        style={{
          paddingTop: "clamp(56px, 6vw, 96px)",
          paddingBottom: "clamp(56px, 6vw, 96px)",
        }}
      >
        {filtered.map((p) => (
          <article key={p.slug} className="flex flex-col gap-3 border-t border-foreground pt-4">
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
              <span className="text-accent">{p.tags?.[0] ?? "Note"}</span>
              <span>{formatDate(p.date)}</span>
            </div>
            <Link
              href={`/blog/${p.slug}`}
              className="link-underline"
              style={{ backgroundSize: "0 1px" }}
            >
              <h3 className="m-0 font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.02em]">
                {p.title}
              </h3>
            </Link>
            {p.excerpt && (
              <p className="m-0 text-sm leading-[1.6] text-foreground/85">
                {p.excerpt}
              </p>
            )}
            <div className="mt-auto pt-2 font-mono text-[11px] uppercase tracking-[0.04em] text-muted">
              {p.author ?? "Novawerk"} · {readTime(p.content)} min
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
            No posts in this category yet.
          </p>
        )}
      </div>
    </>
  );
}
