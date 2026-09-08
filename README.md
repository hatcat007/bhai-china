<div align="center">

# BHAI · 中文营销站

**丹麦 AI 商业咨询师陆博明（Buster ML Larsen）面向中国珠宝行业 CEO 的双语营销与获客平台**

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-New_York-000000)](https://ui.shadcn.com)
[![Prisma + SQLite](https://img.shields.io/badge/Prisma-SQLite-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![Bun](https://img.shields.io/badge/Bun-runtime-F9F1E1?logo=bun&logoColor=black)](https://bun.sh)

</div>

> **English TL;DR** — BHAI is a bilingual (中文 / English) marketing site for Danish AI consultant Buster ML Larsen, targeting jewelry-industry CEOs in China. It ships **5 free AI tools with streaming output**, an **AI website scanner** powered by a self-hosted Playwright screenshot service, a **6-step AI roadmap wizard** (14-week plan, printable), **lead capture + email outbox (SMTP)**, **funnel analytics**, and a **password-protected admin console** — all on Next.js 16 App Router + Prisma/SQLite, driven by the GLM model via `z-ai-web-dev-sdk`.

---

## ✨ 核心特性

### 🖥 营销站（15+ 路由 · 中英双语）

- **静奢设计语言**：黑/米白/暖橙三色体系、Framer Motion 入场动效、自定义光标、阅读进度条、返回顶部
- **中英双语实时切换**（无刷新，localStorage 持久化 + `<html lang>` 同步），营销页 / AI 工具 / 路线图向导全覆盖
- **SEO 就绪**：每个营销路由独立 `generateMetadata`（OG + Twitter Card + 专属分享图）、`sitemap.xml`、JSON-LD 结构化数据

### 🤖 免费 AI 工具（获客钩子）

| 工具 | Slug | 作用 |
| --- | --- | --- |
| 网站扫描器 | `website-analyzer` | 抓取竞品官网截图 + AI 四章节诊断（品牌/内容/信任/转化） |
| 小红书文案师 | `red-copywriter` | 输入产品与素材，生成珠宝品牌小红书种草文案 |
| 异议处理官 | `objection-handler` | 针对"太贵了/网上买更便宜"等话术生成应对脚本 |
| 产地故事官 | `provenance-story` | 生成有溯源感的品牌故事与详情页文案 |
| 竞品差距分析 | `competitor-gap` | 对标竞品，输出差异化机会清单 |

- **SSE 流式输出**：终端风格 UI，逐 token 输出 + 阶段日志，AI 输出语言跟随界面语言
- **工具门控**：每浏览器 2 次免费体验 → 邮箱解锁（线索自动入库）
- **限流**：10 次 / 30 分钟（内存实现，适配单实例部署）

### 📸 AI 网站扫描器 · 自建截图服务

- `mini-services/screenshot-service`：Playwright **一次性运行器**（非守护进程），由 `/api/scan-shot` 按需调用
- 四级截图回退 + **黑帧像素检测** + **cookie 弹窗自动关闭**，显著降低第三方截图服务（mShots）依赖与 IP 风险

### 🧭 AI 路线图向导（`/ai-roadmap`）

- 6 步问卷（品牌 → 营收 → 阶段 → 痛点 → 中国业务 → 邮箱）→ SSE 流式生成 **14 周 AI 落地路线图**
- 报告支持**打印 / 存 PDF**（`@media print` 专用样式），方便 CEO 拿去内部汇报
- 完整版线索进入 Outbox 邮件队列，双语主题随界面语言

### 📬 转化与运营闭环

- **Lead 线索库** + **Newsletter 订阅** + **埋点漏斗**（`TrackEvent`：page_view → tool_start → unlock → …）
- **EmailOutbox 邮件队列**：未配置 SMTP 时全部排队；配置 `SMTP_*` 环境变量后，管理台一键 **FLUSH** 真发（nodemailer），失败逐条记录 `error / sentAt`

### 🔐 管理后台（`/admin`）

- HMAC-SHA256 签名 token + httpOnly cookie（默认 7 天有效），Edge/Node 双运行时兼容
- 线索表格、转化漏斗总览、Outbox 台账（状态徽章 + 重发）

---

## 🛠 技术栈

| 层 | 选型 |
| --- | --- |
| 框架 | Next.js 16（App Router）、React、TypeScript 5 |
| UI | Tailwind CSS 4、shadcn/ui（New York）、lucide-react、Framer Motion |
| 数据 | Prisma ORM + SQLite（`db/custom.db`） |
| AI | `z-ai-web-dev-sdk`（GLM，服务端 SSE 流式） |
| 邮件 | nodemailer（SMTP，可选） |
| 截图 | Playwright（`mini-services/screenshot-service`） |
| 运行时 | Bun |

---

## 🚀 快速开始

```bash
# 1. 安装依赖
bun install

# 2. 配置环境变量（最少仅需数据库路径）
echo 'DATABASE_URL="file:./db/custom.db"' > .env

# 3. 初始化数据库（建表：Lead / NewsletterSubscriber / EmailOutbox / TrackEvent …）
bun run db:push

# 4. 启动开发服务器
bun run dev
# → http://localhost:3000
```

> 管理后台：`/admin` → `/admin/login`，密码取 `ADMIN_PASSWORD`（未配置时使用开发默认值，见下文上线清单）。

---

## 🔐 环境变量

| 变量 | 必填 | 说明 |
| --- | --- | --- |
| `DATABASE_URL` | ✅ | SQLite 路径，如 `file:./db/custom.db` |
| `ADMIN_PASSWORD` | 建议 | 管理台登录密码 + 鉴权 token 签名密钥（开发环境有回退默认值，**上线必须更换**） |
| `ADMIN_SECRET` | 可选 | 覆盖 token 签名密钥（与登录密码分离） |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` | 可选 | 配置后 Outbox 可真发邮件，未配置则持续排队 |

---

## 📁 项目结构

```text
bhai-china/
├── src/
│   ├── app/                    # App Router 页面 + API
│   │   ├── page.tsx            # 首页（双语 Hero、三层架构、案例网格…）
│   │   ├── about/ pricing/ solutions/ method/ book/
│   │   ├── cases/ blog/ logos/ denmark-insights/
│   │   ├── tools/              # 工具列表 + [tool] 运行页
│   │   ├── ai-roadmap/         # AI 路线图向导
│   │   ├── admin/              # 管理后台 + 登录页
│   │   └── api/                # tools / analyze / roadmap / scan-shot / leads
│   │                           # newsletter / track / admin(login·overview·funnel·outbox)
│   ├── components/bhai/        # Navbar / Footer / HomeHero / ToolRunner /
│   │   │                       # RoadmapWizard / ToolsTeaser / CTASection …
│   │   └── ui/                 # shadcn/ui 组件
│   ├── lib/                    # i18n / admin-auth / mailer / track /
│   │                           # page-metadata / use-localized-tool / data(工具·案例·博客)
│   └── proxy.ts                # /api/admin/* 统一鉴权保护
├── mini-services/
│   └── screenshot-service/     # Playwright 一次性截图运行器
├── prisma/schema.prisma        # User / Post / Lead / NewsletterSubscriber /
│                               # EmailOutbox / TrackEvent
├── db/custom.db                # SQLite 数据文件
├── public/                     # og-*.jpg 专属分享图等静态资源
└── download/                   # 全程 QA 截图存档（qa-r5 … qa-r16）
```

---

## 🗺 页面路由

| 路由 | 说明 |
| --- | --- |
| `/` | 首页（双语 Hero、LIVE METRICS、三层服务架构、案例网格、CTA） |
| `/about` `/method` `/solutions` `/pricing` | 顾问介绍 / 三层方法论 / 解决方案 / 报价 |
| `/cases` `/cases/[slug]` | 珠宝行业案例库与详情 |
| `/blog` `/blog/[slug]` | 行业洞察博客 |
| `/book` | 预约咨询表单 |
| `/denmark-insights` `/logos` | 丹麦视角洞察 / 合作品牌墙 |
| `/tools` `/tools/[tool]` | 免费 AI 工具入口与运行页 |
| `/ai-roadmap` | AI 路线图向导 |
| `/admin` `/admin/login` | 管理后台（密码保护） |
| `/sitemap.xml` | 动态站点地图（含案例/博客详情） |

---

## ⚠️ 上线前清单（Production Checklist）

- [ ] **更换 `ADMIN_PASSWORD`**（开发环境回退为 `bhai-admin-2026` / token 密钥 `bhai-dev-secret-change-me`）
- [ ] 配置 `SMTP_*` 环境变量，并在管理台点击 **FLUSH** 清空积压队列
- [ ] 限流与工具门控为**单实例内存实现**；多实例 / Serverless 部署请改为 Redis 等共享存储
- [ ] `.env` 与 `db/custom.db` 目前随仓库提交（内部演示需要）；**公开部署前请移出仓库并加入 `.gitignore`**
- [ ] `src/app/sitemap.ts` 中 `BASE_URL` 确认为正式域名 `https://betterhumanai.dk`

---

## 📸 QA 存档

`download/` 目录保存了 16 轮迭代的浏览器验收截图（桌面/移动端、双语切换、扫描器全流程、路线图生成、管理台台账等），命名规则 `qa-r{轮次}-{场景}.png`，可作为回归基线。

---

<div align="center">

**Better Human AI ApS · Denmark** · 中文市场 · Jewelry Edition

</div>
