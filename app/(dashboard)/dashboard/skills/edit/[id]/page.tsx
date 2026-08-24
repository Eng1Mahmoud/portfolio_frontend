import EditSkillForm from "@/components/dashboard/skills/EditSkill";
import { getSkillById } from "@/actions/getSkillById";
import { DashPanel } from "@/components/dashboard/DashPanel";

export default async function EditSkill({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await getSkillById(id);

  return (
    <DashPanel title="Edit Skill" className="mx-auto max-w-4xl">
      <EditSkillForm
        initialValues={
          skill ?? { _id: "", name: "", imageUrl: "", category: "" }
        }
      />
    </DashPanel>
  );
}
