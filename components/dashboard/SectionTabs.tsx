"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaList, FaPlus } from "react-icons/fa";
import clsx from "clsx";

const tab = (active: boolean) =>
  clsx(
    "flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-sage",
    active
      ? "border-sage/40 bg-parchment/[0.06] text-ink-strong"
      : "border-parchment/10 text-ink-muted hover:border-sage/40 hover:text-ink-strong",
  );

/**
 * The list/add switch above every section. Each section had its own copy with
 * the list tab hardcoded as active, so opening "add" left both tabs claiming
 * to be the current page — this reads the real route instead.
 */
export const SectionTabs = ({
  base,
  listLabel,
  addLabel,
}: {
  /** Section root, e.g. "/dashboard/projects". */
  base: string;
  listLabel: string;
  addLabel: string;
}) => {
  const pathname = usePathname();
  const onList = pathname === base;

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <Link
        href={base}
        aria-current={onList ? "page" : undefined}
        className={tab(onList)}
      >
        <FaList className="mr-2 h-4 w-4" aria-hidden="true" />
        {listLabel}
      </Link>
      <Link
        href={`${base}/add`}
        aria-current={pathname === `${base}/add` ? "page" : undefined}
        className={tab(pathname === `${base}/add`)}
      >
        <FaPlus className="mr-2 h-4 w-4" aria-hidden="true" />
        {addLabel}
      </Link>
    </div>
  );
};
