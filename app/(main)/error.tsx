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
        <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
          Something went wrong
        </h1>
        <p className="text-gray-400 mb-8">
          This section failed to load. Trying again usually fixes it.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-colors"
          >
            <FaRedo aria-hidden="true" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <FaHome aria-hidden="true" />
            Go home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-6 text-xs text-gray-600">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
