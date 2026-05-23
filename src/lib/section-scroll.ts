export type SectionNavItem = {
  label: string;
  href: string;
};

export function getScrollOffset(): number {
  if (typeof window === "undefined") {
    return 72;
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-height")
    .trim();

  return parseFloat(value) || 72;
}

export function scrollToSectionId(
  id: string,
  behavior: ScrollBehavior = "smooth",
): void {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  const top = window.scrollY + element.getBoundingClientRect().top - getScrollOffset();
  window.scrollTo({ top: Math.max(0, top), behavior });
}

export function scrollToSectionHref(
  href: string,
  behavior: ScrollBehavior = "smooth",
): void {
  scrollToSectionId(href.replace("#", ""), behavior);
  window.history.replaceState(null, "", href);
}

export function resolveActiveSectionHref(items: SectionNavItem[]): string {
  if (typeof window === "undefined") {
    return "";
  }

  const offset = getScrollOffset() + 4;
  let current = "";

  for (const item of items) {
    const element = document.getElementById(item.href.replace("#", ""));
    if (!element) {
      continue;
    }

    if (element.getBoundingClientRect().top <= offset) {
      current = item.href;
    }
  }

  const nearBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 8;

  if (nearBottom && items.length > 0) {
    return items[items.length - 1].href;
  }

  return current;
}
