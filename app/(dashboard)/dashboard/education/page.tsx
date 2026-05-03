import { getAllEducations } from "@/actions/getAllEducations";
import EducationCard from "@/components/dashboard/education/EducationCard";

export default async function Education() {
  const educations = (await getAllEducations()) || [];
  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Current Education
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {educations.map((education) => (
          <div key={education._id}>
            <EducationCard education={education} />
          </div>
        ))}
      </div>
    </div>
  );
}
