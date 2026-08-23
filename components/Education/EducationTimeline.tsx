"use client";
import { FaGraduationCap, FaUniversity } from "react-icons/fa";
import { IEducation } from "@/types/general";
import Image from "next/image";
import { Timeline, TimelineEntry } from "@/components/general/Timeline";

export default function EducationTimeline({
  educations,
}: {
  educations: IEducation[];
}) {
  return (
    <Timeline>
      {educations.map((item, index) => (
        <TimelineEntry key={item._id} index={index}>
          <div className="group relative overflow-hidden rounded-2xl border border-parchment/10 bg-surface-panel p-5 shadow-pinned transition-colors duration-300 hover:border-sage/30 md:p-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(30rem_circle_at_85%_0%,rgba(157,194,166,0.06),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            <div className="relative z-10">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-sage">
                {item.startDate} — {item.endDate}
              </p>

              <div className="flex items-start gap-4">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.institution || item.degree}
                    width={64}
                    height={64}
                    className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-parchment/10"
                  />
                )}
                <div className="min-w-0">
                  <h3 className="display-card flex items-center gap-2 text-lg text-ink-strong md:text-2xl">
                    <FaGraduationCap
                      className="shrink-0 text-sage"
                      aria-hidden="true"
                    />
                    {item.degree}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-2 rounded-lg border border-parchment/10 bg-parchment/[0.04] px-3 py-1 text-sm font-medium text-ink-body">
                    <FaUniversity
                      className="text-xs text-sage"
                      aria-hidden="true"
                    />
                    {item.institution}
                  </span>
                </div>
              </div>

              <p className="mb-6 mt-5 whitespace-pre-line border-l border-sage/40 pl-4 text-sm leading-relaxed text-ink-body md:text-base">
                {item.description}
              </p>

              {Array.isArray(item.skills) && item.skills.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-parchment/10 bg-parchment/[0.04] px-3 py-1.5 font-mono text-[10px] text-ink-muted md:text-xs"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </TimelineEntry>
      ))}
    </Timeline>
  );
}
