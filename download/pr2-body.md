# Add `/ai-ideas` — 25 AI Use Cases for Jewelry Companies (Bilingual)

## Summary

New lead-generation content page **`/ai-ideas`** (「珠宝公司 AI 落地 25 计」): 25 concrete, bilingual (中文/English) AI use cases tailored to jewelry retailers & brands, with category filtering, free-tool cross-links, and a closing CTA to **book a creative AI session** (`/book`).

## What's Included

### Content & Data (`src/lib/data/ai-ideas.ts`)
- 25 fully bilingual use cases across **6 categories**: 营销与内容 / 销售与转化 / 客户体验 / 运营与供应链 / 设计与产品 / 数据与决策 (5+5+5+5+3+2)
- Each entry: number, zh/en title + description, category, tool cross-link where applicable
- 3 ideas link to the site's free tools: #01 小红书文案 → `/tools/red-copywriter`, #06 异议处理 → `/tools/objection-handler`, #25 竞品分析 → `/tools/website-analyzer`

### Page (`src/app/ai-ideas/page.tsx` + `src/components/bhai/ideas/IdeasBody.tsx`)
- Bilingual hero + sticky category filter bar (sticks below navbar)
- Animated card grid (framer-motion `AnimatePresence`) with filter counts
- Free-tools strip + closing CTA: **「预约一场创意 AI 工作坊 / Book a creative AI session with me」** → `/book`, secondary → `/tools`
- Full i18n compliance: live language switch (localStorage `bhai_locale`), zero Chinese leakage in EN mode

### Integration
- `Navbar`: new nav link (lg+ only to avoid md overflow) + mobile menu
- `Footer`: insights column entry
- `sitemap.ts`: `/ai-ideas` (priority 0.8, monthly)
- `i18n.tsx`: nav/footer dictionary entries (zh/en)
- OG share image: `public/og-ideas.jpg` (1200×630) wired via `withOpenGraph()`

## Verification

- ✅ `bun run lint` — 0 errors; `tsc --noEmit` — 0 errors
- ✅ Route `/ai-ideas` → 200
- ✅ Bilingual E2E via agent-browser: zh default render → filter「销售与转化」shows 5 cards → back to all 25 → live switch to EN (h1/nav/CTA/cards all English) → TRY FREE badge navigates to `/tools/red-copywriter` keeping EN → zero console errors
- ✅ QA screenshots in `download/qa-r19-ideas-*.png`

## Notes

- Based on latest `main` (after PR #1 was merged; branch rebased onto `0c9a98c`)
- Suggested follow-up: link idea #25 to `/tools/competitor-gap`; expand free-tools strip to 5 cards
