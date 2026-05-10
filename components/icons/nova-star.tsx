import { cn } from "@/lib/utils";

interface NovaStarProps {
  size?: number;
  className?: string;
  spin?: boolean;
  fill?: string;
}

export function NovaStar({
  size = 22,
  className,
  spin = false,
  fill = "currentColor",
}: NovaStarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn(spin && "animate-nw-spin", className)}
      fill={fill}
      aria-hidden="true"
    >
      <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
    </svg>
  );
}
