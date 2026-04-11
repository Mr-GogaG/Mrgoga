# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Identity

**G0GA 3D** is a premium AI agency website owned by **Mrgoga (CEO)**. It is a client-facing, revenue-generating product — not a demo or experiment. Every change must reflect a professional, high-end brand targeting businesses in USA, UK, Canada, Europe, and Middle East.

**Business goal:** Convert website visitors into paying clients via the contact form, WhatsApp, and the AI chat widget.

**Live URL:** https://g0ga.vercel.app
**Repository:** https://github.com/Mr-GogaG/Mrgoga
**Contact:** gogamr0.01@gmail.com · WhatsApp: +923091989556

---

## Tech Stack

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| UI Framework | React | 18 | Component model, ecosystem |
| Build Tool | Vite | 5 | Fast HMR, simple config |
| 3D Engine | Three.js | 0.160 | WebGL abstraction |
| React 3D | @react-three/fiber | 8 | Declarative Three.js |
| 3D Helpers | @react-three/drei | 9 | Stars, Float, MeshDistortMaterial |
| Animation | Framer Motion | 11 | `whileInView` scroll triggers |
| Styling | Tailwind CSS | 3 | Utility-first, custom tokens |
| Icons | Lucide React | latest | Consistent icon set |
| AI Backend | Groq API (Llama 3.1) | — | Free tier, fast inference |
| Deployment | Vercel | — | Auto-deploy from GitHub main |

**Runtime:** Node.js serverless (Vercel `api/` folder)
**Language:** JavaScript (JSX for React components, ES Modules)
**No TypeScript** — do not add it without asking.

---

## Architecture

### Why This Structure Exists
- **Single-page app** with no router — all sections stack vertically, nav scrolls to anchors.
- **No backend or database** — leads saved to `localStorage`, chat history in `localStorage`.
- **`api/` folder** — Vercel serverless functions only. Currently only `api/chat.js` (Groq AI).
- **One Canvas, rest CSS 3D** — WebGL is expensive. Only `HeroScene.jsx` uses `@react-three/fiber`. All other "3D" effects (flip cards, pricing cubes) are pure CSS `perspective`/`transform-style: preserve-3d`. This is intentional for performance.
- **Content in one place** — `src/data/content.js` is the single source of truth for all visible text, prices, and data. Components read from it. Exception: `Calculator.jsx` has its own hardcoded `svcs[]` array that must be kept in sync manually.

### Section Order (App.jsx)
`Navbar → Hero → Services → Portfolio → Pricing → Calculator → Team → Testimonials → Contact → Footer → ChatWidget`

### Color System
Actual Tailwind tokens (defined in `tailwind.config.js`):
- `teal` = `#10b981` — primary accent, CTAs, highlights
- `teal2` = `#34d399` — gradient endpoint, secondary accent
- `emerald` = `#10b981` — same as teal (legacy token)
- `card` = `#0f0f0f` — card backgrounds
- `card2` = `#1a1a1a` — inputs, secondary surfaces

CSS gradient: `linear-gradient(135deg, #10b981, #34d399)`
RGBA equivalent: `rgba(16,185,129,...)` — use this for opacity variants.

### AI Chat Widget Architecture
- `ChatWidget.jsx` — React UI, calls `POST /api/chat` via `fetch`
- `api/chat.js` — Vercel serverless, calls Groq API (Llama 3.1-8b-instant)
- Env var: `GROQ_API_KEY` (set in Vercel dashboard — production only)
- History: last 6 messages sent for context
- Fallback: `localStorage` key `g0ga_chat` logs all user messages
- Leads: Contact form → `localStorage` key `g0ga_leads`

---

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server → http://localhost:5173
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
```

> **Note:** `npm run dev` does NOT serve `api/` serverless functions. The AI chat widget will not work on localhost unless you run `vercel dev` (requires Vercel CLI: `npm i -g vercel`).

### Deployment
```bash
vercel --prod        # Deploy to production (Vercel CLI required)
git push origin main # Auto-deploys via Vercel GitHub integration
```

---

## Content Management Rules

### The Golden Rule
**Edit `src/data/content.js` first.** It exports: `services[]`, `portfolio[]`, `pricing[]`, `team[]`, `testimonials[]`, `chatResponses{}`.

### Known Exceptions (must update separately)
| What | Extra file to update |
|------|---------------------|
| Service prices | `src/components/Calculator.jsx` → `svcs[]` |
| WhatsApp number | `Contact.jsx` + `Footer.jsx` + `content.js` |
| Social links | `Contact.jsx` socials array + `Footer.jsx` socials array |
| AI chat persona | `api/chat.js` → `SYSTEM_PROMPT` constant |

### Chat Responses
`chatResponses{}` in `content.js` is legacy keyword-matching (kept as fallback). The real AI responses now come from Groq via `api/chat.js`. Update `SYSTEM_PROMPT` in `api/chat.js` when business info changes.

---

## Coding Conventions

- **ES Modules** everywhere (`import`/`export`). No `require()`.
- **Inline styles** for dynamic colors (e.g. `style={{ color: s.color }}`). Static colors use Tailwind classes.
- **Animation pattern** — all scroll-triggered animations use Framer Motion `whileInView` with `viewport={{ once: true }}`. See `Services.jsx` for reference.
- **No new npm packages** without asking the user first.
- **No TypeScript**, no ESLint config, no Prettier config — project has none.

---

## Agent Rules

1. **Never hardcode content in components** — use `src/data/content.js`. Exception: `Calculator.jsx`.
2. **Never modify `HeroScene.jsx`** unless explicitly asked — it is performance-sensitive WebGL code.
3. **Never commit API keys** — they go in Vercel environment variables only.
4. **When updating colors**, replace ALL occurrences: hex values AND their `rgba()` equivalents. Search for both `#10b981` and `rgba(16,185,129,`.
5. **When updating WhatsApp or email**, check `content.js`, `Contact.jsx`, and `Footer.jsx` — all three must match.
6. **Do not add features** beyond what was asked. This is a live client site.
7. **After editing `api/chat.js`**, always redeploy: `vercel --prod` or `git push origin main`.
8. **CSS class names** come from Tailwind tokens or custom classes in `src/index.css`. Check existing classes before adding inline styles.

---

## Common Tasks

**Add a new service:**
→ `content.js → services[]` + `Calculator.jsx → svcs[]` + update `api/chat.js → SYSTEM_PROMPT`

**Change pricing:**
→ `content.js → pricing[]` + `content.js → services[n].priceFrom/priceTo` + `Calculator.jsx → svcs[]`

**Update AI assistant knowledge:**
→ `api/chat.js → SYSTEM_PROMPT` → `git push origin main`

**Change Hero 3D shape:**
→ `HeroScene.jsx → <MainShape>` — swap `<torusKnotGeometry>` for any Three.js geometry

**Add portfolio case study:**
→ `content.js → portfolio[]` — `Portfolio.jsx` auto-renders from array

---

## Environment Variables (Vercel)

| Variable | Purpose | Where set |
|----------|---------|-----------|
| `GROQ_API_KEY` | AI chat (Llama 3.1 via Groq) | Vercel dashboard → Production |

To update: `vercel env rm GROQ_API_KEY production --yes && vercel env add GROQ_API_KEY production --value "gsk_..." --yes && vercel --prod`

---

## What NOT to Do

- Do not add a database or backend — this is intentionally static + serverless.
- Do not use `create-react-app` patterns — this is Vite.
- Do not add Redux, Context API, or state managers — component-level `useState` is sufficient.
- Do not add a router — single-page scroll is the intentional UX.
- Do not add loading spinners to the 3D hero — `Suspense fallback={null}` is intentional (avoids flash).
- Do not use `var` or CommonJS `require()`.

---

## Owner
**Mrgoga** · gogamr0.01@gmail.com · WhatsApp: +923091989556
