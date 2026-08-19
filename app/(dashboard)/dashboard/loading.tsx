// Skeleton for the dashboard's data-backed pages.
export default function Loading() {
  return (
    <div
      className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 animate-pulse"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading…</span>
      <div className="h-7 w-56 rounded bg-gray-200 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-100 p-4">
            <div className="h-48 w-full rounded-lg bg-gray-200 mb-4" />
            <div className="h-5 w-2/3 rounded bg-gray-200 mb-2" />
            <div className="h-3 w-full rounded bg-gray-100 mb-1" />
            <div className="h-3 w-5/6 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
