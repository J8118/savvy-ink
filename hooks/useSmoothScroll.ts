"use client";
import { useEffect } from "react";

export const useSmoothScroll = () => {
  useEffect(() => {
    // Only apply controlled scrolling on desktop (1024px and above)
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return; // Exit early on mobile/tablet

    const scrollContainer = document.querySelector('.scroll-container') as HTMLElement;
    if (!scrollContainer) return;

    let isScrolling = false;
    let currentSection = 0;
    const sections = document.querySelectorAll('.scroll-section');

    const smoothScrollTo = (targetPosition: number, duration: number = 1000) => {
      const startPosition = scrollContainer.scrollTop;
      const distance = targetPosition - startPosition;
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
          isScrolling = false;
        }
      };

      isScrolling = true;
      requestAnimationFrame(animation);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      e.preventDefault();

      // Determine scroll direction
      const delta = e.deltaY;
      
      if (delta > 0 && currentSection < sections.length - 1) {
        // Scroll down
        currentSection++;
        const targetSection = sections[currentSection] as HTMLElement;
        smoothScrollTo(targetSection.offsetTop, 1000); // 1 second
      } else if (delta < 0 && currentSection > 0) {
        // Scroll up
        currentSection--;
        const targetSection = sections[currentSection] as HTMLElement;
        smoothScrollTo(targetSection.offsetTop, 1000); // 1 second
      }
    };

    // Track current section on manual scroll
    const handleScroll = () => {
      if (isScrolling) return;

      const scrollTop = scrollContainer.scrollTop;
      const viewportHeight = window.innerHeight;
      
      sections.forEach((section, index) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionBottom = sectionTop + viewportHeight;
        
        if (scrollTop >= sectionTop - viewportHeight / 2 && scrollTop < sectionBottom - viewportHeight / 2) {
          currentSection = index;
        }
      });
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);
};
