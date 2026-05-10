"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./project-card";
import {
  STATUS_GROUP_ORDER,
  statusLabel,
} from "./status-chip";
import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/lib/portfolio";

const PAD_X = "px-7 md:px-12 lg:px-20";

interface Props {
  projects: PortfolioItem[];
}

export function PortfolioGrid({ projects }: Props) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      const cat = p.tag.split("·")[0]?.trim();
      if (cat) set.add(cat);
    });
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const [active, setActive] = useState("All");

  const indexedProjects = useMemo(
    () => projects.map((p, i) => ({ project: p, index: i })),
    [projects],
  );

  const filtered =
    active === "All"
      ? indexedProjects
      : indexedProjects.filter(
          ({ project }) => project.tag.split("·")[0]?.trim() === active,
        );

  return (
    <>
      <div
        className={cn(
          "sticky top-[60px] z-30 flex flex-wrap items-center justify-between gap-6 border-b border-border py-[18px] backdrop-blur-xl",
          PAD_X,
        )}
        style={{
          background:
            "color-mix(in srgb, var(--color-background) 92%, transparent)",
        }}
      >
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => {
            const count =
              c === "All"
                ? projects.length
                : projects.filter(
                    (p) => p.tag.split("·")[0]?.trim() === c,
                  ).length;
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
        <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </div>
      </div>

      {STATUS_GROUP_ORDER.map((status) => {
        const group = filtered.filter(
          ({ project }) => project.status === status,
        );
        if (!group.length) return null;
        return (
          <section
            key={status}
            className={cn("border-b border-border", PAD_X)}
            style={{ paddingTop: 56, paddingBottom: 40 }}
          >
            <div className="mb-7 flex items-baseline justify-between gap-6">
              <h2 className="m-0 font-display text-[clamp(28px,3vw,44px)] font-bold tracking-[-0.02em]">
                {statusLabel(status)}
              </h2>
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                [{String(group.length).padStart(2, "0")}]
              </div>
            </div>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {group.map(({ project, index }) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
