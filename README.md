# Capture Crew

Capture Crew is a luxury cinematic portfolio and lead-generation platform for a premium photography, videography, and branding studio.

This starter uses the requested stack change:

- Frontend: React + Vite + TypeScript
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL through Prisma
- Image storage: Amazon S3
- Image processing: Sharp for AVIF/WebP derivatives

## Getting Started

```bash
npm install
cp server/.env.example server/.env
npm run prisma:generate
npm run dev
```

Client: `http://localhost:5173`

API: `http://localhost:4000/api`

## Environment

Configure `server/.env` with database and AWS values before uploads or database-backed routes are used.

## Project Shape

- `client/` contains the Vite React app, public site pages, and admin shell.
- `server/` contains the Express API, Prisma client, auth middleware, S3 upload service, and routes.
- `prisma/schema.prisma` defines users, projects, categories, images, testimonials, leads, blog posts, and CMS settings.
