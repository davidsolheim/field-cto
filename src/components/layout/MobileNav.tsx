"use client";

import { useState } from "react";

type NavItem = { label: string; href: string };

type MobileNavProps = {
  items: NavItem[];
};

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>
      {open ? (
        <div
          id="mobile-nav-panel"
          className="absolute left-0 right-0 top-[var(--header-height)] border-b border-border bg-background/95 backdrop-blur-sm"
        >
          <ul className="flex flex-col gap-1 px-[var(--container-padding)] py-4">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
