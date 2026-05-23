import type { ExpertiseContent } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

type ExpertiseSectionProps = {
  title: string;
  content: ExpertiseContent;
};

export function ExpertiseSection({ title, content }: ExpertiseSectionProps) {
  return (
    <Section id="expertise" className="bg-surface">
      <div className="max-w-3xl">
        <h2 className="text-[length:var(--text-xl)] tracking-[var(--tracking-tight)]">
          {title}
        </h2>
        <p className="mt-4 text-muted">{content.intro}</p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {content.items.map((item) => (
          <Card key={item.title}>
            <h3 className="text-base font-medium tracking-[var(--tracking-normal)]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-[var(--leading-snug)] text-muted">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
