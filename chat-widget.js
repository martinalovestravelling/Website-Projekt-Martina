// Chat widget front-end. The only JavaScript on this site — a deliberate,
// documented exception to the "no JavaScript" rule for the rest of the page
// (see tech-spec.md, section "Chat-Widget-Ausnahme"). Talks to a small
// Cloudflare Worker (see /chatbot/worker) which calls the LLM; no API key
// or model logic lives in this file.

const CHAT_ENDPOINT = "https://portfolio-faq-chatbot.martinalovestravelling.workers.dev";

(function () {
  const langToggle = document.getElementById("lang-toggle");
  const toggleButton = document.getElementById("chat-toggle-button");
  const closeButton = document.getElementById("chat-close-button");
  const panel = document.getElementById("chat-panel");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");

  if (!toggleButton || !panel || !form) return;

  let history = [];

  function isGerman() {
    return !!(langToggle && langToggle.checked);
  }

  function openPanel() {
    panel.hidden = false;
    toggleButton.setAttribute("aria-expanded", "true");
    input.focus();
  }

  function closePanel() {
    panel.hidden = true;
    toggleButton.setAttribute("aria-expanded", "false");
  }

  function addMessage(role, text) {
    const el = document.createElement("div");
    el.className = "chat-message " + (role === "user" ? "user" : "bot");
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  toggleButton.addEventListener("click", function () {
    if (panel.hidden) openPanel();
    else closePanel();
  });
  closeButton.addEventListener("click", closePanel);

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    addMessage("user", question);
    input.value = "";
    input.disabled = true;

    const thinkingText = isGerman() ? "Einen Moment…" : "One moment…";
    addMessage("bot", thinkingText);
    const thinkingEl = messages.lastChild;

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          history: history,
          language: isGerman() ? "de" : "en",
        }),
      });

      if (!response.ok) throw new Error("Request failed: " + response.status);
      const data = await response.json();
      const answer = data.reply || (isGerman()
        ? "Entschuldigung, dazu habe ich gerade keine Antwort."
        : "Sorry, I don't have an answer for that right now.");

      thinkingEl.textContent = answer;
      history.push({ role: "user", content: question });
      history.push({ role: "assistant", content: answer });
      // keep history bounded
      if (history.length > 12) history = history.slice(-12);
    } catch (err) {
      thinkingEl.textContent = isGerman()
        ? "Der Assistent ist gerade nicht erreichbar. Bitte später erneut versuchen."
        : "The assistant is currently unavailable. Please try again later.";
    } finally {
      input.disabled = false;
      input.focus();
    }
  });
})();
