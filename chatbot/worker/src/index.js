// Cloudflare Worker: backend for the site's FAQ chat widget.
// Receives { message, history, language } from chat-widget.js, calls the
// Gemini API with a fixed system prompt + knowledge base (see knowledge.js),
// and returns { reply }. No knowledge-base content or API key ever reaches
// the browser directly from here except the generated answer text.
//
// Required secret (set with: wrangler secret put GEMINI_API_KEY):
//   GEMINI_API_KEY - a free-tier key from https://aistudio.google.com/apikey
//
// Required var (set in wrangler.toml [vars] or dashboard):
//   ALLOWED_ORIGIN - the exact origin your site is served from,
//                    e.g. "https://yourusername.github.io"

import { SYSTEM_PROMPT } from "./knowledge.js";

// Tried in order; if one is overloaded or unavailable, the next is used.
const GEMINI_MODELS = ["gemini-3.8-flash", "gemini-flash-latest", "gemini-flash-lite-latest"];
const GEMINI_URL_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export default {
  async fetch(request, env) {
    const allowedOrigin = env.ALLOWED_ORIGIN || "*";

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(allowedOrigin) });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders(allowedOrigin) },
      });
    }

    const message = (body.message || "").toString().slice(0, 1000);
    const history = Array.isArray(body.history) ? body.history.slice(-12) : [];

    if (!message.trim()) {
      return new Response(JSON.stringify({ error: "Empty message" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders(allowedOrigin) },
      });
    }

    const contents = [
      ...history.map((turn) => ({
        role: turn.role === "assistant" ? "model" : "user",
        parts: [{ text: (turn.content || "").toString().slice(0, 1000) }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const requestBody = JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { temperature: 0.2, maxOutputTokens: 300 },
    });

    let lastErrorText = "";
    for (const model of GEMINI_MODELS) {
      try {
        const geminiResponse = await fetch(`${GEMINI_URL_BASE}/${model}:generateContent?key=${env.GEMINI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: requestBody,
          signal: AbortSignal.timeout(15000),
        });

        if (!geminiResponse.ok) {
          lastErrorText = await geminiResponse.text();
          continue; // try the next model candidate
        }

        const data = await geminiResponse.json();
        const reply =
          data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
          "Sorry, I don't have an answer for that right now.";

        return new Response(JSON.stringify({ reply }), {
          headers: { "Content-Type": "application/json", ...corsHeaders(allowedOrigin) },
        });
      } catch (err) {
        lastErrorText = String(err);
        continue; // e.g. timeout - try the next model candidate
      }
    }

    return new Response(JSON.stringify({ error: "All models unavailable", detail: lastErrorText }), {
      status: 502,
      headers: { "Content-Type": "application/json", ...corsHeaders(allowedOrigin) },
    });
  },
};
