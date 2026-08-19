"use client";

import { MotionConfig } from "framer-motion";
import { type ReactNode } from "react";

/**
 * Makes every framer-motion animation in the app honour the operating
 * system's "reduce motion" setting.
 *
 * CSS-only animations are handled separately by the prefers-reduced-motion
 * block in globals.css — framer-motion animates inline styles from JS, so a
 * media query cannot reach it.
 *
 * `children` stays server-rendered: it is passed through as a prop, so this
 * client boundary does not pull the page into the client bundle.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
