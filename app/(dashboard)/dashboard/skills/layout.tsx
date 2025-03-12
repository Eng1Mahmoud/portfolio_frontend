import { Plus, List } from "lucide-react";
import Link from "next/link";

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      {/* Navigation Buttons */}
      <div className="flex space-x-4 mb-6">
        <Link
          href="/dashboard/skills"
          className="flex items-center px-4 py-2 rounded-lg transition-all bg-secondary-light text-white shadow-md"
        >
          <List className="w-5 h-5 mr-2" />
          Current Skills
        </Link>
        <Link
          href="/dashboard/skills/add"
          className="flex items-center px-4 py-2 rounded-lg transition-all bg-white text-gray-600 hover:bg-gray-50"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Skill
        </Link>
      </div>

      {children}
    </div>
  );
}
