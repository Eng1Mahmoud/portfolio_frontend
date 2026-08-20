"use client";
import { IuserInfo } from "@/types/general";
import { motion } from "framer-motion";

interface HomeIntroProps {
  profileInfo: IuserInfo;
  projectCount: number;
  technologyCount: number;
}

// One orchestrated load sequence rather than scattered effects: the rail draws
// down, then each block arrives behind it.
const rise = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.25 + i * 0.09, duration: 0.5, ease: "easeOut" },
  }),
};

export const HomeIntro = ({
  profileInfo,
  projectCount,
  technologyCount,
}: HomeIntroProps) => {
  const name = profileInfo?.userName?.trim() ?? "";
  const role = profileInfo?.title?.trim() ?? "";
  const bio = profileInfo?.bio?.trim() ?? "";

  // The author controls the split: a blank line in the bio field promotes the
  // first paragraph to a larger lead. Parsing sentences here would break
  // React.js, Next.js, Vue.js and CI/CD.
  const [lead, ...rest] = bio.split(/\n\s*\n/);
  const body = rest.join("\n\n");

  // "Mahmoud Mohamed" sets on two lines; a single-word name keeps one.
  const nameParts = name.split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");

  const figures = [
    { value: projectCount, label: "projects shipped" },
    // Counted from the skills collection, so "used" would overstate it —
    // these are the technologies worked with, not ones tallied per project.
    { value: technologyCount, label: "technologies" },
  ];

  return (
    <div className="relative w-full max-w-4xl pl-6 text-start sm:pl-10">
      {/* The rail. A single hairline anchors the whole column — no panel, no
          card. Its cyan head marks where the content starts. */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
        className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-cyan-400 via-white/12 to-transparent"
      />

      {role && (
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={rise}
          className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300 sm:text-xs"
        >
          {role}
        </motion.p>
      )}

      <motion.h1
        custom={1}
        initial="hidden"
        animate="visible"
        variants={rise}
        className="font-main text-[clamp(2.5rem,9vw,5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-[#e8ecf4]"
      >
        {firstName}
        {lastName && (
          <>
            {/* A real space before the break, so the name still copies as
                "Mahmoud Mohamed" rather than running together. */}{" "}
            <br />
            <span className="text-[#93a3bd]">{lastName}</span>
          </>
        )}
      </motion.h1>

      {bio && (
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={rise}
          className="mt-7 max-w-[58ch] space-y-3"
        >
          <p className="whitespace-pre-line text-[0.975rem] leading-[1.75] text-[#c3cede] sm:text-[1.0625rem]">
            {lead}
          </p>
          {body && (
            <p className="whitespace-pre-line text-[0.9rem] leading-[1.75] text-[#93a3bd] sm:text-[0.95rem]">
              {body}
            </p>
          )}
        </motion.div>
      )}

      {/* Real figures, read from the projects the site already loads. */}
      <motion.dl
        custom={3}
        initial="hidden"
        animate="visible"
        variants={rise}
        className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-5 font-mono"
      >
        {/* dt before dd keeps the list valid; `order` shows the figure first
            without repeating the label in a second, sr-only copy. */}
        {figures.map((figure) => (
          <div key={figure.label} className="flex items-baseline gap-2">
            <dt className="order-2 text-[11px] uppercase tracking-[0.18em] text-[#93a3bd]">
              {figure.label}
            </dt>
            <dd className="order-1 text-xl text-cyan-300 sm:text-2xl">
              {figure.value}
            </dd>
          </div>
        ))}
      </motion.dl>
    </div>
  );
};
