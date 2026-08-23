"use client";
import { IExperience } from "@/types/general";
import { FaBriefcase } from "react-icons/fa";
import Image from "next/image";

/** The card face; the entry animation and rail node live in <TimelineEntry />. */
export const ExperienceCard = ({ experience }: { experience: IExperience }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-parchment/10 bg-surface-panel p-5 shadow-pinned transition-colors duration-300 hover:border-sage/30 md:p-7">
      {/* A static highlight; the projects page keeps the interactive one. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(30rem_circle_at_85%_0%,rgba(157,194,166,0.06),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-10">
        {/* Dates lead: on a rail, when is what you check first. */}
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-sage">
          {experience.startDate} — {experience.endDate}
        </p>

        <div className="flex items-start gap-4">
          {experience.image && (
            <Image
              src={experience.image}
              alt={experience.company || experience.role}
              width={64}
              height={64}
              className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-parchment/10"
            />
          )}
          <div className="min-w-0">
            <h3 className="display-card text-lg text-ink-strong md:text-2xl">
              {experience.role}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-2 rounded-lg border border-parchment/10 bg-parchment/[0.04] px-3 py-1 text-sm font-medium text-ink-body">
                <FaBriefcase className="text-xs text-sage" aria-hidden="true" />
                {experience.company}
              </span>
              {experience.workType && (
                <span className="rounded-md border border-parchment/10 bg-parchment/[0.04] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted md:text-[11px]">
                  {experience.workType}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="mb-6 mt-5 whitespace-pre-line border-l border-sage/40 pl-4 text-sm leading-relaxed text-ink-body md:text-base">
          {experience.description}
        </p>

        {Array.isArray(experience.skills) && experience.skills.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-parchment/10 bg-parchment/[0.04] px-3 py-1.5 font-mono text-[10px] text-ink-muted transition-colors hover:border-sage/50 hover:text-sage md:text-xs"
              >
                {skill}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
