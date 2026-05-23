import type { ContactContent } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";

type ContactSectionProps = {
  content: ContactContent;
};

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <Section id="contact">
      <SectionHeading
        number="06"
        title={content.title}
        intro={content.intro}
        meta="Replies within 48h"
      />

      <div className="mt-12 grid gap-12 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
        <aside className="space-y-8">
          <p className="text-[length:var(--text-lg)] leading-[var(--leading-snug)] text-muted">
            {content.supporting}
          </p>

          <dl className="space-y-5 border-t border-border pt-6">
            <div>
              <dt className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
                Direct
              </dt>
              <dd className="mt-1.5">
                <a
                  href="mailto:dts@davidsolheim.com"
                  className="text-foreground border-b border-foreground/30 transition-colors duration-[var(--duration-fast)] hover:border-foreground"
                >
                  dts@davidsolheim.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
                Public channel
              </dt>
              <dd className="mt-1.5">
                <a
                  href="https://x.com/davidtsolheim"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground border-b border-foreground/30 transition-colors duration-[var(--duration-fast)] hover:border-foreground"
                >
                  @davidtsolheim
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
                Time zone
              </dt>
              <dd className="mt-1.5 text-foreground">Mountain (UTC−7)</dd>
            </div>
          </dl>

          <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
            — David
          </p>
        </aside>

        <ContactForm content={content} />
      </div>
    </Section>
  );
}
