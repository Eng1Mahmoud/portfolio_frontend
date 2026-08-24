import AddExperienceForm from "@/components/dashboard/experience/AddExperienceForm";
import { DashPanel } from "@/components/dashboard/DashPanel";

export default function AddExperiencePage() {
  return (
    <DashPanel title="Add New Experience" className="mx-auto max-w-4xl">
      <AddExperienceForm />
    </DashPanel>
  );
}
