import { getAllRecommendations } from "@/actions/getAllRecommendations";
import RecommendationCard from "@/components/dashboard/recommendations/RecommendationCard";
import { DashPanel, DashEmpty } from "@/components/dashboard/DashPanel";

export default async function Recommendations() {
  const recommendations = (await getAllRecommendations()) || [];

  return (
    <DashPanel
      title="Current Recommendations"
      action={
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
          {recommendations.length} total
        </span>
      }
    >
      {recommendations.length === 0 ? (
        <DashEmpty
          message="No recommendations yet."
          href="/dashboard/recommendations/add"
          cta="Add the first one"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation._id}
              recommendation={recommendation}
            />
          ))}
        </div>
      )}
    </DashPanel>
  );
}
