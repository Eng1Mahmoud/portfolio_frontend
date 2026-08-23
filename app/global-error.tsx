"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

/**
 * Last-resort boundary: catches errors in the root layout itself, so it has to
 * render its own <html> and <body>.
 *
 * Deliberately does NOT use `next/error`. That is a pages-router component, so
 * rendering it makes the build resolve /_document, which fails in an
 * app-router-only project ("Cannot find module for page: /_document") whenever
 * chunking shifts. It also rendered a bare, unstyled page with statusCode 0.
 */
export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          textAlign: "center",
          padding: "1.5rem",
          backgroundColor: "#12100D",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", margin: 0 }}>Something went wrong</h1>
        <p style={{ color: "#94a3b8", margin: 0, maxWidth: "32rem" }}>
          An unexpected error occurred. Reloading usually fixes it.
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: "0.5rem",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
            color: "#ffffff",
            backgroundColor: "#2563eb",
            fontSize: "1rem",
          }}
        >
          Try again
        </button>
        {error.digest && (
          <p style={{ color: "#475569", fontSize: "0.75rem", margin: 0 }}>
            Reference: {error.digest}
          </p>
        )}
      </body>
    </html>
  );
}
