import { type ReactNode } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import clsx from "clsx";

/**
 * The sheet every dashboard screen sits on. Every page had its own copy of the
 * same wrapper and heading markup, so the panel had to be restyled in fifteen
 * places to change once — this is that markup, in one place, using the same
 * panel tokens as the public site's cards.
 */
export const DashPanel = ({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  /** Optional control aligned opposite the title, e.g. a count or a link. */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) => (
  <section
    className={clsx(
      "mb-4 rounded-2xl border border-parchment/10 bg-surface-panel px-5 py-6 shadow-pinned sm:px-8 sm:pb-8 sm:pt-6",
      className,
    )}
  >
    {title && (
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-parchment/10 pb-4">
        <h2 className="display-card text-xl text-ink-strong sm:text-2xl">
          {title}
        </h2>
        {action}
      </div>
    )}
    {children}
  </section>
);

/**
 * Shown where a list would be. Without it an empty section renders as a blank
 * panel, which reads as a failed load rather than as "nothing here yet".
 */
export const DashEmpty = ({
  message,
  href,
  cta,
}: {
  message: string;
  href?: string;
  cta?: string;
}) => (
  <div className="rounded-xl border border-dashed border-parchment/15 bg-parchment/[0.02] px-6 py-10 text-center">
    <p className="text-sm text-ink-muted">{message}</p>
    {href && cta && (
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2 text-sm font-medium text-surface-base transition-colors hover:bg-sage-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      >
        <FaPlus className="h-3 w-3" aria-hidden="true" />
        {cta}
      </Link>
    )}
  </div>
);
