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
