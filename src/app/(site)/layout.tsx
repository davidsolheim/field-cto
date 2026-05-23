import type { ReactNode } from "react";
import { getSiteContent } from "@/lib/content";
import { AnchorScrollOnLoad } from "@/components/layout/AnchorScrollOnLoad";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function SiteLayout({ children }: { children: ReactNode }) {
  const site = getSiteContent();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    url: site.meta.url,
    description: site.meta.description,
    image: `${site.meta.url}${site.headshot}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnchorScrollOnLoad />
      <SiteHeader site={site} />
      <main className="flex-1">{children}</main>
      <SiteFooter site={site} />
    </>
  );
}
