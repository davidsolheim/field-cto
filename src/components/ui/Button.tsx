import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  download?: boolean;
};

const variants = {
  primary:
    "border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground",
  secondary:
    "border border-border bg-surface-elevated text-foreground hover:border-foreground",
  ghost: "border border-transparent text-foreground hover:border-border",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  download,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium tracking-[var(--tracking-normal)] transition-[background-color,border-color,color,transform] duration-[var(--duration-base)] ease-[var(--ease-out)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring ${variants[variant]} ${className}`;

  if (download) {
    return (
      <a href={href} download className={classes}>
        {children}
      </a>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
