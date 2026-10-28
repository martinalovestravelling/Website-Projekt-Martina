# n8n prototype guide (learning track, optional)

Purpose: play with the same assistant logic visually in n8n, while you still
have access, before it migrates to the free Cloudflare Worker (chatbot/worker)
that will actually run on the live site. This prototype is not deployed
anywhere — it's just for learning/testing the prompt interactively.

## Steps

1. **Reactivate your n8n instance** (or use n8n Cloud trial / a local n8n via
   `npx n8n`, which is free and needs no subscription) just for this testing
   session.
2. **Create a new workflow.**
3. **Add a "Chat Trigger" node** (n8n's built-in chat trigger) — this gives
   you a test chat window inside the n8n editor immediately, no separate
   frontend needed.
4. **Add an "AI Agent" node** (or "Basic LLM Chain" if you prefer the
   simpler, non-agentic version — a plain Q&A over fixed knowledge doesn't
   need tools, so either works) connected to the Chat Trigger.
5. **Set the System Prompt** on that node to the exact content of
   `chatbot/worker/src/knowledge.js`'s `SYSTEM_PROMPT` constant (copy the
   text between the backticks). This is the same prompt the production
   Worker uses — testing it here first means no surprises after migration.
6. **Add a model credential** (OpenAI, Google Gemini, Anthropic — whichever
   you still have access to before Nov 6) to the AI Agent node.
7. **Test in the chat window:**
   - "What is n8n?" → should answer from the n8n course notes section.
   - "What certifications do you have?" → should answer from the profile
     facts section.
   - "What's your email address?" → should refuse / say it's not published,
     not invent one.
8. **Iterate on the prompt** here if answers are off — it's the fastest
   feedback loop since you see the chat and the node inputs/outputs side by
   side.
9. **Copy any prompt changes back** into both `chatbot/knowledge-base.md` and
   `chatbot/worker/src/knowledge.js`, then redeploy the Worker
   (`wrangler deploy` from `chatbot/worker`) so the live site matches what
   you validated here.

No migration of infrastructure is needed — the n8n workflow and the
Cloudflare Worker are two independent implementations of the same prompt.
You can throw the n8n workflow away after Nov 6 without losing anything;
the Worker keeps running on its own.
