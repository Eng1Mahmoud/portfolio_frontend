"use client";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motion } from "framer-motion";
import { FiMonitor, FiLayers, FiTool, FiArrowRight } from "react-icons/fi";
import type { IconType } from "react-icons";

const SERVICES: { title: string; text: string; Icon: IconType }[] = [
  {
    title: "Frontend Development",
    text: "Fast, accessible and responsive interfaces that bring your ideas to life in the browser.",
    Icon: FiMonitor,
  },
  {
    title: "Full-stack Development",
    text: "From polished frontends to robust APIs and databases, I build complete web applications.",
    Icon: FiLayers,
  },
  {
    title: "Maintenance & Support",
    text: "Keep your platform secure, up to date and running smoothly with ongoing improvements.",
    Icon: FiTool,
  },
];

/** Three glass cards; the middle one tilts on wide screens and straightens on hover. */
export const ServicesSection = () => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
      {SERVICES.map(({ title, text, Icon }, i) => (
        <motion.article
          key={title}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: reduceMotion ? 0 : i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`group relative isolate flex flex-col rounded-2xl p-6 md:p-7 lg:p-8 [background:var(--glass-background)] [border:var(--hairline-border)] [backdrop-filter:blur(14px)_saturate(140%)] [box-shadow:var(--glass-shadow)] transition-[border-color,box-shadow,rotate,translate] duration-300 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:[background:var(--glass-hover-shadow)] before:opacity-70 before:transition-opacity hover:-translate-y-1 hover:[border-color:var(--glass-hover-border)] hover:[box-shadow:var(--glass-corner-light)] hover:before:opacity-100 ${
            i === 1 ? "md:-rotate-2 md:hover:rotate-0 motion-reduce:rotate-0" : ""
          }`}
        >
          <span className="mx-auto mb-6 grid size-16 place-items-center rounded-full border border-sage/40 bg-sage/10 text-sage shadow-[0_0_24px_-4px_var(--portfolio-accent)] transition-transform duration-300 group-hover:scale-110">
            <Icon aria-hidden="true" className="size-7" />
          </span>
          <h3 className="mb-3 font-display text-xl font-semibold text-ink-strong">{title}</h3>
          <p className="mb-6 grow text-sm leading-relaxed text-ink-muted">{text}</p>
          <a
            href="/#contact-us"
            className="inline-flex items-center gap-2 self-start text-sm font-medium text-sage focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
          >
            Let&apos;s talk
            <FiArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.article>
      ))}
    </div>
  );
};
