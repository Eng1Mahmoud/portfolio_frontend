import { getAllExperiences } from "@/actions/getAllExperiences";
import ExperienceCard from "@/components/dashboard/experience/ExperienceCard";
import { DashPanel, DashEmpty } from "@/components/dashboard/DashPanel";

export default async function Experience() {
  const experiences = (await getAllExperiences()) || [];

  return (
    <DashPanel
      title="Current Experience"
      action={
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
          {experiences.length} total
        </span>
      }
    >
      {experiences.length === 0 ? (
        <DashEmpty
          message="No experience entries yet."
          href="/dashboard/experience/add"
          cta="Add the first one"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <ExperienceCard key={experience._id} experience={experience} />
          ))}
        </div>
      )}
    </DashPanel>
  );
}
