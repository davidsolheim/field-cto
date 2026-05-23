import type { ResumeContent } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ResumeSectionProps = {
  title: string;
  content: ResumeContent;
};

export function ResumeSection({ title, content }: ResumeSectionProps) {
  return (
    <Section id="resume" className="bg-surface">
      <SectionHeading
        number="05"
        title={title}
        intro={content.intro}
        meta="PDF · 1 page"
      />

      <div className="mt-12 grid gap-12 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-start lg:gap-16">
        <div className="space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={content.pdfPath} download className="w-full sm:w-auto">
              {content.downloadLabel}
            </Button>
            {content.coverLetterPdfPath && content.coverLetterDownloadLabel ? (
              <Button
                href={content.coverLetterPdfPath}
                variant="secondary"
                download
                className="w-full sm:w-auto"
              >
                {content.coverLetterDownloadLabel}
              </Button>
            ) : null}
          </div>

          {content.tools?.length ? (
            <div>
              <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase sm:text-xs">
                Tools in production rotation
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {content.tools.map((tool) => (
                  <li key={tool}>
                    <span className="tool-chip inline-flex items-center rounded-full border border-border px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.08em] text-muted uppercase">
                      {tool}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <ol className="space-y-0 border-t border-border lg:border-t-0 lg:border-l lg:pl-10">
          {content.highlights.map((highlight, index) => {
            const number = (index + 1).toString().padStart(2, "0");
            return (
              <li
                key={highlight}
                className="flex gap-5 border-b border-border py-6 last:border-b-0 sm:gap-6 sm:py-7"
              >
                <span
                  aria-hidden
                  className="card-number shrink-0 font-mono text-sm tracking-[0.16em] text-muted-foreground sm:text-base"
                >
                  {number}
                </span>
                <p className="leading-[var(--leading-snug)] text-muted">{highlight}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
