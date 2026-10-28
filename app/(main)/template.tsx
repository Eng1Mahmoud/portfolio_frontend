"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { afterFirstInteraction } from "@/utiles/first-interaction";
import { scrollToSection } from "@/utiles/section-scroll";

/** Keep anchor navigation in #page-scroll, with one bounded animation. */
export default function MainTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const root = document.getElementById("page-scroll");
    if (!root) return;
    let cancelScroll: (() => void) | undefined;
    let pending: MutationObserver | undefined;
    const ready = () => root.setAttribute("data-navigation-ready", "");
    const unsubscribe = afterFirstInteraction(ready);
    const find = (hash: string) => {
      try {
        return document.getElementById(
          decodeURIComponent(hash.slice(1)) || "home",
        );
      } catch {
        return null;
      }
    };
    const restore = () => {
      cancelScroll?.();
      pending?.disconnect();
      const reveal = () => {
        const target = find(window.location.hash);
        if (!target || !root.contains(target)) return false;
        cancelScroll = scrollToSection(root, target, true);
        return true;
      };
      if (!window.location.hash) root.scrollTo({ top: 0, behavior: "instant" });
      else if (!reveal()) {
        // Deep links can arrive before streamed sections. Seek only when ready.
        pending = new MutationObserver(() => {
          if (reveal()) pending?.disconnect();
        });
        pending.observe(root, { childList: true, subtree: true });
      }
    };
    const onClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      )
        return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (
        !link ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      )
        return;
      const url = new URL(link.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        url.pathname !== pathname ||
        url.search !== window.location.search
      )
        return;
      const target = find(url.hash);
      if (!target || !root.contains(target)) return;
      event.preventDefault();
      if (window.location.hash !== url.hash)
        window.history.pushState(null, "", url.hash || url.pathname);
      cancelScroll = scrollToSection(root, target);
    };
    restore();
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", restore);
    window.addEventListener("hashchange", restore);
    return () => {
      cancelScroll?.();
      pending?.disconnect();
      unsubscribe();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", restore);
      window.removeEventListener("hashchange", restore);
    };
  }, [pathname]);
  return (
    <motion.div
      key={pathname}
      initial={reduceMotion ? false : { y: 12 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
