import { Metadata } from "next";
import { getAllRecommendations } from "@/actions/getAllRecommendations";
import { Title } from "@/components/general/Title";
import { RecommendationsGrid } from "@/components/recommendations/RecommendationsGrid";

export const metadata: Metadata = {
  title: "Recommendations",
  description:
    "What managers, colleagues, freelance clients and university friends have said about working with Mahmoud Mohamed.",
};

export default async function RecommendationsPage() {
  const recommendations = (await getAllRecommendations()) || [];

  return (
    <div>
      <Title
        title="Recommendations"
        eyebrow="What people say"
        count={recommendations.length}
      />

      <RecommendationsGrid recommendations={recommendations} />
    </div>
  );
}
