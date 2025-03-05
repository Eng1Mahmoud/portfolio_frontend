import React from "react";
import { Edit2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Iproject } from "@/types/general";
import DeleteButton from "@/components/general/DeleteButton";
import { deleteProjectId } from "@/actions/deleteProject";
const ProjectCard = ({ project }: { project: Iproject }) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl p-4 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg group">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex justify-center space-x-3">
            <Link
              href={project.demoLink}
              target="_blank"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center min-w-[100px]"
            >
              Demo
            </Link>
            <Link
              href={project.githubLink}
              target="_blank"
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center min-w-[100px]"
            >
              GitHub
            </Link>
          </div>
          <div className="flex justify-center space-x-3">
            <Link
              href={`/dashboard/projects/edit/${project._id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center w-full max-w-[200px]"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Link>
            <DeleteButton
              itemId={project._id as string}
              deleteAction={deleteProjectId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
