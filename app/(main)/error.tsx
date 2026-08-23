"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { FaRedo, FaHome } from "react-icons/fa";
import Link from "next/link";

export default function Error({
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
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="rounded-2xl border border-red-500/30 bg-surface-panel/80 backdrop-blur-xl p-8 md:p-12 max-w-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-ink-strong">
          Something went wrong
        </h1>
        <p className="mb-8 text-ink-muted">
          This section failed to load. Trying again usually fixes it.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-sage text-surface-base hover:bg-sage-bright transition-colors"
          >
            <FaRedo aria-hidden="true" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-parchment/5 hover:bg-parchment/10 border border-parchment/10 transition-colors"
          >
            <FaHome aria-hidden="true" />
            Go home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-6 text-xs text-ink-muted">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
