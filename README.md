# EndoClinica B&B Frontend

Institutional website frontend for EndoClinica B&B, built with the Next.js App Router and integrated with Sanity for blog content, clinic data, and contact capture.

## Stack

- Next.js 15
- React 18
- Tailwind CSS 4
- Sanity Content Lake

## Requirements

- Node.js 20+
- npm 10+

## Environment Variables

Create `frontend-endoclinicabeb/.env.local` only for local development. Do not commit this file.

Use `frontend-endoclinicabeb/.env.example` as the template.

Main variables:

- `SANITY_API_WRITE_TOKEN`
  Server-side token used to store contacts in Sanity.
- `NEXT_PUBLIC_SITE_URL`
  Public site URL used for canonical URLs and Open Graph metadata.
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
  Optional override for the default project id.
- `NEXT_PUBLIC_SANITY_DATASET`
  Optional override for the default dataset.

## Scripts

- `npm run dev`
  Starts the local development server.
- `npm run dev:clean`
  Clears local caches and starts the development server.
- `npm run typecheck`
  Runs TypeScript checks.
- `npm run build`
  Creates the production build.
- `npm run start`
  Starts the production build locally.
- `npm run clean`
  Removes local caches and logs.
- `npm run check`
  Runs typecheck and build in sequence.

## Structure

- `src/app`
  Routes, layout, and application components.
- `src/lib`
  Sanity integrations and shared utilities.
- `src/styles`
  Global styles and theme configuration.
- `public`
  Public assets such as the logo and favicon.
- `scripts`
  Local maintenance scripts.

## What Should Be Committed

- `src/`
- `public/`
- `scripts/`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `next.config.ts`
- `postcss.config.mjs`
- `next-env.d.ts`
- `.env.example`
- `README.md`

## What Should Not Be Committed

- `.env.local`
- `.next/`
- `node_modules/`
- `.vercel/`
- local log files
- `*.tsbuildinfo` files

## Vercel Deployment

1. Import the frontend repository into Vercel.
2. Set the framework preset to `Next.js`.
3. If Vercel points to a parent directory, set `frontend-endoclinicabeb` as the Root Directory.
4. Register environment variables in the Vercel dashboard instead of committing local env files.
5. Deploy.

Recommended Vercel variables:

- `SANITY_API_WRITE_TOKEN`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SANITY_PROJECT_ID` if needed
- `NEXT_PUBLIC_SANITY_DATASET` if needed

## Notes

- The contact form opens the clinic WhatsApp and tries to save the lead in Sanity in parallel.
- The site favicon falls back to `public/favicon-blue-background.png` when no CMS upload is present.
- If `next dev` locks `.next/trace` on Windows, run `npm run clean` before starting the app again.
