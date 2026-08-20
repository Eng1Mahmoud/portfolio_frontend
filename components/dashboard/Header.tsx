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
    <header className="bg-white shadow-sm top-0 z-10 sticky">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Way back to the public site. The dashboard had no route out of
              itself short of editing the URL. */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary-light"
          >
            <FaArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">View site</span>
            <span className="sr-only sm:hidden">View site</span>
          </Link>
          <LogoutButton />
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <FaBars className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
