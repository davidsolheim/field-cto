import Link from "next/link";
import type { SiteContent } from "@/lib/content";
import { ActiveSectionNav } from "./ActiveSectionNav";
import { MobileNav } from "./MobileNav";

type SiteHeaderProps = {
  site: SiteContent;
};

export function SiteHeader({ site }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-[var(--header-height)] max-w-[var(--container-max)] items-center justify-between gap-4 px-[var(--container-padding)]">
        <Link
          href="#hero"
          className="font-mono text-sm tracking-[0.08em] text-foreground uppercase"
        >
          {site.name}
        </Link>
        <div className="hidden md:block">
          <ActiveSectionNav items={site.nav} />
        </div>
        <MobileNav items={site.nav} />
      </div>
    </header>
  );
}
