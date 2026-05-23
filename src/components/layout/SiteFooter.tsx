import type { SiteContent } from "@/lib/content";
import { CursorLogo } from "@/components/brand/CursorLogo";
import { Container } from "@/components/ui/Container";

type SiteFooterProps = {
  site: SiteContent;
};

export function SiteFooter({ site }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-surface">
      <Container>
        <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="space-y-5">
            <CursorLogo
              variant="lockup-horizontal"
              className="h-5 w-auto max-w-[min(100%,12rem)] sm:h-6 sm:max-w-none"
            />
            <p className="max-w-md text-balance text-muted">{site.footer.tagline}</p>
            <p className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase sm:text-xs">
              <span aria-hidden className="status-dot" />
              Open to Field CTO conversations
            </p>
          </div>

          <div>
            <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
              Sections
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
              Reach out
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="mailto:dts@davidsolheim.com"
                  className="text-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
                >
                  dts@davidsolheim.com
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/davidtsolheim"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
                >
                  @davidtsolheim
                </a>
              </li>
              <li>
                <a
                  href="#hero"
                  className="text-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
                >
                  Back to top ↑
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div aria-hidden className="section-heading-rule" />

        <div className="flex flex-col items-center gap-3 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:gap-4">
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase sm:text-xs">
            © {year} {site.footer.copyright}
          </p>
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase sm:text-xs">
            cursorfieldcto.com
          </p>
        </div>
      </Container>
    </footer>
  );
}
