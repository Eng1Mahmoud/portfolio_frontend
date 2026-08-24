import { getRecommendationById } from "@/actions/getRecommendationById";
import EditRecommendationForm from "@/components/dashboard/recommendations/EditRecommendationForm";
import { notFound } from "next/navigation";

export default async function EditRecommendationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recommendation = await getRecommendationById(id);

  if (!recommendation) {
    notFound();
  }

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
        Edit Recommendation
      </h2>
      <EditRecommendationForm recommendation={recommendation} />
    </div>
  );
}
