# PRD: Professional Profile Website

## Goal
Publish a single-page, bilingual (English/German) public website presenting a professional profile — short bio, industries, experience, skills, certifications, international experience — so visitors get a clear, well-structured overview of expertise without any personal data being exposed. The current build also reserves a placeholder section for future work samples and offers a privacy-safe way to make contact.

## Target Audience
- Recruiters / hiring managers assessing the profile for roles.
- Potential clients or collaborators, relevant if the profile owner becomes self-employed or works independently on projects in the future.
- General public visitors arriving at the page (no login or closed audience).

## Non-Goals
- Not a full CV and not intended to replace one.
- No personal data anywhere on the site: no name, photo, date of birth, phone number, email address, postal address, place of residence, employer names, university names, or references to specific job applications or target companies. Employers are described only by industry/type.
- No functioning contact form in this iteration — only a LinkedIn link placeholder. A real contact form is deferred and tracked in the backlog.
- No populated work-samples content in this iteration — only a placeholder section structure, to be filled in later.
- No references/testimonials section or content in this iteration.
- No backend, server, or build pipeline for the page itself — static HTML/CSS/JS only. Exception: a small externally-hosted FAQ chat assistant (see tech-spec.md, "Chat-Widget-Ausnahme") calls a separate, free-tier serverless backend; this backend is not part of the deployed page and introduces the only JavaScript on the site.

## Assumptions
- The site is a single static page (HTML/CSS/JS) that can be hosted without a backend.
- English is the default/primary language and is shown first; German is secondary.
- Language display uses the toggle option (switch between full EN and full DE views of the page), as decided.
- Contact is represented only by a LinkedIn link (no profile photo/image), clearly marked as a placeholder until the real LinkedIn URL is supplied.
- The work-samples section is included structurally but left empty/placeholder until actual content is supplied.
- All factual content (bio, experience, skills, tools, certifications, education, languages) is taken exactly from Briefing.md; no content is invented.
- A future contact form is tracked as a backlog item, not built in this iteration.

## Acceptance Criteria (testable)
1. The rendered page contains zero instances of: a personal name, a photo of a person, a date of birth, a phone number, an email address, a postal address, a place of residence, an employer name, a university name, or a reference to a specific job application/target company. — *Verify: manual text/content audit of the live-rendered page.*
2. On initial page load, without any interaction, all visible body text is in English; no German text is visible until the language toggle is used. — *Verify: inspect the DOM/visual rendering on first load.*
3. A visible EN/DE toggle control exists; activating it replaces all section text on the page with the German equivalent from Briefing.md Section 4, and toggling back restores the English version. — *Verify: click the toggle and compare rendered text against the EN/DE pairs in Briefing.md.*
4. All content sections from Briefing.md Section 4 (4.1 Headline through 4.10 Languages) are present on the page in both language versions, matching Briefing.md content (translation only — no facts added or removed). — *Verify: diff rendered text against Briefing.md.*
5. A "Work Samples" section exists, visibly marked as a placeholder (e.g. an explicit "coming soon"/placeholder label), containing no fabricated project content. — *Verify: inspect the section's content.*
6. A contact element exists: a link labeled for LinkedIn, containing no image/photo, visibly marked as a placeholder until a real LinkedIn URL is supplied. — *Verify: inspect the link's href, label, and surrounding markup.*
7. The site runs by opening a single HTML file (or small set of static HTML/CSS/JS files) directly in a browser, with no build step, no server dependency, and no external backend required to render current content. — *Verify: open the file in a browser with no local server running.*
8. No references/testimonials section or content appears anywhere on the page. — *Verify: inspect rendered sections against this list.*
9. A FAQ chat assistant is reachable from anywhere on the page (floating control, not scroll-dependent); it answers only from Briefing.md content and the explicitly provided n8n course notes, states plainly when something isn't published on the site instead of guessing, and never outputs a name, photo, contact detail, employer name, or university name. — *Verify: test representative in-scope and out-of-scope questions against chatbot/knowledge-base.md.*
