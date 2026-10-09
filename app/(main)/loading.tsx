import {
  SkeletonScreen,
  SkeletonLine,
  SkeletonPill,
} from "@/components/general/skeleton/Skeleton";

/**
 * Home hero. Traces HomeIntro: the rail, the mono role line, a two-line name,
 * the one-line role summary, the two figures, then the action row.
 */
export default function Loading() {
  return (
    <SkeletonScreen label="Loading home">
      <section className="flex min-h-[calc(100dvh-5rem)] items-center">
        <div className="relative w-full max-w-4xl pl-6 sm:pl-10">
          <div className="absolute left-0 top-0 h-full w-px bg-parchment/10" />

          <SkeletonLine w="w-40" h="h-2.5" className="mb-5" />

          <SkeletonLine w="w-64" h="h-12" className="mb-2 max-w-full" />
          <SkeletonLine w="w-52" h="h-12" className="max-w-full" />

          <div className="mt-6 max-w-[46ch] space-y-2">
            <SkeletonLine />
            <SkeletonLine w="w-3/5" />
          </div>

          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-parchment/10 pt-5">
            <SkeletonLine w="w-32" h="h-5" />
            <SkeletonLine w="w-36" h="h-5" />
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <SkeletonPill className="h-11 w-36" />
            <SkeletonPill className="h-11 w-36" />
            <SkeletonPill className="h-10 w-10" />
            <SkeletonPill className="h-10 w-10" />
            <SkeletonPill className="h-10 w-10" />
          </div>
        </div>
      </section>
    </SkeletonScreen>
  );
}
