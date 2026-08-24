import React from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { IRecommendation } from "@/types/general";
import DeleteButton from "@/components/general/DeleteButton";
import { DashCard, EditLink } from "@/components/dashboard/DashCard";
import { deleteRecommendationAction } from "@/actions/deleteRecommendation";

const RecommendationCard = ({
  recommendation,
}: {
  recommendation: IRecommendation;
}) => {
  return (
    <DashCard>
      <div className="mb-4 flex-grow">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-start gap-3">
            {recommendation.avatar && (
              <Image
                src={recommendation.avatar}
                alt={recommendation.name}
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-parchment/10"
              />
            )}
            <div className="min-w-0">
              <h3 className="flex items-center gap-2 truncate font-semibold text-ink-strong">
                {recommendation.name}
                {recommendation.featured && (
                  <FaStar
                    className="h-3 w-3 shrink-0 text-wheat"
                    title="Featured"
                  />
                )}
              </h3>
              <p className="truncate text-sm text-ink-body">
                {recommendation.role}
              </p>
              {recommendation.company && (
                <p className="truncate text-xs text-ink-muted">
                  {recommendation.company}
                </p>
              )}
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1">
            <span className="rounded-md border border-parchment/10 bg-parchment/[0.04] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-sage">
              {recommendation.relation}
            </span>
            {/* The list is sorted by this, so it has to be visible here —
                otherwise the only way to work out why one card sits above
                another is to open both. */}
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
              order {recommendation.order ?? "—"}
            </span>
          </div>
        </div>

        {recommendation.date && (
          <p className="mb-2 mt-2 font-mono text-xs text-ink-muted">
            {recommendation.date.slice(0, 10)}
          </p>
        )}

        <p className="line-clamp-4 text-sm leading-relaxed text-ink-body">
          {recommendation.text}
        </p>
      </div>

      <div className="mt-auto flex justify-center space-x-2 text-sm">
        <EditLink
          href={`/dashboard/recommendations/edit/${recommendation._id}`}
        />
        <DeleteButton
          itemId={recommendation._id as string}
          deleteAction={deleteRecommendationAction}
        />
      </div>
    </DashCard>
  );
};

export default RecommendationCard;
