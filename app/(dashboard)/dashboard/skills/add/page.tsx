import AddSkillForm from "@/components/dashboard/skills/AddSkillForm";
import { DashPanel } from "@/components/dashboard/DashPanel";

export default function AddSkill() {
  return (
    <DashPanel title="Add New Skill" className="mx-auto max-w-4xl">
      <AddSkillForm />
    </DashPanel>
  );
}
