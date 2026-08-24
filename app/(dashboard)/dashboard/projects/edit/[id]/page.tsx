import { getProjectById } from "@/actions/getProjectById";
import EditProjectForm from "@/components/dashboard/projects/EditProjectForm";
import { DashPanel } from "@/components/dashboard/DashPanel";

export default async function EditProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  return (
    <DashPanel title="Edit Project" className="mx-auto max-w-4xl">
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
    </DashPanel>
  );
}
