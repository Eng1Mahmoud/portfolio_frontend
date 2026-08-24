import { type ReactNode } from "react";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import clsx from "clsx";

/**
 * One entry in a dashboard list. Mirrors the public site's card — panel
 * surface, hairline border, and the same sage edge on hover — so moving
 * between the two does not feel like moving between two products.
 */
export const DashCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={clsx(
      "h-full rounded-xl border border-parchment/10 bg-surface-well/40 p-4",
      "transition-colors duration-300 hover:border-sage/30",
      className,
    )}
  >
    <div className="flex h-full flex-col">{children}</div>
  </div>
);

/** The edit action, identical across every list. */
export const EditLink = ({
  href,
  label = "Edit",
}: {
  href: string;
  label?: string;
}) => (
  <Link
    href={href}
    className="flex items-center rounded-md border border-parchment/15 px-2 py-1 font-medium text-ink-body transition-colors duration-150 hover:border-sage/50 hover:text-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
  >
    <FaEdit className="mr-1 h-4 w-4" aria-hidden="true" />
    {label}
  </Link>
);
