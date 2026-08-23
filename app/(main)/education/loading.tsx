import {
  SkeletonScreen,
  SkeletonTitle,
  SkeletonLine,
  SkeletonPill,
} from "@/components/general/skeleton/Skeleton";

/** Traces the timeline: a rail on the left, a date pill, then a card holding a
 *  role, a company chip, a description and a row of skill chips. */
export default function Loading() {
  return (
    <SkeletonScreen label="Loading education">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <SkeletonTitle />

          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-2 h-full w-px bg-parchment/10" />
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="mb-12">
                <SkeletonPill className="mb-4 h-6 w-36" />
                <div className="rounded-xl border border-parchment/10 bg-parchment/[0.02] p-5 md:p-6">
                  <SkeletonLine w="w-2/3" h="h-6" className="mb-3" />
                  <div className="mb-5 flex flex-wrap gap-2">
                    <SkeletonPill className="h-7 w-40" />
                    <SkeletonPill className="h-7 w-24" />
                  </div>
                  <div className="mb-5 space-y-2">
                    <SkeletonLine />
                    <SkeletonLine w="w-11/12" />
                    <SkeletonLine w="w-4/5" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <SkeletonPill key={j} className="h-6 w-20" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonScreen>
  );
}
