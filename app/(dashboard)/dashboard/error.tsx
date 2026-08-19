"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { FaRedo } from "react-icons/fa";

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
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
        Something went wrong
      </h2>
      <p className="text-gray-600 mb-6">
        This page failed to load. Your data has not been changed.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 bg-secondary-light hover:bg-secondary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        <FaRedo aria-hidden="true" />
        Try again
      </button>
      {error.digest && (
        <p className="mt-6 text-xs text-gray-400">Reference: {error.digest}</p>
      )}
    </div>
  );
}
