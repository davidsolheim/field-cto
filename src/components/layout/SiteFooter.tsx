import type { SiteContent } from "@/lib/content";
import { CursorLogo } from "@/components/brand/CursorLogo";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";

type SiteFooterProps = {
  site: SiteContent;
};

export function SiteFooter({ site }: SiteFooterProps) {
  return (
    <footer className="border-t border-border py-8 sm:py-10">
      <Container>
        <Divider />
        <div className="mt-6 flex flex-col gap-5 text-center text-sm text-muted sm:mt-8 sm:gap-6 md:flex-row md:items-center md:justify-between md:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5 md:items-start">
            <CursorLogo variant="lockup-horizontal" className="h-4 w-auto max-w-[min(100%,12rem)] sm:h-5 sm:max-w-none" />
            <p>© {new Date().getFullYear()} {site.footer.copyright}</p>
          </div>
          <p className="max-w-md text-balance md:max-w-none">{site.footer.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
