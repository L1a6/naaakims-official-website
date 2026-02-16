# NAAKIMS Worldwide Official Website

<div align="center">

![NAAKIMS Logo](public/images/logo/naakims-logo.svg)

**Connecting Medical Students Across Continents**

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](LICENSE)

</div>

---

## 📖 About NAAKIMS

The **National Association of Akwa Ibom State Medical Students (NAAKIMS) Worldwide** is a student association connecting medical students from Akwa Ibom State studying across Nigeria and beyond.

This website serves as a permanent digital archive, publicity platform, and central hub for all NAAKIMS chapters, preserving our legacy and empowering our future.

---

## 🎯 Project Purpose

### The Problem
NAAKIMS achievements, events, and activities are currently shared across ephemeral platforms (WhatsApp statuses, Facebook posts, group chats), causing valuable work to be forgotten over time with no permanent record.

### The Solution
A world-class website that serves as:
- **Historical documentation** of all administrations
- **Global publicity platform** for NAAKIMS
- **Google-searchable hub** for information
- **Legacy preservation** for current and future generations
- **Central communication channel** for all chapters

---

## ✨ Key Features

### Public Website
- **Dynamic Hero Slideshow** with rotating images and compelling messages
- **About Section** with NAAKIMS history, mission, and vision
- **Chapters Hub** with individual pages for each university chapter
- **Executive Showcase** for current and past administrations
- **Events Management** with upcoming and past events archive
- **Blog/News System** with categories and tags
- **Photo Gallery** organized by event, chapter, and year
- **Achievements Timeline** documenting milestones
- **Sponsors & Patrons** recognition page
- **Contact System** with form submissions

### Admin Dashboard (Future)
- Content management for all sections
- Role-based access control
- Analytics and reporting
- User management
- Newsletter management

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 14+](https://nextjs.org/) (React, App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
- **Forms:** React Hook Form + Zod validation

### Backend
- **Runtime:** Node.js
- **API:** Next.js API Routes
- **Database:** PostgreSQL (via [Supabase](https://supabase.com/))
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** NextAuth.js / Supabase Auth

### Deployment
- **Hosting:** [Vercel](https://vercel.com/)
- **Database:** Supabase
- **Storage:** Supabase Storage / Cloudinary
- **Domain:** Custom domain (to be configured)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or higher
- npm, yarn, or pnpm
- PostgreSQL (or Supabase account)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd naakims-official-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables in `.env.local`

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

For detailed setup instructions, see [DEVELOPMENT_SETUP.md](docs/DEVELOPMENT_SETUP.md)

---

## 📁 Project Structure

```
naakims-official-website/
├── docs/                       # Project documentation
│   ├── ADMIN_DASHBOARD_FEATURES.md
│   ├── ASSET_GUIDELINES.md
│   ├── COMPONENT_ARCHITECTURE.md
│   └── DEVELOPMENT_SETUP.md
├── prisma/                     # Database schema
│   └── schema.prisma
├── public/                     # Static assets
│   ├── images/
│   └── icons/
├── src/
│   ├── app/                   # Next.js pages and routes
│   │   ├── about/
│   │   ├── blog/
│   │   ├── chapters/
│   │   ├── contact/
│   │   ├── events/
│   │   ├── executives/
│   │   ├── gallery/
│   │   ├── sponsors/
│   │   └── page.tsx           # Homepage
│   ├── components/
│   │   ├── landing/           # Homepage components
│   │   └── shared/            # Reusable components
│   ├── lib/                   # Utilities and helpers
│   │   ├── constants.ts
│   │   └── utils.ts
│   └── types/                 # TypeScript definitions
│       └── index.ts
├── .env.example               # Environment variables template
├── README.md                  # This file
└── package.json               # Dependencies
```

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[Development Setup Guide](docs/DEVELOPMENT_SETUP.md)** - Complete setup instructions
- **[Component Architecture](docs/COMPONENT_ARCHITECTURE.md)** - Component structure and guidelines
- **[Asset Guidelines](docs/ASSET_GUIDELINES.md)** - Image specifications and requirements
- **[Admin Dashboard Features](docs/ADMIN_DASHBOARD_FEATURES.md)** - Planned admin features

---

## 🎨 Brand Identity

### Colors
- **Primary:** NAAKIMS Green (`#00D084`) - Vibrant emerald green
- **Secondary:** Pure White (`#FFFFFF`)
- **Accent:** Nigerian flag green (`#008751`)

### Typography
- **Primary Font:** Inter, Poppins, or Outfit
- **Style:** Modern sans-serif, clean and professional

### Design Principles
- Clean, modern aesthetic
- Professional yet approachable
- Ample white space
- Mobile-first responsive design
- Fast loading (< 2 seconds)

---

## 🧪 Development Scripts

```bash
# Development
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
npm run format        # Format code with Prettier

# Database
npx prisma studio     # Open Prisma Studio (database GUI)
npx prisma generate   # Generate Prisma Client
npx prisma db push    # Push schema to database
npx prisma migrate dev # Create migration
```

---

## 🤝 Contributing

This is a private project for NAAKIMS Worldwide. If you're part of the development team:

1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Make your changes following the coding guidelines
3. Test thoroughly
4. Commit with descriptive messages (`git commit -m 'feat: add new feature'`)
5. Push to your branch (`git push origin feature/your-feature`)
6. Create a Pull Request

### Commit Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## 📝 License

© 2026 NAAKIMS Worldwide. All rights reserved.

This is proprietary software developed exclusively for NAAKIMS Worldwide.

---

## 👨‍💻 Developer

**Larry David**  
Full Stack Developer

- 🌐 Website: [www.larrydavid.dev](https://www.larrydavid.dev)
- 📧 Email: larrydavid7730@gmail.com
- 💬 WhatsApp: +234 913 119 3359

---

## 🙏 Acknowledgments

- **NAAKIMS Worldwide Executive Board** - For trusting in this vision
- **All Chapter Presidents** - For their input and support
- **NAAKIMS Members** - Past, present, and future

---

## 🔗 Links

- **Official Website:** [Coming Soon]
- **Facebook:** [NAAKIMS Facebook]
- **Twitter:** [NAAKIMS Twitter]
- **Instagram:** [NAAKIMS Instagram]

---

<div align="center">

**Preserving Our Legacy, Empowering Our Future**

Built with ❤️ for NAAKIMS Worldwide

</div>
