import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type AboutSectionProps = {
  title: string;
  content: string;
};

function renderInlineMarkdown(text: string): ReactNode[] {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const [, label, href] = match;
    const isExternal = /^https?:\/\//.test(href);

    nodes.push(
      <a
        key={`md-link-${key++}`}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="text-foreground border-b border-foreground/30 transition-colors duration-[var(--duration-fast)] hover:border-foreground"
      >
        {label}
      </a>,
    );

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function AboutSection({ title, content }: AboutSectionProps) {
  const paragraphs = content.split("\n\n").filter(Boolean);
  const [lead, ...rest] = paragraphs;

  return (
    <Section id="about">
      <SectionHeading number="02" title={title} meta="Field CTO · AI Adoption" />

      <div className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
        <div className="space-y-6 text-muted sm:space-y-7">
          {lead ? (
            <p className="lead-paragraph text-[length:var(--text-lead)] leading-[var(--leading-snug)] text-foreground/90 text-balance sm:pl-6">
              {renderInlineMarkdown(lead)}
            </p>
          ) : null}
          {rest.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="leading-[var(--leading-normal)] sm:pl-6"
            >
              {renderInlineMarkdown(paragraph)}
            </p>
          ))}
        </div>

        <aside className="lg:pl-8 lg:border-l lg:border-border">
          <dl className="space-y-6">
            <div>
              <dt className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
                Based in
              </dt>
              <dd className="mt-2 text-foreground">Idaho Falls, Idaho</dd>
              <p className="mt-1 text-sm text-muted">US Remote · Open to strategic travel</p>
            </div>
            <div>
              <dt className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
                Open to
              </dt>
              <dd className="mt-2 text-foreground">Field CTO &amp; AI Adoption roles</dd>
              <p className="mt-1 text-sm text-muted">
                Cursor and adjacent dev-tool companies
              </p>
            </div>
            <div>
              <dt className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
                On the web
              </dt>
              <dd className="mt-2 text-foreground">
                <a
                  href="https://x.com/davidtsolheim"
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-foreground/30 transition-colors duration-[var(--duration-fast)] hover:border-foreground"
                >
                  @davidtsolheim
                </a>
              </dd>
              <p className="mt-1 text-sm text-muted">
                Cursor workflows, agent breakthroughs, the AI coding singularity
              </p>
            </div>
          </dl>
        </aside>
      </div>
    </Section>
  );
}
