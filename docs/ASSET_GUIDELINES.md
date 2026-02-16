# NAAKIMS Asset Guidelines

This document provides specifications and guidelines for all images and media assets used on the NAAKIMS Worldwide website.

## Image Specifications

### Hero Slideshow Images

**Purpose:** Background images for homepage hero section

**Specifications:**
- **Dimensions:** 1920px × 1080px
- **Aspect Ratio:** 16:9
- **Format:** WebP (preferred), JPEG fallback
- **Max File Size:** 2 MB per image
- **Quantity:** 3-4 images

**Content Requirements:**
- High-quality, professional photography
- Showcase NAAKIMS students in authentic settings:
  - Medical students studying together
  - Clinical/hospital environments
  - NAAKIMS events and gatherings
  - Community outreach or health advocacy activities
- Good lighting and sharp focus
- Suitable for green overlay (ensure important elements remain visible)
- Diverse representation of students and activities

**File Naming Convention:**
```
hero-slide-1.webp
hero-slide-2.webp
hero-slide-3.webp
hero-slide-4.webp
```

**Location:** `/public/images/hero/`

---

### Featured Images (Blog Posts, Events)

**Purpose:** Main image for blog posts and event cards

**Specifications:**
- **Dimensions:** 1200px × 630px
- **Aspect Ratio:** 1.91:1 (Open Graph standard)
- **Format:** WebP (preferred), JPEG fallback
- **Max File Size:** 1 MB
- **Quality:** High-resolution, clear subject

**Content Requirements:**
- Relevant to article/event content
- Professional and engaging
- Text overlay friendly (if needed)
- Properly licensed or original NAAKIMS content

**File Naming Convention:**
```
[slug]-featured.webp
example: medical-education-summit-2026-featured.webp
```

**Location:** `/public/images/featured/`

---

### Profile Photos (Executives, Chapter Leaders)

**Purpose:** Professional headshots for executive profiles

**Specifications:**
- **Dimensions:** 400px × 400px
- **Aspect Ratio:** 1:1 (Square)
- **Format:** WebP (preferred), JPEG fallback
- **Max File Size:** 500 KB
- **Background:** Neutral, clean, professional

**Content Requirements:**
- Professional headshot
- Clear face visibility
- Appropriate attire (professional/medical context)
- Good lighting
- Neutral or NAAKIMS-branded background preferred
- Consistent style across all executive photos

**File Naming Convention:**
```
[name-slug]-profile.webp
example: john-doe-profile.webp
```

**Location:** `/public/images/profiles/`

---

### Thumbnail Images

**Purpose:** Small preview images for cards and lists

**Specifications:**
- **Dimensions:** 400px × 300px
- **Aspect Ratio:** 4:3
- **Format:** WebP (preferred), JPEG fallback
- **Max File Size:** 300 KB

**Content Requirements:**
- Clear subject even at small size
- Cropped appropriately for 4:3 ratio
- Optimized for fast loading

**File Naming Convention:**
```
[slug]-thumb.webp
```

**Location:** `/public/images/thumbnails/`

---

### Gallery Photos

**Purpose:** High-quality photos for event galleries

**Specifications:**
- **Dimensions:** 1920px × 1280px (max)
- **Aspect Ratio:** 3:2 (preferred, but flexible)
- **Format:** WebP (preferred), JPEG fallback
- **Max File Size:** 3 MB
- **Quality:** High-resolution for viewing/downloading

**Content Requirements:**
- Event documentation
- Clear, well-composed shots
- Proper lighting
- Release forms for identifiable individuals (as needed)
- Diverse representation of event activities

**File Naming Convention:**
```
[event-slug]-[description]-[number].webp
example: annual-conference-2026-opening-ceremony-001.webp
```

**Location:** `/public/images/gallery/[event-slug]/`

---

### Logos

#### NAAKIMS Main Logo

**Specifications:**
- **Dimensions:** 300px × 300px (or scalable SVG)
- **Aspect Ratio:** 1:1 (or original ratio if not square)
- **Format:** SVG (preferred), PNG with transparency
- **Max File Size:** 200 KB

**Variants Needed:**
- Full color (NAAKIMS Green)
- White version (for dark backgrounds)
- Monochrome/simplified version

**File Names:**
```
naakims-logo.svg
naakims-logo-white.svg
naakims-logo-mono.svg
```

**Location:** `/public/images/logo/`

#### Chapter Logos

**Specifications:**
- **Dimensions:** 200px × 200px (max)
- **Format:** PNG with transparency or SVG
- **Max File Size:** 200 KB

**File Naming Convention:**
```
[chapter-slug]-logo.png
example: university-of-uyo-logo.png
```

**Location:** `/public/images/chapters/logos/`

#### Sponsor Logos

**Specifications:**
- **Dimensions:** 400px × 400px (max, maintain aspect ratio)
- **Format:** PNG with transparency or SVG
- **Max File Size:** 200 KB
- **Background:** Transparent

**File Naming Convention:**
```
[sponsor-slug]-logo.png
```

**Location:** `/public/images/sponsors/`

---

## Image Optimization Guidelines

1. **Always compress images** before uploading:
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Target 70-85% quality for JPEGs/WebP

2. **Use WebP format** as primary with JPEG/PNG fallback

3. **Provide alt text** for all images (accessibility requirement)

4. **Use descriptive file names** (improves SEO)

5. **Lazy loading** will be implemented for images below the fold

6. **Responsive images** will be served using Next.js Image component

---

## Video Guidelines

**Purpose:** Event highlights, testimonials, promotional content

**Specifications:**
- **Format:** MP4 (H.264 codec)
- **Resolution:** 1920×1080 (1080p) or 1280×720 (720p)
- **Max File Size:** 50 MB (consider hosting on YouTube/Vimeo for larger files)
- **Frame Rate:** 30fps or 60fps
- **Aspect Ratio:** 16:9

**File Naming Convention:**
```
[event-slug]-video.mp4
```

**Location:** `/public/videos/` (or external hosting link)

---

## Icon Assets

**Purpose:** UI icons, social media icons, feature icons

**Specifications:**
- **Format:** SVG (preferred)
- **Size:** 24×24px baseline (scalable)
- **Style:** Consistent with site design (outlined or filled)

**Icon Library:** 
- Lucide Icons (recommended for consistency)
- Custom icons should match Lucide style

**Location:** `/public/icons/` (if custom icons needed)

---

## Social Media Assets

### Open Graph Images (Social Sharing)

**Specifications:**
- **Dimensions:** 1200px × 630px
- **Aspect Ratio:** 1.91:1
- **Format:** JPEG or PNG
- **Max File Size:** 1 MB

**Content:**
- NAAKIMS logo
- Page title or compelling text
- Relevant imagery
- NAAKIMS Green branding

**File Name:**
```
og-image-default.jpg (site-wide default)
og-image-[page].jpg (page-specific)
```

**Location:** `/public/images/og/`

---

## Content Approval Process

### Before Uploading Images:

1. ✅ Verify image meets specifications above
2. ✅ Ensure proper image rights/permissions
3. ✅ Compress and optimize file size
4. ✅ Use correct file naming convention
5. ✅ Prepare alt text description
6. ✅ Get approval from chapter/admin (if applicable)

---

## Image Rights & Permissions

- **Original NAAKIMS photos:** Free to use (created by/for NAAKIMS)
- **Stock photos:** Ensure proper license (Unsplash, Pexels, etc.)
- **Member photos:** Obtain consent for public display
- **Event photos:** Group consent or individual consent as needed
- **Sponsor logos:** Verify permission to display

---

## Tools & Resources

### Recommended Image Editing Tools:
- **Canva** (design graphics, resize images)
- **Photopea** (free Photoshop alternative)
- **GIMP** (free, open-source editor)
- **Adobe Photoshop** (professional)

### Image Optimization Tools:
- **TinyPNG** (tinypng.com)
- **Squoosh** (squoosh.app)
- **ImageOptim** (Mac)

### Stock Photo Resources:
- **Unsplash** (unsplash.com)
- **Pexels** (pexels.com)
- **Pixabay** (pixabay.com)

---

## Questions?

Contact: Larry David  
Email: larrydavid7730@gmail.com  
WhatsApp: +234 913 119 3359

---

**Last Updated:** February 15, 2026  
**Version:** 1.0
