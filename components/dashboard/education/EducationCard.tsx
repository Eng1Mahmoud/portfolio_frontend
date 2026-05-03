import React from "react";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { IEducation } from "@/types/general";
import DeleteButton from "@/components/general/DeleteButton";
import { deleteEducationAction } from "@/actions/deleteEducation";

const EducationCard = ({ education }: { education: IEducation }) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl p-4 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col h-full">
        <div className="flex-grow mb-4">
          <div className="flex items-start gap-4 justify-between">
            <div className="flex items-start gap-4">
              {education.image && (
                <Image
                  src={education.image}
                  alt={education.institution || education.degree}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="text-xl font-bold">{education.degree}</h3>
                <p className="text-md font-semibold text-gray-700">
                  {education.institution}
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            {education.startDate} - {education.endDate}
          </p>
          <p className="text-gray-600 text-sm line-clamp-3">
            {education.description}
          </p>
          {education.skills &&
            Array.isArray(education.skills) &&
            education.skills.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {education.skills.slice(0, 4).map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100"
                  >
                    {skill}
                  </span>
                ))}
                {education.skills.length > 4 && (
                  <span className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded border">
                    +{education.skills.length - 4} more
                  </span>
                )}
              </div>
            )}
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex justify-center space-x-3">
            <Link
              href={`/dashboard/education/edit/${education._id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center w-full max-w-[200px]"
            >
              <FaEdit className="w-4 h-4 mr-2" />
              Edit
            </Link>
            <DeleteButton
              itemId={education._id as string}
              deleteAction={deleteEducationAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
