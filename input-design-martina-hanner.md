# Website Martina Hanner – Startseite

Diese Datei enthält alles, was du brauchst, um deine Startseite mit **Visual Studio Code** und **GitHub Pages** online zu bringen: die Designvorgaben, eine Schritt-für-Schritt-Anleitung und den kompletten Code.

---

## 1. Designvorgaben

### Farben

| Name | Hex | Verwendung |
|---|---|---|
| Dunkelblau | `#1B3A5C` | Kopfzeile, Fußzeile, Buttons, Überschriften |
| Beige (Hintergrund) | `#EFE6DA` | Seitenhintergrund |
| Sand | `#E2D3BF` | Leistungen-Bereich, Akzentflächen |
| Hell-Creme | `#F5EEE4` | Kacheln |
| Kaffeebraun | `#8C6E52` | Nummern, kleine Akzente |
| Textfarbe | `#2E2620` | Fließtext |

### Schriften

- **Montserrat** (Überschriften, Name, Nummern)
- **Open Sans** (Fließtext, Menü, Buttons)

Beide werden kostenlos über Google Fonts geladen. Wenn du später andere Schriften willst, änderst du nur die `<link>`-Zeile im `<head>` und die `font-family`-Angaben.

### Aufbau der Seite

1. **Kopfzeile** (dunkelblau): Logo und Name links, Kontakt-Button und DE/EN-Umschalter rechts. Darunter die Menüpunkte Leistungen, Portfolio, Über mich, Ressourcen und News in einer Zeile (bei wenig Platz seitlich verschiebbar).
2. **Einstieg:** großes Hintergrundfoto mit „GEMEINSAM VERÄNDERN.“ und zwei runden Buttons.
3. **Alles auf einen Blick:** drei Kacheln oben, zwei breite Kacheln unten.
4. **Leistungen:** nummerierte Liste (01–07) mit Einleitung und Button.
5. **Werkzeugkasten:** runde Icons mit Tool-Kategorien.
6. **Kontaktblock** und **Fußzeile**.

---

## 2. Schritt für Schritt online stellen

### Was du brauchst

- Ein kostenloses Konto auf [github.com](https://github.com)
- [Visual Studio Code](https://code.visualstudio.com) installiert
- [Git](https://git-scm.com) installiert (VS Code fragt beim ersten Mal danach)

### Schritte

1. **Repository anlegen:** Auf GitHub oben rechts auf **+ → New repository** klicken. Als Namen `deinbenutzername.github.io` eingeben (dein echter GitHub-Benutzername), **Public** wählen und **Create repository** klicken.
2. **In VS Code öffnen:** In VS Code `Strg + Umschalt + P` (Mac: `Cmd + Umschalt + P`) drücken, **Git: Clone** eingeben, die Adresse deines neuen Repositorys einfügen und einen Ordner auf deinem Computer wählen.
3. **Datei anlegen:** Im geklonten Ordner eine neue Datei `index.html` erstellen und den Code aus Abschnitt 4 hineinkopieren. Speichern.
4. **Bilder-Ordner anlegen:** Einen Ordner `images` erstellen. Hier kommen später dein Foto und dein Logo hinein (siehe Abschnitt 3).
5. **Vorschau ansehen:** Die `index.html` im Dateiexplorer doppelt anklicken, dann öffnet sie sich im Browser. Bequemer geht es mit der VS-Code-Erweiterung **Live Server** (Rechtsklick auf die Datei → **Open with Live Server**).
6. **Hochladen:** Links in VS Code auf das Symbol **Quellcodeverwaltung** klicken, eine kurze Nachricht eingeben (z. B. „Startseite“), auf **Commit** und danach auf **Sync / Push** klicken.
7. **Fertig:** Nach ein bis zwei Minuten ist deine Seite unter `https://deinbenutzername.github.io` erreichbar. Falls nicht: Im Repository unter **Settings → Pages** prüfen, dass als Quelle der Branch `main` ausgewählt ist.

> **Eigene Domain** (z. B. `martinahanner.de`): Unter **Settings → Pages → Custom domain** eintragen und bei deinem Domain-Anbieter die DNS-Einträge setzen, die GitHub dort anzeigt.

---

## 3. Platzhalter ersetzen

Im Code sind Stellen markiert, die du später mit echten Inhalten füllst. Mit `Strg + F` in VS Code findest du sie schnell.

| Suchbegriff im Code | Was du tust |
|---|---|
| `[Dein Foto – groß, leicht unscharf als Hintergrund]` | Foto als `images/hero.jpg` speichern. In der `<section>` direkt darüber `background: #7A6654` ersetzen durch `background: #7A6654 url('images/hero.jpg') center/cover` und den Platzhaltertext löschen. Für den Unschärfe-Effekt das Foto am besten schon vorher leicht weichzeichnen (z. B. in Canva) und abdunkeln, damit der helle Text gut lesbar bleibt. |
| `LOGO` | Das `<span>` mit dem Text `LOGO` ersetzen durch `<img src="images/logo.png" alt="Logo Martina Hanner" style="width: 48px; height: 48px; border-radius: 50%">` |
| `[Bild]` | In den Kacheln wie beim Foto: `background: url('images/kachel-1.jpg') center/cover` ergänzen und den Text löschen. |
| `[Titel deines neuesten Beitrags]` | Deinen News-Titel eintragen. |
| `href="#"` | Durch die echten Links ersetzen, sobald es die Unterseiten gibt (z. B. `portfolio.html`). |

**Impressum und Datenschutz:** Für eine geschäftliche Website in Deutschland sind beide Pflicht. Lege dafür eigene Seiten an (z. B. `impressum.html`) und verlinke sie in der Fußzeile.

**Englische Version:** Der DE/EN-Umschalter ist bisher nur optisch vorhanden. Am einfachsten legst du später eine Kopie als `en/index.html` mit englischen Texten an und verlinkst „EN“ dorthin.

---

## 4. Der komplette Code (`index.html`)

```html
<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Martina Hanner – Transformation, Prozesse & KI</title>
<meta name="description" content="Martina Hanner – Beraterin für Transformation, E2E-Prozessdesign, agile Umsetzung, Change Management und KI.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style>
body{margin:0}
html{scroll-behavior:smooth}
a{color:#1B3A5C}a:hover{color:#0F2338}
a:focus-visible{outline:3px solid #8C6E52;outline-offset:3px}
.mh-menu{scrollbar-width:thin;scrollbar-color:#8FA3B8 transparent}
@media (max-width: 560px){.mh-name{display:none}}
@media (max-width: 600px){h1{font-size:52px !important}}
@media (prefers-reduced-motion: reduce){html{scroll-behavior:auto}}
</style>
</head>
<body>
<div style="font-family: 'Open Sans', system-ui, sans-serif; color: #2E2620; background: #EFE6DA; min-height: 100vh; display: flex; flex-direction: column">

  <header style="background: #1B3A5C; display: flex; flex-direction: column; gap: 10px; padding: 18px 5% 10px">
    <div style="display: flex; flex-wrap: nowrap; align-items: center; justify-content: space-between; gap: 16px">
    <a href="#" style="flex: none; display: flex; align-items: center; gap: 12px; text-decoration: none; color: #F7F1E8">
      <span style="width: 48px; height: 48px; border-radius: 50%; border: 2px dashed #E2D3BF; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; letter-spacing: 0.08em">LOGO</span>
      <span class="mh-name" style="font-family: Montserrat, system-ui, sans-serif; font-weight: 800; font-size: 17px; letter-spacing: 0.08em; white-space: nowrap">MARTINA HANNER</span>
    </a>
    <div style="flex: none; display: flex; align-items: center; gap: 12px">
      <a href="#kontakt" style="flex: none; white-space: nowrap; color: #1B3A5C; background: #EFE6DA; text-decoration: none; padding: 12px 22px; font-size: 15px; font-weight: 700; border-radius: 999px">Kontakt</a>
      <span style="flex: none; display: flex; border: 1px solid #8FA3B8; border-radius: 999px; padding: 3px">
        <a href="#" style="padding: 8px 14px; border-radius: 999px; background: #E2D3BF; color: #1B3A5C; font-size: 13px; font-weight: 700; text-decoration: none">DE</a>
        <a href="#" style="padding: 8px 14px; border-radius: 999px; color: #E2D3BF; font-size: 13px; font-weight: 700; text-decoration: none">EN</a>
      </span>
    </div>
    </div>
    <nav class="mh-menu" style="display: flex; flex-wrap: nowrap; align-items: center; gap: 2px; overflow-x: auto; margin-left: -14px">
        <a href="#leistungen" style="flex: none; white-space: nowrap; color: #F7F1E8; text-decoration: none; padding: 12px 14px; font-size: 15px">Leistungen</a>
        <a href="#" style="flex: none; white-space: nowrap; color: #F7F1E8; text-decoration: none; padding: 12px 14px; font-size: 15px">Portfolio</a>
        <a href="#" style="flex: none; white-space: nowrap; color: #F7F1E8; text-decoration: none; padding: 12px 14px; font-size: 15px">Über mich</a>
        <a href="#werkzeugkasten" style="flex: none; white-space: nowrap; color: #F7F1E8; text-decoration: none; padding: 12px 14px; font-size: 15px">Ressourcen</a>
        <a href="#" style="flex: none; white-space: nowrap; color: #F7F1E8; text-decoration: none; padding: 12px 14px; font-size: 15px">News</a>
    </nav>
  </header>

  <div style="padding: 0">
    <section style="position: relative; background: #7A6654; min-height: 600px; border-radius: 0; overflow: hidden; display: flex; align-items: center; padding: 64px 5%; box-sizing: border-box">
      <span style="position: absolute; right: 24px; bottom: 20px; font-size: 13px; color: #F4ECE1">[Dein Foto – groß, leicht unscharf als Hintergrund]</span>
      <div style="max-width: 680px; display: flex; flex-direction: column; gap: 26px">
        <h1 style="margin: 0; font-family: Montserrat, system-ui, sans-serif; font-weight: 800; font-size: 80px; line-height: 0.98; color: #F7F1E8; letter-spacing: -0.01em">GEMEINSAM<br>VERÄNDERN.</h1>
        <div style="width: 64px; height: 5px; border-radius: 3px; background: #E2D3BF"></div>
        <p style="margin: 0; font-size: 19px; line-height: 1.6; color: #F4ECE1">Prozesse. Menschen. KI. Transformation, die ankommt.</p>
        <div style="display: flex; flex-wrap: wrap; gap: 12px">
          <a href="#leistungen" style="background: #EFE6DA; color: #1B3A5C; text-decoration: none; font-weight: 700; font-size: 15px; padding: 16px 28px; border-radius: 999px">Meine Leistungen</a>
          <a href="#kontakt" style="border: 2px solid #F7F1E8; color: #F7F1E8; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 26px; border-radius: 999px">Lass uns sprechen</a>
        </div>
      </div>
    </section>
  </div>

  <section id="kompetenzen" style="max-width: 1320px; margin: 0 auto; padding: 72px 24px; box-sizing: border-box">
    <p style="margin: 0 0 8px; font-size: 13px; font-weight: 700; letter-spacing: 0.14em; color: #6B5444">ENTDECKEN</p>
    <h2 style="margin: 0 0 36px; font-family: Montserrat, system-ui, sans-serif; font-size: 36px; line-height: 1.2; color: #1B3A5C">Alles auf einen Blick</h2>
    <div style="display: flex; flex-direction: column; gap: 20px">
    <div style="display: flex; flex-wrap: wrap; gap: 20px">
      <a href="#" style="flex: 1 1 260px; background: #F5EEE4; border-radius: 20px; overflow: hidden; text-decoration: none; display: flex; flex-direction: column">
        <span style="height: 130px; background: #C9B49A; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #3E3026">[Bild]</span>
        <span style="padding: 22px 24px 26px; display: flex; flex-direction: column; gap: 10px">
          <span style="font-size: 12px; font-weight: 700; letter-spacing: 0.14em; color: #6B5444">KOMPETENZEN</span>
          <span style="font-family: Montserrat, system-ui, sans-serif; font-weight: 700; font-size: 20px; line-height: 1.25; color: #1B3A5C">Prozesse, Agilität, Change</span>
        </span>
      </a>
      <a href="#" style="flex: 1 1 260px; background: #F5EEE4; border-radius: 20px; overflow: hidden; text-decoration: none; display: flex; flex-direction: column">
        <span style="height: 130px; background: #B19B83; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #2E2620">[Bild]</span>
        <span style="padding: 22px 24px 26px; display: flex; flex-direction: column; gap: 10px">
          <span style="font-size: 12px; font-weight: 700; letter-spacing: 0.14em; color: #6B5444">ÜBER MICH</span>
          <span style="font-family: Montserrat, system-ui, sans-serif; font-weight: 700; font-size: 20px; line-height: 1.25; color: #1B3A5C">International. Neugierig. Pragmatisch.</span>
        </span>
      </a>
      <a href="#" style="flex: 1 1 260px; background: #F5EEE4; border-radius: 20px; overflow: hidden; text-decoration: none; display: flex; flex-direction: column">
        <span style="height: 130px; background: #CDBBA6; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #3E3026">[Bild]</span>
        <span style="padding: 22px 24px 26px; display: flex; flex-direction: column; gap: 10px">
          <span style="font-size: 12px; font-weight: 700; letter-spacing: 0.14em; color: #6B5444">PORTFOLIO</span>
          <span style="font-family: Montserrat, system-ui, sans-serif; font-weight: 700; font-size: 20px; line-height: 1.25; color: #1B3A5C">Von der Analyse bis zur Hypercare</span>
        </span>
      </a>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 20px">
      <a href="#" style="flex: 1 1 360px; background: #1B3A5C; border-radius: 20px; overflow: hidden; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between; padding: 26px 24px; gap: 20px; min-height: 220px; box-sizing: border-box">
        <span style="font-size: 12px; font-weight: 700; letter-spacing: 0.14em; color: #E2D3BF">NEWS</span>
        <span style="font-family: Montserrat, system-ui, sans-serif; font-weight: 700; font-size: 22px; line-height: 1.25; color: #F7F1E8">[Titel deines neuesten Beitrags]</span>
        <span style="align-self: flex-start; border: 2px solid #E2D3BF; color: #F7F1E8; font-weight: 700; font-size: 14px; padding: 10px 18px; border-radius: 999px">Weiterlesen</span>
      </a>
      <a href="#" style="flex: 1 1 360px; background: #E2D3BF; border-radius: 20px; overflow: hidden; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between; padding: 26px 24px; gap: 20px; min-height: 220px; box-sizing: border-box">
        <span style="font-size: 12px; font-weight: 700; letter-spacing: 0.14em; color: #5A4636">RESSOURCEN</span>
        <span style="font-family: Montserrat, system-ui, sans-serif; font-weight: 700; font-size: 22px; line-height: 1.25; color: #1B3A5C">Community &amp; Kolleg:innen</span>
        <span style="align-self: flex-start; background: #1B3A5C; color: #F7F1E8; font-weight: 700; font-size: 14px; padding: 12px 20px; border-radius: 999px">Entdecken</span>
      </a>
    </div>
    </div>
  </section>

  <section id="leistungen" style="background: #E2D3BF; padding: 72px 24px">
    <div style="max-width: 1320px; margin: 0 auto">
    <p style="margin: 0 0 8px; font-size: 13px; font-weight: 700; letter-spacing: 0.14em; color: #5A4636">LEISTUNGEN</p>
    <h2 style="margin: 0 0 36px; font-family: Montserrat, system-ui, sans-serif; font-size: 36px; line-height: 1.2; color: #1B3A5C">Was ich für dich übernehme</h2>
    <div style="display: flex; flex-wrap: wrap; gap: 48px; align-items: flex-start">
      <div style="flex: 1 1 300px; display: flex; flex-direction: column; gap: 20px">
        <p style="margin: 0; font-size: 17px; line-height: 1.6; color: #4A3A2E">Einzelne Projektschritte oder die ganze Strecke – vom ersten Workshop bis zum Rollout.</p>
        <a href="#kontakt" style="align-self: flex-start; background: #1B3A5C; color: #F7F1E8; text-decoration: none; font-weight: 700; font-size: 15px; padding: 16px 28px; border-radius: 999px">Leistung anfragen</a>
      </div>
      <div style="flex: 2 1 600px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0 40px">
        <div style="border-top: 2px solid #1B3A5C; padding: 20px 0 24px; display: flex; gap: 18px"><span style="font-family: Montserrat, system-ui, sans-serif; font-weight: 800; font-size: 18px; color: #8C6E52">01</span><span style="display: flex; flex-direction: column; gap: 6px"><span style="font-weight: 700; font-size: 17px; color: #2E2620">Workshops &amp; Moderation</span><span style="font-size: 15px; line-height: 1.5; color: #4A3A2E">Design Thinking, Entscheidungsrunden, Teams ausrichten.</span></span></div>
        <div style="border-top: 2px solid #1B3A5C; padding: 20px 0 24px; display: flex; gap: 18px"><span style="font-family: Montserrat, system-ui, sans-serif; font-weight: 800; font-size: 18px; color: #8C6E52">02</span><span style="display: flex; flex-direction: column; gap: 6px"><span style="font-weight: 700; font-size: 17px; color: #2E2620">Ist- &amp; Soll-Analyse</span><span style="font-size: 15px; line-height: 1.5; color: #4A3A2E">Systemlandschaft, Gap-Analyse, Anforderungen.</span></span></div>
        <div style="border-top: 2px solid #1B3A5C; padding: 20px 0 24px; display: flex; gap: 18px"><span style="font-family: Montserrat, system-ui, sans-serif; font-weight: 800; font-size: 18px; color: #8C6E52">03</span><span style="display: flex; flex-direction: column; gap: 6px"><span style="font-weight: 700; font-size: 17px; color: #2E2620">E2E-Prozessdesign</span><span style="font-size: 15px; line-height: 1.5; color: #4A3A2E">Prozesse modellieren und dokumentieren (BPMN, Signavio).</span></span></div>
        <div style="border-top: 2px solid #1B3A5C; padding: 20px 0 24px; display: flex; gap: 18px"><span style="font-family: Montserrat, system-ui, sans-serif; font-weight: 800; font-size: 18px; color: #8C6E52">04</span><span style="display: flex; flex-direction: column; gap: 6px"><span style="font-weight: 700; font-size: 17px; color: #2E2620">Agile Umsetzung &amp; Rollout</span><span style="font-size: 15px; line-height: 1.5; color: #4A3A2E">Scrum, PMO, Multi-Market-Rollouts bis zur Hypercare.</span></span></div>
        <div style="border-top: 2px solid #1B3A5C; padding: 20px 0 24px; display: flex; gap: 18px"><span style="font-family: Montserrat, system-ui, sans-serif; font-weight: 800; font-size: 18px; color: #8C6E52">05</span><span style="display: flex; flex-direction: column; gap: 6px"><span style="font-weight: 700; font-size: 17px; color: #2E2620">Change Management &amp; Training</span><span style="font-size: 15px; line-height: 1.5; color: #4A3A2E">Schulungen vor Ort und virtuell, Wissenstransfer.</span></span></div>
        <div style="border-top: 2px solid #1B3A5C; padding: 20px 0 24px; display: flex; gap: 18px"><span style="font-family: Montserrat, system-ui, sans-serif; font-weight: 800; font-size: 18px; color: #8C6E52">06</span><span style="display: flex; flex-direction: column; gap: 6px"><span style="font-weight: 700; font-size: 17px; color: #2E2620">KI-Grundkurs</span><span style="font-size: 15px; line-height: 1.5; color: #4A3A2E">Was ist KI? Welche Tools gibt es? Erste Schritte im Alltag.</span></span></div>
        <div style="border-top: 2px solid #1B3A5C; padding: 20px 0 24px; display: flex; gap: 18px"><span style="font-family: Montserrat, system-ui, sans-serif; font-weight: 800; font-size: 18px; color: #8C6E52">07</span><span style="display: flex; flex-direction: column; gap: 6px"><span style="font-weight: 700; font-size: 17px; color: #2E2620">Coaching</span><span style="font-size: 15px; line-height: 1.5; color: #4A3A2E">Begleitung für Menschen und Teams im Wandel.</span></span></div>
      </div>
    </div>
    </div>
  </section>

  <section id="werkzeugkasten" style="padding: 72px 24px">
    <div style="max-width: 1320px; margin: 0 auto">
      <p style="margin: 0 0 8px; font-size: 13px; font-weight: 700; letter-spacing: 0.14em; color: #6B5444">WERKZEUGKASTEN</p>
      <h2 style="margin: 0 0 36px; font-family: Montserrat, system-ui, sans-serif; font-size: 36px; line-height: 1.2; color: #1B3A5C">Tools, mit denen ich arbeite</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); justify-items: center; gap: 36px 24px; text-align: center">
        <div style="width: 180px; display: flex; flex-direction: column; align-items: center; gap: 12px">
          <span style="width: 96px; height: 96px; border-radius: 50%; background: #1B3A5C; display: flex; align-items: center; justify-content: center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F7F1E8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v10H9l-5 4z"></path><path d="M8 9h8M8 12h5"></path></svg>
          </span>
          <span style="font-weight: 700; font-size: 16px; color: #2E2620">KI-Assistenten</span>
          <span style="font-size: 14px; color: #5A4636">ChatGPT, Claude, Gemini, Mistral</span>
        </div>
        <div style="width: 180px; display: flex; flex-direction: column; align-items: center; gap: 12px">
          <span style="width: 96px; height: 96px; border-radius: 50%; background: #F5EEE4; border: 2px solid #1B3A5C; box-sizing: border-box; display: flex; align-items: center; justify-content: center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1B3A5C" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5" cy="12" r="2.5"></circle><circle cx="19" cy="5" r="2.5"></circle><circle cx="19" cy="19" r="2.5"></circle><path d="M7.5 12h4M11.5 12l5-6M11.5 12l5 6"></path></svg>
          </span>
          <span style="font-weight: 700; font-size: 16px; color: #2E2620">Automatisierung</span>
          <span style="font-size: 14px; color: #5A4636">n8n</span>
        </div>
        <div style="width: 180px; display: flex; flex-direction: column; align-items: center; gap: 12px">
          <span style="width: 96px; height: 96px; border-radius: 50%; background: #1B3A5C; display: flex; align-items: center; justify-content: center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F7F1E8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="6" height="5" rx="1"></rect><rect x="15" y="4" width="6" height="5" rx="1"></rect><rect x="9" y="15" width="6" height="5" rx="1"></rect><path d="M9 6.5h6M6 9v3h12V9M12 12v3"></path></svg>
          </span>
          <span style="font-weight: 700; font-size: 16px; color: #2E2620">Prozessmodellierung</span>
          <span style="font-size: 14px; color: #5A4636">Signavio, BPMN, LeanIX</span>
        </div>
        <div style="width: 180px; display: flex; flex-direction: column; align-items: center; gap: 12px">
          <span style="width: 96px; height: 96px; border-radius: 50%; background: #F5EEE4; border: 2px solid #1B3A5C; box-sizing: border-box; display: flex; align-items: center; justify-content: center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1B3A5C" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="5" height="16" rx="1"></rect><rect x="10" y="4" width="5" height="10" rx="1"></rect><rect x="17" y="4" width="4" height="7" rx="1"></rect></svg>
          </span>
          <span style="font-weight: 700; font-size: 16px; color: #2E2620">Agile Tools</span>
          <span style="font-size: 14px; color: #5A4636">JIRA, Confluence</span>
        </div>
        <div style="width: 180px; display: flex; flex-direction: column; align-items: center; gap: 12px">
          <span style="width: 96px; height: 96px; border-radius: 50%; background: #1B3A5C; display: flex; align-items: center; justify-content: center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F7F1E8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="3"></circle><circle cx="17" cy="9" r="2.5"></circle><path d="M2.5 19c.8-3.2 3-5 5.5-5s4.7 1.8 5.5 5M14 15.2c.9-.8 1.9-1.2 3-1.2 2 0 3.7 1.4 4.3 4"></path></svg>
          </span>
          <span style="font-weight: 700; font-size: 16px; color: #2E2620">Zusammenarbeit</span>
          <span style="font-size: 14px; color: #5A4636">M365, MS CRM, SAP C/4HANA</span>
        </div>
      </div>
    </div>
  </section>

  <section id="kontakt" style="padding: 0 24px 72px">
    <div style="max-width: 1320px; margin: 0 auto; background: #1B3A5C; border-radius: 28px; padding: 48px 5%; box-sizing: border-box; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 28px">
      <div style="display: flex; flex-direction: column; gap: 10px">
        <h2 style="margin: 0; font-family: Montserrat, system-ui, sans-serif; font-size: 36px; line-height: 1.2; color: #F7F1E8">Lust auf ein Gespräch?</h2>
        <p style="margin: 0; font-size: 17px; color: #E2D3BF">Ich freue mich auf neue Kontakte und Projekte.</p>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 12px">
        <a href="#" style="background: #EFE6DA; color: #1B3A5C; text-decoration: none; font-weight: 700; font-size: 15px; padding: 16px 28px; border-radius: 999px">Nachricht schreiben</a>
        <a href="#" style="border: 2px solid #E2D3BF; color: #F7F1E8; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 26px; border-radius: 999px">Termin vereinbaren</a>
      </div>
    </div>
  </section>

  <footer style="flex: 1 0 auto; background: #1B3A5C; color: #E9DFD3; padding: 40px 5%; display: flex; flex-wrap: wrap; align-content: flex-start; gap: 24px; justify-content: space-between; font-size: 14px">
    <span style="font-family: Montserrat, system-ui, sans-serif; font-weight: 800; letter-spacing: 0.08em">MARTINA HANNER</span>
    <span>martina.hanner@gmx.de · München</span>
    <span>Impressum · Datenschutz</span>
  </footer>
</div>
</body>
</html>
```
