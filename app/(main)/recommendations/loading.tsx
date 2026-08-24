import {
  SkeletonScreen,
  SkeletonTitle,
  SkeletonLine,
  SkeletonPill,
  SkeletonBlock,
} from "@/components/general/skeleton/Skeleton";

/** Traces the page: a row of filter pills, then a grid of quote cards that
 *  each end in an avatar, a name and a relation chip. */
export default function Loading() {
  return (
    <SkeletonScreen label="Loading recommendations">
      <SkeletonTitle />

      <div className="mb-10 flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonPill key={i} className="h-9 w-28" />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-parchment/10 bg-parchment/[0.02] p-6 md:p-7"
          >
            <SkeletonBlock className="mb-4 h-5 w-5" />
            <div className="space-y-2.5">
              <SkeletonLine />
              <SkeletonLine w="w-11/12" />
              <SkeletonLine w="w-full" />
              <SkeletonLine w="w-4/5" />
            </div>

            <div className="mt-6 flex items-center gap-3 border-t border-parchment/10 pt-5">
              <SkeletonBlock className="h-11 w-11 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <SkeletonLine w="w-2/3" h="h-3.5" />
                <SkeletonLine w="w-1/2" h="h-2.5" />
              </div>
            </div>

            <div className="mt-3 flex gap-3">
              <SkeletonPill className="h-6 w-24 rounded-md" />
              <SkeletonPill className="h-6 w-20 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonScreen>
  );
}
