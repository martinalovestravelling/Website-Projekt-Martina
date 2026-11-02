# Website Version 2 – Martina Hanner · AI Transformation & Enablement

> Arbeitsauftrag für Claude Code (VS Code). Die Anweisungen sind auf Deutsch, alle Website-Texte auf Englisch.
> Repository: `Website-Projekt-Martina` (GitHub Pages)
> Live: https://martinalovestravelling.github.io/Website-Projekt-Martina/index.html

---

## 0. So arbeitest du (Claude Code)

1. Lies zuerst die bestehenden Dateien im Repo (`index.html`, `erste-schritte.html`, `erste-schritte-ki-anbieter.html`, CSS/JS, Bilder) und fasse kurz zusammen, wie sie aufgebaut sind.
2. Lege einen neuen Branch an: `website-v2`.
3. Setze die Änderungen gemäß diesem Dokument um. Verwende ausschließlich die Texte aus Abschnitt 4–6. Erfinde keine Inhalte, Referenzen, Zahlen oder Qualifikationen.
4. Bestehende Funktionen bleiben erhalten, sofern hier nicht anders beschrieben (insbesondere der Demo-Assistent und die beiden „Erste Schritte“-Seiten).
5. Zeige mir eine lokale Vorschau (z. B. `python3 -m http.server`), bevor du committest.
6. Commit und Push erst nach meiner Freigabe. Danach Merge in `main`, damit GitHub Pages aktualisiert.

---

## 1. Seitenstruktur

| Datei | Status | Sichtbarkeit |
|---|---|---|
| `index.html` | überarbeiten | öffentlich |
| `accelerator.html` | neu | öffentlich, verlinkt von der Startseite |
| `erste-schritte.html` | unverändert | öffentlich, im Menü als „Getting Started“ |
| `erste-schritte-ki-anbieter.html` | unverändert | öffentlich, verlinkt aus dem Toolkit |
| `internal.html` | neu | intern, nicht verlinkt |

**Wichtig zur internen Seite:** Auf GitHub Pages ist jede Datei im Repo öffentlich erreichbar, auch wenn sie nicht verlinkt ist. Bitte frag mich vor dem Anlegen, welche Variante ich möchte:
- **A:** `internal.html` mit `<meta name="robots" content="noindex, nofollow">`, nicht verlinkt (auffindbar für alle, die den Link kennen).
- **B:** Inhalt nicht ins öffentliche Repo, sondern nur lokal bzw. in einem privaten Repo ablegen.

---

## 2. Design-System

### Farben

| Token | HEX | Verwendung |
|---|---|---|
| `--navy` | `#10283C` | Headlines, Buttons, Navy-Sektionen |
| `--navy-deep` | `#0B2032` | dunkle Sektionen, Footer |
| `--white` | `#FFFFFF` | Grundfläche |
| `--grey-light` | `#F3F6F6` | Sekundärsektionen |
| `--text` | `#546572` | Fließtext |
| `--teal` | `#316F69` | Section Labels, Linien, Links |
| `--mint` | `#BDEBDC` | sparsamer Akzent, primärer Button auf Navy |
| `--line` | `#D7E0E4` | Linien und Rahmen |

### Typografie

- Schrift: Inter (Google Fonts, Gewichte 400/500/600/700) mit Fallback `system-ui, -apple-system, 'Segoe UI', sans-serif`.
- H1: 60 px, Zeilenhöhe 1.08, Gewicht 700, Letter-Spacing −0.02em (mobil ca. 38 px).
- H2: 42 px, Zeilenhöhe 1.15 (mobil ca. 30 px).
- Fließtext: 17 px, Zeilenhöhe 1.6.
- Section Labels: 13 px, Gewicht 600, Letter-Spacing 0.14em, Großbuchstaben, Farbe Teal (auf Navy: Mint), Format `01 — STARTING POINT`.

### Layout und Stil

- Container max. 1240 px, seitliches Padding 32 px, Sektions-Padding vertikal ca. 104 px.
- Wechsel aus weißen, hellgrauen und Navy-Sektionen.
- Gerade Kanten, dünne 1-px-Rahmen, keine Schatten, keine Verläufe, keine Emojis.
- Buttons: Primär Navy mit weißer Schrift (auf dunklem Grund: Mint mit Navy-Schrift), sekundär 1-px-Rahmen.
- Sticky Header mit weißem Hintergrund und Linie unten.
- Responsiv ab 360 px: Spalten stapeln untereinander, nichts wird abgeschnitten, keine horizontale Überbreite.
- Accessibility: sichtbare Fokuszustände, Kontrast mindestens 4.5:1, semantische Überschriften, Alt-Texte, `prefers-reduced-motion` respektieren.

### Bild

- Portrait von Martina (Schwarz-Weiß, aus dem CV) im Hero, rechts, ca. 460 × 560 px, `object-fit: cover`.
- Dateipfad: [INPUT REQUIRED – Portrait im Repo ablegen, z. B. `images/martina-portrait.jpg`].

---

## 3. Navigation (alle öffentlichen Seiten)

Header links: `MARTINA HANNER` (Wortmarke, Link zur Startseite)

Menü:
- Starting Point → `#starting-point`
- Portfolio → `#portfolio`
- Accelerator → `#accelerator`
- Delivery → `#delivery`
- About Me → `#about`
- Toolkit → `#toolkit`
- Getting Started → `erste-schritte.html`

Button rechts: **Let’s Talk** → `#contact`

Mobil: Burger-Menü mit korrektem `aria-expanded`. Der bisherige EN/DE-Umschalter entfällt vorerst (Website zunächst nur auf Englisch).

---

## 4. `index.html` – Inhalte

### Hero

- Label: `CHANGE, TOGETHER. — AI TRANSFORMATION & ENABLEMENT`
- H1: **From business challenge to sustainable AI adoption.**
- Unterzeile: **Understand the business. Shape AI. Embed change.**
- Text: I connect business, processes and technology to develop AI initiatives in a structured way — and enable people to use them sustainably.
- Klickbare Leiste aus drei Feldern (gesamte Leiste verlinkt auf `#accelerator`), das dritte Feld mit Mint-Hintergrund:
  - `01` **Business** – Understand the problem
  - `02` **Capability** – Apply AI with purpose
  - `03` **Adoption** – Enable people →
- Button: **Let’s Talk** → `#contact`
- Daneben Text: Modular & flexible · People-centered
- Rechts: Portrait

### Leiste unter dem Hero (Navy)

AI Management **+** Process Transformation **+** Enablement **+** Change (Pluszeichen in Mint)

### 01 — STARTING POINT (hellgrau)

- H2: **Where do you stand with AI?**
- Text: Whether you are just getting started or already have plenty of ideas: existing use cases are picked up. If there are none yet, we develop them together.

Zwei gleichwertige Cards:

**SEGMENT A — AI STARTER** · “Where do we start?”
- Little structured AI activity, few defined use cases
- First tool usage in place
- Uncertainty about governance, value and where to begin

**SEGMENT B — AI EXPLORER** · “What should we scale?”
- Many use case ideas, first pilots possible
- Missing prioritization and scaling, inconsistent governance
- Business value often not clearly measurable

### 02 — PORTFOLIO (weiß)

- H2: **Two pillars. One foundation.**
- Text: Two independent, combinable pillars — built on my experience from global transformation programs.

**PILLAR 1 — AI Management** (obere Kante Navy, 4 px)
Fokuszeile: Orient · Structure · Prioritize · Steer · Measure impact
- AI Strategy
- AI Portfolio Management
- AI Maturity Assessment
- Use Case Prioritization
- Governance & Responsible AI
- KPI & Value Management
- Tool & Vendor Evaluation

**PILLAR 2 — AI Transformation & Enablement** (obere Kante Teal, 4 px)
Fokuszeile: Understand processes · Implement · Enable · Embed change
- Process Analysis & AI Opportunity Identification
- Use Case Development
- Prompting & Tool Enablement
- Workflow Design
- Change Management & Adoption
- Training & Coaching
- Sustain & Scale

**FOUNDATION — Process Excellence & Transformation** (hellgraue Leiste mit Chips)
Workshops & Facilitation · As-Is & To-Be Analysis · E2E Process Design · Agile Delivery & Rollout · Test Management · Change Management & Training · Coaching

### 03 — AI TRANSFORMATION ACCELERATOR (Deep Navy)

- H2: **From first idea to sustainable AI adoption.**
- Text: A modular consulting offering: practical, people-centered and tailored to each client. Not necessarily linear — iterations and loops are part of the journey.
- Sieben Phasen als Reihe von Boxen (letzte Box Mint): `01` Assess · `02` Learn · `03` Practice · `04` Apply · `05` Validate · `06` Implement · `07` Sustain & Scale
- Zwei durchgehende Streams (Navy-Balken):
  - **Change Management** – Awareness → Understanding → Involvement → Capability → Adoption → Reinforcement
  - **Responsible AI** – Legal · Privacy · Ethics · Human Oversight — throughout the entire journey
- Button (Mint): **View all 11 modules →** → `accelerator.html`

### 04 — DELIVERY MODELS (weiß)

- H2: **Choose the format that fits.**
- Text: Three ways to run the Accelerator — adapted to your team’s capacity and goals.

| Option | Titel | Beschreibung |
|---|---|---|
| OPTION A | Workshop Sprint | 8 weeks · one workshop per week |
| OPTION B | Transformation Accelerator | 10–12 weeks · workshop plus working session per week |
| OPTION C | Modular Academy | 1–2 hours daily or several sessions per week |

Option B mit Teal-Oberkante hervorheben. Keine Preise. Dieser Abschnitt wird später noch ausgearbeitet.

### 05 — ABOUT ME (hellgrau)

- H2: **International. Curious. Pragmatic.**
- Absatz 1: I’m Martina, a business transformation consultant based in Munich. For over six years at Accenture, I supported global transformation and sales programs — from ideation and requirements analysis through E2E process analysis and multi-market rollouts to hypercare.
- Absatz 2: Today I combine this experience with AI, building on my qualification as an AI Manager (AI Consultancy, AI Enterprise, AI Change Management) and a certified coaching education.

Rechts als Liste mit Trennlinien:

| Label | Inhalt |
|---|---|
| Experience | 6+ years consulting (Accenture) · 3+ years sales (IABG) |
| Roles | E2E Process Designer · Taskforce & Workstream Lead · Rollout Manager · Test Manager · Scrum Master · Trainer & Change Support · PMO |
| Industries | Automotive · Utilities · Aeronautics · Environmental Services |
| Certifications | LeanIX Practitioner · ITIL 4 Foundation · SAFe 5.1 Agilist · Professional Scrum Master I · CARS · Management 3.0 |

### 06 — TOOLKIT (weiß, wie auf der bisherigen Website)

- H2: **Tools I Work With**

| Kategorie | Tools | Link |
|---|---|---|
| AI Assistants | ChatGPT, Claude, Gemini, Mistral | „Compare tools →“ → `erste-schritte-ki-anbieter.html` |
| Automation | n8n | – |
| Process Modeling | Signavio, BPMN, LeanIX | – |
| Agile Tools | JIRA, Confluence | – |
| Collaboration | M365, MS CRM, SAP C/4HANA | – |

### 07 — CONTACT (Navy)

- H2: **Start with an AI Readiness Conversation.**
- Text: Where do you stand today — and which business problem would you like to solve with AI?
- Button (Mint): **Schedule a Call** → [INPUT REQUIRED – Terminbuchungslink]
- Button (Rahmen): **Send a Message** → [INPUT REQUIRED – Kontaktweg, z. B. `mailto:`]

### Footer (Deep Navy)

`MARTINA HANNER · Munich` · Legal Notice · Privacy Policy → [INPUT REQUIRED – Impressum und Datenschutz]

### Demo-Assistent

Bleibt erhalten. Wissensbasis auf die neuen englischen Inhalte aktualisieren. Hinweistext auf Englisch.

---

## 5. `accelerator.html` – Inhalte

Header: Wortmarke + Link **← Back to home** → `index.html`

### Hero (Navy)

- Label: `CONSULTING OFFERING`
- H1: **AI Transformation Accelerator**
- Unterzeile: From AI curiosity to structured, value-driven and sustainable adoption.
- Text: Understand business problems. Apply AI with purpose. Enable people. A modular consulting offering for starting and advancing AI initiatives.

### 01 — THE JOURNEY (hellgrau)

- H2: **Seven phases. Select one to jump to its modules.**
- Text: Modular and practical. Change Management and Responsible AI run as streams through the entire journey.
- Sieben **klickbare Boxen** (Links mit Sprungmarke, Fokuszustand, Mindesthöhe 44 px). Jede Box zeigt Nummer, Phasenname und „X module(s) ↓“. Letzte Box Mint.

| Box | Anker | Module |
|---|---|---|
| 01 Assess | `#assess` | 1 module |
| 02 Learn | `#learn` | 3 modules |
| 03 Practice | `#practice` | 1 module |
| 04 Apply | `#apply` | 2 modules |
| 05 Validate | `#validate` | 2 modules |
| 06 Implement | `#implement` | 1 module |
| 07 Sustain & Scale | `#sustain` | 1 module |

Sanftes Scrollen, außer bei `prefers-reduced-motion`.

### 02 — MODULES (weiß)

- H2: **Eleven modules. Combined to fit.**
- Module nach Phase gruppiert: links Phasenlabel („PHASE 01“ + Name), rechts die Modul-Cards. Die Cards sind **nicht klickbar oder aufklappbar**, Inhalte sind direkt sichtbar.

**Phase 01 – Assess** (`id="assess"`)
- **00 Assessment & Setup** – Organizational and participant assessment, goals, framework conditions and maturity level. The participant assessment is for orientation only — everyone goes through the same exercises, learning together as a team.

**Phase 02 – Learn** (`id="learn"`)
- **01 AI Fundamentals** – What is AI? Generative AI, LLMs, RAG, agents, automation — opportunities and limits. Goal: a shared understanding.
- **02 Prompting Fundamentals** – Role, context, audience, instruction, constraints, output format, examples, verification. Good AI use starts before the prompt.
- **03 AI Tools & Capabilities** – Not a tool list: from the problem to the matching capability — research, knowledge retrieval, document analysis, content generation, classification, decision support, workflow automation, agents.

**Phase 03 – Practice** (`id="practice"`)
- **04 Prompting Practice Lab** – Core exercise “From Information to Useful Output”, following Think → Contextualize → Prompt → Verify.

**Phase 04 – Apply** (`id="apply"`)
- **05 Business Problem & Process** – Strategic objective → business problem → process → pain point → root cause → AI opportunity. Thinking AI from the business problem.
- **06 Use Case Discovery** – AI opportunity hunt, identifying and clustering use cases, teamwork, formulating business outcomes.

**Phase 05 – Validate** (`id="validate"`)
- **07 Prioritization & Validation** – Assessment along business value, feasibility, risk and adoption.
- **08 Business Case & Value** – Quantifying benefits, costs, effort, time-to-value, KPIs and a decision paper. Time saved does not automatically mean cost saved.

**Phase 06 – Implement** (`id="implement"`)
- **09 Solution Design & Prototype** – Prompt, prompt chain, workflow, RAG, agent, integration — use the simplest AI solution that reliably solves the business problem.

**Phase 07 – Sustain & Scale** (`id="sustain"`)
- **10 Change, Sustain & Scale** – Awareness → understanding → involvement → capability → adoption → reinforcement, communication plan, sustain & scale KPIs, AI capability portfolio. Change starts on day one.

Am Ende: Link **↑ Back to the journey** → `#journey`

### Abschluss (Deep Navy)

- H2: **Start with an AI Readiness Conversation.**
- Text: Where do you stand today — and which business problem would you like to solve with AI?
- Button (Mint): **Let’s Talk** → `index.html#contact`

---

## 6. `internal.html` – Inhalte (nur nach Rückfrage, siehe Abschnitt 1)

Header: `MARTINA HANNER · INTERNAL` + Hinweis-Badge „Not linked from the public site“

### Hero (Navy)

- Label: `INTERNAL WORKSPACE`
- H1: **Accelerator toolkit**
- Text: Working material for workshops and client engagements: practice example, use case framework and KPI logic.

### 01 — PRACTICE EXAMPLE (hellgrau)

- H2: **From Information to Useful Output**
- Unterzeile: **Think → Contextualize → Prompt → Verify**
- Fünf Schritt-Cards (letzte in Navy):
  1. **Understand the context** – Who needs the result, what for, and which decision follows?
  2. **Define the audience** – Project lead, board, legal, operations, client
  3. **Set constraints** – Invent nothing, flag open points, respect data privacy
  4. **Write the prompt** – Only now is the prompt formulated.
  5. **Verify the result** – Invented? Incomplete? Truly useful for the audience?

### 02 — USE CASE FRAMEWORK (weiß)

- H2: **Start with the business problem.**
- Kette: Strategic Objective → Business Problem → Process → Pain Point → Root Cause → **AI Opportunity** (Mint)
- Template-Card mit Navy-Rahmen, Label `TEMPLATE — AI USE CASE STATEMENT`:
  > For **[user / target group]** we want to solve **[specific problem]** by having AI take on or support **[task / support]**, so that **[business outcome]** is achieved.
- Darunter: Assessed by Business Value · Feasibility · Risk · Adoption

### 03 — SUSTAIN & SCALE (Deep Navy)

- H2: **Usage → Behavior → Process Performance → Business Value**
- KPI-Kategorien als Chips: Adoption · Efficiency · Quality · Business Value · AI Performance & Risk
- Hinweis: Example KPIs: weekly active users → accepted AI drafts → handling time → cost per case

---

## 7. Was bewusst entfernt wurde (nicht wieder einbauen)

- Jede Angabe „8–12 weeks“ als Gesamtdauer (Hero, Accelerator-Teaser, Accelerator-Seite).
- „(BPMN, Signavio)“ beim E2E Process Design im Foundation-Bereich.
- Der Abschnitt „How I work / Principles“ auf der Startseite.
- Jahreszahlen bei Accenture und die Sprachen-Zeile im About-Bereich.
- Aufklappbare Module auf der Accelerator-Seite.
- Practice Example, Use Case Framework und KPIs auf öffentlichen Seiten.
- EN/DE-Umschalter (vorerst).

---

## 8. Offene Punkte

- [INPUT REQUIRED] Portrait-Datei im Repo
- [INPUT REQUIRED] Terminbuchungslink
- [INPUT REQUIRED] Kontaktweg für „Send a Message“
- [INPUT REQUIRED] Impressum und Datenschutz
- [INPUT REQUIRED] Variante für die interne Seite (A oder B)
- [INPUT REQUIRED] Detaillierte Delivery Models
- [INPUT REQUIRED] Später: deutsche Sprachversion

---

## 9. Abnahme-Check vor dem Push

1. Alle Sektionen aus Abschnitt 4 und 5 sind vorhanden, Texte exakt wie oben.
2. Alle Menü- und Sprunglinks funktionieren, auch die sieben Phasen-Boxen.
3. Mobil (360 px), Tablet und Desktop ohne abgeschnittene Inhalte.
4. Keine Inhalte aus Abschnitt 7 sind wieder aufgetaucht.
5. Demo-Assistent funktioniert weiterhin.
6. `erste-schritte.html` und `erste-schritte-ki-anbieter.html` sind erreichbar und unverändert.
7. Kurzer Bericht an mich, was geprüft wurde und was offen bleibt.
