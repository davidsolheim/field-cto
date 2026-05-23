import type { ExperienceContent } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ExperienceSectionProps = {
  title: string;
  intro: string;
  content: ExperienceContent;
};

function isCurrent(dates: string): boolean {
  return /present/i.test(dates);
}

export function ExperienceSection({ title, intro, content }: ExperienceSectionProps) {
  return (
    <Section id="experience">
      <SectionHeading
        number="04"
        title={title}
        intro={intro}
        meta={`${content.roles.length.toString().padStart(2, "0")} roles`}
      />

      <ol className="timeline mt-12 space-y-12 pl-7 sm:mt-16 sm:space-y-16 sm:pl-10">
        {content.roles.map((role) => {
          const current = isCurrent(role.dates);
          return (
            <li
              key={`${role.company}-${role.dates}`}
              className="relative"
            >
              <span
                aria-hidden
                className="timeline-marker"
                data-current={current ? "true" : "false"}
                style={{ left: "-1.5rem" }}
              />

              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[length:var(--text-xl)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)]">
                      {role.title}
                    </h3>
                    {current ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/30 px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.18em] text-foreground uppercase">
                        <span aria-hidden className="status-dot size-1.5" />
                        Now
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-muted">
                    <span className="text-foreground">{role.company}</span>
                    <span aria-hidden className="mx-2 text-muted-foreground">
                      ·
                    </span>
                    {role.location}
                  </p>
                </div>
                <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase md:shrink-0 md:text-xs">
                  {role.dates}
                </span>
              </div>

              <ul className="mt-6 space-y-4 sm:mt-7">
                {role.bullets.map((bullet) => (
                  <li
                    key={bullet.slice(0, 40)}
                    className="relative pl-5 leading-[var(--leading-snug)] text-muted before:absolute before:left-0 before:top-[0.75em] before:h-px before:w-3 before:bg-foreground/70"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
