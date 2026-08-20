import { getProjectById } from "@/actions/getProjectById";
import EditProjectForm from "@/components/dashboard/projects/EditProjectForm";

export default async function EditProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Edit Project
        </h2>
        <div className="space-y-4">
          <EditProjectForm
            initialValues={
              project ?? {
                _id: "",
                title: "",
                description: "",
                imageUrl: "",
                demoLink: "",
                githubLink: "",
                technologies: [],
              }
            }
          />
        </div>
      </div>
    </div>
  );
}
