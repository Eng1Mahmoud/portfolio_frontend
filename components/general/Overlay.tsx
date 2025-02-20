"use client";
import { motion } from "framer-motion";
import { JSX, useMemo } from "react";

// Configuration for grid and animation
const GRID_CONFIG = {
  horizontalLines: 50, // Reduced from 60
  verticalLines: 50, // Reduced from 60
  defaultColor: "#3f4a5e",
};

// Props interface with clear documentation
interface OverlayProps {
  /** Additional CSS classes to apply */
  className?: string;
  /** Color of the grid lines */
  gridColor?: string;
}

export const Overlay: React.FC<OverlayProps> = ({
  className = "",
  gridColor = GRID_CONFIG.defaultColor,
}) => {
  // Memoize grid lines to prevent unnecessary re-renders
  const gridLines = useMemo(() => {
    const lines: JSX.Element[] = [];

    // Generate horizontal lines
    for (let i = 0; i < GRID_CONFIG.horizontalLines; i++) {
      const position = `${
        (i + 1) * (100 / (GRID_CONFIG.horizontalLines + 1))
      }%`;
      lines.push(
        <motion.div
          key={`h-${i}`}
          initial={{
            opacity: 0.2,
            scale: 0.7,
            backgroundColor: gridColor,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.7, 1.1, 0.7],
          }}
          transition={{
            duration: 3 + Math.random(),
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: i * 0.05,
          }}
          style={{
            position: "absolute",
            top: position,
            width: "100%",
            height: "1px",
            backgroundColor: gridColor,
            transformOrigin: "center",
          }}
          className="opacity-50"
        />
      );
    }

    // Generate vertical lines
    for (let j = 0; j < GRID_CONFIG.verticalLines; j++) {
      const position = `${(j + 1) * (100 / (GRID_CONFIG.verticalLines + 1))}%`;
      lines.push(
        <motion.div
          key={`v-${j}`}
          initial={{
            opacity: 0.2,
            scale: 0.7,
            backgroundColor: gridColor,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.7, 1.1, 0.7],
          }}
          transition={{
            duration: 3 + Math.random(),
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: j * 0.05,
          }}
          style={{
            position: "absolute",
            left: position,
            height: "100%",
            width: "1px",
            backgroundColor: gridColor,
            transformOrigin: "center",
          }}
          className="opacity-50"
        />
      );
    }

    return lines;
  }, [gridColor]);

  return (
    <div
      className={`
        absolute inset-0 bg-transparent 
        pointer-events-none overflow-hidden z-[1]
        ${className}
      `}
    >
      <div className="absolute inset-0">{gridLines}</div>
    </div>
  );
};
