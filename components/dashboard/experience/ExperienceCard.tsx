import React from "react";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { IExperience } from "@/types/general";
import DeleteButton from "@/components/general/DeleteButton";
import { deleteExperienceAction } from "@/actions/deleteExperience";

const ExperienceCard = ({ experience }: { experience: IExperience }) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl p-4 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col h-full">
        <div className="flex-grow mb-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              {experience.image && (
                <Image
                  src={experience.image}
                  alt={experience.company || experience.role}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="text-xl font-bold">{experience.role}</h3>
                <p className="text-md font-semibold text-gray-700">
                  {experience.company}
                </p>
              </div>
            </div>
            {experience.workType && (
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 border font-medium">
                {experience.workType}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-2">
            {experience.startDate} - {experience.endDate}
          </p>
          <p className="text-gray-600 text-sm line-clamp-3 mb-2">
            {experience.description}
          </p>
          {experience.skills &&
            Array.isArray(experience.skills) &&
            experience.skills.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {experience.skills.slice(0, 4).map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100"
                  >
                    {skill}
                  </span>
                ))}
                {experience.skills &&
                  Array.isArray(experience.skills) &&
                  experience.skills.length > 4 && (
                    <span className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded border">
                      +{experience.skills.length - 4} more
                    </span>
                  )}
              </div>
            )}
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex justify-center space-x-3">
            <Link
              href={`/dashboard/experience/edit/${experience._id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center w-full max-w-[200px]"
            >
              <FaEdit className="w-4 h-4 mr-2" />
              Edit
            </Link>
            <DeleteButton
              itemId={experience._id as string}
              deleteAction={deleteExperienceAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
