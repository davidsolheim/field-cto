import Image from "next/image";
import type { ResumeContent, SiteContent } from "@/lib/content";
import { CursorLogo } from "@/components/brand/CursorLogo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVideo } from "@/components/sections/HeroVideo";

type HeroSectionProps = {
  site: SiteContent;
  resume: ResumeContent;
};

export function HeroSection({ site, resume }: HeroSectionProps) {
  const heroVideo = site.heroVideo;

  return (
    <section
      id="hero"
      className="hero-section relative scroll-mt-[var(--header-height)] overflow-hidden border-b border-border"
    >
      <div aria-hidden className="hero-section-backdrop pointer-events-none absolute inset-0" />

      <Container className="relative">
        <div className="hero-section-intro pt-[calc(var(--section-space)*0.7)] pb-10 sm:pb-12 lg:pb-14">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
              <CursorLogo
                variant="lockup-horizontal"
                className="h-5 w-auto max-w-[min(100%,14rem)] sm:h-6 sm:max-w-none"
              />
              <span aria-hidden className="hidden text-sm text-muted-foreground sm:inline">
                +
              </span>
              <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase sm:text-xs sm:tracking-[0.18em]">
                {site.title}
              </p>
            </div>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface-elevated/60 px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase backdrop-blur-sm sm:text-xs">
              <span aria-hidden className="status-dot" />
              Available · US Remote · Idaho
            </p>
          </div>

          <h1 className="hero-section-headline mt-7 max-w-[14ch] text-[length:var(--text-display)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-balance sm:mt-9 sm:max-w-4xl">
            {site.headline}
          </h1>
        </div>

        {heroVideo ? (
          <HeroVideo video={heroVideo} />
        ) : (
          <div className="mx-auto w-full max-w-md">
            <Image
              src={site.headshot}
              alt={`Portrait of ${site.name}`}
              width={320}
              height={320}
              priority
              className="aspect-square w-full rounded-2xl border border-border object-cover object-top shadow-[var(--shadow-elevated)]"
            />
          </div>
        )}

        <div className="hero-section-footer py-[calc(var(--section-space)*0.75)] sm:py-[calc(var(--section-space)*0.85)]">
          <div aria-hidden className="section-heading-rule" />
          <div className="mt-8 grid gap-10 sm:mt-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:items-start lg:gap-14">
            <div className="flex flex-col gap-3 font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase sm:text-xs">
              <p>
                <span className="text-foreground">{site.name}</span>
                <span aria-hidden className="mx-2 text-muted-foreground">
                  /
                </span>
                Founder, Teton Web
              </p>
              <p>Cursor power user · Multi-agent operator</p>
            </div>

            <div>
              <p className="text-[length:var(--text-lead)] leading-[var(--leading-snug)] text-foreground/90 text-balance">
                {site.subheadline}
              </p>

              <div className="mt-8 flex flex-col gap-5 sm:mt-10">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button href={site.ctas.resume.href} className="w-full sm:w-auto">
                    {site.ctas.resume.label}
                  </Button>
                  <Button
                    href={site.ctas.conversation.href}
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    {site.ctas.conversation.label}
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <Button href={site.ctas.experience.href} variant="ghost" className="px-0">
                    {site.ctas.experience.label}
                  </Button>
                  <span aria-hidden className="hidden text-muted-foreground sm:inline">
                    ·
                  </span>
                  <Button href={resume.pdfPath} variant="ghost" download className="px-0">
                    {resume.downloadLabel}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between gap-4 sm:mt-16">
            <a
              href="#about"
              className="group inline-flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.22em] text-muted uppercase transition-colors duration-[var(--duration-fast)] hover:text-foreground sm:text-xs"
              aria-label="Scroll to About section"
            >
              <span aria-hidden className="scroll-cue" />
              Scroll
            </a>
            <p className="hidden font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase sm:inline-block sm:text-xs">
              01 / 06 — Introduction
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
