import { getAllExperiences } from "@/actions/getAllExperiences";
import ExperienceCard from "@/components/dashboard/experience/ExperienceCard";

export default async function Experience() {
  const experiences = (await getAllExperiences()) || [];
  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Current Experience
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiences.map((experience) => (
          <div key={experience._id}>
            <ExperienceCard experience={experience} />
          </div>
        ))}
      </div>
    </div>
  );
}
