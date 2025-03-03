import Link from "next/link";
import { List, Plus } from "lucide-react";

export default function AddProject() {
  return (
    <div className="space-y-6">
      {/* Navigation Buttons */}
      <div className="flex space-x-4 mb-6">
        <Link
          href="/dashboard/projects"
          className="flex items-center px-4 py-2 rounded-lg transition-all bg-white text-gray-600 hover:bg-gray-50"
        >
          <List className="w-5 h-5 mr-2" />
          Current Projects
        </Link>
        <Link
          href="/dashboard/projects/add"
          className="flex items-center px-4 py-2 rounded-lg transition-all bg-secondary-light text-white shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Project
        </Link>
      </div>

      {/* Content Area */}
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Project</h2>
        <div className="space-y-4">
          {/* Add form will be implemented here */}
        </div>
      </div>
    </div>
  );
}