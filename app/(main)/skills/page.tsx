import { Title } from "@/components/general/Title";
import { getAllSkills } from "@/actions/getAllSkills";
import { SkillCard } from "@/components/skills/SkillCard";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Skills",
  description: "Skills Mahmoud Mohamed",
};
export default async function SkillsPage() {
  const skills = (await getAllSkills()) || [];
  return (
    <div>
      <Title title="Skills" eyebrow="What I work with" />
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4 md:gap-6 justify-center items-center">
        {skills.map((skill) => (
          <SkillCard key={skill._id} skill={skill} />
        ))}
      </div>
    </div>
  );
}
