"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import ValueCard from "./ValueCard";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredValueIndex, setHoveredValueIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "5+", label: "Years Experience" },
  ];

  const values = [
    {
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge technology and creative thinking.",
    },
    {
      title: "Quality",
      description: "Delivering excellence in every line of code and pixel we craft.",
    },
    {
      title: "Partnership",
      description: "Building lasting relationships through transparency and collaboration.",
    },
  ];

  return (
    <div ref={sectionRef} className="min-h-screen lg:h-full flex flex-col items-center justify-center py-16 lg:py-16 overflow-y-visible lg:overflow-hidden">
      {/* Desktop Version */}
      <div className="hidden lg:block w-full max-w-6xl mx-auto pl-28 lg:pl-32 pr-6 lg:pr-8">
        {/* Split layout: Story + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 mb-12 lg:mb-16">
          {/* Left: Our Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center min-w-0"
          >
            <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-5 lg:mb-6">
              Our Story
            </h3>
            <p className="text-gray-400 text-sm lg:text-base xl:text-lg leading-relaxed mb-4 lg:mb-6">
              At Savvy, we believe that exceptional digital experiences are born at the 
              intersection of creativity and technical excellence. We're a team of passionate 
              developers, designers, and strategists dedicated to transforming ideas into 
              powerful digital solutions.
            </p>
            <p className="text-gray-400 text-sm lg:text-base xl:text-lg leading-relaxed">
              Every project is an opportunity to push boundaries, challenge conventions, 
              and create something extraordinary. We don't just build websites and apps—we 
              craft experiences that inspire, engage, and deliver real results.
            </p>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col justify-center space-y-5 lg:space-y-6 xl:space-y-8 min-w-0"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="border-l-4 border-gray-700 pl-4 lg:pl-5 xl:pl-6 hover:border-blue-500 transition-colors duration-300"
              >
                <div className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-1 lg:mb-2 break-words">
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base xl:text-lg text-gray-400 break-words">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mt-8 lg:mt-12 xl:mt-16">
          <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center mb-6 lg:mb-8 xl:mb-12">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 xl:gap-6">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                value={value}
                index={index}
                totalCards={values.length}
                isVisible={isVisible}
                isHovered={hoveredValueIndex === index}
                onMouseEnter={() => setHoveredValueIndex(index)}
                onMouseLeave={() => setHoveredValueIndex(null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Version - Optimized Design */}
      <div className="lg:hidden w-full max-w-xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-3 text-white"
        >
          About Us
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-gray-400 mb-8 text-sm"
        >
          Passionate creators building digital excellence
        </motion.p>

        {/* Stats Cards - Compact */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-sm border border-white/10 p-4 text-center"
            >
              <div className="relative z-10">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 leading-tight">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">Our Story</h3>
          <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
            <p>
              At Savvy, we believe that exceptional digital experiences are born at the 
              intersection of creativity and technical excellence. We're a team of passionate 
              developers, designers, and strategists dedicated to transforming ideas into 
              powerful digital solutions.
            </p>
            <p>
              Every project is an opportunity to push boundaries, challenge conventions, 
              and create something extraordinary. We don't just build websites and apps—we 
              craft experiences that inspire, engage, and deliver real results.
            </p>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-6"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Our Values</h4>
          <div className="space-y-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mt-1.5 flex-shrink-0" />
                <div>
                  <h5 className="text-sm font-semibold text-white mb-1">
                    {value.title}
                  </h5>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

