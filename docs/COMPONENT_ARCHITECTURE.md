# NAAKIMS Website - Component Architecture

This document outlines the component structure and organization for the NAAKIMS Worldwide website.

## Folder Structure

```
src/
├── app/                          # Next.js 14 app directory (pages and routes)
│   ├── about/
│   │   └── page.tsx             # About NAAKIMS page
│   ├── achievements/
│   │   └── page.tsx             # Achievements & Milestones page
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx         # Individual blog post
│   │   └── page.tsx             # Blog listing page
│   ├── chapters/
│   │   ├── [slug]/
│   │   │   └── page.tsx         # Individual chapter page
│   │   └── page.tsx             # Chapters hub page
│   ├── contact/
│   │   └── page.tsx             # Contact page
│   ├── events/
│   │   ├── [slug]/
│   │   │   └── page.tsx         # Individual event page
│   │   └── page.tsx             # Events listing page
│   ├── executives/
│   │   └── page.tsx             # Executives page
│   ├── gallery/
│   │   └── page.tsx             # Photo gallery page
│   ├── sponsors/
│   │   └── page.tsx             # Sponsors & Patrons page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout (Header + Footer wrapper)
│   └── page.tsx                 # Homepage (landing page)
│
├── components/
│   ├── landing/                 # Homepage-specific components
│   │   ├── AboutPreview.tsx
│   │   ├── ChaptersOverview.tsx
│   │   ├── ExecutivesShowcase.tsx
│   │   ├── FeaturedEvents.tsx
│   │   ├── HeroSlideshow.tsx
│   │   ├── LatestNews.tsx
│   │   ├── Newsletter.tsx
│   │   ├── SponsorsPatrons.tsx
│   │   └── Testimonials.tsx
│   │
│   └── shared/                  # Reusable components used across site
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       ├── Loader.tsx
│       ├── Modal.tsx
│       ├── PageHeader.tsx
│       └── Section.tsx
│
├── lib/                         # Utilities and helpers
│   ├── constants.ts             # Application constants
│   └── utils.ts                 # Utility functions
│
└── types/                       # TypeScript type definitions
    └── index.ts                 # All type definitions
```

---

## Component Patterns

### 1. Landing Page Components (`/components/landing/`)

**Purpose:** Components specific to the homepage

**Characteristics:**
- Designed for first-time visitors
- Highlight key information
- Call-to-action focused
- Optimized for conversion (newsletter signups, engagement)

**Components:**

#### HeroSlideshow
- Full-viewport height
- Auto-rotating background images
- Dynamic text overlays
- NAAKIMS Green overlay
- Manual navigation (dots/arrows)

#### AboutPreview
- Brief overview of NAAKIMS (2-3 sentences)
- "Learn More" CTA to full About page

#### FeaturedEvents
- 3-4 event cards
- Upcoming or recent major events
- Links to event detail pages

#### LatestNews
- 3-4 most recent blog posts
- Image, title, excerpt, date
- Links to full articles

#### ChaptersOverview
- Interactive map or grid of chapters
- Quick links to chapter pages

#### ExecutivesShowcase
- Current executive board
- Profile cards with photos
- Links to full Executives page

#### SponsorsPatrons
- Key sponsors/patrons display
- Logos and names
- Tier-based layout

#### Newsletter
- Email subscription form
- CTA for staying connected
- NAAKIMS Green background

#### Testimonials
- Member quotes and success stories
- Carousel or grid layout
- Photos and names

---

### 2. Shared Components (`/components/shared/`)

**Purpose:** Reusable components used throughout the site

**Characteristics:**
- Consistent styling
- Prop-based customization
- Type-safe with TypeScript
- Accessible (WCAG 2.1 AA)

**Components:**

#### Header
- Site navigation
- NAAKIMS logo
- Responsive (hamburger menu on mobile)
- Sticky on scroll
- Transparent → solid green on scroll (homepage only)

#### Footer
- Site links (multi-column)
- Contact info
- Social media links
- Newsletter signup (optional)
- Copyright and developer credit

#### Button
- Multiple variants (primary, secondary, outline, ghost)
- Multiple sizes (sm, md, lg)
- Loading state
- Disabled state
- Icon support

#### Card
- Image + content blocks
- Used for events, blog posts, chapters, profiles
- Hover effects
- Optional link wrapper

#### Loader
- Loading spinner/indicator
- Multiple variants (spinner, dots, pulse, skeleton)
- Multiple sizes and colors

#### Modal
- Dialog/overlay for interactions
- Close on ESC or outside click
- Focus trap
- Smooth animations

#### PageHeader
- Consistent header for internal pages
- Page title, subtitle, breadcrumbs
- Background image option

#### Section
- Content wrapper with consistent spacing
- Max-width constraint
- Background variants (white, gray, green)

---

## Component Guidelines

### TypeScript Requirements

All components must:
- Be written in TypeScript
- Export proper interface/type definitions for props
- Use type inference where possible
- Avoid `any` type

Example:
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  ...props 
}: ButtonProps) {
  // Implementation
}
```

---

### Styling Approach

- **Tailwind CSS** for all styling
- Use `className` prop for customization
- Utilize `cn()` utility for class merging
- Follow responsive-first design
- Use NAAKIMS brand colors from constants

Example:
```typescript
import { cn } from '@/lib/utils';
import { COLORS } from '@/lib/constants';

export default function Card({ className, ...props }: CardProps) {
  return (
    <div className={cn(
      "rounded-lg shadow-md bg-white p-6",
      "hover:shadow-lg transition-shadow",
      className
    )}>
      {/* Content */}
    </div>
  );
}
```

---

### Accessibility Standards

All components must meet WCAG 2.1 AA standards:

- ✅ Keyboard navigation support
- ✅ Proper ARIA labels and roles
- ✅ Focus indicators visible
- ✅ Color contrast ratios (min 4.5:1)
- ✅ Alt text for all images
- ✅ Semantic HTML elements
- ✅ Screen reader compatible

---

### Performance Optimization

- Use Next.js `Image` component for all images
- Implement lazy loading for below-fold content
- Code splitting with dynamic imports
- Memoize expensive computations with `useMemo`
- Optimize re-renders with `React.memo`

---

### Responsive Design

Follow mobile-first approach with breakpoints:

```typescript
// Tailwind breakpoints
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1440px  // Large desktop
```

All components should be fully responsive across these breakpoints.

---

## State Management

### Client-Side State
- **useState** for local component state
- **useReducer** for complex state logic
- **React Context** for app-wide state (if needed)

### Server-Side State
- **Server Components** by default (Next.js 14)
- **Client Components** only when needed (interactivity, hooks)
- Mark with `'use client'` directive

---

## Data Fetching Patterns

### Server Components (Preferred)
```typescript
// app/blog/page.tsx
export default async function BlogPage() {
  const posts = await fetchBlogPosts(); // Server-side fetch
  
  return (
    <div>
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
```

### Client Components (When Needed)
```typescript
'use client';

import useSWR from 'swr';

export default function DynamicComponent() {
  const { data, error } = useSWR('/api/data', fetcher);
  
  if (error) return <ErrorState />;
  if (!data) return <Loader />;
  
  return <div>{/* Render data */}</div>;
}
```

---

## Testing Strategy

### Unit Tests
- Test individual component logic
- Use Jest + React Testing Library
- Focus on user interactions

### Integration Tests
- Test component combinations
- Verify data flow
- Check API integrations

### E2E Tests
- Test critical user flows
- Use Playwright or Cypress
- Automated in CI/CD pipeline

---

## Documentation Requirements

Each component file should include:

1. **Purpose comment** at top of file
2. **Features list** explaining capabilities
3. **Props interface** with JSDoc comments
4. **Usage examples** (if complex)

Example:
```typescript
/**
 * Button Component
 * 
 * Purpose: Reusable button with multiple variants
 * 
 * Features:
 * - Primary, secondary, outline variants
 * - Small, medium, large sizes
 * - Loading and disabled states
 * - Icon support
 * 
 * @example
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click Me
 * </Button>
 */

interface ButtonProps {
  /** Button text or content */
  children: React.ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  // ... more props
}
```

---

## Questions?

Contact: Larry David  
Email: larrydavid7730@gmail.com  
WhatsApp: +234 913 119 3359

---

**Last Updated:** February 15, 2026  
**Version:** 1.0
