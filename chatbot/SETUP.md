# Chatbot setup checklist (free-tier production path)

This is the part only you can do (accounts, keys, deployment). Everything
else (Worker code, widget, knowledge base) is already written.

## 1. Get a free Gemini API key
1. Go to https://aistudio.google.com/apikey and sign in with a Google account.
2. Create an API key (free tier, no credit card required for the free quota).
3. Keep it somewhere safe for a moment — **never paste it into chat, a commit,
   or any file in this repo.** It goes into Cloudflare as a secret (step 3).

## 2. Create a free Cloudflare account
1. Sign up at https://dash.cloudflare.com/sign-up (free plan is enough).
2. Install the CLI once Node.js is available on your machine:
   `npm install -g wrangler`
3. Log in: `wrangler login` (opens a browser window to authorize).

## 3. Deploy the Worker
From the `chatbot/worker` folder:
```
wrangler deploy
```
Then set the secret (you'll be prompted to paste the Gemini key — this goes
straight to Cloudflare, not into any file):
```
wrangler secret put GEMINI_API_KEY
```
Wrangler will print your Worker's URL, something like:
`https://portfolio-faq-chatbot.<your-subdomain>.workers.dev`

## 4. Restrict access to your own site (recommended)
Edit `chatbot/worker/wrangler.toml`, set:
```
ALLOWED_ORIGIN = "https://<yourusername>.github.io"
```
Redeploy with `wrangler deploy`.

## 5. Point the widget at your Worker
In `chat-widget.js` (repo root), replace:
```js
const CHAT_ENDPOINT = "https://REPLACE-ME.workers.dev/chat";
```
with your real Worker URL from step 3, plus `/chat` is not a separate route
here — the Worker answers on its root path, so just use the Worker URL
itself (no `/chat` suffix needed; drop it if you used the exact URL wrangler
printed).

## 6. Test
Open the published site (or `index.html` locally — note: a local file can't
call a remote Worker if your browser blocks mixed-origin requests from
`file://`; easiest is to test after publishing to GitHub Pages, or serve the
folder locally with any static file server).
- Click the chat bubble, ask "What is n8n?" → should answer from the n8n
  course notes.
- Ask something about the profile (e.g. "What certifications do you have?")
  → should answer from Briefing.md facts.
- Ask something unrelated (e.g. "What's your phone number?") → should say
  this isn't published on the site, not invent an answer.

## Ongoing cost
- Cloudflare Workers free tier: 100,000 requests/day — far more than a
  portfolio site needs.
- Gemini API free tier: rate-limited but free for this kind of low-volume
  use. If Google changes free-tier terms later, swap the model call in
  `chatbot/worker/src/index.js` for another provider's free tier (e.g. Groq)
  — the rest of the architecture (Worker, widget, knowledge base) stays the
  same.
- No n8n instance, no subscription, required for this to keep running.

## Keeping the knowledge base in sync
If Briefing.md changes, update both `chatbot/knowledge-base.md` (human-
readable source) and `chatbot/worker/src/knowledge.js` (the string the
Worker actually uses), then `wrangler deploy` again.
