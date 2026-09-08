"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { zhExt, enExt } from "./i18n/dicts/extensions";

/**
 * BHAI i18n Round A（界面框架层中英双语）
 * - 范围：导航 / 页脚 / 工具执行器 / 扫描监视器等客户端 chrome 文案
 * - 营销正文（首页、案例、博客等 server 组件内容）属 Round B/C，暂保持中文
 * - 持久化：localStorage `bhai_locale`；默认 zh；<html lang> 同步更新
 * - SSR 安全：服务端与首帧渲染 zh，挂载后读取本地偏好再切换（无 hydration 警告）
 */

export type Locale = "zh" | "en";

const STORE_KEY = "bhai_locale";

const zh = {
  nav: {
    home: "首页",
    cases: "案例",
    roadmap: "AI 路线图",
    pricing: "价格",
    solutions: "解决方案",
    method: "BHAI 方法",
    about: "关于我",
    ideas: "AI 创意 25 例",
    tools: "FREE AI TOOLS",
    bookCta: "预约 20 分钟 →",
    toggleMenu: "切换菜单",
    mainNav: "主导航",
    mobileNav: "移动导航",
    langGroup: "语言 / Language",
  },
  footer: {
    tagline: ["丹麦验证方法。", "中国本地部署。", "陆博明 / Buster 掌舵。"],
    motto: ["BUSTER VED RORET.", "DREVET AF AI."],
    colNav: "导航",
    colInsights: "洞察",
    colContact: "中国联系",
    navHome: "首页",
    navCases: "丹麦案例",
    navSolutions: "解决方案",
    navMethod: "BHAI 方法",
    insDenmark: "丹麦洞察",
    insIdeas: "AI 创意 25 例",
    insAbout: "关于我",
    insBook: "预约 20 分钟",
    wechat: "微信：busterl1",
    comingSoon: "公众号 / 小红书 / 抖音：即将上线",
    newsletterNote: "每周一封系统蓝图，不垃圾。",
    rights: "© 2026 Better Human AI · 丹麦 · 陆博明 AI ApS",
  },
  runner: {
    optional: "（可选）",
    scanning: "正在扫描…",
    generating: "生成中…",
    fillRequired: "请把必填项填完整再生成",
    invalidUrl:
      "链接格式不对：请填写完整网址，例如 https://yourbrand.com",
    runFailed: "生成失败，请稍后重试",
    streamUnsupported: "浏览器不支持流式读取",
    incomplete: "生成内容不完整，请重试",
    interrupted: "生成中断",
    runsLeft: "还剩 {n} 次免费",
    quotaUsed: "免费额度已用完 · 留邮箱解锁无限次",
    unlockedBadge: "已解锁 ∞",
    copyAnalysis: "复制分析结果",
    copyResult: "复制结果",
    copied: "已复制",
    copyHint: "粘贴到微信或文档里直接用",
    copyFail: "复制失败",
    copyFailHint: "请手动选中文字复制",
    copiedAnalysisToast: "分析结果已复制",
    copiedResultToast: "结果已复制",
    charUnit: "字",
    generatingTag: "生成中",
    history: "最近生成",
    historyEmpty: "（无输入）",
    clearHistory: "清空本工具历史",
    outputAria: "AI 输出",
    gateKicker: "[ UNLOCK ]",
    gateTitle: "解锁无限次 AI 审计 + 加入 CEO AI 清单",
    gateDesc: "不垃圾，每周一份系统蓝图。已有 200+ 珠宝 CEO 在读。",
    emailLabel: "邮箱",
    gateSubmit: "解锁并发送第一份蓝图",
    submitting: "提交中…",
    gateConsent:
      "提交即表示你同意接收 BHAI 每周邮件，随时一封邮件退订。解锁后本工具在本浏览器无限次使用。",
    toastUnlocked: "已解锁",
    toastUnlockedDesc: "无限次已开启，《CEO AI 清单》本周发出。",
    emailInvalid: "邮箱格式不对",
    emailInvalidDesc: "检查一下再提交，或者微信联系 busterl1",
    unlockFail: "解锁失败",
    unlockFailHint: "请稍后再试或微信联系 busterl1",
    submitFail: "提交失败，请稍后再试",
    unlockLeadName: "工具用户",
    unlockLeadMsg: "解锁工具: {slug}",
    langBadgeTitle:
      "AI 输出语言跟随界面语言 · 切换 中/EN 后下次生成立即生效",
  },
  scan: {
    enterUrlFirst: "输入官网地址后开始扫描",
    cleanShot: "CLEAN SHOT",
    cleanShotTitle: "截图服务已自动关闭目标站的 cookie 弹窗",
    cdnMirror: "CDN MIRROR",
    cdnMirrorTitle: "自建截图不可用，已切换公共截图镜像",
    simulated: "SIMULATED",
    simulatedTitle: "真实截图不可用，正在显示模拟站点骨架",
    downloadShot: "下载截图 PNG",
    standbyTitle: "SCANNER STANDBY",
    standbyHint:
      "点「开始扫描」后，这里会实时打开目标网站的截图并逐屏扫描分析",
    standbyHintEn:
      "Hit “Start scan” and a live screenshot of the target site opens here, scanned screen by screen",
    openingCold: "正在打开目标站 · 生成无弹窗干净截图（首次约 5 秒）…",
    openingMirror: "正在打开目标站 · 切换公共截图源…",
    completeBanner: "SCAN COMPLETE ✓ · 完整分析报告见下方终端",
    failedBanner: "SCAN FAILED · 这个站读不到，换个网址试试",
    stageIdle: "▸ 待命中 · 等待扫描指令",
    stageLogAria: "扫描阶段日志",
    targetLabel: "TARGET",
  },
  toolsIndex: {
    heroTitleA: "别信我说的，",
    heroTitleB: "直接用我的 AI 试一遍",
    heroDesc:
      "下面 5 个工具，和我在丹麦给珠宝品牌部署的生产系统是同一套方法。\n不用预约，不用注册——贴进你的产品和网址，几秒钟出结果。",
    freeRunsNote: "免费额度 = 每个工具 {n} 次，无需注册。用完留个邮箱，解锁无限次。",
    stats: "5 个工具 · 平均约 8 秒 · 0 次注册",
    goUse: "去用",
    startScan: "开始扫描",
    footnote:
      "这些工具输出的是草稿与判断，不是终稿。发布前请人再核一遍——这也是我的方法的一部分。",
  },
  toolDetail: {
    backToAll: "全部免费工具",
    freeRuns: "免费 {n} 次 · 无需注册",
    disclaimerLabel: "免责声明：",
    otherTools: "[ 其他免费工具 ]",
  },
  cta: {
    title: "20 分钟。没有 PPT。没有承诺。",
    subtitle:
      "我听你讲你的品牌。然后告诉你 AI 在哪里能赚回它自己的钱——以及在哪里不能。如果对不上，我们握手告别。",
    primary: "预约 20 分钟 →",
    secondary: "先看丹麦案例",
  },
  home: {
    heroBadge: "16 家珠宝品牌案例 · 14 周落地 · 丹麦验证 → 中国部署",
    heroTitleA: "丹麦验证的 AI 方法。",
    heroTitleB: "现在转移给中国珠宝 CEO。",
    heroLeadA: "我是 ",
    heroLeadName: "Buster Larsen（中文名：陆博明）",
    heroLeadB:
      "，丹麦人，做 AI 系统架构。过去五年我在丹麦给 15 家珠宝品牌做过 AI 落地——潘多拉、乔治·杰生、Ole Lynggaard、Sophie Bille Brahe 这些名字你应该听过。准确说，我的角色大多是给他们的数字团队做审计、搭系统、部署代理，然后交给他们的团队运营。现在我把这套方法带到中国——第一个中国案例是广州南沙的珠韵珠宝。",
    heroHonest:
      "我不教中国 CEO 怎么做珠宝——中国珠宝有 5000 年历史，轮不到我一个丹麦人插嘴。我只做一件事：把 AI 系统架起来、跑起来，然后告诉你哪些数字是真的。",
    heroCtaPrimary: "预约 20 分钟（免费）",
    heroCtaSecondary: "看 16 个案例",
    compliance: ["GDPR 合规", "EU AI Act 就绪", "中国 PIPL 合规", "数据本地化"],
    stats: [
      { value: "16", label: "珠宝品牌案例（15 丹麦 + 1 中国）" },
      { value: "14 天", label: "首个 AI 代理上线" },
      { value: "1000+", label: "工具集成" },
      { value: "66%", label: "平均 AI 成本下降" },
      { value: "1.8 亿¥", label: "珠韵自主品牌首年营收" },
      { value: "0", label: "PPT 演示 · 全部生产环境" },
    ],
  },
  roadmap: {
    kicker: "免费 · 5 分钟 · 个性化 AI 路线图",
    titleA: "你的珠宝品牌",
    titleB: "AI 路线图生成器",
    heroDesc:
      "回答 5 个问题。我用 BHAI 方法（丹麦 15 个案例 + 中国珠韵珠宝验证过的）生成你的个性化 AI 路线图预览——具体到第一个该上哪个代理、14 天后能看到什么数字、30 天 ROI 预测。免费，5 分钟。",
    brandNameLabel: "品牌名",
    brandNamePlaceholder: "你的珠宝品牌名",
    revenueLabel: "年营收区间",
    stageLabel: "品牌阶段",
    painLabel: "最痛的痛点",
    chinaLabel: "中国业务现状",
    emailLabel: "邮箱（接收路线图）",
    emailPlaceholder: "ceo@yourbrand.com",
    revenueOptions: [
      "5000 万人民币以下",
      "5000 万 - 2 亿人民币",
      "2 亿 - 10 亿人民币",
      "10 亿人民币以上",
    ],
    stageOptions: [
      "OEM 代工，想做自主品牌",
      "已有自主品牌，主要国内市场",
      "已有自主品牌，考虑国际扩张",
      "成熟品牌，想 AI 转型",
    ],
    painOptions: [
      "假货太多，团队追不上",
      "创始人/设计师成为瓶颈",
      "想进或重返中国市场",
      "VIP 客户管理低效",
      "库存减值严重",
      "PIPL / 数据合规压力",
    ],
    chinaOptions: [
      "无中国业务",
      "通过经销商出口中国",
      "有线上店（天猫/小红书/抖音）",
      "有实体门店",
    ],
    prev: "上一题",
    next: "下一题",
    generate: "生成路线图",
    trust: ["不会发垃圾邮件", "不会分享给第三方", "不会自动订阅"],
    previewKicker: "[ AI 路线图预览 · 已生成 ]",
    successTitle: "{brand}，这是你的 AI 路线图",
    saving: "正在保存你的路线图…",
    sentTo:
      "完整版（含 14 周时间线 + 6 周上下文构建细节 + 精确报价）已发送到 {email}",
    firstAgentKicker: "[ 14 天首个代理推荐 ]",
    roiKicker: "30 天 ROI 预测",
    stageKicker: "[ 你的品牌阶段分析 ]",
    includesKicker: "[ 完整路线图包含 ]",
    includes: [
      "14 周完整时间线（每周具体产出）",
      "6 周上下文构建细节（品牌语调包 + 决策规则）",
      "精确报价（基于你的品牌复杂度）",
      "PIPL + 数据安全合规检查清单",
      "2-3 个丹麦可比案例深度参考",
    ],
    fullGenTitle: "AI 生成完整 14 周路线图",
    fullGenDesc:
      "用 BHAI 方法为你即时生成完整版：14 周时间线表格 + 报价区间 + PIPL 合规清单 + 丹麦可比案例。实时流式输出，约 20 秒完成。",
    genBtn: "免费生成完整路线图",
    generatingBtn: "Buster 的 AI 正在撰写你的路线图…",
    streamWritingKicker: "[ 完整 14 周路线图 · AI 实时撰写中 ]",
    streamDoneKicker: "[ 完整 14 周路线图 · 已生成 ]",
    streamWritingNote:
      "流式生成中 · 无需等待刷新，写完自动存档并同步给 Buster",
    streamDoneNote: "由 BHAI 方法 + 你的品牌数据生成 · 完整版已存档并同步给 Buster",
    bookCta: "微信 busterl1 · 20 分钟通话深入聊",
    orSeePrefix: "或查看",
    orSeePricing: "透明定价",
    orSeeCases: "16 个案例",
    badges: ["5 分钟", "免费", "个性化"],
    genFailed: "生成失败，请稍后重试",
    streamUnsupported: "浏览器不支持流式读取",
    incomplete: "生成内容不完整，请重试",
    charsUnit: "字",
    printLabel: "打印 / 存 PDF",
    printTitle: "打印路线图或存为 PDF（仅打印报告本身，浅色省墨）",
    preview: {
      counterfeit: {
        first: "AI 防伪鉴真代理",
        layer: "Layer 3 · Clienteling Agents",
        timeline:
          "14 天首个代理上线，监控淘宝/抖音/拼多多/微信代销 4 大平台，月均自动下架 1,840+ 件假货",
        roi: "30 天 ROI：月均节省 80 工时人工鉴真，按 ¥200/工时计算 = ¥16K/月，3 个月回本",
      },
      "founder-bottleneck": {
        first: "创始人 DNA 设计代理",
        layer: "Layer 1 · Design Memory",
        timeline:
          "14 天首个代理上线，6 周内训练完成创始人 1,400+ 件档案 + 草图，月生成 60 候选设计供审核",
        roi: "30 天 ROI：设计师产能 +180%，单件设计时间从 8 小时降到 1.5 小时审核",
      },
      "china-entry": {
        first: "中国切入手册代理",
        layer: "Layer 2 · Bench Automation",
        timeline:
          "14 天首个代理上线，6 周内完成 4,200 KOL 匹配 + Xiaohongshu 编辑代理 + 天猫奢品馆礼宾",
        roi: "30 天 ROI：从 0 到首批 1,000 小红书粉丝，避免盲目扩张典型损失 ¥500K+",
      },
      "vip-clienteling": {
        first: "普通话 VIP 礼宾代理",
        layer: "Layer 3 · Clienteling Agents",
        timeline:
          "14 天首个代理上线，24/7 微信客户管理，深度掌握每件作品故事，自动预约私享鉴赏",
        roi: "30 天 ROI：咨询响应时间从 48 小时降到 90 秒，VIP 重新激活率从 2% 升到 23%",
      },
      inventory: {
        first: "需求预测 + 动态定价代理",
        layer: "Layer 2 · Bench Automation",
        timeline:
          "14 天首个代理上线，90 天 SKU 级需求预测准确率 87%+，动态定价最大化总收入回收",
        roi: "30 天 ROI：库存减值从 ¥680K/年降到 ¥180K/年，释放流动资金 ¥420K",
      },
      compliance: {
        first: "PIPL 合规数据本地化代理",
        layer: "Layer 1 · Design Memory",
        timeline:
          "14 天首个代理上线，部署阿里云上海区，PIPL + 数据安全法 + 网络安全法三重合规审计",
        roi: "30 天 ROI：合规风险解除，避免 PIPL 罚款（最高营业额 5%）+ 数据本地化客户信任提升",
      },
    },
    stageNotes: {
      oem: "你的 OEM 工艺是金矿——15 年代工积累的设计档案可以转化为自主品牌 DNA。参考珠韵珠宝案例：14 周内自主品牌营收破 1.8 亿人民币。",
      "self-brand-domestic":
        "已有自主品牌是基础。下一步是用 AI 加持——尤其是高定共创代理打破设计师瓶颈，普通话 VIP 礼宾提升客单价。",
      "self-brand-intl":
        "国际扩张是高风险动作——参考 Maanesten 2024 国际收缩亏损。先用市场优先级 AI 排除不该进的市场，再启动切入手册。",
      established:
        "成熟品牌 AI 转型最大杠杆是 9 类工作队并行部署。参考 Pandora 中国再入场案例：6 代理工作队 14 周同店 +38%。",
    },
  },
};

/** 合并领域扩展字典（dicts/ 下各文件拥有独立顶层命名空间）后的完整字典类型 */
const zhMerged = { ...zh, ...zhExt };
type Dict = typeof zhMerged;

const enBase = {
  nav: {
    home: "Home",
    cases: "Cases",
    roadmap: "AI Roadmap",
    pricing: "Pricing",
    solutions: "Solutions",
    method: "BHAI Method",
    about: "About",
    ideas: "25 AI Ideas",
    tools: "FREE AI TOOLS",
    bookCta: "Book 20 min →",
    toggleMenu: "Toggle menu",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    langGroup: "语言 / Language",
  },
  footer: {
    tagline: [
      "Proven in Denmark.",
      "Deployed in China.",
      "Steered by Buster (Lu Boming).",
    ],
    motto: ["BUSTER VED RORET.", "DREVET AF AI."],
    colNav: "Navigate",
    colInsights: "Insights",
    colContact: "Contact (CN)",
    navHome: "Home",
    navCases: "Denmark cases",
    navSolutions: "Solutions",
    navMethod: "BHAI Method",
    insDenmark: "Denmark insights",
    insIdeas: "25 AI ideas",
    insAbout: "About me",
    insBook: "Book 20 minutes",
    wechat: "WeChat: busterl1",
    comingSoon: "WeChat OA / RedNote / Douyin: coming soon",
    newsletterNote: "One systems blueprint a week. No spam.",
    rights: "© 2026 Better Human AI · Denmark · 陆博明 AI ApS",
  },
  runner: {
    optional: " (optional)",
    scanning: "Scanning…",
    generating: "Generating…",
    fillRequired: "Please complete the required fields first",
    invalidUrl:
      "That link doesn't look right — use the full address, e.g. https://yourbrand.com",
    runFailed: "Generation failed — please try again shortly",
    streamUnsupported: "Your browser doesn't support streaming",
    incomplete: "Output came back incomplete — please retry",
    interrupted: "Generation interrupted",
    runsLeft: "{n} free runs left",
    quotaUsed: "Free runs used · drop your email for unlimited",
    unlockedBadge: "UNLOCKED ∞",
    copyAnalysis: "Copy analysis",
    copyResult: "Copy result",
    copied: "Copied",
    copyHint: "Paste it straight into WeChat or a doc",
    copyFail: "Copy failed",
    copyFailHint: "Please select the text and copy manually",
    copiedAnalysisToast: "Analysis copied",
    copiedResultToast: "Result copied",
    charUnit: " chars",
    generatingTag: "generating",
    history: "Recent runs",
    historyEmpty: "(no input)",
    clearHistory: "Clear this tool's history",
    outputAria: "AI output",
    gateKicker: "[ UNLOCK ]",
    gateTitle: "Unlock unlimited AI audits + join the CEO AI list",
    gateDesc:
      "One systematic blueprint a week, no fluff. 200+ jewelry CEOs already read it.",
    emailLabel: "Email",
    gateSubmit: "Unlock & send the first blueprint",
    submitting: "Submitting…",
    gateConsent:
      "By submitting you agree to receive BHAI's weekly email — unsubscribe anytime. Once unlocked, this tool runs unlimited in this browser.",
    toastUnlocked: "Unlocked",
    toastUnlockedDesc: "Unlimited enabled — the CEO AI list lands this week.",
    emailInvalid: "That email doesn't look right",
    emailInvalidDesc: "Double-check it, or reach Buster on WeChat: busterl1",
    unlockFail: "Unlock failed",
    unlockFailHint: "Try again shortly, or reach Buster on WeChat: busterl1",
    submitFail: "Submit failed — please try again shortly",
    unlockLeadName: "Tool user",
    unlockLeadMsg: "Unlock tool: {slug}",
    langBadgeTitle:
      "AI output language follows the interface language — switch 中/EN and it applies from the next run",
  },
  scan: {
    enterUrlFirst: "Enter your site URL to start the scan",
    cleanShot: "CLEAN SHOT",
    cleanShotTitle: "Cookie banner auto-dismissed before capture",
    cdnMirror: "CDN MIRROR",
    cdnMirrorTitle: "Self-hosted shot unavailable — switched to a public mirror",
    simulated: "SIMULATED",
    simulatedTitle: "Live screenshot unavailable — simulated skeleton shown",
    downloadShot: "Download screenshot PNG",
    standbyTitle: "SCANNER STANDBY",
    standbyHint:
      "点「开始扫描」后，这里会实时打开目标网站的截图并逐屏扫描分析",
    standbyHintEn:
      "Hit “Start scan” and a live screenshot of the target site opens here, scanned screen by screen",
    openingCold: "Opening target site · capturing a clean shot (no pop-ups, ~5s first time)…",
    openingMirror: "Opening target site · switching to a public mirror…",
    completeBanner: "SCAN COMPLETE ✓ · full report in the terminal below",
    failedBanner: "SCAN FAILED · site unreachable — try another URL",
    stageIdle: "▸ Standby · awaiting scan command",
    stageLogAria: "Scan stage log",
    targetLabel: "TARGET",
  },
  toolsIndex: {
    heroTitleA: "Don't take my word for it —",
    heroTitleB: "run my AI and see for yourself",
    heroDesc:
      "The 5 tools below run on the same method I deploy for jewelry brands in Denmark.\nNo booking, no signup — paste your product and website, get results in seconds.",
    freeRunsNote:
      "Free quota = {n} runs per tool, no signup. When they're gone, drop your email for unlimited runs.",
    stats: "5 tools · ~8 sec average · 0 signup",
    goUse: "Use it",
    startScan: "Start scan",
    footnote:
      "These tools produce drafts and judgments, not final copy. Have a human verify before publishing — that's part of the method too.",
  },
  toolDetail: {
    backToAll: "All free tools",
    freeRuns: "{n} free runs · no signup",
    disclaimerLabel: "Disclaimer:",
    otherTools: "[ MORE FREE TOOLS ]",
  },
  cta: {
    title: "20 minutes. No deck. No strings.",
    subtitle:
      "You tell me about your brand. I tell you where AI pays for itself — and where it doesn't. If it's not a fit, we shake hands and part as friends.",
    primary: "Book 20 minutes →",
    secondary: "See the Denmark cases first",
  },
  home: {
    heroBadge: "16 jewelry brand cases · live in 14 weeks · proven in Denmark → deployed in China",
    heroTitleA: "An AI method proven in Denmark.",
    heroTitleB: "Now transferred to Chinese jewelry CEOs.",
    heroLeadA: "I'm ",
    heroLeadName: "Buster Larsen (陆博明)",
    heroLeadB:
      " — Danish, and an AI systems architect by trade. For the past five years I've deployed AI for 15 jewelry brands in Denmark — Pandora, Georg Jensen, Ole Lynggaard, Sophie Bille Brahe; names you know. To be precise, my role was mostly auditing their digital teams, building the systems, deploying the agents, then handing them over to run. Now I'm bringing that method to China — the first Chinese case is Zhuyun Jewelry in Nansha, Guangzhou.",
    heroHonest:
      "I don't teach Chinese CEOs how to make jewelry — China has 5,000 years of it; a Dane has no business lecturing. I do exactly one thing: stand the AI systems up, get them running, and tell you which numbers are real.",
    heroCtaPrimary: "Book 20 minutes (free)",
    heroCtaSecondary: "See 16 cases",
    compliance: ["GDPR compliant", "EU AI Act ready", "China PIPL compliant", "Data localization"],
    stats: [
      { value: "16", label: "jewelry brand cases (15 DK + 1 CN)" },
      { value: "14 days", label: "to first AI agent live" },
      { value: "1000+", label: "tool integrations" },
      { value: "66%", label: "average AI cost reduction" },
      { value: "¥180M", label: "Zhuyun own-brand first-year revenue" },
      { value: "0", label: "pitch decks · all production systems" },
    ],
  },
  roadmap: {
    kicker: "FREE · 5 MIN · PERSONALIZED AI ROADMAP",
    titleA: "Your jewelry brand's",
    titleB: "AI Roadmap Generator",
    heroDesc:
      "Answer 5 questions. I'll generate your personalized AI roadmap preview with the BHAI method (proven across 15 Danish cases + Zhuyun Jewelry in China) — down to which agent to deploy first, what numbers to expect after 14 days, and a 30-day ROI forecast. Free, 5 minutes.",
    brandNameLabel: "Brand name",
    brandNamePlaceholder: "Your jewelry brand name",
    revenueLabel: "Annual revenue band",
    stageLabel: "Brand stage",
    painLabel: "The most painful problem",
    chinaLabel: "China presence today",
    emailLabel: "Email (to receive the roadmap)",
    emailPlaceholder: "ceo@yourbrand.com",
    revenueOptions: [
      "Under RMB 50M",
      "RMB 50M - 200M",
      "RMB 200M - 1B",
      "Over RMB 1B",
    ],
    stageOptions: [
      "OEM manufacturer — want our own brand",
      "Own brand, mainly domestic market",
      "Own brand, considering international expansion",
      "Established brand, want AI transformation",
    ],
    painOptions: [
      "Too many fakes — the team can't keep up",
      "Founder/designer is the bottleneck",
      "Want to enter (or re-enter) China",
      "Inefficient VIP client management",
      "Severe inventory write-downs",
      "PIPL / data-compliance pressure",
    ],
    chinaOptions: [
      "No China business",
      "Exports to China via distributors",
      "Online stores only (Tmall/Xiaohongshu/Douyin)",
      "Physical stores in China",
    ],
    prev: "Back",
    next: "Next",
    generate: "Generate roadmap",
    trust: ["No spam", "Never shared with third parties", "No auto-subscribe"],
    previewKicker: "[ AI ROADMAP PREVIEW · GENERATED ]",
    successTitle: "{brand} — here is your AI roadmap",
    saving: "Saving your roadmap…",
    sentTo:
      "The full version (14-week timeline + 6-week context-building detail + exact quote) has been sent to {email}",
    firstAgentKicker: "[ FIRST AGENT · DAYS 1-14 ]",
    roiKicker: "30-DAY ROI FORECAST",
    stageKicker: "[ YOUR BRAND STAGE ANALYSIS ]",
    includesKicker: "[ WHAT THE FULL ROADMAP CONTAINS ]",
    includes: [
      "Full 14-week timeline (week-by-week outputs)",
      "6-week context-building detail (brand voice pack + decision rules)",
      "Exact quote (based on your brand complexity)",
      "PIPL + data security compliance checklist",
      "2-3 in-depth comparable Danish case references",
    ],
    fullGenTitle: "AI-generated full 14-week roadmap",
    fullGenDesc:
      "Generated instantly with the BHAI method: 14-week timeline table + quote range + PIPL compliance checklist + comparable Danish cases. Live streaming, ~20 seconds.",
    genBtn: "Generate the full roadmap — free",
    generatingBtn: "Buster's AI is writing your roadmap…",
    streamWritingKicker: "[ FULL 14-WEEK ROADMAP · AI WRITING LIVE ]",
    streamDoneKicker: "[ FULL 14-WEEK ROADMAP · GENERATED ]",
    streamWritingNote:
      "Streaming · no refresh needed — archived and synced to Buster automatically when done",
    streamDoneNote:
      "Generated by the BHAI method + your brand data · archived and synced to Buster",
    bookCta: "WeChat busterl1 · go deeper on a 20-minute call",
    orSeePrefix: "Or browse",
    orSeePricing: "transparent pricing",
    orSeeCases: "16 cases",
    badges: ["5 min", "Free", "Personalized"],
    genFailed: "Generation failed — please try again shortly",
    streamUnsupported: "Your browser doesn't support streaming",
    incomplete: "Output came back incomplete — please retry",
    charsUnit: " chars",
    printLabel: "Print / Save PDF",
    printTitle: "Print the roadmap or save as PDF (report only, light ink)",
    preview: {
      counterfeit: {
        first: "Anti-Counterfeit Authentication Agent",
        layer: "Layer 3 · Clienteling Agents",
        timeline:
          "First agent live in 14 days, monitoring Taobao/Douyin/Pinduoduo/WeChat resale across 4 major platforms — 1,840+ fake listings taken down per month on average",
        roi: "30-day ROI: saves ~80 hours of manual authentication a month; at ¥200/hour that's ¥16K/month — pays back in 3 months",
      },
      "founder-bottleneck": {
        first: "Founder DNA Design Agent",
        layer: "Layer 1 · Design Memory",
        timeline:
          "First agent live in 14 days; within 6 weeks trained on 1,400+ founder files & sketches, producing 60 candidate designs a month for review",
        roi: "30-day ROI: design throughput +180% — per-piece design time from 8 hours down to 1.5 hours of review",
      },
      "china-entry": {
        first: "China Entry Playbook Agent",
        layer: "Layer 2 · Bench Automation",
        timeline:
          "First agent live in 14 days; 4,200 KOL matches + a Xiaohongshu editorial agent + Tmall Luxury pavilion concierge completed within 6 weeks",
        roi: "30-day ROI: from 0 to your first 1,000 Xiaohongshu followers — avoiding the typical ¥500K+ loss of blind expansion",
      },
      "vip-clienteling": {
        first: "Mandarin VIP Concierge Agent",
        layer: "Layer 3 · Clienteling Agents",
        timeline:
          "First agent live in 14 days; 24/7 WeChat clienteling that knows every piece's story and auto-books private viewings",
        roi: "30-day ROI: inquiry response from 48 hours down to 90 seconds; VIP reactivation from 2% to 23%",
      },
      inventory: {
        first: "Demand Forecasting + Dynamic Pricing Agent",
        layer: "Layer 2 · Bench Automation",
        timeline:
          "First agent live in 14 days; 87%+ SKU-level forecast accuracy within 90 days, dynamic pricing maximizing total revenue recovery",
        roi: "30-day ROI: inventory write-downs from ¥680K/year to ¥180K/year — freeing ¥420K in working capital",
      },
      compliance: {
        first: "PIPL Compliance Data-Localization Agent",
        layer: "Layer 1 · Design Memory",
        timeline:
          "First agent live in 14 days; deployed on Aliyun Shanghai region with a triple compliance audit: PIPL + Data Security Law + Cybersecurity Law",
        roi: "30-day ROI: compliance risk cleared — avoids PIPL fines (up to 5% of revenue) + trust gains from localized data",
      },
    },
    stageNotes: {
      oem: "Your OEM craftsmanship is a goldmine — 15 years of accumulated design archives can become your own-brand DNA. Reference the Zhuyun Jewelry case: own-brand revenue past RMB 180M within 14 weeks.",
      "self-brand-domestic":
        "Having your own brand is the foundation. The next step is AI leverage — especially a couture co-creation agent to break the designer bottleneck, and a Mandarin VIP concierge to lift average order value.",
      "self-brand-intl":
        "International expansion is a high-risk move — see Maanesten's 2024 international retreat and losses. Use market-priority AI to rule out markets you shouldn't enter before starting an entry playbook.",
      established:
        "For an established brand, the biggest AI lever is deploying the 9 agent teams in parallel. Reference the Pandora China re-entry case: a 6-agent team delivered +38% same-store in 14 weeks.",
    },
  },
};

const en: Dict = { ...enBase, ...enExt };
const DICTS: Record<Locale, Dict> = { zh: zhMerged, en };

type LangContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  t: Dict;
};

const LangContext = createContext<LangContextValue | null>(null);

/* ---------- 外部 locale store（useSyncExternalStore，规避 effect 内 setState） ---------- */
let cachedLocale: Locale | null = null;
const listeners = new Set<() => void>();

function readLocale(): Locale {
  if (cachedLocale) return cachedLocale;
  let next: Locale = "zh";
  try {
    if (window.localStorage.getItem(STORE_KEY) === "en") next = "en";
  } catch {
    /* 私密模式静默 */
  }
  cachedLocale = next;
  return next;
}

function subscribeLocale(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function getServerLocale(): Locale {
  return "zh";
}

function writeLocale(l: Locale): void {
  cachedLocale = l;
  try {
    window.localStorage.setItem(STORE_KEY, l);
  } catch {
    /* noop */
  }
  document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
  listeners.forEach((fn) => fn());
}

/** "{n} 次免费" → "3 次免费"：极简模板替换 */
export function tpl(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) =>
    vars[k] !== undefined ? String(vars[k]) : `{${k}}`
  );
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribeLocale, readLocale, getServerLocale);

  // <html lang> 与 store 同步（纯外部 DOM 写入，无 setState）
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const setLocale = useCallback((l: Locale) => writeLocale(l), []);
  const toggle = useCallback(
    () => writeLocale(readLocale() === "zh" ? "en" : "zh"),
    []
  );

  const value = useMemo<LangContextValue>(
    () => ({ locale, setLocale, toggle, t: DICTS[locale] }),
    [locale, setLocale, toggle]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

/** 未包 Provider 时回退中文（防御式，正常链路不会走到） */
export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (ctx) return ctx;
  return {
    locale: "zh",
    setLocale: () => {},
    toggle: () => {},
    t: DICTS.zh,
  };
}
