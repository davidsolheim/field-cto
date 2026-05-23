"use client";

import { useEffect } from "react";
import { scrollToSectionHref } from "@/lib/section-scroll";

export function AnchorScrollOnLoad() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      return;
    }

    const scrollToHash = () => {
      scrollToSectionHref(hash, "auto");
    };

    scrollToHash();
    requestAnimationFrame(scrollToHash);
    window.setTimeout(scrollToHash, 100);
  }, []);

  return null;
}
