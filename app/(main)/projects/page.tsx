import { Title } from "@/components/general/Title";
import { getAllProjects } from "@/actions/getAllProjects";
import { ProjectCard } from "@/components/Projects/ProjectCard";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Projects",
  description: "Projects Mahmoud Mohamed",
};
export default async function ProjectsPage() {
  const projects = (await getAllProjects()) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <Title title="Projects" />

      {/* Two per row from md up; a third column only at xl, where there is
          enough width for a card to still read comfortably. items-stretch
          keeps every card in a row the same height. */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}
