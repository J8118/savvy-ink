"use client";
import { getCloudinaryVideoSources } from "@/lib/cloudinary";

export default function VideoBackground() {
  // Use Cloudinary for optimized video delivery
  // Public ID from Cloudinary: paint-water1_dtsc2r
  const videoPublicId = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME 
    ? 'paint-water1_dtsc2r' // Cloudinary Public ID
    : 'paint-water1'; // Fallback to local file if Cloudinary not configured
  
  const videoSources = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    ? getCloudinaryVideoSources(videoPublicId, {
        quality: 'auto',
        format: 'auto',
        fetchFormat: 'auto',
        videoCodec: 'auto',
      })
    : [{ src: '/paint-water1.mp4', type: 'video/mp4' }]; // Fallback to local file

  return (
    <>
      {/* Desktop: Full video background */}
      <div className="hidden lg:block fixed top-0 left-0 w-full h-screen pointer-events-none" style={{ zIndex: 0 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          preload="auto"
          {...({ fetchPriority: "high" } as React.VideoHTMLAttributes<HTMLVideoElement>)}
          width={1920}
          height={1080}
          style={{ aspectRatio: '16/9' }}
        >
          {videoSources.map((source, index) => (
            <source key={index} src={source.src} type={source.type} />
          ))}
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Mobile: Gradient background with subtle video on hero only */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-screen pointer-events-none" style={{ zIndex: 0 }}>
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 animate-gradient" />
        
        {/* Subtle video overlay only on top portion */}
        <div className="absolute top-0 left-0 w-full h-screen overflow-hidden opacity-30">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110 blur-sm"
            preload="auto"
            {...({ fetchPriority: "high" } as React.VideoHTMLAttributes<HTMLVideoElement>)}
            width={1920}
            height={1080}
            style={{ aspectRatio: '16/9' }}
          >
            {videoSources.map((source, index) => (
              <source key={index} src={source.src} type={source.type} />
            ))}
          </video>
        </div>
        
        {/* Gradient overlay for smooth transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>
    </>
  );
}
