import Link from "next/link";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import { SocialLinks } from "@/components/Home/SocialLinks";
import { HomeIntro } from "@/components/Home/HomeIntro";
import { Reveal } from "@/components/general/Reveal";
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

  // Both figures are counted from the data the site already serves, so they
  // move on their own as projects and skills are added.
  //
  // The technology count comes from the skills collection rather than from
  // the tags on projects: the skills list is the canonical one, while the
  // project tags contain duplicates across projects and a few typos
  // ("Talwindcss", "Expres.js") that would inflate a unique count.
  const projectCount = (projects ?? []).length;
  const skillCount = (skills ?? []).length;

  return (
    /*
      Fills one viewport when the content fits, and grows past it when it does
      not. A fixed height with overflow-hidden was clipping the end of the
      hero on shorter viewports — the bio runs ~90 words, so how much room it
      needs depends on the window.

      The 5rem is the padding the layout puts around <main>: pt-16 pb-4 on
      mobile and py-10 from lg up, which both come to 5rem.
    */
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

        {/* Last beat of the hero sequence: the actions arrive after the
            figures have finished counting. */}
        <Reveal
          delay={0.62}
          className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-4 pl-6 sm:pl-10"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-medium text-surface-base transition-colors hover:bg-sage-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base"
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
              className="inline-flex items-center gap-2 rounded-full border border-parchment/15 px-6 py-3 text-sm font-medium text-ink-body transition-colors hover:border-sage/60 hover:text-ink-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <FaDownload aria-hidden="true" className="h-3 w-3" />
              Download CV
            </a>
          )}

          <div className="sm:ms-auto">
            <SocialLinks profileInfo={profileInfo as IuserInfo} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
