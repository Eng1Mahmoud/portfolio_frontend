import { getExperienceById } from "@/actions/getExperienceById";
import EditExperienceForm from "@/components/dashboard/experience/EditExperienceForm";
import { DashPanel } from "@/components/dashboard/DashPanel";
import { notFound } from "next/navigation";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = await getExperienceById(id);

  if (!experience) {
    notFound();
  }

  return (
    <DashPanel title="Edit Experience" className="mx-auto max-w-4xl">
      <EditExperienceForm experience={experience} />
    </DashPanel>
  );
}
