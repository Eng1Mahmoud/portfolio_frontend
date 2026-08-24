"use client";
import { FaTimes } from "react-icons/fa";
import { type Dispatch, type SetStateAction } from "react";
import NavLinks from "./NavLinks";

export default function MobileSidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? "" : "pointer-events-none"}`}
    >
      <div
        className={`fixed inset-0 bg-surface-well/85 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          sidebarOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`relative flex w-full max-w-xs flex-1 transform flex-col border-r border-parchment/10 bg-surface-panel pb-4 pt-5 transition duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-[110%]"
        }`}
      >
        <div className="absolute right-0 top-0 -mr-12 pt-2">
          <button
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes className="h-6 w-6 text-ink-strong" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-shrink-0 items-center gap-3 px-4">
          <span
            aria-hidden="true"
            className="h-5 w-px bg-gradient-to-b from-sage to-transparent"
          />
          <span className="display-card py-3 text-xl text-ink-strong">
            Menu
          </span>
        </div>
        <div className="h-px w-full bg-parchment/10" />
        <div className="pt-4">
          <NavLinks />
        </div>
      </div>
      <div className="w-14 flex-shrink-0" aria-hidden="true"></div>
    </div>
  );
}
