import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  separatorClassName?: string;
}

export function Marquee({
  items,
  className,
  separatorClassName,
}: MarqueeProps) {
  const renderRow = (keyPrefix: string) => (
    <ul
      className="flex shrink-0 items-center"
      {...(keyPrefix === "b" ? { "aria-hidden": true } : {})}
    >
      {items.map((item, i) => (
        <li
          key={`${keyPrefix}-${i}`}
          className="inline-flex items-center gap-10 px-10 md:gap-14 md:px-14"
        >
          <span className="font-display font-medium uppercase tracking-tight text-3xl md:text-6xl">
            {item}
          </span>
          <span
            className={cn(
              "text-accent text-3xl md:text-6xl leading-none",
              separatorClassName,
            )}
          >
            ·
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn("overflow-hidden border-y border-border/60", className)}
    >
      <div className="flex animate-marquee whitespace-nowrap py-8 md:py-10">
        {renderRow("a")}
        {renderRow("b")}
      </div>
    </div>
  );
}
