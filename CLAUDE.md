# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

This repository currently contains only planning documents — no `index.html`, `styles.css`, or any code has been written yet. There is no build system, package manager, linter, or test suite to run; none should be introduced, per the tech spec (see below). The implementation step (writing `index.html` / `styles.css`) is still pending.

## Document Map

Read these in this order to understand the project; each builds on the previous one:

1. **`Briefing.md`** — the source of truth for all page content (bio, industries, experience, skills, tools, certifications, education, languages) in English and German, plus the mandatory privacy rules.
2. **`PRD.md`** — goal, target audience, non-goals, assumptions, and testable acceptance criteria derived from the briefing.
3. **`tech-spec.md`** — the technical approach derived from the PRD.
4. **`design.md`** — page structure and design tokens (colors, typography) derived from the PRD and tech spec.

## Critical Constraints

- **No hallucinated content.** Only use content that the user has explicitly provided (currently: `Briefing.md`). Never invent bios, skills, project descriptions, testimonials, or other factual content. If something needs to be added that isn't already given, ask the user first.
- **No personal data on the page**, per `Briefing.md`: no name, photo, date of birth, phone number, email address, postal address, place of residence, employer names, university names, or references to specific job applications/target companies. Employers are described only by industry/type.
- **Static only, no framework, no build step, no JavaScript.** Per `tech-spec.md`, the site must be plain HTML and CSS so it runs directly on GitHub Pages. The EN/DE language toggle must be implemented with a CSS-only checkbox hack (hidden `<input type="checkbox">` + `<label>`, visibility controlled via `:checked` and sibling selectors), not JavaScript. Every piece of text exists twice in the HTML (`.lang-en` / `.lang-de` classes), with English visible by default.
- **Placeholder sections stay placeholders.** The "Arbeitsproben" (work samples) section and the contact link (LinkedIn) must be visibly marked as placeholders until the user supplies real content/URLs — do not fabricate sample projects or a real LinkedIn URL.
- **Color and font tokens are fixed CSS custom properties**, defined in `design.md`: two house colors (`--color-brand-primary`, `--color-brand-secondary`) plus neutral support tokens, and a dependency-free sans-serif font stack (`--font-sans`). Use these token names consistently rather than hardcoding color/font values.

## Acceptance Criteria

`PRD.md` lists testable acceptance criteria (no personal data present, English-first on load, toggle switches all section text, all Briefing.md sections 4.1–4.10 represented, placeholder sections clearly marked, no build/server required, no references/testimonials section yet). Any implementation work should be checked against these directly.
