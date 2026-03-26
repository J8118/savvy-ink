"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface ValueCardProps {
  value: {
    title: string;
    description: string;
  };
  index: number;
  totalCards: number;
  isVisible: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function ValueCard({
  value,
  index,
  totalCards,
  isVisible,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: ValueCardProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null && isHovered) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isHovered) {
      setCursor({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
      className="p-6 md:p-8 cursor-default relative overflow-visible flex flex-col min-h-[200px]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Border SVG */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <defs>
          <linearGradient id={`valueGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="25%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="75%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <motion.radialGradient
            id={`valueRevealMask-${index}`}
            gradientUnits="userSpaceOnUse"
            r="40%"
            animate={maskPosition}
            transition={{ duration: 0, ease: "easeOut" }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>
          <mask id={`valueBorderMask-${index}`}>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill={`url(#valueRevealMask-${index})`}
            />
          </mask>
        </defs>

        {/* Gray border that draws when section is visible */}
        <motion.rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          fill="none"
          stroke="#6b7280"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 2000, strokeDasharray: 2000 }}
          animate={{
            strokeDashoffset: isVisible ? 0 : 2000,
            strokeDasharray: 2000,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: isVisible ? index * 0.1 : (totalCards - 1 - index) * 0.1,
          }}
        />

        {/* Colorful gradient border with mask (follows mouse) */}
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          fill="none"
          stroke={`url(#valueGradient-${index})`}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          mask={`url(#valueBorderMask-${index})`}
          style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </svg>

      {/* Card content */}
      <div className="relative z-10">
        <h4 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4 transition-colors duration-300">
          {value.title}
        </h4>
      </div>
      
      <p className="text-gray-400 text-sm md:text-base leading-relaxed relative z-10">
        {value.description}
      </p>
    </motion.div>
  );
}




