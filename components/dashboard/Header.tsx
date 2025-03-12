"use client";

import { FaBars } from "react-icons/fa";
import { type Dispatch, type SetStateAction } from "react";

export default function Header({
  setSidebarOpen,
}: {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <header className="bg-white shadow-sm top-0 z-10 sticky">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <FaBars className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
