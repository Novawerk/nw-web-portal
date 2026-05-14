import { cn } from "@/lib/utils";

interface NovaStarProps {
  size?: number;
  className?: string;
  spin?: boolean;
  fill?: string;
  coreFill?: string;
  noCore?: boolean;
}

export function NovaStar({
  size = 22,
  className,
  spin = false,
  fill = "currentColor",
  coreFill = "var(--color-accent-core)",
  noCore = false,
}: NovaStarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn(spin && "animate-nw-spin", className)}
      aria-hidden="true"
    >
      <path
        d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z"
        fill={fill}
      />
      {!noCore && (
        <path
          d="M50 36 L51.4 48.6 L64 50 L51.4 51.4 L50 64 L48.6 51.4 L36 50 L48.6 48.6 Z"
          fill={coreFill}
        />
      )}
    </svg>
  );
}
