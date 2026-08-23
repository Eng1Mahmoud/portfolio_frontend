import { FaArrowRight, FaDownload } from "react-icons/fa";
import { SocialLinks } from "@/components/Home/SocialLinks";
import { HomeIntro } from "@/components/Home/HomeIntro";
import { Reveal } from "@/components/general/Reveal";
import { MagneticLink } from "@/components/general/MagneticLink";
import { getProfileInfo } from "@/actions/getProfileInfo";
import { getAllProjects } from "@/actions/getAllProjects";
import { getAllSkills } from "@/actions/getAllSkills";
import { IuserInfo } from "@/types/general";

export default async function Home() {
  const [profileInfo, projects, skills] = await Promise.all([
    getProfileInfo(),
    getAllProjects(),
    getAllSkills(),
  ]);

  // The technology count comes from the skills collection, not project tags:
  // those contain duplicates and typos that would inflate a unique count.
  const projectCount = (projects ?? []).length;
  const skillCount = (skills ?? []).length;

  return (
    /* Grows past one viewport when the bio needs it; the 5rem is the padding
       the layout puts around <main>. */
    <section className="relative flex min-h-[calc(100dvh-5rem)] items-center">
      {/* Two quiet layers: a faint grid, and one glow set behind the type. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.06] [mask-image:radial-gradient(ellipse_at_30%_50%,white,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full bg-sage/10 blur-[130px]"
      />

      <div className="relative z-10 w-full py-6">
        <HomeIntro
          profileInfo={profileInfo as IuserInfo}
          projectCount={projectCount}
          technologyCount={skillCount}
        />

        {/* Last beat: the actions arrive after the figures finish counting. */}
        <Reveal
          delay={0.62}
          className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-4 pl-6 sm:pl-10"
        >
          <MagneticLink
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-medium text-surface-base transition-colors hover:bg-sage-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base"
          >
            View projects
            <FaArrowRight
              aria-hidden="true"
              className="h-3 w-3 transition-transform group-hover:translate-x-1"
            />
          </MagneticLink>

          {profileInfo?.cv && (
            <MagneticLink
              href={profileInfo.cv}
              external
              download
              className="inline-flex items-center gap-2 rounded-full border border-parchment/15 px-6 py-3 text-sm font-medium text-ink-body transition-colors hover:border-sage/60 hover:text-ink-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <FaDownload aria-hidden="true" className="h-3 w-3" />
              Download CV
            </MagneticLink>
          )}

          <div className="sm:ms-auto">
            <SocialLinks profileInfo={profileInfo as IuserInfo} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
