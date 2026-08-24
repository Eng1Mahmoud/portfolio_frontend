import { getAllEducations } from "@/actions/getAllEducations";
import EducationCard from "@/components/dashboard/education/EducationCard";
import { DashPanel, DashEmpty } from "@/components/dashboard/DashPanel";

export default async function Education() {
  const educations = (await getAllEducations()) || [];

  return (
    <DashPanel
      title="Current Education"
      action={
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
          {educations.length} total
        </span>
      }
    >
      {educations.length === 0 ? (
        <DashEmpty
          message="No education entries yet."
          href="/dashboard/education/add"
          cta="Add the first one"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {educations.map((education) => (
            <EducationCard key={education._id} education={education} />
          ))}
        </div>
      )}
    </DashPanel>
  );
}
