import React from "react";
import Image from "next/image";
import { IEducation } from "@/types/general";
import DeleteButton from "@/components/general/DeleteButton";
import { DashCard, EditLink } from "@/components/dashboard/DashCard";
import { deleteEducationAction } from "@/actions/deleteEducation";

const EducationCard = ({ education }: { education: IEducation }) => {
  const skills = Array.isArray(education.skills) ? education.skills : [];

  return (
    <DashCard>
      <div className="mb-4 flex-grow">
        <div className="flex min-w-0 items-start gap-3">
          {education.image && (
            <Image
              src={education.image}
              alt={education.institution || education.degree}
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-parchment/10"
            />
          )}
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-ink-strong">
              {education.degree}
            </h3>
            <p className="truncate text-sm text-ink-body">
              {education.institution}
            </p>
          </div>
        </div>

        <p className="mb-2 mt-2 font-mono text-xs text-ink-muted">
          {education.startDate} — {education.endDate}
        </p>

        <p className="line-clamp-3 text-sm leading-relaxed text-ink-body">
          {education.description}
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
        <EditLink href={`/dashboard/education/edit/${education._id}`} />
        <DeleteButton
          itemId={education._id as string}
          deleteAction={deleteEducationAction}
        />
      </div>
    </DashCard>
  );
};

export default EducationCard;
