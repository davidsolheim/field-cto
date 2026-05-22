import type { SiteContent } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";

type SiteFooterProps = {
  site: SiteContent;
};

export function SiteFooter({ site }: SiteFooterProps) {
  return (
    <footer className="border-t border-border py-10">
      <Container>
        <Divider />
        <div className="mt-8 flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.footer.copyright}</p>
          <p>{site.footer.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
