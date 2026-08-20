import {
  SkeletonScreen,
  SkeletonTitle,
  SkeletonLine,
  SkeletonBlock,
} from "@/components/general/skeleton/Skeleton";

/** Traces the grouped skills page: a mono group heading with a count and a
 *  rule, then a row of square icon cards — 2 up on mobile, 5 across from md. */
export default function Loading() {
  return (
    <SkeletonScreen label="Loading skills">
      <div>
        <SkeletonTitle />
        <div className="space-y-12">
          {[8, 5].map((count, group) => (
            <section key={group}>
              <div className="mb-5 flex items-center gap-4">
                <SkeletonLine w="w-24" h="h-2.5" />
                <SkeletonLine w="w-4" h="h-2.5" />
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
                {Array.from({ length: count }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-6"
                  >
                    <SkeletonBlock className="h-20 w-20 rounded-xl" />
                    <SkeletonLine w="w-16" h="h-3" />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </SkeletonScreen>
  );
}
