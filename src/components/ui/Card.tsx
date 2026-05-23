import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface-elevated p-4 shadow-[var(--shadow-elevated)] transition-[border-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:border-foreground/30 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}
