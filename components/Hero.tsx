"use client";
import { TextHoverEffect } from "./ui/text-hover-effect";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Typewriter effect state
  const words = [
    { text: 'visions', color: '#93c5fd', shadow: 'rgba(59, 130, 246, 0.6)' },
    { text: 'ideas', color: '#c084fc', shadow: 'rgba(168, 85, 247, 0.6)' },
    { text: 'concepts', color: '#f472b6', shadow: 'rgba(244, 114, 182, 0.6)' },
    { text: 'brands', color: '#a78bfa', shadow: 'rgba(167, 139, 250, 0.6)' }
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex].text;
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
        } else {
          // Move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, words]);

  return (
    <div className="h-full flex items-center justify-center px-4 lg:px-8">
      {/* Desktop Version */}
      <div className="hidden lg:flex relative flex-col items-center justify-center w-full max-w-6xl mx-auto pl-28 lg:pl-32 pr-6 lg:pr-8">
        <div className="w-full aspect-[7/3] max-h-[60vh] flex items-center justify-center">
          <TextHoverEffect text="SAVVY" />
        </div>
        
        <p 
          className="cursive-tagline absolute bottom-[8%] left-1/2 -translate-x-1/2 text-center transition-all duration-500 cursor-default px-4"
          style={{ 
            letterSpacing: '0.1em',
            color: isHovered ? '#ffffff' : '#9ca3af',
            textShadow: isHovered ? '0 0 20px rgba(59, 130, 246, 0.5)' : 'none'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Where Code Meets Creativity
        </p>
      </div>

      {/* Mobile Version - Premium & Animated */}
      <div className="lg:hidden flex flex-col items-center justify-center w-full min-h-screen px-6 relative overflow-hidden">
        {/* Main Content */}
        <div className="flex flex-col items-center justify-center gap-6 w-full z-10">
          {/* Animated Gradient Text - LCP Element on Mobile */}
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

          {/* Rotating Taglines */}
          <div className="h-8 overflow-hidden relative w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ 
                opacity: 1, 
                y: [0, 0, -32, -32, -64, -64, -96]
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.3 },
                y: { 
                  duration: 9,
                  times: [0, 0.25, 0.3, 0.55, 0.6, 0.85, 0.9],
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.3 
                }
              }}
              className="flex flex-col items-center absolute"
            >
              <p className="text-white/70 text-sm tracking-[0.3em] uppercase font-light h-8 flex items-center justify-center whitespace-nowrap">
                Digital Innovation
              </p>
              <p className="text-white/70 text-sm tracking-[0.3em] uppercase font-light h-8 flex items-center justify-center whitespace-nowrap">
                Creative Excellence
              </p>
              <p className="text-white/70 text-sm tracking-[0.3em] uppercase font-light h-8 flex items-center justify-center whitespace-nowrap">
                Future Forward
              </p>
              {/* Duplicate for seamless loop */}
              <p className="text-white/70 text-sm tracking-[0.3em] uppercase font-light h-8 flex items-center justify-center whitespace-nowrap">
                Digital Innovation
              </p>
            </motion.div>
          </div>

          {/* Animated Underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />

          {/* Description with Typewriter Effect */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/50 text-center text-base leading-relaxed max-w-sm font-light px-4"
          >
            Transforming{' '}
            <span 
              className="font-medium inline-block"
              style={{
                color: words[currentWordIndex].color,
                textShadow: `0 0 20px ${words[currentWordIndex].shadow}, 0 0 40px ${words[currentWordIndex].shadow}`,
                minWidth: '85px'
              }}
            >
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
            {' '}into digital reality through innovative design and cutting-edge technology
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1"
          >
            <motion.div 
              className="w-1 h-2 bg-white/50 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <span className="text-[10px] text-white/30 uppercase tracking-widest">Scroll</span>
        </motion.div>
      </div>
    </div>
  );
}
