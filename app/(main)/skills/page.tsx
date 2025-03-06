import { Title } from "@/components/general/Title";
import { getAllSkills } from "@/actions/getAllSkills";
import Image from "next/image";
export default async function SkillsPage() {
  const skills = (await getAllSkills()) || [];
  return (
    <div>
      <Title title="Skills" />
      <div
        className="
        grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 
        gap-4 md:gap-6 
        justify-center items-center
      "
      >
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="
            flex flex-col gap-2 justify-center items-center
            text-center 
          "
          >
            <Image
              src={skill.imageUrl}
              alt={skill.name}
              width={1000}
              height={1000}
              className="w-20 h-20"
            />
            <p className="text-sm md:text-base font-semibold">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
