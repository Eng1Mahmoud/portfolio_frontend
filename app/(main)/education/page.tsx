import { Title } from "@/components/general/Title";
import EducationTimeline from "@/components/Education/EducationTimeline";
import { getAllEducations } from "@/actions/getAllEducations";

export default async function Education() {
  const educations = (await getAllEducations()) || [];

  return (
    <div>
      <Title title="Education" eyebrow="Where I studied" />
      <EducationTimeline educations={educations} />
    </div>
  );
}
