"use client";

import useCanvasCursor from "@/hooks/use-canvasCursor";

const CanvasCursor = () => {
  useCanvasCursor();

  return (
    <canvas
      className="pointer-events-none fixed inset-0 z-[9998] h-full min-h-[100dvh] w-full"
      id="canvas"
      aria-hidden
    />
  );
};

export default CanvasCursor;
