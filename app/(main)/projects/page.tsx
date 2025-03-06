import { Title } from "@/components/general/Title";
import { getAllProjects } from "@/actions/getAllProjects";
import { ProjectCard } from "@/components/Projects/ProjectCard";

export default async function ProjectsPage() {
  const projects = (await getAllProjects()) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <Title title="Projects" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}
