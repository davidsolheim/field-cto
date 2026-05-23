import type { ExperienceContent } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

type ExperienceSectionProps = {
  title: string;
  intro: string;
  content: ExperienceContent;
};

export function ExperienceSection({ title, intro, content }: ExperienceSectionProps) {
  return (
    <Section id="experience">
      <div className="max-w-3xl">
        <h2 className="text-[length:var(--text-xl)] tracking-[var(--tracking-tight)]">
          {title}
        </h2>
        <p className="mt-4 text-muted">{intro}</p>
      </div>
      <div className="mt-10 grid gap-4">
        {content.roles.map((role) => (
          <Card key={`${role.company}-${role.dates}`}>
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-lg font-medium tracking-[var(--tracking-normal)]">
                  {role.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {role.company} · {role.location}
                </p>
              </div>
              <span className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
                {role.dates}
              </span>
            </div>
            <ul className="mt-5 space-y-3">
              {role.bullets.map((bullet) => (
                <li
                  key={bullet.slice(0, 40)}
                  className="relative pl-5 text-sm leading-[var(--leading-snug)] text-muted before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-foreground"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
