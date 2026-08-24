import { IRecommendation } from "@/types/general";
import { RecommendationCard } from "./RecommendationCard";

/**
 * Order comes from the API, which already sorts featured first then newest —
 * there is no second ordering rule here to keep in sync with it.
 *
 * `auto-rows-fr` is what equalises the cards: a grid row is otherwise only as
 * tall as its own tallest card, so a row holding one long quote and a row
 * holding three short ones end up visibly different heights. Making every row
 * an equal fraction gives one height across the whole grid, and the card's own
 * `flex-1` quote pushes each attribution down to a shared baseline.
 */
export const RecommendationsGrid = ({
  recommendations,
}: {
  recommendations: IRecommendation[];
}) => {
  if (recommendations.length === 0) {
    return (
      <p className="rounded-xl border border-parchment/10 bg-parchment/[0.02] p-8 text-center text-sm text-ink-muted">
        No recommendations yet.
      </p>
    );
  }

  return (
    <div className="grid auto-rows-fr grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
      {recommendations.map((recommendation, index) => (
        <RecommendationCard
          key={recommendation._id ?? recommendation.name}
          recommendation={recommendation}
          index={index}
        />
      ))}
    </div>
  );
};
