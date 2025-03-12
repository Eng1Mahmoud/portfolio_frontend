import AddSkillForm from "@/components/dashboard/skills/AddSkillForm";
export default function AddSkill() {
  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Skill
      </h2>
      <div className="space-y-4">
        <AddSkillForm />
      </div>
    </div>
  );
}
