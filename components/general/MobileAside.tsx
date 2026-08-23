"use client";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Aside } from "@/components/general/Aside";
import { IuserInfo } from "@/types/general";

export const MobileAsideToggle = ({
  profileInfo,
}: {
  profileInfo: IuserInfo;
}) => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const hasBeenOpened = useRef(false);

  const toggleAside = () => setIsAsideOpen((open) => !open);

  // Close on Escape and lock background scrolling while the drawer is open.
  useEffect(() => {
    if (!isAsideOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsAsideOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isAsideOpen]);

  // Move focus into the drawer when it opens, and back to the toggle on close,
  // so keyboard users are not stranded behind the overlay.
  useEffect(() => {
    if (isAsideOpen) {
      hasBeenOpened.current = true;
      panelRef.current?.focus();
    } else if (hasBeenOpened.current) {
      // Guarded: without this the first render would steal focus to the menu
      // button on every page load.
      openerRef.current?.focus({ preventScroll: true });
    }
  }, [isAsideOpen]);

  return (
    <>
      {/* Mobile Menu Toggle */}
      {!isAsideOpen && (
        <button
          ref={openerRef}
          onClick={toggleAside}
          aria-label="Open navigation menu"
          aria-expanded={isAsideOpen}
          className="lg:hidden fixed top-4 left-4 z-[1000] bg-sage text-surface-base p-2 rounded-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base"
        >
          <FaBars aria-hidden="true" />
        </button>
      )}

      {/*
        A CSS transition plus `inert` rather than AnimatePresence: correctness
        here does not depend on an exit animation completing, the panel is
        removed from the tab order and the accessibility tree whenever it is
        closed, and the prefers-reduced-motion rule in globals.css applies
        automatically. One fewer moving part for a drawer that only slides.
      */}
      <div
        onClick={() => setIsAsideOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 lg:hidden transition-opacity duration-300 ${
          isAsideOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        inert={!isAsideOpen}
        className={`fixed inset-y-0 left-0 z-50 lg:hidden w-[80%] max-w-[300px] rounded-r-xl outline-none transition-transform duration-300 ease-out ${
          isAsideOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto">
          <Aside setIsAsideOpen={setIsAsideOpen} profileInfo={profileInfo} />
        </div>
        <button
          onClick={toggleAside}
          aria-label="Close navigation menu"
          className="absolute top-4 right-5 z-[1000] bg-surface-raised text-ink-strong p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          <FaTimes aria-hidden="true" />
        </button>
      </div>
    </>
  );
};
