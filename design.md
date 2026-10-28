# Design-Dokument: Professional Profile Website

Abgeleitet aus [PRD.md](PRD.md) und [tech-spec.md](tech-spec.md). Hier findest du die Seitenstruktur und die Design-Tokens für Farben und Schrift.

## Seitenstruktur
Ein One-Pager, vertikal scrollend, in dieser Reihenfolge (Nummern verweisen auf die Briefing-Abschnitte):

1. Header / Hero — Headline + Subline (4.1), dazu der Sprach-Toggle (EN/DE)
2. Kurzprofil / Bio (4.2)
3. Branchen (4.3)
4. Berufserfahrung (4.4)
5. Internationale Erfahrung (4.5)
6. Kernkompetenzen (4.6)
7. Tools (4.7)
8. Zertifizierungen (4.8)
9. Ausbildung (4.9)
10. Sprachen (4.10)
11. Arbeitsproben — Platzhalter-Sektion, deutlich als "Placeholder" gekennzeichnet
12. Kontakt — LinkedIn-Link als Platzhalter, ohne Bild
13. Footer

## Farben als Design-Tokens
Palette: Deep Navy + Helles Grau + Weiß. Als CSS Custom Properties mit festen Namen.

```css
:root {
  /* Hausfarbe 1: für Headlines, Toggle-Akzent, primäre Links */
  --color-brand-primary: #0F2C4C;   /* Deep Navy */

  /* Hausfarbe 2: für Hervorhebungen, Hover-Zustände, Akzentlinien */
  --color-brand-secondary: #D7DCE2; /* Helles Grau */

  /* Unterstützende Neutraltöne */
  --color-background: #FFFFFF;
  --color-surface: #F5F6F8;
  --color-text: #1A1A1A;
  --color-text-muted: #5B6670;
  --color-border: #E1E4E8;
}
```

## Typografie
Eine serifenlose Schrift, ohne externe Font-Abhängigkeit — das passt zum "kein Framework, keine externen Dependencies"-Ansatz aus der Tech-Spec:

```css
:root {
  --font-sans: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
```

- Headlines: `--color-brand-primary`, `--font-sans`, fett
- Fließtext: `--color-text`, `--font-sans`, normal
- Sekundärlinien/Trenner: `--color-border`
- Hervorhebungen (z. B. Zertifizierungen, Tags): `--color-brand-secondary`

## Layout-Prinzipien
- Viel Weißraum, ruhiges und seriöses Erscheinungsbild — passend zum Beraterprofil
- Klare Abschnittstrenner zwischen den oben gelisteten Blöcken
- Platzhalter-Sektionen (Arbeitsproben, Kontakt-Link) hebst du optisch ab, z. B. mit gestricheltem Rahmen plus Hinweistext ("Platzhalter — folgt")

## Responsiveness
- Mobile-first, einspaltig
- Tabellarische Inhalte aus dem Briefing (Berufserfahrung, Internationale Erfahrung, Sprachen) werden auf schmalen Bildschirmen als gestapelte Karten statt als Tabelle dargestellt

## Chat-Widget (FAQ-Assistent)
- Schwebender Button unten rechts, fixiert (`position: fixed`), auf der gesamten Seite jederzeit sichtbar und erreichbar, unabhängig von der Scroll-Position — kein eigener Seitenabschnitt
- Farbgebung aus denselben Tokens wie der Rest der Seite: Button-Hintergrund `--color-brand-primary`, Nutzer-Sprechblasen `--color-brand-secondary`, Bot-Sprechblasen `--color-surface`
- Öffnet ein kompaktes Panel (max. 320px breit) mit Verlauf, Eingabefeld und Hinweistext, dass es sich um einen Demo-Assistenten mit auf die Seite begrenztem Wissen handelt
- Sprachumschaltung folgt demselben Checkbox-Mechanismus wie der Rest der Seite (EN/DE-Textpaare innerhalb des Widgets)
- Einzige Stelle der Seite mit JavaScript — siehe tech-spec.md, Abschnitt "Chat-Widget-Ausnahme"
