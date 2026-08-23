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
    /* No container here: <main> in the layout is already one, and nesting a
       second charged the horizontal gutter twice — 36px a side on a phone,
       which is 18% of a 390px screen spent on nothing. */
    <div className="py-8">
      <Title title="Projects" eyebrow="Selected work" count={projects.length} />

      {/*
        The board. From md up the cards hang a degree or two off square, so the
        grid needs gutter enough that a tilted corner never crosses its
        neighbour, and a little padding so a rotated edge is not clipped. Below
        md the board is flat, so that clearance would only be lost width.

        Two per row from md up; a third column only at xl, where there is
        enough width for a card to still read comfortably. items-stretch keeps
        every card in a row the same height.
      */}
      <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-10 py-3 md:grid-cols-2 md:px-1 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
