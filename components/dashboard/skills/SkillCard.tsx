"use client";
import Image from "next/image";
import { ISkill } from "@/types/general";
import DeleteButton from "@/components/general/DeleteButton";
import { DashCard, EditLink } from "@/components/dashboard/DashCard";
import { deleteSkillById } from "@/actions/deleteSkill";

const SkillCard = ({ skill }: { skill: ISkill }) => {
  return (
    <DashCard>
      <div className="flex-grow">
        <div className="relative mb-3 h-11 w-full">
          <Image
            src={skill.imageUrl}
            alt={skill.name}
            fill
            className="rounded-md object-contain"
          />
        </div>
        <h3 className="mb-1 text-center text-lg font-semibold text-ink-strong">
          {skill.name}
        </h3>
        {skill.category && (
          <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            {skill.category}
          </p>
        )}
      </div>

      <div className="mt-auto flex justify-center space-x-2 text-sm">
        <EditLink href={`/dashboard/skills/edit/${skill._id}`} />
        <DeleteButton
          itemId={skill._id as string}
          deleteAction={deleteSkillById}
        />
      </div>
    </DashCard>
  );
};

export default SkillCard;
