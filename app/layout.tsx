import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Birthstone } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import { getCloudinaryVideoUrl } from "@/lib/cloudinary";

// Optimize font loading with next/font
// Using subset optimization and explicit preload
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", // Critical: prevents invisible text during font load
  variable: "--font-inter",
  preload: true, // Preload critical font
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
  adjustFontFallback: true, // Reduces layout shift
});

const birthstone = Birthstone({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-birthstone",
  preload: true, // Preload Birthstone font for tagline (critical for design)
  fallback: ["cursive"],
});

// TODO: Update these values with your actual business information
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://savvydigital.ae";
const businessName = "Savvy Digital";
const businessEmail = "hello@savvydigital.ae";
const businessPhone = "+971-50-512-4166"; 
const businessAddress = {
  streetAddress: "Gate Avenue, Zone D - Level 1 Al Mustaqbal St - Zaa'beel Second - DIFC - Dubai",
  addressLocality: "Dubai",
  addressRegion: "DU",
  postalCode: "00000",
  addressCountry: "AE"
};
const businessGeo = {
  latitude: 25.20783, 
  longitude: 55.27633
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Savvy - Software Development & Website Design | Dubai, UAE",
    template: "%s | Savvy Digital"
  },
  description: "Leading software development and website design company in Dubai, UAE. We create sleek, modern digital experiences with cutting-edge technology. Specializing in web development, mobile apps, e-commerce, AI/ML, and cloud solutions.",
  keywords: [
    "software development Dubai",
    "web development UAE",
    "mobile app development Dubai",
    "e-commerce solutions UAE",
    "website design Dubai",
    "AI ML development UAE",
    "cloud solutions Dubai",
    "digital agency UAE",
    "تطوير البرمجيات دبي",
    "تصميم المواقع الإلكترونية الإمارات"
  ],
  authors: [{ name: businessName }],
  creator: businessName,
  publisher: businessName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    alternateLocale: ['ar_AE'],
    url: siteUrl,
    siteName: businessName,
    title: "Savvy - Software Development & Website Design | Dubai, UAE",
    description: "Leading software development and website design company in Dubai, UAE. We create sleek, modern digital experiences with cutting-edge technology.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`, // TODO: Create and add OG image
        width: 1200,
        height: 630,
        alt: `${businessName} - Software Development Dubai`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Savvy - Software Development & Website Design | Dubai, UAE",
    description: "Leading software development and website design company in Dubai, UAE.",
    images: [`${siteUrl}/og-image.jpg`], // TODO: Create and add Twitter image
    creator: '@savvydigital', // TODO: Update with actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // TODO: Add your verification codes after setting up Google Search Console
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-AE': `${siteUrl}/en`,
      'ar-AE': `${siteUrl}/ar`,
      'x-default': `${siteUrl}/en`,
    },
  },
  category: 'Technology',
  other: {
    // Additional meta tags
    'geo.region': 'AE-DU',
    'geo.placename': 'Dubai',
    'geo.position': `${businessGeo.latitude};${businessGeo.longitude}`,
    'ICBM': `${businessGeo.latitude}, ${businessGeo.longitude}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate LCP video URLs for preloading
  // This is the hero video background - critical for LCP
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const videoPublicId = 'paint-water1_dtsc2r';
  
  // Generate optimized video URLs for preloading
  const lcpVideoWebM = cloudName 
    ? getCloudinaryVideoUrl(videoPublicId, {
        quality: 'auto',
        format: 'webm',
        fetchFormat: 'auto',
        videoCodec: 'auto',
      })
    : null;
  
  const lcpVideoMP4 = cloudName
    ? getCloudinaryVideoUrl(videoPublicId, {
        quality: 'auto',
        format: 'mp4',
        fetchFormat: 'auto',
        videoCodec: 'auto',
      })
    : null;

  // LocalBusiness Structured Data (JSON-LD)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    "name": businessName,
    "image": `${siteUrl}/favicon.svg`,
    "url": siteUrl,
    "telephone": businessPhone,
    "email": businessEmail,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessAddress.streetAddress,
      "addressLocality": businessAddress.addressLocality,
      "addressRegion": businessAddress.addressRegion,
      "postalCode": businessAddress.postalCode,
      "addressCountry": businessAddress.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": businessGeo.latitude,
      "longitude": businessGeo.longitude
    },
    "openingHours": "Mo-Fr 09:00-18:00", // TODO: Update with actual business hours
    "priceRange": "$$",
    "sameAs": [
      // TODO: Add your social media URLs
      // "https://www.facebook.com/yourpage",
      // "https://www.linkedin.com/company/yourcompany",
      // "https://www.instagram.com/yourhandle",
      // "https://twitter.com/yourhandle"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "United Arab Emirates"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": businessGeo.latitude,
        "longitude": businessGeo.longitude
      }
    }
  };

  // Organization Schema (JSON-LD)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": businessName,
    "url": siteUrl,
    "logo": `${siteUrl}/favicon.svg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": businessPhone,
      "contactType": "customer service",
      "email": businessEmail,
      "areaServed": "AE",
      "availableLanguage": ["en", "ar"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessAddress.streetAddress,
      "addressLocality": businessAddress.addressLocality,
      "addressRegion": businessAddress.addressRegion,
      "postalCode": businessAddress.postalCode,
      "addressCountry": businessAddress.addressCountry
    }
  };

  // Service Schema (JSON-LD) - for main services
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#services`,
    "name": `${businessName} - Software Development Services`,
    "provider": {
      "@id": `${siteUrl}/#organization`
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Arab Emirates"
    },
    "serviceType": [
      "Web Development",
      "Mobile App Development",
      "E-commerce Solutions",
      "Software Development",
      "UI/UX Design",
      "Cloud Solutions",
      "AI/ML Integration",
      "API Development"
    ],
    "description": "Leading software development and website design services in Dubai, UAE"
  };

  return (
    <html lang="en-AE" className={`dark ${inter.variable} ${birthstone.variable}`}>
      <head>
        {/* Resource hints for performance - Cloudinary only (fonts are self-hosted now) */}
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        
        {/* Critical CSS for EntryScreen and Hero - Inline to prevent render-blocking */}
        {/* This ensures the LCP element (SAVVY text) renders immediately */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for LCP text (EntryScreen & Hero) */
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            /* Ensure EntryScreen/Hero text renders immediately - Critical for LCP */
            /* Base styles for mobile */
            h1.text-7xl,
            h1.text-8xl {
              font-weight: 700;
              letter-spacing: -0.025em;
              text-align: center;
            }
            /* Ensure gradient text animation works immediately */
            h1[style*="linear-gradient"] {
              background-size: 200% auto !important;
              -webkit-background-clip: text !important;
              -webkit-text-fill-color: transparent !important;
              background-clip: text !important;
              animation: gradient 3s ease infinite;
              will-change: background-position;
            }
            /* Optimize EntryScreen container */
            .fixed.inset-0.z-\\[100\\] {
              background-color: #000000;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            /* Ensure text is visible immediately */
            body {
              background-color: #000000;
              color: #ffffff;
            }
            /* Ensure Birthstone font loads for tagline */
            /* Next.js next/font injects the font CSS, but CSS optimization might defer it */
            /* So we ensure the tagline uses the font variable with fallback */
            .cursive-tagline {
              font-family: var(--font-birthstone, 'Birthstone', cursive) !important;
              font-weight: 400;
              font-size: 2.5rem;
              line-height: 1.2;
            }
            /* Ensure font variable is available even if CSS is deferred */
            html {
              --font-birthstone: var(--font-birthstone, 'Birthstone');
            }
          `
        }} />
        
        {/* Preload LCP video - Critical for Largest Contentful Paint optimization */}
        {/* Preload WebM first (better compression, modern browsers) */}
        {lcpVideoWebM && (
          <link 
            rel="preload" 
            href={lcpVideoWebM} 
            as="video" 
            type="video/webm" 
            fetchPriority="high"
          />
        )}
        {/* Preload MP4 as fallback (broader browser support) */}
        {lcpVideoMP4 && (
          <link 
            rel="preload" 
            href={lcpVideoMP4} 
            as="video" 
            type="video/mp4" 
            fetchPriority="high"
          />
        )}
        
        {/* Preload critical font - Next.js will inject the actual font URL */}
        {/* This is handled automatically by next/font, but we ensure it's prioritized */}
        
        {/* Hreflang tags for bilingual support (Arabic + English UAE) */}
        <link rel="alternate" hrefLang="en-AE" href={`${siteUrl}/en`} />
        <link rel="alternate" hrefLang="ar-AE" href={`${siteUrl}/ar`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={siteUrl} />
      </head>
      <body className={`bg-black text-white antialiased ${inter.className}`}>
        {/* Structured Data - JSON-LD */}
        <StructuredData data={[localBusinessSchema, organizationSchema, serviceSchema]} />
        
        {/* Hidden form for Netlify to detect */}
        <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="text" name="company" />
          <textarea name="message"></textarea>
        </form>
        {children}
      </body>
    </html>
  );
}
