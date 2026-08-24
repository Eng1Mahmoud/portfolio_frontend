import { getEducationById } from "@/actions/getEducationById";
import EditEducationForm from "@/components/dashboard/education/EditEducationForm";
import { DashPanel } from "@/components/dashboard/DashPanel";
import { notFound } from "next/navigation";

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const education = await getEducationById(id);

  if (!education) {
    notFound();
  }

  return (
    <DashPanel title="Edit Education" className="mx-auto max-w-4xl">
      <EditEducationForm education={education} />
    </DashPanel>
  );
}
