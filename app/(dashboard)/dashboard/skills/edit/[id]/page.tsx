import EditSkillForm from "@/components/dashboard/skills/EditSkill";
import { getSkillById } from "@/actions/getSkillById";
export default async function EditSkill({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await getSkillById(id);
  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Skill</h2>
      <div className="space-y-4">
        <EditSkillForm
          initialValues={
            skill ?? { _id: "", name: "", imageUrl: "", category: "" }
          }
        />
      </div>
    </div>
  );
}
