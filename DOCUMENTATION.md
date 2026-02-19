# NAAKIMS Worldwide — Official Website

## Project Documentation

---

### Overview

The **NAAKIMS Worldwide Official Website** is a premium, modern landing page built for the **National Association of Akwa Ibom State Medical and Dental Surgery Students Worldwide**. The site serves as the digital face of the organization — showcasing its mission, leadership, programs, events, testimonials, and community.

> **Current Status:** The landing page is fully implemented and live. All other sections (About, Chapters, Events, Blog, Gallery, etc.) are in development and have not yet been rolled out or deployed.

---

### Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | GSAP 3.14 + ScrollTrigger + CustomEase |
| **Fonts** | Poppins (headings), Inter (body) |
| **Image Optimization** | Next.js `<Image>` with `quality={100}` |
| **Utilities** | clsx, tailwind-merge, lucide-react |
| **Deployment** | GitHub → Vercel |

---

### Brand Identity

| Element | Value |
|---|---|
| **Primary Green** | `#00D084` |
| **Dark Green** | `#008751` |
| **Accent Green** | `#00B872` |
| **Email** | info@naakims.com |
| **Website** | naakims.com |

---

### Landing Page Architecture

The landing page is composed of **9 sections**, rendered in order from `src/app/page.tsx`:

```
Preloader → Header → Hero → About → Programs → Leadership → Blog → Testimonials → CTA + Footer
```

---

## Section Breakdown

---

### 1. Preloader

**File:** `src/components/shared/Preloader.tsx`

A premium split-curtain loading screen displayed on initial page load. The letters **N-A-A-K-I-M-S** animate in with a spring-physics stagger effect. A progress bar fills as status text cycles through: *Initializing → Loading resources → Preparing experience → Welcome*. The exit animation splits the screen — top curtain slides up, bottom curtain slides down — to reveal the page content underneath.

> 📸 *[Insert screenshot of Preloader here]*

---

### 2. Header / Navigation

**File:** `src/components/shared/Header.tsx`

A scroll-aware navigation bar with the NAAKIMS logo and 10 navigation links: Home, About, Chapters, Executives, Events, Blog, Gallery, Achievements, Sponsors, and Contact. The header starts transparent over the hero and gains a solid background after scrolling past 85% of the viewport height. Features animated decorative shapes on hover and a fully functional mobile hamburger menu.

> **Note:** All navigation links currently point to their respective routes but those pages are not yet deployed; only the landing page `/` is live.

> 📸 *[Insert screenshot of Header here]*

---

### 3. Hero Slideshow

**File:** `src/components/landing/HeroSlideshow.tsx`

A full-screen cinematic hero carousel with 4 slides, auto-advancing every 6 seconds. Each slide features a local high-resolution image with overlay gradients and word-by-word headline animation (3D rotateX + blur stagger via GSAP).

| Slide | Heading | Image |
|---|---|---|
| 1 | Uniting Akwa Ibom / Students Across Continents | `hero1.jpg` |
| 2 | Advancing Medical / Excellence Together | `hero2.jpg` |
| 3 | Tomorrow's Healthcare Leaders / Start Right Here | `hero3.jpg` |
| 4 | United by Origin, / Driven by Excellence | `hero4.jpg` |

The slide transition uses a multi-phase system: `visible → exiting → hidden → entering`.

> 📸 *[Insert screenshot of Hero Slideshow here]*

---

### 4. About Preview + Core Values

**File:** `src/components/landing/AboutPreview.tsx`

This section contains three parts:

#### a) Stats Strip

Animated number counters triggered on scroll, powered by GSAP + IntersectionObserver:

| Stat | Label |
|---|---|
| 15+ | Years of Legacy |
| 20+ | Active Chapters |
| 5,000+ | Members Strong |
| 100+ | Events Hosted |

#### b) About Text

A scroll-zoom editorial image (`aboutus.jpg`) paired with descriptive text about NAAKIMS's mission, vision, and purpose.

#### c) Core Values Pillars

Three interactive pillar cards (desktop: expandable on hover, mobile: accordion tap):

| # | Title | Image | Description |
|---|---|---|---|
| 01 | Academic Excellence | `academicexcellence.jpg` | Mentorship programs, symposiums, cross-chapter knowledge exchange |
| 02 | Global Unity | `globalunity.jpg` | Connecting Akwa Ibom medical students across Nigeria and beyond |
| 03 | Community Impact | `communityimpact.jpg` | Healthcare outreach, community service, public health advocacy |

On desktop, hovering a pillar card expands it with a subtle green (`#008751`) tint overlay. On mobile, tapping a card expands it vertically.

> 📸 *[Insert screenshot of About / Stats section here]*

> 📸 *[Insert screenshot of Core Values Pillars here]*

---

### 5. The NAAKIMS Experience (Programs & Initiatives)

**File:** `src/components/landing/ProgramsInitiatives.tsx`

An interactive split-screen showcase of NAAKIMS's three flagship programs. Users click tabs to switch between programs with smooth GSAP crossfade transitions.

| # | Tag | Title | Stat | Image |
|---|---|---|---|---|
| 01 | Social | Dinner & Awards Night | 500+ Annual Guests | `dinnernight.jpg` |
| 02 | Outreach | Community Health Missions | 50+ Health Campaigns | `healthmissions.jpg` |
| 03 | Welfare | Student Bursary Programme | Coming Soon | `bursary.jpg` |

**Desktop:** Split layout — image panel (left) + content/tabs (right).
**Mobile:** Stacked expandable accordion cards with navigation dots.

> 📸 *[Insert screenshot of NAAKIMS Experience section here]*

---

### 6. Leadership Showcase

**File:** `src/components/landing/LeadershipShowcase.tsx`

Showcases the NAAKIMS Worldwide executive team with a cinematic president hero card and an executive grid.

**President:**
- **Name:** Ndifreke Okpongete
- **Role:** Worldwide President
- **Chapter:** University of Uyo
- **Quote:** *"Our mission is simple — to build a world-class network of medical and dental surgery professionals rooted in excellence, service, and the shared identity of Akwa Ibom."*

**Executives:**

| Name | Role | Chapter |
|---|---|---|
| Covenant Etim | VP External | University of Uyo |
| Imaobong Clement | General Secretary | University of Uyo |
| Assam, Kingsley | Financial Secretary | University of Uyo |
| Emediong Asuquo | Treasurer | University of Uyo |

Executive cards feature GSAP hover animations: image zoom (1.07×), scaleY wipe reveal, shimmer overlay, and tag fade-in.

> 📸 *[Insert screenshot of Leadership section here]*

---

### 7. Latest News / Blog

**File:** `src/components/landing/LatestNews.tsx`

A dark editorial magazine-style blog section with a cinematic featured hero article and a 3-column card grid.

| # | Title | Category | Date | Image |
|---|---|---|---|---|
| ⭐ | NAAKIMS Worldwide Dinner Night: An Unforgettable Evening Awaits | Upcoming Event | Coming Soon | `blog.jpg` |
| 1 | NAAKIMS UniUyo Chapter Welcomes New Administration | Chapter Updates | Feb 16, 2026 | `newadministration.jpg` |
| 2 | NAAKIMS Presents Voluntary Blood Donation at St. Luke's Hospital, Anua | Health Advocacy | Feb 19, 2026 | `bloodonation.jpg` |
| 3 | NAAKIMS UCC Chapter Swearing-In Ceremony Marks New Beginning | Chapter Updates | Feb 12, 2026 | `swearingin.jpg` |

Features a clip-path wipe entrance animation via GSAP ScrollTrigger.

> 📸 *[Insert screenshot of Blog section here]*

---

### 8. Testimonials Showcase

**File:** `src/components/landing/TestimonialsShowcase.tsx`

A premium testimonial carousel with touch/swipe support and a scrolling chapter-name marquee across the bottom.

| Name | Role | Chapter |
|---|---|---|
| Aniefiok Idongesit | Medical Student | University of Uyo |
| Iniobong Essien | Medical Student | University of Calabar |
| Dr. Emem Akpan | Patron, Public Health Specialist | University of Lagos |
| Imaobong Clement | General Secretary, NAAKIMS WW | University of Uyo |

**Chapter Marquee:** University of Uyo · University of Calabar · University of Lagos · University of Ibadan · OAU Ile-Ife · Ahmadu Bello University · University of Nigeria · UK Chapter · University of Benin · LAUTECH · University of Port Harcourt · UNIJOS

> 📸 *[Insert screenshot of Testimonials section here]*

---

### 9. CTA + Footer

**File:** `src/components/landing/JoinCtaFooter.tsx`

#### a) Cinematic CTA

A full-bleed call-to-action section with parallax background, clip-path reveal animation, and staggered content entrance. Stat badges animate in with elastic spring physics.

| Stat | Label |
|---|---|
| 5,000+ | Members |
| 20+ | Chapters |
| 15+ | Years |

#### b) Premium Footer

Dark gradient footer with:
- NAAKIMS brand logo and description
- Contact info (email, address)
- Three link columns: About, Explore, Resources
- Social media icons: Facebook, Twitter/X, Instagram, LinkedIn, WhatsApp, YouTube
- Copyright notice
- Developer credit

> **Note:** All footer links and social media icons are non-functional placeholders. They will be connected once individual pages and official social accounts are finalized.

> 📸 *[Insert screenshot of CTA section here]*

> 📸 *[Insert screenshot of Footer here]*

---

## Project Structure

```
naakims-official-website/
├── public/
│   ├── images/                    # All local images
│   │   ├── hero1-4.jpg           # Hero slideshow backgrounds
│   │   ├── aboutus.jpg           # About section image
│   │   ├── academicexcellence.jpg # Core Values pillar images
│   │   ├── globalunity.jpg
│   │   ├── communityimpact.jpg
│   │   ├── dinnernight.jpg       # Programs section
│   │   ├── healthmissions.jpg
│   │   ├── bursary.jpg
│   │   ├── naakimswwpresident.jpg # Leadership
│   │   ├── vicepresidentexternal.jpg
│   │   ├── generalsecretary.jpg
│   │   ├── financialsecretary.jpg
│   │   ├── treasurer.jpg
│   │   ├── testimonials1.jpg     # Testimonials
│   │   ├── testimonial2.jpg
│   │   ├── testimonials3.jpg
│   │   ├── blog.jpg              # Blog featured image
│   │   ├── newadministration.jpg
│   │   ├── bloodonation.jpg
│   │   └── swearingin.jpg
│   └── logo.png                   # NAAKIMS logo
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (fonts, metadata, preloader)
│   │   ├── page.tsx               # Landing page (assembles all sections)
│   │   └── globals.css            # Global styles
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Header.tsx         # Navigation header
│   │   │   └── Preloader.tsx      # Loading screen
│   │   └── landing/
│   │       ├── HeroSlideshow.tsx
│   │       ├── AboutPreview.tsx
│   │       ├── ProgramsInitiatives.tsx
│   │       ├── LeadershipShowcase.tsx
│   │       ├── LatestNews.tsx
│   │       ├── TestimonialsShowcase.tsx
│   │       └── JoinCtaFooter.tsx
│   └── lib/
│       ├── constants.ts           # Brand, links, social, contacts
│       └── utils.ts               # cn() utility (clsx + tailwind-merge)
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.mjs
```

---

## Animation System

All animations are powered by **GSAP 3.14** with the **ScrollTrigger** plugin. Key animation patterns used throughout:

| Pattern | Used In | Description |
|---|---|---|
| **Word stagger** | Hero | Each word animates in with rotateX, blur, and opacity |
| **Clip-path reveal** | Blog, CTA | `inset()` wipe from center to full |
| **CountUp** | About stats | Numbers count up from 0 on scroll |
| **Crossfade** | Hero, Programs | Opacity transitions between content |
| **Parallax** | CTA | Background image moves at half-speed on scroll |
| **Spring entrance** | Preloader, Stats | Elements pop in with elastic easing |
| **Stagger grid** | Leadership, Footer | Cards/columns reveal in sequence |
| **Split curtain** | Preloader | Screen splits vertically to reveal content |

---

## Responsive Design

The site is fully responsive with three primary breakpoints:

| Breakpoint | Width | Layout |
|---|---|---|
| **Mobile** | < 640px | Single column, accordion menus, stacked cards |
| **Tablet** | 640px – 1024px | 2-column grids, hybrid layouts |
| **Desktop** | > 1024px | Full multi-column layouts, hover interactions |

Core Values pillars use **tap/accordion** on mobile and **hover-expand** on desktop. The Programs section switches between **stacked accordion** (mobile) and **split-screen** (desktop).

The site renders correctly in Chrome's **"Request Desktop Site"** mode on mobile, showing the full desktop layout including hover-enabled Core Values interactions.

---

## Image Optimization

All images use Next.js `<Image>` component with `quality={100}` to ensure maximum sharpness. Images are served locally from `/public/images/` — no external CDN dependencies.

---

## Deployment

- **Repository:** [github.com/L1a6/naaakims-official-website](https://github.com/L1a6/naaakims-official-website)
- **Branch:** `main`
- **Platform:** Vercel (auto-deploy on push)
- **Domain:** naakims.com

---

## What's Next (Roadmap)

The following pages/sections are planned but **not yet implemented or deployed**:

- [ ] About page
- [ ] Chapters directory + individual chapter pages
- [ ] Executives page (full leadership roster)
- [ ] Events listing + individual event pages
- [ ] Blog listing + individual post pages
- [ ] Gallery / Media page
- [ ] Achievements page
- [ ] Sponsors & Patrons page
- [ ] Contact page with form
- [ ] Student portal / membership system

---

*Last updated: February 2026*
