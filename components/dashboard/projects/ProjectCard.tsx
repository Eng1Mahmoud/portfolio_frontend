import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Iproject } from "@/types/general";
import DeleteButton from "@/components/general/DeleteButton";
import { DashCard, EditLink } from "@/components/dashboard/DashCard";
import { deleteProjectId } from "@/actions/deleteProject";

const externalLink =
  "flex items-center justify-center gap-2 rounded-md border border-parchment/15 px-3 py-1 text-ink-body transition-colors hover:border-sage/50 hover:text-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage";

const ProjectCard = ({ project }: { project: Iproject }) => {
  return (
    <DashCard className="group">
      <div className="flex-grow">
        <div className="relative mb-4 h-40 w-full overflow-hidden rounded-lg border border-parchment/10">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <h3 className="mb-1 truncate font-semibold text-ink-strong">
          {project.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-ink-body">
          {project.description}
        </p>
      </div>

      <div className="mt-auto space-y-2 text-sm">
        {(project.demoLink || project.githubLink) && (
          <div className="flex justify-center gap-2">
            {project.demoLink && (
              <Link
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={externalLink}
              >
                <FaExternalLinkAlt className="h-3 w-3" aria-hidden="true" />
                Demo
              </Link>
            )}
            {project.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={externalLink}
              >
                <FaGithub className="h-3.5 w-3.5" aria-hidden="true" />
                GitHub
              </Link>
            )}
          </div>
        )}

        <div className="flex justify-center gap-2">
          <EditLink href={`/dashboard/projects/edit/${project._id}`} />
          <DeleteButton
            itemId={project._id as string}
            deleteAction={deleteProjectId}
          />
        </div>
      </div>
    </DashCard>
  );
};

export default ProjectCard;
