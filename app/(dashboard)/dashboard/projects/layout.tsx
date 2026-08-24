import { SectionTabs } from "@/components/dashboard/SectionTabs";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <SectionTabs
        base="/dashboard/projects"
        listLabel="Current Projects"
        addLabel="Add New Project"
      />
      {children}
    </div>
  );
}
