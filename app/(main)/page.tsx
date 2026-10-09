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
import { ServicesSection } from "@/components/services/ServicesSection";
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
  const [
    profileInfo,
    projects,
    skills,
    recommendations,
    experiences,
    educations,
  ] = await Promise.all([
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
  const categories = Array.from(
    new Set((skills ?? []).map((skill) => skill.category?.trim() || "Other")),
  );
  const orderedCategories = [
    ...SKILL_CATEGORIES.filter((c) => categories.includes(c)),
    ...categories.filter((c) => !SKILL_CATEGORIES.some((known) => known === c)),
  ];

  return (
    <>
      {/* Grows past one viewport when the bio needs it; the 5rem is the padding
       the layout puts around <main>. */}
      <section
        id="home"
        tabIndex={-1}
        className="portfolio-section relative! py-10 sm:py-11 md:py-14 [border-bottom:var(--section-border)]! [scroll-margin-top:12px]! [&:first-child]:pt-3! [&:first-child]:[border-bottom:0]! [&:last-of-type]:[border-bottom:0]!  portfolio-intro pb-7! max-md:pb-5! [min-height:min(72svh,_780px)]! max-md:[min-height:auto]! relative flex items-center"
      >
        <div className="hero-layout grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] max-md:[gap:10px]! max-md:[@media(max-height:700px)]:gap-2! max-md:[@media(max-height:700px)]:py-2! relative z-10 grid min-w-0 w-full items-start gap-4 py-4 md:gap-6 md:py-6">
          <div className="min-w-0">
            <HomeIntro profileInfo={profileInfo as IuserInfo} />

            {/* The hero closes with the social links; the CV stays in the navigation. */}
            <Reveal
              delay={0.45}
              trigger="mount"
              className="hero-actions max-md:[@media(max-height:700px)]:mt-5! mt-6 pl-6 sm:mt-8 sm:pl-10"
            >
              <SocialLinks profileInfo={profileInfo as IuserInfo} />
            </Reveal>
          </div>
          <div className="hero-visual max-md:[margin-top:-18px]! min-w-0 flex justify-center lg:justify-end">
            <SkillsOrbit
              skills={skills ?? []}
              portrait={
                profileInfo?.avatar?.trim() ||
                profileInfo?.aboutImage?.trim() ||
                "https://dev-mahmoud.sirv.com/portfolio/MAHMOUD.png"
              }
              name={profileInfo?.userName || "Mahmoud Mohamed"}
            />
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="portfolio-section relative! py-10 sm:py-11 md:py-14 [border-bottom:var(--section-border)]! [scroll-margin-top:12px]! [&:first-child]:pt-3! [&:first-child]:[border-bottom:0]! [&:last-of-type]:[border-bottom:0]! "
      >
        <Title title="Skills" eyebrow="What I work with" count={skillCount} />
        <div className="skill-groups grid!">
          {orderedCategories.map((category) => {
            const items = (skills ?? []).filter(
              (skill) => (skill.category?.trim() || "Other") === category,
            );
            return (
              <Reveal
                key={category}
                delay={0.04}
                className="skill-group grid! [grid-template-columns:minmax(150px,_0.6fr)_minmax(0,_2fr)]! gap-7! py-6! [border-top:var(--hairline-border)]! [&_>_div:first-child]:[align-self:start]! [&_>_div:first-child]:pt-3! [&_>_div:first-child]:min-w-0! [&_h2]:tracking-normal! [&_h2]:font-main! [&_h2]:[font-size:14px]! [&_h2]:normal-case! [&_>_div:first-child_>_span:last-child]:hidden! max-md:[grid-template-columns:minmax(0,_1fr)]! max-md:gap-2! max-md:[&_>_div:first-child]:[padding-top:0]! max-md:[&_>_div:first-child]:mb-2!"
              >
                <SkillGroupHeading category={category} count={items.length} />
                <div className="skill-grid grid! grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {items.map((skill, i) => (
                    <SkillCard
                      key={skill._id ?? skill.name}
                      skill={skill}
                      index={i}
                    />
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
      <section id="services" className="portfolio-section relative! py-10 sm:py-11 md:py-14 [border-bottom:var(--section-border)]! [scroll-margin-top:12px]! [&:first-child]:pt-3! [&:first-child]:[border-bottom:0]! [&:last-of-type]:[border-bottom:0]! ">
        <Title title="Services" eyebrow="What I can build for you" />
        <ServicesSection />
      </section>
      <section
        id="projects"
        className="portfolio-section relative! py-10 sm:py-11 md:py-14 [border-bottom:var(--section-border)]! [scroll-margin-top:12px]! [&:first-child]:pt-3! [&:first-child]:[border-bottom:0]! [&:last-of-type]:[border-bottom:0]! "
      >
        <Title title="Projects" eyebrow="Selected work" count={projectCount} />
        <Reveal>
          <ContentSlider label="Projects" variant="showcase">
            {(projects ?? []).map((project, i) => (
              <ProjectCard
                key={project._id ?? project.title}
                project={project}
                index={i}
              />
            ))}
          </ContentSlider>
        </Reveal>
      </section>

      <section
        id="experience"
        className="portfolio-section relative! py-10 sm:py-11 md:py-14 [border-bottom:var(--section-border)]! [scroll-margin-top:12px]! [&:first-child]:pt-3! [&:first-child]:[border-bottom:0]! [&:last-of-type]:[border-bottom:0]! "
      >
        <div className="mx-auto max-w-4xl">
          <Title
            title="My journey"
            eyebrow="Experience & education"
            count={(experiences ?? []).length}
          />
          <ExperienceTimeline experiences={(experiences ?? []).slice(0, 3)} />
          {(experiences ?? []).length > 3 && (
            <details className="journey-more my-7! [border-top:var(--hairline-border)]! [&_summary]:[cursor:pointer]! [&_summary]:text-sage! [&_summary]:py-5! [&_summary:focus-visible]:[outline:2px_solid_var(--portfolio-accent)]! [&_summary:focus-visible]:[outline-offset:4px]! [&[open]_summary]:mb-6!">
              <summary>
                More experience ({(experiences ?? []).length - 3})
              </summary>
              <ExperienceTimeline experiences={(experiences ?? []).slice(3)} />
            </details>
          )}
        </div>
        <div id="education" className="mx-auto mt-14 max-w-4xl scroll-mt-28">
          <Title
            title="Education"
            eyebrow="Where I studied"
            count={(educations ?? []).length}
          />
          <EducationTimeline educations={(educations ?? []).slice(0, 2)} />
          {(educations ?? []).length > 2 && (
            <details className="journey-more my-7! [border-top:var(--hairline-border)]! [&_summary]:[cursor:pointer]! [&_summary]:text-sage! [&_summary]:py-5! [&_summary:focus-visible]:[outline:2px_solid_var(--portfolio-accent)]! [&_summary:focus-visible]:[outline-offset:4px]! [&[open]_summary]:mb-6!">
              <summary>
                More education ({(educations ?? []).length - 2})
              </summary>
              <EducationTimeline educations={(educations ?? []).slice(2)} />
            </details>
          )}
        </div>
      </section>
      <section
        id="recommendations"
        className="portfolio-section relative! py-10 sm:py-11 md:py-14 [border-bottom:var(--section-border)]! [scroll-margin-top:12px]! [&:first-child]:pt-3! [&:first-child]:[border-bottom:0]! [&:last-of-type]:[border-bottom:0]! "
      >
        <Title
          title="Testimonials"
          eyebrow="What people say"
          count={(recommendations ?? []).length}
        />
        <Reveal>
          <ContentSlider label="Testimonials" variant="quotes">
            {(recommendations ?? []).map((item, i) => (
              <RecommendationCard
                key={item._id ?? item.name}
                recommendation={item}
                index={i}
              />
            ))}
          </ContentSlider>
        </Reveal>
      </section>
      <section
        id="contact-us"
        className="portfolio-section relative! py-10 sm:py-11 md:py-14 [border-bottom:var(--section-border)]! [scroll-margin-top:12px]! [&:first-child]:pt-3! [&:first-child]:[border-bottom:0]! [&:last-of-type]:[border-bottom:0]! "
      >
        <Title title="Get in touch" eyebrow="Contact" />
        <div className="contact-layout grid! grid-cols-1 gap-9 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-8 lg:gap-16">
          <Reveal delay={0.12} className="min-w-0">
            <ContactUsInfo profileInfo={profileInfo as IuserInfo} />
          </Reveal>
          <Reveal delay={0.22} className="min-w-0">
            <ContactUsForm />
          </Reveal>
        </div>
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
