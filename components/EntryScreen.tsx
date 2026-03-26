"use client";
import { useState } from "react";
import { motion } from "motion/react";

interface EntryScreenProps {
  onEnter: () => void;
}

export default function EntryScreen({ onEnter }: EntryScreenProps) {
  const [isLeaving, setIsLeaving] = useState(false);

  const handleEnter = () => {
    setIsLeaving(true);
    // Wait for animation to complete before calling onEnter
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLeaving ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center px-6"
    >
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Animated Gradient Text - Same as mobile hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <h1 
            className="text-7xl md:text-8xl font-bold tracking-tight text-center"
            style={{
              background: 'linear-gradient(90deg, #ffffff 0%, #a0a0a0 50%, #ffffff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient 3s ease infinite',
              willChange: 'background-position', // Optimize animation performance
            }}
            {...({ fetchPriority: "high" } as React.HTMLAttributes<HTMLHeadingElement>)}
          >
            SAVVY
          </h1>
          {/* Glow effect */}
          <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/60 text-sm tracking-[0.3em] uppercase font-light"
        >
          Digital Innovation
        </motion.p>

        {/* Animated Underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-32 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />

        {/* Enter Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEnter}
          className="group relative mt-4 px-10 py-4 bg-white text-black text-sm font-semibold tracking-wide rounded-full overflow-hidden transition-all duration-300"
        >
          <span className="relative z-10">Enter Site</span>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-active:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 shadow-[0_0_30px_rgba(255,255,255,0.3)] opacity-0 group-active:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </div>

      {/* Bottom hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 text-white/30 text-xs tracking-widest uppercase"
      >
        Click to begin
      </motion.p>

      {/* Keyframe animation moved to inline critical CSS in layout.tsx for better LCP */}
    </motion.div>
  );
}

