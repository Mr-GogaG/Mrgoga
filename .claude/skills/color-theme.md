---
name: color-theme
description: Change the website color theme or accent color across all files
triggers:
  - "change color"
  - "update theme"
  - "change accent"
  - "new color scheme"
---

# Color Theme Change Skill

## Current Colors
| Token | Hex | RGBA | Usage |
|---|---|---|---|
| Primary | `#10b981` | `rgba(16,185,129,` | Buttons, links, accents |
| Secondary | `#34d399` | `rgba(52,211,153,` | Gradient endpoint |
| Background | `#000000` | — | Page bg |
| Card | `#0f0f0f` | — | Card bg |
| Card2 | `#1a1a1a` | — | Inputs |

## Files to Update (ALL must change together)
1. `src/index.css` — CSS variables + utility classes
2. `tailwind.config.js` — token values
3. `src/data/content.js` — service/pricing `color` fields
4. All `src/components/*.jsx` — hardcoded hex values

## Search Strings to Replace
```
Find: #10b981  →  Replace with: NEW_COLOR
Find: #34d399  →  Replace with: NEW_GRADIENT_END
Find: rgba(16,185,129,  →  Replace with: rgba(R,G,B,
Find: rgba(52,211,153,  →  Replace with: rgba(R,G,B,
```

## Process
1. Pick new primary color (e.g. `#6366f1` purple)
2. Pick gradient end (lighter shade, e.g. `#818cf8`)
3. Calculate rgba: use hex-to-rgb converter
4. Run replace-all in each file in order listed above
5. Run `npm run dev` and verify visually
6. Deploy: `git add -A && git commit -m "style: update color theme" && git push`
