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

**Third correction pass (same day, after another visual review):** found and fixed the real root
cause of the sticky-header bug — `position: sticky` only holds an element within its immediate
parent's box, and the previous wrapper (`.site-header` containing both rows) was too short, so the
header disappeared entirely after a small amount of scrolling. Fix: `<header class="site-header">`
is now the sticky element itself and a direct child of `.page` (which spans the whole document), so
it stays pinned for the entire page; `<nav class="site-nav">` is now a sibling (not nested inside
`<header>`) and scrolls away normally, as intended. The user's two supplied logo files (`logo.png`,
`logo-transparent.png` — an "MH" monogram, no personal data) now replace the portrait in the header;
the portrait (`Foto.webp`) moved to the "About Me" overview tile and the About Me section's own
portrait slot instead. The overview tiles were reordered (Offering first) and the Skills tile
renamed to "Skills, Capabilities & Portfolio" (applied consistently to the tile, the nav dropdown,
and the section eyebrow). About Me gained a "Tools" fact row (Werkzeugkasten section deliberately
kept too, per explicit user instruction). The Starting Point section was rebuilt from a user-supplied
mockup image: new headline, a target-audience tag row, three personas (Starter/Planner/Explorer)
replacing the previous two segments, and a new CTA. The footer now groups the city right next to the
name instead of spreading it across the row. See design.md, "Dritte Korrekturrunde", for full
details.

**Fourth correction pass (same day):** the "Interested in Talking?" contact card was narrowed
(max-width 1320px → 920px, smaller heading); the alternating sand/beige section background rhythm
was broken by three consecutive beige sections (Delivery/Tools/About) — fixed by giving the Tools
section a sand background, restoring strict alternation throughout. In the About Me section, the
portrait now sits in its own column, top-aligned with the facts column (pulled out of the text
column, which previously pushed it down below both paragraphs); bio text now says "senior business
transformation consultant" / "Senior Beraterin", and the first of two "global" mentions in that
paragraph was changed to "international" to avoid the repetition (the canonical "global management
consultancy" phrasing elsewhere, e.g. the Experience fact row, was deliberately left unchanged).
Four user-supplied stock images (generic AI/business imagery, no identifiable people) now fill the
Discover overview tiles: `offering-tile.png`, `skills-capabilities-tile.png`, `news-tile.png`,
`community-and-peers.png` — the latter two use a semi-transparent brand-colored overlay over the
photo so the existing text stays readable, replacing the previously flat-colored cards.

**Fifth correction pass (same day):** the three square Discover tile images looked cropped too
tightly at 130px frame height — increased to 170px and switched their default crop focus to
`center center` (only the About Me tile's portrait keeps `top center`, via a new
`.tile-image-portrait` modifier, so it doesn't cut off the top of her head). The About Me section's
portrait was reverted to its original position — nested below the two bio paragraphs in the text
column — after a misunderstanding: the user wanted the facts column top-aligned with the text
column (already correct, via `.about-layout`'s existing `align-items: flex-start`, independent of
where the photo sits inside the text column), not the photo itself pulled out into its own
top-aligned column. The alternating section-background fix (Tools section → sand) from the second
correction pass was confirmed still correct in the code — a screenshot suggesting it was still
broken turned out to predate that fix.

**Offering & Services redesign, plus a site-wide quick-jump menu (2026-11-04):** the user supplied
redesigned "Offering" and "Services" teaser mockups (`offering_section_v2.html`,
`services_section_v2.html` — Claude-artifact exports, English-only) and a screenshot of the intended
homepage look. `index.html`'s `#starting-point` section was restyled to the compact teaser shown in
the screenshot (heading now "Process first, then AI. Where do you stand?"; the three persona cards
each gained a "Focus: …" tag and a "→ <format>" pointer, replacing the old audience-tag row and
"Let's talk" CTA); its new CTA, "Find your path →", links to a new subpage, `offering.html`. The
`#capabilities` section was likewise condensed into a two-pillar-plus-foundation teaser (pillar
header bars "PILLAR 1 · STEER" / "PILLAR 2 · DO" with a one-line description each, eyebrow changed
to "SERVICES", no more inline bullet lists) with a new "All services →" CTA linking to a new
subpage, `services.html`. The old standalone `#leistungen` ("What I Take Care Of", 7 numbered items)
section was removed from `index.html` — not deleted, folded into the new `services.html`, which
re-groups the same services (plus the former `#capabilities` pillar bullets) into the V2 structure:
two 4-item pillar panels (each item tagged STARTER/PLANNER/EXPLORER) over a "Process Excellence &
Transformation" foundation panel. `offering.html` likewise consolidates the homepage's Starting
Point/Accelerator/Delivery narrative into one page: the three persona cards (richer, with the
Focus/format pointers), the existing 7-phase accelerator overview plus new persona-range bars
(Starter spans phases 1–3, Planner 1–5, Explorer 5–7, matching the V2 mockup) linking to
`accelerator.html` for the full 11 modules, and the three delivery-format cards relabeled "For
Starters/Planners/Explorers" with a "You get" outcome line each and a "Special format: Open group
workshop" callout on the Starter option. Per a cue in the V2 mockup's own hidden caption ("revised
Offering section **without concrete durations**"), the delivery-option durations were also
genericized on `index.html`'s existing `#delivery` section for consistency (e.g. "8 weeks" →
"Multiple weeks"). All new/changed copy reuses the site's existing design tokens and existing
bilingual (EN/DE) text pairs wherever the underlying fact was already on the site; new copy was
translated to match the established tone. Internal links to the removed `#leistungen` anchor
(`accelerator.html`, the three internal `erste-schritte-*.html` pages) were updated to point to
`services.html` or `#capabilities` as appropriate.

Separately, the user asked for a small hamburger/quick-jump menu, reachable at any scroll position
on every page, to jump back to a page's sections. Implemented CSS-only (checkbox hack, same
mechanism as the language toggle): a small ☰ icon now sits in `.header-actions` (which is why it's
always visible — `.header-actions` lives in the sticky header row, so the icon is already onscreen
during scroll without needing actual scroll-position detection, which plain CSS cannot do
reliably/cross-browser without JavaScript or still-inconsistent scroll-driven-animation CSS). Added
to `index.html`, `accelerator.html`, `offering.html` and `services.html`; the three internal
`erste-schritte-*.html` pages and `input-index-martina-hanner.html` (a kept-for-reference raw
artifact export, not part of the live site) were left untouched, consistent with their existing
"old header, future follow-up pass" status noted elsewhere in this file.

**Homepage trimmed to five sections, new Portfolio section, grouped quick-jump menu (same day,
after user review):** after seeing the first pass, the user asked for `index.html`'s content body
to hold only: the overview tiles, the Offering teaser, a new Portfolio section, About Me, Tools, and
Contact — i.e. the full `#capabilities` (pillar/foundation teaser), `#accelerator` and `#delivery`
sections from the redesign above were removed as standalone homepage sections (not deleted from the
site: `#accelerator`'s and `#delivery`'s content already lived in full on `offering.html`/
`accelerator.html`; `#capabilities`'s pillar content already lived in full on `services.html`).
`#werkzeugkasten` (Tools) stays, repositioned to directly follow `#about` per the user's explicit
choice (a dedicated Tools subpage or moving it into `services.html` were the alternatives offered
and declined). A new `#portfolio` section was added, from a user-supplied mockup: "Selected Work"
heading plus three placeholder case-study cards (`.portfolio-card`, dashed border, "Case study /
Workflow · coming soon" tag) with a disabled "View portfolio →" link, since there is no real
portfolio content yet (per the placeholder-sections rule). The "Everything at a Glance" overview
tiles were rebuilt as six uniform tiles in two rows of three (Offering/Services/About Me, then the
new Portfolio tile, News, Resources) — News and Resources moved off the old wide dark/light tile
format onto the same plain `.tile` format as the rest, per a second user-supplied mockup; the
"Services" tile (formerly "Skills, Capabilities & Portfolio") now links straight to `services.html`
instead of an on-page anchor, since that anchor no longer exists. `index.html`'s main nav and all
four pages' burger quick-jump panels were restructured to match: four groups — Offering (Starting
Point, Accelerator, Delivery), Services (Pillars, Foundation), Portfolio (no sub-items yet), About
Me (Tools) — each group header itself links to that area's main anchor/page, with its sub-items
nested and indented below (`.nav-menu-panel-group`/`-group-label`/`-sub-link` in styles.css); this
was an explicit user request so the burger panel always shows "the 4 main parts, with their
subpages listed under each," not a flat list. The previous "Discover" nav-dropdown group (which only
ever held the old Capabilities/Skills item) was retired along with it. Two small badge labels
("RENAMED", "NEW") on the user's tile mockup were confirmed to be notes for Claude, not real UI —
no badge chips were added to the live tiles.

**Correction pass (same day): Services teaser restored, subpage nav fixed, Portfolio pared down.**
Two things from the previous pass were wrong. First, removing `#capabilities` from `index.html`
also removed the compact two-pillar/foundation teaser card itself — the user wanted that card kept
on the homepage (it was only the old, long bullet-list version that was meant to go). Restored it
as its own section (same id, `#capabilities`, positioned between `#starting-point` and `#portfolio`
to match the Offering → Services → Portfolio → About Me group order), and repointed the hero CTA,
the "Services" overview tile, the main-nav "Services" item and the burger panel's "SERVICES" group
label all back to `#capabilities` (they had been pointing at `services.html` directly). Second, the
three subpages' own flat `.site-nav` bars were out of sync with the new 4-group order and were
missing a Portfolio link entirely — reordered to Starting Point/Accelerator/Delivery, Services,
Portfolio, About Me, Tools, News on all three, with Portfolio added (`index.html#portfolio`).
Third, the new `#portfolio` section's three case-study cards were cut down to a single placeholder
card showing only the tag "Workflow · coming soon" (no title text) — the user wants the section
to stay almost empty until there is real portfolio content, rather than naming specific case
studies that don't exist yet. `.portfolio-grid`'s column sizing was capped (`minmax(220px, 280px)`
instead of `1fr`) so a single remaining card doesn't stretch to the section's full width. To keep
the sand/beige background alternation intact with the restored section, `#starting-point` picked up
`topic-section-alt` (sand) and the restored `#capabilities` stayed plain `topic-section` (beige),
so the chain overview → starting-point → capabilities → portfolio → about → werkzeugkasten now
alternates beige/sand/beige/sand/beige/sand with no adjacent clash (down from the one unavoidable
clash at the very top in the previous pass).

**Visual polish, real LinkedIn contact, new `about.html`, de-emphasized audience tags (same day).**
Four more fixes from user feedback on screenshots: (1) The restored `#capabilities` teaser had grown
back the one-line descriptions under each pillar title and kept the old two-separate-boxes-with-a-
gap look; both removed per a reference screenshot — `.pillar-grid-compact`/`.pillar-card-compact`
are now one unified card with a thin divider border between the two halves (left border side by
side, top border once they stack on narrow screens) and just a pillar title, no description. The
"All services" and "Find your path" CTAs changed from pill buttons to plain underlined text links
(new `.link-arrow` class), matching the reference screenshots' minimal link style; `.back-home-link`
got the same underline treatment for consistency. (2) `index.html`'s `#about` section is now a
one-line teaser (small circular photo + one short bio sentence + a "Full profile →" link) instead
of the full bio/facts layout — the full bio, the facts grid (Experience/Roles/Industries/
Certifications/Tools) and the Werkzeugkasten icon section all moved to a new `about.html` subpage
(same shell as the other three subpages); every page's "About Me" nav group/burger-panel now has a
"Full Profile" sub-link to `about.html` alongside "Tools" (repointed to `about.html#werkzeugkasten`,
since that id no longer exists on `index.html`). (3) The user supplied their real LinkedIn URL
(`https://www.linkedin.com/in/martina-hanner`) and asked for it everywhere contact is mentioned,
having decided against a contact form or phone number for now — this resolves the long-standing
placeholder-contact note in `PRD.md`/`tech-spec.md`. `index.html#kontakt`'s two dead placeholder
buttons ("Send a Message", "Schedule a Call") were replaced with one real "Connect on LinkedIn"
button (`target="_blank" rel="noopener"`); every subpage's own contact section (`accelerator.html`,
`offering.html`, `services.html`, `about.html`) gained a second "Connect on LinkedIn" button next to
its existing "Let's Talk" (which still forwards to `index.html#kontakt`). The old `.linkedin-link`
CSS rule (disabled/placeholder style) is unused on any live page now — it was already only
referenced by the archived `index-old.html` — so real LinkedIn links just use the normal
`.btn-pill` classes instead of reviving it. (4) On `offering.html`, the three audience pills
("Companies", "Education providers", "Freelancers") were replaced with one plain muted text line
(new `.audience-plain` class, old `.audience-row`/`.audience-label`/`.audience-tag` rules removed
as dead code) — the user's point being the offering doesn't differ by audience, so a clickable-
looking pill row overstated a distinction that isn't really there.

**Further visual fixes against the user's reference screenshots (same day).** The homepage Offering
teaser's three persona cards were simplified to eyebrow + quote only (dropped the bullet list and
the Focus/format footer that had crept back in) — that richer version stays on `offering.html`
itself, only the homepage teaser needed to match the minimal reference image. The Services teaser's
divider between the two pillar halves was using `var(--color-border)`, which is almost the same
tone as the card's own `--color-surface` background (computed as new identical-looking tones) and so
was effectively invisible — switched to `var(--color-text-muted)` for real contrast. The STARTER/
PLANNER/EXPLORER tag chips were genuinely hard to read: the Planner chip (`--color-brand-secondary`
background) computes to only ~3.8:1 contrast against the old `--color-background` text color, below
WCAG AA (4.5:1) for small bold text — added a new, documented token, `--color-chip-text: #FFFFFF`
(real white; the existing beige/cream tokens weren't light enough), and bumped the chip font-size
11→12px. Added a `[aria-current="page"]` style to `.site-nav a` so the subpage flat-nav tab you're
currently on is visually marked (underlined, muted color) — the user reported "some subpages have
the wrong tab," but a full cross-check of all four subpages' nav hrefs turned up no actual broken
link (all four are consistent and point where expected); this is the most likely explanation found
so far — ask the user which page/tab specifically if it persists.

**Decisive nav fix, box/color/icon corrections (same day).** The "wrong tab" complaint kept
recurring across two rounds despite every individual href checking out, so instead of patching links
again, the subpages' flat 8-item `.site-nav` was replaced with the exact same grouped dropdown
structure `index.html` already uses (Home, Offering▾, Services▾, Portfolio, About Me▾, News) —
`accelerator.html`, `offering.html`, `services.html` and `about.html` now all share one nav paradigm
instead of two different ones, with `aria-current="page"` set on both the group toggle and the
specific sub-item so the current page is visible whether or not the dropdown is open. Also fixed:
the homepage Services teaser went back to three separate, fully-rounded cards (pillar 1, pillar 2,
foundation) with a real gap between them, not one fused shape with a hairline divider — that
divider approach was the wrong fix for the earlier "boxes aren't nicely separated" complaint, this
is what was actually meant. "Sustain & Scale" lost its accent highlight color on both the homepage/
`offering.html` phase row and `accelerator.html`'s journey boxes (should look like the other six
phases). "View all 11 modules" on `offering.html` changed from a pill button to the same
`.link-arrow` text-link style as everything else on that card. The Starter format's "Special format"
callout got its "!" badge icon back (`.format-callout-bang`) — it was in the original source artifact
but got dropped when the callout was first built. Fixed a real bug: `.brand-link` and `.site-nav a`
had no hover rule of their own, so they fell back to the page-wide `a:hover { color: var(--color-text)
}`, which turns text dark brown — invisible against the navy header (this is why the brand name
"turned black" on hover). Gave both the same subtle light-overlay hover the burger menu already had
(`rgba(255,255,255,0.14)` background), so hovering any header/nav link now behaves consistently.

**Found the real nav bug (same day).** The "tabs still don't look right" complaint turned out to be
a genuine, visible layout bug, not a link/labeling issue at all: the four subpages still had their
header built the old way — `<nav class="site-nav">` nested *inside* `<header class="site-header">`,
as a sibling of a `.header-top` wrapper div (this was flagged as a known, deferred issue as far back
as the "Navigation umstrukturiert" entry above, when the sticky-header rework was deliberately
scoped to `index.html` only). Since `.site-header` is `display: flex; flex-wrap: nowrap`, having
`.header-top` and `.site-nav` as its two flex children forced them into one single row side by side
instead of stacking into two rows like on `index.html` — exactly what the screenshot showed. Fixed
on all four subpages (`accelerator.html`, `offering.html`, `services.html`, `about.html`) by
matching `index.html`'s structure exactly: `.header-top` removed, `.brand-link` and
`.header-actions` are now direct children of `<header>`, and `<nav class="site-nav">` is a sibling
after `</header>` closes, not nested inside it.

**Option A/B/C removed, portfolio tile photo, chip-text re-check, burger-menu audit (same day).**
`offering.html`'s three delivery cards no longer show "Option A/B/C" above the title — just the
"For Starters/Planners/Explorers" label and the format name now (the `.delivery-label` CSS rule
that styled it is gone too, unused elsewhere). The user supplied a real photo for the Portfolio
overview tile (`portfolio-tile.png`, renamed from `portfolio tile.png` to match the other tile
filenames' no-spaces convention) — wired in, replacing the dashed "coming soon" placeholder. The
About Me portrait tile was cropping the photo (`object-fit: cover` on a short, wide tile box was
cutting off the top of the head or the shoulders) — switched `.tile-image-portrait img` to
`object-fit: contain` so the whole photo shows, letterboxed against the tile's own background if
the aspect ratios don't match exactly. Re-checked the STARTER/PLANNER/EXPLORER chip text color
reported as still unreadable — the CSS (`--color-chip-text: #FFFFFF`, added two rounds ago) is
correct in the file with no conflicting override found; most likely a stale cached stylesheet,
flagged to the user to hard-refresh. Also did a full systematic audit, for the reported "burger menu
sub-links all land on the homepage" bug: cross-referenced every `id="..."` defined on every page
against every href used in every burger panel across all five pages — found them all correctly
matched except one latent, unrelated inconsistency (`accelerator.html`'s contact section used
`id="contact"` instead of `id="kontakt"` like every other page; nothing linked to it by that name,
but fixed for consistency). Could not reproduce the reported bug from the markup alone — asked the
user for one concrete example (which page, which exact link) to pin down the real mechanism rather
than guess again.

**Two real bugs found from the user's annotated screenshots (same day).** Both confirmed exactly as
the user described, from markup/CSS this time, not guesswork:

1. The chip-text complaint *was* a real, reproducible bug, not caching — the legend row's chips
   (directly inside `.segment-legend`) looked fine, but the identical chips nested inside
   `.service-panel-item`'s `.service-text` did not, which was the tell. Root cause: `.service-text
   span` (a descendant selector, specificity 0,1,1) was winning over `.tag-chip`'s own `color: var
   (--color-chip-text)` (specificity 0,1,0) for any tag-chip nested inside `.service-text` —
   because a tag-chip *is* a `<span>`, descended from `.service-text` via the `.service-tags`
   wrapper. Fixed with a targeted, higher-specificity override: `.service-text .tag-chip { color:
   var(--color-chip-text); }`.
2. The user circled exactly where "Starting Point" should land from the nav/burger menu:
   `offering.html#where` (the "01 — WHERE DO YOU STAND?" section, with the fuller three-persona
   cards), not the condensed homepage teaser it was pointing to before. Every "Starting Point" nav/
   burger-submenu link, across all 8 pages that have one (`index.html`, `accelerator.html`,
   `offering.html`'s own burger, `services.html`, `about.html`, and the three internal
   `erste-schritte-*.html` pages), now points to `offering.html#where` — this matches how its
   sibling items already behave (Accelerator → `accelerator.html`, Delivery →
   `offering.html#formats`: the specific named sub-item always points to the full detail, not a
   teaser). The homepage's own "Offering" overview tile and the "Offering" group-label/top-level nav
   item still point to the homepage teaser (`#starting-point`) — unchanged, since those represent
   browsing the homepage itself, not jumping to the dedicated page.

Also: the user supplied a second portrait photo, `about-me-tile.png` (renamed from `about me tile.png`),
to use **only** for the "Everything at a Glance" / Discover overview tile — `Foto.webp` stays as
before everywhere else (the homepage About Me teaser, the full bio on `about.html`).

**One more tweak (same day):** the `object-fit: contain` fix from the previous round (meant to stop
the portrait being cropped) left visible letterboxing — empty tile background showing on the sides —
which looked worse, not better. Since `about-me-tile.png` is a wide, already-centered half-body shot,
switched `.tile-image-portrait img` back to `object-fit: cover` (centered): it now fills the tile by
cropping into the blurred background at the edges, not into her.

**"Accelerator" nav target changed (same day).** Every "Accelerator" link in every nav/burger menu
on every page — including `accelerator.html`'s own nav, which previously pointed to itself — now
points to `offering.html#journey` (the "02 — How We Get There" overview: seven phases, persona
range bars, Change Management/Responsible AI streams). `accelerator.html` (the full 11-module
detail page) is reached only via that section's "View all 11 modules →" link now, not directly from
any nav/burger menu — the user wants the overview to be the default stop, with the full module
breakdown one click further in for whoever wants it.

**First real Portfolio work sample added (same day).** The user supplied a design-reference mockup
(`portfolio-leasingcalculator.zip`, a Claude-canvas export with inline styles — `README.md` inside it
explicitly says to treat it as a content/layout reference and rebuild with the site's own design
system, not copy the markup) plus three real n8n screenshots, for a leasing-offer automation
workflow (form → validate → calculate in a code node → LLM drafts the offer → human reviews). Built
as a new subpage, `portfolio-leasing-calculator.html` (same header/nav/footer/chat-widget shell as
the other subpages), with the mockup's full content translated to English as the primary language
(German kept as the `.lang-de` pairing, reusing the mockup's own German copy) — per explicit user
instruction, "case study" was renamed "work sample" everywhere (`Arbeitsprobe` in German). New
dedicated CSS added for this page's components (hero stats, the "core principle" banner, the
five-step workflow row with its code-highlighted and human-review steps, the input/output showcase
grid — mock form, calculation box, generated-email card — the learnings grid with a before/after
prompt comparison, the transferable-to banner, and the collapsible original-screenshots section) —
all built from the site's existing tokens, not the mockup's inline hex values. The three real n8n
screenshots were copied in as `leasing-workflow.png`, `leasing-form.png`, `leasing-output.png`; the
screenshots show a fictional demo scenario ("Radwerk Mitte GmbH", test placeholder contact) that the
mockup itself labels as a demo, not a real client, so no personal-data concern. The homepage
`#portfolio` section got only the minimal addition the user asked for — an intro line, and the single
"coming soon" placeholder card split into one real card (title, one-line summary, "View work sample
→" link to the new subpage) plus one remaining "Work Sample 02 · coming soon" placeholder — not the
mockup's fuller visual treatment, since the user was explicit the homepage format shouldn't change
much. `.portfolio-grid`'s column sizing was loosened (was capped at 280px to stop a single empty
card stretching full-width; now `minmax(260px, 1fr)` with a `max-width: 820px` cap on the grid
itself) now that there's real card content to size for. A "Work Sample 01" sub-link was added under
the "Portfolio" burger-menu group on every page, matching how Services/About Me already list their
sub-pages once real content exists.

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
