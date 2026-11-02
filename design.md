# Design-Dokument: Professional Profile Website

Abgeleitet aus [PRD.md](PRD.md) und [tech-spec.md](tech-spec.md). Ersetzt die erste Designrichtung
(siehe [design-old.md](design-old.md)) durch das vom Nutzer per Claude-App entworfene Landingpage-Design.

## Seitenstruktur

**Scope-Entscheidung:** `index.html` ist ab jetzt eine schlanke Landingpage (Hero, Überblicks-Kacheln,
Leistungen, Werkzeugkasten, Kontakt) statt des vollständigen One-Pagers. Die ausführlichen
Briefing-Inhalte (4.3–4.10: Branchen, Berufserfahrung, Internationale Erfahrung, Kernkompetenzen,
Zertifizierungen, Ausbildung, Sprachen) ziehen auf eine separate Unterseite **"Über mich"** um, die
noch nicht gebaut ist (verlinkt von der "Über mich"-Kachel, aktuell Platzhalter). Bis diese Unterseite
existiert, ist das PRD-Akzeptanzkriterium "alle Briefing.md-Abschnitte 4.1–4.10 repräsentiert" bewusst
nicht erfüllt — siehe Hinweis in [PRD.md](PRD.md).

Aufbau von `index.html`, in dieser Reihenfolge:

1. Header: Logo (Platzhalter) + Vorname, Kontakt-Button, Sprach-Toggle (EN/DE), Navigation
   (Leistungen, Portfolio, Über mich, Werkzeugkasten, News)
2. Hero: Headline + Subline + zwei CTA-Buttons, Hintergrundfoto als Platzhalter
3. "Alles auf einen Blick": 5 Überblicks-Kacheln (Skills, Über mich, Portfolio, News, Ressourcen —
   alle außer ggf. künftigem Inhalt vorerst Platzhalter/Verweise auf noch nicht existierende Unterseiten)
4. Leistungen (01–07): nummerierte Liste, Inhalte aus Briefing 4.4/4.6 abgeleitet
5. Werkzeugkasten: Tool-Kategorien aus Briefing 4.7
6. Kontakt: Platzhalter-CTAs (kein echter Kontaktweg, bis ein datenschutzkonformer Weg feststeht,
   vgl. Briefing.md Abschnitt 5)
7. Footer

## Personendaten-Ausnahme (Update 2026-10-28)

Abweichend von der ursprünglichen "keine Personendaten"-Regel hat der Nutzer bestätigt: **Vorname
"Martina" und der Wohnort "München" dürfen auf der Seite erscheinen.** Nachname, E-Mail-Adresse,
Telefonnummer und alle anderen in Briefing.md Abschnitt 2 genannten Angaben bleiben weiterhin
ausgeschlossen. Siehe Hinweis in [Briefing.md](Briefing.md), Abschnitt 2.

## Farben als Design-Tokens

Palette aus dem neuen Entwurf, 1:1 übernommen (keine zusätzlichen, nicht-dokumentierten Hex-Werte
mehr — anders als im Rohentwurf, der zusätzlich diverse Ad-hoc-Brauntöne für Bildplatzhalter nutzte.
Diese Flächen verwenden jetzt stattdessen `--color-text-muted` / `--color-surface-alt` plus die
etablierte gestrichelte Platzhalter-Optik):

```css
:root {
  /* Hausfarbe 1: Header, Footer, Buttons, Überschriften */
  --color-brand-primary: #1B3A5C;   /* Dunkelblau */

  /* Hausfarbe 2: Nummern, Akzente, Hover-Zustände */
  --color-brand-secondary: #8C6E52; /* Kaffeebraun */

  --color-background: #EFE6DA;   /* Beige — Seitenhintergrund */
  --color-surface: #F5EEE4;      /* Hell-Creme — Kacheln */
  --color-surface-alt: #E2D3BF;  /* Sand — Leistungen-Bereich, Akzentflächen */
  --color-text: #2E2620;         /* Textfarbe — Fließtext */
  --color-text-muted: #5A4636;   /* dunkles Braun — Eyebrow-Labels, Platzhalter-Text */
  --color-border: #E2D3BF;       /* Sand — dünne Trennlinien */
  --color-photo-placeholder: #7A6654; /* aus dem Original-Entwurf — Hero-/Bildflächen ohne Foto */
}
```

**Update 2026-10-28 (Feedback-Runde 2):**
- `--color-photo-placeholder` kam dazu, nachdem der Hero-Hintergrund mit `--color-text-muted` optisch zu
  stark vom Original abwich ("anderer Cappuccino-Ton"). Jetzt 1:1 der Original-Hex-Wert, plus Hero-Mindesthöhe
  zurück auf 600px (war versehentlich auf 420px verkürzt).
- `--color-text-muted` von `#8C6E52` (Kaffeebraun, zu hell/kontrastarm auf Sand-Hintergrund) auf `#5A4636`
  geändert — ein einziger, überall gleich dunkler Ton für Eyebrow-Labels, egal auf welchem Hintergrund
  (vorher wirkten z. B. die "RESSOURCEN"- und "LEISTUNGEN"-Labels auf Sand inkonsistent/schlecht lesbar).

## Typografie

**Update 2026-10-28 (Feedback-Runde 3):** Der System-Font-Ersatz traf die Optik des Originals auch nach
Feintuning nicht gut genug (wirkte bei fetten Überschriften weiterhin "gequetscht", da System-Fonts oft
keinen echten 800er-Schnitt haben). Entscheidung: **Montserrat + Open Sans selbst hosten**, statt sie
direkt von `fonts.googleapis.com` zu laden:

- Beide Schriften sind kostenlos (SIL Open Font License), keine Anmeldung/API-Key nötig.
- Direktes Einbinden über Googles CDN würde bei jedem Seitenaufruf die IP-Adresse der Besucher an
  Google übertragen — das LG München hat 2022 entschieden, dass das ohne Einwilligung einen
  DSGVO-Verstoß darstellen kann (relevant für diese Seite, siehe die Anonymisierungs-Regeln).
- Self-Hosting vermeidet das: die `.woff2`-Dateien liegen lokal unter `/assets/fonts/`
  (`montserrat-variable.woff2`, `open-sans-variable.woff2` — Variable Fonts, decken die Schnitte
  400–800 in einer Datei ab), eingebunden per `@font-face` in `styles.css`. Kein externer Request zur
  Laufzeit, funktioniert offline, bleibt ein reines "statische Dateien"-Setup ohne Build-Schritt — damit
  technisch sogar näher am Tech-Spec-Prinzip als die direkte Google-Fonts-Einbindung.

```css
:root {
  --font-sans: "Open Sans", -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-display: "Montserrat", -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
```

Verwendung wie im Original-Entwurf (nicht überall Montserrat — nur dort, wo der Rohentwurf es explizit
gesetzt hatte):

- `--font-display` (Montserrat, `font-weight: 700`–`800`): Markenname im Header, Hero-Headline,
  Section-Headings (h2), Kachel-Titel, Leistungen-Nummern (01–07), Kontakt-Headline
- `--font-sans` (Open Sans, Body-Default): Fließtext, Eyebrow-Labels, Buttons, Leistungen-Titel/-Text,
  Werkzeugkasten-Namen — alles, was im Original keine explizite Montserrat-Angabe hatte
- Nummern (01–07): `--color-brand-secondary`, `--font-display`, `font-weight: 800`

## Layout-Prinzipien

- Header/Footer in `--color-brand-primary`, restliche Seite auf `--color-background`
- Kachel-Raster responsive (`flex-wrap`), bricht auf schmalen Bildschirmen einspaltig um
- Platzhalter-Sektionen/-Kacheln/-Links (Portfolio, Über mich, News, Ressourcen, Kontakt-CTAs,
  Hero-/Kachel-Bildflächen, Logo) sind durchgängig mit der bestehenden Optik gekennzeichnet:
  gestrichelter Rahmen bzw. deutlich sichtbarer Hinweistext "Placeholder — coming soon" /
  "Platzhalter — folgt", wie in `styles-old.css` (`.placeholder-box`, `.placeholder-label`) etabliert
- Sprach-Toggle: identischer Checkbox-Hack-Mechanismus wie zuvor (`#lang-toggle` + `.lang-en`/`.lang-de`
  + `~ .page`-Geschwisterselektoren), siehe tech-spec.md

## Responsiveness

- Mobile-first, Navigation horizontal scrollbar bei wenig Platz
- Kein `<h1>`-Overflow auf kleinen Screens (Schriftgröße reduziert sich per Media Query)

## Erste Schritte (Entscheidungshilfen)

**Hinzugefügt 2026-10-30.** Neuer, aktivierter Nav-Punkt "Erste Schritte" (zwischen Werkzeugkasten
und News) verlinkt auf `erste-schritte.html`, eine Hub-Seite mit einer Kachel-Übersicht über
einzelne Entscheidungshilfen (weitere Themen, z. B. "KI-Anbieter im Vergleich", sind als
Platzhalter-Kachel vorgesehen, bis sie tatsächlich gebaut werden). Von dort verlinkt die erste
echte Entscheidungshilfe, `erste-schritte-servicemodelle.html` (SaaS/PaaS/IaaS/Selbst betreiben ×
Public/Private/Hybrid/On-Premise).

**Herkunft und Abweichungen vom Original:** Der Inhalt stammt aus einem vom Nutzer in Claude
erstellten, interaktiven HTML-Artefakt (Entscheidungsassistent, Matrizen, Checklisten), das
eigenes JavaScript verwendete. Zwei Entscheidungen des Nutzers (2026-10-30) bestimmen die
Umsetzung hier:

- **Kein JavaScript, auch nicht als zweite Ausnahme.** Die Seite wurde komplett ohne Script
  nachgebaut: Die vier Servicemodell- bzw. Bereitstellungs-Tabs nutzen den CSS-Radiobutton-Hack
  (analog zum Sprach-Toggle), die 16 Kombinationen sind eine statische Tabelle plus aufklappbare
  `<details>`-Begründungen, und der verzweigte Entscheidungsassistent ist eine verschachtelte
  `<details>`/`<summary>`-Baumstruktur. Gegenüber dem Original vereinfacht: keine dynamische
  Matrix-Hervorhebung, kein Status-Speichern der Checkbox-Haken über einen Seitenaufruf hinaus,
  und die ursprünglich zweistufige erste Assistenten-Frage ("fertiges Produkt nutzen" → "deckt es
  die Anforderungen ab?") wurde zu einer Frage zusammengefasst, um doppelte Astzweige zu vermeiden.
- **Nur Deutsch, klar markiert.** Anders als der Rest der Seite ist der Inhalt dieser beiden Seiten
  (noch) nicht ins Englische übersetzt — ein sichtbarer Hinweis dazu steht direkt unter der
  Einleitung. Header, Navigation und Footer bleiben wie überall zweisprachig per
  `.lang-en`/`.lang-de` und Sprach-Toggle.

Farben und Schriften verwenden ausschließlich die bestehenden Tokens (`--color-brand-primary`,
`--color-brand-secondary`, `--color-surface(-alt)`, `--font-display`/`--font-sans`) — keine neuen
Hex-Werte, keine zusätzliche Google-Fonts-Einbindung aus dem Original-Artefakt.

**Zweite Entscheidungshilfe, hinzugefügt 2026-10-30:** `erste-schritte-ki-anbieter.html`
("KI-Tools im Vergleich") vergleicht ChatGPT, Claude, Gemini, Copilot, Perplexity und Mistral nach
Kosten, Token/Credits-Logik, Integration/Outputs, Datenschutz, Best-Case/Kritik und
Szenario-Empfehlung. Quelle ist ein zweites, vom Nutzer bereitgestelltes Claude-Artefakt, das
bereits rein statisch war (keine Interaktivität, kein JavaScript) — die Übertragung war daher ohne
CSS-Tricks möglich, nur mit den bestehenden Design-Tokens statt der Artefakt-eigenen Inline-Styles.

- **Arena/lmarena.ai nur als ausgehender Link.** Auf Wunsch des Nutzers sollten aktuelle,
  live gepflegte Modell-Rankings von Arena (ehem. LMArena/Chatbot Arena) verfügbar sein. Recherche
  ergab: kein offizielles Embed-Widget, keine öffentliche API, nur ein inoffizieller iframe-Trick
  einzelner Drittseiten. Entscheidung des Nutzers (2026-10-30): **kein iframe**, stattdessen ein klar
  beschrifteter, extern öffnender Link/Button zu `lmarena.ai/leaderboard` — dieselbe
  Datenschutz-Überlegung wie beim bereits vermiedenen direkten Google-Fonts-Request (siehe oben,
  Abschnitt "Typografie").
- **Verlinkung aus dem Werkzeugkasten.** Die "KI-Assistenten"-Kachel im Werkzeugkasten auf
  `index.html` ist jetzt ein Link auf diese Seite (`.tool-item-link` in `styles.css`), statt rein
  dekorativ zu bleiben — vermeidet, dieselben Tool-Infos an zwei Stellen gepflegt vorzuhalten.

**Aktualität (offene Frage, keine Automatisierung möglich):** Da die Seite bewusst ohne Backend/Build
läuft, kann nichts automatisch aktuell gehalten werden — Preise und Limits bei KI-Anbietern ändern
sich laut der Quelle selbst teils monatlich. Empfehlung an den Nutzer: regelmäßiger manueller Review
(z. B. vierteljährlich), Stand-Datum pro Seite sichtbar halten und bei Unsicherheit auf die
offizielle Anbieterseite statt auf diese Seite verweisen (steht bereits als Hinweis auf der Seite).

## AI Transformation & Enablement (hinzugefügt 2026-11-02)

**Herkunft:** Inhaltlich übernommen aus `Offering webseite_V2_Martina_Hanner_Claude_Code.md`
(abgeleitet aus `Personal_Branding_AI_Transformation_Enablement.md` und
`Superprompt_AI_Consulting_Website_HTML_Download.md`, vom Nutzer bereitgestellt). Die Design- und
Farbvorgaben dieser drei Dateien (eigene Navy/Mint/Teal-Palette, Inter-Schriftart) wurden auf
ausdrücklichen Wunsch des Nutzers **nicht** übernommen — stattdessen verwenden alle neuen Abschnitte
ausschließlich die bestehenden Tokens (`--color-brand-primary`, `--color-brand-secondary`,
`--color-surface(-alt)`, `--font-display`/`--font-sans`).

Fünf neue Abschnitte auf `index.html`, zwischen "Leistungen" (bleibt unverändert bestehen) und
"Werkzeugkasten" eingefügt:

1. **Ausgangslage** (`#starting-point`) — zwei Kundensegmente (AI Starter / AI Explorer)
2. **Kompetenzfelder** (`#capabilities`) — zwei Säulen (KI Management, AI Transformation &
   Enablement). Bewusst *nicht* "Portfolio" genannt wie im Quelldokument, um keine Namenskollision
   mit der bereits bestehenden, weiterhin unveränderten "Portfolio"-Kachel (zukünftige
   Arbeitsproben-Unterseite, siehe PRD.md) zu erzeugen. Die "Foundation"-Chip-Zeile aus dem
   Quelldokument wurde weggelassen (Dopplung mit "Leistungen") und durch einen Verweislink ersetzt.
3. **AI Transformation Accelerator** (`#accelerator`) — 7-Phasen-Übersicht + 2 Streams (Change
   Management, Responsible AI) als kompakter Teaser; Button verlinkt auf die neue Unterseite
   `accelerator.html` mit allen 11 Modulen im Detail (Nutzer-Entscheidung: eigene Unterseite statt
   alles auf `index.html`).
4. **Delivery Models** (`#delivery`) — drei Formate, keine Preise.
5. **Über mich** (`#about`) — ersetzt das bisherige "noch nicht gebaut"-Konzept einer separaten
   Unterseite für diesen kondensierten Teil; die Kurzbio stammt aus Briefing.md 4.2, die
   Erfahrungs-/Rollen-/Branchen-/Zertifizierungs-Fakten aus Briefing.md 4.3/4.4/4.8 (gekürzt, analog
   zur Verdichtung im Quelldokument). **Wichtig:** die vollständigen Detailtabellen aus
   Briefing.md 4.3–4.10 (komplette Erfahrungstabelle, internationale Erfahrung, vollständige
   Skill-Tabelle, Tools, Ausbildung, Sprachen) sind damit weiterhin **nicht** auf der Seite — das
   PRD-Akzeptanzkriterium 4 bleibt also weiterhin offen, nur in reduzierterem Umfang als zuvor.
   AI-Manager- und Coach-Qualifikation werden bewusst als "in Ausbildung" formuliert (siehe
   Briefing.md 4.8), nicht als abgeschlossen — das Quelldokument hatte diese Nuance nicht.

**Markenname:** Header-Wortmarke und Footer zeigen jetzt sitweit "MARTINA HANNER" statt "MARTINA"
(Nutzer-Entscheidung 2026-11-02, siehe Briefing.md Abschnitt 2).

**Portraitfoto:** Datei `Foto.webp` liegt seit 2026-11-02 im Projektordner und wird im Header
(`.brand-photo`, 48×48, rund, neben der Wortmarke "MARTINA HANNER") verwendet — Nutzer-Anweisung:
"neben meinem Namen oben links". Der "Über mich"-Abschnitt hat weiterhin die ursprüngliche
Bildplatzhalterfläche (`.about-photo-placeholder`, "[Portrait – Platzhalter]"), da nur der Header
explizit genannt wurde; ob das Foto auch dort verwendet werden soll, ist offen für eine künftige
Iteration.

**`accelerator.html`:** neue Unterseite, gleiches Grundgerüst wie `erste-schritte.html`
(Header/Nav/Footer/Chat-Widget identisch). Enthält die 7 Journey-Boxen als Sprunglinks (Anker je
Phase) sowie alle 11 Module, nach Phase gruppiert, als nicht aufklappbare Karten (Inhalte direkt
sichtbar, wie im Quelldokument gefordert). Abschließender CTA verlinkt zurück auf
`index.html#kontakt`.

## Navigation umstrukturiert (aktualisiert 2026-11-02, nach Review durch den Nutzer)

Nach einem ersten Durchsicht der oben beschriebenen Erweiterung wünschte der Nutzer eine neue
Top-Level-Navigation auf `index.html`, mit zwei CSS-only Dropdown-Gruppen (Hover + `:focus-within`,
kein JavaScript — bleibt innerhalb der tech-spec.md-Vorgabe):

1. **Home** (`#home`, neuer Anker auf der Hero-Section) — führt jederzeit zurück zum Seitenanfang.
2. **Discover** (Dropdown) → Skills & Capabilities (`#capabilities`), Services (`#leistungen`)
3. **Offering** (Dropdown) → Starting Point (`#starting-point`), Accelerator (`#accelerator`),
   Delivery (`#delivery`). Nutzer-Entscheidung: "Starting Point gehört für mich in den Unterpunkt
   Offering" — Offering ist zielgruppenorientiert (AI Starter / AI Explorer).
4. **Portfolio** (`#portfolio`) — es gibt weiterhin keine eigene Portfolio-Sektion, nur die
   bestehende Platzhalter-Kachel in "Alles auf einen Blick"; der Nav-Link bekam dafür eine `id`, um
   dorthin zu scrollen. Bewusst nicht weiter ausgebaut ("wenn du nicht weißt wohin, dann einfach
   erstmal lassen").
5. **Tools** (`#werkzeugkasten`)
6. **About Me** (`#about`) — Reihenfolge im Dokument geändert: liegt jetzt *nach* Werkzeugkasten
   (vorher davor), damit die Dokumentreihenfolge der Nav-Reihenfolge entspricht.
7. **News** (weiterhin deaktivierter Platzhalter-Link)

**Physische Abschnittsreihenfolge auf `index.html` geändert**, damit sie zur neuen Nav passt:
Hero → Überblicks-Kacheln → **Kompetenzfelder** (vorher nach Leistungen, jetzt davor, Teil der
"Discover"-Gruppe) → Leistungen → Ausgangslage → Accelerator → Delivery → Werkzeugkasten → Über
mich → Kontakt. Kein Inhalt wurde gelöscht, nur verschoben; die Eyebrow-Nummerierung wurde
entsprechend angepasst (Kompetenzfelder verlor ihre "02 —"-Nummer, da sie jetzt zur Discover-Gruppe
gehört statt zur Offering-Nummerierung; Accelerator/Delivery rückten auf 02/03; Über mich verlor
ihre Nummer, da sie nicht mehr Teil der Offering-Sequenz ist). Der Hinweistext in "Kompetenzfelder"
("siehe Services oben") wurde zu "siehe Services unten" korrigiert, da Services jetzt direkt danach
folgt.

**Header jetzt `position: sticky; top: 0`**, bleibt beim Scrollen sichtbar (Nutzer-Anweisung: "damit
man jederzeit wieder auf Home zurückklicken kann"). Kein zusätzliches Body-Padding nötig, da
`sticky` (anders als `fixed`) im normalen Dokumentfluss bleibt.

**Scope-Hinweis:** Diese Nav-Änderung wurde nur auf `index.html` umgesetzt (Nutzer: "auf der
allerersten Seite"). `accelerator.html` und die drei internen "Erste Schritte"-Seiten haben noch die
alte Navigation/das alte Logo-Platzhalter — offen für eine künftige Iteration, falls gewünscht.

## Navigation & Header, zweite Korrekturrunde (aktualisiert 2026-11-02, nach visuellem Review)

Nach Ansicht der ersten Umsetzung meldete der Nutzer mehrere Korrekturen:

1. **Bug behoben — Dropdown unsichtbar + Scrollbar:** `.site-nav` hatte `overflow-x: auto` ohne
   explizites `overflow-y`; laut CSS-Spezifikation wird dadurch `overflow-y` implizit zu `auto`
   statt `visible`, was das absolut positionierte `.nav-submenu` beschnitt und eine ungewollte
   vertikale Scrollbar erzeugte. Fix: `overflow-x: auto` entfernt, stattdessen `flex-wrap: wrap`
   (Nav bricht auf schmalen Bildschirmen um, statt zu scrollen) — dadurch ist kein `overflow`-Wert
   mehr gesetzt und das Dropdown zeigt sich vollständig. Zusätzlich: Caret-Symbol (▾) an jedem
   Dropdown-Auslöser und `box-shadow` am Submenü für bessere Erkennbarkeit ("deutlich aufklappen").
2. **Sticky-Verhalten korrigiert:** Vorher war die *gesamte* `.site-header` sticky (Logo+Name+Reiter
   blieben alle immer sichtbar) — unerwünscht. Jetzt ist nur noch `.header-top` (Logo, Name,
   Kontakt-Button, Sprachumschalter) sticky; `.site-nav` (die Reiter-Zeile) bleibt normaler
   Dokumentfluss und scrollt beim Herunterscrollen normal weg, unter die sticky Leiste. Beim Laden
   sieht man weiterhin den vollen Header; erst beim Scrollen reduziert er sich auf Logo+Name — exakt
   wie vom Nutzer gewünscht ("beim Scrollen, nicht dauerhaft"). Der Abstand zwischen Logo/Name-Zeile
   und Reiter-Zeile wurde zudem verkleinert.
3. **Nav-Gruppen geändert:** "Tools" ist jetzt Unterpunkt von "Offering" (zusammen mit Starting
   Point, Accelerator, Delivery); "Services" ist jetzt Unterpunkt von "About Me" (eigene
   Dropdown-Gruppe mit aktuell nur diesem einen Eintrag). "Discover" bleibt ebenfalls als
   Dropdown-Gruppe bestehen (jetzt nur noch mit "Skills & Capabilities", da Services dort
   herausgenommen wurde) — bewusste Entscheidung für strukturelle Konsistenz aller drei
   Gruppen-Reiter, auch wenn Discover und About Me aktuell nur je einen Untereintrag haben.
4. **Physische Abschnittsreihenfolge erneut angepasst:** "Leistungen" (`#leistungen`) wurde ans Ende
   der Inhaltsabschnitte verschoben (direkt vor "Kontakt"), passend zu seiner neuen Nav-Zugehörigkeit
   unter "About Me". "Werkzeugkasten" musste nicht verschoben werden — es stand bereits zwischen
   Delivery und Über mich und bekam zur Konsistenz die Eyebrow-Nummer "04 —" (viertes Offering-Item).
   Der Verweislink in "Kompetenzfelder" ("siehe Services ...") verzichtet jetzt bewusst auf eine
   Richtungsangabe ("oben"/"unten"), da Services nicht mehr in der Nähe steht.
5. **Portfolio-Verlinkung:** Die dritte Kachel in "Alles auf einen Blick" (vorher "PORTFOLIO" / "From
   Analysis to Hypercare", deaktiviert) wurde auf Nutzerwunsch zu "OFFERING" / "From Assessment to AI
   Adoption" umbenannt und aktiviert (verlinkt jetzt auf `#starting-point`) — "Assessment"/"AI
   Adoption" bewusst unübersetzt gelassen, analog zu den bereits unübersetzten Phase-Namen im
   Accelerator-Abschnitt (Assess, Learn, …). Die erste Kachel ("SKILLS" → "SKILLS & CAPABILITIES")
   wurde ebenfalls aktiviert (verlinkt auf `#capabilities`), da dort jetzt echter Inhalt steht.
   Der Nav-Punkt "Portfolio" hat dadurch keine eigene Vorschau-Kachel mehr und verlinkt vorerst auf
   die allgemeine Überblicks-Sektion (`#ueberblick`) — es gibt weiterhin keine dedizierte
   Portfolio-Sektion; offen für eine künftige Iteration.
6. **Resources-Kachel:** Zusätzliche Zeile "Coming soon" / "Demnächst" ergänzt (war vorher nicht als
   Platzhalter erkennbar); CTA-Button-Text "Discover"/"Entdecken" → "Learn"/"Mehr erfahren".
7. **Hintergrundbild:** `hintergrundbild.png` (vom Nutzer bereitgestellt — generische,
   KI/Business-Stock-Grafik ohne erkennbare Gesichter/Namen, unbedenklich nach den
   Personendaten-Regeln) ersetzt den bisherigen Hero-Bildplatzhalter, mit einem dunklen
   Verlaufs-Overlay (`.hero-overlay`) für Textlesbarkeit.

## Dritte Korrekturrunde (aktualisiert 2026-11-02, nach erneutem visuellem Review)

1. **Sticky-Bug endgültig behoben (Ursache gefunden):** Der Header verschwand nach kurzem Scrollen
   komplett, statt dauerhaft sichtbar zu bleiben. Ursache: `position: sticky` hält ein Element nur
   innerhalb der Box seines unmittelbaren Elternelements sichtbar ("containing block"); da
   `.header-top` vorher in der kurzen `.site-header` (nur ca. 1–2 Zeilen hoch) verschachtelt war,
   endete der "Stick-Bereich" sobald dieser kurze Elternblock durchgescrollt war. Fix: `<header
   class="site-header">` ist jetzt selbst das sticky Element und ein **direktes Kind von
   `.page`** (das die gesamte Seite umspannt) — dadurch bleibt es über die komplette Seite hinweg
   oben fixiert. `<nav class="site-nav">` ist jetzt ein Geschwisterelement direkt danach (nicht mehr
   im `<header>` verschachtelt) und scrollt normal weg, wie gewünscht.
2. **Logo statt Porträt im Header:** Die zwei vom Nutzer bereitgestellten Logo-Dateien
   (`logo.png` mit Navy-Hintergrund, `logo-transparent.png` mit transparentem Hintergrund — beide
   zeigen ein "MH"-Monogramm, keine Personendaten) ersetzen das Porträtfoto oben links im Header;
   verwendet wird die transparente Variante, da sie nahtlos mit dem Navy-Header verschmilzt. Das
   Porträtfoto (`Foto.webp`) zog dafür an zwei andere Stellen um:
   - in die "About Me"-Kachel in "Alles auf einen Blick" (ersetzt dort den Bild-Platzhalter)
   - in den Portrait-Platzhalter im "Über mich"-Abschnitt selbst (`.about-photo`, vorher
     `.about-photo-placeholder`)
3. **Discover-Kacheln neu sortiert/umbenannt:** "Offering" (vorher "Portfolio") steht jetzt an
   erster/linker Position; "Skills & Capabilities" heißt jetzt "Skills, Capabilities & Portfolio"
   (gleiche Umbenennung auch im Nav-Dropdown "Discover" und im Eyebrow-Label des
   `#capabilities`-Abschnitts übernommen, für Konsistenz an allen drei Stellen).
4. **About Me — Tools ergänzt:** Neue Fakten-Zeile "Tools" (Signavio, LeanIX, JIRA, Confluence, SAP
   C/4HANA, MS CRM, M365, ChatGPT, Claude, Gemini, Mistral, n8n — aus Briefing.md 4.7) analog zu
   Experience/Roles/Industries/Certifications. Der bestehende "Werkzeugkasten"-Abschnitt bleibt
   unverändert bestehen (Nutzer-Anweisung: "nimm den Toolbox-Part bitte vorerst trotzdem noch nicht
   raus") — die Tools stehen also aktuell bewusst doppelt auf der Seite.
5. **"Ausgangslage" (`#starting-point`) komplett neu**, nach einer vom Nutzer bereitgestellten
   Bildvorlage, um die Sektion klarer auf Zielgruppen auszurichten: neue Headline "Process first,
   then AI." / "Erst der Prozess, dann die KI."; neue Zielgruppen-Tag-Zeile ("For: Companies /
   Education providers / Freelancers"); die bisherigen zwei Segmente (AI Starter / AI Explorer)
   wurden durch drei Personas ersetzt (STARTER / PLANNER / EXPLORER, je mit Zitat + 3 Bulletpoints,
   wörtlich aus der Bildvorlage übernommen, deutsche Übersetzung in der etablierten Seiten-Diktion
   ergänzt); neuer CTA-Button "Let's talk →" / "Lass uns sprechen →" (verlinkt auf `#kontakt`) plus
   Hinweiszeile "Also available as an open group workshop." / "Auch als offener Gruppen-Workshop
   buchbar."
6. **Fußzeile:** "München"/"Munich" steht jetzt direkt neben dem Namen (`.footer-brand-group`,
   kleiner fester Abstand) statt gleichmäßig über die ganze Fußzeile verteilt zu sein.

## Erste Schritte (Entscheidungshilfen) — jetzt intern (aktualisiert 2026-11-02)

Der Nutzer hat entschieden, dass die Entscheidungshilfen (`erste-schritte.html`,
`erste-schritte-servicemodelle.html`, `erste-schritte-ki-anbieter.html`) thematisch nicht mehr zur
neuen "AI Transformation & Enablement"-Positionierung passen. Sie bleiben im Repo bestehen, wurden
aber:

- aus der Hauptnavigation entfernt (der Menüpunkt "Erste Schritte"/"Getting Started" existiert auf
  keiner Seite mehr)
- von keiner anderen Seite mehr verlinkt (auch die "AI Assistants"-Kachel im Werkzeugkasten verlinkt
  wieder nicht, wie ursprünglich vor dem 2026-10-30-Update)
- mit `<meta name="robots" content="noindex, nofollow">` versehen
- mit einem sichtbaren Hinweis ("Internal page — not linked from the public site") direkt unter dem
  Header markiert

**Wichtige Einschränkung (dem Nutzer kommuniziert und von ihm akzeptiert):** GitHub Pages liefert
jede Datei im Repo über ihre direkte URL aus, unabhängig von Verlinkung oder `noindex`. "Intern"
bedeutet hier technisch **"nicht auffindbar/nicht indexiert"**, nicht "wirklich privat". Wer die
exakte URL kennt (z. B. über die Browser-Historie oder einen geteilten Link), kann die Seite weiterhin
öffnen. Echte Privatsphäre würde ein separates privates Repository erfordern — das war ausdrücklich
nicht die vom Nutzer gewählte Option.

## Chat-Widget (FAQ-Assistent)

Unverändert gegenüber der vorherigen Version — Design, Verhalten und Token-Nutzung bleiben
bestehen (siehe `styles-old.css`, Abschnitt "Chat widget", 1:1 in `styles.css` übernommen):

- Schwebender Button unten rechts, fixiert (`position: fixed`), auf der gesamten Seite jederzeit
  sichtbar und erreichbar, unabhängig von der Scroll-Position — kein eigener Seitenabschnitt
- Farbgebung aus denselben Tokens wie der Rest der Seite: Button-Hintergrund `--color-brand-primary`,
  Nutzer-Sprechblasen `--color-brand-secondary`, Bot-Sprechblasen `--color-surface`
- Öffnet ein kompaktes Panel (max. 320px breit) mit Verlauf, Eingabefeld und Hinweistext, dass es
  sich um einen Demo-Assistenten mit auf die Seite begrenztem Wissen handelt
- Sprachumschaltung folgt demselben Checkbox-Mechanismus wie der Rest der Seite (EN/DE-Textpaare
  innerhalb des Widgets)
- Einzige Stelle der Seite mit JavaScript — siehe tech-spec.md, Abschnitt "Chat-Widget-Ausnahme"
