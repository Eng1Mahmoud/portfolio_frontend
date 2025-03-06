import { Title } from "@/components/general/Title";
import { getAllSkills } from "@/actions/getAllSkills";
import { SkillCard } from "@/components/skills/SkillCard";

export default async function SkillsPage() {
  const skills = (await getAllSkills()) || [];
  return (
    <div>
      <Title title="Skills" />
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 md:gap-6 justify-center items-center">
        {skills.map((skill) => (
          <SkillCard key={skill._id} skill={skill} />
        ))}
      </div>
    </div>
  );
}
