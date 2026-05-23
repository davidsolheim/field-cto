"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  resolveActiveSectionHref,
  scrollToSectionHref,
  type SectionNavItem,
} from "@/lib/section-scroll";

export type { SectionNavItem };

export function useActiveSection(items: SectionNavItem[]) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener("scroll", onStoreChange, { passive: true });
    window.addEventListener("resize", onStoreChange, { passive: true });

    return () => {
      window.removeEventListener("scroll", onStoreChange);
      window.removeEventListener("resize", onStoreChange);
    };
  }, []);

  const getSnapshot = useCallback(() => resolveActiveSectionHref(items), [items]);
  const activeHref = useSyncExternalStore(subscribe, getSnapshot, () => "");

  const scrollToSection = useCallback((href: string) => {
    scrollToSectionHref(href, "smooth");
  }, []);

  return { activeHref, scrollToSection };
}
