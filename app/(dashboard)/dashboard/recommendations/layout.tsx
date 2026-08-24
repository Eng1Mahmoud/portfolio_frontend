import { SectionTabs } from "@/components/dashboard/SectionTabs";

export default function RecommendationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <SectionTabs
        base="/dashboard/recommendations"
        listLabel="Current Recommendations"
        addLabel="Add New Recommendation"
      />
      {children}
    </div>
  );
}
