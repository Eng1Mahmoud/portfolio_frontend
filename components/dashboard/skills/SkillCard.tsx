"use client";
import { Edit2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ISkill } from "@/types/general";
import DeleteSkillButton from "./DeleteSkillButton";

const SkillCard = ({ skill }: { skill: ISkill }) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl p-2">
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <div className="relative w-full h-11  mb-3">
            <Image
              src={skill.imageUrl}
              alt={skill.name}
              fill
              className="object-contain rounded-md "
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
            {skill.name}
          </h3>
        </div>

        <div className="flex justify-center space-x-2 mt-auto">
          <Link
            href={`/dashboard/skills/edit/${skill._id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded-md transition duration-150 flex items-center"
          >
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Link>
          <DeleteSkillButton skillId={skill._id as string} />
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
