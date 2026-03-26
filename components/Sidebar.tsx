"use client";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  const navItems = [
    { id: 0, href: "#home", label: "Home" },
    { id: 1, href: "#products", label: "Products" },
    { id: 2, href: "#about", label: "About" },
    { id: 3, href: "#portfolio", label: "Portfolio" },
    { id: 4, href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');
    
    const handleScroll = () => {
      if (!scrollContainer) return;
      
      const sections = ["home", "products", "about", "portfolio", "contact"];
      const scrollPosition = scrollContainer.scrollTop + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(i);
          break;
        }
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const socialLinks = [
    { 
      name: "twitter", 
      href: "https://twitter.com",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      )
    },
    { 
      name: "linkedin", 
      href: "https://linkedin.com",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    { 
      name: "dribbble", 
      href: "https://dribbble.com/SavvyDigitalUAE",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
          <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
          <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
        </svg>
      )
    },
  ];

  return (
    <>
      {/* Navigation Labels - Centered Vertically */}
      <aside className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex">
        <div className="flex flex-col gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="relative group"
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
              onClick={(e) => {
                e.preventDefault();
                const targetId = item.href.substring(1);
                const targetElement = document.getElementById(targetId);
                const scrollContainer = document.querySelector('.scroll-container') as HTMLElement;
                
                if (targetElement && scrollContainer) {
                  const targetPosition = targetElement.offsetTop;
                  const startPosition = scrollContainer.scrollTop;
                  const distance = targetPosition - startPosition;
                  const duration = 1200; // 1.2 seconds
                  const startTime = performance.now();

                  // Smoother easing function (ease-in-out-sine)
                  const easeInOutSine = (t: number): number => {
                    return -(Math.cos(Math.PI * t) - 1) / 2;
                  };

                  const animation = () => {
                    const currentTime = performance.now();
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Apply easing
                    const easedProgress = easeInOutSine(progress);
                    
                    // Calculate new position
                    const newPosition = startPosition + (distance * easedProgress);
                    scrollContainer.scrollTop = newPosition;

                    if (progress < 1) {
                      requestAnimationFrame(animation);
                    } else {
                      // Ensure we end exactly at target
                      scrollContainer.scrollTop = targetPosition;
                    }
                  };

                  requestAnimationFrame(animation);
                }
              }}
            >
              <div className="flex items-center gap-3">
                {/* Active indicator line */}
                <div
                  className="h-px transition-all duration-300"
                  style={{
                    width: activeSection === item.id ? "24px" : hoveredNav === item.id ? "16px" : "12px",
                    backgroundColor: activeSection === item.id ? "#ffffff" : hoveredNav === item.id ? "#9ca3af" : "#4b5563",
                  }}
                />
                
                {/* Text label */}
                <span
                  className="text-sm font-medium tracking-wider transition-all duration-300 uppercase"
                  style={{
                    color: activeSection === item.id ? "#ffffff" : hoveredNav === item.id ? "#d1d5db" : "#6b7280",
                    transform: hoveredNav === item.id ? "translateX(4px)" : "translateX(0)",
                  }}
                >
                  {item.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </aside>

      {/* Social Links - Bottom Left */}
      <aside className="fixed left-8 bottom-8 z-50 hidden lg:flex">
        <div className="flex flex-col gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              onMouseEnter={() => setHoveredSocial(social.name)}
              onMouseLeave={() => setHoveredSocial(null)}
            >
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div
                  className="transition-all duration-300"
                  style={{
                    color: hoveredSocial === social.name ? "#ffffff" : "#6b7280",
                  }}
                >
                  {social.svg}
                </div>
                
                {/* Text label - appears on hover */}
                <span
                  className="text-sm font-medium tracking-wider uppercase transition-all duration-300 whitespace-nowrap"
                  style={{
                    color: hoveredSocial === social.name ? "#ffffff" : "#6b7280",
                    opacity: hoveredSocial === social.name ? 1 : 0,
                    transform: hoveredSocial === social.name ? "translateX(0)" : "translateX(-8px)",
                    maxWidth: hoveredSocial === social.name ? "100px" : "0",
                    overflow: "hidden",
                  }}
                >
                  {social.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}
