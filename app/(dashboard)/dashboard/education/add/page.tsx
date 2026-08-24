import AddEducationForm from "@/components/dashboard/education/AddEducationForm";
import { DashPanel } from "@/components/dashboard/DashPanel";

export default function AddEducationPage() {
  return (
    <DashPanel title="Add New Education" className="mx-auto max-w-4xl">
      <AddEducationForm />
    </DashPanel>
  );
}
