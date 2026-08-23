"use client";

import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { type PointerEvent, type FocusEvent, useRef, useState } from "react";

/**
 * Pointer-driven 3D tilt, shared by the project pinboard and the skill tiles so
 * both turn with the same weight and in the same direction.
 */
export const useTilt = ({ range = 7 }: { range?: number } = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [engaged, setEngaged] = useState(false);
  const reduceMotion = useReducedMotion();

  // Pointer position within the element, -0.5 to 0.5 on each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 220, damping: 24, mass: 0.7 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  // Pointer right turns the right edge away, so rotateY is positive and
  // rotateX is inverted. Reversing these makes a tilt feel wrong without
  // looking obviously broken.
  const rotateY = useTransform(sx, [-0.5, 0.5], [-range, range]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [range, -range]);

  const release = () => {
    setEngaged(false);
    px.set(0);
    py.set(0);
  };

  const handlers = {
    onPointerMove: (event: PointerEvent<HTMLDivElement>) => {
      // Touch drags the page; tilting under a finger fights the scroll.
      if (event.pointerType !== "mouse" || reduceMotion) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      px.set((event.clientX - rect.left) / rect.width - 0.5);
      py.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    onPointerEnter: (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "mouse") setEngaged(true);
    },
    onPointerLeave: release,
    // Keyboard users get the same engaged state.
    onFocusCapture: () => setEngaged(true),
    onBlurCapture: (event: FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node)) release();
    },
  };

  // A motion value even when motion is reduced: callers compose these, and a
  // plain number cannot be composed.
  const zero = useMotionValue(0);

  return {
    ref,
    engaged,
    reduceMotion,
    handlers,
    sx,
    sy,
    rotateX: reduceMotion ? zero : rotateX,
    rotateY: reduceMotion ? zero : rotateY,
  };
};
