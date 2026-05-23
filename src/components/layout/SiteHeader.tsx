"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import type { SiteContent } from "@/lib/content";
import { CursorLogo } from "@/components/brand/CursorLogo";
import { scrollToSectionHref } from "@/lib/section-scroll";
import { ActiveSectionNav } from "./ActiveSectionNav";
import { MobileNav } from "./MobileNav";

type SiteHeaderProps = {
  site: SiteContent;
};

function scrollToHash(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#")) {
    return;
  }

  event.preventDefault();
  scrollToSectionHref(href, "smooth");
}

export function SiteHeader({ site }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
      <div className="relative mx-auto flex h-[var(--header-height)] max-w-[var(--container-max)] items-center justify-between gap-3 px-[var(--container-padding)] sm:gap-4">
        <Link
          href="#hero"
          className="flex min-w-0 flex-1 items-center gap-2.5 text-foreground sm:gap-3 sm:flex-none"
          onClick={(event) => scrollToHash(event, "#hero")}
        >
          <CursorLogo variant="cube" className="h-6 w-auto shrink-0 sm:h-7" />
          <span className="truncate font-mono text-xs tracking-[0.08em] uppercase sm:text-sm">
            {site.name}
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <ActiveSectionNav items={site.nav} />
          <CursorLogo variant="wordmark" className="h-3.5 w-auto opacity-80" />
        </div>
        <MobileNav items={site.nav} />
      </div>
    </header>
  );
}
