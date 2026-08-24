import AddProjectForm from "@/components/dashboard/projects/AddProjectForm";
import { DashPanel } from "@/components/dashboard/DashPanel";

export default function AddProject() {
  return (
    <DashPanel title="Add New Project" className="mx-auto max-w-4xl">
      <AddProjectForm />
    </DashPanel>
  );
}
