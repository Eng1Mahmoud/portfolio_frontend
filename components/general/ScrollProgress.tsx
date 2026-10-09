"use client";
import { useEffect, useState } from "react";

/** The top rail is both a progress indicator and a draggable page seek control. */
export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const root = document.getElementById("page-scroll");
    if (!root) return;
    const update = () => {
      const range = root.scrollHeight - root.clientHeight;
      setProgress(range > 0 ? root.scrollTop / range * 100 : 0);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(root);
    const main = root.querySelector("main");
    if (main) observer.observe(main);
    root.addEventListener("scroll", update, { passive: true });
    return () => { observer.disconnect(); root.removeEventListener("scroll", update); };
  }, []);

  return (
    <div className="page-seek">
      <div aria-hidden="true" className="page-seek-fill" style={{ transform: `scaleX(${progress / 100})` }} />
      <input
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={progress}
        aria-label="Page scroll position"
        aria-valuetext={`${Math.round(progress)}% through page`}
        onChange={event => {
          const root = document.getElementById("page-scroll");
          if (!root) return;
          root.scrollTo({ top: Number(event.target.value) / 100 * (root.scrollHeight - root.clientHeight), behavior: "instant" });
        }}
      />
    </div>
  );
};
