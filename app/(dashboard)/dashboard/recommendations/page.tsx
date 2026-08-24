import { getAllRecommendations } from "@/actions/getAllRecommendations";
import RecommendationCard from "@/components/dashboard/recommendations/RecommendationCard";

export default async function Recommendations() {
  const recommendations = (await getAllRecommendations()) || [];
  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Current Recommendations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((recommendation) => (
          <div key={recommendation._id}>
            <RecommendationCard recommendation={recommendation} />
          </div>
        ))}
      </div>
    </div>
  );
}
