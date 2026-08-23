import Link from "next/link";
import { Metadata } from "next";
import { FaHome } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Page not found",
};

// Root-level 404. Unmatched URLs render here, outside the (main) layout, so
// this page carries its own full-screen styling.
export default function NotFound() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center bg-primary-light text-white text-center px-4">
      <p className="text-7xl md:text-9xl font-bold text-sage">404</p>
      <h1 className="mt-4 text-2xl md:text-3xl font-bold">Page not found</h1>
      <p className="mt-3 max-w-md text-ink-muted">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-sage text-surface-base hover:bg-sage-bright transition-colors"
      >
        <FaHome aria-hidden="true" />
        Back to home
      </Link>
    </main>
  );
}
