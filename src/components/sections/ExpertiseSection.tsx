import type { ExpertiseContent } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ExpertiseSectionProps = {
  title: string;
  content: ExpertiseContent;
};

export function ExpertiseSection({ title, content }: ExpertiseSectionProps) {
  return (
    <Section id="expertise" className="bg-surface">
      <SectionHeading
        number="03"
        title={title}
        intro={content.intro}
        meta={`${content.items.length.toString().padStart(2, "0")} capabilities`}
      />

      <ul className="mt-12 grid gap-0 border-y border-border sm:mt-14 sm:grid-cols-2">
        {content.items.map((item, index) => {
          const number = (index + 1).toString().padStart(2, "0");
          const isLastInRow = index % 2 === 1;
          const isLastRow = index >= content.items.length - 2;

          return (
            <li
              key={item.title}
              className={`group relative flex flex-col gap-6 px-1 py-8 transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)] hover:bg-background/60 sm:gap-7 sm:px-6 sm:py-10 ${
                isLastInRow ? "" : "sm:border-r sm:border-border"
              } ${isLastRow ? "" : "border-b border-border"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  aria-hidden
                  className="card-number font-mono text-sm tracking-[0.16em] text-muted-foreground sm:text-base"
                >
                  {number}
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="card-arrow size-4 stroke-foreground/70 sm:size-5"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17 17 7" />
                  <path d="M9 7h8v8" />
                </svg>
              </div>

              <div>
                <h3 className="text-[length:var(--text-lg)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-balance">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-[var(--leading-snug)] text-muted sm:text-base">
                  {item.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
