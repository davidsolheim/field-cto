import type { CaseStudy } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

type WorkSectionProps = {
  title: string;
  caseStudies: CaseStudy[];
};

function renderBody(body: string) {
  return body.split("\n\n").map((block) => {
    const boldMatch = block.match(/^\*\*(.+?):\*\*\s*(.+)$/);
    if (boldMatch) {
      return (
        <p key={block.slice(0, 20)} className="text-sm leading-[var(--leading-snug)] text-muted">
          <span className="font-medium text-foreground">{boldMatch[1]}:</span>{" "}
          {boldMatch[2]}
        </p>
      );
    }
    return (
      <p key={block.slice(0, 20)} className="text-sm leading-[var(--leading-snug)] text-muted">
        {block}
      </p>
    );
  });
}

export function WorkSection({ title, caseStudies }: WorkSectionProps) {
  return (
    <Section id="work">
      <div className="max-w-3xl">
        <h2 className="text-[length:var(--text-xl)] tracking-[var(--tracking-tight)]">
          {title}
        </h2>
        <p className="mt-4 text-muted">
          Selected engagements focused on AI adoption, platform delivery, and measurable engineering outcomes.
        </p>
      </div>
      <div className="mt-10 grid gap-4">
        {caseStudies.map((study) => (
          <Card key={study.slug}>
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-lg font-medium tracking-[var(--tracking-normal)]">
                  {study.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{study.tagline}</p>
              </div>
              <span className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
                Case Study
              </span>
            </div>
            <div className="mt-5 space-y-3">{renderBody(study.body)}</div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
