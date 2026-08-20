// Shown while a public page's data is fetched, instead of a blank pause.
export default function Loading() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>

      {/* Mirrors the <Title /> block */}
      <div className="ml-[20px] mb-8">
        <div className="h-9 md:h-10 w-56 rounded-md bg-white/10" />
        <div className="mt-5 h-[5px] w-[150px] rounded-md bg-blue-500/20" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border-2 border-blue-500/20 bg-gradient-to-br from-surface-card to-surface-card-to overflow-hidden"
          >
            <div className="h-[200px] w-full bg-white/5" />
            <div className="p-6 space-y-3">
              <div className="h-5 w-2/3 rounded bg-white/10" />
              <div className="h-3 w-full rounded bg-white/5" />
              <div className="h-3 w-5/6 rounded bg-white/5" />
              <div className="flex gap-3 pt-2">
                <div className="h-9 w-24 rounded-md bg-white/5" />
                <div className="h-9 w-24 rounded-md bg-white/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
