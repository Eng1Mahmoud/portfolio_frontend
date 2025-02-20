"use client";
import { motion, Transition } from "framer-motion";

// Configuration for grid and animation
const GRID_CONFIG = {
  horizontalLines: 6,
  verticalLines: 5,
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
  // Synchronized animation configuration
  const lineVariants = {
    initial: { 
      opacity: 0.4,
      scale: 0.8,
    },
    animate: { 
      opacity: [0.4, 0.5, 0.4],
      scale: [0.8, 1.05, 0.8],
    },
  };

  // Shared transition configuration for all lines
  const sharedTransition: Transition = {
    duration: 4,
    repeat: Infinity,
    repeatType: "loop",
    ease: "easeInOut",
  };

  // Render grid lines with synchronized animation
  const renderGridLines = (type: 'horizontal' | 'vertical') => {
    const lineCount = type === 'horizontal' ? GRID_CONFIG.horizontalLines : GRID_CONFIG.verticalLines;

    return [...Array(lineCount)].map((_, index) => {
      const position = `${(index + 1) * (100 / (lineCount + 1))}%`;

      return (
        <motion.div
          key={`${type}-${index}`}
          initial={lineVariants.initial}
          animate={lineVariants.animate}
          transition={sharedTransition}
          style={{
            position: "absolute",
            ...(type === 'horizontal' 
              ? { top: position, width: "100%", height: "1px" }
              : { left: position, width: "1px", height: "100%" }),
            backgroundColor: gridColor,
            transformOrigin: 'center',
          }}
          className="opacity-50"
        />
      );
    });
  };

  return (
    <div
      className={`
        absolute inset-0 bg-transparent 
        pointer-events-none overflow-hidden z-[1]
        ${className}
      `}
    >
      {/* Horizontal Grid Lines */}
      <div className="absolute inset-0">
        {renderGridLines('horizontal')}
      </div>

      {/* Vertical Grid Lines */}
      <div className="absolute inset-0">
        {renderGridLines('vertical')}
      </div>
    </div>
  );
};
