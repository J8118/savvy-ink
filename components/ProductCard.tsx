"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { getCloudinaryImageUrl } from "@/lib/cloudinary";

interface ProductCardProps {
  product: {
    title: string;
    description: string;
    colSpan: string;
    rowSpan: string;
    height: string;
  };
  index: number;
  totalCards: number;
  isVisible: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function ProductCard({
  product,
  index,
  totalCards,
  isVisible,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: ProductCardProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  
  // Paint brush reveal effect
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const revealPoints = useRef<Array<{ x: number; y: number; timestamp: number }>>([]);
  const animationFrameRef = useRef<number>();
  
  // Map index to Cloudinary Public ID
  const paintImageIds = [
    'paintIMG-1_w19fhy',
    'paintIMG-2_lk5yiq',
    'paintIMG-3_by3fxi',
    'paintIMG-4_badcnk',
    'paintIMG-5_pd0txu',
    'paintIMG-6_oxszgy',
    'paintIMG-7_yvzz5i',
    'paintIMG-8_fmqnfr',
  ];

  // Get optimized Cloudinary image URL or fallback to local
  const getImageForIndex = (idx: number) => {
    if (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && paintImageIds[idx]) {
      return getCloudinaryImageUrl(paintImageIds[idx], {
        quality: 'auto',
        format: 'auto',
        width: 1200, // Optimize for card size
      });
    }
    // Fallback to local file
    return `/paintIMG-${idx + 1}.png`;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Update cursor position for border gradient effect
    if (isHovered && svgRef.current) {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((e.clientX - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((e.clientY - svgRect.top) / svgRect.height) * 100;
      
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
    
    // Paint brush effect for all cards
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      revealPoints.current.push({
        x,
        y,
        timestamp: Date.now(),
      });
    }
  };

  // Paint brush canvas animation (all cards)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas size and fill with black
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        
        canvas.width = width;
        canvas.height = height;
        
        // Fill entire canvas with black
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(0, 0, width, height);
      }
    };
    
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Redraw black background
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Filter out old points (older than 2 seconds)
      const now = Date.now();
      revealPoints.current = revealPoints.current.filter(
        (point) => now - point.timestamp < 2000
      );

      // Erase circles to reveal image underneath
      if (revealPoints.current.length > 0) {
        ctx.globalCompositeOperation = "destination-out";
        
        revealPoints.current.forEach((point) => {
          const age = now - point.timestamp;
          const opacity = 1 - age / 2000; // Fade over 2 seconds
          
          const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 50);
          gradient.addColorStop(0, `rgba(0, 0, 0, ${opacity})`);
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 50, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a small delay to ensure canvas is ready
    setTimeout(() => {
      animate();
    }, 100);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={`${product.colSpan} ${product.rowSpan} ${product.height} p-5 md:p-3 lg:p-5 cursor-default relative overflow-hidden flex flex-col justify-between`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Paint brush reveal effect (all cards) */}
      <>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${getImageForIndex(index)})`, 
            zIndex: 0,
          }}
        />

        {/* Canvas overlay that erases to reveal image */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 1 }}
        />
      </>

      {/* Border SVG */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <defs>
          <linearGradient id={`cardGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="25%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="75%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <motion.radialGradient
            id={`revealMask-${index}`}
            gradientUnits="userSpaceOnUse"
            r="40%"
            animate={maskPosition}
            transition={{ duration: 0, ease: "easeOut" }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>
          <mask id={`borderMask-${index}`}>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill={`url(#revealMask-${index})`}
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
          stroke={`url(#cardGradient-${index})`}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          mask={`url(#borderMask-${index})`}
          style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </svg>

      {/* Card content */}
      <div className="relative z-10">
        <h3 className="text-xl md:text-lg lg:text-2xl font-semibold mb-3 md:mb-2 text-white transition-colors duration-300">
          {product.title}
        </h3>
      </div>
      
      <p className="text-gray-400 text-sm md:text-xs lg:text-base leading-relaxed relative z-10">
        {product.description}
      </p>
    </motion.div>
  );
}

