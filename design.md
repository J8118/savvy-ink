# Savvy Minimal – Website Design Document

## 🎯 Overview
Savvy Minimal is a software development company website built around intentional minimalism, confident typography, and precise motion.  
The hero section already defines the brand aesthetic — all new sections should **inherit the same color palette, fonts, and hover effects** from it.

> 🔧 **Theme directive:**  
> Use the **existing colors, fonts, and effects defined in the hero section.**  
> Automatically grep and reuse variables or Tailwind classes already implemented there.  
> The rest of the layout should extend that same system (no new color tokens unless necessary).

---

## 🖥️ Layout & Structure

### 1. Navigation
**Top Navigation (Recommended)**
- Clean top bar with logo on the left and links on the right.
- Transparent over hero; solid background (same as hero palette) on scroll.
- Links: `Home`, `Products`, `Process`, `About`, `Contact`.
- Subtle hover effect (underline, outline, or color change) — reuse hero hover animation if applicable.
- Optional dark/light toggle using existing theme classes.

**Mobile:**  
Collapsible menu icon (hamburger or minimal dot-grid), slides down from top or expands as overlay.

---

### 2. Hero Section (Existing)
✅ Already implemented — maintain current:
- Typography
- Hover-outline animation
- Background and contrast balance

Add optional:
- Short tagline line below (same tone):  
  > “Design. Develop. Deliver — with intent.”

- Scroll cue at bottom of viewport.

---

### 3. Products Section

#### Layout
- 2x2 responsive grid.
- Each product card inherits hero theme:
  - Border style (outline or glow)  
  - Hover accent or color shift
  - Matching typography scale

#### Items
1. **Web Development**
   > Bespoke websites and web apps with focus on performance and precision.
2. **Mobile App Development**
   > Intuitive cross-platform experiences built with native quality.
3. **E-Commerce Solutions**
   > Scalable online stores designed to convert and retain customers.
4. **Custom Software**
   > Tailored digital tools that solve complex business needs.

Add “View Projects” button aligned center — reuse hero button style and motion.

---

### 4. Process Section
Visual 3–4 step timeline using subtle fade or slide-in animations.  
Each step uses existing accent colors or hover style for consistency.

**Suggested Steps:**
1. **Discovery** – Understand goals and requirements.  
2. **Design** – Create interfaces with clarity and intent.  
3. **Development** – Build with clean, modular code.  
4. **Launch & Support** – Deliver, test, evolve.

Keep typography hierarchy consistent with hero (same font family and weights).

---

### 5. Portfolio / Case Studies
- Grid or carousel of project tiles.
- Each tile inherits same shadow, outline, or color accent from hero’s theme.
- Hover → expand, elevate, or colorize (match hero interaction feel).

Include:
- Thumbnail (image or looping video)
- Project title
- Tech stack / brief description on hover or modal

---

### 6. About Section
Simple section with text and small team visuals (optional).

> “Savvy Minimal is a collective of developers and designers who believe in purposeful simplicity.”

Keep grayscale / monotone portraits that shift to accent color on hover.  
Typography follows hero hierarchy.

---

### 7. Contact / Footer
Minimal form with clean borders or accent glow on input focus (match hero outline glow).

**Contact form fields:**
- Name  
- Email  
- Message  
- Submit button (reuse hero button animation)

**Footer:**
- Social links (GitHub, LinkedIn, Dribbble)
- Compact copyright
- Optional quote:
  > “Precision is the ultimate sophistication.”

---

## 🎨 Theme & Style System

> 🪄 **Directive:** Reuse all colors, shadows, and text styles already defined in the hero section.  
> Grep existing CSS, Tailwind tokens, or variables (e.g. `--primary`, `--accent`, `text-outline`, etc.).  
> Do **not** introduce new hues or gradients unless necessary for contrast or accessibility.

### Typography
- Use hero font stack (primary + secondary)
- Maintain consistent letter spacing and caps
- Limit to 3–4 weights max (Light, Regular, Medium, SemiBold)

### Animations
- Use existing hover + outline animation system
- Smooth scroll-based fades or slides (Framer Motion or GSAP)
- Micro-interactions: hover scale, opacity shifts, glowing outlines

---

## 🧩 Optional Add-ons
- **Technologies Grid:** Logos for React, Next.js, Flutter, Node, etc.
- **Client Logos:** Monochrome logos that colorize on hover
- **Testimonials:** Minimal quote carousel
- **CTA Block:**  
  > “Ready to build something meaningful? Let’s talk.”

---

## 🧱 Implementation Structure

