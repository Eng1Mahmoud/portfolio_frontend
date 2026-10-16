/** A server-rendered fallback: no timer, image, font request or client bundle. */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="flex min-h-[calc(100svh-8rem)] flex-col items-center justify-center gap-7 px-4 py-12 text-center"
    >
      <div
        aria-hidden="true"
        className="relative grid size-24 place-items-center"
      >
        <div className="absolute inset-0 rounded-full border border-sage/15" />
        <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-sage motion-reduce:animate-none [animation-duration:1.8s]" />
        <div className="absolute inset-3 rounded-full border border-parchment/10" />
        <span className="font-main text-2xl font-bold tracking-tight text-ink-strong">
          M<span className="text-sage">.</span>
        </span>
      </div>
      <div className="space-y-2">
        <p className="font-main text-lg font-medium text-ink-strong">
          Mahmoud Mohamed
        </p>
        <p className="text-sm text-ink-muted">Loading portfolio…</p>
      </div>
    </div>
  );
}
