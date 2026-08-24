"use client";

import { FaBars, FaArrowLeft } from "react-icons/fa";
import { type Dispatch, type SetStateAction } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Header({
  setSidebarOpen,
}: {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-parchment/10 bg-surface-base/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-5 w-px bg-gradient-to-b from-sage to-transparent"
          />
          <h1 className="display-card text-xl text-ink-strong sm:text-2xl">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Way back to the public site. The dashboard had no route out of
              itself short of editing the URL. */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-parchment/[0.06] hover:text-ink-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <FaArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">View site</span>
            <span className="sr-only sm:hidden">View site</span>
          </Link>
          <LogoutButton />
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="rounded-full p-2 text-ink-muted transition-colors hover:bg-parchment/[0.06] hover:text-ink-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-sage md:hidden"
          >
            <FaBars className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
