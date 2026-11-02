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

**Portraitfoto:** Noch nicht geliefert. Der "Über mich"-Abschnitt hat eine Bildplatzhalterfläche
(`.about-photo-placeholder`, gleiche gestrichelte Optik wie die übrigen Bildplatzhalter) mit dem
Hinweis "[Portrait – Platzhalter]". Sobald eine Datei vorliegt (z. B. unter
`images/martina-portrait.jpg`), kann sie dort eingesetzt werden.

**`accelerator.html`:** neue Unterseite, gleiches Grundgerüst wie `erste-schritte.html`
(Header/Nav/Footer/Chat-Widget identisch). Enthält die 7 Journey-Boxen als Sprunglinks (Anker je
Phase) sowie alle 11 Module, nach Phase gruppiert, als nicht aufklappbare Karten (Inhalte direkt
sichtbar, wie im Quelldokument gefordert). Abschließender CTA verlinkt zurück auf
`index.html#kontakt`.

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
