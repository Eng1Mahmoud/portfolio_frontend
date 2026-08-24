import { FaList, FaPlus } from "react-icons/fa";
import Link from "next/link";

export default function RecommendationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      {/* Navigation Buttons */}
      <div className="flex space-x-4 mb-6">
        <Link
          href="/dashboard/recommendations"
          className="flex items-center px-4 py-2 rounded-lg transition-all bg-secondary-light text-white shadow-md"
        >
          <FaList className="w-5 h-5 mr-2" />
          Current Recommendations
        </Link>
        <Link
          href="/dashboard/recommendations/add"
          className="flex items-center px-4 py-2 rounded-lg transition-all bg-white text-gray-600 hover:bg-gray-50"
        >
          <FaPlus className="w-5 h-5 mr-2" />
          Add New Recommendation
        </Link>
      </div>

      {children}
    </div>
  );
}
