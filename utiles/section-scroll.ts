let cancelCurrent: (() => void) | undefined;

/** One short, cancellable animation for the page's sole scroll container. */
export function scrollToSection(
  root: HTMLElement,
  target: HTMLElement,
  immediate = false,
) {
  cancelCurrent?.();
  // Resolve content-visibility estimates before measuring a distant anchor.
  root.setAttribute("data-navigation-ready", "");
  const start = root.scrollTop;
  const offset =
    (parseFloat(getComputedStyle(root).scrollPaddingTop) || 0) +
    (parseFloat(getComputedStyle(target).scrollMarginTop) || 0);
  const end = Math.max(
    0,
    Math.min(
      start +
        target.getBoundingClientRect().top -
        root.getBoundingClientRect().top -
        offset,
      root.scrollHeight - root.clientHeight,
    ),
  );
  const focus = () => {
    const tabIndex = target.getAttribute("tabindex");
    if (tabIndex === null) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    if (tabIndex === null)
      target.addEventListener(
        "blur",
        () => target.removeAttribute("tabindex"),
        { once: true },
      );
  };
  if (
    immediate ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    Math.abs(end - start) < 2
  ) {
    root.scrollTo({ top: end, behavior: "instant" });
    focus();
    return () => {};
  }
  let frame = 0;
  const started = performance.now();
  const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
  const cancel = () => {
    cancelAnimationFrame(frame);
    for (const event of events) window.removeEventListener(event, cancel);
    if (cancelCurrent === cancel) cancelCurrent = undefined;
  };
  const tick = (now: number) => {
    const progress = Math.min(1, (now - started) / 320);
    const eased = 1 - (1 - progress) ** 3;
    root.scrollTo({ top: start + (end - start) * eased, behavior: "instant" });
    if (progress < 1) frame = requestAnimationFrame(tick);
    else {
      cancel();
      focus();
    }
  };
  for (const event of events)
    window.addEventListener(event, cancel, { passive: true });
  cancelCurrent = cancel;
  frame = requestAnimationFrame(tick);
  return cancel;
}
