import type { ResumeContent } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

type ResumeSectionProps = {
  title: string;
  content: ResumeContent;
};

export function ResumeSection({ title, content }: ResumeSectionProps) {
  return (
    <Section id="resume" className="bg-surface">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-10">
        <div>
          <h2 className="text-[length:var(--text-xl)] tracking-[var(--tracking-tight)]">
            {title}
          </h2>
          <p className="mt-4 text-muted">{content.intro}</p>
          {content.tools?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {content.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[0.6875rem] tracking-[0.08em] text-muted uppercase"
                >
                  {tool}
                </span>
              ))}
            </div>
          ) : null}
          <div className="mt-6 sm:mt-8">
            <Button href={content.pdfPath} download className="w-full sm:w-auto">
              {content.downloadLabel}
            </Button>
          </div>
        </div>
        <ul className="space-y-4 border-t border-border pt-6 sm:pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          {content.highlights.map((highlight) => (
            <li
              key={highlight}
              className="relative pl-5 text-sm leading-[var(--leading-snug)] text-muted before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-foreground"
            >
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
