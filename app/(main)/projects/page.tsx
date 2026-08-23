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
      <Title title="Projects" eyebrow="Selected work" count={projects.length} />

      {/*
        The board. Cards hang a degree or two off square, so the grid needs
        gutter enough that a tilted corner never crosses its neighbour, and
        vertical padding so the top row's rotation is not clipped by the
        scroll container.

        Two per row from md up; a third column only at xl, where there is
        enough width for a card to still read comfortably. items-stretch keeps
        every card in a row the same height.
      */}
      <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-10 px-1 py-3 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
