"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CldImage } from "next-cloudinary";

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
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

  interface Project {
    title: string;
    category: string;
    description: string;
    image: string;
    cloudinaryId?: string; // Optional Cloudinary public ID
    tech: string[];
  }

  const projects: Project[] = [
    {
      title: "Rouge Droid",
      category: "Web3 & Blockchain",
      description: "A dystopian NFT collection living on the Ethereum blockchain. We crafted the complete experience from concept to deployment, including custom smart contracts written in Solidity and a sleek Next.js website for minting and showcasing the collection.",
      image: "/RougeDroid.svg",
      cloudinaryId: "RougeDroid_xiacfv", // Cloudinary Public ID
      tech: ["Solidity", "Ethereum", "Next.js", "Web3.js"],
    },
    {
      title: "Neura Leaf",
      category: "Design & Branding",
      description: "Comprehensive design and branding kit for an AI-powered platform modeling plant intelligence and sustainability. Bridging biology, consciousness, ecology, and data science through thoughtful visual identity, brand guidelines, and a cohesive design system.",
      image: "/NeuraLeaf.svg",
      cloudinaryId: "NeuraLeaf_ik3rza", // Cloudinary Public ID
      tech: ["Figma", "Brand Identity", "Design Systems", "Sustainability"],
    },  
    {
        title: "DAMAC Sadiya",
        category: "Design Concept",
        description: "A luxury real estate design concept created by our team of designers. This is an independent creative exploration showcasing architectural visualization and branding excellence. This project is in no way associated with or endorsed by DAMAC Properties.",
        image: "/DAMAC.svg",
        cloudinaryId: "DAMAC_zb4vkg", // Cloudinary Public ID
        tech: ["Figma", "3D Visualization", "Brand Design", "Architecture"],
      },
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div ref={sectionRef} className="min-h-screen lg:h-screen flex items-center justify-center py-16 lg:py-20 lg:pb-16 overflow-y-visible lg:overflow-hidden">
      {/* Desktop Version */}
      <div className="hidden lg:block w-full pl-28 lg:pl-32 pr-6 lg:pr-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-10 md:mb-12 lg:mb-12 text-white">
            Our Work
          </h2>

          {/* Carousel Container */}
          <div className="relative">
          {/* Main Carousel */}
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full"
              >
                <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-12 items-center">
                  {/* Image */}
                  <div className="relative w-full lg:w-[70%] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden">
                    {projects[currentIndex].image ? (
                      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && projects[currentIndex].cloudinaryId ? (
                        <CldImage
                          src={projects[currentIndex].cloudinaryId}
                          alt={projects[currentIndex].title}
                          width={1200}
                          height={800}
                          className="w-full h-full object-contain scale-90"
                          quality="auto"
                          format="auto"
                          sizes="(max-width: 768px) 100vw, 70vw"
                        />
                      ) : (
                        <img
                          src={projects[currentIndex].image}
                          alt={projects[currentIndex].title}
                          className="w-full h-full object-contain scale-90"
                        />
                      )
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-gray-900">
                        {/* Placeholder */}
                        <div className="text-center">
                          <div className="text-6xl mb-4">🖼️</div>
                          <p className="text-lg">{projects[currentIndex].title}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center space-y-5 md:space-y-6 lg:w-[30%] w-full">
                    <div>
                      <div className="flex items-center gap-3 mb-3 md:mb-4">
                        <span className="text-xs md:text-sm text-gray-500 font-mono">
                          {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                        </span>
                        <span className="text-xs md:text-sm text-gray-500">•</span>
                        <span className="text-xs md:text-sm text-gray-400">{projects[currentIndex].category}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-5 lg:mb-6">
                        {projects[currentIndex].title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed">
                      {projects[currentIndex].description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {projects[currentIndex].tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm border border-gray-800 text-gray-400 rounded-full hover:border-gray-600 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mt-10 md:mt-12">
            <button
              onClick={prevSlide}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-2 border-gray-800 text-gray-400 hover:border-white hover:text-white transition-all duration-300 rounded-full"
              aria-label="Previous project"
            >
              <svg width="18" height="18" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            {/* Dots Navigation */}
            <div className="flex gap-2 md:gap-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="transition-all duration-300"
                  aria-label={`Go to project ${index + 1}`}
                >
                  <div
                    className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-6 md:w-8 bg-white'
                        : 'w-1.5 md:w-2 bg-gray-700 hover:bg-gray-500'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-2 border-gray-800 text-gray-400 hover:border-white hover:text-white transition-all duration-300 rounded-full"
              aria-label="Next project"
            >
              <svg width="18" height="18" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Mobile Version - Compact but Beautiful */}
      <div className="lg:hidden w-full max-w-xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-2 text-white"
        >
          Our Work
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-gray-400 mb-6 text-sm"
        >
          Projects that make an impact
        </motion.p>

        {/* Project Counter */}
        <div className="text-center mb-4">
          <span className="text-xs text-gray-500 font-mono">
            {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        {/* Swipeable Card - More Compact */}
        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-sm border border-white/10 p-5">
                {/* Project Image - Smaller */}
                <div className="relative w-full h-48 sm:h-56 mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900" style={{ aspectRatio: '4/3' }}>
                  {projects[currentIndex].image ? (
                    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && projects[currentIndex].cloudinaryId ? (
                      <CldImage
                        src={projects[currentIndex].cloudinaryId}
                        alt={projects[currentIndex].title}
                        width={600}
                        height={450}
                        className="w-full h-full object-contain"
                        quality="auto"
                        format="auto"
                        sizes="(max-width: 640px) 100vw, 600px"
                      />
                    ) : (
                      <img
                        src={projects[currentIndex].image}
                        alt={projects[currentIndex].title}
                        className="w-full h-full object-contain"
                        width={600}
                        height={450}
                      />
                    )
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-5xl">🖼️</div>
                    </div>
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                    {projects[currentIndex].category}
                  </div>
                </div>

                {/* Project Info - Compact */}
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {projects[currentIndex].title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {projects[currentIndex].description}
                  </p>
                  
                  {/* Tech Stack - Compact */}
                  <div className="flex flex-wrap gap-2">
                    {projects[currentIndex].tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 py-1 text-[10px] sm:text-xs bg-white/5 border border-white/10 text-gray-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation - Compact */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={prevSlide}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white active:scale-95 transition-transform"
            aria-label="Previous project"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-1.5">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="transition-all duration-300"
                aria-label={`Go to project ${index + 1}`}
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-6 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/30'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white active:scale-95 transition-transform"
            aria-label="Next project"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

