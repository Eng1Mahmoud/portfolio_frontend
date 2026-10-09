import { SocialLinks } from "@/components/Home/SocialLinks";
import { HomeIntro } from "@/components/Home/HomeIntro";
import { Reveal } from "@/components/general/Reveal";
import { getProfileInfo } from "@/actions/getProfileInfo";
import { getAllProjects } from "@/actions/getAllProjects";
import { getAllSkills } from "@/actions/getAllSkills";
import { getAllRecommendations } from "@/actions/getAllRecommendations";
import { SkillsOrbit } from "@/components/Home/SkillsOrbit";
import { ContentSlider } from "@/components/general/ContentSlider";
import { Title } from "@/components/general/Title";
import { ProjectCard } from "@/components/Projects/ProjectCard";
import { RecommendationCard } from "@/components/recommendations/RecommendationCard";
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
      <section id="home" tabIndex={-1} className="portfolio-section portfolio-intro relative flex items-center">


        <div className="hero-layout relative z-10 grid min-w-0 w-full items-start gap-4 py-4 md:gap-6 md:py-6">

          <div className="min-w-0">
          <HomeIntro profileInfo={profileInfo as IuserInfo} />


          {/* The hero closes with the social links; the CV stays in the navigation. */}
          <Reveal
            delay={0.45}
            trigger="mount"
            className="hero-actions mt-6 pl-6 sm:mt-8 sm:pl-10"
          >
            <SocialLinks profileInfo={profileInfo as IuserInfo} />
          </Reveal>
          </div>
          <div className="hero-visual min-w-0 flex justify-center lg:justify-end">
            <SkillsOrbit skills={skills ?? []} portrait={profileInfo?.avatar?.trim() || profileInfo?.aboutImage?.trim() || "https://dev-mahmoud.sirv.com/portfolio/MAHMOUD.png"} name={profileInfo?.userName || "Mahmoud Mohamed"} />
          </div>
        </div>
      </section>

      <section id="skills" className="portfolio-section">
        <Title title="Skills" eyebrow="What I work with" count={skillCount} />
        <div className="skill-groups">{orderedCategories.map(category => {
          const items = (skills ?? []).filter(skill => (skill.category?.trim() || "Other") === category);
          return <Reveal key={category} delay={0.04} className="skill-group"><SkillGroupHeading category={category} count={items.length} /><div className="skill-grid">{items.map((skill, i) => <SkillCard key={skill._id ?? skill.name} skill={skill} index={i} />)}</div></Reveal>;
        })}</div>
      </section>
      <section id="projects" className="portfolio-section">
        <Title title="Projects" eyebrow="Selected work" count={projectCount} />
        <Reveal><ContentSlider label="Projects" variant="showcase">{(projects ?? []).map((project, i) => <ProjectCard key={project._id ?? project.title} project={project} index={i} />)}</ContentSlider></Reveal>
      </section>

      <section id="experience" className="portfolio-section">
        <div className="mx-auto max-w-4xl"><Title title="My journey" eyebrow="Experience & education" count={(experiences ?? []).length} /><ExperienceTimeline experiences={(experiences ?? []).slice(0, 3)} />{(experiences ?? []).length > 3 && <details className="journey-more"><summary>More experience ({(experiences ?? []).length - 3})</summary><ExperienceTimeline experiences={(experiences ?? []).slice(3)} /></details>}</div>
        <div id="education" className="mx-auto mt-14 max-w-4xl scroll-mt-28">
        <Title title="Education" eyebrow="Where I studied" count={(educations ?? []).length} />
        <EducationTimeline educations={(educations ?? []).slice(0, 2)} />{(educations ?? []).length > 2 && <details className="journey-more"><summary>More education ({(educations ?? []).length - 2})</summary><EducationTimeline educations={(educations ?? []).slice(2)} /></details>}
        </div>
      </section>
      <section id="recommendations" className="portfolio-section">
        <Title title="Testimonials" eyebrow="What people say" count={(recommendations ?? []).length} />
        <Reveal><ContentSlider label="Testimonials" variant="quotes">{(recommendations ?? []).map((item, i) => <RecommendationCard key={item._id ?? item.name} recommendation={item} index={i} />)}</ContentSlider></Reveal>
      </section>
      <section id="contact-us" className="portfolio-section">
        <Title title="Get in touch" eyebrow="Contact" />
        <div className="contact-layout"><Reveal delay={0.12} className="min-w-0"><ContactUsInfo profileInfo={profileInfo as IuserInfo} /></Reveal><Reveal delay={0.22} className="min-w-0"><ContactUsForm /></Reveal></div>
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
