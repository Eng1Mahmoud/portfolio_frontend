import { getRecommendationById } from "@/actions/getRecommendationById";
import EditRecommendationForm from "@/components/dashboard/recommendations/EditRecommendationForm";
import { DashPanel } from "@/components/dashboard/DashPanel";
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
    <DashPanel title="Edit Recommendation" className="mx-auto max-w-4xl">
      <EditRecommendationForm recommendation={recommendation} />
    </DashPanel>
  );
}
