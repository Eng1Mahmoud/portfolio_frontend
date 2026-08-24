import React from "react";
import { FaEdit, FaStar } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { IRecommendation } from "@/types/general";
import DeleteButton from "@/components/general/DeleteButton";
import { deleteRecommendationAction } from "@/actions/deleteRecommendation";

const RecommendationCard = ({
  recommendation,
}: {
  recommendation: IRecommendation;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl p-4 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col h-full">
        <div className="flex-grow mb-4">
          <div className="flex justify-between items-start gap-2">
            <div className="flex items-start gap-4">
              {recommendation.avatar && (
                <Image
                  src={recommendation.avatar}
                  alt={recommendation.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  {recommendation.name}
                  {recommendation.featured && (
                    <FaStar
                      className="w-3 h-3 text-yellow-500"
                      title="Featured"
                    />
                  )}
                </h3>
                <p className="text-md font-semibold text-gray-700">
                  {recommendation.role}
                </p>
                {recommendation.company && (
                  <p className="text-sm text-gray-500">
                    {recommendation.company}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 border font-medium">
                {recommendation.relation}
              </span>
              {/* The list is sorted by this, so it has to be visible here —
                  otherwise the only way to work out why one card sits above
                  another is to open both. */}
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                order {recommendation.order ?? "—"}
              </span>
            </div>
          </div>

          {recommendation.date && (
            <p className="text-sm text-gray-500 mt-2 mb-2">
              {recommendation.date.slice(0, 10)}
            </p>
          )}

          <p className="text-gray-600 text-sm line-clamp-4 mb-2">
            {recommendation.text}
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex justify-center space-x-3">
            <Link
              href={`/dashboard/recommendations/edit/${recommendation._id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center w-full max-w-[200px]"
            >
              <FaEdit className="w-4 h-4 mr-2" />
              Edit
            </Link>
            <DeleteButton
              itemId={recommendation._id as string}
              deleteAction={deleteRecommendationAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
