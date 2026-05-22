import type { ResumeContent, SiteContent } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type HeroSectionProps = {
  site: SiteContent;
  resume: ResumeContent;
};

export function HeroSection({ site, resume }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative scroll-mt-[var(--header-height)] overflow-hidden border-b border-border py-[calc(var(--section-space)+1rem)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at top, black, transparent 70%)",
        }}
      />
      <Container className="relative">
        <p className="mb-6 font-mono text-xs tracking-[0.18em] text-muted uppercase">
          {site.title}
        </p>
        <h1
          className="max-w-4xl text-[length:var(--text-display)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-balance"
        >
          {site.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-[length:var(--text-lg)] leading-[var(--leading-snug)] text-muted">
          {site.subheadline}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={site.ctas.resume.href}>{site.ctas.resume.label}</Button>
          <Button href={site.ctas.conversation.href} variant="secondary">
            {site.ctas.conversation.label}
          </Button>
          <Button href={site.ctas.work.href} variant="ghost">
            {site.ctas.work.label}
          </Button>
          <Button href={resume.pdfPath} variant="ghost" download>
            {resume.downloadLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
