import { Section } from "@/components/ui/Section";

type AboutSectionProps = {
  title: string;
  content: string;
};

export function AboutSection({ title, content }: AboutSectionProps) {
  const paragraphs = content.split("\n\n").filter(Boolean);

  return (
    <Section id="about">
      <div className="max-w-3xl">
        <h2 className="text-[length:var(--text-xl)] tracking-[var(--tracking-tight)]">
          {title}
        </h2>
        <div className="mt-8 space-y-5 text-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
