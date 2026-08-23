"use client";

import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { type PointerEvent, useRef } from "react";

/**
 * A control that leans toward the cursor while it is over it.
 *
 * The pull is written to motion values rather than React state, so a pointer
 * move never re-renders the component — the transform goes straight to the
 * compositor.
 */
export const useMagnetic = ({
  strength = 0.28,
}: { strength?: number } = {}) => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 260, damping: 20, mass: 0.5 };
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);

  // The label drifts a little further than the button, which is what makes the
  // pull read as depth instead of the whole thing sliding.
  const labelX = useTransform(x, (v) => v * 0.45);
  const labelY = useTransform(y, (v) => v * 0.45);

  const zero = useMotionValue(0);

  const handlers = {
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType !== "mouse" || reduceMotion) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mx.set((event.clientX - (rect.left + rect.width / 2)) * strength);
      my.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    },
    onPointerLeave: () => {
      mx.set(0);
      my.set(0);
    },
  };

  return {
    ref,
    handlers,
    x: reduceMotion ? zero : x,
    y: reduceMotion ? zero : y,
    labelX: reduceMotion ? zero : labelX,
    labelY: reduceMotion ? zero : labelY,
  };
};
