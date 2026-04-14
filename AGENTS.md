# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 15 frontend using the App Router. Main application code lives in `app/`, split between client-facing routes in `app/(client)` and admin routes in `app/admin`. Reusable UI components live in `components/`, shared hooks in `hooks/`, API/service wrappers in `services/`, and common utilities in `lib/` and `utils/`. Static assets are stored in `public/` and `assets/`. Shared TypeScript types are under `types/`.

## Build, Test, and Development Commands
- `npm run dev`: start the local dev server with Turbopack.
- `npm run build`: create a production build and run type checking/lint checks during the build.
- `npm run start`: serve the production build locally.
- `npm install`: install dependencies after pulling changes.

There is currently no dedicated test script in [`package.json`](/C:/Data/Projects/crexy.me/crexy-fe/package.json). If you add tests, add a matching npm script.

## Coding Style & Naming Conventions
Use TypeScript and React function components. Follow the existing style in the repo:
- 2-space indentation is acceptable only if a file already uses it; otherwise preserve surrounding formatting.
- Use `PascalCase` for React components and component files, for example `ProductGrid.tsx`.
- Use `camelCase` for hooks, helpers, and variables, for example `useAuth`.
- Keep route files in Next.js conventions such as `page.tsx`, `layout.tsx`, and `_components/`.

Linting is provided through Next.js during `npm run build`. Address hook dependency warnings and prefer `next/image` over raw `<img>` where practical.

## Testing Guidelines
Automated tests are not set up yet. For now, validate changes by running `npm run build` and manually exercising the affected route. When introducing tests, place them near the feature or in a dedicated `__tests__/` folder and use a `*.test.ts` or `*.test.tsx` suffix.

## Commit & Pull Request Guidelines
Recent commits use short, imperative subjects such as `update UI` and `responsive for products`. Keep commit messages brief, lower-case, and action-oriented.

Pull requests should include:
- a clear summary of what changed
- linked issue or task reference when available
- screenshots or short recordings for UI changes
- notes about config, env, or migration impacts

## Security & Configuration Tips
Keep secrets only in `.env` and update `.env.example` when adding new variables. Do not commit real credentials. Review [`next.config.ts`](/C:/Data/Projects/crexy.me/crexy-fe/next.config.ts) and remote image settings when adding new external asset sources.
