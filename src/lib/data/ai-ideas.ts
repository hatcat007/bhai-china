import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Layers,
  Camera,
  CalendarDays,
  Users,
  MessageSquareReply,
  Gem,
  FileText,
  Send,
  Radio,
  Wand2,
  ScanFace,
  ShieldCheck,
  Languages,
  Crown,
  Boxes,
  ArrowLeftRight,
  ListChecks,
  ShieldAlert,
  GraduationCap,
  Radar,
  PenTool,
  Tag,
  BarChart3,
  Globe2,
} from "lucide-react";

/**
 * /ai-ideas 页内容数据：珠宝公司 AI 落地 25 计（双语 zh/en）
 * - 内容在数据层双语，页面组件按 locale 取值 → 实时切换无需刷新
 * - toolHref 指向本站已上线的免费工具页，卡片出现 TRY FREE 徽章
 */

export type IdeaCategoryId =
  | "marketing"
  | "sales"
  | "cx"
  | "ops"
  | "design"
  | "data";

export type AiIdea = {
  id: number;
  category: IdeaCategoryId;
  icon: LucideIcon;
  /** 本站免费工具落地页（存在时显示 TRY FREE 徽章） */
  toolHref?: string;
  zh: { title: string; desc: string };
  en: { title: string; desc: string };
};

export const IDEA_CATEGORIES: {
  id: IdeaCategoryId | "all";
  zh: string;
  en: string;
}[] = [
  { id: "all", zh: "全部", en: "All" },
  { id: "marketing", zh: "营销与内容", en: "Marketing & Content" },
  { id: "sales", zh: "销售与转化", en: "Sales & Conversion" },
  { id: "cx", zh: "客户体验", en: "Customer Experience" },
  { id: "ops", zh: "运营与供应链", en: "Operations" },
  { id: "design", zh: "设计与产品", en: "Design & Product" },
  { id: "data", zh: "数据与决策", en: "Data & Decisions" },
];

export const AI_IDEAS: AiIdea[] = [
  // ─── 营销与内容 Marketing & Content ───
  {
    id: 1,
    category: "marketing",
    icon: Sparkles,
    toolHref: "/tools/red-copywriter",
    zh: {
      title: "小红书种草文案工厂",
      desc: "把一款产品投喂给 AI，按你的品牌调性一次产出 20 条不同角度的种草笔记与话题标签——团队只做筛选，不再从零写。",
    },
    en: {
      title: "Xiaohongshu content factory",
      desc: "Feed one product to AI and get 20 on-brand post drafts with hashtags in different angles — your team curates instead of writing from zero.",
    },
  },
  {
    id: 2,
    category: "marketing",
    icon: Layers,
    zh: {
      title: "一鱼五吃：内容矩阵改编",
      desc: "同一场新品故事，AI 自动改写成小红书笔记、公众号长文、抖音口播脚本、朋友圈短文案和 EDM——每个平台一个腔调。",
    },
    en: {
      title: "One story, five platforms",
      desc: "The same launch story, automatically rewritten as a Xiaohongshu note, WeChat article, Douyin script, Moments copy and email — each in its native tone.",
    },
  },
  {
    id: 3,
    category: "marketing",
    icon: Camera,
    zh: {
      title: "AI 产品场景图",
      desc: "白底商品图一键生成佩戴场景、节日主题、送礼场景图——不用再为一张图重新拍摄打光。",
    },
    en: {
      title: "AI lifestyle photography",
      desc: "Turn packshots into lifestyle, festive and gifting scenes without reshoots, models or studio time.",
    },
  },
  {
    id: 4,
    category: "marketing",
    icon: CalendarDays,
    zh: {
      title: "全年节日营销日历",
      desc: "AI 结合七夕、520、春节、婚季和北欧圣诞传统，排出全年内容与促销节奏，附每个档期的文案初稿。",
    },
    en: {
      title: "AI holiday marketing calendar",
      desc: "AI blends Qixi, 520, CNY, wedding season and Nordic Christmas into a full-year content and promo calendar — first drafts included.",
    },
  },
  {
    id: 5,
    category: "marketing",
    icon: Users,
    zh: {
      title: "KOC / KOL 合作初筛",
      desc: "AI 分析候选博主的粉丝画像、互动质量与历史带货表现，输出匹配度评分——砍掉 80% 的无效寄样。",
    },
    en: {
      title: "Influencer & KOC vetting",
      desc: "AI scores candidate creators on audience fit, engagement quality and past conversion — cut gifting waste by 80%.",
    },
  },
  // ─── 销售与转化 Sales & Conversion ───
  {
    id: 6,
    category: "sales",
    icon: MessageSquareReply,
    toolHref: "/tools/objection-handler",
    zh: {
      title: "异议处理教练",
      desc: "新销售每天跟 AI 对练『太贵了』『网上买更便宜』，AI 扮演刁钻客户并逐句复盘——新人上手速度翻倍。",
    },
    en: {
      title: "Objection-handling coach",
      desc: "Train new sales staff daily against AI playing a picky customer (\"too expensive\", \"cheaper online\"), with line-by-line debriefs. Ramp-up time halved.",
    },
  },
  {
    id: 7,
    category: "sales",
    icon: Gem,
    zh: {
      title: "AI 宝石顾问 24/7 在线",
      desc: "随时回答 4C、克拉、金重、保养问题，按你的定价与库存口径作答——售前咨询不再等老板有空。",
    },
    en: {
      title: "AI gemologist on call",
      desc: "A 24/7 assistant answering 4C, carat, gold-weight and care questions in your price logic and stock — pre-sales no longer waits for the owner.",
    },
  },
  {
    id: 8,
    category: "sales",
    icon: FileText,
    zh: {
      title: "智能报价与方案对比",
      desc: "客户说预算三万，AI 即刻生成三套搭配方案（钻石 vs 黄金 vs 彩宝）加对比表——客单价与转化同步提升。",
    },
    en: {
      title: "Smart quotes & comparisons",
      desc: "Customer says ¥30K — AI instantly drafts three looks (diamond vs gold vs gemstone) with a comparison table. Basket size and conversion both rise.",
    },
  },
  {
    id: 9,
    category: "sales",
    icon: Send,
    zh: {
      title: "沉睡客户唤醒",
      desc: "AI 扫描购买记录，按纪念日、生日、婚庆周年起草个性化唤醒信息——老客复购的成本远低于拉新。",
    },
    en: {
      title: "Win-back campaigns",
      desc: "AI mines purchase history for anniversaries and birthdays, then drafts personalised win-back messages — reactivation beats acquisition on cost.",
    },
  },
  {
    id: 10,
    category: "sales",
    icon: Radio,
    zh: {
      title: "直播带货副驾驶",
      desc: "直播间实时提示话术要点、自动汇总评论区高频问题，下播 5 分钟出复盘报告——下一场马上修正。",
    },
    en: {
      title: "Livestream selling copilot",
      desc: "Real-time talking-point prompts, live clustering of audience questions, and a full debrief five minutes after you go offline.",
    },
  },
  // ─── 客户体验 Customer Experience ───
  {
    id: 11,
    category: "cx",
    icon: Wand2,
    zh: {
      title: "定制婚戒设计顾问",
      desc: "客户用一段话描述梦想婚戒，AI 给出概念方向、材质建议与价格区间——第二天带着草案进店，体验感拉满。",
    },
    en: {
      title: "Bespoke bridal design consultant",
      desc: "The customer describes their dream ring in one paragraph; AI returns concept directions, materials and a price band. They walk in with a brief.",
    },
  },
  {
    id: 12,
    category: "cx",
    icon: ScanFace,
    zh: {
      title: "脸型 × 肤色搭配推荐",
      desc: "上传一张自拍，AI 按脸型、肤色与日常着装推荐链长、耳饰大小与叠戴组合——卖套装，而不是单品。",
    },
    en: {
      title: "AI styling recommendations",
      desc: "One selfie in — AI matches face shape, skin tone and wardrobe to chain length, earring size and stacking sets. Sell the set, not the piece.",
    },
  },
  {
    id: 13,
    category: "cx",
    icon: ShieldCheck,
    zh: {
      title: "售后保养管家",
      desc: "每件珠宝附二维码，扫码进入 AI 保养指南、清洗提醒与翻新预约——把一次性买家变成长期关系。",
    },
    en: {
      title: "Aftercare concierge",
      desc: "A QR on every piece opens an AI care guide, cleaning reminders and refurbishment booking — turning one-time buyers into relationships.",
    },
  },
  {
    id: 14,
    category: "cx",
    icon: Languages,
    zh: {
      title: "外国游客接待翻译官",
      desc: "面对丹麦与欧洲游客，AI 实时翻译并用文化适配的方式讲你的工艺故事——客单价平均提升 30%。",
    },
    en: {
      title: "Multilingual tourist concierge",
      desc: "For tourists in your store, AI translates live and tells your craft story with cultural context — average basket up 30%.",
    },
  },
  {
    id: 15,
    category: "cx",
    icon: Crown,
    zh: {
      title: "VIP 分层关怀",
      desc: "AI 按消费频次、客单价与品类偏好自动分层会员，为每层生成专属权益文案与邀请话术。",
    },
    en: {
      title: "AI VIP tiering",
      desc: "AI segments members by frequency, basket and category taste, then writes perks and invitations per tier.",
    },
  },
  // ─── 运营与供应链 Operations ───
  {
    id: 16,
    category: "ops",
    icon: Boxes,
    zh: {
      title: "畅滞销预测",
      desc: "AI 结合季节、婚季与金价走势预测款式需求——压货减少，爆款不断码。",
    },
    en: {
      title: "Inventory forecasting",
      desc: "AI forecasts demand per design from seasonality, wedding cycles and gold price — less dead stock, fewer broken sizes on winners.",
    },
  },
  {
    id: 17,
    category: "ops",
    icon: ArrowLeftRight,
    zh: {
      title: "门店智能调拨",
      desc: "A 店积压、B 店缺货，AI 每周给出调拨清单与运输优先级——库存周转率提升 20% 以上。",
    },
    en: {
      title: "Smart inter-store transfers",
      desc: "Overstock here, stockout there — AI issues a weekly transfer list with shipping priority. +20% inventory turns.",
    },
  },
  {
    id: 18,
    category: "ops",
    icon: ListChecks,
    zh: {
      title: "SKU 文案批量生产",
      desc: "新一季 300 个 SKU 的详情页文案、卖点标签与 SEO 描述一夜完成——风格始终与品牌手册一致。",
    },
    en: {
      title: "Bulk product descriptions",
      desc: "300 new SKUs get titles, selling points and SEO copy overnight — all in your brand voice.",
    },
  },
  {
    id: 19,
    category: "ops",
    icon: ShieldAlert,
    zh: {
      title: "仿款与假货监控",
      desc: "AI 每天巡查电商平台的侵权链接与盗图店铺，自动生成投诉材料——品牌信任是珠宝的生命线。",
    },
    en: {
      title: "Counterfeit monitoring",
      desc: "AI sweeps marketplaces daily for copycat listings and stolen images, auto-drafting takedown files. Trust is the product.",
    },
  },
  {
    id: 20,
    category: "ops",
    icon: GraduationCap,
    zh: {
      title: "老板经验 AI 师傅",
      desc: "把你 20 年看货、议价、识人的经验喂给 AI——新员工随时问『这款为什么不能放低折扣』，店里多了个不吃住的师傅。",
    },
    en: {
      title: "AI mentor from your expertise",
      desc: "Feed 20 years of buying, pricing and negotiation judgment into AI. New staff ask \"why can't we discount this?\" — and get your answer, anytime.",
    },
  },
  // ─── 设计与产品 Design & Product ───
  {
    id: 21,
    category: "design",
    icon: Radar,
    zh: {
      title: "设计趋势雷达",
      desc: "AI 每月汇总秀场、小红书与 Pinterest 的款式信号，输出『下一季该打什么』报告——设计不再靠感觉。",
    },
    en: {
      title: "Trend radar",
      desc: "AI condenses runway, Xiaohongshu and Pinterest signals into a monthly \"what to design next\" report. Design with evidence.",
    },
  },
  {
    id: 22,
    category: "design",
    icon: PenTool,
    zh: {
      title: "AI 辅助草图变体",
      desc: "一句『蜂巢镶嵌但更柔』生成 10 版设计变体——打样之前，先在屏幕上淘汰 9 版。",
    },
    en: {
      title: "AI sketch variations",
      desc: "\"Honeycomb setting but softer\" becomes 10 sketch variants — kill nine on screen before wax ever touches the bench.",
    },
  },
  {
    id: 23,
    category: "design",
    icon: Tag,
    zh: {
      title: "价格带优化",
      desc: "AI 对比竞品与市场成交价，为新系列建议价格带与锚定策略——避免『定高了没人问，定低了伤品牌』。",
    },
    en: {
      title: "Price band optimisation",
      desc: "AI benchmarks competitor and market prices to suggest price bands and anchoring for each new collection.",
    },
  },
  // ─── 数据与决策 Data & Decisions ───
  {
    id: 24,
    category: "data",
    icon: BarChart3,
    zh: {
      title: "经营周报自动化",
      desc: "POS、私域与直播数据自动汇总成老板视角周报：卖什么、给谁卖、下周补什么——周日晚自动送达。",
    },
    en: {
      title: "Automated weekly insights",
      desc: "POS, private-domain and livestream data roll into an owner-level weekly brief — what sold, to whom, what to restock. Auto-delivered Sunday night.",
    },
  },
  {
    id: 25,
    category: "data",
    icon: Globe2,
    toolHref: "/tools/website-analyzer",
    zh: {
      title: "竞品周报追踪",
      desc: "AI 每周盯竞品官网、新品、价格与活动并给出应对建议——本站的免费网站扫描器就是它的第一块积木。",
    },
    en: {
      title: "Competitor watch",
      desc: "AI tracks competitor sites, launches, prices and campaigns weekly, with recommended responses — our free Website Scanner is the first building block.",
    },
  },
];
