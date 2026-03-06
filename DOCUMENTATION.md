# NAAKIMS Worldwide — Official Website

## Landing Page Documentation

---

### Overview

The **NAAKIMS Worldwide Official Website** landing page is complete and live at **naakims.com**. Built as a premium, modern digital presence for the **National Association of Akwa Ibom State Medical and Dental Surgery Students Worldwide**, it showcases the organization's mission, leadership, programs, events, testimonials, and community.

> **Status:** The landing page is fully implemented, deployed, and live. All other pages (About, Chapters, Events, Blog, Gallery, etc.) are planned for future rollout.

---

### Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | GSAP 3.14 |
| **Fonts** | Poppins (headings), Inter (body) |
| **Deployment** | GitHub → Vercel (auto-deploy) |

---

### Brand Colors

| Element | Value |
|---|---|
| **Primary Green** | `#00D084` |
| **Dark Green** | `#008751` |
| **Accent Green** | `#00B872` |

---

## Landing Page Sections

The page flows through **9 sections** in this order:

```
Preloader → Header → Hero → About → Programs → Leadership → Blog → Testimonials → CTA + Footer
```

---

### 0. Preloader

The first thing every visitor sees. A full-screen loading screen with the **NAAKIMS** letters animating in one by one with a spring-bounce effect, a progress bar, and cycling status text (*Initializing → Loading resources → Preparing experience → Welcome*). Once complete, the screen splits open like a curtain to reveal the site.

> 📸 *[Insert screenshot of Preloader here]*

---

### 1. Header / Navigation

A navigation bar with the NAAKIMS logo and 10 links: Home, About, Chapters, Executives, Events, Blog, Gallery, Achievements, Sponsors, and Contact. Starts transparent over the hero and becomes solid on scroll. Includes a mobile hamburger menu.

> **Note:** All navigation links point to their routes, but only the landing page is live. Other pages will go live as they are built.

> 📸 *[Insert screenshot of Header — desktop view here]*

> 📸 *[Insert screenshot of Header — mobile menu open here]*

---

### 2. Hero Slideshow

A full-screen cinematic carousel with 4 slides, auto-advancing every 6 seconds. Each slide has a high-resolution background image with animated headlines.

| Slide | Heading |
|---|---|
| 1 | Uniting Akwa Ibom Students Across Continents |
| 2 | Advancing Medical Excellence Together |
| 3 | Tomorrow's Healthcare Leaders Start Right Here |
| 4 | United by Origin, Driven by Excellence |

> 📸 *[Insert screenshot of Hero Slideshow here]*

---

### 3. About Preview + Core Values

This section contains three parts:

#### a) Stats Strip

Animated counters that count up on scroll:

| Stat | Label |
|---|---|
| 15+ | Years of Legacy |
| 20+ | Active Chapters |
| 5,000+ | Members Strong |
| 100+ | Events Hosted |

#### b) About Text

An editorial image paired with descriptive text about NAAKIMS's mission, vision, and purpose.

#### c) Core Values Pillars

Three interactive pillar cards that expand on hover (desktop) or tap (mobile):

| # | Title | Description |
|---|---|---|
| 01 | Academic Excellence | Mentorship programs, symposiums, cross-chapter knowledge exchange |
| 02 | Global Unity | Connecting Akwa Ibom medical students across Nigeria and beyond |
| 03 | Community Impact | Healthcare outreach, community service, public health advocacy |

> 📸 *[Insert screenshot of About / Stats section here]*

> 📸 *[Insert screenshot of Core Values — default state (no hover) here]*

> 📸 *[Insert screenshot of Core Values — Academic Excellence hovered/expanded here]*

> 📸 *[Insert screenshot of Core Values — another pillar hovered/expanded here]*

---

### 4. The NAAKIMS Experience (Programs & Initiatives)

An interactive showcase of NAAKIMS's three flagship programs. Users click tabs to switch between programs with smooth crossfade transitions on the image panel.

---

#### Program 01 — Dinner & Awards Night

Our flagship social event. An elegant evening of celebration, networking, and recognition, bringing together members, alumni, and distinguished guests for a night of fine dining, awards, and cultural showcases.

- **Tag:** Social
- **Stat:** 500+ Annual Guests

> 📸 *[Insert screenshot — Dinner & Awards Night active here]*

---

#### Program 02 — Community Health Missions

Health education campaigns, awareness programs, and community engagement initiatives reaching thousands of communities across Akwa Ibom and beyond.

- **Tag:** Outreach
- **Stat:** 50+ Health Campaigns

> 📸 *[Insert screenshot — Community Health Missions active here]*

---

#### Program 03 — Student Bursary Programme

Supporting deserving medical and dental surgery students with financial aid to ease the burden of tuition and academic expenses.

- **Tag:** Welfare
- **Stat:** Coming Soon

> 📸 *[Insert screenshot — Student Bursary Programme active here]*

---

### 5. Leadership Showcase

Showcases the NAAKIMS Worldwide executive team with a cinematic president hero card and an executive grid.

**President:**
- **Name:** Ndifreke Okpongete
- **Role:** Worldwide President
- **Chapter:** University of Uyo
- **Quote:** *"Our mission is simple, to build a world-class network of medical and dental surgery professionals rooted in excellence, service, and the shared identity of Akwa Ibom."*

**Executives:**

| Name | Role | Chapter |
|---|---|---|
| Covenant Etim | VP External | University of Uyo |
| Imaobong Clement | General Secretary | University of Uyo |
| Assam, Kingsley | Financial Secretary | University of Uyo |
| Emediong Asuquo | Treasurer | University of Uyo |

> 📸 *[Insert screenshot of Leadership section here]*

---

### 6. Latest News / Blog

A magazine-style blog section with a cinematic featured article and a 3-column card grid.

| # | Title | Category | Date |
|---|---|---|---|
| Featured | NAAKIMS Worldwide Dinner Night: An Unforgettable Evening Awaits | Upcoming Event | Coming Soon |
| 1 | NAAKIMS UniUyo Chapter Welcomes New Administration | Chapter Updates | Feb 16, 2026 |
| 2 | NAAKIMS Presents Voluntary Blood Donation at St. Luke's Hospital, Anua | Health Advocacy | Feb 19, 2026 |
| 3 | NAAKIMS UCC Chapter Swearing-In Ceremony Marks New Beginning | Chapter Updates | Feb 12, 2026 |

> 📸 *[Insert screenshot of Blog section here]*

---

### 7. Testimonials Showcase

A testimonial carousel with touch/swipe support and a scrolling chapter-name marquee across the bottom.

| Name | Role | Chapter |
|---|---|---|
| Aniefiok Idongesit | Medical Student | University of Uyo |
| Iniobong Essien | Medical Student | University of Calabar |
| Dr. Emem Akpan | Patron, Public Health Specialist | University of Lagos |
| Imaobong Clement | General Secretary, NAAKIMS WW | University of Uyo |

**Chapter Marquee:** University of Uyo · University of Calabar · University of Lagos · University of Ibadan · OAU Ile-Ife · Ahmadu Bello University · University of Nigeria · UK Chapter · University of Benin · LAUTECH · University of Port Harcourt · UNIJOS

> 📸 *[Insert screenshot of Testimonials section here]*

---

### 8. CTA + Footer

#### a) Call-to-Action

A full-bleed section with parallax background and animated stat badges:

| Stat | Label |
|---|---|
| 5,000+ | Members |
| 20+ | Chapters |
| 15+ | Years |

#### b) Footer

Dark gradient footer with the NAAKIMS logo, contact info, navigation link columns, social media icons, and copyright notice.

> **Note:** All footer links and social media icons are placeholders. They will be connected once individual pages and official social accounts are finalized.

> 📸 *[Insert screenshot of CTA section here]*

> 📸 *[Insert screenshot of Footer here]*

---

## Responsive Design

The site is fully responsive across mobile, tablet, and desktop. It also renders correctly in Chrome's "Request Desktop Site" mode on mobile, showing the full desktop layout with hover interactions.

---

## Deployment

- **Live at:** naakims.com
- **Platform:** Vercel (auto-deploys when code is pushed)
- **Repository:** github.com/L1a6/naaakims-official-website

---

## What's Next (Roadmap)

The following pages are planned for future development:

- [ ] About page
- [ ] Chapters directory
- [ ] Executives page
- [ ] Events listing
- [ ] Blog listing
- [ ] Gallery / Media page
- [ ] Achievements page
- [ ] Sponsors & Patrons page
- [ ] Contact page
- [ ] Student portal / membership system

---

## Developer

**Larry David** — *I build, you grow, we win.*
[www.larrydavid.dev](https://www.larrydavid.dev)

---

*Last updated: 19th February, 2026*
