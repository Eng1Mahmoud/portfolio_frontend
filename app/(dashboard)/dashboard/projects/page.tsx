import { getAllProjects } from "@/actions/getAllProjects";
import ProjectCard from "@/components/dashboard/projects/ProjectCard";
import { DashPanel, DashEmpty } from "@/components/dashboard/DashPanel";

export default async function Projects() {
  const projects = (await getAllProjects()) || [];

  return (
    <DashPanel
      title="Current Projects"
      action={
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
          {projects.length} total
        </span>
      }
    >
      {projects.length === 0 ? (
        <DashEmpty
          message="No projects yet."
          href="/dashboard/projects/add"
          cta="Add the first one"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </DashPanel>
  );
}
