import { Metadata } from "next";
import { getAllRecommendations } from "@/actions/getAllRecommendations";
import { getProfileInfo } from "@/actions/getProfileInfo";
import { Title } from "@/components/general/Title";
import { RecommendationsGrid } from "@/components/recommendations/RecommendationsGrid";
import { buildPublicPageMetadata } from "@/utiles/site";
import { buildRecommendationsJsonLd } from "@/utiles/seo-schemas";

const description =
  "What managers, team members and clients say about working with Mahmoud Mohamed, Frontend Software Engineer — LinkedIn recommendations in full.";

export const metadata: Metadata = buildPublicPageMetadata({
  title: "Recommendations",
  description,
  path: "/recommendations",
  ogTitle: "Recommendations | Mahmoud Mohamed — Frontend Engineer",
});

export default async function RecommendationsPage() {
  const [recommendations, profileInfo] = await Promise.all([
    getAllRecommendations(),
    getProfileInfo(),
  ]);
  const recommendationsData = recommendations || [];
  const jsonld = buildRecommendationsJsonLd(
    recommendationsData,
    profileInfo?.avatar,
  );

  return (
    <div>
      <Title
        title="Recommendations"
        eyebrow="What people say"
        count={recommendationsData.length}
      />

      <RecommendationsGrid recommendations={recommendationsData} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonld),
        }}
      />
    </div>
  );
}
