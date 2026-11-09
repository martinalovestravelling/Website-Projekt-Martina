# Übergabe an Claude Code: Redesign `accelerator.html`

Kopiere den Abschnitt **„Prompt“** in Claude Code. HTML und CSS darunter sind die Vorlage, auf die sich der Prompt bezieht – am einfachsten legst du diese Datei mit ins Repo (z. B. als `docs/accelerator-redesign.md`) und sagst Claude Code, dass es sie lesen soll.

---

## Prompt

```
Bitte überarbeite accelerator.html nach der Vorlage in docs/accelerator-redesign.md.

Rahmen (wie auf allen anderen Seiten, nicht neu erfinden):
- Header, Navigation, Sprachumschalter, Footer (inkl. Impressum/Datenschutz-Links) und
  Chat-Widget 1:1 so übernehmen, wie sie aktuell auf offering.html stehen.
- Der Platzhalter-Text "LOGO" im Header wird durch das echte Logo ersetzt
  (logo-transparent.png), genau wie auf den anderen Seiten.
- Im Menü ist "Offering" als aktive Seite markiert (gleiche Optik wie aktive Punkte
  auf den anderen Seiten, falls vorhanden).

Hauptinhalt:
- Den bisherigen Inhalt zwischen Header und Footer durch das HTML aus der Vorlage
  ersetzen (Abschnitt "HTML").
- Der Link "← Back to home" entfällt und wird durch die Breadcrumb aus der Vorlage
  ersetzt (Home › Offering › Accelerator).
- Die Module werden NICHT nummeriert. Nummeriert sind nur die 7 Phasen.
- Module sind aufklappbar mit <details>/<summary> – KEIN JavaScript.
  Beim Laden ist nur das erste Modul ("Assessment & Setup") geöffnet.
- Die Phasen-IDs bleiben erhalten (#assess, #learn, #practice, #apply, #validate,
  #implement, #sustain), damit bestehende Links weiter funktionieren.
- Die Phasenleiste ist sticky (position: sticky) und klebt direkt unter dem
  sticky .header-top. Setze den top-Wert passend zur Höhe von .header-top und gib
  den Phasen-Überschriften scroll-margin-top, damit sie beim Springen nicht unter
  Header oder Phasenleiste verschwinden.
- Zweisprachigkeit wie überall mit .lang-en / .lang-de.

CSS:
- Die Regeln aus dem Abschnitt "CSS" in styles.css ergänzen (eigener Abschnitt
  "Accelerator page"). Nur bestehende Tokens verwenden, keine neuen Hex-Werte.
- Auf schmalen Bildschirmen (max-width: 520px) werden die Segment-Marker in der
  zugeklappten Zeile unter das Ziel verschoben statt ausgeblendet.

Zusätzlich auf offering.html:
- Die 7 Phasen-Kästchen im Abschnitt "How we get there" werden zu Links auf
  accelerator.html#assess, #learn, #practice, #apply, #validate, #implement, #sustain.

Danach:
- design.md um einen kurzen Abschnitt zu diesem Redesign ergänzen.
- Prüfen, dass das Chat-Widget weiterhin funktioniert und die Seite auf Mobil
  sauber umbricht.
```

---

## HTML (Hauptinhalt zwischen Header und Footer)

```html
<main class="page-accelerator">

  <!-- Intro -->
  <section class="acc-intro">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="index.html"><span class="lang-en">Home</span><span class="lang-de">Startseite</span></a>
      <span aria-hidden="true">›</span>
      <a href="offering.html"><span class="lang-en">Offering</span><span class="lang-de">Angebot</span></a>
      <span aria-hidden="true">›</span>
      <span aria-current="page">Accelerator</span>
    </nav>

    <p class="eyebrow"><span class="lang-en">Consulting offering</span><span class="lang-de">Beratungsangebot</span></p>
    <h1>AI Transformation Accelerator</h1>
    <p class="acc-lead">
      <span class="lang-en">From AI curiosity to structured, value-driven and sustainable adoption.</span>
      <span class="lang-de">Von KI-Neugier zu strukturierter, wertorientierter und nachhaltiger Nutzung.</span>
    </p>
    <p>
      <span class="lang-en">Seven phases, eleven modules. Click a module to see what we do and what you get.</span>
      <span class="lang-de">Sieben Phasen, elf Module. Klicke auf ein Modul, um zu sehen, was wir tun und was du bekommst.</span>
    </p>
    <p class="acc-segments">
      <span class="lang-en">Where do you stand?</span><span class="lang-de">Wo stehst du?</span>
      <span class="seg seg-starter">STARTER</span>
      <span class="seg seg-planner">PLANNER</span>
      <span class="seg seg-explorer">EXPLORER</span>
      <a href="offering.html#where"><span class="lang-en">Find out on the offering page</span><span class="lang-de">Finde es auf der Angebotsseite heraus</span></a>
    </p>
  </section>

  <!-- Sticky phase bar -->
  <nav class="acc-phasebar" aria-label="Phases">
    <a href="#assess"><span class="num">01</span>Assess</a>
    <a href="#learn"><span class="num">02</span>Learn</a>
    <a href="#practice"><span class="num">03</span>Practice</a>
    <a href="#apply"><span class="num">04</span>Apply</a>
    <a href="#validate"><span class="num">05</span>Validate</a>
    <a href="#implement"><span class="num">06</span>Implement</a>
    <a href="#sustain"><span class="num">07</span>Sustain &amp; Scale</a>
  </nav>

  <section class="acc-modules">

    <!-- Streams -->
    <div class="acc-streams">
      <div class="acc-stream">
        <strong>Change Management</strong>
        <span>Awareness → Understanding → Involvement → Capability → Adoption → Reinforcement</span>
      </div>
      <div class="acc-stream">
        <strong>Responsible AI</strong>
        <span class="lang-en">Legal · Privacy · Ethics · Human Oversight — throughout the entire journey</span>
        <span class="lang-de">Legal · Privacy · Ethics · Human Oversight — über die gesamte Journey hinweg</span>
      </div>
    </div>

    <!-- Phase 01 -->
    <h2 class="acc-phase" id="assess"><span class="num">01</span> Assess</h2>
    <details class="acc-module" open>
      <summary>
        <span class="acc-title">Assessment &amp; Setup</span>
        <span class="acc-tags"><span class="seg seg-all"><span class="lang-en">ALL</span><span class="lang-de">ALLE</span></span></span>
        <span class="acc-toggle" aria-hidden="true"></span>
        <span class="acc-goal"><span class="lang-en">Know where you stand</span><span class="lang-de">Wissen, wo du stehst</span></span>
      </summary>
      <dl class="acc-body">
        <dt><span class="lang-en">We do</span><span class="lang-de">Wir machen</span></dt>
        <dd><span class="lang-en">Organizational and participant assessment, goals, framework conditions and maturity level. The participant assessment is for orientation only — everyone goes through the same exercises, learning together as a team.</span><span class="lang-de">Organisations- und Teilnehmer-Assessment, Ziele, Rahmenbedingungen und Reifegrad. Das Teilnehmer-Assessment dient nur zur Orientierung — alle durchlaufen dieselben Übungen und lernen gemeinsam als Team.</span></dd>
        <dt><span class="lang-en">You get</span><span class="lang-de">Du bekommst</span></dt>
        <dd><span class="lang-en">Maturity level, shared goals, setup for the journey</span><span class="lang-de">Reifegrad, gemeinsame Ziele, Setup für die Journey</span></dd>
      </dl>
    </details>

    <!-- Phase 02 -->
    <h2 class="acc-phase" id="learn"><span class="num">02</span> Learn</h2>
    <details class="acc-module">
      <summary>
        <span class="acc-title">AI Fundamentals</span>
        <span class="acc-tags"><span class="seg seg-starter">STARTER</span><span class="seg seg-planner">PLANNER</span></span>
        <span class="acc-toggle" aria-hidden="true"></span>
        <span class="acc-goal"><span class="lang-en">A shared understanding of AI</span><span class="lang-de">Ein gemeinsames KI-Verständnis</span></span>
      </summary>
      <dl class="acc-body">
        <dt><span class="lang-en">We do</span><span class="lang-de">Wir machen</span></dt>
        <dd><span class="lang-en">What is AI? Generative AI, LLMs, RAG, agents, automation — opportunities and limits. Goal: a shared understanding.</span><span class="lang-de">Was ist KI? Generative AI, LLMs, RAG, Agents, Automatisierung — Chancen und Grenzen. Ziel: ein gemeinsames Verständnis.</span></dd>
        <dt><span class="lang-en">You get</span><span class="lang-de">Du bekommst</span></dt>
        <dd><span class="lang-en">A common language across the team</span><span class="lang-de">Eine gemeinsame Sprache im Team</span></dd>
      </dl>
    </details>

    <details class="acc-module">
      <summary>
        <span class="acc-title">Prompting Fundamentals</span>
        <span class="acc-tags"><span class="seg seg-starter">STARTER</span><span class="seg seg-planner">PLANNER</span></span>
        <span class="acc-toggle" aria-hidden="true"></span>
        <span class="acc-goal"><span class="lang-en">Good AI use starts before the prompt</span><span class="lang-de">Gute KI-Nutzung beginnt vor dem Prompt</span></span>
      </summary>
      <dl class="acc-body">
        <dt><span class="lang-en">We do</span><span class="lang-de">Wir machen</span></dt>
        <dd><span class="lang-en">Role, context, audience, instruction, constraints, output format, examples, verification.</span><span class="lang-de">Role, Context, Audience, Instruction, Constraints, Output Format, Examples, Verification.</span></dd>
        <dt><span class="lang-en">You get</span><span class="lang-de">Du bekommst</span></dt>
        <dd><span class="lang-en">A reusable prompting framework</span><span class="lang-de">Ein wiederverwendbares Prompting-Framework</span></dd>
      </dl>
    </details>

    <details class="acc-module">
      <summary>
        <span class="acc-title">AI Tools &amp; Capabilities</span>
        <span class="acc-tags"><span class="seg seg-starter">STARTER</span><span class="seg seg-planner">PLANNER</span></span>
        <span class="acc-toggle" aria-hidden="true"></span>
        <span class="acc-goal"><span class="lang-en">From the problem to the right capability</span><span class="lang-de">Vom Problem zur passenden Capability</span></span>
      </summary>
      <dl class="acc-body">
        <dt><span class="lang-en">We do</span><span class="lang-de">Wir machen</span></dt>
        <dd><span class="lang-en">Not a tool list: from the problem to the matching capability — research, knowledge retrieval, document analysis, content generation, classification, decision support, workflow automation, agents.</span><span class="lang-de">Keine reine Tool-Liste: vom Problem zur passenden Capability — Research, Knowledge Retrieval, Document Analysis, Content Generation, Classification, Decision Support, Workflow Automation, Agents.</span></dd>
        <dt><span class="lang-en">You get</span><span class="lang-de">Du bekommst</span></dt>
        <dd><span class="lang-en">A capability map instead of a tool list</span><span class="lang-de">Eine Capability-Landkarte statt einer Tool-Liste</span></dd>
      </dl>
    </details>

    <!-- Phase 03 -->
    <h2 class="acc-phase" id="practice"><span class="num">03</span> Practice</h2>
    <details class="acc-module">
      <summary>
        <span class="acc-title">Prompting Practice Lab</span>
        <span class="acc-tags"><span class="seg seg-starter">STARTER</span><span class="seg seg-planner">PLANNER</span></span>
        <span class="acc-toggle" aria-hidden="true"></span>
        <span class="acc-goal"><span class="lang-en">Turn information into useful output</span><span class="lang-de">Aus Informationen nützlichen Output machen</span></span>
      </summary>
      <dl class="acc-body">
        <dt><span class="lang-en">We do</span><span class="lang-de">Wir machen</span></dt>
        <dd><span class="lang-en">Core exercise “From Information to Useful Output”, following Think → Contextualize → Prompt → Verify.</span><span class="lang-de">Kernübung „From Information to Useful Output“ nach dem Prinzip Think → Contextualize → Prompt → Verify.</span></dd>
        <dt><span class="lang-en">You get</span><span class="lang-de">Du bekommst</span></dt>
        <dd><span class="lang-en">Hands-on confidence with real tasks</span><span class="lang-de">Praktische Sicherheit an echten Aufgaben</span></dd>
      </dl>
    </details>

    <!-- Phase 04 -->
    <h2 class="acc-phase" id="apply"><span class="num">04</span> Apply</h2>
    <details class="acc-module">
      <summary>
        <span class="acc-title">Business Problem &amp; Process</span>
        <span class="acc-tags"><span class="seg seg-planner">PLANNER</span></span>
        <span class="acc-toggle" aria-hidden="true"></span>
        <span class="acc-goal"><span class="lang-en">Think AI from the business problem</span><span class="lang-de">KI vom Business Problem aus denken</span></span>
      </summary>
      <dl class="acc-body">
        <dt><span class="lang-en">We do</span><span class="lang-de">Wir machen</span></dt>
        <dd><span class="lang-en">Strategic objective → business problem → process → pain point → root cause → AI opportunity.</span><span class="lang-de">Strategic Objective → Business Problem → Process → Pain Point → Root Cause → AI Opportunity.</span></dd>
        <dt><span class="lang-en">You get</span><span class="lang-de">Du bekommst</span></dt>
        <dd><span class="lang-en">Your process with its AI opportunities</span><span class="lang-de">Dein Prozess mit seinen KI-Potenzialen</span></dd>
      </dl>
    </details>

    <details class="acc-module">
      <summary>
        <span class="acc-title">Use Case Discovery</span>
        <span class="acc-tags"><span class="seg seg-planner">PLANNER</span></span>
        <span class="acc-toggle" aria-hidden="true"></span>
        <span class="acc-goal"><span class="lang-en">Find and cluster use cases</span><span class="lang-de">Use Cases finden und clustern</span></span>
      </summary>
      <dl class="acc-body">
        <dt><span class="lang-en">We do</span><span class="lang-de">Wir machen</span></dt>
        <dd><span class="lang-en">AI opportunity hunt, identifying and clustering use cases, teamwork, formulating business outcomes.</span><span class="lang-de">AI Opportunity Hunt, Use Cases identifizieren und clustern, Teamarbeit, Business Outcomes formulieren.</span></dd>
        <dt><span class="lang-en">You get</span><span class="lang-de">Du bekommst</span></dt>
        <dd><span class="lang-en">A clustered use case list</span><span class="lang-de">Eine geclusterte Use-Case-Liste</span></dd>
      </dl>
    </details>

    <!-- Phase 05 -->
    <h2 class="acc-phase" id="validate"><span class="num">05</span> Validate</h2>
    <details class="acc-module">
      <summary>
        <span class="acc-title">Prioritization &amp; Validation</span>
        <span class="acc-tags"><span class="seg seg-planner">PLANNER</span><span class="seg seg-explorer">EXPLORER</span></span>
        <span class="acc-toggle" aria-hidden="true"></span>
        <span class="acc-goal"><span class="lang-en">Focus on what matters</span><span class="lang-de">Fokus auf das, was zählt</span></span>
      </summary>
      <dl class="acc-body">
        <dt><span class="lang-en">We do</span><span class="lang-de">Wir machen</span></dt>
        <dd><span class="lang-en">Assessment along business value, feasibility, risk and adoption.</span><span class="lang-de">Bewertung entlang Business Value, Feasibility, Risk und Adoption.</span></dd>
        <dt><span class="lang-en">You get</span><span class="lang-de">Du bekommst</span></dt>
        <dd><span class="lang-en">A prioritized shortlist</span><span class="lang-de">Eine priorisierte Shortlist</span></dd>
      </dl>
    </details>

    <details class="acc-module">
      <summary>
        <span class="acc-title">Business Case &amp; Value</span>
        <span class="acc-tags"><span class="seg seg-planner">PLANNER</span><span class="seg seg-explorer">EXPLORER</span></span>
        <span class="acc-toggle" aria-hidden="true"></span>
        <span class="acc-goal"><span class="lang-en">Make value measurable</span><span class="lang-de">Wert messbar machen</span></span>
      </summary>
      <dl class="acc-body">
        <dt><span class="lang-en">We do</span><span class="lang-de">Wir machen</span></dt>
        <dd><span class="lang-en">Quantifying benefits, costs, effort, time-to-value, KPIs and a decision paper. Time saved does not automatically mean cost saved.</span><span class="lang-de">Nutzen, Kosten, Aufwand, Time-to-Value, KPIs und Entscheidungsvorlage quantifizieren. Time saved bedeutet nicht automatisch Cost Saved.</span></dd>
        <dt><span class="lang-en">You get</span><span class="lang-de">Du bekommst</span></dt>
        <dd><span class="lang-en">A decision paper</span><span class="lang-de">Eine Entscheidungsvorlage</span></dd>
      </dl>
    </details>

    <!-- Phase 06 -->
    <h2 class="acc-phase" id="implement"><span class="num">06</span> Implement</h2>
    <details class="acc-module">
      <summary>
        <span class="acc-title">Solution Design &amp; Prototype</span>
        <span class="acc-tags"><span class="seg seg-explorer">EXPLORER</span></span>
        <span class="acc-toggle" aria-hidden="true"></span>
        <span class="acc-goal"><span class="lang-en">The simplest AI solution that reliably works</span><span class="lang-de">Die einfachste KI-Lösung, die zuverlässig funktioniert</span></span>
      </summary>
      <dl class="acc-body">
        <dt><span class="lang-en">We do</span><span class="lang-de">Wir machen</span></dt>
        <dd><span class="lang-en">Prompt, prompt chain, workflow, RAG, agent, integration — use the simplest AI solution that reliably solves the business problem.</span><span class="lang-de">Prompt, Prompt Chain, Workflow, RAG, Agent, Integration — die einfachste KI-Lösung nutzen, die das Business Problem zuverlässig löst.</span></dd>
        <dt><span class="lang-en">You get</span><span class="lang-de">Du bekommst</span></dt>
        <dd><span class="lang-en">A working prototype</span><span class="lang-de">Ein funktionierender Prototyp</span></dd>
      </dl>
    </details>

    <!-- Phase 07 -->
    <h2 class="acc-phase" id="sustain"><span class="num">07</span> Sustain &amp; Scale</h2>
    <details class="acc-module">
      <summary>
        <span class="acc-title">Change, Sustain &amp; Scale</span>
        <span class="acc-tags"><span class="seg seg-explorer">EXPLORER</span></span>
        <span class="acc-toggle" aria-hidden="true"></span>
        <span class="acc-goal"><span class="lang-en">Make it stick — change starts on day one</span><span class="lang-de">Damit es bleibt — Change beginnt am ersten Tag</span></span>
      </summary>
      <dl class="acc-body">
        <dt><span class="lang-en">We do</span><span class="lang-de">Wir machen</span></dt>
        <dd><span class="lang-en">Awareness → understanding → involvement → capability → adoption → reinforcement, communication plan, sustain and scale KPIs.</span><span class="lang-de">Awareness → Understanding → Involvement → Capability → Adoption → Reinforcement, Kommunikationsplan, Sustain-&amp;-Scale-KPIs.</span></dd>
        <dt><span class="lang-en">You get</span><span class="lang-de">Du bekommst</span></dt>
        <dd><span class="lang-en">An AI capability portfolio</span><span class="lang-de">Ein AI Capability Portfolio</span></dd>
      </dl>
    </details>
  </section>

  <!-- Formats bridge -->
  <section class="acc-formats">
    <p class="eyebrow"><span class="lang-en">Which format fits you?</span><span class="lang-de">Welches Format passt zu dir?</span></p>
    <div class="acc-format-grid">
      <a class="acc-format acc-format-starter" href="offering.html#formats">
        <span class="acc-format-for"><span class="lang-en">For starters</span><span class="lang-de">Für Starter</span></span>
        <strong>Modular Academy</strong>
        <span class="acc-format-note"><span class="lang-en">or open group workshop</span><span class="lang-de">oder offener Gruppen-Workshop</span></span>
      </a>
      <a class="acc-format acc-format-planner" href="offering.html#formats">
        <span class="acc-format-for"><span class="lang-en">For planners</span><span class="lang-de">Für Planner</span></span>
        <strong>Workshop Sprint</strong>
      </a>
      <a class="acc-format acc-format-explorer" href="offering.html#formats">
        <span class="acc-format-for"><span class="lang-en">For explorers</span><span class="lang-de">Für Explorer</span></span>
        <strong>Transformation Accelerator</strong>
      </a>
    </div>
  </section>

  <!-- Closing CTA (reuse the existing contact CTA styling of the other pages) -->
  <section class="acc-cta">
    <h2>
      <span class="lang-en">Start with an AI readiness conversation.</span>
      <span class="lang-de">Starte mit einem AI-Readiness-Gespräch.</span>
    </h2>
    <p>
      <span class="lang-en">Where do you stand today — and which business problem would you like to solve with AI?</span>
      <span class="lang-de">Wo stehst du heute — und welches Business Problem möchtest du mit KI angehen?</span>
    </p>
    <a class="btn" href="https://www.linkedin.com/in/martina-hanner" target="_blank" rel="noopener">
      <span class="lang-en">Connect on LinkedIn</span><span class="lang-de">Auf LinkedIn vernetzen</span>
    </a>
  </section>

</main>
```

---

## CSS (Ergänzung in `styles.css`, Abschnitt „Accelerator page“)

Nutzt ausschließlich die bestehenden Tokens. `--header-top-height` ist ein Hilfswert: Claude Code soll ihn an die tatsächliche Höhe von `.header-top` anpassen oder durch einen bestehenden Wert ersetzen.

```css
/* ===== Accelerator page ===== */
.page-accelerator { --header-top-height: 64px; }

.breadcrumb { font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1rem; }
.breadcrumb a { color: var(--color-text-muted); text-decoration: none; }
.breadcrumb a:hover { color: var(--color-brand-secondary); }
.breadcrumb [aria-current="page"] { color: var(--color-brand-primary); font-weight: 600; }

.acc-lead { font-weight: 600; }

.acc-segments { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; font-size: 0.9rem; color: var(--color-text-muted); }
.acc-segments a { color: var(--color-brand-primary); font-weight: 600; text-decoration: none; border-bottom: 2px solid var(--color-brand-secondary); }

/* Segment markers (same colours as the offering page bars) */
.seg { display: inline-block; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.04em; color: var(--color-surface); border-radius: 3px; padding: 0.05rem 0.4rem; }
.seg-starter  { background: var(--color-brand-primary); }
.seg-planner  { background: var(--color-brand-secondary); }
.seg-explorer { background: var(--color-text-muted); }
.seg-all      { background: var(--color-text); }

/* Sticky phase bar */
.acc-phasebar {
  position: sticky; top: var(--header-top-height); z-index: 5;
  display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 0.3rem;
  padding: 0.5rem 0; background: var(--color-background); border-bottom: 1px solid var(--color-border);
}
.acc-phasebar a {
  background: var(--color-surface); border-radius: 6px; padding: 0.4rem 0.2rem; text-align: center;
  font-size: 0.75rem; font-weight: 600; color: var(--color-brand-primary); text-decoration: none;
}
.acc-phasebar a:hover, .acc-phasebar a:focus-visible { background: var(--color-surface-alt); }
.acc-phasebar .num { display: block; font-family: var(--font-display); font-weight: 800; color: var(--color-brand-secondary); }

/* Streams */
.acc-streams { display: grid; gap: 0.4rem; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); margin: 1rem 0; }
.acc-stream { background: var(--color-surface-alt); border-radius: 8px; padding: 0.5rem 0.75rem; font-size: 0.85rem; }
.acc-stream strong { display: block; color: var(--color-brand-primary); }

/* Phase headings */
.acc-phase {
  display: flex; align-items: center; gap: 0.5rem; margin: 1.5rem 0 0.5rem;
  font-family: var(--font-sans); font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;
  font-weight: 600; color: var(--color-text-muted);
  scroll-margin-top: calc(var(--header-top-height) + 5rem);
}
.acc-phase::after { content: ""; flex: 1; height: 1px; background: var(--color-border); }
.acc-phase .num { font-family: var(--font-display); font-weight: 800; color: var(--color-brand-secondary); font-size: 1rem; }

/* Collapsible modules */
.acc-module { background: var(--color-surface); border-radius: 10px; margin-bottom: 0.4rem; }
.acc-module summary {
  list-style: none; cursor: pointer; padding: 0.7rem 0.9rem;
  display: grid; grid-template-columns: 1fr auto auto; grid-template-areas: "title tags toggle" "goal tags toggle";
  column-gap: 0.6rem; align-items: center;
}
.acc-module summary::-webkit-details-marker { display: none; }
.acc-module summary:focus-visible { outline: 2px solid var(--color-brand-secondary); outline-offset: 2px; border-radius: 10px; }
.acc-title { grid-area: title; font-family: var(--font-display); font-weight: 700; color: var(--color-brand-primary); }
.acc-goal  { grid-area: goal; font-size: 0.85rem; color: var(--color-text-muted); }
.acc-tags  { grid-area: tags; display: flex; gap: 0.2rem; }
.acc-toggle {
  grid-area: toggle; width: 1.4rem; height: 1.4rem; border-radius: 50%;
  background: var(--color-brand-primary); color: var(--color-surface);
  display: flex; align-items: center; justify-content: center; font-weight: 700;
}
.acc-toggle::after { content: "+"; }
.acc-module[open] .acc-toggle { background: var(--color-brand-secondary); }
.acc-module[open] .acc-toggle::after { content: "–"; }

.acc-body {
  margin: 0 0.9rem; padding: 0.6rem 0 0.8rem; border-top: 1px solid var(--color-surface-alt);
  display: grid; grid-template-columns: 6rem 1fr; gap: 0.25rem 0.6rem; font-size: 0.9rem;
}
.acc-body dt { font-weight: 600; color: var(--color-text-muted); }
.acc-body dd { margin: 0; }

/* Formats bridge */
.acc-formats { background: var(--color-surface-alt); padding: 1.5rem; border-radius: 12px; margin-top: 2rem; }
.acc-format-grid { display: grid; gap: 0.5rem; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
.acc-format { background: var(--color-surface); border-radius: 8px; padding: 0.75rem; text-decoration: none; color: var(--color-text); border-top: 3px solid var(--color-brand-primary); }
.acc-format-planner  { border-top-color: var(--color-brand-secondary); }
.acc-format-explorer { border-top-color: var(--color-text-muted); }
.acc-format strong { display: block; color: var(--color-brand-primary); }
.acc-format-for { font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; color: var(--color-text-muted); }
.acc-format-note { font-size: 0.8rem; color: var(--color-text-muted); }
.acc-format:hover { background: var(--color-background); }

/* Mobile */
@media (max-width: 520px) {
  .acc-phasebar { grid-template-columns: repeat(7, minmax(3.2rem, 1fr)); overflow-x: auto; }
  .acc-module summary { grid-template-columns: 1fr auto; grid-template-areas: "title toggle" "goal toggle" "tags toggle"; }
  .acc-tags { margin-top: 0.25rem; }
  .acc-body { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
```

---

## Hinweise

- **Inhalte:** „We do“ stammt 1:1 von der aktuellen Seite. „Goal“ (die graue Zeile unter dem Titel) und „You get“ sind neu formuliert und sollten inhaltlich von dir geprüft werden.
- **Segment-Marker:** Die Zuordnung folgt den Balken auf `offering.html` (Starter Phase 1–3, Planner 1–5, Explorer 5–7); „Assessment & Setup“ gilt für alle.
- **„11 modules“:** Die Zahl stimmt weiterhin (11 Module ohne Nummern). Der Link auf `offering.html` („View all 11 modules“) kann so bleiben.
