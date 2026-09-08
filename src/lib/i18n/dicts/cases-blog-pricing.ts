/**
 * i18n 扩展字典 — 20-d2（cases / cases/[slug] / blog / blog/[slug] / pricing 页 + CaseNav）
 * 命名空间契约：casesPage / blog / pricing
 * 只允许改本文件 + 这五个页面及新 client body 组件 + CaseNav
 *
 * 规则：zh/en 键完全对称（Dict 类型来自 zhMerged，en 缺键会导致 tsc 报错）。
 * 案例数据的字段约定（src/lib/data/jewelry-cases.ts）：无后缀字段 = EN，`…Zh` = 中文，
 * 组件按 locale 选向（zh→xZh / en→x）；results 用 before/beforeEn + after/afterEn。
 * 刻意保留的双语配对：Buster ML Larsen (陆博明) 署名等，见各键注释。
 */
export const zh = {
  casesPage: {
    /* ── /cases 索引页 ── */
    heroKicker: "[ 15 真实案例 · 14 周落地 · 0 PPT ]",
    heroTitleA: "丹麦顶级珠宝品牌",
    heroTitleB: "的 AI 转型档案",
    heroDesc:
      "这不是行业报告，不是趋势白皮书。这是 15 个真实丹麦珠宝品牌的 AI 部署档案——\n每一个都是 14 周内的生产环境部署，包含挑战、AI 工作队配置、量化结果与完整时间线。\n点击进入查看详情。",
    indexHeader: "[ BHAI // CASE INDEX ]",
    indexCount: "案例",
    viewCase: "查看案例",
    cursorExplore: "探索",
    readCase: "阅读完整案例",
    keyData: "关键数据",
    myRoleLabel: "我的角色 · ",
    ctaTitle: "看完 15 个案例了？",
    ctaSubtitle:
      "你的品牌是第 16 个。预约 20 分钟，我会告诉你丹麦同行的经验如何套用到你的实际情况——以及哪里套不上。",
    ctaPrimary: "预约 20 分钟 →",
    ctaSecondary: "先看解决方案",

    /* ── /cases/[slug] 详情页 ── */
    backToIndex: "返回案例索引",
    originChina: "中国珠宝",
    originDenmark: "丹麦珠宝",
    brandProfile: "[ 品牌档案 ]",
    vitalFounded: "创立",
    vitalHq: "总部",
    vitalPositioning: "定位",
    vitalRevenue: "营收",
    vitalChannels: "渠道",
    chinaStatusLabel: "中国现状",
    deploymentLabel: "[ BHAI 部署 ]",
    myRoleKicker: "[ 我的角色 ]",
    resultsKicker: "[ BHAI 部署后 14 周内的结果 ]",
    challengeKicker: "[ 01 · 挑战 ]",
    challengeTitle: "这个品牌面对的真相",
    keyCollectionsLabel: "关键系列",
    materialsLabel: "材料与工艺",
    designDnaLabel: "设计 DNA",
    solutionKicker: "[ 02 · BHAI 解决方案 ]",
    solutionTitle: "我部署了什么",
    mechanicsKicker: "[ 它是怎么跑起来的 ]",
    agentsKicker: "[ AI 工作队配置 ]",
    agentsNote:
      "所有代理在 BHAI 控制中心内运行。每条 AI 决策都有审计链。关键决策（如微信消息发出、定制设计批准）由人类签字。",
    agentsNoteStrong: " 人在环里。AI 不撒手。",
    timelineKicker: "[ 03 · 14 周时间线 ]",
    timelineTitle: "从签约到生产 · 14 周路径",
    frictionKicker: "[ 哪里出了问题 · 怎么解决的 ]",
    frictionProblemLabel: "摩擦点",
    frictionFixLabel: "修复",
    backToAll: "返回全部 16 个案例",
    detailCtaTitle: "想看 {brand} 的方案如何套用到你的品牌？",
    detailCtaSubtitle:
      "20 分钟。我听你讲你的市场、你的渠道、你的瓶颈。然后告诉你这个案例的哪部分能复制——哪部分需要重新设计。没有 PPT，没有承诺。",
    detailCtaPrimary: "预约 20 分钟 →",
    detailCtaSecondary: "看其他案例",

    /* ── CaseNav（上/下一案例）── */
    prevCase: "上一案例",
    nextCase: "下一案例",
    firstCase: "已是第一个",
    lastCase: "已是最后一个",
  },

  blog: {
    /* ── /blog 列表页 ── */
    heroKicker: "[ 深度洞察 · 不是行业报告 ]",
    heroTitle: "BHAI 博客",
    heroDesc:
      "基于 16 个真实案例（15 丹麦 + 1 中国广州珠韵）的实战洞察。\n不是行业报告——是生产环境部署中总结的、可执行的方法论和教训。",
    readMore: "阅读全文",
    ctaTitle: "读完博客了？开始你的 AI 路线图。",
    ctaSubtitle:
      "这些洞察基于 16 个真实案例。20 分钟通话，我告诉你这些洞察哪个最相关——以及具体怎么套用到你的品牌。",
    ctaPrimary: "微信 busterl1 · 预约 →",
    ctaSecondary: "先看 16 个案例",

    /* ── /blog/[slug] 文章页 ── */
    backToBlog: "返回博客",
    authorName: "陆博明 / Buster ML Larsen",
    authorPhotoAlt: "陆博明 / Buster ML Larsen",
    authorRole: "丹麦 AI 系统架构师 · Better Human AI 创始人",
    authorBio:
      "在丹麦帮 15 家顶级珠宝品牌部署 AI 工作队。现在把验证过的系统转移给中国珠宝 CEO。\n16 个真实案例，14 周生产环境部署，14 天首个代理上线保证。",
    prevPost: "上一篇",
    nextPost: "下一篇",
    postCtaTitle: "读完文章了？开始你的 AI 路线图。",
    postCtaSubtitle:
      "20 分钟通话，我告诉你这篇文章的洞察哪个最相关——以及具体怎么套用到你的品牌。",
    postCtaPrimary: "微信 busterl1 · 预约 →",
    postCtaSecondary: "看更多文章",
  },

  pricing: {
    /* ── HERO ── */
    heroKicker: "[ 透明定价 · 不藏猫腻 ]",
    heroTitleA: "透明价格。",
    heroTitleB: "14 天保证。",
    heroDesc:
      "96% 的 AI 咨询公司在第一次通话前不告诉你价格。这是操纵——也是为什么 88% 的公司在 PPT 阶段卡住。\n我把所有价格列在这里。看完直接决定要不要 20 分钟通话。",

    /* ── 14 天保证横幅 ── */
    guaranteeKicker: "[ BHAI 14 天保证 ]",
    guaranteeTitle: "首个 AI 代理在 14 天内上线。否则我继续工作，直到它上线。",
    guaranteeDesc:
      "不是 PPT。不是 Demo。是真正跑生产的 AI 代理——你能在控制中心看到它工作。\n如果 14 天内没上线，我不收额外费用继续工作直到它上线。这是我对你时间的承诺。",

    /* ── 三个产品 ── */
    tiersKicker: "[ 3 个产品 · 任选组合 ]",
    tiersTitleA: "从 1.5 万到长期托管",
    tiersTitleB: "按你的阶段选",
    recommended: "推荐",
    includesLabel: "包含",
    notIncludesLabel: "不包含",
    tiers: [
      {
        name: "AI 审计",
        nameEn: "AI AUDIT",
        tagline: "入门 · 低风险 · 看到机会",
        price: "¥15,000 - 50,000",
        priceNote: "一次性 · 1-2 周",
        description:
          "如果你不知道从哪里开始，这是入口。我审计你的品牌、CRM、电商、客户管理流程，输出一份 60-90 页的 AI 路线图报告——具体到该上哪个代理、6 周后能看到什么数字。",
        includes: [
          "AI 成熟度审计（5 维度）",
          "AI 隐藏成本分析（你团队正在用什么 AI 工具）",
          "PIPL + 数据安全合规检查",
          "60-90 页 AI 路线图报告",
          "2 小时 CEO + CTO 一起的解读会",
          "3 个优先代理推荐 + ROI 预测",
        ],
        notIncludes: [
          "不包含实际代理部署",
          "不包含持续托管",
        ],
        cta: "预约审计",
      },
      {
        name: "AI 构建",
        nameEn: "AI BUILD",
        tagline: "主力 · 14 周完整部署 · 14 天保证",
        price: "¥40,000 - 150,000",
        priceNote: "每项目 · 14 周生产环境部署",
        description:
          "这是 BHAI 的主力产品。从 6 周上下文构建开始，到 14 天首个代理上线，到 14 周完整工作队跑生产。覆盖丹麦验证过的 9 类工作队中任意组合。所有客户数据部署在中国云（阿里云/腾讯云/华为云/AWS 中国）。",
        includes: [
          "6 周上下文构建（品牌语调包 + 决策规则 + 集成审计）",
          "14 天首个代理上线（BHAI 保证）",
          "14 周完整工作队部署",
          "AI 控制中心 + 完整审计链",
          "PIPL + GDPR + EU AI Act 三重合规",
          "中国云基础设施部署（7 大云厂商可选）",
          "国际模型 + 国产模型双栈（Claude / 通义千问 / 文心一言）",
          "14 周内每周回顾会议",
          "你的中国区总经理控制中心培训",
        ],
        notIncludes: [
          "不包含 14 周后的持续托管（见下方托管）",
        ],
        cta: "预约构建",
      },
      {
        name: "AI 托管",
        nameEn: "AI RETAINER",
        tagline: "长期 · 持续优化 · 永久在环",
        price: "¥20,000 /月起",
        priceNote: "月付 · 含 AI token 成本",
        description:
          "14 周 AI 构建完成后，进入持续托管。我每两周一次回顾会议——哪些决策被人类拒绝（重训练信号）、哪些代理超预算（边界调整）、哪些 ROI 超预期（扩展信号）。我作为外部顾问持续介入，不依赖你的内部团队。",
        includes: [
          "每两周回顾会议（我亲自参与）",
          "AI 代理持续优化 + 重训练",
          "新代理按需上线（¥40K 每个）",
          "PIPL 合规持续监控",
          "AI 控制中心升级",
          "紧急情况 4 小时响应",
          "所有 AI token 成本包含（不另收）",
          "季度 ROI 报告",
        ],
        notIncludes: [
          "不包含新的工作队从零构建",
        ],
        cta: "预约托管",
      },
    ],

    /* ── 所有产品都包含 ── */
    allProductsKicker: "[ 所有产品都包含 ]",
    allProducts: [
      "我亲自参与（不甩给初级顾问）",
      "GDPR + EU AI Act + PIPL 三重合规",
      "完整审计链（每条 AI 决策可追溯）",
      "WeChat busterl1 直接联系我",
      "中文 + 丹麦语 + 英语三语支持",
      "数据本地化（中国数据不出境）",
    ],

    /* ── 对比表 ── */
    comparisonKicker: "[ BHAI vs 传统 AI 咨询 ]",
    comparisonTitle: "为什么我不像其他 AI 咨询公司",
    colDimension: "维度",
    colTraditional: "传统 AI 咨询",
    comparisonRows: [
      ["价格透明度", "网上直接看到", "第一次通话才告诉你"],
      ["交付物", "生产环境 AI 代理", "PPT + 路线图报告"],
      ["14 天保证", "首个代理 14 天上线，否则免费继续工作", "无保证"],
      ["人在环里", "从第一天起，每条决策人类签字", "可选附加"],
      ["审计链", "完整可追溯，GDPR + PIPL 三重合规", "事后补的合规模板"],
      ["中国合规", "PIPL + 数据安全法 + 数据本地化", "通常只提 GDPR"],
      ["AI token 成本", "托管费包含", "客户另付"],
      ["我亲自参与", "每客户我亲自驾船", "甩给初级顾问"],
      ["案例数量", "16 个真实案例（15 丹麦 + 1 中国）", "通常 3-5 个匿名案例"],
    ],

    /* ── FAQ ── */
    faqKicker: "[ 价格 FAQ ]",
    faqTitle: "常见问题",
    faqs: [
      {
        q: "为什么 AI 审计要 ¥15K-50K？不能用 ChatGPT 自己做吗？",
        a: "可以——如果你的品牌年营收低于 5000 万人民币。但超过这个量级，你需要的是：(1) 知道你团队现在在用什么 AI 工具（通常 8-12 个，没人追踪成本）；(2) 知道 PIPL 合规风险点；(3) 知道哪个代理 30 天能赚回成本。我做这个 5+ 年了，1-2 周交付的 60-90 页报告比你团队花 6 个月摸索更快更准。",
      },
      {
        q: "AI 构建 ¥40K-150K 的差距为什么这么大？",
        a: "取决于三个因素：(1) 你的品牌复杂度（1 个产品线还是 5 个）；(2) 你选几个代理（2 个还是 6 个）；(3) 集成复杂度（已有 CRM/ERP 还是全新建）。20 分钟通话后我能给你精确报价——不会有隐藏费用。",
      },
      {
        q: "托管为什么月付 ¥20K 起？包含什么？",
        a: "¥20K/月 包含：我每两周一次回顾会议（我亲自参与，不甩初级顾问）、AI 代理持续优化 + 重训练、PIPL 合规监控、紧急 4 小时响应、季度 ROI 报告，以及所有 AI token 成本（Claude/通义千问调用费用通常每月 ¥3K-8K，我承担不另收）。",
      },
      {
        q: "14 天保证具体是什么？",
        a: "签约后 14 天内，首个 AI 代理必须上线跑生产——不是 PPT，不是 Demo，是真正能干活的代理。如果 14 天没上线，我不收额外费用继续工作直到它上线。唯一例外：你团队延迟提供必要的访问权限/数据，这种情况我会提前书面说明。",
      },
      {
        q: "数据安全吗？中国客户数据会出国吗？",
        a: "不会。所有客户数据严格部署在中国境内云（默认阿里云上海区，可选腾讯云/华为云/AWS 中国）。仅匿名化模式数据（不含个人信息）回流哥本哈根控制中心用于跨客户模式学习。PIPL 第 38 条合规，数据安全法合规，网络安全法合规。",
      },
      {
        q: "需要先付全款吗？",
        a: "不需要。AI 审计：50% 启动 + 50% 交付报告。AI 构建：30% 启动 + 30% 首个代理上线（14 天内）+ 40% 完整工作队交付（14 周内）。托管：月付。所有付款支持人民币对公账户或欧元对公账户。",
      },
      {
        q: "如果我不满意可以退款吗？",
        a: "AI 审计：交付报告后 7 天内不满意，全额退款（不需要理由）。AI 构建：14 天保证期内首个代理未上线，已付的 30% 启动费全额退还。托管：任意月份不满意，下月停止，已付当月不退但停止扣款。",
      },
      {
        q: "你和那些 AI 咨询公司有什么本质区别？",
        a: "三个本质区别：(1) 我交付生产环境 AI 代理，他们交付 PPT；(2) 我亲自参与每客户，他们甩给初级顾问；(3) 我有 16 个真实案例（15 丹麦 + 1 中国广州珠韵），他们通常有 3-5 个匿名案例。20 分钟通话你能立刻感受到区别。",
      },
    ],

    /* ── 页尾 CTA ── */
    ctaTitle: "看完价格了？20 分钟通话决定要不要做。",
    ctaSubtitle:
      "我不会在通话中卖你任何东西。我听你讲你的瓶颈，告诉你哪个产品适合（或者不合适）。如果对不上，我们握手告别。",
    ctaPrimary: "微信 busterl1 · 预约 →",
    ctaSecondary: "先看 16 个案例",
  },
};

export const en = {
  casesPage: {
    /* ── /cases index ── */
    heroKicker: "[ 15 REAL CASES · LIVE IN 14 WEEKS · 0 PITCH DECKS ]",
    heroTitleA: "The AI transformation files of",
    heroTitleB: "Denmark's top jewelry brands",
    heroDesc:
      "This isn't an industry report or a trend whitepaper. These are the AI deployment files of 15 real Danish jewelry brands —\nevery one a production deployment inside 14 weeks, with the challenge, the AI workforce configuration, quantified results and the full timeline.\nClick through for the details.",
    indexHeader: "[ BHAI // CASE INDEX ]",
    indexCount: "cases",
    viewCase: "View case",
    cursorExplore: "Explore",
    readCase: "Read the full case",
    keyData: "Key result",
    myRoleLabel: "My role · ",
    ctaTitle: "Finished with the 15 cases?",
    ctaSubtitle:
      "Your brand could be number 16. Book 20 minutes and I'll tell you which parts of the Danish experience transfer to your situation — and which parts don't.",
    ctaPrimary: "Book 20 minutes →",
    ctaSecondary: "See the solutions first",

    /* ── /cases/[slug] detail ── */
    backToIndex: "Back to case index",
    originChina: "Chinese jewelry",
    originDenmark: "Danish jewelry",
    brandProfile: "[ Brand profile ]",
    vitalFounded: "Founded",
    vitalHq: "HQ",
    vitalPositioning: "Positioning",
    vitalRevenue: "Revenue",
    vitalChannels: "Channels",
    chinaStatusLabel: "China status",
    deploymentLabel: "[ BHAI deployment ]",
    myRoleKicker: "[ My role ]",
    resultsKicker: "[ Results within 14 weeks of BHAI deployment ]",
    challengeKicker: "[ 01 · The challenge ]",
    challengeTitle: "The truth this brand faced",
    keyCollectionsLabel: "Key collections",
    materialsLabel: "Materials & craft",
    designDnaLabel: "Design DNA",
    solutionKicker: "[ 02 · The BHAI solution ]",
    solutionTitle: "What I deployed",
    mechanicsKicker: "[ How it actually runs ]",
    agentsKicker: "[ AI workforce configuration ]",
    agentsNote:
      "All agents run inside the BHAI control center. Every AI decision has an audit trail. Key decisions (a WeChat message going out, a bespoke design approval) are signed off by a human.",
    agentsNoteStrong: " Humans in the loop. AI never runs loose.",
    timelineKicker: "[ 03 · The 14-week timeline ]",
    timelineTitle: "Signature to production · the 14-week path",
    frictionKicker: "[ What broke · how it got fixed ]",
    frictionProblemLabel: "Friction point",
    frictionFixLabel: "The fix",
    backToAll: "Back to all 16 cases",
    detailCtaTitle: "Want to see how the {brand} playbook fits your brand?",
    detailCtaSubtitle:
      "20 minutes. You tell me about your market, your channels, your bottleneck. Then I tell you which parts of this case copy over — and which need a redesign. No deck, no strings.",
    detailCtaPrimary: "Book 20 minutes →",
    detailCtaSecondary: "See other cases",

    /* ── CaseNav ── */
    prevCase: "Previous case",
    nextCase: "Next case",
    firstCase: "This is the first one",
    lastCase: "This is the last one",
  },

  blog: {
    /* ── /blog index ── */
    heroKicker: "[ DEEP INSIGHTS · NOT AN INDUSTRY REPORT ]",
    heroTitle: "The BHAI Blog",
    heroDesc:
      "Field insights from 16 real case deployments (15 in Denmark + 1 at Zhuyun Jewelry in Guangzhou, China).\nNot an industry report — executable methodology and lessons learned in production deployments.",
    readMore: "Read the full post",
    ctaTitle: "Finished reading? Start your AI roadmap.",
    ctaSubtitle:
      "These insights come from 16 real cases. Book 20 minutes and I'll tell you which insight matters most for you — and exactly how to apply it to your brand.",
    ctaPrimary: "WeChat busterl1 · Book →",
    ctaSecondary: "See the 16 cases first",

    /* ── /blog/[slug] post ── */
    backToBlog: "Back to the blog",
    authorName: "Buster ML Larsen (陆博明)",
    authorPhotoAlt: "Buster ML Larsen (陆博明)",
    authorRole: "Danish AI systems architect · Founder of Better Human AI",
    authorBio:
      "Deployed AI workforces for 15 top jewelry brands in Denmark. Now transferring the proven systems to Chinese jewelry CEOs.\n16 real cases, 14-week production deployments, first agent live in 14 days — guaranteed.",
    prevPost: "Previous post",
    nextPost: "Next post",
    postCtaTitle: "Finished the article? Start your AI roadmap.",
    postCtaSubtitle:
      "Book 20 minutes and I'll tell you which insight from this piece matters most for you — and exactly how to apply it to your brand.",
    postCtaPrimary: "WeChat busterl1 · Book →",
    postCtaSecondary: "Read more posts",
  },

  pricing: {
    /* ── HERO ── */
    heroKicker: "[ TRANSPARENT PRICING · NO GAMES ]",
    heroTitleA: "Transparent prices.",
    heroTitleB: "A 14-day guarantee.",
    heroDesc:
      "96% of AI consultancies won't tell you the price before the first call. That's manipulation — and it's why 88% of AI projects stall at the deck stage.\nEvery price I charge is listed here. Read it, then decide whether you want the 20-minute call.",

    /* ── 14-day guarantee banner ── */
    guaranteeKicker: "[ THE BHAI 14-DAY GUARANTEE ]",
    guaranteeTitle: "Your first AI agent goes live within 14 days. Or I keep working until it does.",
    guaranteeDesc:
      "Not a deck. Not a demo. A real AI agent running in production — you can watch it work in the control center.\nIf it's not live within 14 days, I keep working at no extra charge until it is. That's my commitment to your time.",

    /* ── Three products ── */
    tiersKicker: "[ 3 PRODUCTS · MIX AS NEEDED ]",
    tiersTitleA: "From ¥15K to a long-term retainer",
    tiersTitleB: "Pick the stage you're at",
    recommended: "Recommended",
    includesLabel: "Included",
    notIncludesLabel: "Not included",
    tiers: [
      {
        name: "AI Audit",
        nameEn: "AI AUDIT",
        tagline: "Entry · low risk · see the opportunities",
        price: "¥15,000 - 50,000",
        priceNote: "One-off · 1-2 weeks",
        description:
          "If you don't know where to start, this is the entrance. I audit your brand, CRM, e-commerce and client-management processes and deliver a 60-90 page AI roadmap report — down to which agent to deploy first and what numbers to expect after 6 weeks.",
        includes: [
          "AI maturity audit (5 dimensions)",
          "Hidden AI cost analysis (which AI tools your team is already using)",
          "PIPL + data-security compliance check",
          "60-90 page AI roadmap report",
          "A 2-hour readout with CEO + CTO together",
          "3 priority agent recommendations + ROI forecast",
        ],
        notIncludes: [
          "Actual agent deployment",
          "Ongoing retainer",
        ],
        cta: "Book the audit",
      },
      {
        name: "AI Build",
        nameEn: "AI BUILD",
        tagline: "The core product · full 14-week deployment · 14-day guarantee",
        price: "¥40,000 - 150,000",
        priceNote: "Per project · 14-week production deployment",
        description:
          "This is BHAI's core product. From 6 weeks of context building, to the first agent live in 14 days, to a full workforce running in production by week 14. Any combination of the 9 workforces proven in Denmark. All client data stays on Chinese cloud (Aliyun / Tencent Cloud / Huawei Cloud / AWS China).",
        includes: [
          "6 weeks of context building (brand voice pack + decision rules + integration audit)",
          "First agent live in 14 days (BHAI guarantee)",
          "Full 14-week workforce deployment",
          "AI control center + complete audit trail",
          "Triple compliance: PIPL + GDPR + EU AI Act",
          "Chinese cloud infrastructure (7 cloud providers to choose from)",
          "Dual model stack: international + domestic (Claude / Qwen / ERNIE Bot)",
          "Weekly review meetings for all 14 weeks",
          "Control-center training for your China GM",
        ],
        notIncludes: [
          "Ongoing retainer after week 14 (see the retainer below)",
        ],
        cta: "Book the build",
      },
      {
        name: "AI Retainer",
        nameEn: "AI RETAINER",
        tagline: "Long-term · continuous optimization · always in the loop",
        price: "from ¥20,000 /month",
        priceNote: "Monthly · AI token costs included",
        description:
          "After the 14-week AI Build, the engagement moves into continuous retainer. A review meeting every two weeks — which decisions humans rejected (retraining signals), which agents exceeded budget (boundary adjustments), which ROI beat expectations (expansion signals). I stay involved as an external advisor and don't depend on your internal team.",
        includes: [
          "Review meeting every two weeks (I attend personally)",
          "Continuous agent optimization + retraining",
          "New agents on demand (¥40K each)",
          "Continuous PIPL compliance monitoring",
          "AI control center upgrades",
          "4-hour emergency response",
          "All AI token costs included (no surcharge)",
          "Quarterly ROI report",
        ],
        notIncludes: [
          "Building a brand-new workforce from scratch",
        ],
        cta: "Book the retainer",
      },
    ],

    /* ── Included in every product ── */
    allProductsKicker: "[ INCLUDED IN EVERY PRODUCT ]",
    allProducts: [
      "I show up personally (no junior-consultant handoffs)",
      "GDPR + EU AI Act + PIPL triple compliance",
      "Full audit trail (every AI decision is traceable)",
      "Reach me directly on WeChat: busterl1",
      "Support in Chinese + Danish + English",
      "Data localization (China data never leaves China)",
    ],

    /* ── Comparison table ── */
    comparisonKicker: "[ BHAI vs TRADITIONAL AI CONSULTING ]",
    comparisonTitle: "Why I'm not like other AI consultancies",
    colDimension: "Dimension",
    colTraditional: "Traditional AI consulting",
    comparisonRows: [
      ["Price transparency", "Visible on this page right now", "Revealed on the first sales call"],
      ["Deliverable", "AI agents in production", "A deck + a roadmap report"],
      ["14-day guarantee", "First agent live in 14 days, or I keep working for free", "None"],
      ["Humans in the loop", "Human sign-off on every decision from day one", "Optional add-on"],
      ["Audit trail", "Complete and traceable, GDPR + PIPL triple compliance", "Compliance templates bolted on afterwards"],
      ["China compliance", "PIPL + Data Security Law + data localization", "Usually GDPR only"],
      ["AI token costs", "Included in the retainer", "Billed to the client"],
      ["Personal involvement", "I helm every client engagement myself", "Handed to junior consultants"],
      ["Case count", "16 real cases (15 Danish + 1 Chinese)", "Usually 3-5 anonymized cases"],
    ],

    /* ── FAQ ── */
    faqKicker: "[ PRICING FAQ ]",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "Why does the AI Audit cost ¥15K-50K? Can't I do it myself with ChatGPT?",
        a: "You can — if your brand's annual revenue is under RMB 50M. Above that level, what you need is: (1) to know which AI tools your team is actually using (usually 8-12, with nobody tracking the cost); (2) to know where your PIPL compliance risks sit; (3) to know which agent will pay for itself within 30 days. I've done this for 5+ years — a 60-90 page report delivered in 1-2 weeks beats your team fumbling for 6 months, faster and more accurately.",
      },
      {
        q: "Why does the AI Build range from ¥40K to ¥150K?",
        a: "It comes down to three factors: (1) your brand's complexity (1 product line or 5); (2) how many agents you choose (2 or 6); (3) integration complexity (existing CRM/ERP or building fresh). After a 20-minute call I can quote you precisely — no hidden fees.",
      },
      {
        q: "Why does the retainer start at ¥20K/month? What's included?",
        a: "¥20K/month includes: a review meeting every two weeks (I attend personally, no junior handoffs), continuous agent optimization + retraining, PIPL compliance monitoring, 4-hour emergency response, a quarterly ROI report — plus all AI token costs (Claude/Qwen API fees usually ¥3K-8K a month; I cover them, no surcharge).",
      },
      {
        q: "What exactly is the 14-day guarantee?",
        a: "Within 14 days of signing, your first AI agent must be live in production — not a deck, not a demo, an agent doing real work. If it isn't live in 14 days, I keep working at no extra charge until it is. The only exception: if your team delays providing necessary access or data, which I'll flag in writing in advance.",
      },
      {
        q: "Is the data safe? Does Chinese client data ever leave the country?",
        a: "No. All client data is deployed strictly on cloud infrastructure inside China (Aliyun's Shanghai region by default; Tencent Cloud / Huawei Cloud / AWS China optional). Only anonymized pattern data (no personal information) flows back to my Copenhagen control center for cross-client pattern learning. Compliant with PIPL Article 38, the Data Security Law and the Cybersecurity Law.",
      },
      {
        q: "Do I have to pay everything upfront?",
        a: "No. AI Audit: 50% to start + 50% on report delivery. AI Build: 30% to start + 30% when the first agent goes live (within 14 days) + 40% on full workforce delivery (within 14 weeks). Retainer: monthly. All payments accepted via RMB or EUR corporate accounts.",
      },
      {
        q: "Can I get a refund if I'm not satisfied?",
        a: "AI Audit: full refund within 7 days of report delivery, no reasons asked. AI Build: if the first agent isn't live within the 14-day guarantee window, the 30% kick-off payment already made is refunded in full. Retainer: if any month doesn't satisfy you, it stops the next month — the paid month isn't refunded but billing stops.",
      },
      {
        q: "What's the fundamental difference between you and those AI consultancies?",
        a: "Three of them: (1) I deliver AI agents in production; they deliver decks. (2) I work with every client personally; they hand off to junior consultants. (3) I have 16 real cases (15 Danish + 1 Chinese at Zhuyun Jewelry in Guangzhou); they usually have 3-5 anonymized ones. A 20-minute call and you'll feel the difference immediately.",
      },
    ],

    /* ── Footer CTA ── */
    ctaTitle: "Seen the prices? A 20-minute call settles whether to do this.",
    ctaSubtitle:
      "I won't sell you anything on the call. I listen to your bottleneck and tell you which product fits (or that none does). If it's not a fit, we shake hands and part as friends.",
    ctaPrimary: "WeChat busterl1 · Book →",
    ctaSecondary: "See the 16 cases first",
  },
};
