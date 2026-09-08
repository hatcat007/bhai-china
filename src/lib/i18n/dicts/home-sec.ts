/**
 * i18n 扩展字典 — 20-a（首页 sections）
 * 命名空间契约：homeSec（首页 THE PROBLEM 之后的全部 section 文案）
 * 只允许改本文件 + 首页相关组件；不得改动 i18n.tsx / extensions.ts / 其他文件
 *
 * caseDataEn：精选案例卡里 zh-only 字段（segment / results[0].after / myRole）的按 slug 渲染表。
 * - zh 半区 = 与 src/lib/data/jewelry-cases.ts 同值的镜像（仅作类型对称，zh 渲染直接读 data）。
 * - en 半区 = 英文渲染（case 页里这些字段没有 EN 配对，故在此补齐）。
 */
export type HomeSecCaseEn = { segment: string; after: string; role: string };

export const zh = {
  homeSec: {
    // ── [ 01 ] THE PROBLEM ──
    problemKicker: "[ 01 / 一个值得研究的样本 ]",
    problemTitleA: "潘多拉在中国失去了 ",
    problemTitleB: " 的份额。",
    problemTitleC: "这不是中国消费者不买珠宝了。",
    problemLead:
      "而是他们在用 2019 年的剧本打 2026 年的仗。很多欧洲品牌进入中国时，都低估了本地数字生态的复杂性——这不是谁的错，跨境做生意的复杂度本来就是真实的。2024 年第三季度他们中国营收同比下滑 33%，董事会把关店计划翻倍到 100 家。我把这些数字摆出来不是为了吓你，是因为这个样本值得逐帧研究。",
    problem1Title: "高端品牌的数字生态脱节",
    problem1Desc:
      "潘多拉中国份额从 9% 到 1% 的那几年，中国消费者的购物动线搬进了微信、小红书和直播间，而品牌的运营节奏还留在门店时代。我看过他们当时的数字工具清单——和我们部署时的差距，比我预想的大。",
    problem1Stat: "−89%",
    problem1StatLabel: "5 年份额变化（公开财报口径）",
    problem2Title: "假货不是新鲜事，速度才是",
    problem2Desc:
      "潘多拉是中国被仿冒最多的珠宝品牌之一，Shamballa、Trollbeads 的假货散落在淘宝/抖音/拼多多。值得说的不是假货存在——而是 AI 生成的假货图让下架速度第一次变成可量化的工程问题。",
    problem2Stat: "月均 1,840 件",
    problem2StatLabel: "防伪代理自动下架（部署后第 3 个月起）",
    problem3Title: "创始人产能的结构性上限",
    problem3Desc:
      "Jane Kønig 每年亲手画约 120 件，Charlotte Larsen 一年接 30 件定制、婉拒 200+。这不是创始人不够努力——是一人工坊的产能结构几十年没变过。AI 能放大它而不稀释它吗？这正是我在丹麦反复验证的问题。",
    problem3Stat: "8 → 1.5h",
    problem3StatLabel: "单件草图耗时（含 20 分钟人工打磨）",

    // ── 14 天保证横幅 ──
    guaranteeKicker: "[ BHAI 14 天保证 ]",
    guaranteeTitle:
      "首个 AI 代理 14 天内上线跑生产。没做到我继续干，不加钱——最快的一个项目 11 天，最慢的一次 19 天（卡在客户的数据导出审批）。",
    guaranteeCta: "看透明定价 →",

    // ── [ 02 ] BHAI 3 层方法 ──
    methodKicker: "[ 02 / BHAI 3 层方法 ]",
    methodTitleA: "不是 3 步流程。",
    methodTitleB: "是 3 层架构。",
    methodLead:
      "这套架构不是我想出来的，是被 16 个项目磨出来的。常见的 3 步流程（评估 → 设计 → 部署）做完就结束，而珠宝品牌的判断是每天发生的。所以我的方法是 3 层：底层的品牌数字基因库一直在学，中间的工作台自动化一直在跑，顶层的客户代理一直在跟你客户对话。3 层同时工作，缺一层都不成立。",
    layer1Name: "Brand Digital DNA Vault",
    layer1NameZh: "品牌数字基因库",
    layer1Tagline: "底层 · 一直在学你的品牌",
    layerIncludes: "[ 包含组件 ]",
    layer1Desc:
      "如果 AI 不知道 Jane Kønig 为什么坚持用某种特定的金工倒角，它生成的设计就只是廉价的模仿。我的第一步，是把你的品牌『潜意识』写进 AI 的基因里——语调、决策规则、工艺偏好、客户历史，全部编码成 AI 能消费的结构化上下文。这一步枯燥、贵、没人在社媒上晒，但跳过它，后面全是返工。丹麦那边 Jane Kønig 的 1,400 件档案 + 草图，用了 6 周才训成可用的基因库。",
    layer1Details: [
      "品牌语调包（14 天微信消息日志逆向工程）",
      "设计 DNA 编码（档案 + 草图 + 工匠笔记）",
      "决策规则文档（100+ 规则可版本化）",
      "组织结构 + 预算边界 + 升级策略",
    ],
    layer2Name: "Bench Automation",
    layer2NameZh: "工作台自动化层",
    layer2Tagline: "中层 · 一直在跑你的日常判断",
    layer2Desc:
      "Bench Automation——说白了，就是把买手、定价、库存这些每天重复的判断交给 AI 先做一遍，人只做最后拍板。这些代理不需要跟客户对话，它们在后台 24/7 跑：需求预测、动态定价、库存优化、防伪鉴真、PIPL 合规监控。潘多拉试点的防伪代理月均自动下架 1,840+ 件假货——但前两周的误报率高到我根本不敢开自动档，这是实话。",
    layer2Details: [
      "AI 防伪鉴真（淘宝/抖音/拼多多/微信代销监控）",
      "需求预测 + 动态定价（90 天 SKU 级 87% 准确率）",
      "中国云基础设施（7 大云厂商 + 多云冗余）",
      "PIPL + GDPR + EU AI Act 三重合规审计",
    ],
    layer3Name: "Clienteling Agents",
    layer3NameZh: "客户代理层",
    layer3Tagline: "顶层 · 一直在跟你客户对话",
    layer3Desc:
      "Clienteling Agents——训练过你品牌说话方式的私域客服团队，客户感觉不到对面是 AI。微信 VIP 礼宾、小红书编辑、抖音直播辅助、AR 试戴都在这一层。每个代理在工作台自动化划定的边界内运行，涉及钱和承诺的决策永远有人签字。丹麦那边 Sophie Bille Brahe 用这一层 6 个月做到 €1.8M 中国营收——前提是 Sophie 本人批准了每一个 KOL。",
    layer3Details: [
      "普通话 VIP 礼宾（24/7 微信客户管理）",
      "小红书 + 抖音内容代理（品牌语调翻译）",
      "AR 试戴网络（94% 色彩还原）",
      "高定共创代理（创始人 DNA 约束生成）",
    ],
    methodDeepKicker: "[ 深入了解 ]",
    methodDeepCta: "看 3 层方法的完整 14 周部署时间线 →",
    methodRoadKicker: "[ 个性化推荐 ]",
    methodRoadCta: "5 分钟生成你的 AI 路线图（免费） →",

    // ── [ 03 ] FEATURED CASES ──
    casesKicker: "[ 03 / 16 个真实案例 · 15 丹麦 + 1 中国 ]",
    casesTitle: "16 个案例里，我具体做了什么",
    casesLead:
      "16 个真实案例——15 个丹麦品牌 + 1 个中国广州南沙。我在每个项目里的角色不一样：有的做完整部署，有的只做 6 周审计，有的只是外部架构顾问。每个案例页里我都写清楚了三件事：『我的角色』、『它是怎么跑起来的』、『哪里出了问题』。看完还觉得可信，再预约也不迟。",
    casesLink: "看全部 16 个案例",
    caseEst: "起",
    caseKeyData: "[ 关键数据 ]",
    caseMyRole: "我的角色",
    caseCursor: "探索",
    caseDataEn: {
      "zhuyun-nansha": {
        segment: "OEM 转型自主品牌 · 珠江三角洲制造基因",
        after: "1.8 亿人民币（超目标 80%）",
        role: "我在珠韵的角色是方法转移：把丹麦验证过的部署框架翻成中文操作手册，培训他们的 5 人数字小组，并陪跑前 14 周。代理上线后的日常运营 100% 由珠韵团队自己开——我至今远程，一周看一次数据。",
      },
      pandora: {
        segment: "全球最大珠宝品牌 · 大众奢侈 · 串饰",
        after: "+38% 同店增长（试点 3 店）",
        role: "我为潘多拉亚太数字团队做了 6 周的 AI 工作流审计（访谈 33 人），然后在他们自己的审批流和预算体系里部署了 6 个代理。决策权、签发权和预算始终在潘多拉手里——我的名字不在这条签发链路上。",
      },
      "georg-jensen": {
        segment: "百年奢华银器与设计珠宝",
        after: "47 件/年（试点 8 个月）",
        role: "我为乔治·杰生的传承档案团队做了档案数字化审计，部署了检索代理和微信验真接口。档案录入由他们的两位馆员完成——我只搭管线、做质检。",
      },
      "ole-lynggaard": {
        segment: "家族高定珠宝 · 丹麦皇室御用",
        after: "4.1%（AR 试戴后）",
        role: "我为 Ole Lynggaard 的批发与零售团队部署了 AR 试戴管线和三语客服代理。工坊一天没扩，金匠团队没有被要求改变任何一道工序。",
      },
      "shamballa-jewels": {
        segment: "奢华定制 · 灵性珠宝",
        after: "31 件",
        role: "我为 Shamballa 部署了微信礼宾代理和 AR 手链配置器的原型。Mads 亲自训练代理讲了 6 个下午——佛教象征那一部分，我一个字没碰。",
      },
      "jane-konig": {
        segment: "当代丹麦高定珠宝 · 创始人主导",
        after: "340 件（Jane 仅审核）",
        role: "我为 Jane Kønig 的工作室部署了设计辅助管线和小红书内容代理。Jane 是唯一的审批人——没有她的签字，任何产出不出门。",
      },
    } as Record<string, HomeSecCaseEn>,

    // ── [ 04 ] WHO THIS IS FOR / NOT FOR ──
    fitKicker: "[ 04 / 适配判定 ]",
    fitTitle: "我能帮你的前提",
    fitLead:
      "过去五年我犯过不少错，最贵的一次是同时给一个品牌上了 6 个代理而不是先上 1 个——那是在浪费客户的钱。所以我只接能真正交付可衡量 ROI 的项目。你的情况如果不在这两个清单里，我会直接告诉你，不浪费你 20 分钟。",
    fitYesTitle: "这是为你准备的",
    fitYesItems: [
      "你的珠宝品牌年营收 ≥ 5000 万人民币，中国市场份额在下滑或未启动",
      "你的团队用 ChatGPT/Copilot/各种 AI 工具，但没人追踪成本或效果",
      "你的品牌在淘宝/抖音/小红书有假货问题，团队加班也追不上",
      "你的设计师/金匠成为瓶颈，无法在不稀释品牌 DNA 的情况下增长",
      "你想进中国或重返中国，想先弄清楚潘多拉那几年到底哪里走偏了",
      "你的董事会要可衡量的 ROI 和合规审计链，不是更多 PPT",
    ],
    fitNoTitle: "这不是为你准备的",
    fitNoItems: [
      "你在找一个 ChatGPT 套壳或一次性 AI 咨询报告",
      "你想要没有人类监督、没有审计链的 AI 自主运行",
      "你不愿把业务规则、品牌语调、决策边界文档化",
      "你期待 AI 零输入完美运行，不愿投入审核时间",
      "你的品牌年营收低于 5000 万人民币，团队少于 10 人",
      "你的董事会只想听 AI 故事，不想看 ROI 数字",
    ],

    // ── [ 05 ] SOLUTIONS PREVIEW ──
    solKicker: "[ 05 / 珠宝行业 AI 解决方案 ]",
    solTitle: "我为珠宝品牌部署的 9 类 AI 工作队",
    solLead:
      "不是通用 AI。每一支工作队都对准珠宝行业的具体环节——防伪、定制、客户管理、设计、来源、库存、市场切入、合规、中国云基础设施。名字听起来抽象，每个案例页里我都写了它们实际怎么跑。",
    sol1Title: "AI 防伪鉴真",
    sol1Desc: "图像识别监控淘宝/抖音/拼多多/微信代销，自动下架假货。",
    sol1Count: "3 案例",
    sol2Title: "高定共创 AI",
    sol2Desc: "在品牌 DNA 约束下生成定制设计，创始人审核。",
    sol2Count: "5 案例",
    sol3Title: "普通话 VIP 礼宾",
    sol3Desc: "24/7 微信客户管理 + 私享鉴赏预约 + 跨境物流。",
    sol3Count: "7 案例",
    sol4Title: "需求预测 + 动态定价",
    sol4Desc: "SKU 级 90 天需求预测 + 库存优化 + 动态定价。",
    sol4Count: "4 案例",
    sol5Title: "区块链来源",
    sol5Desc: "为每件作品铸造可验证来源证书，反漂绿。",
    sol5Count: "3 案例",
    sol6Title: "中国切入手册",
    sol6Desc: "市场优先级 AI + KOL 匹配 + Xiaohongshu 编辑代理。",
    sol6Count: "6 案例",
    sol7Title: "AR 试戴网络",
    sol7Desc: "扫二维码在手机上 3D 试戴，94% 色彩还原。",
    sol7Count: "2 案例",
    sol8Title: "困境品牌 AI",
    sol8Desc: "清仓定价 + 档案估值 + 收购尽调，中国整合者视角。",
    sol8Count: "2 案例",
    sol9Title: "中国云基础设施",
    sol9Desc: "AWS China / 阿里云 / 腾讯云 / 华为云 / 香港桥接，PIPL 合规。",
    sol9Count: "1 案例",
    solLink: "看每个解决方案的完整说明",

    // ── [ 06 ] VOICE / BUSTER QUOTE ──
    quoteKicker: "[ 06 / 我的态度 ]",
    quoteA: "88% 的公司在用 AI，",
    quoteB: "大多数卡在 PPT 阶段。",
    quoteC: "我踩过的坑，跟做成的系统一样多。两样都原样讲给你。",
    quoteName: "陆博明 / Buster ML Larsen",
    quoteRole: "丹麦 AI 系统架构师 · 现转移方法到中国",
    quotePhotoAlt: "陆博明 / Buster ML Larsen — Better Human AI 创始人",
    quoteMarkAlt: "BHAI 舵轮 — Buster ved roret",

    // ── [ 07 ] PRICING PREVIEW + AI ROADMAP CTA ──
    priceKicker: "[ 07 / 透明定价 + 免费路线图 ]",
    priceTitleA: "价格直接写在网上。",
    priceTitleB: "第一次通话之前，你就知道报价。",
    priceLead:
      "¥15K 起 AI 审计。¥40K 起完整构建。¥20K/月起托管——具体区间就在下面，也在定价页。14 天首个代理上线，没做到我继续干、不加钱。这种话写在网上，比在电话里说更有约束力。",
    priceCardKicker: "[ 透明定价 ]",
    priceCardTitle: "3 个产品 · 任选组合",
    priceRow1: "AI 审计（入门）",
    priceRow2: "AI 构建（主力）",
    priceRow3: "AI 托管（长期）",
    priceRow3Value: "¥20K/月起",
    priceCta: "看完整定价 + 14 天保证",
    roadKicker: "[ 免费 · 5 分钟 ]",
    roadTitle: "生成你的 AI 路线图",
    roadDesc:
      "回答 5 个问题，我按 BHAI 方法（丹麦 15 个案例 + 珠韵的适配经验）生成你的个性化 AI 路线图预览——具体到第一个该上哪个代理、14 天后该看什么数字、30 天 ROI 的保守估计。生成约 20 秒，是预览，不是承诺。",
    roadCta: "开始 5 分钟生成路线图",

    // ── FREE AI TOOLS TEASER（ToolsTeaser.tsx；按钮复用 t.toolsIndex.startScan）──
    teaserKicker: "[ LIVE AI · 免费体验 ]",
    teaserTitle: "网站 AI 缺口扫描 · 10 秒",
    teaserDesc:
      "贴上任意珠宝品牌官网，我真的去读这个网站，然后告诉你它缺什么、代价是多少、90 天内先做哪件事。",
    teaserUrlLabel: "官网地址",
    teaserFootnote: "免费 · 无需注册 · 只引用页面上真实存在的文字",

    // ── 全局 chrome（MetricsPanel / BackToTop）──
    metricsAria: "BHAI 实时指标",
    backToTop: "返回顶部",
  },
};

export const en = {
  homeSec: {
    // ── [ 01 ] THE PROBLEM ──
    problemKicker: "[ 01 / A CASE WORTH DISSECTING ]",
    problemTitleA: "Pandora lost ",
    problemTitleB: " of its share in China.",
    problemTitleC: "It's not that Chinese consumers stopped buying jewelry.",
    problemLead:
      "They were fighting a 2026 battle with a 2019 playbook. Most European brands underestimate the complexity of China's local digital ecosystem when they enter — nobody's fault; cross-border complexity is simply real. In Q3 2024 their China revenue fell 33% YoY, and the board doubled the store-closure plan to 100. I put these numbers in front of you not to scare you, but because this sample is worth studying frame by frame.",
    problem1Title: "The digital-ecosystem disconnect at premium brands",
    problem1Desc:
      "In the years Pandora's China share went from 9% to 1%, Chinese shoppers moved to WeChat, Xiaohongshu and livestream rooms — while the brand kept running on a store-era operating rhythm. I've seen the digital tooling list they used back then; the gap to what we deploy today was bigger than I expected.",
    problem1Stat: "−89%",
    problem1StatLabel: "share change over 5 years (per public filings)",
    problem2Title: "Counterfeits aren't new — response speed is",
    problem2Desc:
      "Pandora is one of the most counterfeited jewelry brands in China; fake Shamballa and Trollbeads pieces are scattered across Taobao/Douyin/Pinduoduo. The notable part isn't that fakes exist — it's that AI-generated fake imagery makes takedown speed a quantifiable engineering problem for the first time.",
    problem2Stat: "1,840 / month",
    problem2StatLabel: "auto-takedowns by the anti-counterfeit agent (from month 3 after deployment)",
    problem3Title: "The structural ceiling on founder output",
    problem3Desc:
      "Jane Kønig hand-draws about 120 pieces a year; Charlotte Larsen takes 30 bespoke commissions a year and turns down 200+. That's not a lack of effort — a one-person atelier's capacity structure hasn't changed in decades. Can AI amplify it without diluting it? That's exactly the question I kept testing in Denmark.",
    problem3Stat: "8 → 1.5h",
    problem3StatLabel: "per-sketch time (incl. 20 min of human finishing)",

    // ── 14-day guarantee banner ──
    guaranteeKicker: "[ BHAI 14-DAY GUARANTEE ]",
    guaranteeTitle:
      "First AI agent live in production within 14 days. If not, I keep working at no extra cost — my fastest project took 11 days, the slowest 19 (held up by the client's data-export approval).",
    guaranteeCta: "See transparent pricing →",

    // ── [ 02 ] BHAI 3-LAYER METHOD ──
    methodKicker: "[ 02 / THE BHAI 3-LAYER METHOD ]",
    methodTitleA: "Not a 3-step process.",
    methodTitleB: "A 3-layer architecture.",
    methodLead:
      "I didn't invent this architecture — 16 projects beat it into shape. The usual 3-step process (assess → design → deploy) ends when the engagement ends, but a jewelry brand's judgment calls happen every day. So my method has 3 layers: the Brand Digital DNA Vault at the bottom keeps learning your brand, Bench Automation in the middle keeps running your daily calls, and Clienteling Agents on top keep talking to your customers. All three work at once — remove one and the whole thing fails.",
    layer1Name: "Brand Digital DNA Vault",
    layer1NameZh: "",
    layer1Tagline: "Base layer · always learning your brand",
    layerIncludes: "[ WHAT'S INCLUDED ]",
    layer1Desc:
      "If the AI doesn't know why Jane Kønig insists on a particular chamfer in her metalwork, what it generates is cheap imitation. Step one is writing your brand's subconscious into the AI's DNA — tone of voice, decision rules, craft preferences, client history, all encoded into structured context the AI can consume. This step is tedious, expensive, and nobody shows it off on social media — but skip it and everything after is rework. In Denmark, Jane Kønig's 1,400 archive pieces + sketches took 6 weeks to train into a usable vault.",
    layer1Details: [
      "Brand tone-of-voice pack (reverse-engineered from 14 days of WeChat message logs)",
      "Design DNA encoding (archive + sketches + craftsman notes)",
      "Decision-rule documentation (100+ rules, versioned)",
      "Org structure + budget boundaries + escalation policy",
    ],
    layer2Name: "Bench Automation",
    layer2NameZh: "",
    layer2Tagline: "Middle layer · always running your daily judgment calls",
    layer2Desc:
      "Bench Automation, plainly put: hand the daily repeated judgment calls — buying, pricing, inventory — to AI for the first pass, and humans make the final call. These agents never talk to customers; they run in the background 24/7: demand forecasting, dynamic pricing, inventory optimization, counterfeit authentication, PIPL compliance monitoring. Pandora's pilot anti-counterfeit agent auto-takes down 1,840+ fakes a month — but for the first two weeks the false-positive rate was so high I didn't dare switch on auto mode. That's the honest version.",
    layer2Details: [
      "AI counterfeit authentication (Taobao/Douyin/Pinduoduo/WeChat resale monitoring)",
      "Demand forecasting + dynamic pricing (87% SKU-level accuracy over 90 days)",
      "China cloud infrastructure (7 major cloud providers + multi-cloud redundancy)",
      "PIPL + GDPR + EU AI Act triple compliance audit",
    ],
    layer3Name: "Clienteling Agents",
    layer3NameZh: "",
    layer3Tagline: "Top layer · always talking to your customers",
    layer3Desc:
      "Clienteling Agents — a private-domain service team trained to speak the way your brand speaks; customers can't tell there's an AI on the other side. WeChat VIP concierge, Xiaohongshu editing, Douyin livestream assistance and AR try-on all live in this layer. Every agent runs inside boundaries set by Bench Automation, and decisions involving money or commitments always carry a human signature. In Denmark, Sophie Bille Brahe used this layer to reach €1.8M in China revenue within 6 months — on the condition that Sophie herself approved every KOL.",
    layer3Details: [
      "Mandarin VIP concierge (24/7 WeChat clienteling)",
      "Xiaohongshu + Douyin content agents (brand tone, translated)",
      "AR try-on network (94% color fidelity)",
      "Bespoke co-creation agent (founder-DNA-constrained generation)",
    ],
    methodDeepKicker: "[ GO DEEPER ]",
    methodDeepCta: "See the full 14-week deployment timeline of the 3-layer method →",
    methodRoadKicker: "[ PERSONALIZED ]",
    methodRoadCta: "Generate your AI roadmap in 5 minutes (free) →",

    // ── [ 03 ] FEATURED CASES ──
    casesKicker: "[ 03 / 16 REAL CASES · 15 DANISH + 1 CHINESE ]",
    casesTitle: "What I actually did in each of the 16 cases",
    casesLead:
      "16 real cases — 15 Danish brands + 1 in Nansha, Guangzhou, China. My role differed in each: some were full deployments, some were 6-week audits, some were external architecture consulting only. Every case page states three things plainly: my role, how it actually runs, and where things broke. If it still reads as credible afterwards, then book the call.",
    casesLink: "See all 16 cases",
    caseEst: "est.",
    caseKeyData: "[ KEY NUMBER ]",
    caseMyRole: "MY ROLE",
    caseCursor: "Explore",
    caseDataEn: {
      "zhuyun-nansha": {
        segment: "OEM turned own-brand · Pearl River Delta manufacturing DNA",
        after: "¥180M (80% over target)",
        role: "My role at Zhuyun was method transfer: turning the Denmark-proven deployment framework into a Chinese operations manual, training their 5-person digital team, and shadowing the first 14 weeks. Since launch, 100% of day-to-day operations are run by the Zhuyun team themselves — I stay remote and review the numbers once a week.",
      },
      pandora: {
        segment: "World's largest jewelry brand · accessible luxury · charms",
        after: "+38% same-store growth (3 pilot stores)",
        role: "I ran a 6-week AI workflow audit for Pandora's APAC digital team (33 interviews), then deployed 6 agents inside their own approval flow and budget system. Decision rights, sign-off and budget stayed with Pandora throughout — my name is not on that approval chain.",
      },
      "georg-jensen": {
        segment: "Century-old luxury silverware & design jewelry",
        after: "47 pieces/yr (8-month pilot)",
        role: "I did an archive-digitization audit for Georg Jensen's heritage team and deployed the retrieval agent plus the WeChat verification interface. Their two in-house librarians did the data entry — I built the pipeline and ran quality control.",
      },
      "ole-lynggaard": {
        segment: "Family haute joaillerie · Danish royal warrant",
        after: "4.1% (with AR try-on)",
        role: "I deployed the AR try-on pipeline and the trilingual clienteling agents for Ole Lynggaard's wholesale and retail teams. The workshop didn't grow by a single day, and the goldsmiths weren't asked to change a single step of their process.",
      },
      "shamballa-jewels": {
        segment: "Luxury bespoke · spiritual jewelry",
        after: "31 orders",
        role: "For Shamballa I deployed the WeChat concierge agent and the AR bracelet configurator prototype. Mads personally trained the agent across 6 afternoons — the Buddhist symbolism part, I didn't touch a single word.",
      },
      "jane-konig": {
        segment: "Contemporary Danish fine jewelry · founder-led",
        after: "340 designs (Jane reviews only)",
        role: "I deployed the design-assist pipeline and the Xiaohongshu content agent for Jane Kønig's studio. Jane is the sole approver — without her sign-off, nothing ships.",
      },
    } as Record<string, HomeSecCaseEn>,

    // ── [ 04 ] WHO THIS IS FOR / NOT FOR ──
    fitKicker: "[ 04 / FIT CHECK ]",
    fitTitle: "Whether I can help you",
    fitLead:
      "I've made my share of mistakes over the past five years; the most expensive one was rolling out 6 agents for one brand at once instead of starting with 1 — that was a waste of the client's money. So I only take projects where I can deliver measurable ROI. If your situation isn't on either list below, I'll tell you straight and save you 20 minutes.",
    fitYesTitle: "This is for you if…",
    fitYesItems: [
      "Your jewelry brand does ≥ RMB 50M a year, and your China share is sliding — or you haven't started yet",
      "Your team uses ChatGPT/Copilot/various AI tools, but nobody tracks cost or results",
      "Your brand has a counterfeit problem on Taobao/Douyin/Xiaohongshu and the team can't keep up even working overtime",
      "Your designers/goldsmiths are the bottleneck and you can't grow without diluting the brand DNA",
      "You want to enter — or re-enter — China, and want to understand exactly where Pandora went wrong",
      "Your board wants measurable ROI and a compliance audit trail, not more slideware",
    ],
    fitNoTitle: "This is NOT for you if…",
    fitNoItems: [
      "You're looking for a ChatGPT wrapper or a one-off AI consulting report",
      "You want AI running autonomously with no human oversight and no audit trail",
      "You won't document business rules, brand tone and decision boundaries",
      "You expect AI to run perfectly with zero input and won't invest review time",
      "Your brand does under RMB 50M a year with a team of fewer than 10",
      "Your board only wants AI stories, not ROI numbers",
    ],

    // ── [ 05 ] SOLUTIONS PREVIEW ──
    solKicker: "[ 05 / AI SOLUTIONS FOR JEWELRY BRANDS ]",
    solTitle: "The 9 AI workforces I deploy for jewelry brands",
    solLead:
      "Not generic AI. Each workforce targets a specific link in the jewelry chain — anti-counterfeit, bespoke, clienteling, design, provenance, inventory, market entry, compliance, China cloud infrastructure. The names sound abstract; every case page documents how they actually run.",
    sol1Title: "AI Anti-Counterfeit Authentication",
    sol1Desc: "Image recognition monitors Taobao/Douyin/Pinduoduo/WeChat resale channels and auto-files takedowns.",
    sol1Count: "3 cases",
    sol2Title: "Bespoke Co-Creation AI",
    sol2Desc: "Generates custom designs under brand-DNA constraints; the founder approves.",
    sol2Count: "5 cases",
    sol3Title: "Mandarin VIP Concierge",
    sol3Desc: "24/7 WeChat clienteling + private-viewing bookings + cross-border logistics.",
    sol3Count: "7 cases",
    sol4Title: "Demand Forecasting + Dynamic Pricing",
    sol4Desc: "90-day SKU-level demand forecasts + inventory optimization + dynamic pricing.",
    sol4Count: "4 cases",
    sol5Title: "Blockchain Provenance",
    sol5Desc: "Mints a verifiable provenance certificate for every piece — anti-greenwashing.",
    sol5Count: "3 cases",
    sol6Title: "China Entry Playbook",
    sol6Desc: "Market-priority AI + KOL matching + a Xiaohongshu editorial agent.",
    sol6Count: "6 cases",
    sol7Title: "AR Try-On Network",
    sol7Desc: "Scan a QR code to try pieces on in 3D on your phone — 94% color fidelity.",
    sol7Count: "2 cases",
    sol8Title: "Distressed-Brand AI",
    sol8Desc: "Liquidation pricing + archive valuation + acquisition due diligence, from a China consolidator's perspective.",
    sol8Count: "2 cases",
    sol9Title: "China Cloud Infrastructure",
    sol9Desc: "AWS China / Aliyun / Tencent Cloud / Huawei Cloud / HK bridging — PIPL compliant.",
    sol9Count: "1 case",
    solLink: "Read the full write-up for each solution",

    // ── [ 06 ] VOICE / BUSTER QUOTE ──
    quoteKicker: "[ 06 / WHERE I STAND ]",
    quoteA: "88% of companies are using AI,",
    quoteB: "most of them stuck at the slide-deck stage.",
    quoteC: "I've hit as many potholes as I've shipped systems. You'll hear about both, exactly as they happened.",
    quoteName: "Buster ML Larsen (陆博明)",
    quoteRole: "Danish AI systems architect · method now transferred to China",
    quotePhotoAlt: "Buster ML Larsen — founder of Better Human AI",
    quoteMarkAlt: "BHAI steering-wheel mark — Buster ved roret",

    // ── [ 07 ] PRICING PREVIEW + AI ROADMAP CTA ──
    priceKicker: "[ 07 / TRANSPARENT PRICING + FREE ROADMAP ]",
    priceTitleA: "The prices are written on the website.",
    priceTitleB: "You know the quote before the first call.",
    priceLead:
      "AI audits from ¥15K. Full builds from ¥40K. Hosting from ¥20K/month — the ranges are right below, and on the pricing page. First agent live in 14 days, or I keep working at no extra cost. Written on a website, that sentence binds harder than anything said on a call.",
    priceCardKicker: "[ TRANSPARENT PRICING ]",
    priceCardTitle: "3 products · combine as needed",
    priceRow1: "AI audit (entry)",
    priceRow2: "AI build (core)",
    priceRow3: "AI hosting (ongoing)",
    priceRow3Value: "from ¥20K/mo",
    priceCta: "Full pricing + the 14-day guarantee",
    roadKicker: "[ FREE · 5 MIN ]",
    roadTitle: "Generate your AI roadmap",
    roadDesc:
      "Answer 5 questions and I'll generate a personalized AI roadmap preview using the BHAI method (15 Danish cases + the Zhuyun adaptation) — down to which agent to deploy first, what numbers to watch after 14 days, and a conservative 30-day ROI estimate. Takes about 20 seconds; it's a preview, not a promise.",
    roadCta: "Start the 5-minute roadmap",

    // ── FREE AI TOOLS TEASER (ToolsTeaser.tsx; button reuses t.toolsIndex.startScan) ──
    teaserKicker: "[ LIVE AI · TRY IT FREE ]",
    teaserTitle: "AI website gap scan · 10 seconds",
    teaserDesc:
      "Paste any jewelry brand's website. I actually go read the site, then tell you what it's missing, what that costs, and which one thing to do first in the next 90 days.",
    teaserUrlLabel: "Website URL",
    teaserFootnote: "Free · no signup · quotes only text that actually exists on the page",

    // ── global chrome (MetricsPanel / BackToTop) ──
    metricsAria: "BHAI live metrics",
    backToTop: "Back to top",
  },
};
