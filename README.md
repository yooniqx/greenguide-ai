# 🌿 GreenGuide AI

> **Smarter Choices for a Greener Tomorrow.**
>
> An AI-powered sustainability companion that turns everyday questions and images into clear, on-demand environmental guidance.

<!-- Banner placeholder -->
<p align="center">
  <img src="docs/banner.png" alt="GreenGuide AI banner" width="100%" />
</p>

---

## 📖 Project Overview

**GreenGuide AI** is a web application that helps individuals make more environmentally responsible decisions. Users can ask sustainability questions in natural language, or upload an image of an item, and receive AI-generated guidance covering waste classification, carbon impact, energy and water saving suggestions, and eco-friendly alternatives.

The experience is intentionally designed to feel like a premium AI product — calm, focused, and free of gimmicks such as accounts, gamification, or dashboards of fabricated metrics. Every recommendation is generated on demand from the user's input; nothing is stored.

Built by **Yooniq Forge** for the **Gen AI Academy APAC Hackathon**.

---

## 🌍 Problem Statement

Most people want to live more sustainably, but the biggest barrier isn't willingness — it's **clarity**. Environmental information is scattered, technical, and rarely tailored to the specific decision a person is trying to make right now: *Which bin does this go in? Is this alternative actually better? How do I reduce my electricity use this month?*

The result is decision fatigue and inaction.

---

## 💡 Solution

GreenGuide AI acts as an accessible sustainability co-pilot:

- Users type a question **or** upload an image of an item.
- The assistant interprets the input and generates plain-language guidance grounded in publicly available sustainability knowledge.
- No login, no account, no stored history — each interaction is fresh.

The interface is designed to feel warm, calm, and nature-inspired (lotus and lily-pad aesthetic) rather than clinical.

---

## ✨ Features

- 💬 **AI Sustainability Chat** — Ask any eco-related question.
- 🖼️ **Image Upload UI** — Drag-and-drop image upload with preview and file details. Real AI image analysis (waste category, environmental impact, disposal method, eco recommendations) is planned as future scope pending Gemini Vision API integration — the current build does not fabricate results for uploaded images.
- ♻️ **Waste Classification** — Understand the correct disposal stream.
- 🌬️ **Carbon Impact Estimation** — Get a plain-language sense of a choice's footprint.
- ⚡ **Energy Saving Suggestions** — Practical, low-effort ideas for reducing electricity use.
- 💧 **Water Conservation Advice** — Small habits that add up.
- 🌱 **Eco-friendly Alternatives** — Greener substitutes for everyday items.
- 🛍️ **Sustainable Shopping Tips** — What to look for on labels and materials.
- 📍 **Local Recycling Guidance** — General guidance on how items are typically routed.
- 📄 **Sustainability Report Summary** — Turn a topic into a short brief.

---

## 🖼️ Screenshots

<!-- Add real screenshots after capture -->

| Home | AI Assistant | Insights |
| :---: | :---: | :---: |
| _screenshot placeholder_ | _screenshot placeholder_ | _screenshot placeholder_ |

---

## 🏗️ Architecture Overview

GreenGuide AI is a single-page, statically-served web application built on TanStack Start (React 19 + Vite). The UI layer is fully decoupled from any specific AI provider so the AI backend can be swapped in without redesign.

```text
 ┌──────────────────────────┐
 │   User (Browser / Mobile) │
 └────────────┬─────────────┘
              │  question / image
              ▼
 ┌──────────────────────────┐
 │   GreenGuide AI Frontend │   TanStack Start + React 19 + Tailwind v4
 │   (this repository)      │
 └────────────┬─────────────┘
              │  prompt / image (planned)
              ▼
 ┌──────────────────────────┐
 │   AI Reasoning Layer     │   Pluggable — designed to integrate with
 │   (planned integration)  │   a Gen AI provider such as Gemini API.
 └────────────┬─────────────┘
              │  generated guidance
              ▼
 ┌──────────────────────────┐
 │   Rendered Insight Card  │
 └──────────────────────────┘
```

Current build ships with mock AI responses so the full interaction flow is demonstrable end-to-end without external credentials.

---

## 🔄 Workflow

1. **Ask or Upload** — user types a question or uploads an image.
2. **AI Interprets** — the assistant identifies context and category.
3. **Generate Insight** — a response is composed dynamically.
4. **Act on It** — the user uses the recommendation as one input into their own decision.

---

## 🧰 Tech Stack

- **Framework:** TanStack Start v1 (React 19, Vite 7)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + custom OKLCH design tokens
- **UI Primitives:** shadcn/ui (Radix), lucide-react icons
- **Charts:** recharts
- **Notifications:** sonner
- **Package Manager:** bun

---

## 📁 Folder Structure

```text
greenguide-ai/
├── src/
│   ├── components/
│   │   ├── greenguide/
│   │   │   ├── AiChat.tsx          # Conversational AI UI
│   │   │   ├── ImageAnalysis.tsx   # Image upload + analysis UI
│   │   │   ├── Logo.tsx            # Brand mark
│   │   │   └── decor.tsx           # Lotus / leaf SVG decorations
│   │   └── ui/                     # shadcn/ui primitives
│   ├── routes/
│   │   ├── __root.tsx              # Root layout + head metadata
│   │   └── index.tsx               # Home page (all sections)
│   ├── lib/                        # Utilities
│   ├── styles.css                  # Tailwind v4 theme + tokens
│   └── router.tsx
├── package.json
└── README.md
```

---

## ⚙️ Installation

**Prerequisites:** Node.js 20+ and [bun](https://bun.sh/).

```bash
git clone <your-fork-url>
cd greenguide-ai
bun install
```

---

## 🚀 Local Setup

Run the development server:

```bash
bun run dev
```

Then open the local URL printed in the terminal.

Build for production:

```bash
bun run build
```

Preview the production build:

```bash
bun run preview
```

---

## 🔐 Environment Variables

The current build has no required environment variables — all AI responses are mocked client-side for demo purposes.

When integrating a real Gen AI provider in the future, a variable such as `AI_API_KEY` would be added and consumed via a server function. Do not commit secrets to the repository.

---

## 🔮 Future Scope

- Integrate a real Gen AI provider (e.g. Gemini) for live text and image reasoning.
- Add voice input for hands-free eco questions.
- Localized recycling guidance driven by user-supplied region.
- Multi-language support.
- Optional export of a generated insight as a shareable card.

---

## 📜 License

Released under the **MIT License**. See `LICENSE` for details.

Ownership, authorship and copyright belong exclusively to **Yooniq Forge**.

---

## 👥 Credits

**Project Owner:** Yooniq Forge
**Built for:** Gen AI Academy APAC Hackathon

**Team Leader**
Debopriya Bose — dbose0906@gmail.com

**Team Member**
Kumar Saket — exios343@gmail.com

**Development Tools**
- Lovable
- ChatGPT

---

## 📬 Contact

For questions about this project, please reach out to the team:

- Debopriya Bose — dbose0906@gmail.com
- Kumar Saket — exios343@gmail.com

---

## 🙏 Acknowledgements

- The Gen AI Academy APAC Hackathon organizers.
- The open-source communities behind React, TanStack, Tailwind CSS, shadcn/ui, and lucide-react.
- Everyone working to make sustainability information more accessible.
