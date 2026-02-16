# NAAKIMS Worldwide Website - Development Setup Guide

This guide will help you set up the NAAKIMS website development environment on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.17 or higher)
- **npm** or **yarn** or **pnpm** (package managers)
- **Git** (for version control)
- **PostgreSQL** (v14 or higher) OR **Supabase account** (for cloud database)
- **Code Editor:** VS Code (recommended) with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Prisma

---

## Tech Stack Overview

- **Framework:** Next.js 14+ (React, App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui (to be installed)
- **Database:** PostgreSQL via Supabase
- **ORM:** Prisma
- **Authentication:** NextAuth.js / Supabase Auth
- **Deployment:** Vercel

---

## Step-by-Step Setup

### 1. Clone the Repository

```bash
# Clone the project
git clone <repository-url>
cd naakims-official-website

# Or if starting fresh, you're already in the directory
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

This will install all dependencies listed in `package.json`.

### 3. Environment Variables Setup

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Fill in your environment variables (see `.env.example` for required variables):

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/naakims_db"

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key" # Generate with: openssl rand -base64 32

# Email Service (SendGrid or Resend)
EMAIL_SERVICE_API_KEY="your-email-api-key"
EMAIL_FROM="noreply@naakims.org"

# File Upload (Cloudinary or Supabase Storage)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Analytics (optional)
NEXT_PUBLIC_GA_ID="your-google-analytics-id"
```

### 4. Database Setup

#### Option A: Using Supabase (Recommended)

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the database URL, public anon key, and service role key
4. Add them to `.env.local`

#### Option B: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database:
   ```bash
   createdb naakims_db
   ```
3. Update `DATABASE_URL` in `.env.local`

#### Initialize Prisma

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database with sample data
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Database
```bash
npx prisma studio              # Open Prisma Studio (database GUI)
npx prisma generate            # Generate Prisma Client
npx prisma db push             # Push schema changes to database
npx prisma migrate dev         # Create and apply migrations
npx prisma migrate deploy      # Deploy migrations (production)
npx prisma db seed             # Seed database with sample data
```

### Testing (to be implemented)
```bash
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:watch   # Run tests in watch mode
```

---

## Development Workflow

### 1. Create a New Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Follow component architecture guidelines (see `docs/COMPONENT_ARCHITECTURE.md`)
- Follow TypeScript conventions
- Use Tailwind CSS for styling
- Write clean, documented code

### 3. Test Your Changes

- Verify functionality in browser
- Check responsive design (mobile, tablet, desktop)
- Run ESLint: `npm run lint`
- Check for TypeScript errors

### 4. Commit and Push

```bash
git add .
git commit -m "feat: add hero slideshow component"
git push origin feature/your-feature-name
```

**Commit Message Convention:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

### 5. Create Pull Request

- Push to GitHub/GitLab
- Create PR for review
- Wait for approval and merge

---

## Code Quality Tools

### ESLint
Linting for JavaScript/TypeScript:

```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues
```

### Prettier
Code formatting:

```bash
npm run format        # Format all files
```

### TypeScript
Type checking:

```bash
npx tsc --noEmit      # Check types without emitting files
```

---

## Database Management

### Prisma Studio

Visual database editor:

```bash
npx prisma studio
```

Opens at [http://localhost:5555](http://localhost:5555)

### Viewing Data

Access Supabase dashboard or use Prisma Studio to:
- View all tables
- Add/edit/delete records
- Test queries
- Monitor database

---

## Common Issues & Solutions

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill

# Or use different port
PORT=3001 npm run dev
```

### Issue: Database connection error

**Solution:**
- Check `DATABASE_URL` in `.env.local`
- Verify database is running
- Check network/firewall settings
- Confirm Supabase project is active

### Issue: Prisma Client errors

**Solution:**
```bash
# Regenerate Prisma Client
npx prisma generate

# If still issues, delete and regenerate
rm -rf node_modules/.prisma
npx prisma generate
```

### Issue: Module not found errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## File Structure Overview

```
naakims-official-website/
├── docs/                    # Project documentation
├── prisma/                  # Database schema and migrations
│   └── schema.prisma
├── public/                  # Static assets
│   ├── images/
│   ├── icons/
│   └── ...
├── src/
│   ├── app/                # Next.js pages and routes
│   ├── components/         # React components
│   ├── lib/                # Utilities and helpers
│   └── types/              # TypeScript definitions
├── .env.example            # Environment variables template
├── .env.local              # Local environment (not in git)
├── .gitignore
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Project overview
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

---

## Useful Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)

### Tailwind CSS
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com)

### Prisma
- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

### Supabase
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app)

---

## Getting Help

If you encounter issues or have questions:

1. **Check Documentation:** Review project docs and linked resources above
2. **Search Issues:** Check if someone else had the same problem
3. **Ask for Help:** Contact the development team

**Developer Contact:**
- **Name:** Larry David
- **Email:** larrydavid7730@gmail.com
- **WhatsApp:** +234 913 119 3359
- **Website:** www.larrydavid.dev

---

## Security Notes

⚠️ **Important:**

- **Never commit `.env.local`** or any file with secrets to version control
- **Use strong, unique passwords** for database and services
- **Rotate API keys regularly**
- **Enable 2FA** on Supabase, Vercel, and GitHub accounts
- **Review security checklist** before deploying to production

---

## Next Steps After Setup

Once your development environment is running:

1. ✅ Verify all pages load without errors
2. ✅ Test database connection (Prisma Studio)
3. ✅ Review component structure (`src/components/`)
4. ✅ Read coding guidelines (`docs/COMPONENT_ARCHITECTURE.md`)
5. ✅ Start building! Begin with homepage components

---

**Happy Coding! 🎉**

For NAAKIMS Worldwide - Preserving Our Legacy, Empowering Our Future

---

**Last Updated:** February 15, 2026  
**Version:** 1.0
