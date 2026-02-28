# Native Base

Subscription-based AI workflow automation for businesses. Powered by [Alfabolt](https://alfabolt.com).

## Prerequisites

- Node.js 18+
- A PostgreSQL database (we use [Neon](https://neon.tech))
- Google Cloud project with OAuth 2.0 credentials and Calendar API enabled

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example below into a `.env` file at the project root:

```env
# Database — Neon Postgres (pooled for runtime, unpooled for migrations)
DATABASE_URL="postgresql://user:password@host-pooler/dbname?sslmode=require"
DIRECT_URL="postgresql://user:password@host/dbname?sslmode=require"

# Google Calendar OAuth
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
GOOGLE_REDIRECT_URI="http://localhost:3000/api/auth/google/callback"
GOOGLE_CALENDAR_ID="primary"

# JWT secret for session tokens (use a long random string in production)
JWT_SECRET="change-me-to-something-secure"

# Base URL (set to your public domain when deployed)
APP_BASE_URL="http://localhost:3000"
```

**Notes:**
- `DATABASE_URL` should be the **pooled** connection string (used by the app at runtime).
- `DIRECT_URL` should be the **unpooled / direct** connection string (used by Prisma for migrations).
- For Google OAuth, you need to add `http://localhost:3000/api/auth/google/callback` and `http://localhost:3000/api/auth/google-signup/callback` as authorized redirect URIs in the Google Cloud Console.

### 3. Run database migrations

```bash
npm run db:deploy
```

### 4. Seed the database

Creates the default booking configuration row:

```bash
npm run db:seed
```

### 5. Connect Google Calendar

Start the dev server (step 6), then visit:

```
http://localhost:3000/api/auth/google
```

This initiates the OAuth flow and stores your calendar tokens in the database. Required for the booking system to create calendar events and block busy times.

### 6. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Create a new migration from schema changes |
| `npm run db:deploy` | Apply pending migrations to the database |
| `npm run db:seed` | Seed the database with default data |
| `npm run db:studio` | Open Prisma Studio (database GUI) |

## Project structure

```
app/
  (marketing)/       Landing page, signup, login, credits
  dashboard/         Authenticated dashboard
  api/
    auth/            Sign up, login, logout, Google OAuth
    bookings/        Booking creation
    slots/           Available time slot computation
    gcal/            Google Calendar sync & webhooks
    config/          Booking config (admin)
components/          Shared UI components
lib/                 Server utilities (Prisma, auth, slots, Google Calendar)
prisma/
  schema.prisma      Database schema
  migrations/        Migration history
  seed.ts            Seed script
```

## Deployment

This is a standard Next.js app (not a static export). Deploy to Vercel, or any platform that supports Node.js:

```bash
npm run build
npm run start
```

Make sure all environment variables are set in your deployment environment. On Vercel, add them in the project settings.
