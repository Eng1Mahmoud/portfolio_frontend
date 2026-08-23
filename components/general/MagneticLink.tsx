"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";

/**
 * A call to action that leans toward the cursor, with its label drifting a
 * little further than the button so the pull reads as depth.
 *
 * Pointer moves write to motion values, never to state, so the transform goes
 * straight to the compositor without a React render in between.
 */
export const MagneticLink = ({
  href,
  children,
  className = "",
  external = false,
  download = false,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  download?: boolean;
  onClick?: () => void;
}) => {
  const { ref, handlers, x, y, labelX, labelY } = useMagnetic();

  const inner = (
    <motion.span
      style={{ x: labelX, y: labelY }}
      className="pointer-events-none inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  const shared = {
    ref: ref as React.Ref<HTMLAnchorElement>,
    className,
    onClick,
    ...handlers,
  };

  return (
    <motion.span style={{ x, y }} className="inline-block">
      {external ? (
        <a
          {...shared}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          download={download || undefined}
        >
          {inner}
        </a>
      ) : (
        <Link {...shared} href={href}>
          {inner}
        </Link>
      )}
    </motion.span>
  );
};
