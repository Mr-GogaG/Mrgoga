---
name: ai-chat-update
description: Update the AI chat assistant — system prompt, personality, knowledge, or switch AI provider
triggers:
  - "update ai"
  - "change assistant"
  - "train chat"
  - "update system prompt"
  - "change ai model"
---

# AI Chat Update Skill

## Architecture
```
ChatWidget.jsx (React UI)
    ↓ POST /api/chat
api/chat.js (Vercel serverless)
    ↓ REST API call
Groq API → llama-3.1-8b-instant (FREE)
```

## Update AI Knowledge
Edit `api/chat.js → SYSTEM_PROMPT` constant.
Include: services, prices, contact info, tone rules.
Keep it under 500 words for best performance.

## Change AI Model
In `api/chat.js`, update the `model` field:
- `llama-3.1-8b-instant` — fastest, free (current)
- `llama-3.3-70b-versatile` — smarter, still free on Groq
- `mixtral-8x7b-32768` — good for long context

## Switch AI Provider
| Provider | Key prefix | Free? |
|---|---|---|
| Groq | `gsk_...` | YES — 14,400 req/day |
| Anthropic | `sk-ant-...` | No (pay per use) |
| xAI Grok | `xai-...` | No (pay per use) |

## Deploy after any change
```bash
git add api/chat.js
git commit -m "update: AI system prompt / model"
git push origin main
```
Then update Vercel env var if API key changed:
```bash
vercel env rm GROQ_API_KEY production --yes
vercel env add GROQ_API_KEY production --value "gsk_..." --yes
vercel --prod
```
