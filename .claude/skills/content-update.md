---
name: content-update
description: Update any website content — services, pricing, portfolio, team, testimonials, chat AI knowledge
triggers:
  - "update content"
  - "change text"
  - "edit service"
  - "change price"
  - "update portfolio"
  - "add testimonial"
---

# Content Update Skill

## Step 1 — Identify what changed
| Content type | Primary file | Also update |
|---|---|---|
| Services | `src/data/content.js → services[]` | `Calculator.jsx → svcs[]` + `api/chat.js → SYSTEM_PROMPT` |
| Pricing tiers | `src/data/content.js → pricing[]` | `Calculator.jsx → svcs[]` |
| Portfolio | `src/data/content.js → portfolio[]` | — |
| Team | `src/data/content.js → team[]` | — |
| Testimonials | `src/data/content.js → testimonials[]` | — |
| Chat responses | `api/chat.js → SYSTEM_PROMPT` | — |
| WhatsApp number | `content.js` + `Contact.jsx` + `Footer.jsx` | All 3 must match |
| Email | `Contact.jsx` socials/info | `Footer.jsx` if present |

## Step 2 — Edit
Always edit `src/data/content.js` first. Then check the "Also update" column.

## Step 3 — Verify
Run `npm run dev` and visually confirm the change appears correctly.

## Step 4 — Deploy
```bash
git add -A
git commit -m "update: [describe what changed]"
git push origin main
```
Vercel auto-deploys from `main`. Live in ~30 seconds.
