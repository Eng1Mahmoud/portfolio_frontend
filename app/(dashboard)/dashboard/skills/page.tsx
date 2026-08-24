import { getAllSkills } from "@/actions/getAllSkills";
import SkillCard from "@/components/dashboard/skills/SkillCard";
import { DashPanel, DashEmpty } from "@/components/dashboard/DashPanel";

export default async function Skills() {
  const skills = (await getAllSkills()) || [];

  return (
    <DashPanel
      title="Current Skills"
      action={
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
          {skills.length} total
        </span>
      }
    >
      {skills.length === 0 ? (
        <DashEmpty
          message="No skills yet."
          href="/dashboard/skills/add"
          cta="Add the first one"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill._id} skill={skill} />
          ))}
        </div>
      )}
    </DashPanel>
  );
}
