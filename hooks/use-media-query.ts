"use client";

import { useEffect, useLayoutEffect, useState } from "react";

// Layout timing keeps a layout-affecting query from flashing the wrong branch.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Returns false during server rendering, so write queries whose false branch is
 * the one the markup should ship with.
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
