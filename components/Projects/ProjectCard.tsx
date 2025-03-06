"use client";

import { Iproject } from "@/types/general";
import Image from "next/image";
import Link from "next/link";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { useState } from "react";

export const ProjectCard = ({ project }: { project: Iproject }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={640}
          height={360}
          className="w-full absolute top-0 object-cover transition-transform duration-[2s] ease-in-out hover:translate-y-[calc(-100%+300px)]"
          style={{ height: "auto", minHeight: "100%" }}
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
        <div className="relative">
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
            {project.description}
          </p>
          <button
            onClick={() => setShowFullDescription(true)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
          >
            Read More
            <FaChevronDown className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-4 mt-2">
          {project.githubLink && (
            <Link
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center"
            >
              <FaGithub className="mr-2" />
              GitHub
            </Link>
          )}
          {project.demoLink && (
            <Link
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center"
            >
              <FaExternalLinkAlt className="mr-2" />
              Live
            </Link>
          )}
        </div>
      </div>

      {/* Full description overlay */}
      {showFullDescription && (
        <div className="absolute inset-0 bg-gray-900/95 p-6 flex flex-col z-10">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <button
              onClick={() => setShowFullDescription(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>
          <div className="overflow-y-auto flex-grow">
            <p className="text-gray-300 text-sm whitespace-pre-wrap mb-6">
              {project.description}
            </p>

            <div className="flex gap-4">
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center"
                >
                  <FaGithub className="mr-2" />
                  GitHub
                </Link>
              )}
              {project.demoLink && (
                <Link
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  Live
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
