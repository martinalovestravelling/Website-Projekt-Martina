# Chat-Widget – Zusammenfassung

Kurzüberblick über den FAQ-Chatbot auf der Portfolio-Seite: was er ist, wie er
aufgebaut ist und was noch zu tun ist. Details/Schritt-für-Schritt siehe
`SETUP.md`.

## Status

**Live.** Worker ist deployed unter
`https://portfolio-faq-chatbot.martinalovestravelling.workers.dev`, der Key
liegt als Cloudflare-Secret, `chat-widget.js` zeigt bereits auf die echte
Worker-URL. Getestet: n8n-Frage, Profil-Frage und eine Frage nach nicht
veröffentlichten Daten (korrekt abgelehnt) laufen wie erwartet.

## Was es ist

Ein Chat-Bubble auf der Website, der Fragen zu den Inhalten der Seite (Bio,
Skills, Zertifikate, der n8n-Kursinhalt etc.) beantwortet – auf Basis der
Fakten aus `Briefing.md`, nicht frei erfunden. Es ist die **einzige
JavaScript-Datei** der ganzen Seite; eine bewusst dokumentierte Ausnahme von
der Vorgabe "kein JavaScript" (siehe `tech-spec.md`, Abschnitt
"Chat-Widget-Ausnahme"). Der Rest der Seite bleibt statisches HTML/CSS.

## Architektur (3 Teile)

```
Browser                         Cloudflare Worker                Google Gemini
┌─────────────────┐   fetch()   ┌──────────────────────┐  API    ┌───────────┐
│ chat-widget.js   │ ──────────▶│ worker/src/index.js   │ ──────▶│ Gemini API │
│ (Chat-Bubble UI) │◀────────── │ + worker/src/knowledge.js       │ (Antwort)  │
└─────────────────┘   { reply } └──────────────────────┘◀──────── └───────────┘
```

1. **`chat-widget.js`** (Repo-Root) – Frontend. Öffnet/schließt das Chat-Fenster,
   schickt die Frage per `fetch` an den Worker, zeigt die Antwort an. Enthält
   keinen API-Key, keine Chatbot-Logik.
2. **`chatbot/worker/src/index.js`** – Backend (Cloudflare Worker). Nimmt die
   Frage entgegen, baut daraus einen Prompt zusammen (System-Prompt + Wissen
   aus `knowledge.js`) und ruft die Gemini-API auf. Probiert dabei mehrere
   Modell-Kandidaten der Reihe nach (`GEMINI_MODELS`), falls eines gerade
   überlastet ist. Hat eine CORS-Beschränkung (`ALLOWED_ORIGIN`), damit nur
   deine eigene Seite den Worker nutzen kann.
3. **`chatbot/worker/src/knowledge.js`** / **`chatbot/knowledge-base.md`** –
   die Wissensbasis, aus der der Bot antwortet. `knowledge-base.md` ist die
   lesbare Quelle, `knowledge.js` die Version, die der Worker tatsächlich
   verwendet. Beide müssen synchron gehalten werden, wenn sich `Briefing.md`
   ändert.

## Wichtig

- **Kein API-Key im Frontend.** Der Gemini-Key liegt nur als Cloudflare-Secret
  im Worker, nie im Repo oder im Browser-Code.
- **Keine erfundenen Antworten.** Fragen nach nicht veröffentlichten Daten
  (z. B. Telefonnummer) soll der Bot laut `SETUP.md`-Testplan ablehnen statt
  zu raten.
- **Laufende Kosten: 0.** Cloudflare Workers Free Tier (100.000
  Requests/Tag) + Gemini Free Tier reichen für eine Portfolio-Seite locker.

## Nächste Schritte

Siehe `SETUP.md` für die konkrete Anleitung: Gemini-API-Key holen →
Cloudflare-Account anlegen → Worker deployen → Endpoint in `chat-widget.js`
eintragen → testen.
