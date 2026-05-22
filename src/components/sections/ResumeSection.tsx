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
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div>
          <h2 className="text-[length:var(--text-xl)] tracking-[var(--tracking-tight)]">
            {title}
          </h2>
          <p className="mt-4 text-muted">{content.intro}</p>
          <div className="mt-8">
            <Button href={content.pdfPath} download>
              {content.downloadLabel}
            </Button>
          </div>
        </div>
        <ul className="space-y-4 border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
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
