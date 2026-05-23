"use client";

import type { SectionNavItem } from "@/hooks/useActiveSection";
import { useActiveSection } from "@/hooks/useActiveSection";

type ActiveSectionNavProps = {
  items: SectionNavItem[];
  className?: string;
};

export function ActiveSectionNav({ items, className = "" }: ActiveSectionNavProps) {
  const { activeHref, scrollToSection } = useActiveSection(items);

  return (
    <nav className={className} aria-label="Primary">
      <ul className="flex flex-wrap items-center gap-x-1 gap-y-2">
        {items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted hover:text-foreground"
                }`}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(item.href);
                }}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
