import {
  SkeletonScreen,
  SkeletonTitle,
  SkeletonLine,
  SkeletonBlock,
  SkeletonPill,
} from "@/components/general/skeleton/Skeleton";

/** Traces ProjectCard: image well, 4 tag chips + counter, 2 clamped lines,
 *  a "read more" link, then two pill actions pinned to the bottom. */
export default function Loading() {
  return (
    <SkeletonScreen label="Loading projects">
      <div className="container mx-auto px-4 py-8">
        <SkeletonTitle />
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <SkeletonBlock className="h-[190px] rounded-none" />
              <div className="flex flex-1 flex-col p-5">
                <SkeletonLine w="w-2/3" h="h-5" className="mb-3" />
                <div className="mb-3 flex flex-wrap gap-1.5">
                  <SkeletonPill className="h-5 w-16" />
                  <SkeletonPill className="h-5 w-20" />
                  <SkeletonPill className="h-5 w-14" />
                  <SkeletonPill className="h-5 w-18" />
                </div>
                <SkeletonLine className="mb-2" />
                <SkeletonLine w="w-5/6" className="mb-4" />
                <SkeletonLine w="w-24" h="h-4" className="mb-4" />
                <div className="mt-auto flex gap-3">
                  <SkeletonPill className="h-9 w-28" />
                  <SkeletonPill className="h-9 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonScreen>
  );
}
