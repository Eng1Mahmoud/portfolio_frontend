import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default async function EditProject({ params }:{params:Promise<{id:string}>}) {
  const{id} = await params
  console.log(id)
  return (
    <div className="space-y-6">
      {/* Navigation Buttons */}
      <div className="flex space-x-4 mb-6">
        <Link
          href="/dashboard/projects"
          className="flex items-center px-4 py-2 rounded-lg transition-all bg-white text-gray-600 hover:bg-gray-50"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Projects
        </Link>
      </div>

      {/* Content Area */}
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Edit Project
        </h2>
        <div className="space-y-4">
          {/* Edit form will be implemented here */}
        </div>
      </div>
    </div>
  );
}