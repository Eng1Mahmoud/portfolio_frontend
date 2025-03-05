import { getAllProjects } from "@/actions/getAllProjects";
import ProjectCard from "@/components/dashboard/projects/ProjectCard";
export default async function Projects() {
  const projects = (await getAllProjects()) || [];
  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Current Projects
      </h2>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project._id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
