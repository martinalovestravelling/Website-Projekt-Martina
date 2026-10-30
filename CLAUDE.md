# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

`index.html` and `styles.css` implement a short landing page (new design, 2026-10-28) with the CSS-only EN/DE toggle and placeholder sections; the full Briefing.md 4.1–4.10 content now belongs on a future "About Me" subpage (not built yet, see `design.md`). The previous full one-pager is kept as `index-old.html` / `styles-old.css` / `design-old.md` for reference. There is no build system, package manager, linter, or test suite to run; none should be introduced, per the tech spec (see below).

A FAQ chat widget (`chat-widget.js`) has been added as a scoped, documented exception to the no-JavaScript rule — see `tech-spec.md` ("Chat-Widget-Ausnahme") and the `/chatbot/` folder (knowledge base, Cloudflare Worker backend, setup checklist). It is the only JavaScript on the site and the only thing that talks to an external backend; everything else stays static.

A new "Erste Schritte" ("Getting Started") nav item links to `erste-schritte.html`, a hub page for short, standalone decision-aid tools (more are planned). The first one, `erste-schritte-servicemodelle.html` (SaaS/PaaS/IaaS/self-hosted + Public/Private/Hybrid/On-Premise decision aid), was adapted from a user-provided interactive Claude artifact that originally used JavaScript; per the user's explicit decision (2026-10-30), it was rebuilt CSS-only — radio-button tab hacks plus native `<details>`/`<summary>` for the branching wizard — so it needed no second JavaScript exception. The second, `erste-schritte-ki-anbieter.html` (AI tool comparison: ChatGPT/Claude/Gemini/Copilot/Perplexity/Mistral — pricing, credits, integration, privacy, scenario recommendations), was adapted from a second user-provided artifact that was already static (no JS). It links out to Arena/lmarena.ai for live model rankings rather than embedding it — the user chose an outbound link over an iframe, since Arena has no official embed/API and an iframe would load third-party content (and leak visitor IPs to it) on every page view, the same privacy concern already avoided for Google Fonts. The "AI Assistants" tile in the Werkzeugkasten section on `index.html` now links to this page instead of being purely decorative, to avoid duplicating tool details in two places. Both decision-aid pages' content is German-only for now (clearly marked, by the user's explicit decision), unlike the rest of the bilingual site; see design.md, "Erste Schritte".

## Document Map

Read these in this order to understand the project; each builds on the previous one:

1. **`Briefing.md`** — the source of truth for all page content (bio, industries, experience, skills, tools, certifications, education, languages) in English and German, plus the mandatory privacy rules.
2. **`PRD.md`** — goal, target audience, non-goals, assumptions, and testable acceptance criteria derived from the briefing.
3. **`tech-spec.md`** — the technical approach derived from the PRD.
4. **`design.md`** — page structure and design tokens (colors, typography) derived from the PRD and tech spec.

## Critical Constraints

- **No hallucinated content.** Only use content that the user has explicitly provided (currently: `Briefing.md`). Never invent bios, skills, project descriptions, testimonials, or other factual content. If something needs to be added that isn't already given, ask the user first.
- **No personal data on the page**, per `Briefing.md`: no name, photo, date of birth, phone number, email address, postal address, place of residence, employer names, university names, or references to specific job applications/target companies. Employers are described only by industry/type. **Exception (see `Briefing.md` Section 2):** the first name "Martina" and the city "Munich/München" are approved to appear; everything else on this list stays excluded.
- **Static only, no framework, no build step, no JavaScript — except the chat widget.** Per `tech-spec.md`, the site must be plain HTML and CSS so it runs directly on GitHub Pages. The EN/DE language toggle must be implemented with a CSS-only checkbox hack (hidden `<input type="checkbox">` + `<label>`, visibility controlled via `:checked` and sibling selectors), not JavaScript. Every piece of text exists twice in the HTML (`.lang-en` / `.lang-de` classes), with English visible by default. The one deliberate exception is `chat-widget.js` (the FAQ chat bubble), documented in `tech-spec.md` under "Chat-Widget-Ausnahme" — don't use it as precedent for adding JavaScript elsewhere on the page.
- **Placeholder sections stay placeholders.** The "Arbeitsproben" (work samples) section and the contact link (LinkedIn) must be visibly marked as placeholders until the user supplies real content/URLs — do not fabricate sample projects or a real LinkedIn URL.
- **Color and font tokens are fixed CSS custom properties**, defined in `design.md`: two house colors (`--color-brand-primary`, `--color-brand-secondary`) plus neutral support tokens, and a dependency-free sans-serif font stack (`--font-sans`). Use these token names consistently rather than hardcoding color/font values.

## Acceptance Criteria

`PRD.md` lists testable acceptance criteria (no personal data present, English-first on load, toggle switches all section text, all Briefing.md sections 4.1–4.10 represented, placeholder sections clearly marked, no build/server required, no references/testimonials section yet). Any implementation work should be checked against these directly.
