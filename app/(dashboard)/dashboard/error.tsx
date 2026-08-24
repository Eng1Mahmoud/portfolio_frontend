"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { FaRedo } from "react-icons/fa";
import { DashPanel } from "@/components/dashboard/DashPanel";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <DashPanel>
      <h2 className="display-card mb-2 text-xl text-ink-strong sm:text-2xl">
        Something went wrong
      </h2>
      <p className="mb-6 text-sm text-ink-body">
        This page failed to load. Your data has not been changed.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2 text-sm font-medium text-surface-base transition-colors hover:bg-sage-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      >
        <FaRedo aria-hidden="true" className="h-3 w-3" />
        Try again
      </button>
      {error.digest && (
        <p className="mt-6 font-mono text-xs text-ink-muted">
          Reference: {error.digest}
        </p>
      )}
    </DashPanel>
  );
}
