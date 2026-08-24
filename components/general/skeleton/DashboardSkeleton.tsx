import { type ReactNode } from "react";
import clsx from "clsx";

/**
 * Traces the DashPanel these screens load into, so the skeleton and the real
 * panel share an outline instead of swapping one shape for another.
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
    className="mb-4 animate-pulse rounded-2xl border border-parchment/10 bg-surface-panel px-5 py-6 shadow-pinned sm:px-8 sm:pb-8 sm:pt-6"
    aria-busy="true"
    aria-live="polite"
  >
    <span className="sr-only">{label}…</span>
    {title && (
      <div className="mb-6 border-b border-parchment/10 pb-4">
        <div className="h-7 w-56 rounded bg-parchment/10" />
      </div>
    )}
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
}) => <div className={clsx("rounded bg-parchment/10", w, h, className)} />;

export const DashBlock = ({ className }: { className?: string }) => (
  <div className={clsx("rounded-lg bg-parchment/10", className)} />
);

/** A labelled input, as the dashboard forms render them. */
export const DashField = ({ tall }: { tall?: boolean }) => (
  <div className="space-y-2">
    <DashLine w="w-28" h="h-3" />
    <DashBlock className={tall ? "h-32 w-full" : "h-12 w-full"} />
  </div>
);
