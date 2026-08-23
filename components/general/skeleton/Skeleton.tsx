import { type ReactNode } from "react";
import clsx from "clsx";

/**
 * Skeleton primitives. A skeleton is only useful when it traces the shape of
 * the content that replaces it — same block sizes, same columns, same rhythm —
 * so each route builds its own from these rather than sharing one card grid.
 *
 * The pulse lives on the wrapper, not on every block, so the whole screen
 * breathes together instead of shimmering out of step.
 */
export const SkeletonScreen = ({
  children,
  label = "Loading",
}: {
  children: ReactNode;
  label?: string;
}) => (
  <div className="animate-pulse" aria-busy="true" aria-live="polite">
    <span className="sr-only">{label}…</span>
    {children}
  </div>
);

/** A line of text. `w` is a Tailwind width class. */
export const SkeletonLine = ({
  w = "w-full",
  h = "h-3",
  className,
}: {
  w?: string;
  h?: string;
  className?: string;
}) => <div className={clsx("rounded bg-parchment/[0.07]", w, h, className)} />;

/** A solid area — an image, an avatar, a media well. */
export const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={clsx("rounded-lg bg-parchment/[0.05]", className)} />
);

/** A pill — a tag, a chip, a button. */
export const SkeletonPill = ({ className }: { className?: string }) => (
  <div className={clsx("rounded-full bg-parchment/[0.06]", className)} />
);

/** Mirrors <Title />: rail, mono eyebrow, heading. */
export const SkeletonTitle = () => (
  <div className="relative mb-10 pl-6 sm:pl-10">
    <div className="absolute left-0 top-0 h-full w-px bg-parchment/10" />
    <SkeletonLine w="w-28" h="h-2.5" className="mb-4" />
    <SkeletonLine w="w-52" h="h-8" />
  </div>
);
