"use client";
import { Iproject } from "@/types/general";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaChevronDown } from "react-icons/fa";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  ProjectDescriptionModal,
  type Origin,
} from "@/components/Projects/ProjectDescriptionModal";
import { PinnedCard, useCardProgress } from "@/components/general/PinnedCard";
import { Spotlight, trackPointer } from "@/components/general/Spotlight";
import {
  handleProjectExternalClick,
  handleViewProject,
} from "@/utiles/analytics-events/events";

// Projects carry between 6 and 16 technologies. Rendering them all made cards
// tall and wildly uneven, so the card shows a preview and the modal has the
// full list.
const VISIBLE_TECHNOLOGIES = 4;

/** How far the screenshot travels inside its frame, as a percentage. */
const DRIFT = 7;

/**
 * The screenshot drifts against its opening as the card crosses the screen.
 * A separate component because the clock comes from <PinnedCard /> by context,
 * and only a child can read it.
 */
const ProjectShot = ({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority: boolean;
}) => {
  const progress = useCardProgress();
  const fallback = useMotionValue(0.5);
  const y = useTransform(
    progress ?? fallback,
    [0, 1],
    [`-${DRIFT}%`, `${DRIFT}%`],
  );

  return (
    // Oversized by the drift distance, or the travel exposes the image edge.
    <motion.div style={{ y }} className="absolute inset-x-0 top-[-8%] h-[116%]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        priority={priority}
        className="object-cover object-top transition-transform duration-700 ease-out group-hover/pin:scale-[1.06]"
      />
    </motion.div>
  );
};

export const ProjectCard = ({
  project,
  index = 0,
}: {
  project: Iproject;
  /** Grid position — decides which way this print hangs on the board. */
  index?: number;
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  // Where the dialog should appear to come from, captured at the moment of the
  // click — the card is still moving under the pointer, so reading it later
  // would give the wrong point.
  const [origin, setOrigin] = useState<Origin | null>(null);
  const faceRef = useRef<HTMLElement>(null);

  const technologies = project.technologies ?? [];
  const visible = technologies.slice(0, VISIBLE_TECHNOLOGIES);
  const hiddenCount = technologies.length - visible.length;

  const openDetails = () => {
    const rect = faceRef.current?.getBoundingClientRect();
    if (rect) {
      setOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setShowFullDescription(true);
    handleViewProject(project.title);
  };

  return (
    <PinnedCard index={index}>
      {/* h-full + flex column: every card in a row ends up the same height and
          the action buttons line up along the bottom. */}
      <article
        ref={faceRef}
        onMouseMove={trackPointer}
        className="glass-card relative! isolate! [background:var(--glass-background)]! [border:var(--hairline-border)]! [backdrop-filter:blur(14px)_saturate(140%)]! [box-shadow:var(--glass-shadow)]! [transition:border-color_300ms,_box-shadow_300ms,_translate_500ms_cubic-bezier(0.22,_1,_0.36,_1)]! [border-radius:16px]! [&::before]:[content:'']! [&::before]:absolute! [&::before]:[inset:0]! [&::before]:[z-index:-1]! [&::before]:[border-radius:inherit]! [&::before]:pointer-events-none! [&::before]:[background:var(--glass-hover-shadow)]! [&::before]:[opacity:0.7]! [&::before]:[transition:opacity_300ms]! [&:hover]:[border-color:var(--glass-hover-border)]! [&:hover]:[box-shadow:var(--glass-corner-light)]! [&:hover::before]:[opacity:1]! group/card relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl border border-parchment/10 transition-colors duration-300 group-hover/pin:border-sage/30 hover:-translate-y-1.5 motion-reduce:hover:translate-y-0"
      >
        {/* The screenshot fills the whole card; the content plate sits on a
            gradient scrim so the text stays readable. The first row is above
            the fold and holds the page's largest contentful paint, so those
            three load eagerly. */}
        <div className="absolute inset-0 overflow-hidden">
          <ProjectShot
            src={project.imageUrl}
            alt={project.title}
            priority={index < 3}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklch,var(--color-surface-panel)_96%,transparent)_0%,color-mix(in_oklch,var(--color-surface-panel)_82%,transparent)_38%,transparent_72%)]"
          />
        </div>

        <Spotlight />

        {/* Large outlined index floating over the screenshot, like Services. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-5 z-[5] font-display text-[110px] font-bold leading-none text-transparent opacity-30 transition-opacity duration-500 [-webkit-text-stroke:1px_var(--portfolio-accent-dim)] group-hover/card:opacity-60"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Orbiting "star" ring with a satellite dot, echoing the Services
            icon treatment. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-5 z-[5] size-12 motion-reduce:hidden"
        >
          <span className="absolute inset-0 animate-[spin_9s_linear_infinite] rounded-full border border-dashed border-sage/40">
            <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-sage shadow-[0_0_10px_var(--portfolio-accent)]" />
          </span>
        </span>

        {/* pin-lift floats the plate above the face while the card turns. */}
        <div className="pin-lift [transform:translateZ(0)]! [transition:transform_0.35s_cubic-bezier(0.22,_1,_0.36,_1)]! motion-reduce:[transform:none]! relative z-10 mt-auto flex flex-col p-4 sm:p-5">
          <h3 className="display-card font-display! font-semibold! tracking-normal! mb-2 text-[1.15rem] text-ink-strong">
            {project.title.trim()}
          </h3>

          {/* Stack first — it is what a visitor scans for. */}
          {technologies.length > 0 && (
            <ul className="mb-3 flex flex-wrap gap-1.5">
              {visible.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-parchment/10 bg-parchment/4 px-2.5 py-0.5 font-mono text-[11px] text-ink-body"
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
                    className="rounded-full border border-parchment/10 bg-parchment/4 px-2.5 py-0.5 font-mono text-[11px] text-ink-muted transition-colors hover:border-sage/50 hover:text-sage focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sage"
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
            className="mb-4 flex w-fit items-center gap-1.5 rounded-sm text-sm text-sage transition-colors hover:text-sage focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sage"
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
                className="flex items-center gap-2 rounded-full border border-parchment/15 px-4 py-2 text-sm text-ink-body transition-colors hover:border-sage/60 hover:text-ink-strong focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sage"
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
                className="flex items-center gap-2 rounded-full bg-sage px-4 py-2 text-sm font-medium text-surface-base transition-colors hover:bg-sage-bright focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sage"
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
            origin={origin}
            onClose={() => setShowFullDescription(false)}
          />
        )}
      </AnimatePresence>
    </PinnedCard>
  );
};
