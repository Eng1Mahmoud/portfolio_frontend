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

export const ProjectCard = ({ project }: { project: Iproject }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden bg-gradient-to-br from-[#0D1127] to-[#1a1f3c] rounded-xl border-2 border-blue-500/50 shadow-xl shadow-blue-900/20"
    >
      <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={640}
          height={360}
          className="w-full absolute top-0 object-cover transition-transform duration-[2s] ease-in-out hover:translate-y-[calc(-100%+300px)]"
          style={{ height: "auto", minHeight: "100%" }}
        />
      </div>

      <motion.div
        className="p-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h3
          className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          whileHover={{ scale: 1.02 }}
        >
          {project.title}
        </motion.h3>
        <div className="relative">
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
            {project.description}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowFullDescription(true);
              handleViewProject(project.title);
            }}
            className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 transition-colors group"
          >
            Read More
            <motion.div
              animate={{ y: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="group-hover:translate-x-1 transition-transform"
            >
              <FaChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.button>
        </div>
        <motion.div
          className="flex gap-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {project.githubLink && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm flex items-center "
                onClick={() =>
                  handleProjectExternalClick(project.title, "github")
                }
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mr-2  "
                >
                  <FaGithub />
                </motion.div>
                GitHub
              </Link>
            </motion.div>
          )}
          {project.demoLink && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-2 rounded-md text-sm flex items-center group/link"
                onClick={() =>
                  handleProjectExternalClick(project.title, "live")
                }
              >
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mr-2 "
                >
                  <FaExternalLinkAlt />
                </motion.div>
                Live
              </Link>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showFullDescription && (
          <ProjectDescriptionModal
            title={project.title}
            description={project.description}
            githubLink={project.githubLink}
            demoLink={project.demoLink}
            onClose={() => setShowFullDescription(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
