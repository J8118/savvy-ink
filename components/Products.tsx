"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import ProductCard from "./ProductCard";

export default function Products() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Animate in when entering, animate out when leaving
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
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

  const products = [
    {
      title: "WEB",
      description: "Bespoke websites and web apps with focus on performance and precision.",
      mobileDescription: "Custom websites and web applications built with cutting-edge technologies. We create fast, responsive, and scalable solutions that deliver exceptional user experiences across all devices.",
      colSpan: "md:col-span-3",
      rowSpan: "md:row-span-1",
      height: "min-h-[180px] md:min-h-[200px]",
    },
    {
      title: "MOBILE",
      description: "Intuitive cross-platform experiences built with native quality.",
      mobileDescription: "Native and cross-platform mobile applications for iOS and Android. We build intuitive, high-performance apps that users love, with seamless functionality and beautiful design.",
      colSpan: "md:col-span-6",
      rowSpan: "md:row-span-1",
      height: "min-h-[180px] md:min-h-[200px]",
    },
    {
      title: "ECOMMERCE",
      description: "Scalable online stores designed to convert and retain customers.",
      mobileDescription: "Complete e-commerce solutions from storefront to checkout. We build secure, scalable online stores with payment integration, inventory management, and conversion optimization.",
      colSpan: "md:col-span-3",
      rowSpan: "md:row-span-2",
      height: "min-h-[180px] md:min-h-[416px]",
    },
    {
      title: "SOFTWARE",
      description: "Tailored digital tools that solve complex business needs.",
      mobileDescription: "Custom software solutions designed specifically for your business needs. From enterprise applications to specialized tools, we build software that streamlines operations and drives growth.",
      colSpan: "md:col-span-5",
      rowSpan: "md:row-span-1",
      height: "min-h-[180px] md:min-h-[200px]",
    },
    {
      title: "DESIGN",
      description: "Beautiful, modern interfaces that captivate and engage users.",
      mobileDescription: "UI/UX design that combines aesthetics with functionality. We create stunning interfaces, brand identities, and design systems that elevate your digital presence and engage users.",
      colSpan: "md:col-span-4",
      rowSpan: "md:row-span-1",
      height: "min-h-[180px] md:min-h-[200px]",
    },
    {
      title: "CLOUD",
      description: "Scalable cloud infrastructure and deployment solutions.",
      mobileDescription: "Cloud architecture and DevOps solutions for modern applications. We handle deployment, scaling, monitoring, and optimization across AWS, Azure, and Google Cloud platforms.",
      colSpan: "md:col-span-6",
      rowSpan: "md:row-span-1",
      height: "min-h-[180px] md:min-h-[200px]",
    },
    {
      title: "AI/ML",
      description: "Intelligent automation and machine learning integration.",
      mobileDescription: "Artificial intelligence and machine learning solutions that transform your business. From predictive analytics to natural language processing, we bring AI capabilities to your applications.",
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-1",
      height: "min-h-[180px] md:min-h-[200px]",
    },
    {
      title: "API",
      description: "Robust API development and integration services.",
      mobileDescription: "RESTful and GraphQL API development with comprehensive documentation. We build secure, scalable APIs and integrate third-party services to extend your application's capabilities.",
      colSpan: "md:col-span-4",
      rowSpan: "md:row-span-1",
      height: "min-h-[180px] md:min-h-[200px]",
    },
  ];

  return (
    <div ref={sectionRef} className="min-h-screen lg:h-full flex items-center justify-center py-16 lg:py-12 overflow-y-visible lg:overflow-hidden lg:bg-black">
      {/* Desktop Version */}
      <div className="hidden lg:block max-w-5xl mx-auto w-full pl-28 lg:pl-32 pr-6 lg:pr-8">
        <h2 className="text-5xl font-bold text-center mb-8 text-white">
          Our Creative Solutions
        </h2>
        
        <div className="grid grid-cols-12 auto-rows-auto gap-3">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              index={index}
              totalCards={products.length}
              isVisible={isVisible}
              isHovered={hoveredIndex === index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>

      {/* Mobile Version - Horizontal Scroll Carousel */}
      <div className="lg:hidden w-full px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-3 text-white px-4"
        >
          What We Do
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-gray-400 mb-6 px-4"
        >
          Transforming ideas into digital excellence
        </motion.p>
        
        {/* Horizontal Scrollable Cards */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide px-4 pb-6">
            <div className="flex gap-5 w-max">
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-8 active:border-white/20 transition-all duration-300 w-[340px] sm:w-[380px] flex-shrink-0 min-h-[400px] flex flex-col"
                >
                  {/* Gradient Accent */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-0 group-active:opacity-100 transition-opacity duration-500" />
                  
                  {/* Number Badge */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-xs font-mono text-gray-400">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon/Dot */}
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center group-active:scale-110 transition-transform duration-300">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-400" />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-active:text-blue-400 transition-colors duration-300">
                      {product.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-base text-gray-400 leading-relaxed mb-6 flex-grow">
                      {product.mobileDescription}
                    </p>
                    
                    {/* Learn More Link */}
                    <div className="flex items-center gap-2 text-sm text-blue-400 font-medium">
                      <span>Learn more</span>
                      <svg className="w-4 h-4 group-active:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-2 mt-4"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span className="text-xs text-gray-500">Swipe to explore</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

