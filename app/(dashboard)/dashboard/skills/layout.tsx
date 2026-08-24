import { SectionTabs } from "@/components/dashboard/SectionTabs";

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <SectionTabs
        base="/dashboard/skills"
        listLabel="Current Skills"
        addLabel="Add New Skill"
      />
      {children}
    </div>
  );
}
