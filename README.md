# Straight2Guide

Two-sided travel marketplace connecting travelers directly with verified local guides.

Next.js (App Router) + TypeScript + Tailwind v4 + Supabase. Package manager: pnpm.

## Development

```bash
pnpm install
pnpm dev
```

App runs at http://localhost:3000.

## Scripts

- `pnpm dev` — start the dev server
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — run ESLint
- `pnpm format` — format with Prettier

## Environment

Copy `.env.example` to `.env.local` and fill in the Supabase, Resend, PostHog, and Sentry values.

## Database

Supabase migrations live in `supabase/migrations/`. Apply them with the Supabase CLI.
