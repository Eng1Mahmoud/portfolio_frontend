import {
  DashScreen,
  DashField,
  DashBlock,
} from "@/components/general/skeleton/DashboardSkeleton";

/**
 * Traces the recommendation form. Without this file the segment would inherit
 * the list skeleton one level up and show a grid of cards while a form loads.
 */
export default function Loading() {
  return (
    <DashScreen title label="Loading recommendation form">
      <div className="grid grid-cols-1 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <DashField key={i} />
        ))}

        <DashBlock className="h-[200px] w-full" />
        <DashField tall />
        <DashBlock className="h-6 w-64 rounded-md" />
        <DashBlock className="h-10 w-full rounded-md" />
      </div>
    </DashScreen>
  );
}
