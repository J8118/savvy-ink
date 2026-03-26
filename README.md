# Savvy Digital — Landing Page

A high-impact landing page for Savvy Digital, a software development studio based in the UAE. Built with Next.js, Tailwind CSS, and Framer Motion.

**Live site:** [savvydigital.ae](https://savvydigital.ae)

---

## Design Philosophy

The site is built around **intentional minimalism** — every element earns its place. The visual identity draws from the contrast between raw creative energy and precise digital craft. Dark backgrounds create depth. Considered whitespace lets the work breathe.

### Core Principles

- **Dark-first aesthetic** — Deep blacks and grays establish a premium, immersive canvas. Color is used sparingly and with purpose.
- **Typography as identity** — The oversized "SAVVY" hero text with interactive hover effects (powered by SVG proximity-based color reveals) becomes the logo itself. A cursive Birthstone tagline, *"Where Code Meets Creativity"*, adds warmth against the geometric precision.
- **Motion with intent** — Animations serve the narrative. Scroll-snapped sections, staggered fade-ins, and spring-physics transitions guide the eye without overwhelming it.

### Visual Inspirations

- **Paint & ink in water** — The background video of paint dispersing in water is central to the brand. It bridges the organic (creativity, art, imagination) with the digital (precision, code, structure). This motif carries through the product cards, where a **paint-brush reveal effect** lets users brush away a black overlay with their cursor to uncover vivid paint imagery underneath.
- **Synthwave / Retrofuturism** — The ambient synthwave audio track and the blue-purple-pink gradient palette (particularly in the mobile hero glow and the typewriter word cycle: *visions, ideas, concepts, brands*) nod to retrofuturist aesthetics — technology as something beautiful, not just functional.
- **Gallery exhibition feel** — The vertical sidebar navigation on desktop mimics a gallery wayfinding system. Content is presented one full-screen section at a time with scroll-snap, treating each section like a room in an exhibit.
- **Interactive borders** — Product cards feature SVG borders that draw themselves into view on scroll, then reveal a rainbow gradient that follows the mouse cursor — a subtle reward for exploration.

### Color Palette

| Role | Value | Usage |
|------|-------|-------|
| Background | `#000000` | Primary canvas |
| Primary text | `#ffffff` | Headlines, emphasis |
| Secondary text | `#9ca3af` / `#6b7280` | Body copy, descriptions |
| Accent blue | `#3b82f6` | Glow effects, highlights |
| Accent purple | `#a78bfa` | Gradient transitions |
| Accent pink | `#f472b6` | Gradient endpoints |
| Border gray | `#1f2937` / `#374151` | Card borders, dividers |

### Typography

- **Inter** — Primary typeface. Clean geometric sans-serif for body text and UI elements.
- **Birthstone** — Cursive accent font for the hero tagline. Adds an organic, hand-crafted quality.

---

## Key Interactions

### Entry Screen
A cinematic gate before the main experience. The SAVVY wordmark animates in with a scale-and-fade entrance, followed by a staggered tagline and a glowing "Enter Site" button. This creates anticipation and allows the ambient audio to start on a deliberate user action.

### Paint-Brush Reveal (Product Cards)
Each product card hides a paint-splatter image beneath a solid black canvas overlay. As the user moves their mouse, radial gradients erase the black layer in a brush-stroke pattern that fades over 2 seconds — creating a peek-and-disappear effect that rewards curiosity.

### SVG Text Hover Effect (Desktop Hero)
The "SAVVY" text on desktop uses an SVG with proximity-based masking. As the cursor nears each letter, a radial gradient reveals a vivid blue-to-purple-to-cyan color spectrum beneath the outline, making the typography feel alive and responsive.

### Portfolio Carousel
Project slides transition with spring-physics animations (stiffness: 300, damping: 30). Navigation dots morph between a pill shape (active) and a circle (inactive) to indicate state.

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 15](https://nextjs.org/) | React framework, SSR, routing |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations and transitions |
| [Cloudinary](https://cloudinary.com/) | Optimized image and video delivery |
| [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/) | Smooth scroll behavior |
| TypeScript | Type safety |

---

## Project Structure

```
app/
  layout.tsx          # Root layout, fonts, metadata, SEO
  page.tsx            # Main page — orchestrates all sections
  globals.css         # Global styles, scroll-snap, animations
  sitemap.ts          # Dynamic sitemap generation

components/
  EntryScreen.tsx     # Cinematic entry gate
  Hero.tsx            # Hero section with SVG text effect
  Products.tsx        # Product grid with paint-brush cards
  ProductCard.tsx     # Individual card with canvas reveal
  PaintBrushReveal.tsx# Reusable paint-brush reveal component
  Portfolio.tsx       # Project carousel
  About.tsx           # About section
  Contact.tsx         # Contact form
  Sidebar.tsx         # Desktop vertical navigation
  MobileMenu.tsx      # Mobile navigation
  AudioVisualizer.tsx # Background music controller
  VideoBackground.tsx # Paint-in-water video background
  Navbar.tsx          # Top navigation bar
  ValueCard.tsx       # Value proposition cards
  StructuredData.tsx  # JSON-LD structured data
  ui/
    text-hover-effect.tsx  # SVG proximity text effect
    splitting-text.tsx     # Text splitting animation

hooks/
  useSmoothScroll.ts  # Custom smooth scroll hook

lib/
  cloudinary.ts       # Cloudinary URL helpers
  utils.ts            # Utility functions

public/
  *.svg, *.png        # Logos, paint textures, project images
  *.mp4               # Paint-in-water background videos
  synthwave.mp3       # Ambient audio track
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://savvydigital.ae
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

Cloudinary is optional — the site falls back to local assets in `public/` when not configured.

---

## Deployment

Configured for **Netlify** via `netlify.toml`. The site uses the `@netlify/plugin-nextjs` plugin for server-side rendering support.
