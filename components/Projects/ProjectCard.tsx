"use client";
import { Iproject } from "@/types/general";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ProjectDescriptionModal } from "@/components/Projects/ProjectDescriptionModal";
import { PinnedCard } from "@/components/general/PinnedCard";
import {
  handleProjectExternalClick,
  handleViewProject,
} from "@/utiles/analytics-events/events";

// Projects carry between 6 and 16 technologies. Rendering them all made cards
// tall and wildly uneven, so the card shows a preview and the modal has the
// full list.
const VISIBLE_TECHNOLOGIES = 4;

export const ProjectCard = ({
  project,
  index = 0,
}: {
  project: Iproject;
  /** Grid position — decides which way this print hangs on the board. */
  index?: number;
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const technologies = project.technologies ?? [];
  const visible = technologies.slice(0, VISIBLE_TECHNOLOGIES);
  const hiddenCount = technologies.length - visible.length;

  const openDetails = () => {
    setShowFullDescription(true);
    handleViewProject(project.title);
  };

  return (
    <PinnedCard index={index}>
      {/* h-full + flex column: every card in a row ends up the same height and
          the action buttons line up along the bottom. */}
      <article className="group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-panel/80 backdrop-blur-sm transition-colors duration-300 group-hover/pin:border-brass/30">
        <div className="relative h-[200px] shrink-0 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            // The first row is above the fold and holds the page's largest
            // contentful paint, so those three load eagerly.
            priority={index < 3}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover/pin:scale-[1.06]"
          />
          {/* The print settles into the card stock instead of butting against
              the text block with a hard edge. The gradient is confined to the
              bottom third — a full-height fade washed out the screenshot,
              which is the one thing on the card a visitor came to see. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,theme(colors.surface.panel)_0%,transparent_38%)]"
          />
        </div>

        {/* pin-lift floats the text plate above the face while the card turns,
            which is what sells the depth — a flat card that merely rotates
            reads as a sticker. */}
        <div className="pin-lift relative z-10 flex flex-1 flex-col p-5">
          <h3 className="display-card mb-2 text-[1.15rem] text-ink-strong">
            {project.title.trim()}
          </h3>

          {/* Stack first — it is what a visitor scans for. */}
          {technologies.length > 0 && (
            <ul className="mb-3 flex flex-wrap gap-1.5">
              {visible.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-ink-body"
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
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-ink-muted transition-colors hover:border-cyan-400/50 hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    +{hiddenCount} more
                  </button>
                </li>
              )}
            </ul>
          )}

          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-ink-body">
            {project.description}
          </p>

          <button
            type="button"
            onClick={openDetails}
            className="mb-4 flex w-fit items-center gap-1.5 rounded text-sm text-cyan-300 transition-colors hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
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
                className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-ink-body transition-colors hover:border-cyan-400/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
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
                className="flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-medium text-[#06121f] transition-colors hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                onClick={() =>
                  handleProjectExternalClick(project.title, "live")
                }
              >
                <FaExternalLinkAlt aria-hidden="true" />
                Live
              </Link>
            )}
          </div>
        </div>
      </article>

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
    </PinnedCard>
  );
};
