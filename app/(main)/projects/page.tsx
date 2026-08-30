import { Title } from "@/components/general/Title";
import { getAllProjects } from "@/actions/getAllProjects";
import { getProfileInfo } from "@/actions/getProfileInfo";
import { ProjectCard } from "@/components/Projects/ProjectCard";
import { Metadata } from "next";
import { buildPublicPageMetadata } from "@/utiles/site";
import { buildProjectsJsonLd } from "@/utiles/seo-schemas";

const description =
  "Production web applications built by Mahmoud Mohamed, Frontend Software Engineer — React.js and Next.js dashboards, e-commerce, booking and chat platforms, with live demos and source.";

export const metadata: Metadata = buildPublicPageMetadata({
  title: "Projects",
  description,
  path: "/projects",
  ogTitle: "Web Projects | Mahmoud Mohamed — Frontend Engineer",
});

export default async function ProjectsPage() {
  const [projects, profileInfo] = await Promise.all([
    getAllProjects(),
    getProfileInfo(),
  ]);
  const projectsData = projects || [];
  const jsonld = buildProjectsJsonLd(projectsData, profileInfo?.avatar);

  return (
    /* No container: <main> is already one, and nesting a second charged the
       gutter twice. */
    <div className="py-8">
      <Title
        title="Projects"
        eyebrow="Selected work"
        count={projectsData.length}
      />

      {/* Wide gutters so a tilted corner never crosses its neighbour. md:px-1
          is clearance for that tilt; below md the board is flat and it would
          only be lost width. */}
      <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-10 py-3 md:grid-cols-2 md:px-1 xl:grid-cols-3">
        {projectsData.map((project, index) => (
          <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonld),
        }}
      />
    </div>
  );
}
