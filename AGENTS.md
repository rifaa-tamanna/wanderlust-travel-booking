<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust

A travel-themed landing page project ("Wanderlust") built with Next.js. Early stage: the home page is a placeholder while the design system is fully set up.

## Commands

- `npm run dev` — start the dev server (Turbopack) at http://localhost:3000
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — ESLint

## Stack

- **Next.js 16 (App Router)** with `cacheComponents`, `partialPrefetching`, and `reactCompiler` enabled in `next.config.ts`. Components should be written with the React Compiler in mind (no manual `useMemo`/`useCallback` micro-optimizations needed).
- **React 19** + TypeScript (strict mode), path alias `@/*` → `src/*`.
- **Tailwind CSS v4** — CSS-based config in `src/app/globals.css` (`@tailwindcss/turbopack` loader; no `tailwind.config.js`). Theme tokens/CSS variables live in `globals.css`.
- **shadcn/ui** (`base-nova` style, Base UI primitives, Lucide icons) — the full `src/components/ui/` component library (~63 components) is already installed. Use or compose these instead of adding new UI dependencies. Registry config in `components.json`; aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks`.
- **Fonts**: Josefin Sans via `next/font/google` in `src/app/layout.tsx`.

## Structure

```
src/
  app/            # App Router routes — layout.tsx, page.tsx, globals.css
  components/ui/  # shadcn/ui primitives (don't hand-edit casually; managed by shadcn CLI)
  hooks/          # use-mobile, use-highlighted-code
  lib/            # utils.ts (cn()), highlighter.tsx (shiki-based code highlighting)
public/images/    # static images (banner, CTA, feature icons, people shots)
```

## Conventions

- App Router only; Pages Router is not used.
- Route segments use `LayoutProps<"/">`-typed layouts (see `src/app/layout.tsx`).
- Run the dev server after edits to verify; check deprecation warnings.

## Key reference

Before writing Next.js code, consult the bundled docs at `node_modules/next/dist/docs/` (e.g. `01-app/01-getting-started`, `01-app/03-api-reference`) — this Next.js version has breaking changes from older releases.
