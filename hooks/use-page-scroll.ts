"use client";

import { type RefObject, useEffect, useLayoutEffect, useRef } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * A ref to the element the page actually scrolls in.
 *
 * The layout puts the scroll on a container, not the window, and scroll events
 * do not bubble — anything reacting to scroll position has to name that
 * element or it sits frozen at zero. Call this before `useScroll` so the ref is
 * populated by the time `useScroll` reads it.
 */
export const usePageScrollContainer = (): RefObject<HTMLElement | null> => {
  const ref = useRef<HTMLElement | null>(null);
  useIsomorphicLayoutEffect(() => {
    ref.current = document.getElementById("page-scroll");
  }, []);
  return ref;
};
