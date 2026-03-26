"use client";
import { useRef, useState, useEffect } from "react";

interface PaintBrushRevealProps {
  image: string;
  children: React.ReactNode;
  className?: string;
}

export default function PaintBrushReveal({ image, children, className = "" }: PaintBrushRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const revealPoints = useRef<Array<{ x: number; y: number; timestamp: number }>>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
      }
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Filter out old points (older than 2 seconds)
      const now = Date.now();
      revealPoints.current = revealPoints.current.filter(
        (point) => now - point.timestamp < 2000
      );

      // Draw reveal circles with fade
      revealPoints.current.forEach((point) => {
        const age = now - point.timestamp;
        const opacity = 1 - age / 2000; // Fade over 2 seconds
        
        ctx.globalCompositeOperation = "destination-out";
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 50);
        gradient.addColorStop(0, `rgba(0, 0, 0, ${opacity})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 50, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    revealPoints.current.push({
      x,
      y,
      timestamp: Date.now(),
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Black overlay with canvas mask */}
      <div className="absolute inset-0 bg-black">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ mixBlendMode: "destination-out" as React.CSSProperties["mixBlendMode"] }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}


