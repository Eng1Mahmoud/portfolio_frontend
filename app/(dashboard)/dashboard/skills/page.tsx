import SkillCard from "@/components/dashboard/skills/SkillCard";
import { Fetch } from "@/fetch/Fetch";
import { SkillsResponse } from "@/types/apiResponses";
export default async function Skills() {
  const { data } = await Fetch<SkillsResponse, null>({
    endpoint: "skills",
    method: "GET",
    tags: ["skills"],
  });

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Current Skills
      </h2>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.skills.map((skill) => (
          <div key={skill._id}>
            <SkillCard skill={skill} />
          </div>
        ))}
      </div>
    </div>
  );
}
