"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 0, href: "#home", label: "Home" },
    { id: 1, href: "#products", label: "Products" },
    { id: 2, href: "#about", label: "About" },
    { id: 3, href: "#portfolio", label: "Portfolio" },
    { id: 4, href: "#contact", label: "Contact" },
  ];

  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "Dribbble", href: "https://dribbble.com/SavvyDigitalUAE" },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    // Small delay to let menu close animation start
    setTimeout(() => {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      const scrollContainer = document.querySelector('.scroll-container') as HTMLElement;
      
      if (targetElement && scrollContainer) {
        // Smooth scroll to section
        scrollContainer.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    }, 400);
  };

  return (
    <>
      {/* Hamburger Button - Only visible on mobile/tablet */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 md:top-8 md:right-8 z-[100] lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 touch-manipulation"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 8 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="w-6 h-0.5 bg-white block"
        />
        <motion.span
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="w-6 h-0.5 bg-white block"
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -8 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="w-6 h-0.5 bg-white block"
        />
      </button>

      {/* Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-gradient-to-br from-gray-900 via-black to-gray-900 lg:hidden"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient" />
            
            <div className="relative h-full flex flex-col items-center justify-center px-8">
              {/* Navigation Links */}
              <nav className="flex flex-col items-center gap-6 md:gap-8 mb-12 md:mb-16">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white active:text-gray-400 transition-colors duration-300 uppercase tracking-wider touch-manipulation py-2"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-6 md:gap-8 items-center flex-wrap justify-center"
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm text-gray-400 active:text-white transition-colors duration-300 uppercase tracking-wider touch-manipulation py-2"
                  >
                    {social.name}
                  </a>
                ))}
              </motion.div>

              {/* Copyright */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 text-xs text-gray-600 tracking-wider"
              >
                © 2024 SAVVY
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


