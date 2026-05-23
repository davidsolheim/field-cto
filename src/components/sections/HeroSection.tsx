import Image from "next/image";
import type { ResumeContent, SiteContent } from "@/lib/content";
import { CursorLogo } from "@/components/brand/CursorLogo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type HeroSectionProps = {
  site: SiteContent;
  resume: ResumeContent;
};

export function HeroSection({ site, resume }: HeroSectionProps) {
  const heroVideo = site.heroVideo;

  return (
    <section
      id="hero"
      className="relative scroll-mt-[var(--header-height)] overflow-hidden border-b border-border py-[calc(var(--section-space)+0.5rem)] sm:py-[calc(var(--section-space)+1rem)]"
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
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_min(100%,22rem)] lg:items-start lg:gap-14">
          <div className="order-2 lg:order-1">
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mb-6 sm:gap-x-4 sm:gap-y-3">
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
            <h1 className="max-w-4xl text-[length:var(--text-display)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-balance">
              {site.headline}
            </h1>
            <p className="mt-4 max-w-2xl text-[length:var(--text-lg)] leading-[var(--leading-snug)] text-muted sm:mt-6">
              {site.subheadline}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:flex sm:flex-wrap">
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
              <Button href={site.ctas.experience.href} variant="ghost" className="w-full sm:w-auto">
                {site.ctas.experience.label}
              </Button>
              <Button href={resume.pdfPath} variant="ghost" download className="w-full sm:w-auto">
                {resume.downloadLabel}
              </Button>
            </div>
          </div>

          <div className="order-1 mx-auto w-full max-w-[min(100%,22rem)] lg:order-2 lg:mx-0 lg:max-w-none">
            {heroVideo ? (
              <video
                src={heroVideo.src}
                poster={heroVideo.poster}
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-elevated)]"
                aria-label={heroVideo.label}
              />
            ) : (
              <Image
                src={site.headshot}
                alt={`Portrait of ${site.name}`}
                width={320}
                height={320}
                priority
                className="aspect-square w-full rounded-2xl border border-border object-cover object-top shadow-[var(--shadow-elevated)]"
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
