import type { AITool } from "@/lib/data/ai-tools";

/**
 * 免费 AI 工具内容 · 英文文案（i18n Round B）
 * - 键为工具 slug；覆盖 AITool 的展示型字段（name/tagline/description/timeEstimate/
 *   ctaText/outputHint/disclaimer 与 fields 的 label/placeholder）
 * - fields 以 field.id 索引；id 与 zh 版一致（表单逻辑、埋点、endpoint 均不受影响）
 * - 「（可选）」后缀由 UI 依 field.optional 统一渲染，label 里不重复写
 * - 逻辑字段（slug/icon/endpoint/isAnalyzer/maxLength/type）不可覆盖，安全兜底
 */

type ToolContentOverride = {
  name: string;
  tagline: string;
  description: string;
  timeEstimate: string;
  ctaText: string;
  outputHint: string;
  disclaimer?: string;
  fields: Record<string, { label: string; placeholder: string }>;
};

const OVERRIDES: Record<string, ToolContentOverride> = {
  "website-analyzer": {
    name: "Website AI Gap Scan",
    tagline:
      "Paste any jewelry brand's website — the AI finds three direct observations, the AI gaps, and the first move to make within 90 days.",
    description:
      "Paste your website address and I will actually read the site, then tell you: three facts I can see on the page, this brand's AI gaps across content / private-domain service / VIP recognition / anti-counterfeiting / prediction, and the single most worthwhile first move within 90 days. I only quote text that really exists on the page — if I can't read it, I say so.",
    timeEstimate: "~10 sec",
    ctaText: "Start scan",
    outputHint:
      "Output is a Markdown report: three direct observations · AI gaps · first 90-day move · one honest sentence",
    fields: {
      url: { label: "Website URL", placeholder: "https://yourbrand.com" },
    },
  },
  "red-copywriter": {
    name: "Xiaohongshu Quiet-Luxury Copy",
    tagline: "Give a product and its materials, get 3 “quiet luxury / old money” Xiaohongshu posts: headline, body, hashtags.",
    description:
      "An agency charges thousands a month for Xiaohongshu. First see what AI can write. Give me one product and its craft, and I'll deliver 3 publish-ready posts — catchy but never cheap, with emoji and hashtags, in a quiet-luxury tone.",
    timeEstimate: "~8 sec",
    ctaText: "Generate 3 posts",
    outputHint:
      "Output is 3 publish-ready Xiaohongshu posts (separated in Markdown)",
    fields: {
      product: {
        label: "Product name",
        placeholder: "e.g. 18K gold chain, “Orbit” collection",
      },
      materials: {
        label: "Materials & craft",
        placeholder:
          "e.g. 18K gold, Italian brushed finish, handmade clasp, engraving available",
      },
    },
  },
  "objection-handler": {
    name: "VIP Objection Replies",
    tagline: "The client says “Taobao sells the same one for ¥800”? Get 3 composed WeChat VIP replies.",
    description:
      "Paste the customer's harshest sentence and I'll write 3 WeChat replies: quietly walking through craft, provenance and after-sales — never putting Taobao down, never groveling. The voice is a jewelry-literate advisor, not a support-script template.",
    timeEstimate: "~8 sec",
    ctaText: "Generate 3 replies",
    outputHint:
      "Output is 3 replies you can paste straight into a WeChat conversation",
    fields: {
      objection: {
        label: "Customer's words (objection)",
        placeholder:
          "e.g. I found the exact same chain on Taobao for just ¥800",
      },
      brand: {
        label: "Brand name",
        placeholder: "e.g. Your Jewelry House",
      },
    },
  },
  "provenance-story": {
    name: "Provenance & Sustainability Copy",
    tagline: "200 words of product-page copy on sustainability and provenance. Anti-greenwashing, concrete, never hollow.",
    description:
      "“Embracing nature”, “protecting the planet” — today's consumers scroll right past that. I write verifiable provenance copy: where the materials come from, who made them, which steps are traceable — and where information is missing, it says “still verifying”. That's the right way to tell a sustainability story.",
    timeEstimate: "~8 sec",
    ctaText: "Generate product copy",
    outputHint:
      "Output is ~200 words of product-page “provenance & sustainability” copy",
    fields: {
      materials: {
        label: "Materials & source",
        placeholder:
          "e.g. recycled 18K gold, tanzanite sourced directly from Tanzanian mines",
      },
      origin: {
        label: "Workshop / origin details",
        placeholder:
          "e.g. own workshop in Shenzhen, hand-set by a goldsmith of 12 years",
      },
    },
  },
  "competitor-gap": {
    name: "Competitor AI Vulnerability Report",
    tagline: "Speculative analysis built on public industry data: the 3 most likely AI gaps — and how to exploit them.",
    description:
      "Name a competitor and I'll speculate, based on public industry information, where they most likely lag in AI, what each gap is worth, and how you exploit it. Note: this is inference, not insider data — the report states that clearly.",
    timeEstimate: "~8 sec",
    ctaText: "Generate the report",
    outputHint:
      "Output is a Markdown report: disclaimer · three likely gaps · if you were the competitor",
    disclaimer:
      "This report is speculative analysis based on public industry information — no internal data is used. Use it to find ideas, not for false advertising against competitors.",
    fields: {
      competitor: {
        label: "Competitor brand",
        placeholder: "e.g. a Hong Kong jewelry group",
      },
    },
  },
};

/** 中文主数据 + 英文覆盖 → 本地化工具对象（不可覆盖逻辑字段） */
export function localizeTool(tool: AITool, locale: "zh" | "en"): AITool {
  if (locale !== "en") return tool;
  const en = OVERRIDES[tool.slug];
  if (!en) return tool;
  return {
    ...tool,
    name: en.name,
    tagline: en.tagline,
    description: en.description,
    timeEstimate: en.timeEstimate,
    ctaText: en.ctaText,
    outputHint: en.outputHint,
    ...(en.disclaimer !== undefined ? { disclaimer: en.disclaimer } : {}),
    fields: tool.fields.map((f) => {
      const o = en.fields[f.id];
      return o ? { ...f, label: o.label, placeholder: o.placeholder } : f;
    }),
  };
}
