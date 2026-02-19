/**
 * Application Constants for NAAKIMS Website
 * 
 * Central location for all constant values used throughout the application.
 */

// ============================================================================
// BRAND CONSTANTS
// ============================================================================

export const BRAND = {
  NAME: 'NAAKIMS Worldwide',
  FULL_NAME: 'National Association of Akwa Ibom State Medical Students Worldwide',
  TAGLINE: 'Connecting Medical Students Across Continents',
  FOUNDED_YEAR: 2010, // Update with actual founding year
} as const;

// ============================================================================
// COLORS (NAAKIMS Brand Colors)
// ============================================================================

export const COLORS = {
  PRIMARY: '#00D084', // NAAKIMS Green (vibrant emerald green)
  PRIMARY_DARK: '#00B872', // Darker shade for hover states
  PRIMARY_LIGHT: '#33DCAA', // Lighter shade for backgrounds
  SECONDARY: '#FFFFFF', // Pure White
  ACCENT: '#008751', // Nigerian flag green
  
  // Neutral colors
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_300: '#D1D5DB',
  GRAY_500: '#6B7280',
  GRAY_700: '#374151',
  GRAY_900: '#111827',
  
  // Semantic colors
  SUCCESS: '#10B981',
  ERROR: '#EF4444',
  WARNING: '#F59E0B',
  INFO: '#3B82F6',
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const FONTS = {
  PRIMARY: 'Inter, system-ui, -apple-system, sans-serif',
  SECONDARY: 'Poppins, system-ui, -apple-system, sans-serif',
  ALTERNATIVE: 'Outfit, system-ui, -apple-system, sans-serif',
} as const;

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const BREAKPOINTS = {
  MOBILE: 640, // < 640px
  TABLET: 768, // 640px - 1024px
  DESKTOP: 1024, // > 1024px
  LARGE_DESKTOP: 1440, // > 1440px
} as const;

// ============================================================================
// HERO SLIDESHOW CONSTANTS
// ============================================================================

export const HERO_SLIDES = [
  {
    id: 1,
    text: 'Connecting Medical Students Across Continents',
    image: '/images/hero/slide-1.jpg', // To be added
  },
  {
    id: 2,
    text: "Building Tomorrow's Healthcare Leaders",
    image: '/images/hero/slide-2.jpg',
  },
  {
    id: 3,
    text: 'Preserving Our Legacy, Empowering Our Future',
    image: '/images/hero/slide-3.jpg',
  },
  {
    id: 4,
    text: 'United by Origin, Driven by Excellence',
    image: '/images/hero/slide-4.jpg',
  },
] as const;

export const HERO_CONFIG = {
  AUTO_ADVANCE_DELAY: 6000, // 6 seconds
  TRANSITION_DURATION: 1000, // 1 second
  OVERLAY_OPACITY: 0.2, // 20% green overlay
} as const;

// ============================================================================
// NAVIGATION MENU
// ============================================================================

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { 
    label: 'Chapters', 
    href: '/chapters',
    hasDropdown: true, // Will contain chapter links
  },
  { label: 'Executives', href: '/executives' },
  { label: 'Events', href: '/events' },
  { label: 'Blog', href: '/blog' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Contact', href: '/contact' },
] as const;

// ============================================================================
// SOCIAL MEDIA LINKS
// ============================================================================

export const SOCIAL_MEDIA = {
  FACEBOOK: 'https://facebook.com/naakims', // Update with actual links
  TWITTER: 'https://twitter.com/naakims',
  INSTAGRAM: 'https://instagram.com/naakims',
  LINKEDIN: 'https://linkedin.com/company/naakims',
  WHATSAPP: 'https://wa.me/2349131193359', // Update with NAAKIMS number
  YOUTUBE: 'https://youtube.com/@naakims',
} as const;

// ============================================================================
// CONTACT INFORMATION
// ============================================================================

export const CONTACT_INFO = {
  EMAIL: 'info@naakims.com', // Update with actual email
  PHONE: '+234 XXX XXX XXXX', // Update with actual phone
  ADDRESS: 'Akwa Ibom State, Nigeria', // Update with actual address
  OFFICE_HOURS: 'Monday - Friday, 9:00 AM - 5:00 PM',
} as const;

// ============================================================================
// KEY PATRONS (Featured Sponsors)
// ============================================================================

export const KEY_PATRONS = [
  {
    id: 1,
    name: 'His Excellency',
    title: 'Governor of Akwa Ibom State',
    tier: 'PLATINUM',
  },
  {
    id: 2,
    name: 'Honorable Commissioner',
    title: 'Commissioner of Health, Akwa Ibom State',
    tier: 'PLATINUM',
  },
  {
    id: 3,
    name: 'Dr. Israel Ben',
    title: 'Cordial President',
    tier: 'PLATINUM',
  },
] as const;

// ============================================================================
// PAGINATION DEFAULTS
// ============================================================================

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
  ITEMS_PER_PAGE_OPTIONS: [6, 12, 24, 48],
} as const;

// ============================================================================
// BLOG/NEWS CATEGORIES
// ============================================================================

export const BLOG_CATEGORIES = [
  { id: 1, name: 'Chapter Updates', slug: 'chapter-updates', color: COLORS.PRIMARY },
  { id: 2, name: 'Medical Education', slug: 'medical-education', color: COLORS.INFO },
  { id: 3, name: 'Health Advocacy', slug: 'health-advocacy', color: COLORS.SUCCESS },
  { id: 4, name: 'Event Recaps', slug: 'event-recaps', color: COLORS.WARNING },
  { id: 5, name: 'Member Spotlights', slug: 'member-spotlights', color: COLORS.ACCENT },
  { id: 6, name: 'Announcements', slug: 'announcements', color: COLORS.ERROR },
] as const;

// ============================================================================
// EVENT TYPES
// ============================================================================

export const EVENT_TYPES = [
  { value: 'ACADEMIC', label: 'Academic' },
  { value: 'SOCIAL', label: 'Social' },
  { value: 'OUTREACH', label: 'Outreach' },
  { value: 'MEETING', label: 'Meeting' },
  { value: 'CONFERENCE', label: 'Conference' },
  { value: 'WORKSHOP', label: 'Workshop' },
  { value: 'OTHER', label: 'Other' },
] as const;

// ============================================================================
// IMAGE SPECIFICATIONS
// ============================================================================

export const IMAGE_SPECS = {
  HERO_SLIDESHOW: {
    WIDTH: 1920,
    HEIGHT: 1080,
    ASPECT_RATIO: '16:9',
    MAX_SIZE_MB: 2,
  },
  FEATURED_IMAGE: {
    WIDTH: 1200,
    HEIGHT: 630,
    ASPECT_RATIO: '1.91:1', // Open Graph standard
    MAX_SIZE_MB: 1,
  },
  PROFILE_PHOTO: {
    WIDTH: 400,
    HEIGHT: 400,
    ASPECT_RATIO: '1:1',
    MAX_SIZE_MB: 0.5,
  },
  THUMBNAIL: {
    WIDTH: 400,
    HEIGHT: 300,
    ASPECT_RATIO: '4:3',
    MAX_SIZE_MB: 0.3,
  },
  GALLERY: {
    WIDTH: 1920,
    HEIGHT: 1280,
    ASPECT_RATIO: '3:2',
    MAX_SIZE_MB: 3,
  },
  LOGO: {
    WIDTH: 300,
    HEIGHT: 300,
    ASPECT_RATIO: '1:1',
    MAX_SIZE_MB: 0.2,
  },
} as const;

// ============================================================================
// SEO DEFAULTS
// ============================================================================

export const SEO_DEFAULTS = {
  TITLE: 'NAAKIMS Worldwide | National Association of Akwa Ibom State Medical Students',
  DESCRIPTION: 'Official website of NAAKIMS Worldwide - connecting medical students from Akwa Ibom State across continents. Preserving our legacy, empowering our future.',
  KEYWORDS: [
    'NAAKIMS',
    'Akwa Ibom medical students',
    'Nigerian medical students',
    'medical education',
    'student association',
    'healthcare leaders',
  ],
  OG_IMAGE: '/images/og-image.jpg',
  SITE_URL: 'https://naakims.com', // Update with actual domain
} as const;

// ============================================================================
// API ENDPOINTS (for admin dashboard)
// ============================================================================

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  EXECUTIVES: '/api/executives',
  CHAPTERS: '/api/chapters',
  EVENTS: '/api/events',
  BLOG: '/api/blog',
  GALLERY: '/api/gallery',
  ACHIEVEMENTS: '/api/achievements',
  SPONSORS: '/api/sponsors',
  TESTIMONIALS: '/api/testimonials',
  CONTACT: '/api/contact',
  NEWSLETTER: '/api/newsletter',
} as const;

// ============================================================================
// ANIMATION DURATIONS
// ============================================================================

export const ANIMATION = {
  FAST: 150, // ms
  NORMAL: 300, // ms
  SLOW: 500, // ms
} as const;

// ============================================================================
// FORM VALIDATION
// ============================================================================

export const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_PATTERN: /^\+?[\d\s\-()]+$/,
  PASSWORD_MIN_LENGTH: 8,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 1000,
} as const;

// ============================================================================
// LOCAL STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'naakims_auth_token',
  USER_PREFERENCES: 'naakims_user_preferences',
  THEME: 'naakims_theme',
} as const;

// ============================================================================
// DATE FORMATS
// ============================================================================

export const DATE_FORMATS = {
  FULL: 'MMMM dd, yyyy', // January 01, 2026
  SHORT: 'MMM dd, yyyy', // Jan 01, 2026
  NUMERIC: 'MM/dd/yyyy', // 01/01/2026
  TIME: 'HH:mm', // 14:30
  DATETIME: 'MMM dd, yyyy HH:mm', // Jan 01, 2026 14:30
} as const;
