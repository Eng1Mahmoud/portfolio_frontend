"use client";
import { Iproject } from "@/types/general";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectDescriptionModal } from "@/components/Projects/ProjectDescriptionModal";
import {
  handleProjectExternalClick,
  handleViewProject,
} from "@/utiles/analytics-events/events";

// Projects carry between 6 and 16 technologies. Rendering them all made cards
// tall and wildly uneven, so the card shows a preview and the modal has the
// full list.
const VISIBLE_TECHNOLOGIES = 4;

export const ProjectCard = ({ project }: { project: Iproject }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const technologies = project.technologies ?? [];
  const visible = technologies.slice(0, VISIBLE_TECHNOLOGIES);
  const hiddenCount = technologies.length - visible.length;

  const openDetails = () => {
    setShowFullDescription(true);
    handleViewProject(project.title);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      // h-full + flex column: every card in a row ends up the same height and
      // the action buttons line up along the bottom.
      className="group relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-surface-card to-surface-card-to rounded-xl border-2 border-blue-500/50 shadow-xl shadow-blue-900/20"
    >
      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative h-[190px] shrink-0 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold mb-2 text-ink-strong">
          {project.title.trim()}
        </h3>

        {/* Stack first — it is what a visitor scans for. */}
        {technologies.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 mb-3">
            {visible.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-blue-500/30 bg-blue-900/30 px-2.5 py-0.5 text-[11px] font-medium text-blue-200"
              >
                {tech}
              </li>
            ))}
            {hiddenCount > 0 && (
              <li>
                <button
                  type="button"
                  onClick={openDetails}
                  aria-label={`Show all ${technologies.length} technologies for ${project.title.trim()}`}
                  className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-gray-300 transition-colors hover:border-blue-400/50 hover:text-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  +{hiddenCount} more
                </button>
              </li>
            )}
          </ul>
        )}

        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {project.description}
        </p>

        <button
          type="button"
          onClick={openDetails}
          className="mb-4 flex w-fit items-center gap-1.5 text-sm text-blue-400 transition-colors hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        >
          Read more
          <FaChevronDown className="h-3 w-3" aria-hidden="true" />
        </button>

        {/* mt-auto pins the actions to the bottom regardless of text length. */}
        <div className="mt-auto flex flex-wrap gap-3">
          {project.githubLink && (
            <Link
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              onClick={() =>
                handleProjectExternalClick(project.title, "github")
              }
            >
              <FaGithub aria-hidden="true" />
              GitHub
            </Link>
          )}
          {project.demoLink && (
            <Link
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-cyan-400 px-4 py-2 text-sm font-medium text-[#06121f] transition-colors hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              onClick={() => handleProjectExternalClick(project.title, "live")}
            >
              <FaExternalLinkAlt aria-hidden="true" />
              Live
            </Link>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showFullDescription && (
          <ProjectDescriptionModal
            title={project.title.trim()}
            description={project.description}
            technologies={technologies}
            githubLink={project.githubLink}
            demoLink={project.demoLink}
            onClose={() => setShowFullDescription(false)}
          />
        )}
      </AnimatePresence>
    </motion.article>
  );
};
