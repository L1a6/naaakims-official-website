# NAAKIMS Website - Admin Dashboard Features (Future Implementation)

This document outlines the planned features for the NAAKIMS admin dashboard. The admin dashboard will allow authorized users to manage website content dynamically without code changes.

## Dashboard Access

**URL:** `/admin` (protected route)

**Authentication:** NextAuth.js or Supabase Auth

**User Roles:**
1. **Super Admin** - Full access to all features
2. **Chapter Admin** - Manage chapter-specific content
3. **Content Manager** - Create/edit blog posts, events, gallery

---

## Dashboard Layout

### Sidebar Navigation
- Dashboard Home (Overview/Analytics)
- Blog Posts
- Events
- Gallery
- Executives
- Chapters
- Sponsors & Patrons
- Achievements
- Testimonials
- Contact Submissions
- Newsletter Subscribers
- Users & Permissions
- Settings

### Top Bar
- NAAKIMS logo (links to public site)
- User profile dropdown
- Notifications icon
- Search functionality
- Logout button

---

## Core Features by Section

### 1. Dashboard Home (Analytics Overview)

**Metrics Displayed:**
- Total page views (last 7/30 days)
- Most viewed pages
- Latest contact submissions (quick view)
- Recent newsletter signups
- Upcoming events count
- Published blog posts count
- Total chapters
- Gallery photos count

**Quick Actions:**
- Create New Blog Post
- Add New Event
- Upload Photos
- View Contact Messages

**Activity Feed:**
- Recent blog posts published
- Events created
- New contact submissions
- Newsletter signups

---

### 2. Blog Post Management

**Features:**
- **List View:**
  - Searchable and filterable (by status, category, author, date)
  - Sortable columns
  - Bulk actions (delete, change status)
  - Preview in new tab
  
- **Create/Edit Post:**
  - Rich text editor (WYSIWYG)
  - Title, slug (auto-generated, editable)
  - Excerpt (short description)
  - Featured image upload
  - Category selection
  - Tags (add/remove)
  - Status: Draft, Published, Scheduled, Archived
  - Publish date/time selector
  - SEO metadata (title, description, keywords)
  - Preview before publishing
  
- **Categories Management:**
  - Create/edit/delete categories
  - Assign colors for badges
  
- **Tags Management:**
  - Create/edit/delete tags
  - Tag suggestions based on content

---

### 3. Event Management

**Features:**
- **List View:**
  - Filter by status (Upcoming, Ongoing, Completed, Cancelled)
  - Filter by event type
  - Filter by chapter
  - Search by title
  
- **Create/Edit Event:**
  - Event title and slug
  - Description (short) and content (detailed)
  - Featured image upload
  - Start date & time
  - End date & time (optional)
  - Location (text or map integration)
  - Event type selection (dropdown)
  - Status selection
  - Chapter association (if chapter-specific)
  - Registration link (optional)
  - Attendee count
  - Photo gallery upload (multiple files)
  - Tags
  
- **Calendar View:**
  - Visual calendar showing all events
  - Click event to view/edit details
  - Drag-and-drop to reschedule (future feature)

---

### 4. Gallery Management

**Features:**
- **Grid View:**
  - Thumbnail previews
  - Filter by year, event, chapter, album
  - Search by title/description
  - Select multiple for bulk actions
  
- **Upload Photos:**
  - Drag-and-drop upload
  - Bulk upload (multiple files)
  - Auto-generate thumbnails
  - Crop/resize tools
  
- **Edit Photo:**
  - Title and description
  - Album association
  - Event association
  - Chapter association
  - Year
  - Tags
  - Set as album cover
  
- **Album Management:**
  - Create/edit albums
  - Album name, description
  - Cover image selection
  - Associate with event

---

### 5. Executive Management

**Features:**
- **Current Administration:**
  - Add/edit/remove executives
  - Executive name, position, bio
  - Photo upload
  - Contact info (email, phone)
  - Social media links
  - Display order (drag-and-drop)
  
- **Past Administrations:**
  - Archive view
  - Add new administration record
  - Administration name (e.g., "2024-2025")
  - Start/end year
  - Major achievements summary
  - Photos from era
  - List of executives (archived data)
  
- **Mark Administration as Current:**
  - Toggle to set current administration
  - Only one can be current at a time

---

### 6. Chapter Management

**Features:**
- **List View:**
  - All chapters
  - Active/inactive status
  - Search and filter
  
- **Create/Edit Chapter:**
  - Chapter name and slug
  - University name
  - Logo upload
  - Description
  - Location (city, state)
  - Founded year
  - Achievements
  - Contact info (email, phone)
  - Social media links
  - Active/inactive toggle
  
- **Chapter Executives:**
  - Add/edit executives for each chapter
  - Name, position, photo, bio
  - Contact info
  - Current academic year
  
- **Past Chapter Presidents:**
  - Add historical records
  - Name, photo, tenure, achievements

---

### 7. Sponsors & Patrons Management

**Features:**
- **List View:**
  - Filter by tier (Platinum, Gold, Silver, Bronze, Partner)
  - Active/inactive filter
  - Display order
  
- **Create/Edit Sponsor:**
  - Name and title
  - Organization
  - Logo/photo upload
  - Description
  - Quote/message
  - Tier selection
  - Website, email, phone
  - Display order (within tier)
  - Active/inactive toggle

---

### 8. Achievements Management

**Features:**
- **Timeline View:**
  - Chronological display
  - Filter by type and year
  
- **Create/Edit Achievement:**
  - Title and description
  - Date
  - Type selection (Milestone, Award, Scholarship, Outreach, etc.)
  - Photos upload (multiple)
  - Related links (URLs)

---

### 9. Testimonials Management

**Features:**
- **List View:**
  - Active/inactive testimonials
  - Display order
  
- **Create/Edit Testimonial:**
  - Quote text
  - Author name
  - Author role/description
  - Author photo upload
  - Chapter association (optional)
  - Active/inactive toggle
  - Display order

---

### 10. Contact Submissions

**Features:**
- **Inbox View:**
  - List all contact form submissions
  - Filter by status (New, In Progress, Resolved, Archived)
  - Filter by category
  - Search by name or subject
  - Mark as read/unread
  
- **View Submission:**
  - Full details (name, email, phone, subject, message)
  - Timestamp
  - Status update
  - Reply via email (direct integration)
  - Internal notes
  - Archive or delete

---

### 11. Newsletter Subscribers

**Features:**
- **Subscriber List:**
  - All subscribers
  - Active/unsubscribed status
  - Search by email or name
  - Export to CSV
  
- **Subscriber Details:**
  - Email, name (if provided)
  - Subscription date
  - Unsubscribe date (if applicable)
  - Activate/deactivate manually
  
- **Email Campaign (Future Feature):**
  - Send newsletter to all active subscribers
  - Email template builder
  - Schedule send date/time

---

### 12. User Management

**Features:**
- **User List:**
  - All admin users
  - Filter by role
  - Active/inactive status
  
- **Create/Edit User:**
  - Name and email
  - Password (hashed)
  - Role assignment (Super Admin, Chapter Admin, Content Manager)
  - Profile image upload
  - Chapter assignment (for Chapter Admins)
  - Active/inactive toggle
  
- **Permissions:**
  - Role-based access control (RBAC)
  - Super Admin: Full access
  - Chapter Admin: Own chapter content only
  - Content Manager: Blog, events, gallery

---

### 13. Settings

**Features:**
- **Site Settings:**
  - Site name and tagline
  - Logo upload
  - Favicon upload
  - Contact information (email, phone, address)
  - Social media links
  - Office hours
  
- **SEO Settings:**
  - Default meta title
  - Default meta description
  - Keywords
  - Open Graph image
  
- **Email Settings:**
  - Sender name and email
  - Email templates
  
- **Theme Settings (Optional):**
  - Color customization (NAAKIMS Green shades)
  - Font selection

---

## Technical Implementation Notes

### Authentication & Authorization
- NextAuth.js with credential provider + Supabase Auth
- Session-based authentication
- Role-based middleware for route protection
- API routes secured with role checks

### Database
- Prisma ORM with PostgreSQL (Supabase)
- All admin actions logged (audit trail)
- Soft deletes for important records

### File Uploads
- Supabase Storage or Cloudinary
- Image optimization and resizing
- Automatic thumbnail generation

### Rich Text Editor
- TinyMCE, Quill, or Tiptap
- Support for images, links, formatting
- Code block support (for technical posts)

### Forms
- React Hook Form + Zod validation
- Client-side and server-side validation
- Error handling and user feedback

### UI Components
- Shadcn/ui for consistent design
- Tailwind CSS for styling
- Responsive across all devices

---

## Security Considerations

- HTTPS only (SSL enforced)
- Input sanitization (prevent XSS)
- SQL injection prevention (Prisma handles this)
- CSRF protection
- Rate limiting on API endpoints
- Strong password requirements
- Two-factor authentication (future)
- Activity logging and monitoring
- Regular security audits

---

## Development Priority

### Phase 1 (MVP):
1. Authentication system
2. Blog post management
3. Event management
4. Gallery upload
5. Contact submissions view

### Phase 2:
6. Executive management
7. Chapter management
8. Sponsors management
9. User management

### Phase 3:
10. Achievements management
11. Testimonials management
12. Newsletter management
13. Analytics dashboard
14. Advanced settings

---

## Future Enhancements

- **Multi-language support** (Admin interface in English + Ibibio)
- **Email campaign builder** (newsletters to subscribers)
- **Advanced analytics** (Google Analytics integration in dashboard)
- **Automated backups** (database scheduled backups)
- **Content approval workflow** (for Content Managers)
- **Comment moderation** (if blog comments enabled)
- **Activity logs** (audit trail for all admin actions)
- **Bulk import/export** (CSV import for chapters, executives, etc.)

---

**Note:** This admin dashboard will be built AFTER the public-facing website is complete and tested.

---

**Last Updated:** February 15, 2026  
**Version:** 1.0
