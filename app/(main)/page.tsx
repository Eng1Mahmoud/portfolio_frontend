import Link from "next/link";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import { SocialLinks } from "@/components/Home/SocialLinks";
import { HomeIntro } from "@/components/Home/HomeIntro";
import { getProfileInfo } from "@/actions/getProfileInfo";
import { getAllProjects } from "@/actions/getAllProjects";
import { IuserInfo } from "@/types/general";

export default async function Home() {
  const [profileInfo, projects] = await Promise.all([
    getProfileInfo(),
    getAllProjects(),
  ]);

  const list = projects ?? [];
  const technologies = new Set(
    list.flatMap((project) =>
      (project.technologies ?? []).map((tech) => tech.trim().toLowerCase()),
    ),
  );

  return (
    /*
      Exactly one viewport tall. The 5rem accounts for the padding the layout
      puts around <main> — pt-16 pb-4 on mobile and py-10 from lg up, which
      both come to 5rem. `min-h` on small screens so a long bio scrolls rather
      than being clipped; a fixed height from lg up, where it fits.
    */
    <section className="relative flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden lg:h-[calc(100dvh-5rem)]">
      {/* Two quiet layers: a faint grid, and one glow set behind the type. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.06] [mask-image:radial-gradient(ellipse_at_30%_50%,white,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[130px]"
      />

      <div className="relative z-10 w-full py-6">
        <HomeIntro
          profileInfo={profileInfo as IuserInfo}
          projectCount={list.length}
          technologyCount={technologies.size}
        />

        <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-4 pl-6 sm:pl-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-medium text-[#06121f] transition-colors hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base"
          >
            View projects
            <FaArrowRight
              aria-hidden="true"
              className="h-3 w-3 transition-transform group-hover:translate-x-1"
            />
          </Link>

          {profileInfo?.cv && (
            <a
              href={profileInfo.cv}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-[#c3cede] transition-colors hover:border-cyan-400/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <FaDownload aria-hidden="true" className="h-3 w-3" />
              Download CV
            </a>
          )}

          <div className="sm:ms-auto">
            <SocialLinks profileInfo={profileInfo as IuserInfo} />
          </div>
        </div>
      </div>
    </section>
  );
}
