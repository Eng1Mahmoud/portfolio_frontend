import {
  DashScreen,
  DashField,
  DashBlock,
} from "@/components/general/skeleton/DashboardSkeleton";

/**
 * Traces the project form: title, demo link, GitHub link and display order,
 * a description textarea, the technologies tag field, an image well and the
 * submit button.
 *
 * Without this file the segment would inherit the list skeleton one level up
 * and show a grid of cards while a form loads.
 */
export default function Loading() {
  return (
    <DashScreen title label="Loading project form">
      <div className="grid grid-cols-1 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <DashField key={i} />
        ))}
        <DashField tall />
        <DashField />
        <DashBlock className="h-[200px] w-full" />
        <DashBlock className="h-10 w-full rounded-md" />
      </div>
    </DashScreen>
  );
}
