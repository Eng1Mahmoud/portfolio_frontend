import { getAllExperiences } from "@/actions/getAllExperiences";
import { getProfileInfo } from "@/actions/getProfileInfo";
import { Metadata } from "next";
import { Title } from "@/components/general/Title";
import ExperienceTimeline from "@/components/Experience/ExperienceTimeline";
import { buildPublicPageMetadata } from "@/utiles/site";
import { buildExperienceJsonLd } from "@/utiles/seo-schemas";

const description =
  "Mahmoud Mohamed's career as a Frontend Software Engineer — roles, companies and the React.js and Next.js work delivered in each.";

export const metadata: Metadata = buildPublicPageMetadata({
  title: "Experience",
  description,
  path: "/experience",
  ogTitle: "Professional Experience | Mahmoud Mohamed — Frontend Engineer",
});

export default async function ExperiencePage() {
  const [experiences, profileInfo] = await Promise.all([
    getAllExperiences(),
    getProfileInfo(),
  ]);
  const experiencesData = experiences || [];
  const jsonld = buildExperienceJsonLd(experiencesData, profileInfo?.avatar);

  return (
    /* <main> is already the container — see the projects page. */
    <div>
      <div className="max-w-4xl mx-auto">
        <Title
          title="Experience"
          eyebrow="Where I have worked"
          count={experiencesData.length}
        />

        <ExperienceTimeline experiences={experiencesData} />
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
