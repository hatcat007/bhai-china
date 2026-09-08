# PR 准备包 — hatcat007/bhai-china

分支已在本地就绪：`feat/sync-latest-and-readme`（当前 bhai-china 仓库已检出该分支）

## 两个提交

1. `d74e8a1` **Sync: bring codebase to latest version** — 232 files, +20,920 / −3,091
2. `cfabb87` **docs: add project README** — 179 行双语 README

---

## 第 1 步：推送分支（需要 GitHub 凭据，沙箱内没有）

任选其一：

**方式 A · 交互输入 PAT**
```bash
cd /home/z/my-project/bhai-china
git push -u origin feat/sync-latest-and-readme
# Username: hatcat007
# Password: <你的 GitHub Personal Access Token，勾选 repo 权限>
```

**方式 B · Token 内联（无人值守）**
```bash
git -C /home/z/my-project/bhai-china push https://<TOKEN>@github.com/hatcat007/bhai-china feat/sync-latest-and-readme
```

## 第 2 步：创建 PR

推送成功后打开（GitHub 会自动出现 "Compare & pull request" 按钮）：

https://github.com/hatcat007/bhai-china/compare/main...feat/sync-latest-and-readme

或用 API 直接创建：

```bash
curl -X POST \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/hatcat007/bhai-china/pulls \
  -d @/home/z/my-project/download/github-pr-api-payload.json
```

---

## PR 标题

```
Sync codebase to latest version + add project README
```

## PR 正文（Markdown）

```markdown
## What

Two commits:

1. **Sync: bring codebase to latest version** (232 files, +20,920 / −3,091)
2. **docs: add project README** (bilingual, 179 lines)

The repo was an early snapshot (June 25). The product has since gone through
16 development rounds; this PR brings `main` up to the current state and adds
a full README.

## Included in the sync

- **5 free AI tools** (`website-analyzer`, `red-copywriter`, `objection-handler`,
  `provenance-story`, `competitor-gap`) with SSE streaming output, terminal-style UI,
  tool gating (2 free uses → email unlock) and in-memory rate limiting (10 / 30 min)
- **AI website scanner** backed by a self-hosted Playwright screenshot runner
  (`mini-services/screenshot-service`): 4-level fallback, black-frame pixel detection,
  automatic cookie-banner dismissal
- **AI roadmap wizard** (`/ai-roadmap`): 6-step flow → streamed 14-week plan,
  print / save-as-PDF stylesheet
- **Full zh/en i18n** (UI + AI output language follows interface language, live switch)
- **Admin console** (`/admin` + `/admin/login`): HMAC-signed httpOnly cookie auth,
  lead table, funnel analytics, EmailOutbox ledger with SMTP flush (nodemailer)
- **SEO**: per-page OG/Twitter metadata with dedicated OG images for all marketing
  routes, `sitemap.xml`, JSON-LD
- **Prisma schema**: `Lead`, `NewsletterSubscriber`, `EmailOutbox`, `TrackEvent`
- Cleanup: removed stale screenshot exports and agent tool-result artifacts

## README covers

Positioning (zh + EN TL;DR), feature map, tech stack, quick start, env vars,
project structure, route table, and a production checklist
(ADMIN_PASSWORD, SMTP, rate-limit scaling, .env/db hygiene, BASE_URL).

## Verification

- `bun run lint` → 0 errors; `tsc` → 0 errors (src/)
- All marketing routes return 200; per-round agent-browser E2E evidence in
  `download/qa-r*.png` (desktop + mobile, both locales, scanner/roadmap/admin flows)

## Review guide

Start with `README.md`, then: `src/app/tools/[tool]/page.tsx` →
`src/components/bhai/tools/ToolRunner.tsx` → `src/lib/i18n.tsx` →
`src/app/api/roadmap/generate/route.ts` → `src/proxy.ts`.
```
