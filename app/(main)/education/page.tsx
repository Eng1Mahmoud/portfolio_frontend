import { Title } from "@/components/general/Title";
import EducationTimeline from "@/components/Education/EducationTimeline";
import { getAllEducations } from "@/actions/getAllEducations";
import { getProfileInfo } from "@/actions/getProfileInfo";
import { Metadata } from "next";
import { buildPublicPageMetadata } from "@/utiles/site";
import { buildEducationJsonLd } from "@/utiles/seo-schemas";

const description =
  "Mahmoud Mohamed's academic background — a degree in Computers and Artificial Intelligence, plus the courses behind his frontend engineering work.";

export const metadata: Metadata = buildPublicPageMetadata({
  title: "Education",
  description,
  path: "/education",
  ogTitle: "Education & Certifications | Mahmoud Mohamed — Frontend Engineer",
});

export default async function Education() {
  const [educations, profileInfo] = await Promise.all([
    getAllEducations(),
    getProfileInfo(),
  ]);
  const educationsData = educations || [];
  const jsonld = buildEducationJsonLd(educationsData, profileInfo?.avatar);

  return (
    <div>
      <Title
        title="Education"
        eyebrow="Where I studied"
        count={educationsData.length}
      />
      <EducationTimeline educations={educationsData} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonld),
        }}
      />
    </div>
  );
}
