import type { ReactNode } from "react";

type SectionHeadingProps = {
  number: string;
  title: string;
  intro?: string;
  meta?: ReactNode;
};

export function SectionHeading({ number, title, intro, meta }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <span
          aria-hidden
          className="card-number font-mono text-sm tracking-[0.16em] text-muted-foreground sm:text-base"
        >
          {number}
        </span>
        {meta ? (
          <div className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase sm:text-xs">
            {meta}
          </div>
        ) : null}
      </div>

      <div aria-hidden className="section-heading-rule mt-5 sm:mt-6" />

      <div className="mt-8 sm:mt-10">
        <h2 className="text-[length:var(--text-section)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-balance">
          {title}
        </h2>
        {intro ? (
          <p className="mt-5 max-w-2xl text-[length:var(--text-lg)] leading-[var(--leading-snug)] text-muted sm:mt-6">
            {intro}
          </p>
        ) : null}
      </div>
    </header>
  );
}
