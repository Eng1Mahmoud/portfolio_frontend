import { getExperienceById } from "@/actions/getExperienceById";
import EditExperienceForm from "@/components/dashboard/experience/EditExperienceForm";
import { notFound } from "next/navigation";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = await getExperienceById(id);

  if (!experience) {
    notFound();
  }

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
        Edit Experience
      </h2>
      <EditExperienceForm experience={experience} />
    </div>
  );
}
