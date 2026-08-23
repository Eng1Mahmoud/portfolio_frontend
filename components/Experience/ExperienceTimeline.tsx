"use client";
import { IExperience } from "@/types/general";
import { ExperienceCard } from "@/components/Experience/ExperienceCard";
import { Timeline, TimelineEntry } from "@/components/general/Timeline";

export default function ExperienceTimeline({
  experiences,
}: {
  experiences: IExperience[];
}) {
  return (
    <Timeline>
      {experiences.map((item, index) => (
        <TimelineEntry key={item._id} index={index}>
          <ExperienceCard experience={item} />
        </TimelineEntry>
      ))}
    </Timeline>
  );
}
