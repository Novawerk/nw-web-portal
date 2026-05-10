import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "accent";

const styles: Record<Variant, string> = {
  primary: "bg-foreground text-background hover:bg-accent",
  ghost: "border border-border text-foreground hover:bg-surface",
  accent: "bg-accent text-accent-foreground hover:opacity-90",
};

interface ButtonProps {
  href?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors",
    styles[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
