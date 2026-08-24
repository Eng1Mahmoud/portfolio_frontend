import {
  DashScreen,
  DashLine,
  DashBlock,
} from "@/components/general/skeleton/DashboardSkeleton";

/** Traces the recommendations list: a 1/2/3 column grid of cards, each with an
 *  avatar, a name, a relation chip, the quote, then the edit and delete actions. */
export default function Loading() {
  return (
    <DashScreen title label="Loading recommendations">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-parchment/10 p-4">
            <div className="mb-4 flex items-start gap-4">
              <DashBlock className="h-12 w-12 shrink-0 rounded-full" />
              <div className="flex-1">
                <DashLine w="w-2/3" h="h-5" className="mb-2" />
                <DashLine w="w-1/2" />
              </div>
            </div>
            <DashLine className="mb-1" />
            <DashLine className="mb-1" />
            <DashLine w="w-5/6" className="mb-4" />
            <div className="flex justify-center gap-3">
              <DashBlock className="h-9 w-24 rounded-md" />
              <DashBlock className="h-9 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </DashScreen>
  );
}
