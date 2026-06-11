# SolidCalc

**Professional concrete and construction material calculators.**

A fully static, client-side calculator platform for construction professionals. Built with Astro and Tailwind CSS v4 following Apple-inspired design principles.

## Features

- **10 calculators**: Concrete volume, slab, footing, column, wall, stairs, cement, materials, mix design, unit converter
- **Client-side only**: All calculations run in-browser — zero page reloads, no server needed
- **Metric & Imperial**: Full unit conversion system with region presets (India, USA, UK, Canada, Australia)
- **SEO-optimized**: Structured data (JSON-LD), OG/Twitter cards, sitemap, breadcrumbs, FAQ schema on every page
- **Static generated**: 20 static MPA pages, ~556KB total build output
- **Accessible**: WCAG AA compliant, keyboard navigable, screen-reader friendly

## Tech Stack

| | |
|---|---|
| **Framework** | [Astro](https://astro.build) v5 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) v4 |
| **Icons** | [Lucide](https://lucide.dev) via astro-icon |
| **Language** | TypeScript |
| **Design** | Apple-inspired design system (DESIGN.md) |

## Getting Started

```bash
npm install
npm run dev        # dev server at localhost:4321
npm run build      # static build to dist/
npm run preview    # preview the build
```

## Project Structure

```
src/
├── components/     # Reusable Astro components (Header, Footer, CalculatorBase, etc.)
├── layouts/        # BaseLayout with SEO, GA, OG tags
├── lib/
│   ├── calculations/   # Client-side calculation engine (7 modules)
│   ├── client-calculator.ts  # Browser calculator binding
│   ├── i18n/         # Region-aware translations
│   ├── seo/          # Structured data generators
│   └── units/        # Unit conversion system
├── pages/           # 20 static pages
│   ├── guides/      # Knowledge base guides
│   └── *.astro      # Calculator and company pages
└── styles/          # Global CSS with design tokens
```

## Calculators

| Calculator | Page |
|---|---|
| Concrete Volume | `/concrete-calculator` |
| Slab | `/slab-calculator` |
| Footing | `/footing-calculator` |
| Column | `/column-calculator` |
| Wall | `/wall-calculator` |
| Stairs | `/stairs-calculator` |
| Cement Bags | `/cement-calculator` |
| Material Quantity | `/material-calculator` |
| Mix Design | `/mix-design-calculator` |
| Unit Converter | `/unit-converter` |

## License

MIT — see [LICENSE](./LICENSE).
