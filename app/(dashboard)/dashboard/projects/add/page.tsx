import AddProjectForm from "@/components/dashboard/projects/AddProjectForm";
export default function AddProject() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Add New Project
        </h2>
        <div className="space-y-4">
          <AddProjectForm />
        </div>
      </div>
    </div>
  );
}
