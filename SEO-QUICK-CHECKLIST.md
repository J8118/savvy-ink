# SEO Quick Checklist - Savvy Digital

## ✅ Immediate Actions (Do First)

### 1. Update Business Information
- [ ] **Phone Number**: Update `businessPhone` in `app/layout.tsx`
- [ ] **Full Address**: Update `businessAddress.streetAddress` with complete street address
- [ ] **Postal Code**: Update `businessAddress.postalCode`
- [ ] **GPS Coordinates**: Get from Google Maps and update `businessGeo` (latitude/longitude)
- [ ] **Business Hours**: Update `openingHours` in LocalBusiness schema

### 2. Environment Setup
- [ ] Create `.env.local` file
- [ ] Add `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` (replace with actual domain)

### 3. Google Search Console
- [ ] Create account at [search.google.com/search-console](https://search.google.com/search-console)
- [ ] Add property (your domain)
- [ ] Verify ownership (HTML tag method)
- [ ] Copy verification code to `app/layout.tsx` → `verification.google`
- [ ] Submit sitemap: `https://yourdomain.com/sitemap.xml`

### 4. Google Business Profile (CRITICAL for UAE)
- [ ] Claim/verify at [google.com/business](https://www.google.com/business)
- [ ] Use EXACT same NAP (Name, Address, Phone) as website
- [ ] Add business hours
- [ ] Add service categories
- [ ] Add photos
- [ ] Add service listings

### 5. Social Media Links
- [ ] Add Facebook URL to `sameAs` array in `app/layout.tsx`
- [ ] Add LinkedIn URL
- [ ] Add Instagram URL
- [ ] Add Twitter/X URL
- [ ] Update Twitter handle in metadata if different

### 6. Create Open Graph Image
- [ ] Create `og-image.jpg` (1200x630px)
- [ ] Place in `/public` folder
- [ ] Include logo and "Savvy - Software Development Dubai"

## 📋 Directory Listings (NAP Consistency)

Submit to these UAE directories with EXACT same formatting:

- [ ] [Yellow Pages UAE](https://www.yellowpages.ae)
- [ ] [Yello](https://www.yello.ae)
- [ ] [Yellowpages-UAE](https://yellowpages-uae.com)
- [ ] [Yellowpages.ae](https://yellowpages.ae)

**Format must be IDENTICAL:**
- Name: Savvy (or your exact business name)
- Address: [Same format everywhere]
- Phone: +971-4-XXXXXXX (same format)

## 🚀 Next Steps (After Basics)

### Content Creation
- [ ] Create service pages (`/services/web-development-dubai`, etc.)
- [ ] Create local landing pages (`/dubai`, `/abu-dhabi` if applicable)
- [ ] Add bilingual content (Arabic + English)
- [ ] Create blog/content section
- [ ] Add local case studies with UAE addresses

### Technical
- [ ] Set up Google Analytics 4
- [ ] Monitor Core Web Vitals
- [ ] Optimize images (use Next.js Image component)
- [ ] Test mobile responsiveness
- [ ] Update sitemap with new pages

### Monitoring
- [ ] Check Google Search Console weekly
- [ ] Monitor local rankings
- [ ] Review Core Web Vitals monthly
- [ ] Update content quarterly

## 📊 Verification Tools

Test your implementation:

1. **Structured Data**: [Google Rich Results Test](https://search.google.com/test/rich-results)
2. **Mobile-Friendly**: [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
3. **Page Speed**: [PageSpeed Insights](https://pagespeed.web.dev/)
4. **SEO Audit**: [Google Search Console](https://search.google.com/search-console)

## 🔗 Key Files Modified

- `app/layout.tsx` - Metadata, structured data, hreflang
- `app/sitemap.ts` - Dynamic sitemap generation
- `public/robots.txt` - Search engine directives
- `public/site.webmanifest` - PWA manifest
- `next.config.js` - Performance optimizations
- `components/StructuredData.tsx` - JSON-LD component

## 📝 Notes

- All TODO comments in code need to be addressed
- See `SEO-IMPLEMENTATION-GUIDE.md` for detailed instructions
- NAP consistency is CRITICAL for local SEO in UAE
- Google Business Profile is essential for "near me" searches

---

**Priority Order:**
1. Update business info → Set up Search Console → Claim GBP → Directory listings
2. Social media links → OG image → Content creation
3. Monitoring and optimization

