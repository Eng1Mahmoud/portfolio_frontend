import { getEducationById } from "@/actions/getEducationById";
import EditEducationForm from "@/components/dashboard/education/EditEducationForm";
import { notFound } from "next/navigation";

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const education = await getEducationById(id);

  if (!education) {
    notFound();
  }

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
        Edit Education
      </h2>
      <EditEducationForm education={education} />
    </div>
  );
}
