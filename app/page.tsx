"use client";
import { useState } from "react";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import VideoBackground from "@/components/VideoBackground";
import EntryScreen from "@/components/EntryScreen";
import AudioVisualizer from "@/components/AudioVisualizer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  useSmoothScroll();

  return (
    <>
      {/* Entry Screen */}
      {!hasEntered && <EntryScreen onEnter={() => setHasEntered(true)} />}
      
      {/* Background Music */}
      <AudioVisualizer audioSrc="/synthwave.mp3" shouldPlay={hasEntered} />
      
      {/* Video Background - Only render after entry */}
      {hasEntered && <VideoBackground />}
      
      {hasEntered && (
        <>
          <Sidebar />
          <MobileMenu />
        </>
      )}
      
      <main className="scroll-container bg-transparent relative z-10">
        <section id="home" className="scroll-section">
          {hasEntered && <Hero />}
        </section>
        <section id="products" className="scroll-section">
          <Products />
        </section>
        <section id="about" className="scroll-section">
          <About />
        </section>
        {/* Black background wrapper for Portfolio and Contact */}
        <div className="lg:bg-black">
          <section id="portfolio" className="scroll-section">
            <Portfolio />
          </section>
          <section id="contact" className="scroll-section">
            <Contact />
          </section>
        </div>
      </main>
    </>
  );
}
