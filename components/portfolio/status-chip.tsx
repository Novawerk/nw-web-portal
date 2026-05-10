import { cn } from "@/lib/utils";

type DbStatus = "planning" | "building" | "launching" | "launched" | "archived";

const MAPPING: Record<
  DbStatus,
  { label: string; classes: string; designKey: string }
> = {
  planning: {
    label: "Concept",
    designKey: "concept",
    classes: "bg-surface text-foreground border border-[var(--color-border-strong)]",
  },
  building: {
    label: "Building",
    designKey: "building",
    classes: "bg-accent text-background",
  },
  launching: {
    label: "MVP",
    designKey: "mvp",
    classes: "bg-[var(--color-blue)] text-background",
  },
  launched: {
    label: "Live",
    designKey: "live",
    classes: "bg-[var(--color-accent-deep)] text-background",
  },
  archived: {
    label: "Archived",
    designKey: "paused",
    classes: "bg-surface text-muted",
  },
};

export const STATUS_GROUP_ORDER: DbStatus[] = [
  "building",
  "launching",
  "launched",
  "planning",
  "archived",
];

export function statusLabel(status: string): string {
  return MAPPING[status as DbStatus]?.label ?? status;
}

export function statusGroupKey(status: string): string {
  return MAPPING[status as DbStatus]?.designKey ?? status;
}

export function StatusChip({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const m = MAPPING[status as DbStatus];
  if (!m) return null;
  return (
    <span
      data-s={m.designKey}
      className={cn(
        "inline-block rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em]",
        m.classes,
        className,
      )}
    >
      {m.label}
    </span>
  );
}
