import { cn } from "@/lib/utils";

interface EyebrowProps {
  letter?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "dark";
}

export function Eyebrow({
  letter,
  children,
  className,
  tone = "default",
}: EyebrowProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.08em]",
        tone === "dark" ? "text-background/60" : "text-muted",
        className,
      )}
    >
      <span className="size-2 rounded-full bg-accent" />
      {letter ? `[${letter}] ` : ""}
      {children}
    </div>
  );
}
