# Tech-Spec: Professional Profile Website

Abgeleitet aus [PRD.md](PRD.md).

## Ziel
Rein statische Website: nur HTML und CSS, kein Framework, kein Build-Prozess. Läuft direkt über GitHub Pages.

## Hosting
- GitHub Pages (Branch `main`, Root-Verzeichnis — Platzierung in `/docs` als Alternative offen)
- Kein Server, kein Backend, keine serverseitige Logik
- Kein Build-Schritt: Dateien werden 1:1 so ausgeliefert, wie sie im Repo liegen

## Dateistruktur
```
/
├── index.html
├── styles.css
└── (Projektdokumente wie PRD.md, tech-spec.md, design.md, Briefing.md — nicht Teil der ausgelieferten Seite)
```
Falls später Bilder/Assets dazukommen: eigener Ordner `/assets/`.

## Sprachumschaltung ohne JavaScript
EN/DE-Toggle wird rein mit CSS umgesetzt (Checkbox-Hack), kein JavaScript nötig:
- Verstecktes `<input type="checkbox" id="lang-toggle">` plus sichtbares `<label>` als Schalter
- Jeder Textblock liegt zweimal im HTML vor (Englisch und Deutsch), markiert mit Klassen, z. B. `.lang-en` / `.lang-de`
- Per CSS: `.lang-de` ist standardmäßig ausgeblendet; sobald die Checkbox über `:checked` aktiv ist, wird über Geschwister-Selektoren (`~`) umgeschaltet, sodass EN aus- und DE eingeblendet wird (und umgekehrt)
- Erfüllt die PRD-Kriterien zu Sprach-Default (EN zuerst) und Toggle-Verhalten ohne JS

## Browser-Support
- Aktuelle Evergreen-Browser (Chrome, Firefox, Safari, Edge)
- Kein Support für veraltete Browser (z. B. IE) nötig

## Nicht-Ziele (aus PRD übernommen)
- Kein funktionierendes Kontaktformular — nur Platzhalter-Link (LinkedIn)
- Keine befüllten Arbeitsproben-Inhalte — nur Platzhalter-Sektion
- Kein Framework, kein Build-Tool, keine externen JS-Abhängigkeiten

## Offene Punkte
- Ablage im Repo: Root vs. `/docs` noch zu entscheiden
- Spätere Erweiterungen laut Backlog (echtes Kontaktformular, Work-Samples-Inhalte) sind mit dem aktuellen "kein JS"-Ansatz nicht automatisch abgedeckt und müssten separat bewertet werden, sobald sie umgesetzt werden
