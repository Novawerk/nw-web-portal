import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className }: MarqueeProps) {
  // Triple the items so the loop never visibly repeats end-to-end.
  const renderRow = (keyPrefix: string, hidden = false) => (
    <ul
      className="flex shrink-0 items-center gap-[60px] pr-[60px]"
      {...(hidden ? { "aria-hidden": true } : {})}
    >
      {items.map((item, i) => (
        <li
          key={`${keyPrefix}-${i}`}
          className="inline-flex items-center gap-[60px] font-display text-lg font-semibold tracking-[-0.01em]"
        >
          <span>{item}</span>
          <span className="text-sm text-accent">✺</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "flex overflow-hidden border-y border-border bg-foreground text-background",
        className,
      )}
    >
      <div className="flex animate-marquee whitespace-nowrap py-3.5">
        {renderRow("a")}
        {renderRow("b", true)}
      </div>
    </div>
  );
}
