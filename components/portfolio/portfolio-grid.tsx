"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProjectCard } from "./project-card";
import {
  STATUS_GROUP_ORDER,
  StatusChip,
  statusLabel,
} from "./status-chip";
import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/lib/portfolio";

const PAD_X = "px-7 md:px-12 lg:px-20";

interface Props {
  projects: PortfolioItem[];
}

function deriveCategory(tag: string): string {
  return tag.split("·")[0]?.trim() || tag;
}

function deriveYear(tag: string): string {
  const m = tag.match(/(20\d{2}.*)$/);
  return m?.[1]?.trim() ?? "—";
}

function assetIdFor(idx: number) {
  return `PF-${String(idx + 1).padStart(3, "0")}`;
}

export function PortfolioGrid({ projects }: Props) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      const cat = deriveCategory(p.tag);
      if (cat) set.add(cat);
    });
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const [active, setActive] = useState("All");
  const [view, setView] = useState<"grid" | "index">("grid");

  const indexedProjects = useMemo(
    () => projects.map((p, i) => ({ project: p, index: i })),
    [projects],
  );

  const filtered =
    active === "All"
      ? indexedProjects
      : indexedProjects.filter(
          ({ project }) => deriveCategory(project.tag) === active,
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
                    (p) => deriveCategory(p.tag) === c,
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
        <div className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
          <span className="mr-1">View ·</span>
          <button
            type="button"
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
            className={cn(
              "rounded-sm border border-transparent px-2.5 py-1.5 transition-colors",
              view === "grid"
                ? "border-[var(--color-border-strong)] text-foreground"
                : "hover:text-foreground",
            )}
          >
            Grid
          </button>
          <button
            type="button"
            aria-pressed={view === "index"}
            onClick={() => setView("index")}
            className={cn(
              "rounded-sm border border-transparent px-2.5 py-1.5 transition-colors",
              view === "index"
                ? "border-[var(--color-border-strong)] text-foreground"
                : "hover:text-foreground",
            )}
          >
            Index
          </button>
        </div>
      </div>

      {view === "grid" ? (
        STATUS_GROUP_ORDER.map((status) => {
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
        })
      ) : (
        <section className={cn(PAD_X, "py-10")}>
          <table className="nw-pf-table">
            <thead>
              <tr>
                <th style={{ width: 80 }}>No.</th>
                <th>Project</th>
                <th style={{ width: 130 }}>Category</th>
                <th style={{ width: 130 }}>Status</th>
                <th style={{ width: 200 }}>Lead</th>
                <th style={{ width: 90 }}>Year</th>
                <th style={{ width: 60, textAlign: "right" }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(({ project, index }) => {
                const cat = deriveCategory(project.tag);
                const year = deriveYear(project.tag);
                const lead =
                  project.members?.[0]?.name ?? "Community-led";
                return (
                  <tr
                    key={project.slug}
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.location.href = `/portfolio/${project.slug}`;
                      }
                    }}
                  >
                    <td>{assetIdFor(index)}</td>
                    <td>
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="nw-pf-table__title">
                          {project.title}
                        </div>
                        {project.tagline && (
                          <div className="mt-1 text-muted">
                            {project.tagline}
                          </div>
                        )}
                      </Link>
                    </td>
                    <td>{cat}</td>
                    <td>
                      <StatusChip status={project.status} />
                    </td>
                    <td>{lead}</td>
                    <td>{year}</td>
                    <td style={{ textAlign: "right" }}>→</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}
