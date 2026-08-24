import AddRecommendationForm from "@/components/dashboard/recommendations/AddRecommendationForm";

export default function AddRecommendationPage() {
  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
        Add New Recommendation
      </h2>
      <AddRecommendationForm />
    </div>
  );
}
