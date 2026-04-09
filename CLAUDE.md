# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**G0GA 3D** is a premium React + Vite AI agency website with Three.js 3D visuals, Framer Motion animations, and Tailwind CSS. It targets clients in USA, UK, Canada, and Europe. Single-page app, no backend, all data in localStorage.

## Commands

```bash
npm install          # Install all dependencies
npm run dev          # Start dev server at localhost:5173
npm run build        # Production build → dist/
npm run preview      # Preview production build
```

## File Structure

```
g0ga-3d/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx            ← ReactDOM root
    ├── App.jsx             ← Section order / layout
    ├── index.css           ← Global styles, Tailwind, utilities
    ├── data/
    │   └── content.js      ← ALL editable content (services, portfolio, pricing, team, chat)
    └── components/
        ├── HeroScene.jsx   ← Three.js canvas (TorusKnot + particles + grid + stars)
        ├── Navbar.jsx      ← Fixed nav, mobile menu
        ├── Hero.jsx        ← Full-screen hero with lazy 3D canvas
        ├── Services.jsx    ← CSS 3D flip cards (5 services)
        ├── Portfolio.jsx   ← 4 project cards + modal
        ├── Pricing.jsx     ← 4 pricing tiers with 3D visuals
        ├── Calculator.jsx  ← Interactive price calculator
        ├── Team.jsx        ← CEO + 4 AI agents with animated avatars
        ├── Testimonials.jsx← Grid (desktop) + carousel (mobile)
        ├── Contact.jsx     ← Booking form + social links
        ├── ChatWidget.jsx  ← Floating AI chat (bottom-right)
        └── Footer.jsx      ← CTA banner + links + socials
```

## Architecture

### Tech Stack
| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| Vite | 5 | Build tool / dev server |
| Three.js | 0.160 | 3D engine |
| @react-three/fiber | 8 | React renderer for Three.js |
| @react-three/drei | 9 | Three.js helpers (Stars, Float, MeshDistortMaterial) |
| Framer Motion | 11 | Page animations, `whileInView` scroll triggers |
| Tailwind CSS | 3 | Utility styling |
| Lucide React | latest | Icons |

### 3D Strategy
- **HeroScene** — Only section using WebGL (`@react-three/fiber` Canvas). Contains rotating TorusKnot, particle cloud, grid helper, and Stars. Lazy-loaded via `React.lazy` + `Suspense`.
- **All other sections** — CSS `perspective` / `transform-style: preserve-3d` / `backface-visibility` for 3D effects. More performant than WebGL for multiple cards.
- The hero Canvas has `alpha: true` and `pointer-events: none` so HTML content overlays it.

### Color Palette (custom Tailwind tokens)
| Token | Value | Usage |
|-------|-------|-------|
| `navy` | `#0F172A` | Primary background |
| `charcoal` | `#1F2937` | Cards, inputs |
| `cyan` | `#06B6D4` | Primary accent, CTAs |
| `violet` | `#8B5CF6` | Secondary accent |
| `chrome` | `#E5E7EB` | Chrome elements |

Gradient `bg-grad-cv` = `linear-gradient(135deg, #06B6D4, #8B5CF6)`.

### Content Updates
**All content lives in `src/data/content.js`**. Edit there first, then verify any hardcoded values in components match.

Key exports from `content.js`:
- `services[]` — 5 services with prices, features, delivery, color, shape
- `portfolio[]` — 4 case studies with results and accent colors
- `pricing[]` — 4 tiers with features and CTAs
- `team[]` — CEO + 4 AI agents with skills
- `testimonials[]` — 4 client quotes
- `chatResponses{}` — keyword → response string map for the chat widget

### Chat Widget
Keyword matching in `ChatWidget.jsx` → `getBotReply()`. Iterates `chatResponses` keys, returns first match, falls back to `default`. All conversations saved to `localStorage` key `g0ga_chat`.

### Lead Storage
Contact form submissions → `localStorage` key `g0ga_leads` (JSON array). To inspect: open DevTools → Application → Local Storage.

### Animations Pattern
All scroll-triggered animations use Framer Motion's `whileInView`:
```jsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.1 }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
>
```

## Common Edits

**Add a new service:**
1. Add to `content.js` → `services[]`
2. The grid in `Services.jsx` auto-renders from the array

**Change pricing:**
1. Edit `content.js` → `pricing[]` and/or `services[n].priceFrom / priceTo`
2. Update `Calculator.jsx` → `serviceBase[]` to match

**Change WhatsApp number:**
Search `wa.me/923001234567` in all files — 3 occurrences (`Contact.jsx`, `Footer.jsx`). Update `content.js` → `company.whatsapp` too.

**Update social media links:**
Edit `Contact.jsx` socials array and `Footer.jsx` socials array. Both need updating.

**Modify chat responses:**
Edit `content.js` → `chatResponses{}`. Keys are substring matches on lowercased user input.

**Change 3D shape in Hero:**
In `HeroScene.jsx` → `<MainShape>`, swap `<torusKnotGeometry>` for any Three.js geometry (`icosahedronGeometry`, `octahedronGeometry`, etc.)

## Deployment

```bash
npm run build    # Creates dist/ folder
```
Deploy `dist/` folder to:
- **Vercel**: `vercel --prod` or drag `dist/` to vercel.com/new
- **Netlify**: Drag `dist/` to app.netlify.com/drop

The build is a fully static SPA. No server needed.

## Performance Notes
- Three.js Canvas is lazy-loaded — doesn't block initial paint
- `whileInView` with `once: true` — animations fire once, no re-renders
- CSS 3D used for cards (not WebGL) — handles 20+ animated elements without lag
- `useMemo` used for particle buffer geometry — recalculates only once

## Owner
CEO: **Mrgoga** · WhatsApp: `wa.me/923001234567`
