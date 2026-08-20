import {
  SkeletonScreen,
  SkeletonTitle,
  SkeletonLine,
  SkeletonBlock,
} from "@/components/general/skeleton/Skeleton";

/** Traces SkillCard: a square icon over a short label, 2 up on mobile and
 *  5 across from md — the same grid the page uses. */
export default function Loading() {
  return (
    <SkeletonScreen label="Loading skills">
      <div>
        <SkeletonTitle />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-6"
            >
              <SkeletonBlock className="h-20 w-20 rounded-xl" />
              <SkeletonLine w="w-16" h="h-3" />
            </div>
          ))}
        </div>
      </div>
    </SkeletonScreen>
  );
}
