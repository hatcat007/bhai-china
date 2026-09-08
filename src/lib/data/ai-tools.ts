import type { LucideIcon } from "lucide-react";
import {
  ScanSearch,
  PenLine,
  MessagesSquare,
  ScrollText,
  Radar,
} from "lucide-react";

/**
 * 免费 AI 工具注册表
 * 服务端页面（/tools、/tools/[tool]）与客户端 ToolRunner 共用。
 * 注意：本文件保持「纯数据 + 图标映射」，不引入任何服务端依赖（z-ai / db），
 * icon 以字符串名存储，避免组件实例跨越 server/client 边界序列化。
 */

export type ToolField = {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "url";
  optional?: boolean;
  /** 前端输入框 maxLength 提示（后端会另行截断） */
  maxLength?: number;
};

export type AITool = {
  slug: string;
  name: string;
  /** 卡片上的一句话价值主张 */
  tagline: string;
  /** 工具详情页更完整的描述 */
  description: string;
  timeEstimate: string;
  /** TOOL_ICONS 的 key */
  icon: string;
  fields: ToolField[];
  ctaText: string;
  /** CTA 下的输出格式提示 */
  outputHint: string;
  /** 需要在 UI 上显著展示的免责声明（如竞品脆弱性报告） */
  disclaimer?: string;
  /** 网站分析器的特殊终端 UI */
  isAnalyzer?: boolean;
  /** POST 端点（相对路径） */
  endpoint: string;
};

export const TOOL_ICONS: Record<string, LucideIcon> = {
  ScanSearch,
  PenLine,
  MessagesSquare,
  ScrollText,
  Radar,
};

export const FREE_RUNS_PER_TOOL = 2;

export const AI_TOOLS: AITool[] = [
  {
    slug: "website-analyzer",
    name: "网站 AI 缺口扫描",
    tagline: "贴上任意珠宝品牌官网，AI 找出三个直接观察、AI 缺口和 90 天内最该做的第一件事。",
    description:
      "贴上你的官网地址，我会真的去读这个网站，然后告诉你：我从页面上看到的三个事实、这家品牌在内容生产 / 私域客服 / VIP 识别 / 防伪 / 预测上的 AI 缺口，以及 90 天内最值得做的第一件事。只引用页面上真实存在的文字，读不到就说读不到。",
    timeEstimate: "约 10 秒",
    icon: "ScanSearch",
    fields: [
      {
        id: "url",
        label: "官网地址",
        placeholder: "https://yourbrand.com",
        type: "url",
        maxLength: 300,
      },
    ],
    ctaText: "开始扫描",
    outputHint: "输出为 Markdown 报告：三个直接观察 · AI 缺口 · 90 天第一件事 · 一句诚实的话",
    isAnalyzer: true,
    endpoint: "/api/analyze",
  },
  {
    slug: "red-copywriter",
    name: "小红书静奢文案",
    tagline: "输入产品与材质，生成 3 条「静奢 / 老钱风」小红书帖子：标题、正文、话题标签。",
    description:
      "给小红书代运营一个月几千块，不如先看看 AI 能写成什么样。输入一个产品和它的材质工艺，我给你 3 条可直接发布的小红书帖子——标题党但不 low，有 emoji 有标签，静奢调性。",
    timeEstimate: "约 8 秒",
    icon: "PenLine",
    fields: [
      {
        id: "product",
        label: "产品名称",
        placeholder: "例：18K 金素链「轨迹」系列",
        maxLength: 200,
      },
      {
        id: "materials",
        label: "材质与工艺",
        placeholder: "例：18K 金，意大利拉丝工艺，手工扣头，可刻字",
        maxLength: 400,
      },
    ],
    ctaText: "生成 3 条文案",
    outputHint: "输出为 3 条可直接发布的小红书帖子（Markdown 分隔）",
    endpoint: "/api/tools/red-copywriter",
  },
  {
    slug: "objection-handler",
    name: "VIP 异议回复",
    tagline: "客户说「淘宝同款只要 800」？生成 3 条不动声色的微信 VIP 客服回复。",
    description:
      "把客户最难听的一句原话贴进来，我写 3 条微信回复：不动声色地讲工艺、出处、售后，不贬低淘宝，也不卑微。语气是一个懂珠宝的顾问，不是客服模板。",
    timeEstimate: "约 8 秒",
    icon: "MessagesSquare",
    fields: [
      {
        id: "objection",
        label: "客户原话（异议）",
        placeholder: "例：这条链子我看淘宝上长得一模一样，只要 800 块",
        maxLength: 400,
      },
      {
        id: "brand",
        label: "品牌名",
        placeholder: "例：某某珠宝",
        optional: true,
        maxLength: 80,
      },
    ],
    ctaText: "生成 3 条回复",
    outputHint: "输出为 3 条可直接粘贴进微信对话框的回复",
    endpoint: "/api/tools/objection-handler",
  },
  {
    slug: "provenance-story",
    name: "可持续出处文案",
    tagline: "200 字产品详情页文案：可持续与出处。反 greenwashing，具体不空洞。",
    description:
      "「拥抱自然」「守护地球」这种话，今天的消费者一眼就翻页。我写的是能验证的出处文案：材质从哪来、谁做的、哪些环节可追溯——信息不足的地方直说「还在核实」，这才是可持续叙事的正确姿势。",
    timeEstimate: "约 8 秒",
    icon: "ScrollText",
    fields: [
      {
        id: "materials",
        label: "材质与来源",
        placeholder: "例：回收 18K 金，坦桑尼亚矿区直采坦桑石",
        maxLength: 400,
      },
      {
        id: "origin",
        label: "工坊 / 产地细节",
        placeholder: "例：深圳自有工坊，12 年金工师傅手工镶嵌",
        optional: true,
        maxLength: 300,
      },
    ],
    ctaText: "生成详情页文案",
    outputHint: "输出为约 200 字的产品详情页「可持续与出处」文案",
    endpoint: "/api/tools/provenance-story",
  },
  {
    slug: "competitor-gap",
    name: "竞品 AI 脆弱性报告",
    tagline: "基于行业公开数据的推测性分析：3 个大概率 AI 缺口，以及怎么利用。",
    description:
      "给一个竞品品牌名，我基于行业公开信息推测它最可能在哪些 AI 环节上掉队、每个缺口值多少钱、你怎么利用。注意：这是推测，不是内部数据——报告里写得清清楚楚。",
    timeEstimate: "约 8 秒",
    icon: "Radar",
    fields: [
      {
        id: "competitor",
        label: "竞品品牌名",
        placeholder: "例：某香港珠宝集团",
        maxLength: 120,
      },
    ],
    ctaText: "生成脆弱性报告",
    outputHint: "输出为 Markdown 报告：免责声明 · 三个大概率缺口 · 如果你是对手",
    disclaimer:
      "本报告为基于行业公开信息的推测性分析，不使用任何内部数据。用来找思路，不用来做针对竞品的不实宣传。",
    endpoint: "/api/tools/competitor-gap",
  },
];

export function getToolBySlug(slug: string): AITool | undefined {
  return AI_TOOLS.find((t) => t.slug === slug);
}
