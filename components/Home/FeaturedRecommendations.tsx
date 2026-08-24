import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { IRecommendation } from "@/types/general";
import { RecommendationCard } from "@/components/recommendations/RecommendationCard";

/**
 * A three-card taste of the recommendations page, sitting below the hero.
 * Renders nothing when there is nothing to show, so the home page never ends
 * on an empty heading.
 */
export const FeaturedRecommendations = ({
  recommendations,
}: {
  recommendations: IRecommendation[];
}) => {
  // Prefer the ones flagged in the dashboard; fall back to the rest so the
  // section still fills before anything has been featured. No sorting here —
  // the API already applies the dashboard's order, and re-sorting by date
  // would throw that away.
  const featured = recommendations.filter((item) => item.featured);
  const pool = featured.length > 0 ? featured : recommendations;
  const picks = pool.slice(0, 3);

  if (picks.length === 0) return null;

  return (
    <section
      aria-labelledby="featured-recommendations"
      className="relative z-10 border-t border-parchment/10 py-16 md:py-20"
    >
      <div className="relative mb-10 pl-6 sm:pl-10">
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-sage via-parchment/12 to-transparent"
        />
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-sage">
          What people say
        </p>
        <h2
          id="featured-recommendations"
          className="display-title text-[clamp(1.5rem,3.5vw,2.1rem)] leading-[1.1] text-ink-strong"
        >
          Recommendations
        </h2>
      </div>

      {/* auto-rows-fr keeps the three cards one height — see RecommendationsGrid. */}
      <div className="grid auto-rows-fr grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
        {picks.map((recommendation, index) => (
          <RecommendationCard
            key={recommendation._id ?? recommendation.name}
            recommendation={recommendation}
            index={index}
          />
        ))}
      </div>

      <div className="mt-8 pl-6 sm:pl-10">
        <Link
          href="/recommendations"
          className="group inline-flex items-center gap-2 rounded-full border border-parchment/15 px-6 py-3 text-sm font-medium text-ink-body transition-colors hover:border-sage/60 hover:text-ink-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          Read all recommendations
          <FaArrowRight
            aria-hidden="true"
            className="h-3 w-3 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
};
