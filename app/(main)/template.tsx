"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Restore the container's scroll position on navigation without hiding content. */
export default function MainTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // The page scrolls in a container, not the window, so Next's scroll
  // restoration never sees it — navigating from the bottom of one page left
  // the next one already scrolled down.
  useEffect(() => {
    const target = window.location.hash.slice(1);
    if (target) {
      requestAnimationFrame(() =>
        document.getElementById(target)?.scrollIntoView({ block: "start" }),
      );
    } else document.getElementById("page-scroll")?.scrollTo({ top: 0 });
  }, [pathname]);

  // Never hide the page while waiting for hydration: this also gates LCP.
  return <div key={pathname}>{children}</div>;
}
