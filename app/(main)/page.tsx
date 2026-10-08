import { FaArrowRight, FaDownload } from "react-icons/fa";
import { SocialLinks } from "@/components/Home/SocialLinks";
import { HomeIntro } from "@/components/Home/HomeIntro";
import { Reveal } from "@/components/general/Reveal";
import { MagneticLink } from "@/components/general/MagneticLink";
import { getProfileInfo } from "@/actions/getProfileInfo";
import { getAllProjects } from "@/actions/getAllProjects";
import { getAllSkills } from "@/actions/getAllSkills";
import { getAllRecommendations } from "@/actions/getAllRecommendations";
import { SkillsOrbit } from "@/components/Home/SkillsOrbit";
import { ContentSlider } from "@/components/general/ContentSlider";
import { Title } from "@/components/general/Title";
import { ProjectCard } from "@/components/Projects/ProjectCard";
import { RecommendationCard } from "@/components/recommendations/RecommendationCard";
import { PersonalInfo } from "@/components/about/PersonalInfo";
import { ProfileImage } from "@/components/about/ProfileImage";
import { SkillCard } from "@/components/skills/SkillCard";
import { SkillGroupHeading } from "@/components/skills/SkillGroupHeading";
import ExperienceTimeline from "@/components/Experience/ExperienceTimeline";
import EducationTimeline from "@/components/Education/EducationTimeline";
import ContactUsForm from "@/components/contact-us/ContactUsForm";
import ContactUsInfo from "@/components/contact-us/ContactUsInfo";
import { getAllExperiences } from "@/actions/getAllExperiences";
import { getAllEducations } from "@/actions/getAllEducations";
import { SKILL_CATEGORIES } from "@/zod/skillsSchema";
import { IuserInfo } from "@/types/general";
import { Metadata } from "next";
import {
  buildPublicPageMetadata,
  siteDescription,
  siteTitle,
} from "@/utiles/site";
import { buildHomePageJsonLd } from "@/utiles/seo-schemas";

export const metadata: Metadata = buildPublicPageMetadata({
  title: siteTitle,
  description: siteDescription,
  path: "/",
});

export default async function Home() {
  const [profileInfo, projects, skills, recommendations, experiences, educations] = await Promise.all([
    getProfileInfo(),
    getAllProjects(),
    getAllSkills(),
    getAllRecommendations(),
    getAllExperiences(),
    getAllEducations(),
  ]);

  // The technology count comes from the skills collection, not project tags:
  // those contain duplicates and typos that would inflate a unique count.
  const projectCount = (projects ?? []).length;
  const skillCount = (skills ?? []).length;
  const jsonld = buildHomePageJsonLd();
  const categories = Array.from(new Set((skills ?? []).map(skill => skill.category?.trim() || "Other")));
  const orderedCategories = [...SKILL_CATEGORIES.filter(c => categories.includes(c)), ...categories.filter(c => !SKILL_CATEGORIES.some(known => known === c))];

  return (
    <>
      {/* Grows past one viewport when the bio needs it; the 5rem is the padding
       the layout puts around <main>. */}
      <section id="home" className="portfolio-section relative flex min-h-[calc(100dvh-10rem)] items-center">
        {/* Two quiet layers: a faint grid, and one glow set behind the type. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.06] [mask-image:radial-gradient(ellipse_at_30%_50%,white,transparent_70%)]"
        />


        <div className="relative z-10 grid w-full items-center gap-6 py-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
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
              href="#projects"
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
          <div className="flex justify-center lg:justify-end">
            <SkillsOrbit skills={skills ?? []} />
          </div>
        </div>
      </section>

      <section id="about" className="portfolio-section">
        <Title title="About Me" eyebrow="Who I am" />
        <div className="grid items-start gap-8 md:grid-cols-2">
          <ProfileImage profileInfo={profileInfo as IuserInfo} />
          <PersonalInfo profileInfo={profileInfo as IuserInfo} />
        </div>
      </section>
      <section id="skills" className="portfolio-section">
        <Title title="Skills" eyebrow="What I work with" count={skillCount} />
        <div className="space-y-10">{orderedCategories.map(category => {
          const items = (skills ?? []).filter(skill => (skill.category?.trim() || "Other") === category);
          return <div key={category}><SkillGroupHeading category={category} count={items.length} /><div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">{items.map((skill, i) => <SkillCard key={skill._id ?? skill.name} skill={skill} index={i} />)}</div></div>;
        })}</div>
      </section>
      <section id="projects" className="portfolio-section">
        <Title title="Projects" eyebrow="Selected work" count={projectCount} />
        <ContentSlider label="Projects">{(projects ?? []).map((project, i) => <ProjectCard key={project._id ?? project.title} project={project} index={i} />)}</ContentSlider>
      </section>
      <section id="experience" className="portfolio-section">
        <div className="mx-auto max-w-4xl"><Title title="Experience" eyebrow="Where I have worked" count={(experiences ?? []).length} /><ExperienceTimeline experiences={experiences ?? []} /></div>
      </section>
      <section id="education" className="portfolio-section">
        <Title title="Education" eyebrow="Where I studied" count={(educations ?? []).length} />
        <EducationTimeline educations={educations ?? []} />
      </section>
      <section id="recommendations" className="portfolio-section">
        <Title title="Recommendations" eyebrow="What people say" count={(recommendations ?? []).length} />
        <ContentSlider label="Recommendations">{(recommendations ?? []).map((item, i) => <RecommendationCard key={item._id ?? item.name} recommendation={item} index={i} />)}</ContentSlider>
      </section>
      <section id="contact-us" className="portfolio-section">
        <Title title="Get in touch" eyebrow="Contact" />
        <div className="grid items-start gap-8 md:grid-cols-2"><Reveal delay={0.12}><ContactUsForm /></Reveal><Reveal delay={0.22}><ContactUsInfo profileInfo={profileInfo as IuserInfo} /></Reveal></div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonld),
        }}
      />
    </>
  );
}
