import AddRecommendationForm from "@/components/dashboard/recommendations/AddRecommendationForm";
import { DashPanel } from "@/components/dashboard/DashPanel";

export default function AddRecommendationPage() {
  return (
    <DashPanel title="Add New Recommendation" className="mx-auto max-w-4xl">
      <AddRecommendationForm />
    </DashPanel>
  );
}
