import {
  SkeletonScreen,
  SkeletonTitle,
  SkeletonLine,
  SkeletonBlock,
  SkeletonPill,
} from "@/components/general/skeleton/Skeleton";

/** Traces the about layout: a square portrait on the left, and on the right a
 *  greeting, a paragraph, six label/value rows, then the CV button. */
export default function Loading() {
  return (
    <SkeletonScreen label="Loading about">
      <div>
        <SkeletonTitle />
        <div className="grid items-center gap-8 md:grid-cols-2">
          <SkeletonBlock className="mx-auto aspect-square w-full max-w-md rounded-lg" />

          <div>
            <SkeletonLine w="w-56" h="h-7" className="mb-5" />
            <div className="mb-7 space-y-3">
              <SkeletonLine />
              <SkeletonLine w="w-11/12" />
              <SkeletonLine w="w-3/4" />
            </div>
            <div className="mb-7 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <SkeletonLine w="w-24" h="h-2.5" />
                  <SkeletonLine w="w-32" h="h-3" />
                </div>
              ))}
            </div>
            <SkeletonPill className="h-11 w-40" />
          </div>
        </div>
      </div>
    </SkeletonScreen>
  );
}
