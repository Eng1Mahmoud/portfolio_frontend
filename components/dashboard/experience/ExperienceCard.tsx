import React from "react";
import Image from "next/image";
import { IExperience } from "@/types/general";
import DeleteButton from "@/components/general/DeleteButton";
import { DashCard, EditLink } from "@/components/dashboard/DashCard";
import { deleteExperienceAction } from "@/actions/deleteExperience";

const ExperienceCard = ({ experience }: { experience: IExperience }) => {
  const skills = Array.isArray(experience.skills) ? experience.skills : [];

  return (
    <DashCard>
      <div className="mb-4 flex-grow">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-start gap-3">
            {experience.image && (
              <Image
                src={experience.image}
                alt={experience.company || experience.role}
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-parchment/10"
              />
            )}
            <div className="min-w-0">
              <h3 className="truncate font-semibold text-ink-strong">
                {experience.role}
              </h3>
              <p className="truncate text-sm text-ink-body">
                {experience.company}
              </p>
            </div>
          </div>
          {experience.workType && (
            <span className="shrink-0 rounded-md border border-parchment/10 bg-parchment/[0.04] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-sage">
              {experience.workType}
            </span>
          )}
        </div>

        <p className="mb-2 mt-2 font-mono text-xs text-ink-muted">
          {experience.startDate} — {experience.endDate}
        </p>

        <p className="mb-2 line-clamp-3 text-sm leading-relaxed text-ink-body">
          {experience.description}
        </p>

        {skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="rounded border border-parchment/10 bg-parchment/[0.04] px-2 py-0.5 text-[10px] text-ink-body"
              >
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="rounded border border-parchment/10 px-2 py-0.5 text-[10px] text-ink-muted">
                +{skills.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mt-auto flex justify-center space-x-2 text-sm">
        <EditLink href={`/dashboard/experience/edit/${experience._id}`} />
        <DeleteButton
          itemId={experience._id as string}
          deleteAction={deleteExperienceAction}
        />
      </div>
    </DashCard>
  );
};

export default ExperienceCard;
