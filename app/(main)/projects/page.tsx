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
    /* No container: <main> is already one, and nesting a second charged the
       gutter twice. */
    <div className="py-8">
      <Title title="Projects" eyebrow="Selected work" count={projects.length} />

      {/* Wide gutters so a tilted corner never crosses its neighbour. md:px-1
          is clearance for that tilt; below md the board is flat and it would
          only be lost width. */}
      <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-10 py-3 md:grid-cols-2 md:px-1 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
