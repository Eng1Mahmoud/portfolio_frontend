import { SectionTabs } from "@/components/dashboard/SectionTabs";

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <SectionTabs
        base="/dashboard/experience"
        listLabel="Current Experience"
        addLabel="Add New Experience"
      />
      {children}
    </div>
  );
}
