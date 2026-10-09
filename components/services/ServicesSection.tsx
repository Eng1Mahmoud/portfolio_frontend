"use client";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motion } from "framer-motion";
import { FiMonitor, FiLayers, FiTool, FiArrowUpRight } from "react-icons/fi";
import type { IconType } from "react-icons";
import type { MouseEvent } from "react";

const SERVICES: {
  title: string;
  text: string;
  Icon: IconType;
  stack: string[];
}[] = [
  {
    title: "Frontend Development",
    text: "Fast, accessible and responsive interfaces that bring your ideas to life in the browser.",
    Icon: FiMonitor,
    stack: [
      "HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js (App Router, Server Actions)",
      "Vue 3", "Tailwind CSS", "Redux Toolkit", "Zustand", "Pinia", "Vue Router", "TanStack Query",
      "TanStack Table", "shadcn/ui", "Material-UI", "Framer Motion", "React Hook Form", "Zod",
    ],
  },
  {
    title: "Full-stack Development",
    text: "From polished frontends to robust APIs and databases, I build complete web applications.",
    Icon: FiLayers,
    stack: ["Node.js", "Express.js", "REST APIs", "SQL", "PostgreSQL", "MongoDB", "Mongoose", "Socket.io (WebSockets)"],
  },
  {
    title: "Maintenance & Support",
    text: "Keep your platform secure, up to date and running smoothly with ongoing improvements.",
    Icon: FiTool,
    stack: ["Git/GitHub", "CI/CD", "Vercel", "Sentry", "Lighthouse", "Husky", "Code splitting & lazy loading"],
  },
];

/** Moves the card's spotlight to the pointer through two CSS variables. */
const trackPointer = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

/** Shortens a skill name for the pill; the full name stays in the hover tooltip. */
const chipLabel = (item: string) =>
  item.replace(/\s*\(.*?\)\s*$/, "").replace(/\s*&\s*lazy loading$/i, "");


/**
 * Three "star" cards joined by a glowing constellation line that ties them to
 * the nebula backdrop. Cards step down like a staircase on wide screens, carry a
 * large outlined index, an orbiting ring around the icon, and a pointer spotlight.
 */
export const ServicesSection = () => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative">
      {/* Constellation line linking the three icons (wide screens only). */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-[8%] top-10 hidden h-32 w-[84%] md:block"
      >
        <motion.path
          d="M0 20 C 200 20, 300 110, 500 110 S 800 200, 1000 200"
          fill="none"
          stroke="var(--portfolio-accent)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          vectorEffect="non-scaling-stroke"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </svg>

      <div className="relative grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-6 lg:gap-8">

        {SERVICES.map(({ title, text, Icon, stack }, i) => (
          <motion.article
            key={title}
            onMouseMove={trackPointer}
            initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: reduceMotion ? 0 : i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative isolate flex flex-col overflow-hidden rounded-3xl p-6 pt-8 md:p-7 lg:p-8 [background:var(--glass-background)] [border:var(--hairline-border)] [backdrop-filter:blur(14px)_saturate(140%)] [box-shadow:var(--glass-shadow)] transition-[border-color,box-shadow,translate] duration-500 hover:-translate-y-2 hover:[border-color:var(--glass-hover-border)] hover:[box-shadow:var(--glass-corner-light)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-500 before:[background:radial-gradient(320px_circle_at_var(--mx,50%)_var(--my,0%),color-mix(in_oklab,var(--portfolio-accent)_22%,transparent),transparent_70%)] hover:before:opacity-100 ${
              i === 1 ? "md:mt-10" : i === 2 ? "md:mt-20" : ""
            }`}
          >
            {/* Large outlined index sitting behind the content. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-6 -z-10 font-display text-[120px] font-bold leading-none text-transparent opacity-40 transition-opacity duration-500 [-webkit-text-stroke:1px_var(--portfolio-accent-dim)] group-hover:opacity-80"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Icon "star" with an orbiting ring and a satellite dot. */}
            <span className="relative mb-6 grid size-16 place-items-center">
              <span className="absolute inset-0 animate-[spin_9s_linear_infinite] rounded-full border border-dashed border-sage/40 motion-reduce:animate-none">
                <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-sage shadow-[0_0_10px_var(--portfolio-accent)]" />
              </span>
              <span className="grid size-12 place-items-center rounded-full bg-sage/10 text-sage shadow-[0_0_28px_-4px_var(--portfolio-accent)] transition-transform duration-500 group-hover:scale-110">
                <Icon aria-hidden="true" className="size-6" />
              </span>
            </span>

            <h3 className="mb-3 font-display text-xl font-semibold text-ink-strong">{title}</h3>
            <p className="mb-4 text-sm leading-relaxed text-ink-muted">{text}</p>

            <ul className="mb-6 flex flex-wrap gap-1.5">
              {stack.map((item) => (
                <li
                  key={item}
                  title={item}
                  className="shrink-0 rounded-full border border-parchment/10 px-2 py-[3px] font-mono text-[10px] leading-none tracking-wide text-ink-muted transition-colors duration-300 group-hover:border-sage/30 group-hover:text-ink-strong"
                >
                  {chipLabel(item)}
                </li>
              ))}
            </ul>


            <a
              href="#contact-us"
              className="inline-flex items-center gap-2 self-start rounded-full border border-sage/30 px-4 py-2 text-sm font-medium text-sage transition-colors duration-300 hover:bg-sage/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
            >
              Let&apos;s talk
              <FiArrowUpRight aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.article>
        ))}
      </div>
    </div>
  );
};
