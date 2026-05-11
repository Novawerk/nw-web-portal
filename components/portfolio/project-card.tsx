import Link from "next/link";
import Image from "next/image";
import { NovaStar } from "@/components/icons/nova-star";
import type { PortfolioItem } from "@/lib/portfolio";

const STATUS_COLOR: Record<string, string> = {
  building: "var(--color-accent)",
  launching: "var(--color-blue)",
  launched: "var(--color-accent-deep)",
  planning: "var(--color-foreground)",
  archived: "var(--color-foreground-soft)",
};

function assetId(index: number) {
  return `PF-${String(index + 1).padStart(3, "0")}`;
}

export function ProjectCard({
  project,
  index,
}: {
  project: PortfolioItem;
  index: number;
}) {
  const color = STATUS_COLOR[project.status] ?? "var(--color-foreground)";
  const lead = project.members?.[0]?.name ?? "Community-led";
  const category = project.tag.split("·")[0]?.trim() || project.tag;
  const year = project.tag.match(/(20\d{2}.*)$/)?.[1]?.trim() ?? "";

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex flex-col gap-3.5"
    >
      <div
        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md border border-border transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
        style={{ background: color }}
      >
        {project.coverImageUrl ? (
          <Image
            src={project.coverImageUrl}
            alt={project.coverImageAlt ?? project.title}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <NovaStar size={56} fill="rgba(255,255,255,0.22)" />
        )}
        <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.1em] text-white/70 mix-blend-luminosity">
          {assetId(index)}
        </span>
        {year && (
          <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.1em] text-white/70 mix-blend-luminosity">
            {year}
          </span>
        )}
      </div>
      <div>
        <h3 className="m-0 font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.02em]">
          {project.title}
        </h3>
        {project.tagline && (
          <p className="mt-1 text-sm leading-[1.5] text-foreground/85">
            {project.tagline}
          </p>
        )}
        <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
          <span>{category}</span>
          <span>{lead}</span>
        </div>
      </div>
    </Link>
  );
}
