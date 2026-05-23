"use client";

import { useEffect, useState } from "react";
import type { SectionNavItem } from "@/hooks/useActiveSection";
import { useActiveSection } from "@/hooks/useActiveSection";

type MobileNavProps = {
  items: SectionNavItem[];
};

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const { activeHref, scrollToSection } = useActiveSection(items);

  useEffect(() => {
    if (!open) {
      return;
    }

    const preventScroll = (event: TouchEvent | WheelEvent) => {
      const panel = document.getElementById("mobile-nav-panel");
      if (panel?.contains(event.target as Node)) {
        return;
      }

      event.preventDefault();
    };

    document.addEventListener("touchmove", preventScroll, { passive: false });
    document.addEventListener("wheel", preventScroll, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("wheel", preventScroll);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex min-h-[var(--touch-target)] min-w-[var(--touch-target)] items-center justify-center rounded-full border border-border px-4 text-sm font-medium text-foreground"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 top-[var(--header-height)] z-40 bg-background/40 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-nav-panel"
            className="fixed right-[var(--container-padding)] top-[calc(var(--header-height)+0.5rem)] z-50 w-[min(calc(100vw-2rem),18rem)] overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-elevated)]"
          >
            <ul className="flex flex-col gap-1 p-2">
              {items.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`flex min-h-[var(--touch-target)] items-center rounded-xl px-4 text-base transition-colors duration-[var(--duration-fast)] ${
                        isActive
                          ? "bg-foreground text-background"
                          : "text-foreground hover:bg-surface active:bg-surface"
                      }`}
                      aria-current={isActive ? "location" : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection(item.href);
                        setOpen(false);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}
