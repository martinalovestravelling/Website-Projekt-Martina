# Chatbot Knowledge Base (canonical source)

This file is the **only** source of truth for what the FAQ chat assistant is
allowed to answer. It is a plain copy of already-published content — nothing
here is new or invented. If it's not in this file, the assistant must say so
rather than guess.

Keep this file and `worker/src/knowledge.js` in sync whenever Briefing.md
changes or new "explicitly provided" material (like the n8n notes) is added.

## Scope rules for the assistant

- Answer only using the "Profile facts" and "n8n course notes" sections below.
- If a question falls outside this material (e.g. asks for a name, photo,
  contact details, employer names, or anything not listed here), say that
  this information isn't published on the site and point to the Contact
  section placeholder instead of guessing.
- The "Work Samples" and "Contact" sections of the site are explicitly
  placeholders — if asked about them, say so plainly, don't invent sample
  projects or a real contact link.
- Never state or imply a name, photo, date of birth, phone number, email
  address, postal address, place of residence, employer name, or university
  name — none of these exist in the source material, and none should ever
  appear in an answer.
- Answer in the language the visitor used (English or German). Keep answers
  short and factual.

## Profile facts

(Mirrors Briefing.md section 4 exactly — see that file for the authoritative
version with full EN/DE pairs.)

- Headline: Business Transformation & Process Consultant — E2E Process
  Design, Agile Delivery, Change Management.
- Bio: Business transformation consultant with 6+ years of experience in
  global consulting and 3+ years in sales. Supported large-scale IT and
  sales transformations across several industries — analyzing/designing
  end-to-end processes, identifying gaps, leading multi-market rollouts and
  hypercare. Enjoys bringing diverse international teams together,
  facilitating workshops, turning complex challenges into pragmatic,
  lasting solutions. Currently expanding expertise in AI consultancy and AI
  change management, and training as a certified coach.
- Industries: Automotive, Utilities, Aeronautics, Environmental Services.
- Professional experience:
  - Global management consultancy, Business Consultant (2019-2025), across
    roles: E2E Process Designer, Taskforce Lead, Activation Tech Squad
    Lead/Rollout Manager, Workstream Lead, Scrum Master, Test Manager,
    Trainer/Change Management Support, Product Transition Support,
    Go-to-Market Support, PMO. (See Briefing.md 4.4 for the focus areas of
    each role.)
  - Technology & engineering services company, Assistant to Head of Sales
    (2013-2017): proposal management, customer data management, contract
    pre-evaluation, internal process optimization, CRM key user.
  - Electronics manufacturer, Internship Sales & Distribution (2013,
    France).
- International experience: professional experience in Germany and France;
  workshops in China; workshops in Canada; lived and worked in Australia;
  lived and studied in Latin America (Spanish).
- Core skills: Process & Business Analysis; Transformation & Rollout; Agile
  Delivery; Change & Enablement; Project Management & Governance; Quality;
  AI (AI consultancy, AI enterprise, AI change management, GenAI as a
  transformation lever). (See Briefing.md 4.6 for the detailed skill lists.)
- Tools: Signavio, LeanIX, JIRA, Confluence, SAP C/4HANA, MS CRM, M365,
  ChatGPT, Claude, Gemini, Mistral, n8n.
- Certifications: LeanIX Practitioner; ITIL 4 Foundation; Certified SAFe
  5.1 Agilist; Professional Scrum Master I; Certified Agile Requirements
  Specialist (CARS); Management 3.0; AI Manager (in progress); Certified
  Coach (in progress).
- Education: B.Sc. Business Administration, focus on Value Added
  Management.
- Languages: German (native), English (advanced), French (intermediate),
  Spanish (intermediate), Arabic (beginner), Latin (Latinum).
- Work Samples section: placeholder, no content yet.
- Contact: LinkedIn link placeholder, no real URL yet.

## n8n course notes

Source: `n8n_Uebersicht_Workflow_vs_KI_Agent.md` (course KI2, day 10/11).

- n8n is a visual automation tool: nodes on a canvas form a workflow of
  trigger (form, schedule, webhook, incoming mail), processing (set fields,
  run code, fetch data, check conditions, AI building block), and output
  (mail, table, form response page, message). The key trait: the flow is
  fixed — same input always produces the same sequence of steps.
- Typical uses: moving/transforming data, connecting systems (CRM, mail,
  calendar, chat, databases, APIs), recurring routines, a workflow with one
  AI step (writing/classifying/summarizing text while the rest of the flow
  stays fixed), and agent workflows (trigger, agent with a tool, formatting,
  output).
- Decision rule from the course: "If the task repeats the same way every
  time, use a workflow. If it's different every time, use AI." Five
  reasoning anchors: determinism, cost, operability, debugging ease, and
  credential risk — workflows score better on all five, agents trade that
  predictability for flexibility.
- Rule of thumb: if Excel or a simple workflow is enough, use that; if only
  a single step needs language/interpretation, use a workflow with an AI
  step; if the path can't be fixed in advance (open-ended, changing task),
  use an agent.
- Typical mistakes: not validating AI-generated text before sending it;
  letting the AI do calculations instead of deterministic code; hardcoded
  values instead of parameters; incomplete case handling (e.g. a formula
  that only covers one of several possible terms); not rounding money
  values correctly; an AI answer that's generated but never actually used
  downstream; renaming nodes breaking expressions that reference them by
  name; tone instructions not being verified with an actual test run; and
  more generally: oversized workflows instead of small named sub-flows, no
  error handling, mixing test and production data/credentials, exposing
  credentials when sharing workflow exports, using an agent where a plain
  workflow would have been cheaper and more reliable, and no human in the
  loop before AI drafts go out automatically.
- Summary: n8n is strong when the process is fixed, reliability matters,
  and every step should be traceable. AI is added as a single building
  block when one step needs language or interpretation. An agent is worth
  it for open, changing tasks where flexibility matters more than
  predictability. Calculations are always done by code, never by the AI,
  and AI output is checked before it goes out.
