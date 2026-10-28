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

## Chat-Widget-Ausnahme (FAQ-Assistent)

Einzige bewusste, dokumentierte Ausnahme vom "kein JavaScript"-Prinzip: ein
schwebender FAQ-Chat-Button (`chat-widget.js`), der auf der gesamten Seite
jederzeit erreichbar ist. Der Rest der Seite bleibt vollständig JS-frei.

- **Warum eine Ausnahme nötig ist:** Ein dauerhaft erreichbarer, interaktiver
  Chat-Button (öffnen/schließen, Nachricht senden, Antwort anzeigen) lässt
  sich nicht mit dem CSS-Checkbox-Hack lösen, der für den Sprach-Toggle
  funktioniert.
- **Architektur:** `chat-widget.js` (einziges Skript im Repo, keine
  Abhängigkeiten) sendet Fragen per `fetch` an einen separaten, extern
  gehosteten Cloudflare Worker (`/chatbot/worker/`). Der Worker ruft die
  Gemini-API (kostenloser Free-Tier) mit einem festen System-Prompt auf, der
  ausschließlich auf bereits veröffentlichte Inhalte begrenzt ist (siehe
  `/chatbot/knowledge-base.md`). Kein API-Key und keine Modell-Logik liegen
  im ausgelieferten Seiten-Code.
- **Kein eigener Server/Backend im Repo nötig:** Der Worker läuft unabhängig
  bei Cloudflare (kostenloser Free-Tier, kein eigenes Hosting), die Seite
  selbst bleibt rein statisch und ohne Build-Schritt.
- **Kein-Hallucination-Prinzip gilt auch hier:** Der System-Prompt begrenzt
  Antworten strikt auf Briefing.md-Inhalte plus explizit bereitgestellte
  Zusatzdokumente (aktuell: n8n-Kursnotiz). Platzhalter-Sektionen
  (Arbeitsproben, Kontakt) werden vom Assistenten als Platzhalter benannt,
  nie mit erfundenen Inhalten gefüllt.
- Details zu Setup, Kosten und Deployment: siehe `/chatbot/SETUP.md`.
