/**
 * TypeScript Type Definitions for NAAKIMS Website
 * 
 * This file contains all TypeScript interfaces, types, and enums
 * used throughout the NAAKIMS Worldwide website.
 */

// ============================================================================
// USER & AUTHENTICATION TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  CHAPTER_ADMIN = 'CHAPTER_ADMIN',
  CONTENT_MANAGER = 'CONTENT_MANAGER',
}

// ============================================================================
// EXECUTIVE TYPES
// ============================================================================

export interface Executive {
  id: string;
  name: string;
  position: string;
  bio?: string;
  photo?: string;
  email?: string;
  phone?: string;
  linkedIn?: string;
  twitter?: string;
  order: number; // Display order
  isActive: boolean;
  administrationId: string;
  administration: Administration;
  createdAt: Date;
  updatedAt: Date;
}

export interface Administration {
  id: string;
  name: string; // e.g., "2025-2026 Administration"
  startYear: number;
  endYear: number;
  isCurrent: boolean;
  executives: Executive[];
  achievements?: string; // Major achievements during this tenure
  photos?: string[]; // Photos from this era
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// CHAPTER TYPES
// ============================================================================

export interface Chapter {
  id: string;
  name: string; // e.g., "University of Uyo Chapter"
  slug: string; // URL-friendly: "university-of-uyo"
  university: string;
  logo?: string;
  description?: string;
  location?: string; // City, State
  foundedYear?: number;
  currentPresidentId?: string;
  currentPresident?: ChapterExecutive;
  executives: ChapterExecutive[];
  pastPresidents: PastChapterPresident[];
  achievements?: string;
  email?: string;
  phone?: string;
  socialMedia?: SocialMediaLinks;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChapterExecutive {
  id: string;
  name: string;
  position: string;
  photo?: string;
  email?: string;
  phone?: string;
  bio?: string;
  chapterId: string;
  chapter: Chapter;
  year: string; // Academic year: "2025-2026"
  createdAt: Date;
  updatedAt: Date;
}

export interface PastChapterPresident {
  id: string;
  name: string;
  photo?: string;
  tenure: string; // e.g., "2023-2024"
  achievements?: string;
  chapterId: string;
  chapter: Chapter;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// EVENT TYPES
// ============================================================================

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string; // Full event details (rich text/HTML)
  featuredImage?: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  eventType: EventType;
  status: EventStatus;
  chapterId?: string; // If chapter-specific
  chapter?: Chapter;
  attendeeCount?: number;
  registrationLink?: string;
  photos?: string[]; // Gallery of event photos
  tags?: string[];
  createdById: string;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}

export enum EventType {
  ACADEMIC = 'ACADEMIC',
  SOCIAL = 'SOCIAL',
  OUTREACH = 'OUTREACH',
  MEETING = 'MEETING',
  CONFERENCE = 'CONFERENCE',
  WORKSHOP = 'WORKSHOP',
  OTHER = 'OTHER',
}

export enum EventStatus {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

// ============================================================================
// BLOG/NEWS POST TYPES
// ============================================================================

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Rich text/HTML content
  featuredImage?: string;
  authorId: string;
  author: User;
  categoryId: string;
  category: Category;
  tags: Tag[];
  status: PostStatus;
  publishedAt?: Date;
  readTime?: number; // Estimated reading time in minutes
  views?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string; // For badge/tag styling
  posts: BlogPost[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  posts: BlogPost[];
  createdAt: Date;
  updatedAt: Date;
}

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  SCHEDULED = 'SCHEDULED',
  ARCHIVED = 'ARCHIVED',
}

// ============================================================================
// GALLERY TYPES
// ============================================================================

export interface GalleryItem {
  id: string;
  title?: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  albumId?: string;
  album?: Album;
  eventId?: string;
  event?: Event;
  chapterId?: string;
  chapter?: Chapter;
  uploadedById: string;
  uploadedBy: User;
  year?: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Album {
  id: string;
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  photos: GalleryItem[];
  eventId?: string;
  event?: Event;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// ACHIEVEMENT TYPES
// ============================================================================

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: AchievementType;
  photos?: string[];
  relatedLinks?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum AchievementType {
  MILESTONE = 'MILESTONE',
  AWARD = 'AWARD',
  SCHOLARSHIP = 'SCHOLARSHIP',
  OUTREACH = 'OUTREACH',
  RESEARCH = 'RESEARCH',
  PARTNERSHIP = 'PARTNERSHIP',
  OTHER = 'OTHER',
}

// ============================================================================
// SPONSOR/PATRON TYPES
// ============================================================================

export interface Sponsor {
  id: string;
  name: string;
  title?: string; // e.g., "His Excellency, Governor of Akwa Ibom State"
  organization?: string;
  logo?: string;
  photo?: string;
  description?: string;
  quote?: string; // Message or quote from sponsor
  tier: SponsorTier;
  website?: string;
  email?: string;
  phone?: string;
  order: number; // Display order within tier
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum SponsorTier {
  PLATINUM = 'PLATINUM',
  GOLD = 'GOLD',
  SILVER = 'SILVER',
  BRONZE = 'BRONZE',
  PARTNER = 'PARTNER',
}

// ============================================================================
// TESTIMONIAL TYPES
// ============================================================================

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole?: string; // e.g., "2024 Graduate, University of Uyo"
  authorPhoto?: string;
  chapterId?: string;
  chapter?: Chapter;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// CONTACT & NEWSLETTER TYPES
// ============================================================================

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  category: ContactCategory;
  status: SubmissionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum ContactCategory {
  GENERAL_INQUIRY = 'GENERAL_INQUIRY',
  CHAPTER_RELATED = 'CHAPTER_RELATED',
  SPONSORSHIP = 'SPONSORSHIP',
  MEMBERSHIP = 'MEMBERSHIP',
  TECHNICAL_ISSUE = 'TECHNICAL_ISSUE',
  OTHER = 'OTHER',
}

export enum SubmissionStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  ARCHIVED = 'ARCHIVED',
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
}

// ============================================================================
// SOCIAL MEDIA & LINK TYPES
// ============================================================================

export interface SocialMediaLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  whatsapp?: string;
  youtube?: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface FilterParams {
  search?: string;
  category?: string;
  tag?: string;
  year?: number;
  chapter?: string;
  status?: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface FormFieldError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: FormFieldError[];
  isSubmitting: boolean;
  isSuccess: boolean;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: FormFieldError[];
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: FormFieldError[];
}
