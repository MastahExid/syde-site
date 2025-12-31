# Syde - iOS Sideloading Platform

## Overview

Syde is a web application for iOS app sideloading. It provides a landing page with information about the platform, installation guides, FAQ section, team member profiles, and tools for downloading and signing IPA files. The application features a dark, premium Apple-inspired design with a magenta accent color (#cc6baa).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS with CSS variables for theming, shadcn/ui component library
- **Animations**: Framer Motion for scroll animations and transitions
- **UI Components**: Radix UI primitives wrapped with shadcn/ui styling

The frontend follows a page-based structure with shared components:
- Pages: Home, Guides, GuideDetail, Download, Signer, NotFound
- Shared: Navigation, Footer, AppCapsule components
- Design: Dark mode forced via CSS variables, glass-morphism effects

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with tsx for development execution
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts`
- **Build**: esbuild for server bundling, Vite for client bundling

The server handles:
- Static file serving in production
- API endpoints for FAQs, team members, and guides
- Database seeding on startup
- Vite dev server integration in development

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` defines tables for FAQs, team members, and guides
- **Migrations**: Drizzle Kit for schema management (`db:push` command)
- **Connection**: Uses `DATABASE_URL` environment variable

Database tables:
- `faqs`: Question/answer pairs
- `team_members`: Name, role, description, avatar URL
- `guides`: Title, excerpt, content, slug (unique)

### Shared Code Pattern
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts`: Drizzle table definitions and Zod schemas
- `routes.ts`: API route definitions with response type schemas

This enables type-safe API contracts between client and server.

## External Dependencies

### Database
- PostgreSQL (required, connection via `DATABASE_URL` environment variable)
- Drizzle ORM for database operations
- connect-pg-simple for session storage capability

### UI Libraries
- shadcn/ui component library (Radix UI primitives)
- Framer Motion for animations
- Lucide React for icons
- Tailwind CSS for styling

### Build Tools
- Vite for frontend development and building
- esbuild for server bundling
- tsx for TypeScript execution in development

### Fonts
- Google Fonts: Inter, DM Sans, Fira Code, Geist Mono, Architects Daughter