# Copilot Instructions for Portfolio Project

## Architecture Overview
This is a Next.js 16 portfolio website using the App Router. Key characteristics:
- **Frontend-only**: No backend APIs; uses mock data for dynamic content like blog posts
- **Component structure**: All reusable components in `src/components/`, pages in `src/app/`
- **Styling**: Tailwind CSS v4 with custom SCSS files for complex components (e.g., `src/styles/skills-showcase.scss`)
- **Theming**: Custom theme provider (`src/components/theme-provider.tsx`) with light/dark modes, stored in localStorage
- **Animations**: Framer Motion for all motion effects, applied to `motion.div` and similar elements

## Key Patterns
- **Client components**: Mark with `"use client"` for interactivity (forms, animations, theme toggling)
- **Color system**: Use CSS custom properties like `var(--foreground)`, `var(--primary)`; supports LAB colors for modern browsers
- **Icons**: Lucide React icons imported individually (e.g., `import { ArrowRight } from "lucide-react"`)
- **Layout**: Root layout includes `ThemeProvider`, `CustomCursor`, `FloatingThemeToggle`, and noise overlay
- **State management**: Local component state for UI toggles (e.g., `showQuickConnect` in main page)
- **Responsive design**: Mobile-first with `md:`, `lg:` prefixes; custom breakpoints in SCSS

## Development Workflow
- **Start dev server**: `npm run dev` (runs on http://localhost:3000)
- **Build**: `npm run build` (static export ready)
- **Lint**: `npm run lint` (ESLint with Next.js rules)
- **No tests**: Project lacks test setup; focus on manual testing
- **Assets**: Images in `public/assets/` or `public/images/`; reference as `/assets/filename`

## Component Examples
- **Hero section** (`src/components/hero.tsx`): Animated intro with email copy function
- **Theme toggle** (`src/components/floating-theme-toggle.tsx`): Positioned fixed, uses `useTheme` hook
- **Skills showcase** (`src/components/skills-showcase.tsx`): Complex SCSS styling with background gradients and floating orbs

## Conventions
- **Path aliases**: `@/*` maps to `./src/*` (configured in `tsconfig.json`)
- **Font loading**: Google Fonts (Inter, Playfair Display) loaded in layout
- **Image optimization**: Next.js Image component with remote patterns for placeholder.com
- **SCSS usage**: Reserved for intricate styles; prefer Tailwind classes for simple styling

## Common Tasks
- Adding new sections: Import component in `src/app/page.tsx`, position in main element
- Theming: Update CSS variables in `src/app/globals.css` for both light and dark modes
- Animations: Use `motion.div` with `initial`, `animate`, `transition` props from Framer Motion</content>
<parameter name="filePath">d:\WORKSPACE\FIVERR\Projects\frontend\portfolio\.github\copilot-instructions.md