/**
 * i18n 扩展字典 — 20-c（book / denmark-insights / logos 页）
 * 命名空间契约：book / insights / logos
 * 只允许改本文件 + 这三个页面及 BookingForm / BookFaq 等
 * 约定：zh / en 键完全对称（en 以 typeof zh 校验）；品牌名/微信 ID/丹麦语 motto 保持原样
 */
export const zh = {
  book: {
    /* ---- HERO ---- */
    heroKicker: "[ 20 分钟 · NO PITCH · NO COMMITMENTS ]",
    heroTitleA: "20 分钟。",
    heroTitleB: "没有 PPT。没有承诺。",
    heroDesc:
      "你讲你的品牌、你的市场、你的瓶颈。我告诉你 AI 在哪里能赚回它自己的钱——以及在哪里不能。如果对不上，我们握手告别。这是我对你时间的承诺，也是对我时间的承诺。",

    /* ---- 20 分钟会发生什么 ---- */
    agendaKicker: "[ 20 分钟会发生什么 ]",
    agendaTitle: "时间分配 · 分钟级",
    agendaSteps: [
      {
        min: "0-3",
        title: "你的品牌当前状态",
        desc: "你用 3 分钟告诉我：年营收、中国份额、最大瓶颈。不需要准备 PPT——口语就行。",
      },
      {
        min: "3-10",
        title: "你的真实痛点",
        desc: "我用 7 分钟问问题，挖到真正的瓶颈。不是表面问题（『需要更多流量』），是根因（『VIP 客户咨询响应 48 小时』）。",
      },
      {
        min: "10-15",
        title: "我的诚实评估",
        desc: "我用 5 分钟告诉你：BHAI 能不能帮、能帮多少、第一个该上哪个代理、6 周后能看到什么数字。",
      },
      {
        min: "15-20",
        title: "你的提问 + 下一步",
        desc: "最后 5 分钟是你的。问任何问题。如果对得上，我们讨论下一步；如果对不上，我们握手告别。",
      },
    ],

    /* ---- 你需要准备什么 ---- */
    prepKicker: "[ 你需要准备什么 ]",
    prepTitle: "3 件事 · 不多",
    prepItems: [
      {
        num: "01",
        title: "品牌基本盘",
        desc: "年营收区间（不需要精确）、中国市场占比、主要渠道（直营/批发/DTC）、团队规模。口语就行。",
      },
      {
        num: "02",
        title: "最痛的痛点",
        desc: "如果只能解决一个问题，是哪个？假货？中国市场份额？创始人瓶颈？库存减值？挑一个最痛的。",
      },
      {
        num: "03",
        title: "决策权限",
        desc: "你是 CEO 还是高管？是否有 AI 项目预算审批权？如果需要董事会批准，董事会下次开会是什么时候？",
      },
    ],
    prepNoteLabel: "不需要准备：",
    prepNoteBody:
      "PPT、商业计划书、技术架构图、详细财务报表。我会从你的口语里挖出我需要的信息。如果你准备了反而会拖慢对话。",

    /* ---- 预约入口 ---- */
    bookKicker: "[ 直接预约 ]",
    bookTitle: "选一个时间 · 20 分钟",
    bookDesc: "点击下方按钮进入日历。选你方便的 20 分钟。我会准时出现。",
    wechatLabel: "微信：busterl1",
    wechatNote: "中国客户首选 · 搜索添加，备注：BHAI 珠宝 CEO",
    qrKicker: "[ 或扫码加微信 ]",
    qrTitle: "微信扫一扫",
    qrLines: ["手机微信扫上方二维码", "直接添加 Buster 为好友", "备注：BHAI 珠宝 CEO"],
    qrAlt: "WeChat QR Code — 微信扫码加 Buster",
    calNote: "国际客户日历预约",
    mailNote: "如果微信/日历没合适时间，直接发邮件",
    mailSubject: "20 分钟预约",
    mailBody:
      "Buster，我是 [品牌名] 的 [职位]。我们的年营收大约 [区间]。最痛的痛点是 [一句话描述]。我想预约 20 分钟。",
    triTime: "20 分钟",

    notReady: "还没准备好预约？先看看我做过什么。",
    linkCases: "看 15 个丹麦案例",
    linkSolutions: "看 8 类解决方案",
    linkMethod: "看 BHAI 方法",
    linkInsights: "看丹麦洞察",

    /* ---- 30 秒预约表单（BookingForm）---- */
    formKicker: "[ 或留下信息 · 我来找你 ]",
    formTitle: "30 秒预约表单",
    formDesc: "填完提交即可。我只看必要信息——其余的 20 分钟里聊。",
    nameLabel: "姓名",
    namePh: "你的称呼",
    contactLabel: "微信号或邮箱",
    contactPh: "wechat-id 或 ceo@brand.com",
    brandLabel: "品牌名",
    brandPh: "你的珠宝品牌",
    revenueLabel: "年营收区间",
    revenuePlaceholder: "选择区间（可选）",
    revenueOptions: [
      "5000 万人民币以下",
      "5000 万 - 2 亿人民币",
      "2 亿 - 10 亿人民币",
      "10 亿人民币以上",
    ],
    painLabel: "最痛的痛点",
    painPlaceholder: "选择痛点（可选）",
    painOptions: [
      "假货太多，团队追不上",
      "创始人/设计师成为瓶颈",
      "想进或重返中国市场",
      "VIP 客户管理低效",
      "库存减值严重",
      "PIPL / 数据合规压力",
    ],
    messageLabel: "想聊什么（一句话就够）",
    messagePh: "例：我们在考虑把设计流程 AI 化，但担心丢失品牌 DNA。",
    submitIdle: "提交预约请求",
    submitBusy: "提交中…",
    trust: ["信息只发给 Buster 本人", "不会自动订阅任何东西", "PIPL + GDPR 合规"],

    /* ---- 提交成功态 ---- */
    doneKicker: "[ 预约请求 · 已提交 ]",
    doneTitle: "{name}，你的 20 分钟已保留",
    doneDescA: "我会在 24 小时内通过 ",
    doneDescB: " 联系你，确认具体时间。如果你想立即聊，直接加微信 ",
    doneDescC: "，备注「BHAI 珠宝 CEO」优先通过。",
    doneTriTime: "24h 内回复",

    /* ---- Toast / 错误 ---- */
    toastOkTitle: "预约请求已收到",
    toastOkDesc: "Buster 会在 24 小时内通过微信或邮箱联系你。",
    toastFailTitle: "提交失败",
    toastFailDesc: "请稍后重试，或直接加微信 busterl1",
    formSubmitFail: "提交失败",

    /* ---- FAQ（BookFaq）---- */
    faqKicker: "[ 常见问题 ]",
    faqTitle: "预约前，CEO 们最常问的 6 个问题",
    faq: [
      {
        q: "这 20 分钟真的免费吗？会不会聊到一半开始推销？",
        a: "完全免费，也没有销售环节。我靠交付项目赚钱，不靠通话推销。如果 BHAI 对你的品牌没有明显价值，我会直接告诉你「不要买」——这 15 年在丹麦我拒绝过的项目比成交的多。",
      },
      {
        q: "我需要提前准备什么材料？",
        a: "不需要 PPT。你只要知道三个数字就够了：年营收大概多少、中国业务占比多少、现在最头疼的一件事是什么。口语描述就行，通话里我会问需要问的。",
      },
      {
        q: "20 分钟真的能解决我的问题吗？",
        a: "20 分钟不能解决问题，但能精确定位问题。通话结束你会带走三样东西：AI 对你品牌到底有没有用的诚实判断、第一个该部署的代理是哪个、大概的投资区间和回报周期。要不要往下走，完全由你决定。",
      },
      {
        q: "如果 BHAI 不适合我的品牌怎么办？",
        a: "那我会当面说清楚，握手告别，之后不会有任何骚扰式跟进。到目前为止，我推荐「先别做 AI」的咨询占了相当比例——省下来的冤枉钱，对你也是价值。",
      },
      {
        q: "预约之后多久能安排通话？",
        a: "通常 48 小时内。提交表单后我会加你微信确认具体时间——北京时间或哥本哈根时间都可以，我两边都方便。通话形式是微信语音或视频，你选。",
      },
      {
        q: "数据保密吗？我不想让同行知道我的品牌痛点。",
        a: "默认全程保密。你在表单和通话里说的任何数字、痛点、渠道信息，只用于本次咨询，绝不外泄。需要的话，正式合作前可以签 NDA；PIPL/GDPR 合规本身就是我们部署方案的第一层。",
      },
    ],
    faqFoot: "还有别的疑问？直接在预约表单留言，或微信联系 busterl1（备注 BHAI 珠宝 CEO）。",
  },

  insights: {
    /* ---- HERO ---- */
    heroKicker: "[ 5 个丹麦洞察 · 中国 CEO 视角 ]",
    heroTitleA: "为什么中国珠宝 CEO",
    heroTitleB: "该看丹麦？",
    heroDesc:
      "我住在哥本哈根，卖到中国。我帮 15 个真实丹麦珠宝品牌部署了 AI 工作队。这 5 个洞察是我从一线总结的——专为中国珠宝 CEO 而写。每一个都对应一个我能帮你部署的解决方案。",

    /* ---- 5 条洞察 ---- */
    items: [
      {
        num: "01",
        title: "潘多拉的中国困境，是一份值得研究的免费教案",
        summary:
          "5 年内失去了 89% 的份额。这不是中国消费者不买珠宝了，而是他们在用 2019 年的剧本打 2026 年的仗。值得学习，不是嘲笑。",
        body: [
          "潘多拉 2019 年中国营收占集团 9%。2024 年这个数字是 1%。2024 年第三季度中国营收同比下滑 33%。董事会原计划关 50 家中国门店，2024 年翻倍到 100 家。这不是市场不买账——这是品牌还在用 2019 年的剧本打 2026 年的仗。",
          "潘多拉的失误在哪里？三个核心问题：第一，没有为 Gen-Z 中国消费者重新设计品牌叙事，串饰手链的故事被本土竞争者（周大福的『传承』系列、老凤祥的『国潮』）抢占。第二，没有在抖音/小红书建立 KOL 矩阵，潘多拉在中国社交媒体上的存在感严重弱化。第三，没有防伪鉴真体系——潘多拉是中国被仿冒最严重的珠宝品牌，假货充斥电商直接侵蚀品牌信任。",
          "我帮潘多拉中国试点部署了 6 代理工作队，14 周内试点门店同店增长 +38%。但更大的价值是给中国珠宝 CEO 的免费教案：不要重蹈覆辙。你的品牌进中国前，先把这三件事做好——品牌叙事本地化、KOL 矩阵、防伪体系。我都能帮你部署。",
        ],
        stat: "-89%",
        statLabel: "5 年中国份额变化",
        caseLabel: "看潘多拉案例详情",
      },
      {
        num: "02",
        title: "丹麦工艺 + 中国 Gen-Z 静奢 = 最高杠杆机会",
        summary:
          "Sophie Bille Brahe 在中国零存在，但 47,200 个静奢买家在小红书等她。Ole Lynggaard、Shamballa 同样。",
        body: [
          "中国 Gen-Z 静奢买家（quiet luxury）是高定珠宝增长最快的细分。他们不要 logo 大声的品牌——要极简、要有故事、要有工艺深度、要小众到朋友圈没人认识。这恰好是丹麦顶级珠宝品牌的 DNA：Sophie Bille Brahe 的宇宙极简美学、Ole Lynggaard 的皇室御用工艺、Shamballa 的禅意奢侈、Jane Kønig 的雕塑极简。",
          "但是——Sophie Bille Brahe 在中国零存在。Ole Lynggaard 中国零售覆盖有限。Shamballa 在中国有零星零售但没数字化。这些品牌的共同问题：它们的设计 DNA 完美契合中国 Gen-Z 静奢市场，但它们没有中国切入手册，没有 KOL 匹配能力，没有普通话客户管理，没有小红书内容引擎。",
          "我帮 Sophie Bille Brahe 部署了 5 代理中国切入工作队，6 个月做到 €1.8M 中国营收 + 47,200 小红书粉丝。她拒了 12 家中国代理因为不懂静奢——我的 AI 第一天就懂。这是我能给中国珠宝 CEO 的最大价值：如果你在考虑收购或合作丹麦静奢品牌，我能帮你做品牌匹配分析 + 切入手册部署。",
        ],
        stat: "0 → €1.8M",
        statLabel: "Sophie Bille Brahe 中国首年营收",
        caseLabel: "看 Sophie Bille Brahe 案例详情",
      },
      {
        num: "03",
        title: "可持续 + 区块链来源 = 中国 ESG 浪潮的反漂绿武器",
        summary:
          "中国 Gen-Z 越来越怀疑『再生金』『实验室钻石』声明。丹麦品牌领先的可持续实践 + 我部署的区块链来源 = 不可伪造的溢价护城河。",
        body: [
          "丹麦珠宝品牌在可持续实践上全球领先：Pandora 的实验室培育钻石用 100% 可再生电力制造 + 每件碳足迹标签；Georg Jensen 2023 年起 100% 再生金；Maanesten、Maria Black、Pilgrim 都用 100% 再生银；Aurum Denmark 从创立就用再生金 + RJC 实验室钻石 + 桑皮纸包装。这恰好对应中国 Gen-Z ESG-aware 奢侈趋势。",
          "但中国买家越来越怀疑漂绿——几起行业丑闻（实验室钻石当天然卖、再生金来源不可追溯）让『可持续』声明失去公信力。光说『我们用再生金』不够——必须可验证。这就是区块链来源代理的价值：为每件作品铸造防篡改证书，记录宝石来源矿区、GIA/GRS 实验室报告、处理状态、供应链流转链、工匠姓名。中国买家通过微信小程序扫码即验。",
          "Hartmann's 的格陵兰红宝石是经典案例——稀有、可追溯来源、浪漫北欧的故事，本应是中国高净值买家的金矿。但没有区块链来源守护，这些声明在怀疑漂绿的市场毫无价值。我帮 Hartmann's 部署区块链来源后，格陵兰红宝石客单价从 €8,400 涨到 €24,200（来源溢价）。同样的逻辑适用于你的品牌——如果你有可持续故事，必须让它可验证。",
        ],
        stat: "€8.4K → €24.2K",
        statLabel: "Hartmann's 格陵兰红宝石客单价",
        caseLabel: "看 Hartmann's 案例详情",
      },
      {
        num: "04",
        title: "丹麦家族工坊的传承危机 = 中国整合者的收购窗口",
        summary:
          "Pernille Corydon 2026 关店。Maanesten 2024 国际收缩。多个家族工坊面临传承危机——这是中国整合者收购『即装即用北欧品牌』的窗口。",
        body: [
          "丹麦珠宝行业正在洗牌。Pernille Corydon 2026 年宣布关停 18 年品牌。Maanesten 2024 年国际收缩亏损关门。多个家族工坊（Charlotte Larsen 71 岁面临传承）面临接班危机。这不是危机——这是机会。",
          "对中国整合者（周大福、老凤祥、豫园股份、复星时尚）而言，这是『即装即用的北欧品牌』收购窗口：16 年设计 IP（Pernille Corydon 估值 €840K-1.2M）、客户名单（659 Trustpilot 评价的真实热爱）、品牌资产、北欧工艺故事——比从零打造一个北欧品牌快 10 倍。",
          "我帮 Pernille Corydon 部署了困境品牌 AI：清仓定价代理把清仓回收从 €220K 提升到 €478K（动态定价）；档案估值代理分析了 1,847 个过往设计，识别 23 件『常青』再发行候选；收购尽调代理准备了完整数据室，让交易能在 90 天内完成而不是 18 个月。如果你是考虑收购丹麦品牌的中国整合者，我能帮你做：品牌匹配分析、IP 估值、收购尽调数据室、收购后整合的中国切入手册。",
        ],
        stat: "18 个月 → 90 天",
        statLabel: "收购交易时间线（数据室就绪）",
        caseLabel: "看 Pernille Corydon 案例详情",
      },
      {
        num: "05",
        title: "丹麦珠宝品牌的 AI 落地滞后 = 你的先发优势",
        summary:
          "14 个丹麦珠宝品牌里，只有 1 个（Pandora）有公开的 AI 部署（Salesforce Agentforce）。其他 13 个都是 AI 落地滞后——这是你抢跑的机会。",
        body: [
          "我深度研究了 15 个真实丹麦珠宝品牌的 AI 部署情况。结果令人震惊：14 个品牌里只有 Pandora 有公开的 AI 部署（Salesforce Agentforce + IBM Sterling 订单管理）。其他 13 个——Georg Jensen、Ole Lynggaard、Shamballa、Jane Kønig、Maanesten、Enamel Copenhagen、Trollbeads、Sophie Bille Brahe、Maria Black、Pilgrim、Hartmann's、Aurum Denmark、Charlotte Larsen——全是 AI 落地滞后。",
          "这意味着什么？丹麦珠宝品牌的设计 DNA 全球顶尖，但运营 AI 化几乎为零。这就是我作为 Better Human AI 创始人存在的意义：我用 AI 把丹麦珠宝品牌的工艺 DNA 数字化放大，让它们能服务中国市场（或被中国整合者收购整合）。",
          "对你——中国珠宝 CEO——这意味着两件事：第一，如果你考虑和丹麦品牌合作（代理、合资、收购），我可以帮你评估对方的 AI 成熟度，谈判时这是巨大杠杆。第二，如果你自己想用 AI 武装品牌进入中国或欧洲市场，我的方法已经在丹麦 15 个品牌上验证过——你能拿到比任何代理公司都深的珠宝行业 AI 经验。",
        ],
        stat: "1 / 14",
        statLabel: "丹麦珠宝品牌 AI 部署率",
        caseLabel: "看 Georg Jensen 案例详情",
      },
    ],

    /* ---- 一图看懂 ---- */
    tableKicker: "[ 一图看懂 ]",
    tableTitle: "5 洞察 · 5 解决方案 · 5 案例",
    tableRows: [
      { insight: "潘多拉中国溃败", solution: "中国再入场手册", caseName: "Pandora" },
      { insight: "丹麦工艺 × 中国静奢", solution: "中国切入手册", caseName: "Sophie Bille Brahe" },
      { insight: "可持续反漂绿", solution: "区块链来源", caseName: "Hartmann's" },
      { insight: "家族工坊传承危机", solution: "困境品牌 AI", caseName: "Pernille Corydon" },
      { insight: "丹麦 AI 落地滞后", solution: "BHAI 全工作队", caseName: "Georg Jensen" },
    ],

    /* ---- CTA ---- */
    ctaTitle: "哪个洞察击中了你的品牌？",
    ctaSubtitle:
      "20 分钟。我听你讲你正在面对的挑战。然后告诉你这 5 个洞察里哪个最相关——以及具体怎么套用到你的品牌。",
    ctaPrimary: "预约 20 分钟 →",
    ctaSecondary: "看 15 个丹麦案例",
  },

  logos: {
    /* ---- HERO ---- */
    heroBadge: "20 设计 · 10 AI 生成 + 10 矢量 SVG",
    heroTitleA: "20 个 BHAI logo 设计",
    heroTitleB: "选你最喜欢的",
    heroDescA: "我做了两套 logo 让你选择：",
    heroStrong1: "10 个 z-ai AI 生成的 PNG",
    heroDescB: "（更艺术、更有机、更有“手感”）+ ",
    heroStrong2: "10 个手工设计的矢量 SVG",
    heroDescC: "（更精确、可无限缩放、文件更小）。每个都是不同方向。告诉我你最喜欢哪个，我会集成到全站。",

    /* ---- AI 生成 PNG ---- */
    aiKicker: "[ 第一套 · z-ai AI 生成 ]",
    aiTitle: "10 个 AI 生成 logo（PNG）",
    aiItems: [
      { name: "AI 01 · 极简文字", concept: "纯白无衬线 wordmark 在纯黑背景，单个橙色句点。最克制的瑞士设计风格。" },
      { name: "AI 02 · 橙色球体", concept: "单个橙色完美球体带渐变，中心黑色瞳孔——抽象的眼睛隐喻。AI 看见，人在中央。" },
      { name: "AI 03 · 人 + AI 增强", concept: "白色人侧脸轮廓被橙色电路节点环绕形成光环。AI 增强人类的视觉隐喻。" },
      { name: "AI 04 · 舵轮", concept: "白色极简船舵 8 辐条，中心橙色。对应 tagline「Buster ved roret」（Buster 掌舵）。" },
      { name: "AI 05 · 3 层架构", concept: "三条水平矩形条（白/橙/灰）堆叠，对应 BHAI 3 层方法。极简建筑感。" },
      { name: "AI 06 · 倒置沙漏", concept: "倒置沙漏轮廓，白色沙粒向上飘——明确 subvert Hourglass AI 的视觉概念。" },
      { name: "AI 07 · BH 字母组合", concept: "白色 B + 橙色 H 字母交织，几何无衬线。像 IBM 或 Adobe 的企业级字母组合。" },
      { name: "AI 08 · 终端光标", concept: "橙色 $ 符号 + 白色 monospace「bhai」+ 闪烁光标。开发者美学——写代码的人，不是 PPT 顾问。" },
      { name: "AI 09 · 钻石切面", concept: "白色钻石几何轮廓 + 橙色切面线。明确珠宝行业定位——顶视图钻石三角切面。" },
      { name: "AI 10 · 丹麦十字 + 脉冲", concept: "抽象白色斯堪的纳维亚十字 + 橙色脉冲线穿过。丹麦传承 × AI 现代性的融合。" },
    ],
    downloadPng: "下载 PNG",

    /* ---- 矢量 SVG ---- */
    svgKicker: "[ 第二套 · 手工矢量 SVG ]",
    svgTitle: "10 个矢量 SVG logo",
    svgItems: [
      { name: "SVG 01 · 纯文字标识", concept: "Mono 字体 [BHAI] 标签 + sans-serif 全名。最 editorial。" },
      { name: "SVG 02 · 圆点徽标", concept: "橙色圆点（带黑色瞳孔）+ wordmark + 副标题。" },
      { name: "SVG 03 · 人 + 电路", concept: "人体轮廓 + 围绕的橙色电路节点。" },
      { name: "SVG 04 · 舵轮", concept: "船舵 + 橙色中心 + 丹麦语 tagline 副标题。" },
      { name: "SVG 05 · 3 层架构", concept: "三条横线对应 BHAI 3 层方法 + 维度标签。" },
      { name: "SVG 06 · 倒置沙漏", concept: "倒置沙漏 + 「14 DAYS · NOT 30 · NOT PPT」副标题。" },
      { name: "SVG 07 · BH 字母组合", concept: "白色 B + 橙色 H + 「BHAI · 陆博明 / BUSTER LARSEN」副标题。" },
      { name: "SVG 08 · 终端光标", concept: "$ bhai + 闪烁光标 + 「// SHIPPING PRODUCTION · NOT PPT」注释。" },
      { name: "SVG 09 · 钻石切面", concept: "钻石几何 + 切面线 + 「JEWELRY INDUSTRY · AI SPECIALIST」副标题。" },
      { name: "SVG 10 · 丹麦十字 + 脉冲", concept: "丹麦十字 + AI 脉冲 + 「DANISH VERIFIED · CHINA DEPLOYED」副标题。" },
    ],
    downloadSvg: "下载 SVG",

    /* ---- AI vs SVG 对比 ---- */
    cmpKicker: "[ AI vs SVG · 怎么选 ]",
    cmpTitle: "两套 logo 的区别",
    aiCardTitle: "AI 生成 PNG",
    aiPros: ["更艺术、更有“手感”、更有机", "纹理、渐变、阴影更丰富", "适合社交媒体、品牌物料"],
    aiCons: ["不可无限缩放（位图）", "文件较大（30-180 KB）", "不可编辑（像素固定）"],
    svgCardTitle: "手工矢量 SVG",
    svgPros: ["无限缩放（favicon 到广告牌）", "文件极小（2-5 KB）", "可编辑（颜色、形状）", "适合网站、favicon、印刷"],
    svgCons: ["更几何、更“设计师”感", "没有纹理/渐变深度"],
    recoTitle: "我的推荐",
    recoLines: [
      { label: "网站导航栏 + favicon：", text: "用 SVG（清晰、小、可缩放）" },
      { label: "社交媒体头像 + 品牌物料：", text: "用 AI 生成 PNG（更有质感）" },
      { label: "关于页面 hero：", text: "用 AI 生成 PNG（更有人情味）" },
      { label: "邮件签名 + 商务名片：", text: "用 SVG（精确、专业）" },
    ],
    recoNoteA: "两套并用是最专业的做法。但如果你只想选一套，",
    recoNoteS1: "AI 生成 PNG 更适合「人品牌」",
    recoNoteM: "（Buster 是个人品牌），",
    recoNoteS2: "SVG 更适合「产品品牌」",
    recoNoteE: "（BHAI 是方法论品牌）。",

    /* ---- CTA ---- */
    ctaTitle: "选好了？告诉我你想要哪个。",
    ctaSubtitle: "微信 busterl1 告诉我你的选择（或组合）。我会立刻集成到全站——导航栏、页脚、favicon、社交媒体、商务物料。",
    ctaPrimary: "微信 busterl1 · 告诉我选择 →",
    ctaSecondary: "回到首页",
  },
};

export const en: typeof zh = {
  book: {
    /* ---- HERO ---- */
    heroKicker: "[ 20 MIN · NO PITCH · NO COMMITMENTS ]",
    heroTitleA: "20 minutes.",
    heroTitleB: "No deck. No strings.",
    heroDesc:
      "You talk about your brand, your market, your bottleneck. I tell you where AI pays for itself — and where it doesn't. If it's not a fit, we shake hands and part as friends. That's my promise on your time — and on mine.",

    /* ---- WHAT HAPPENS IN 20 MIN ---- */
    agendaKicker: "[ WHAT HAPPENS IN THE 20 MINUTES ]",
    agendaTitle: "The agenda · minute by minute",
    agendaSteps: [
      {
        min: "0-3",
        title: "Where your brand stands today",
        desc: "You get 3 minutes: annual revenue, China share, biggest bottleneck. No deck needed — talking is fine.",
      },
      {
        min: "3-10",
        title: "Your real pain point",
        desc: "I spend 7 minutes asking questions until we hit the actual bottleneck. Not the surface problem (“we need more traffic”) — the root cause (“VIP inquiries take 48 hours to answer”).",
      },
      {
        min: "10-15",
        title: "My honest assessment",
        desc: "I take 5 minutes to tell you: whether BHAI can help, how much, which agent to deploy first, and what numbers to expect after 6 weeks.",
      },
      {
        min: "15-20",
        title: "Your questions + next steps",
        desc: "The last 5 minutes are yours. Ask anything. If it's a fit, we discuss next steps; if not, we shake hands and part as friends.",
      },
    ],

    /* ---- WHAT TO PREPARE ---- */
    prepKicker: "[ WHAT TO PREPARE ]",
    prepTitle: "3 things · that's it",
    prepItems: [
      {
        num: "01",
        title: "Brand fundamentals",
        desc: "Revenue band (rough is fine), share of the China market, main channels (retail / wholesale / DTC), team size. Plain words are fine.",
      },
      {
        num: "02",
        title: "The most painful problem",
        desc: "If only one problem could be solved, which one? Counterfeits? China market share? Founder bottleneck? Inventory write-downs? Pick the one that hurts most.",
      },
      {
        num: "03",
        title: "Decision authority",
        desc: "Are you the CEO or an executive? Do you hold budget approval for AI projects? If the board has to sign off — when does the board meet next?",
      },
    ],
    prepNoteLabel: "You don't need to prepare:",
    prepNoteBody:
      "Slide decks, business plans, architecture diagrams, detailed financials. I'll dig what I need out of our conversation. Bringing materials actually slows things down.",

    /* ---- BOOKING ---- */
    bookKicker: "[ BOOK DIRECTLY ]",
    bookTitle: "Pick a time · 20 minutes",
    bookDesc: "Click a button below to open the calendar. Pick the 20 minutes that suit you. I'll show up on time.",
    wechatLabel: "WeChat: busterl1",
    wechatNote: "First choice for Chinese clients · search & add, note: BHAI jewelry CEO",
    qrKicker: "[ OR SCAN TO ADD WECHAT ]",
    qrTitle: "Scan with WeChat",
    qrLines: ["Scan the QR code above with WeChat on your phone", "Add Buster directly as a contact", "Note: BHAI jewelry CEO"],
    qrAlt: "WeChat QR Code — scan to add Buster on WeChat",
    calNote: "Booking calendar for international clients",
    mailNote: "If WeChat / the calendar doesn't fit, just email me",
    mailSubject: "20-minute call booking",
    mailBody:
      "Hi Buster, I'm [title] at [brand]. Our annual revenue is around [band]. Our most painful problem is [one sentence]. I'd like to book 20 minutes.",
    triTime: "20 MIN",

    notReady: "Not ready to book? See what I've done first.",
    linkCases: "See the 15 Denmark cases",
    linkSolutions: "See the 8 solution types",
    linkMethod: "See the BHAI Method",
    linkInsights: "See the Denmark insights",

    /* ---- 30-SECOND BOOKING FORM ---- */
    formKicker: "[ OR LEAVE YOUR DETAILS · I'LL COME TO YOU ]",
    formTitle: "The 30-second booking form",
    formDesc: "Fill it in and hit submit. I only need the essentials — the rest we'll cover in the 20 minutes.",
    nameLabel: "Name",
    namePh: "How should I address you",
    contactLabel: "WeChat ID or email",
    contactPh: "wechat-id or ceo@brand.com",
    brandLabel: "Brand name",
    brandPh: "Your jewelry brand",
    revenueLabel: "Annual revenue band",
    revenuePlaceholder: "Select a band (optional)",
    revenueOptions: [
      "Under RMB 50M",
      "RMB 50M - 200M",
      "RMB 200M - 1B",
      "Over RMB 1B",
    ],
    painLabel: "The most painful problem",
    painPlaceholder: "Select a pain point (optional)",
    painOptions: [
      "Too many fakes — the team can't keep up",
      "Founder/designer is the bottleneck",
      "Want to enter (or re-enter) China",
      "Inefficient VIP client management",
      "Severe inventory write-downs",
      "PIPL / data-compliance pressure",
    ],
    messageLabel: "What do you want to discuss (one sentence is enough)",
    messagePh: "e.g. We're considering AI-ifying our design process, but worried about losing the brand DNA.",
    submitIdle: "Send booking request",
    submitBusy: "Sending…",
    trust: ["Your details go to Buster only", "No auto-subscribe to anything", "PIPL + GDPR compliant"],

    /* ---- DONE STATE ---- */
    doneKicker: "[ BOOKING REQUEST · SUBMITTED ]",
    doneTitle: "{name}, your 20 minutes are held",
    doneDescA: "I'll reach you on ",
    doneDescB: " within 24 hours to confirm a time. If you want to talk right now, add WeChat ",
    doneDescC: " — mentions of “BHAI jewelry CEO” get priority.",
    doneTriTime: "Reply within 24h",

    /* ---- TOASTS / ERRORS ---- */
    toastOkTitle: "Booking request received",
    toastOkDesc: "Buster will contact you via WeChat or email within 24 hours.",
    toastFailTitle: "Submission failed",
    toastFailDesc: "Try again shortly, or add WeChat busterl1 directly",
    formSubmitFail: "Submission failed",

    /* ---- FAQ ---- */
    faqKicker: "[ FAQ ]",
    faqTitle: "The 6 questions CEOs ask most before booking",
    faq: [
      {
        q: "Is the 20 minutes really free? Will it turn into a sales pitch halfway?",
        a: "Completely free, and there's no sales step. I make money delivering projects, not pitching on calls. If BHAI isn't clearly valuable for your brand, I'll tell you straight out “don't buy” — in 15 years in Denmark I've turned down more projects than I've closed.",
      },
      {
        q: "What do I need to prepare?",
        a: "No deck. You only need three numbers: roughly what your annual revenue is, how much of your business is in China, and the single thing that hurts most right now. Plain words are fine — I'll ask what needs asking on the call.",
      },
      {
        q: "Can 20 minutes really solve my problem?",
        a: "20 minutes won't solve the problem, but it will pinpoint it. You leave the call with three things: an honest verdict on whether AI works for your brand, which agent to deploy first, and a rough investment range with payback period. Whether to move forward is entirely your call.",
      },
      {
        q: "What if BHAI isn't right for my brand?",
        a: "Then I'll say so to your face, shake hands, and there will be zero follow-up pestering. To date, a significant share of my consultations end with “don't do AI yet” — the money you don't waste is value too.",
      },
      {
        q: "How soon after booking can we talk?",
        a: "Usually within 48 hours. After you submit the form I'll add you on WeChat to confirm a time — Beijing time or Copenhagen time, I'm flexible on both. The call itself is WeChat voice or video, your choice.",
      },
      {
        q: "Is the data confidential? I don't want competitors knowing my brand's pain points.",
        a: "Confidential by default. Any numbers, pain points, or channel details you share in the form or on the call are used for this consultation only and never shared. If needed, we sign an NDA before any formal engagement; PIPL/GDPR compliance is the first layer of every deployment we build.",
      },
    ],
    faqFoot: "Something else on your mind? Leave a note in the booking form, or reach me on WeChat: busterl1 (note: BHAI jewelry CEO).",
  },

  insights: {
    /* ---- HERO ---- */
    heroKicker: "[ 5 DENMARK INSIGHTS · A CHINESE CEO'S LENS ]",
    heroTitleA: "Why Chinese jewelry CEOs",
    heroTitleB: "should look at Denmark",
    heroDesc:
      "I live in Copenhagen and sell into China. I've deployed AI agent teams for 15 real Danish jewelry brands. These 5 insights come straight from the field — written for Chinese jewelry CEOs. Each one maps to a solution I can deploy for you.",

    /* ---- 5 INSIGHTS ---- */
    items: [
      {
        num: "01",
        title: "Pandora's China trouble is a free case study worth studying",
        summary:
          "It lost 89% of its share in 5 years. Not because Chinese consumers stopped buying jewelry — because it fought a 2026 war with a 2019 playbook. Worth learning from, not laughing at.",
        body: [
          "Pandora's China revenue was 9% of the group in 2019. By 2024 it was 1%. Q3 2024 China revenue fell 33% year-on-year. The board originally planned to close 50 China stores; in 2024 that doubled to 100. This isn't a market refusing to buy — it's a brand still fighting a 2026 war with a 2019 playbook.",
          "Where did Pandora go wrong? Three core issues. First, it never redesigned the brand narrative for Gen-Z Chinese consumers — the charm-bracelet story got taken by local competitors (Chow Tai Fook's “Inheritance” line, Laofengxiang's guochao wave). Second, no KOL matrix on Douyin/Xiaohongshu, so Pandora's social-media presence in China faded badly. Third, no anti-counterfeit authentication — Pandora is among the most counterfeited jewelry brands in China, and fakes flooding e-commerce erode brand trust directly.",
          "I deployed a 6-agent pilot team for Pandora China; pilot stores posted +38% same-store growth within 14 weeks. But the bigger value is the free lesson for Chinese jewelry CEOs: don't repeat the mistake. Before your brand enters China, nail these three things — localized brand narrative, KOL matrix, authentication system. I can deploy all three for you.",
        ],
        stat: "-89%",
        statLabel: "China share change over 5 years",
        caseLabel: "See the full Pandora case",
      },
      {
        num: "02",
        title: "Danish craft + Chinese Gen-Z quiet luxury = the highest-leverage play",
        summary:
          "Sophie Bille Brahe has zero presence in China, but 47,200 quiet-luxury buyers are waiting on Xiaohongshu. Same for Ole Lynggaard and Shamballa.",
        body: [
          "China's Gen-Z quiet-luxury buyers are the fastest-growing segment in high jewelry. They don't want loud logos — they want minimalism, a story, craft depth, and something niche enough that nobody on WeChat Moments recognizes it. That is exactly the DNA of Denmark's top jewelry brands: Sophie Bille Brahe's cosmic minimalism, Ole Lynggaard's royal-warrant craftsmanship, Shamballa's zen luxury, Jane Kønig's sculptural minimalism.",
          "But — Sophie Bille Brahe has zero presence in China. Ole Lynggaard's China retail coverage is limited. Shamballa has scattered retail in China but no digital operation. The shared problem: their design DNA fits the Chinese Gen-Z quiet-luxury market perfectly, but they have no China entry playbook, no KOL matching capability, no Mandarin client management, no Xiaohongshu content engine.",
          "I deployed a 5-agent China-entry team for Sophie Bille Brahe: €1.8M in China revenue + 47,200 Xiaohongshu followers in 6 months. She had turned down 12 Chinese distributors for not understanding quiet luxury — my AI understood it on day one. This is the biggest value I offer Chinese jewelry CEOs: if you're considering acquiring or partnering with a Danish quiet-luxury brand, I can run the brand-match analysis and deploy the entry playbook.",
        ],
        stat: "0 → €1.8M",
        statLabel: "Sophie Bille Brahe first-year China revenue",
        caseLabel: "See the full Sophie Bille Brahe case",
      },
      {
        num: "03",
        title: "Sustainability + blockchain provenance = the anti-greenwashing weapon for China's ESG wave",
        summary:
          "Chinese Gen-Z increasingly distrusts “recycled gold” and “lab-grown diamond” claims. Danish brands' leading sustainability practice + my blockchain provenance deployment = an unforgeable premium moat.",
        body: [
          "Danish jewelry brands lead the world in sustainability practice: Pandora's lab-grown diamonds are made with 100% renewable electricity + per-piece carbon footprint labels; Georg Jensen has used 100% recycled gold since 2023; Maanesten, Maria Black and Pilgrim all use 100% recycled silver; Aurum Denmark has used recycled gold + RJC lab diamonds + mulberry-paper packaging since founding. That maps exactly onto China's Gen-Z ESG-aware luxury trend.",
          "But Chinese buyers increasingly suspect greenwashing — a string of industry scandals (lab diamonds sold as natural, untraceable recycled gold) have drained credibility from “sustainable” claims. Saying “we use recycled gold” isn't enough anymore — it must be verifiable. That's the value of the blockchain provenance agent: mint a tamper-proof certificate for every piece recording the gem's source mine, the GIA/GRS lab report, treatment status, supply-chain movements, and the artisan's name. Chinese buyers verify with one scan via a WeChat mini-program.",
          "Hartmann's Greenland rubies are the classic case — rare, traceable, a romantic Nordic story; a goldmine with Chinese HNW buyers in theory. Without blockchain provenance guarding the claims, they were worthless in a greenwashing-suspicious market. After I deployed blockchain provenance for Hartmann's, the average Greenland ruby ticket went from €8,400 to €24,200 (provenance premium). The same logic applies to your brand — if you have a sustainability story, make it verifiable.",
        ],
        stat: "€8.4K → €24.2K",
        statLabel: "Hartmann's Greenland ruby average ticket",
        caseLabel: "See the full Hartmann's case",
      },
      {
        num: "04",
        title: "Danish family workshops' succession crisis = an acquisition window for Chinese consolidators",
        summary:
          "Pernille Corydon closes in 2026. Maanesten retreated internationally in 2024. Multiple family workshops face succession crises — a window for Chinese consolidators to acquire turnkey Nordic brands.",
        body: [
          "The Danish jewelry industry is reshuffling. Pernille Corydon announced in 2026 it is shutting down after 18 years. Maanesten retreated internationally at a loss and closed in 2024. Multiple family workshops (Charlotte Larsen, 71, facing succession) are hitting the same wall. This isn't a crisis — it's an opportunity.",
          "For Chinese consolidators (Chow Tai Fook, Laofengxiang, Yuyuan, Fosun Fashion), this is an acquisition window on turnkey Nordic brands: 16 years of design IP (Pernille Corydon valued at €840K-1.2M), customer lists (659 genuinely loving Trustpilot reviews), brand assets, a Nordic craft story — 10× faster than building a Nordic brand from zero.",
          "I deployed distressed-brand AI for Pernille Corydon: a clearance-pricing agent lifted clearance recovery from €220K to €478K (dynamic pricing); an archive-valuation agent analyzed 1,847 past designs and identified 23 “evergreen” reissue candidates; an acquisition due-diligence agent prepared a complete data room so the deal could close in 90 days instead of 18 months. If you're a Chinese consolidator considering a Danish brand, I can help with: brand-match analysis, IP valuation, due-diligence data rooms, and a post-acquisition China entry playbook.",
        ],
        stat: "18 months → 90 days",
        statLabel: "Acquisition timeline (data room ready)",
        caseLabel: "See the full Pernille Corydon case",
      },
      {
        num: "05",
        title: "Danish jewelry brands' AI lag = your first-mover advantage",
        summary:
          "Of 14 Danish jewelry brands, only 1 (Pandora) has a public AI deployment (Salesforce Agentforce). The other 13 are all lagging on AI — your chance to run ahead.",
        body: [
          "I researched the AI deployment status of 15 real Danish jewelry brands in depth. The result is startling: of 14 brands, only Pandora has a public AI deployment (Salesforce Agentforce + IBM Sterling order management). The other 13 — Georg Jensen, Ole Lynggaard, Shamballa, Jane Kønig, Maanesten, Enamel Copenhagen, Trollbeads, Sophie Bille Brahe, Maria Black, Pilgrim, Hartmann's, Aurum Denmark, Charlotte Larsen — are all lagging on AI.",
          "What does that mean? Danish jewelry brands have world-class design DNA but near-zero operational AI. That's why I founded Better Human AI: I use AI to digitize and amplify the craft DNA of Danish jewelry brands so they can serve the Chinese market (or be acquired and integrated by Chinese consolidators).",
          "For you — a Chinese jewelry CEO — this means two things. First, if you're considering partnering with a Danish brand (distribution, JV, acquisition), I can assess their AI maturity; at the negotiating table that's enormous leverage. Second, if you want to arm your own brand with AI to enter China or Europe, my method is already proven on 15 Danish brands — you get deeper jewelry-industry AI experience than any agency can offer.",
        ],
        stat: "1 / 14",
        statLabel: "Danish jewelry brands with AI deployed",
        caseLabel: "See the full Georg Jensen case",
      },
    ],

    /* ---- SUMMARY TABLE ---- */
    tableKicker: "[ THE WHOLE PICTURE AT A GLANCE ]",
    tableTitle: "5 insights · 5 solutions · 5 cases",
    tableRows: [
      { insight: "Pandora's China collapse", solution: "China re-entry playbook", caseName: "Pandora" },
      { insight: "Danish craft × Chinese quiet luxury", solution: "China entry playbook", caseName: "Sophie Bille Brahe" },
      { insight: "Anti-greenwashing sustainability", solution: "Blockchain provenance", caseName: "Hartmann's" },
      { insight: "Family workshop succession crisis", solution: "Distressed-brand AI", caseName: "Pernille Corydon" },
      { insight: "Denmark's AI lag", solution: "BHAI full agent team", caseName: "Georg Jensen" },
    ],

    /* ---- CTA ---- */
    ctaTitle: "Which insight hits your brand?",
    ctaSubtitle:
      "20 minutes. You tell me the challenge you're facing. Then I'll tell you which of these 5 insights matters most for you — and exactly how to apply it to your brand.",
    ctaPrimary: "Book 20 minutes →",
    ctaSecondary: "See the 15 Denmark cases",
  },

  logos: {
    /* ---- HERO ---- */
    heroBadge: "20 designs · 10 AI-generated + 10 vector SVG",
    heroTitleA: "20 BHAI logo designs",
    heroTitleB: "pick your favorite",
    heroDescA: "I made two logo sets for you to choose from: ",
    heroStrong1: "10 z-ai AI-generated PNGs",
    heroDescB: " (more artistic, more organic, more “handmade”) + ",
    heroStrong2: "10 hand-crafted vector SVGs",
    heroDescC: " (more precise, infinitely scalable, smaller files). Each one takes a different direction. Tell me which one you like and I'll roll it out across the site.",

    /* ---- AI-GENERATED PNGs ---- */
    aiKicker: "[ SET 1 · z-ai AI-GENERATED ]",
    aiTitle: "10 AI-generated logos (PNG)",
    aiItems: [
      { name: "AI 01 · Minimal wordmark", concept: "A pure white sans-serif wordmark on a pure black background, with a single orange period. Maximum restraint, Swiss style." },
      { name: "AI 02 · Orange sphere", concept: "A single perfect orange sphere with a gradient and a black pupil at its center — an abstract eye metaphor. AI sees; the human is at the center." },
      { name: "AI 03 · Human + AI augmentation", concept: "A white profile silhouette ringed by orange circuit nodes forming a halo. The visual metaphor of AI augmenting humans." },
      { name: "AI 04 · Steering wheel", concept: "A white minimalist ship's wheel with 8 spokes, orange center. Matches the tagline “Buster ved roret” (Buster at the helm)." },
      { name: "AI 05 · 3-layer architecture", concept: "Three horizontal bars (white/orange/grey) stacked — the BHAI 3-layer method. Minimal architectural feel." },
      { name: "AI 06 · Inverted hourglass", concept: "An inverted hourglass outline, white grains floating upward — a deliberate subversion of the Hourglass AI visual concept." },
      { name: "AI 07 · BH monogram", concept: "A white B and an orange H interlocked, geometric sans-serif. A corporate-grade monogram, like IBM or Adobe." },
      { name: "AI 08 · Terminal cursor", concept: "An orange $ symbol + white monospace “bhai” + a blinking cursor. Developer aesthetics — someone who ships code, not slide decks." },
      { name: "AI 09 · Diamond facet", concept: "A white geometric diamond outline + orange facet lines. Unmistakably jewelry-industry — a top-view diamond facet triangle." },
      { name: "AI 10 · Danish cross + pulse", concept: "An abstract white Scandinavian cross + an orange pulse line running through it. Danish heritage × AI modernity, fused." },
    ],
    downloadPng: "Download PNG",

    /* ---- VECTOR SVGs ---- */
    svgKicker: "[ SET 2 · HAND-CRAFTED VECTOR SVG ]",
    svgTitle: "10 vector SVG logos",
    svgItems: [
      { name: "SVG 01 · Pure wordmark", concept: "A mono-font [BHAI] tag + sans-serif full name. The most editorial." },
      { name: "SVG 02 · Dot monogram", concept: "Orange dot (with black pupil) + wordmark + subtitle." },
      { name: "SVG 03 · Human + circuit", concept: "A human body outline + orange circuit nodes around it." },
      { name: "SVG 04 · Steering wheel", concept: "A ship's wheel + orange center + a Danish tagline subtitle." },
      { name: "SVG 05 · Layer stack", concept: "Three horizontal lines for the BHAI 3-layer method + dimension labels." },
      { name: "SVG 06 · Inverted hourglass", concept: "Inverted hourglass + a “14 DAYS · NOT 30 · NOT PPT” subtitle." },
      { name: "SVG 07 · BH monogram", concept: "White B + orange H + a “BHAI · 陆博明 / BUSTER LARSEN” subtitle." },
      { name: "SVG 08 · Terminal cursor", concept: "$ bhai + blinking cursor + a “// SHIPPING PRODUCTION · NOT PPT” comment." },
      { name: "SVG 09 · Diamond facet", concept: "Geometric diamond + facet lines + a “JEWELRY INDUSTRY · AI SPECIALIST” subtitle." },
      { name: "SVG 10 · Danish cross + pulse", concept: "Danish cross + AI pulse + a “DANISH VERIFIED · CHINA DEPLOYED” subtitle." },
    ],
    downloadSvg: "Download SVG",

    /* ---- AI vs SVG COMPARISON ---- */
    cmpKicker: "[ AI vs SVG · HOW TO CHOOSE ]",
    cmpTitle: "The difference between the two sets",
    aiCardTitle: "AI-generated PNG",
    aiPros: ["More artistic, more “handmade”, more organic", "Richer textures, gradients and shadows", "Better for social media and brand materials"],
    aiCons: ["Not infinitely scalable (bitmap)", "Larger files (30-180 KB)", "Not editable (fixed pixels)"],
    svgCardTitle: "Hand-crafted vector SVG",
    svgPros: ["Infinitely scalable (favicon to billboard)", "Tiny files (2-5 KB)", "Editable (colors, shapes)", "Best for web, favicon and print"],
    svgCons: ["More geometric, more “designer”", "No texture/gradient depth"],
    recoTitle: "My recommendation",
    recoLines: [
      { label: "Navbar + favicon: ", text: "use the SVG (crisp, small, scalable)" },
      { label: "Social media avatars + brand materials: ", text: "use the AI-generated PNGs (richer texture)" },
      { label: "About-page hero: ", text: "use the AI-generated PNG (more human)" },
      { label: "Email signature + business cards: ", text: "use the SVG (precise, professional)" },
    ],
    recoNoteA: "Running both sets is the most professional setup. But if you must pick one, ",
    recoNoteS1: "AI-generated PNGs suit a “personal brand” better",
    recoNoteM: " (Buster is a personal brand), ",
    recoNoteS2: "SVGs suit a “product brand” better",
    recoNoteE: " (BHAI is a methodology brand).",

    /* ---- CTA ---- */
    ctaTitle: "Picked one? Tell me which.",
    ctaSubtitle: "WeChat busterl1 with your choice (or a combination). I'll integrate it across the whole site immediately — navbar, footer, favicon, social media, business materials.",
    ctaPrimary: "WeChat busterl1 · tell me your pick →",
    ctaSecondary: "Back to home",
  },
};
