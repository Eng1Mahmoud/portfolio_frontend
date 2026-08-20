import {
  SkeletonScreen,
  SkeletonTitle,
  SkeletonLine,
  SkeletonBlock,
  SkeletonPill,
} from "@/components/general/skeleton/Skeleton";

/** Traces the contact layout: three fields plus a textarea and a submit button
 *  on the left, and four icon/label/value rows on the right. */
export default function Loading() {
  return (
    <SkeletonScreen label="Loading contact">
      <div>
        <SkeletonTitle />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <SkeletonLine w="w-24" h="h-2.5" />
                <SkeletonBlock className="h-12 w-full" />
              </div>
            ))}
            <div className="space-y-2">
              <SkeletonLine w="w-28" h="h-2.5" />
              <SkeletonBlock className="h-36 w-full" />
            </div>
            <SkeletonBlock className="h-11 w-full rounded-md" />
          </div>

          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5"
              >
                <SkeletonBlock className="h-11 w-11 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <SkeletonLine w="w-20" h="h-2.5" />
                  <SkeletonLine w="w-40" h="h-4" />
                </div>
              </div>
            ))}
            <SkeletonPill className="h-10 w-32" />
          </div>
        </div>
      </div>
    </SkeletonScreen>
  );
}
