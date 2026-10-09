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
          <div className="glass-card relative! isolate! [background:var(--glass-background)]! [border:var(--hairline-border)]! [backdrop-filter:blur(14px)_saturate(140%)]! [box-shadow:var(--glass-shadow)]! [transition:border-color_300ms,_box-shadow_300ms]! [border-radius:16px]! [&::before]:[content:'']! [&::before]:absolute! [&::before]:[inset:0]! [&::before]:[z-index:-1]! [&::before]:[border-radius:inherit]! [&::before]:pointer-events-none! [&::before]:[background:var(--glass-hover-shadow)]! [&::before]:[opacity:0.7]! [&::before]:[transition:opacity_300ms]! [&:hover]:[border-color:var(--glass-hover-border)]! [&:hover]:[box-shadow:var(--glass-corner-light)]! [&:hover::before]:[opacity:1]! group relative overflow-hidden rounded-2xl p-5 md:p-7">
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
                    className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-sage/25"
                  />
                )}
                <div className="min-w-0">
                  <h3 className="display-card font-display! font-semibold! tracking-normal! flex items-center gap-2 text-lg text-ink-strong md:text-2xl">
                    <FaGraduationCap
                      className="shrink-0 text-sage"
                      aria-hidden="true"
                    />
                    {item.degree}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-2 rounded-lg border border-sage/25 bg-sage/[0.07] px-3 py-1 text-sm font-medium text-ink-body">
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
                      className="rounded-full border border-sage/20 bg-sage/5 px-3 py-1.5 font-mono text-[10px] text-ink-muted md:text-xs"
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
