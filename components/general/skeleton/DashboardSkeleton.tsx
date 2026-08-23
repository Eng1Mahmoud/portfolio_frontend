import { type ReactNode } from "react";
import clsx from "clsx";

/**
 * Dashboard skeletons need their own blocks: the panels there are white, so
 * the parchment/5 tones used on the public site would be invisible.
 */
export const DashScreen = ({
  title,
  children,
  label = "Loading",
}: {
  title?: boolean;
  children: ReactNode;
  label?: string;
}) => (
  <div
    className="mb-4 animate-pulse rounded-lg bg-white px-8 pb-8 pt-6 shadow-md"
    aria-busy="true"
    aria-live="polite"
  >
    <span className="sr-only">{label}…</span>
    {title && <div className="mb-6 h-7 w-56 rounded bg-gray-200" />}
    {children}
  </div>
);

export const DashLine = ({
  w = "w-full",
  h = "h-3",
  className,
}: {
  w?: string;
  h?: string;
  className?: string;
}) => <div className={clsx("rounded bg-gray-200", w, h, className)} />;

export const DashBlock = ({ className }: { className?: string }) => (
  <div className={clsx("rounded-lg bg-gray-200", className)} />
);

/** A labelled input, as the dashboard forms render them. */
export const DashField = ({ tall }: { tall?: boolean }) => (
  <div className="space-y-2">
    <DashLine w="w-28" h="h-3" />
    <DashBlock className={tall ? "h-32 w-full" : "h-12 w-full"} />
  </div>
);
