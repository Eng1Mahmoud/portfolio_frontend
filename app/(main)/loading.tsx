/** An immediate server fallback; never holds ready content behind a timer. */
export default function Loading() {
  return (
    <div
      data-home-loading
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="fixed inset-0 z-[10000] flex min-h-svh flex-col bg-surface-base px-7 py-8 text-ink-strong [font-family:system-ui,sans-serif] sm:px-12 sm:py-10"
    >
      <div
        aria-hidden="true"
        className="flex items-center justify-between border-b border-parchment/10 pb-5 text-[10px] font-medium uppercase tracking-[0.2em]"
      >
        <span>Mahmoud Mohamed</span>
        <span className="text-ink-muted">Portfolio</span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
        <div
          aria-hidden="true"
          className="relative mb-9 grid size-28 place-items-center sm:size-32"
        >
          <div className="absolute inset-0 rounded-full border border-parchment/10" />
          <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-sage motion-reduce:animate-none [animation-duration:2.4s]" />
          <div className="absolute inset-3 rounded-full border border-parchment/10" />
          <span className="text-4xl font-semibold tracking-[-0.08em]">
            M<span className="text-sage">.</span>
          </span>
        </div>
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-ink-muted">
          Welcome to my portfolio
        </p>
        <p className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
          Mahmoud Mohamed
        </p>
        <p className="mt-3 text-sm text-ink-muted">Loading portfolio…</p>
      </div>
      <div
        aria-hidden="true"
        className="flex items-center justify-between border-t border-parchment/10 pt-5 text-[10px] uppercase tracking-[0.18em] text-ink-muted"
      >
        <span>Full-stack engineer</span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 animate-pulse rounded-full bg-sage motion-reduce:animate-none" />
          Loading
        </span>
      </div>
    </div>
  );
}
