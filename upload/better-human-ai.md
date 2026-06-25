---
title: Better Human AI
type: company
created: 2026-05-28
key_people: [BusterML]
aliases: [Better Human AI, BHAI, bhAI, betterhumanai.dk]
tags: [company, ai-agents, eu, supplemental-income, governance]
---

# Better Human AI (betterhumanai.dk)

> **Status:** Active — supplemental income venture
> **Founded:** ~2026
> **Founder:** Buster ML Larsen (solo)
> **Location:** China (founder), sells to EU CEOs
> **Website:** betterhumanai.dk | buster.betterhumanai.dk
> **Repo:** BHAI_BUSTER1 (Next.js monorepo)
> **Hosting:** Vercel (AI Studio)

## Compiled Truth

Better Human AI helps companies (primarily EU) deploy AI agents at scale with structure, governance, and compliance — so humans stay in control while AI does the grunt work. Supplemental income for Buster — not full-time, given his førtidspension status.

**Mission (Danish):** "At blive verdens mest kendte og bedste kontrolcenter for autonome AI-arbejdsstyrker styret af en menneskelig leder eller et lille menneskeligt team."

**Mission (English):** "To become the world's most recognized and best control center for autonomous AI workforces, led by a human leader or a small human team."

**Tagline:** "Buster ved roret. Drevet af AI." / "Buster at the wheel. Driven by AI."

**Voice rule:** Always "Jeg"/"I" — never "vi"/"we" except when grouping customer + Buster jointly.

[Source: User, 2026-05-28; company overview ingested 2026-05-27]

----|---------|--------|
| `/` | Homepage — hero, stats, method (3-step), for/not-for-you, cases grid, FAQ, CTA | Live (i18n: da/en/zh) |
| `/about` | About Buster — bio, photo, areas of expertise, contact | Live |
| `/analyze-form` | Business analysis intake form — 10-section questionnaire feeding into Claude Managed Agent | Live |
| `/blog` | Blog index (1 post: agentic AI workflow guide) | Live |
| `/blog/[slug]` | Blog posts | Live |
| `/cases` | Case studies index | **Hidden** — returns 404 |
| `/cases/400-timer` | 400 hours/month saved — Zendesk + data transfer + CRM | **Hidden** (notFound()) |
| `/cases/bureau-tilbud` | Bureau/legal services — proposal time 2d→2.5h, +60% proposals | **Hidden** |
| `/cases/ehandel-kundeservice` | E-commerce CS — 69% autonomous, <2min avg, CSAT 4.1→4.6 | **Hidden** |
| `/cases/logistik-fragtdokumenter` | Logistics — 8.4%→0.9% error, ~3.1M DKK/yr savings | **Hidden** |
| `/compare` | Comparison: "Europe vs. Offshore" providers | Live |
| `/compliance` | GDPR + EU AI Act compliance overview | Live |
| `/compliance-check` | Subscription compliance monitoring (1,500 DKK/mo) | Live |
| `/ebook` | Lead magnet ebook — "No Bullshit AI" / "AI Uden Bullshit" (3 variants) | Live |
| `/faq` | FAQ page (15 questions) | Live |
| `/glossary` | AI glossary (10 terms, SEO) | Live |
| `/undersogelser` | Survey/study index (12 reports) | Live |
| `/undersogelser/[slug]` | Individual study page | Live |
| `/landing/compliance-hook` | Landing: "Your AI Agent Doesn't Know GDPR" | Live |
| `/landing/control-center` | Landing: "Stop Buying AI Agents. Start Building an AI Workforce." | Live |
| `/landing/speed-play` | Landing: "14 Days to Your First AI Workflow in Production." | Live |
| `/admin/submissions` | HTTP Basic Auth protected admin — view form submissions, re-trigger agents | Live |
| `/admin/submissions/[id]` | Submission detail — view analysis, status, re-trigger button | Live |

### Old Homepage Archive

The repo contains `/app/[locale]/old-home/page.tsx` — an archived version of the homepage using simpler components and older top-level translation keys. Currently unused; the active `page.tsx` at root `/app/[locale]/page.tsx` wins in the router. The old version had no pricing section, case studies grid, or guarantee banner.

### Analyze Form → Claude Managed Agent Pipeline

A central feature: a **10-section business analysis questionnaire** that:

1. Submits form data to `POST /api/analyze-form`
2. Persists to Postgres `submissions` table (Drizzle schema)
3. Sends notification email to analyze@betterhumanai.dk via Resend
4. Triggers a **Claude Managed Agent** via signed webhook (`POST {AGENT_WEBHOOK_URL}` with `X-Buster-Signature: sha256=<hmac>`)
5. Agent analyzes the business and POSTs result back to `/api/analysis-callback`
6. Callback verified via **Standard Webhooks** spec (webhook-id, webhook-timestamp, webhook-signature headers, HMAC-SHA256 with `ANTHROPIC_WEBHOOK_SECRET`)
7. Stores analysis (markdown, summary, estimated savings hours, recommended agents) to DB
8. Emails analysis to analyze@betterhumanai.dk

**Two separate secrets:** `AGENT_WEBHOOK_SECRET` (Buster generates — signs outbound triggers) vs `ANTHROPIC_WEBHOOK_SECRET` (Anthropic generates — signs callbacks). Split intentionally.

**Agent system prompt (Claude Managed Agent):** Buster ML persona — Danish-direct, no fluff, produce 600-1200 word markdown analysis covering the most expensive hour, 2-3 concrete agent proposals, risk notes, 4-8 week pilot plan. [Source: README.md in BHAI_BUSTER1 repo]

### Admin UI

Located at `/admin/submissions` — HTTP Basic Auth (ADMIN_USERNAME / ADMIN_PASSWORD env vars). Features:
- List all submissions with status (queued, analyzing, done, error, skipped)
- Detail page per submission
- Re-trigger button for failed/skipped analyses (`POST /api/submissions/:id/retrigger`)

### Health & Monitoring

- PostHog captures every form submission (`analysis_form_received` event) and AI analysis completion (`analysis_completed`)
- LLM analytics tracing via PostHog `$ai_span` and `$ai_generation` events with trace_id tied to submission_id
- Resend for email delivery tracking

---

## Public Homepage Content (buster.betterhumanai.dk)

All homepage copy is i18n (English shown here; Danish and Chinese variants exist).

### Brand & Identity

- **Logo/Name:** BETTER HUMAN<span style="color:#DC2626"> AI</span> — red accent on "AI"
- **Website:** buster.betterhumanai.dk
- **Booking:** cal.eu/betterhumanai/20min — "Book 20 min free" (no pitch, no commitments, 20 minutes)
- **Contact:** buster@betterhumanai.dk
- **LinkedIn:** linkedin.com/in/bustermlarsen/
- **Primary CTA color:** #DC2626 (red)
- **Schema.org JSON-LD:** Self-described as "Solo founder & AI systems architect", knows about AI orchestration, autonomous AI agents, EU AI Act compliance, GDPR-compliant AI systems, AI workforce management, agentic workflows, human-in-the-loop AI, AI deployment safeguards
[Source: page.tsx Schema.org JSON-LD, 2026-06-02]

### Hero Section

**Tagline:** "Stop talking about AI. Start using it."
**Subtitle:** "I build autonomous AI systems running in production — not PowerPoints collecting dust."

**Trust badges (hero):** GDPR Compliant · EU AI Act Ready · Full Audit Trail
**Hero disclaimer:** "NO PITCH · NO COMMITMENTS · 20 MINUTES"

**Stats carousel** (auto-rotating every 3.5s):
- 10+ Companies deployed
- 1000+ Tool integrations
- 14 Days to production
- 66% Avg. AI cost reduction

**Call to action:** "Book 20 min free →" / "See how it works"

### About Buster (homepage)

**Heading:** "One person at the helm."
- 5 years running a media and digital marketing company with big clients in Denmark — funnels, flows, marketing, sales
- Saw what AI agents could actually do in production — not demos, real autonomous systems
- Founded Better Human AI in 2025 because the gap between "AI talk" and "AI that works" was too big
- Codes every single day, builds every system himself
- Only takes projects where AI genuinely makes sense and delivers measurable ROI

**Badges:** GDPR Compliant · EU AI Act Ready · Full Audit Trail
**Image:** Profile photo from Vercel Blob (betterhumanai_buster_profile_01.webp)

### Problems Section

**Heading:** "You're using AI. But it's not working."
**Stats hook:** "88% of companies use AI. Most are stuck in pilots."
Three problems:
1. **Invisible AI Spend** — "Your team uses ChatGPT, Copilot, Jasper, and 5 other tools. Nobody tracks the cost. Nobody checks the output." Average hidden spend: **23,000 DKK/month**
2. **Systems That Don't Talk** — "Eight different AI tools. None share context. No brand voice. No decision rules. Every agent starts from zero, every time."
3. **Compliance Deadline** — "GDPR and the EU AI Act are not optional. Deadline for high-risk systems: August 2026. Zero documentation means zero compliance."

### Solution / The BHAI Method

**Badge:** "Kontrolcenteret"
**Heading:** "The BHAI Method"
**Subtitle:** "Build the Context. Deploy the Agents. Stay at the Wheel."
Four pillars:
1. Complete context package: brand voice, decision rules, org structure
2. Purpose-built agents in defined roles with budgets and boundaries
3. Human-in-the-loop with full audit trail from day one
4. AI Act-compliant and GDPR-ready from the start

Includes **AnimatedDashboard** — a terminal-like UI simulating 6 agents in real-time: Email Agent, Report Agent, Support Agent, Invoice Agent, Content Agent, Compliance Agent

### The BHAI Method (3-step)

**Label:** "THE BHAI METHOD"
**Tagline:** "One person at the helm, powered by AI. No bullshit."
1. **Build the Context** — Context package: brand voice, decision rules, org structure, budgets, escalation policies. "Without it, agents are just expensive autocomplete."
2. **Deploy the Agents** — Purpose-built agents in defined roles — content, research, support, compliance. Each has a budget, a manager, clear boundaries. Connected to 1,000+ integrations.
3. **Stay at the Wheel** — Human-in-the-loop. Review, approve, steer through one control center. Agents execute autonomously within the structure you designed. Full audit trail from day one.

### For You / Not For You

**This is for you if:**
1. You're spending 20,000+ DKK/month on AI tools with no visibility
2. Your team wastes hours on repetitive tasks between systems
3. You need AI that's GDPR-compliant and EU AI Act-ready
4. You want measurable ROI, not another tool to manage
5. You're ready to deploy in weeks, not months

**This is NOT for you if:**
1. You're looking for a quick ChatGPT wrapper
2. You want AI without human oversight or audit trails
3. You're not willing to document your business rules
4. You expect AI to work perfectly with zero input from you

### Homepage Case Studies (3 featured)

All cases anonymized, protected to "protect our clients' competitive advantage":

**1. Manufacturing — Industrial Company (45 employees, B2B, Northern Jutland)**
- Response time: 4 hours → **35 min**
- AI spend/month: 12,000 DKK → **4,200 DKK**
- Proposals/week: **3x more**
- Quote: "I knew my team was using AI. I just didn't know what it was saying on our behalf. Now I do." — CEO
- Before/After flow: Manual email sorting (2h/day) → Email Agent sorts in real-time; Copy-paste to CRM → Auto-sync to CRM; Manual proposal drafting → AI drafts instantly; Wait for approval 1-2 days → Human approval via control center

**2. Agency — Digital Marketing Agency (22 employees, Copenhagen)**
- AI tool spend: 28,000 DKK → **9,500 DKK**
- Quality incidents: 3-4/mo → **0**
- Content output: **+40%**
- Quote: "We were spending more on AI tools than on our junior designer. Buster made that visible in week one." — CEO
- Before/After: 8 AI tools no oversight → Unified control center; Inconsistent brand voice → Brand voice enforced; Hidden spend 28K/mo → Spend cut to 9.5K; Quality incidents monthly → Zero incidents

**3. Consulting — ESG Consulting Firm (67 employees, Aarhus)**
- Report time: 40 hours → **12 hours**
- Quarterly capacity: 18 reports → **31 reports**
- Hiring saved: **1.2M DKK/yr**
- Quote: "I was about to hire two more analysts. Instead, I spent a fraction on a system that does the repetitive work." — Managing Director
- Before/After: 40 hours per ESG report → 12 hours; Manual data collection → AI data aggregation; Hiring 2 more analysts → Saved 1.2M DKK in hiring; 18 reports/quarter max → 31 reports/quarter

### Testimonials

Three client quotes, identities protected:
1. **CEO, IT Solutions Company · 38 employees**: "We were spending 23,000 DKK/month on AI tools nobody was tracking. Buster showed me the actual number in our first call. That conversation alone was worth more than most consulting engagements I've paid for."
2. **CEO, Consulting Group · 29 employees**: "I thought AI agents were just chatbots with better marketing. Then Buster showed me agents that run my weekly reporting, update our CRM, and draft client proposals — all with my approval before anything goes out."
3. **Managing Partner, Advisory Firm · 51 employees**: "We grew 40% last year without adding headcount. The AI workforce handles research, first-draft content, and lead qualification. My team focuses on what humans are actually good at."

### 14-Day Timeline

| Days | Phase | Description |
|------|-------|-------------|
| 1-3 | Context Deep-Dive | Audit current AI usage, map tools, document brand voice, decision rules, org structure — full context package |
| 4-7 | Build & Configure | Deploy control center, set up agents for highest-impact workflows, connect tools, budget limits, approval gates, audit trail |
| 8-10 | Test in Production | Agents run real tasks with human approval. Fine-tune voice, speed, accuracy |
| 11-14 | Handover & Autonomy | Full documentation, team training, governance playbook. AI workforce runs autonomously — you stay at the wheel |

### Guarantee

**Risk-Free Guarantee:** "14 days to production — or you don't pay. No asterisks. No exit clauses. If your first autonomous workflow isn't running in production within 14 days, you owe nothing."
Plus: "Full GDPR audit trail from day one — something offshore providers can't guarantee."

### Scarcity

**Nav bar banner:** "Taking 3–4 clients per month — {spots} spots open this month" (current: 2 spots) — red dot with pulse animation, on every page

### Newsletter

**Heading:** "AI agents in Europe — no fluff."
**Promise:** Weekly insights on GDPR-compliant AI deployment, EU AI Act updates, and practical automation strategies for European businesses. No hype. No spam. One email per week.
**API:** POST /api/newsletter

### Final CTA

Heading: "What happens in 24 months if you wait?"
Two outcomes: "Those using AI agents as a workforce." vs "Those trying to compete with those who do."
CTA: "Book a (completely non-binding) conversation →"

### Studies Slider

Top of homepage (above hero): auto-rotating banner referencing 12 curated studies/research reports from McKinsey, Deloitte, BCG, PwC, Accenture, and CBS Copenhagen Business School — covering state of AI, gen AI, AI value gap, superagency, EU AI Act compliance, organizational AI, AI trust, jobs barometer, smart manufacturing, tech vision, AI mindset, and AI survey.

### Pricing Section (homepage)

Three tiers, one-time setup + monthly operations retainer (5K-25K DKK/mo), ROI within 3-6 months:

| Tier | Setup (DKK) | Features |
|------|-------------|----------|
| **Starter** | 35K | Context package + 2 agents, control center, AI Act compliance baseline, 14-day implementation |
| **Growth** | 150K *(Most Popular)* | Everything in Starter, up to 8 specialized agents, multi-department deployment, advanced governance & budgets, ongoing optimization |
| **Enterprise** | 750K+ | Everything in Growth, unlimited agents, custom integrations, 16-week strategic rollout, dedicated support & SLA |

**Retainer:** 5K-25K DKK/month for ongoing support: agent monitoring & refinement, new workflow deployment, priority support & SLA, compliance documentation updates, governance playbook updates, quarterly performance review

### Service Pricing (beyond setup)

| Service | Price | Notes |
|---------|-------|-------|
| **AI Audit** (one-time) | 25,000–50,000 DKK | 7-day diagnostic: GDPR gap analysis, EU AI Act readiness score (0-100), AI spend audit, automation opportunity map with ROI ranking. Delivered in 7 days with 30-min readout call. "The audit pays for itself" — most companies find 15,000–30,000 DKK in hidden AI spend. Compliance gap prevents fines starting at 10M EUR. |
| **Compliance Monitoring** (subscription) | 1,500 DKK/month | Monthly compliance scan, EU AI Act readiness score with trend tracking, GDPR processing register maintenance, quarterly risk assessment, policy update alerts (AI Act, GDPR, NIS2), compliance documentation templates, priority support. No setup fee, cancel anytime. |

[Source: audit/page.tsx, compliance-check/page.tsx code analysis, 2026-06-02]

### FAQ (Homepage Version)

1. **Will AI agents replace my employees?** — No. They free employees from repetitive tasks. One client cancelled 2 open positions because existing team could handle the workload.
2. **We already use ChatGPT and Copilot — why do I need this?** — Standalone tools without shared structure. "Difference between 8 people each using their own calculator vs. having an actual accounting system."
3. **Is it GDPR-compliant and ready for the EU AI Act?** — Yes. Full audit trail, data minimization, privacy-by-design. AI Act deadline August 2026.
4. **What if AI doesn't make sense for my business?** — "Then I will tell you directly. I only take projects where AI genuinely makes sense and delivers measurable ROI."
5. **How fast will I see ROI?** — Typically 3-6 months. First measurable impact within 8 weeks. First autonomous workflow runs in production within 14 days.

### Footer Links

© 2026 BetterHumanAI. All rights reserved.
About · FAQ · Glossary · Compliance · Studies · Blog · Ebook · Compare · Audit · Compliance · LinkedIn

---
## Landing Pages & Marketing Sites

All sites use the same CTA framework: "Book 20 min free →" (cal.eu/betterhumanai/20min) — with "no pitch, no commitments" disclaimer. Trust badges (GDPR Compliant · EU AI Act Ready · Full Audit Trail) appear on every page.

### About Page

**URL:** `/about` — Founder credibility page.

**Headline:** "There is far too much talk about AI — and far too few actually making it work in practice."

**Key messaging:**
- "I code every single day. It keeps my hands dirty and my intuition sharp."
- Built Betterhuman_Corp as "an AI control center that turns AI agents into a manageable workforce — not just another layer of hype"
- Areas of expertise: AI orchestration, deployment safeguards, GDPR & EU AI Act, agentic workflows, system integration (Slack, HubSpot, Salesforce, Zendesk, Jira, Notion, Google Workspace + custom APIs), 10 documented production cases

**CTA:** "Book 20 min free" — "No pitch · No commitments"

### Compare Page

**URL:** `/compare` — "AI Agents in Europe vs. Offshore Providers"

Directly attacks offshore AI agencies on compliance, data residency, hidden costs. Comparison dimensions:

| Dimension | Offshore Weakness | BetterHumanAI Strength |
|-----------|-------------------|------------------------|
| Data Residency | US/Australia/undefined | Danish data processing, full GDPR |
| GDPR Compliance | Not addressed | Privacy-by-design, DPIA, audit trail |
| EU AI Act | Unaware/unprepared | Built for Art. 25-30 |
| Time to Production | 30 days (strategy decks) | 14 days (autonomous workflow) |
| Timezone & Support | 8-10h gap | Copenhagen, same timezone |
| Hidden Costs | Extra fees for compliance | Transparent pricing |

**Bottom line:** "The EU AI Act deadline is August 2026. Is your current AI setup compliant? Most are not."

### Compliance Pages

Two distinct offerings:

**1. `/compliance` — Compliance Overview:**
- "Is Betterhuman_Corp ready for GDPR and EU AI Act?" — Yes, from day one
- EU AI Act (deadline Aug 2026): 5 features — Human-in-the-loop approval, Full audit trail, Risk documentation, Error/alert handling, Transparency towards users
- GDPR: 4 articles covered — Art. 25 (privacy by design), Art. 30 (processing register), Art. 28 (DPA), Art. 17 (right to erasure)
- OECD AI Principles alignment

**2. `/compliance-check` — Compliance Monitoring (subscription):**
- "AI Compliance Monitoring. Stay compliant while you grow."
- 1,500 DKK/month — monthly compliance scan, trend tracking, alerts, templates, priority support
- "EU AI Act requires continuous compliance — not a one-time checkbox"

### Targeted Landing Pages

Three short-form landing pages for specific angles:

**1. `/landing/compliance-hook`** — "Your AI Agent Doesn't Know GDPR."
- Direct urgency angle: "Most AI automation agencies deploy fast and worry about compliance later. We build AI agents that are GDPR-compliant and EU AI Act-ready from day one."
- Trust signals: ✓ GDPR Compliant · ✓ EU AI Act Ready · ✓ Danish Data Processing

**2. `/landing/control-center`** — "Stop Buying AI Agents. Start Building an AI Workforce."
- Positioning: "Individual agents break. A control center with goals, budgets, and accountability scales."
- Primary CTA: "Download free ebook →" (lead gen funnel to /ebook)
- Trust signals: ✓ Goals & budgets per agent · ✓ Full audit trail · ✓ EU AI Act compliant

**3. `/landing/speed-play`** — "14 Days to Your First AI Workflow in Production."
- Positioning: "Not 30 days. Not a strategy deck. A working autonomous system in your business in 14 days."
- Trust signals: ✓ 14-day delivery guarantee · ✓ Full compliance docs · ✓ Human approval gates

### Ebook / Lead Magnet

**URL:** `/ebook` — Free PDF download in exchange for contact info.

**Title:** "No Bullshit AI" (EN) / "AI uden bullshit" (DA) / "拒绝废话的 AI" (ZH)

**Three audience variants:**
| Variant | Audience | Tone |
|---------|----------|------|
| Executives | 50+ orgs, GM/VP/CXO | Strategic, ROI-focused |
| Founders | Solo operators, small teams | Inspirational, practical |
| Sceptics | 10–50 employee SMBs | Down-to-earth, no-nonsense |

**Content:** ~11 chapters following a case study (Lars — 12-person agency, 8%→22% margin lift, 40→90 monthly deliverables). Real P&L numbers. 2-week starting plan.

**Lead capture:** Name, email, phone, company, version selection. Tracked with PostHog.

### Glossary (SEO)

**URL:** `/glossary` — "AI Glossary without bullshit." 10 terms defined:
- AI agent, AI control center, AI context layer, Agentic workflow, Human-in-the-loop (HITL), Audit trail, Approval gate, AI orchestration, SLA (AI context), Deployment safeguard

Uses `DefinedTermSet` schema.org JSON-LD. Interlinks to compliance/FAQ pages.

[Source: Code analysis of about/page.tsx, compare/page.tsx, compliance/*, landing/*, ebook, glossary, 2026-06-02]

---

## FAQ (Full Page — 15 Questions)

Dedicated `/faq` page with hardcoded Q&A arrays across all 3 locales (same content, translated):

1. **Do AI agents replace employees?** — No — they free people from repetitive tasks
2. **We already have ChatGPT/Copilot — why a control center?** — Standalone vs structured system with roles/budgets/audit
3. **GDPR and EU AI Act compliance?** — Yes — audit trail, data minimization, privacy-by-design; Aug 2026 deadline
4. **Cost to get started?** — Depends on scope; book 20 min free
5. **What if AI doesn't fit my company?** — Buster says no directly — only takes projects with real ROI
6. **What is Betterhuman_Corp?** — AI control center managing agents as controllable workforce
7. **What is Buster LM?** — BHAI's own model fine-tuned for Danish business logic
8. **What is an AI agent vs ChatGPT?** — Agent reacts autonomously; ChatGPT requires prompts
9. **Timeline from first talk to production?** — 14 days for first workflow
10. **Types of companies you work with?** — SMEs to enterprise across industries
11. **How is data handled?** — Danish data processing, no training on customer data
12. **Difference from a regular consultant?** — Buster codes himself; delivers working systems
13. **Industry-specific solutions?** — Tailored per company, not off-the-shelf
14. **Pricing model?** — Project-based with clear ROI targets
15. **First step?** — Book a free 20-min call

[Source: faq/page.tsx + components/faq.tsx + messages/en.json, 2026-06-02]

---

## Blog (1 Post)

**Slug:** `agentiske-ai-arbejdsgange-virksomheder-2026`
**Author:** "Buster, Better Human AI"
**Date:** April 2026

**Title:**
- DA: "De bedste agentiske AI-arbejdsgange til virksomheder i 2026: En praktisk guide til virksomhedsledere"
- EN: "The Best Agentic AI Workflows for Business in 2026: A Practical Guide for Enterprise Leaders"
- ZH: "2026年企业最佳智能体AI工作流程：企业领导者实用指南"

**Content:** Comprehensive guide covering agentic AI workflow definition, use cases in customer service/procurement/marketing/finance/IT, governance frameworks, human-in-the-loop, ROI data (66.8% average time savings, 79% of businesses moving to implementation by early 2026), failure modes when agents lack boundaries.

**Positioning:** Buster as practitioner-builder who codes daily and delivers working systems, not just analysis. Single authoritative comprehensive post.

[Source: blog-data-{en,zh}.tsx, blog/[slug]/page.tsx, 2026-06-02]

---

## Research Studies (12 curated)

Referenced in Studies Slider on homepage + dedicated `/undersogelser` pages. All have locale-aware content with key takeaways, detailed JSX content with `<FactTooltip>` citations, sources, and a branded "BetterHuman AI Angle" callout box:

| Study | Source | Key Finding |
|-------|--------|-------------|
| State of AI 2025 | McKinsey QuantumBlack, Jan 2025 | 88% use AI, but most stuck in pilots |
| State of GenAI 2025 | Deloitte, Jan 2025 | >2/3 scale under 30% of AI experiments |
| AI Value Gap 2025 | BCG, Sep 2025 | Only 5% get real value at scale |
| Superagency 2025 | McKinsey, Jan 2025 | Only 1% of leaders call AI efforts 'mature' |
| EU AI Act Compliance 2025 | Deloitte, Jan 2025 | AI Act requires 'AI Literacy' from Feb 2025 |
| State of Organizations 2026 | McKinsey, Feb 2026 | AI-enabled orgs |
| State of AI Trust 2026 | McKinsey, Mar 2026 | Governance gaps in AI trust |
| AI Jobs Barometer 2025 | PwC, 2025 | AI employees have 56% wage premium |
| Smart Manufacturing 2025 | Deloitte, 2025 | 80% of manufacturers invest in agentic AI |
| Tech Vision 2025 | Accenture, 2025 | AI moves from tool to autonomous co-player |
| AI Mindset 2026 | CBS (Ringberg & Jacobsen), Mar 2026 | AI tools not neutral — significant mindset gap |
| AI Survey 2026 | CBS (Ringberg & Jacobsen), Mar 2026 | 84% of top leaders lack AI strategy |

[Source: studies-data-{en,zh}.tsx, undersogelser/[slug]/page.tsx, 2026-06-02]

---

## Case Studies (4 — email-gated behind notFound())

The case studies are the strongest sales material — all 4 hidden behind `notFound()` and email-gated. Full content present in code with JSON-LD Article structured data:

**Gate mechanism:** Email capture at `/cases` → submitted to `/api/unlock` (Resend-backed) → localStorage key `bh_cases_unlocked` → PostHog tracking (`cases_unlock_submitted`, `case_clicked`, `booking_cta_clicked`). Optional newsletter opt-in. Cases blurred with lock overlay until unlocked.

**Anonymization:** All client names anonymized by active choice — "AI stack is a strategic advantage." Numbers documented via before/after measurements in client systems.

### 1. E-handel Kundeservice (E-commerce, 80 employees)
- **Problem:** High CS ticket volume, slow response times
- **Result:** 69% autonomous resolution, <2 min avg response, CSAT 4.1→4.6
- **Savings:** ~3.1M DKK/year

### 2. Bureau Tilbud (Digital Agency, 25 employees)
- **Problem:** Manual proposal drafting bottleneck
- **Result:** 2 days→2.5h proposal time, 22%→31% hit rate, +60% more proposals
- **Savings:** ~4.8M DKK extra won deals/year

### 3. 400 Timer (Mid-sized, Zendesk + data transfer)
- **Problem:** 400 hrs/month on manual data transfer, Zendesk sorting, draft standard responses. 12% tagging error rate.
- **Result:** 400 h/mo saved, 34% error reduction, tagging errors 12%→1.8%, response time 4hrs→8min
- **Savings:** ~2.1M DKK/year (ROI-positive first month)
- **Approach:** 6-week shadowing phase, human-in-the-loop, no autonomous customer-facing sends

### 4. Logistik Fragtdokumenter (Logistics & 3PL, 140 employees)
- **Problem:** High error rate in freight documentation processing
- **Result:** 8.4%→0.9% error rate, -78% credit notes
- **Savings:** ~3.1M DKK/year

[Source: Code analysis of cases/* pages + cases-gate.tsx, 2026-06-02]

---

## Brand Position & Messaging Analysis

### Core Brand Identity

| Attribute | Detail |
|-----------|--------|
| **Product name** | Betterhuman_Corp (NEVER "multica" in customer-facing material) |
| **What it is** | AI workforce control plane — manages agents with goals, budgets, roles, audit trails, approval gates. Not a chatbot, not an agent framework. An organizational OS for AI agents. |
| **Who runs it** | Buster LM — solo founder who codes every system himself |
| **Tagline** | "One person at the helm, powered by AI. No bullshit." |
| **Hero** | "Stop talking about AI. Start using it." |
| **Core differentiator** | European compliance (GDPR + EU AI Act) baked in from day one, not retrofitted |
| **Delivery promise** | 14 days to first autonomous workflow in production — not a strategy deck |
| **Target** | EU companies (DK/Scandinavia first), 10–500 employees, C-level with budget authority |
| **Tone** | Direct, anti-bullshit, anti-PowerPoint, practitioner credibility. "One person at the helm." |

### Sales Funnel

1. **Ebook download** (free) → contact info captured
2. **20-min free call** (cal.eu/betterhumanai/20min) → qualification
3. **Analysis form** → 10-section questionnaire, Claude Managed Agent analyzes business
4. **Agent proposal** → analysis-callback delivers markdown assessment with 2-3 concrete agent proposals, risk notes, 4-8 week pilot plan, estimated savings
5. **Onboarding** → 14-day timeline to production

**Secondary paths:**
- Email-gated case studies → email capture → demo booking
- Compliance audit (25-50K DKK) → qualification → potential onboarding
- Compliance monitoring subscription (1.5K DKK/mo) → recurring revenue

### Core Messaging Themes

| Theme | Used Where | Why It Works |
|-------|-----------|-------------|
| "No pitch. No commitments." | Every CTA | Lowers barrier to first contact |
| "14 days to production" | Home, Compare, Speed-play | Concrete promise vs "strategy deck" competitors |
| "GDPR + AI Act ready" | Every page | EU regulatory deadline Aug 2026 creates urgency |
| "I code every day" | About, Home | Solo founder credibility — practitioner, not salesperson |
| "One person at the helm" | Home, About, Ebook | Honest about solo operation — builds trust |
| "Your AI agent doesn't know GDPR" | Compliance-hook | Fear + differentiation |
| "Invisible AI spend: 23,000 DKK/mo" | Home, Audit | Pain point quantification |
| "Stop buying agents. Build a workforce." | Control-center landing | Category reframe |
| "Europe vs. Offshore" | Compare | Direct competitive attack |
| "Full audit trail from day one" | Every page | Regulatory feature, trust signal |
| "Average AI cost reduction: 66%" | Home, Stats | ROI quantification |

### i18n Strategy

Three complete locales (da/en/zh) — 563+ lines of translations each. Danish homepage also has unique stats header with "40%" (Danish businesses using AI). Chinese for broader audience. English as default/fallback.

Danish tone is informal/direct: "Ingen bullshit" — matches the brand voice.

[Source: Comprehensive code analysis of all 80+ source files in BHAI_BUSTER1 repo, 2026-06-02]

The homepage includes JSON-LD for the Organization and the founder:

- **Organization**: @id buster.betterhumanai.dk/#org, name BetterHumanAI, areaServed DK, hasOfferCatalog "Betterhuman_Corp" described as "AI workforce control plane — autonome AI-agenter i produktion med fuld audit trail og EU AI Act compliance"
- **Founder (Person)**: @id buster.betterhumanai.dk/#buster, jobTitle "Solo founder & AI systems architect", knowsAbout includes human-in-the-loop AI and AI deployment safeguards in addition to the core AI orchestration/agent skills
[Source: page.tsx lines 105-163, 2026-06-02]

---

## Command Center (Outbound Sales Automation)

Behind the public website, BHAI_BUSTER1 contains a full **outbound sales automation engine** — the "Command Center". This is the operational core that automates lead outreach via email and LinkedIn.

### Database Schema (Postgres via Drizzle)

| Table | Purpose |
|-------|---------|
| `submissions` | Business analysis form submissions + Claude agent results |
| `leads` | Outreach prospects — imported from CSV, enriched with research |
| `flows` | Outreach campaign definitions (email_funnel, linkedin_content) |
| `flow_steps` | Individual steps within a flow (email, linkedin_connect, research, image_generation, approval) |
| `lead_flows` | Enrollment — which lead is in which flow, pipeline status |
| `email_queue` | Scheduled/drafted emails with delivery tracking (opens, clicks, replies) |
| `linkedin_queue` | Scheduled LinkedIn actions (connection requests, messages, comments) |
| `linkedin_posts` | LinkedIn content posts with scheduling |
| `generated_images` | AI-generated images (via Higgsfield) with prompt tracking |
| `agent_logs` | Execution audit log — research, write_email, generate_image, send_email |
| `agent_configs` | Agent definitions — system prompt, SOUL.MD, AGENTS.MD, approval mode, tools |
| `model_configs` | LLM model configurations — provider, reasoning effort, cost tracking |
| `agent_skills` | Per-flow agent skill content |
| `lead_messages` | Chat messages between lead and agents |
| `email_settings` | Key-value settings (signature_html, etc.) |
| `persona_guides` | Brand voice / company DNA documents |
| `avatar_sessions` | Interactive persona guide building sessions |
| `avatar_messages` | Chat messages from avatar builder |

### Default Agents (7)

Defined in `lib/default-agents.ts`, each with SLUG, system prompt, SOUL.MD and AGENTS.MD:

| Agent | Role | Model | Approval |
|-------|------|-------|----------|
| **CEO Agent** (`ceo`) | Orchestrator — assigns tasks, creates agents, monitors pipeline | claude-opus-4 | ask_first |
| **Viktor** (`viktor`) | Email copywriter — ultra-personal outreach in Buster's voice | claude-opus-4 | ask_first |
| **Resend Mailer** (`resend`) | Email delivery via Resend API — tracks opens, clicks, bounces | n/a (API only) | always_approve |
| **Higgsfield** (`higgsfield`) | Image generation — vintage 35mm film style, Buster ML character | higgsfield-api | ask_first |
| **Zernio** (`zernio`) | LinkedIn outreach — connections, DMs, comments, posts | n/a (API only) | ask_first |
| **Web Scraper** (`scraper`) | Lead research — company news, LinkedIn activity, pain points | claude-sonnet-4 | always_approve |
| **Buster (Review)** (`buster`) | Human-in-the-loop approval gate — reviews all outbound | manual | never_approve |

### Pipeline Engine (`lib/pipeline.ts`)

Shared utilities for executing agent pipelines:
- Fetches persona guides from DB (brand voice)
- Fetches email signatures from email_settings
- Gets lead + active flow + flow steps in one query
- Updates pipeline status (idle, researching, generating_copy, etc.)
- Builds template examples for agents as style reference

### Composio Integration (`lib/composio.ts`)

MCP tool integration via Composio API. Curated toolkit categories:
- **Email & Calendar:** Gmail, Outlook, Google Calendar
- **CRM & Sales:** HubSpot, Salesforce, Pipedrive
- **Social & Outreach:** LinkedIn, X/Twitter, Instagram
- **Dev & Hosting:** GitHub, Vercel, Notion
- **Communication:** Slack, Discord, Telegram
- **Analytics:** Google Analytics, PostHog, Airtable
- **Storage:** Google Drive, Dropbox, Google Sheets
- **Automation:** Zapier, Stripe, SendGrid

### Email Outreach Formula

Defined in Viktor's AGENTS.MD — a 3-touch sequence:
1. **Email 1 (The Observation):** Genuine observation about their company, plant "trapped talent" concept, no CTA
2. **Email 2 (The Proof):** Reference email 1, one data point ($327K avg or 37+ analyses), include Higgsfield image, soft CTA
3. **Email 3 (The Ask):** Clear CTA: free analysis form, "no hard feelings" close

### Lead Funnel

Leads imported from CSV → researched by Web Scraper → enrolled in flows → emails drafted by Viktor → images generated by Higgsfield → sent via Resend → tracked for opens/clicks/replies. LinkedIn outreach via Zernio parallel track. All outbound requires human (Buster) approval before sending.

---

## What BHAI sells

**Product:** BetterHuman_Corp — a **control plane / control center** for autonomous AI workforces. Not a chatbot, not an agent framework. An organizational operating system for AI agents.

**Core capabilities:**
- Org chart with hierarchies and reporting lines (humans + agents)
- Goal alignment — every task traces to the mission
- Heartbeats — agents wake on schedule and act autonomously
- Per-agent budgets with auto-pause when caps hit
- Multi-company — one installation, many tenants
- Full audit trail and governance
- Human-in-the-loop approval gates
- Polymorphic assignees (issues assigned to humans or agents)

**Forked from:** multica (upstream open-source codebase). NEVER call BetterHuman_Corp "multica" in customer-facing material. Older Notion notes saying "Paperclip" are wrong — Buster confirmed the fork is from multica.

**Architecture:** Go backend (Chi router, sqlc, gorilla/websocket) + Next.js frontend monorepo (pnpm + Turborepo) with Electron desktop app.

**Pre-built AI department templates:**
| Template | Agents | Roles |
|---|---|---|
| Content Team | 5 | Strategist, writer, newsletter, ad copy, reviewer |
| Research & Sales | 4 | Research, lead scoring, outreach, CRM-sync |
| Drift & Support | 3 | Customer service, reporting, quality |

**Strategic phasing (16-week plan):**
- Weeks 1–3: Fork & rebrand multica → BetterHuman_Corp; CI/CD; 5 differentiators
- Weeks 4–8: MVP (onboarding wizard, 3 templates, AI Act compliance module). **Target: payable customers by week 8**
- Weeks 9–16: Multi-tenant SaaS readiness, billing, monitoring, security audit. **Target: 3 paying customers by month 4**

---

## Problem it solves

Companies are adopting AI tools ad-hoc (ChatGPT, Copilot, single-agent tools) — fragmented, ungoverned, no cross-team coordination.

**Customer pain points:**
- Scaling without hiring (can't find/afford more people)
- No governance over AI usage (who built what agent? what data does it touch?)
- Content capacity (need more output without burning out the team)
- Invisible AI cost (everyone has their own subscriptions, no oversight)
- AI Act compliance deadline **August 2026** — must have audit trails, transparency, risk management

**Value proposition:**
- Pre-built AI departments delivered as a managed service
- Compliance-ready from day one (AI Act + GDPR)
- Trusted local advisor — Danish context, Danish business culture
- 50–75% cheaper than equivalent human staffing
- Documented productivity gain: 30–61%

---

## Case Studies (4 documented, all hidden behind notFound())

All case detail pages exist but are gated — public index returns 404. Full content present in code with Schema.org JSON-LD and FAQ structured data:

### 1. 400 timer/måned (400 hours/month)
- **Company profile:** Mid-sized company, Zendesk + data transfer + CRM
- **Problem:** 400 hrs/month on manual data transfer, Zendesk sorting, draft standard responses. 12% tagging error rate.
- **Solution:** 3 AI agents in orchestration — data transfer agent, Zendesk sorting agent, draft response agent
- **Results:** 400 hrs/month freed, 34% error reduction, tagging errors 12%→1.8%, response time 4hrs→8min, 2.1M DKK/year savings, ROI-positive first month, 3 months to production
- **Approach:** 6-week shadowing phase, human-in-the-loop, no autonomous customer-facing sends

### 2. Bureau tilbud (Professional services / legal)
- **Status:** Hidden behind notFound()

### 3. E-handel kundeservice (E-commerce customer service)
- **Status:** Hidden behind notFound()

### 4. Logistik fragtdokumenter (Logistics freight documents)
- **Status:** Hidden behind notFound()

---

## Pricing (DKK)

| Tier | Agents | Setup | Annual ops | Best for |
|---|---|---|---|---|
| Starter | 2–3 | 35,000–100,000 | 100,000–200,000 | Small teams testing agents |
| Growth | 4–6 + approval flows + compliance | 100,000–250,000 | 200,000–500,000 | Growing teams needing structure |
| Enterprise | Full workforce + dedicated oversight | 250,000–750,000 | 500,000–1,200,000 | Companies scaling agent workforce |

**Principle:** always cheaper than equivalent human staffing (50–75% saving).

---

## ICP (Ideal Customer Profile)

**Buyer persona:** CEOs, founders, owners, directors — C-level with **budget authority**. The person who can write a check without asking permission.

**Company size:** 0–250 employees. **Sweet spot: 10–100.**

**Geography:** Denmark / Scandinavia first, then EU. Denmark has the EU's highest generative-AI adoption (48.4%) — natural beachhead.

**Signs they're ready:**
- Already using ChatGPT, Copilot, or other AI tools individually
- Frustrated by fragmentation — "we need structure"
- Worried about AI governance & compliance (AI Act deadline creates urgency)
- Trying to scale output without hiring more people
- Lead behavior: books a 20-min demo, downloads "No Bullshit AI" ebook, engages on LinkedIn

**Three audience segments (ebook variants):**
| Segment | Sweet spot | Tone |
|---|---|---|
| C-suite / executives | 50+ employees, GM/VP/CXO | Strategic, ROI-focused |
| Founders & solopreneurs | Solo operators, small teams | Inspirational, practical |
| Skeptics / SMV | 10–50 employees | Down-to-earth, no-nonsense |

---

## Disqualifiers (weak-fit signals)

- **No budget authority** — if they can't approve 35k+ DKK, they're not the buyer
- **No existing AI tool usage** — not even ChatGPT — they're too early
- **Below 10 employees** — setup cost doesn't justify for a 1-person operation (except solopreneur segment for ebooks/content, not product)
- **Non-EU** — compliance positioning and local-trust advantage don't travel
- **250+ employees** — product built for 2–10 person AI-native teams (enterprise tier is aspirational)
- **Hiring-heavy growth strategy** — if their answer to every problem is "hire more people," they won't see the value
- **Skeptical of AI entirely** — the "AI is a fad" crowd — too much education needed
- **Looking for a chatbot / "better ChatGPT"** — they're in the wrong category; BHAI is a control plane, not a chat tool

---

## Strong positive signals

- CEO or founder directly initiating contact
- Already spending on fragmented AI tools and frustrated by lack of coordination
- Brings up AI Act compliance when you talk — they know the deadline is coming
- Danish / Scandinavian company — Buster's home market, strongest trust advantage
- 10–100 employees, growing, says "we can't hire fast enough" or "we need more output"
- Language signals: "Vi har brug for struktur" / "We need structure and governance"
- Books a demo after downloading an ebook
- Asks about audit trails, compliance documentation, or security
- Has a clear pain point that maps to one of the three department templates (content, sales/research, support)

---

## Market position

- Primary market: Denmark / Scandinavia, expanding to EU
- First-mover window: 12–18 months
- Global AI agents market: ~USD 10.9B, 40–50% CAGR
- AI Act compliance deadline **August 2026** — used as sales driver and differentiator
- Differentiators vs. upstream multica: Danish UI, AI Act compliance dashboard, onboarding wizard, managed-service layer, pre-built templates

---

## Compliance posture

- **AI Act:** transparency, human oversight, audit trails, risk management, auto-generated documentation
- **GDPR:** data processor agreements, retention policies, no training on customer data without consent
- Compliance is positioned as a **differentiator and sales driver**, not overhead
- August 2026 deadline creates urgency for EU companies

---

## Lead-gen funnel

1. **Lead magnet:** Free ebook "AI Uden Bullshit" / "No Bullshit AI" (3 variants) at betterhumanai.dk
2. **Demo booking:** cal.eu/betterhumanai/20min — "Book 20 min with Buster"
3. **LinkedIn cadence:** 3 posts/week, English, themes: AI leadership, control & accountability, AI transformation for SMBs
4. **LinkedIn outreach:** Runs via AGENT_BUSTER_LINKEDIN on BetterHuman_Corp Autopilot. Daily at 12:00 China time.

---

## State

- **Role:** Solo founder
- **Team:** 1 (Buster)
- **Stage:** Early (supplemental income)
- **HQ:** China (remote, sells to EU)
- **Status:** Active
- **First-mover window:** 12–18 months

---

## Timeline

- **2026-04-18** | Case study "400 timer" dated [from FAQ structured data]
- **2026-05-27** | Company overview ingested to brain from Notion workspace context
- **2026-05-28** | Buster describes mission [Source: User]
- **2026-05-28** | Company page created in brain [Source: Agent]
- **2026-05-31** | Extended with full ICP, disqualifiers, positive signals, and product detail [Source: Agent]
- **2026-06-02** | BHAI_BUSTER1 repo analyzed — public website (Next.js at buster.betterhumanai.dk) and Command Center (lead outreach automation engine with 7 agents, full DB schema, pipeline engine) documented to brain [Source: Code analysis of BHAI_BUSTER1 repo]
- **2026-06-02** | Public homepage content documented: hero messaging, 3 case studies (mfg/agency/consulting), 3 testimonials, pricing tiers (Starter 35K/Growth 150K/Enterprise 750K+), FAQ, 14-day timeline, scarcity (2 spots open), guarantee, newsletter, studies slider (12 McKinsey/Deloitte/BCG/PwC/Accenture/CBS reports), final CTA [Source: page.tsx + messages/en.json code analysis]
- **2026-06-02** | Complete repo analysis completed: all landing pages (about, compare, compliance, compliance-check, audit), 3 targeted landing pages (compliance-hook, control-center, speed-play), ebook (3 variants), glossary (10 terms), FAQ (15 questions), blog (1 post), 12 research studies, 4 email-gated case studies (with specific metrics: 69% autonomous CS, 60% more proposals, 400h/month saved, 8.4%→0.9% error), admin panel, HMAC webhook security, email format templates. Full brand positioning analysis + sales funnel documented. 80+ source files analyzed. [Source: Comprehensive code analysis of BHAI_BUSTER1 repo, 2026-06-02]
- **2026-06-02** | PGLite WASM crash fixed (stale postmaster.pid from corrupted PGLite database). Database reinitialized, all 106 migrations applied (0→111), brain pages re-imported from filesystem (11 pages). gbrain 0.42.1.0 running on Linux x86_64. [Source: Terminal operations, 2026-06-02]

## Open Threads

- How does Buster find and close EU CEO clients?
- What's the actual conversion rate from ebook download → demo → paid?
- Any exits/churns yet?
- When will the 4 case studies go public (currently hidden behind notFound())?
- Is the Command Center actively running or still in development?
- What's the relationship between the Claude Managed Agent pipeline and the Command Center agents — are they the same system or separate?

## Back-Links

- **2026-05-28** | Referenced in [people/busterml.md](../people/busterml.md) — Buster's role
- **2026-05-28** | Referenced in [USER.md](../USER.md) — company description
