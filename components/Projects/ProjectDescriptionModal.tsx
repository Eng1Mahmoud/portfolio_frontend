import { motion } from "framer-motion";
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

interface ProjectDescriptionModalProps {
  title: string;
  description: string;
  technologies?: string[];
  githubLink?: string;
  demoLink?: string;
  onClose: () => void;
}

export const ProjectDescriptionModal = ({
  title,
  description,
  technologies,
  githubLink,
  demoLink,
  onClose,
}: ProjectDescriptionModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-[#0D1127] to-[#1a1f3c] p-6 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto relative border border-blue-500/30"
      >
        <div className="flex justify-between items-start mb-4">
          <motion.h3
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            {title}
          </motion.h3>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes size={24} />
          </motion.button>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {technologies && technologies.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-blue-500/30 bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-200"
                >
                  {tech}
                </li>
              ))}
            </ul>
          )}
          <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
            {description}
          </p>
          <div className="flex gap-4">
            {githubLink && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm flex items-center"
                >
                  <FaGithub className="mr-2" />
                  GitHub
                </Link>
              </motion.div>
            )}
            {demoLink && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-2 rounded-md text-sm flex items-center"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  Live
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
