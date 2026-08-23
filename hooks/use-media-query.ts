"use client";

import { useEffect, useLayoutEffect, useState } from "react";

// useLayoutEffect warns when called during server rendering, but its timing is
// what keeps a layout-affecting query from flashing the wrong branch: it runs
// before paint, so the corrected value is the first thing drawn.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Subscribes to a media query. Returns false during server rendering, so write
 * queries whose false branch is the one the markup should ship with.
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia(query);
    const sync = () => setMatches(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [query]);

  return matches;
};
