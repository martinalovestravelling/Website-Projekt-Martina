# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

`index.html` and `styles.css` implement a landing page (new design, 2026-10-28; expanded 2026-11-02) with the CSS-only EN/DE toggle and placeholder sections. A condensed "About Me" section now lives directly on `index.html` (`#about`, added 2026-11-02 — see below); the *full* Briefing.md 4.3–4.10 detail tables (complete experience table, international experience, full skills table, tools, education, languages) are still not on the page and remain a possible future "About Me" subpage expansion, see `design.md`. The previous full one-pager is kept as `index-old.html` / `styles-old.css` / `design-old.md` for reference. There is no build system, package manager, linter, or test suite to run; none should be introduced, per the tech spec (see below).

A FAQ chat widget (`chat-widget.js`) has been added as a scoped, documented exception to the no-JavaScript rule — see `tech-spec.md` ("Chat-Widget-Ausnahme") and the `/chatbot/` folder (knowledge base, Cloudflare Worker backend, setup checklist). It is the only JavaScript on the site and the only thing that talks to an external backend; everything else stays static.

Three decision-aid pages exist (`erste-schritte.html` hub, `erste-schritte-servicemodelle.html`, `erste-schritte-ki-anbieter.html`) but are **no longer part of the public site as of 2026-11-02**: the user decided they no longer fit the new "AI Transformation & Enablement" positioning (see below) and moved them to internal-only status — removed from all nav menus and from the Werkzeugkasten "AI Assistants" tile, marked `<meta name="robots" content="noindex, nofollow">`, reachable only via direct URL. **Important caveat (communicated to and accepted by the user):** on GitHub Pages this means "unindexed/unlinked", not "actually private" — any unlinked file in a public repo is still served to anyone who has the exact URL. `erste-schritte-servicemodelle.html` (SaaS/PaaS/IaaS/self-hosted + Public/Private/Hybrid/On-Premise decision aid) was adapted from a user-provided interactive Claude artifact that originally used JavaScript; per the user's explicit decision (2026-10-30), it was rebuilt CSS-only — radio-button tab hacks plus native `<details>`/`<summary>` for the branching wizard — so it needed no second JavaScript exception. `erste-schritte-ki-anbieter.html` (AI tool comparison: ChatGPT/Claude/Gemini/Copilot/Perplexity/Mistral — pricing, credits, integration, privacy, scenario recommendations) was adapted from a second user-provided artifact that was already static (no JS); it links out to Arena/lmarena.ai for live model rankings rather than embedding it, for the same privacy reasoning already applied to Google Fonts. Both decision-aid pages' content remains German-only, clearly marked; see design.md, "Erste Schritte — jetzt intern".

**AI Transformation & Enablement (added 2026-11-02):** per the user's request, content from three user-provided documents (`Offering webseite_V2_Martina_Hanner_Claude_Code.md`, `Personal_Branding_AI_Transformation_Enablement.md`, `Superprompt_AI_Consulting_Website_HTML_Download.md`) was integrated into `index.html` as five new sections between the existing "Leistungen"/Services section (kept unchanged, as the user explicitly asked) and "Werkzeugkasten": Starting Point (`#starting-point`), Capabilities (`#capabilities`, the former "Portfolio" concept — renamed to avoid clashing with the site's existing, still-placeholder "Portfolio" work-samples tile), AI Transformation Accelerator teaser (`#accelerator`, links to the new `accelerator.html` subpage for all 11 modules), Delivery Models (`#delivery`), and About Me (`#about`, condensed bio/experience/roles/industries/certifications sourced from Briefing.md). The source documents' own Navy/Mint/Teal color palette and Inter typeface were **not** adopted — the user asked to keep the site's existing design tokens throughout. The source documents also named two employers directly ("Accenture", "IABG"); these were anonymized to the existing established phrasing ("global management consultancy" / "technology & engineering services company") rather than carried over literally, since the no-personal-data rule below only has an approved exception for the full name, not for employer names. See design.md, "AI Transformation & Enablement", for full details.

**Navigation restructuring (same day, after user review):** `index.html`'s top nav is now Home →
Discover (CSS-only dropdown: Skills & Capabilities, Services) → Offering (CSS-only dropdown:
Starting Point, Accelerator, Delivery) → Portfolio → Tools → About Me → News, and the header is now
`position: sticky` so it stays visible while scrolling. The physical section order on the page was
reordered to match (Capabilities now precedes Services; About Me now follows Tools), with no content
deleted — only numbering/wording tweaked for consistency (see design.md, "Navigation umstrukturiert").
The approved portrait photo (`Foto.webp`) was supplied and is now used in the header next to the
brand name. This restructuring was applied to `index.html` only, per the user's explicit scope
("auf der allerersten Seite") — `accelerator.html` and the three internal decision-aid pages still
use the old nav/logo-placeholder header and are candidates for a future follow-up pass.

**Second correction pass (same day, after visual review):** fixed a real bug — `.site-nav`'s
`overflow-x: auto` was implicitly forcing `overflow-y` to `auto` too (per the CSS overflow spec),
which clipped the dropdown submenu and produced a stray scrollbar; fixed by switching to
`flex-wrap: wrap` and removing the overflow rule entirely. Sticky behavior was also corrected: only
`.header-top` (logo, name, contact button, language toggle) is sticky now, not the whole header —
the nav row scrolls away normally underneath it, so only the logo/name bar stays pinned while
scrolling, matching the user's intent. Nav groups changed again: Tools moved under Offering
(alongside Starting Point, Accelerator, Delivery); Services moved under About Me. The physical
section order was adjusted to match (Services now sits at the very end, right before Contact). The
"Portfolio" overview tile was renamed to "Offering" (From Assessment to AI Adoption) and activated;
the "Skills" tile was renamed to "Skills & Capabilities" and activated; the "Portfolio" nav item now
points at the general overview section since it no longer has its own preview tile. The hero's
background-photo placeholder was replaced with a real image (`hintergrundbild.png`, a generic
AI/business stock illustration — no identifiable faces or names, reviewed for the no-personal-data
rule before use). See design.md, "Navigation & Header, zweite Korrekturrunde", for full details.

## Document Map

Read these in this order to understand the project; each builds on the previous one:

1. **`Briefing.md`** — the source of truth for all page content (bio, industries, experience, skills, tools, certifications, education, languages) in English and German, plus the mandatory privacy rules.
2. **`PRD.md`** — goal, target audience, non-goals, assumptions, and testable acceptance criteria derived from the briefing.
3. **`tech-spec.md`** — the technical approach derived from the PRD.
4. **`design.md`** — page structure and design tokens (colors, typography) derived from the PRD and tech spec.

## Critical Constraints

- **No hallucinated content.** Only use content that the user has explicitly provided (currently: `Briefing.md`). Never invent bios, skills, project descriptions, testimonials, or other factual content. If something needs to be added that isn't already given, ask the user first.
- **No personal data on the page**, per `Briefing.md`: no name, photo, date of birth, phone number, email address, postal address, place of residence, employer names, university names, or references to specific job applications/target companies. Employers are described only by industry/type. **Exception (see `Briefing.md` Section 2):** the full name "Martina Hanner" and the city "Munich/München" are approved to appear (extended from first-name-only on 2026-11-02); a professional portrait photo is also approved in principle but not yet supplied. Everything else on this list — in particular employer names — stays excluded, even when a user-supplied source document names one directly.
- **Static only, no framework, no build step, no JavaScript — except the chat widget.** Per `tech-spec.md`, the site must be plain HTML and CSS so it runs directly on GitHub Pages. The EN/DE language toggle must be implemented with a CSS-only checkbox hack (hidden `<input type="checkbox">` + `<label>`, visibility controlled via `:checked` and sibling selectors), not JavaScript. Every piece of text exists twice in the HTML (`.lang-en` / `.lang-de` classes), with English visible by default. The one deliberate exception is `chat-widget.js` (the FAQ chat bubble), documented in `tech-spec.md` under "Chat-Widget-Ausnahme" — don't use it as precedent for adding JavaScript elsewhere on the page.
- **Placeholder sections stay placeholders.** The "Arbeitsproben" (work samples) section and the contact link (LinkedIn) must be visibly marked as placeholders until the user supplies real content/URLs — do not fabricate sample projects or a real LinkedIn URL.
- **Color and font tokens are fixed CSS custom properties**, defined in `design.md`: two house colors (`--color-brand-primary`, `--color-brand-secondary`) plus neutral support tokens, and a dependency-free sans-serif font stack (`--font-sans`). Use these token names consistently rather than hardcoding color/font values.

## Acceptance Criteria

`PRD.md` lists testable acceptance criteria (no personal data present, English-first on load, toggle switches all section text, all Briefing.md sections 4.1–4.10 represented, placeholder sections clearly marked, no build/server required, no references/testimonials section yet). Any implementation work should be checked against these directly.
