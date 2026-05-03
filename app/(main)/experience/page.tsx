import { getAllExperiences } from "@/actions/getAllExperiences";
import { Metadata } from "next";
import { Title } from "@/components/general/Title";
import ExperienceTimeline from "@/components/Experience/ExperienceTimeline";

export const metadata: Metadata = {
  title: "Experience | My Portfolio",
  description: "My professional experience and career journey.",
};

export default async function ExperiencePage() {
  const experiences = (await getAllExperiences()) || [];

  return (
    <div className="container mx-auto px-4 ">
      <div className="max-w-4xl mx-auto">
        <Title title="Experience" />

        <ExperienceTimeline experiences={experiences} />
      </div>
    </div>
  );
}
