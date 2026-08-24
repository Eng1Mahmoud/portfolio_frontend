import { SectionTabs } from "@/components/dashboard/SectionTabs";

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <SectionTabs
        base="/dashboard/education"
        listLabel="Current Education"
        addLabel="Add New Education"
      />
      {children}
    </div>
  );
}
