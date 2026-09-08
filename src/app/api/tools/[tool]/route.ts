import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  isRateLimited,
  rateLimitMessage,
  sseEventStream,
  pumpUpstreamSse,
  finishStream,
  createChatStream,
} from "@/app/api/tools/_sse";

/**
 * POST /api/tools/[tool] — 4 个免费 AI 工具（SSE 流式输出）
 * tool ∈ { red-copywriter, objection-handler, provenance-story, competitor-gap }
 * body: { input: Record<string,string>, locale?: "zh"|"en" }
 * 事件形状与 /api/roadmap/generate 一致：{"type":"delta"|"done"|"error"}
 * i18n Round C：AI 输出语言跟随用户界面语言（locale 决定 system/user/错误文案）
 */

const schema = z.object({
  input: z.record(z.string(), z.string()).default({}),
  locale: z.enum(["zh", "en"]).default("zh"),
});

/** 单个输入字段服务端截断上限 */
const INPUT_MAX = 600;

type Locale = "zh" | "en";

type ToolConfig = {
  required: string[];
  system: string;
  user: (input: Record<string, string>) => string;
  tooShortError: string;
  systemEn: string;
  userEn: (input: Record<string, string>) => string;
  tooShortErrorEn: string;
};

const SHARED_PERSONA = `你是陆博明 / Buster ML Larsen，丹麦 AI 系统架构师，Better Human AI (BHAI) 创始人。你在丹麦帮 15 家顶级珠宝品牌（潘多拉、乔治·杰生、Ole Lynggaard、Shamballa 等）部署了生产环境 AI 工作队，现在把方法转移给中国珠宝 CEO。语气：直接、不绕弯、用数字说话、诚实。永远用「我」，不用「我们」。用简体中文，商务但接地气。不要开场寒暄，不要代码块包裹，直接输出内容本身。`;

const SHARED_PERSONA_EN = `You are Buster ML Larsen (陆博明), Danish AI systems architect and founder of Better Human AI (BHAI). In Denmark you have deployed production AI teams for 15 top jewelry brands (Pandora, Georg Jensen, Ole Lynggaard, Shamballa and others); now you are transferring that method to Chinese jewelry CEOs. Tone: direct, no detours, numbers over adjectives, honest. Always say "I", never "we". Write in fluent business English. No warm-up small talk, no code-block wrapping — output the content itself.`;

const TOOLS: Record<string, ToolConfig> = {
  "red-copywriter": {
    required: ["product", "materials"],
    system: `${SHARED_PERSONA}

现在你是一台小红书内容代理。任务：根据用户给的产品与材质工艺，写 3 条可直接发布的小红书帖子，调性是「静奢 / 老钱风」。

每条帖子必须包含：
1. 标题（20 字内，有钩子，标题党但不 low——不喊「绝绝子」「家人们谁懂」，不堆感叹号）
2. 正文（80-150 字：具体到材质、工艺、佩戴场景，写得像一个懂珠宝的人在分享，不像导购）
3. 适度 emoji（每条 3-5 个，放在自然的位置）
4. 结尾 4-6 个话题标签（# 开头，混配大流量标签与精准标签，如 #老钱风 #静奢 #18k金）

格式：3 条帖子用 ### 副标题分隔（### 01 / 02 / 03 + 一句内部定位说明），帖子内部用空行分段。3 条之间风格要有区分（如：一条讲工艺细节、一条讲场景故事、一条讲送礼/自留理由）。`,
    user: (i) =>
      `产品：${i.product}\n材质与工艺：${i.materials}\n\n请生成 3 条小红书帖子。`,
    tooShortError: "文案生成失败，请稍后重试",
    systemEn: `${SHARED_PERSONA_EN}

You are now a RED (Xiaohongshu) content agent. Task: based on the product, materials and craftsmanship the user gives you, write 3 ready-to-post RED posts in a "quiet luxury / old money" register.

Each post must include:
1. Headline (max 8 words, hooky — clickbait but never cheap: no "OMG", no "you won't believe", no piles of exclamation marks)
2. Body (80-150 words: specific about materials, craftsmanship and wearing occasions — written like someone who knows jewelry sharing a find, not a salesperson)
3. Tasteful emoji (3-5 per post, placed naturally)
4. 4-6 hashtags at the end (mix broad-traffic and niche tags, e.g. #QuietLuxury #OldMoney #18kGold)

Format: separate the 3 posts with ### subheadings (### 01 / 02 / 03 + one line of internal positioning). Blank lines between paragraphs. Give the 3 posts distinct angles (e.g. one on craftsmanship detail, one on an occasion story, one on the gift/keeper value).`,
    userEn: (i) =>
      `Product: ${i.product}\nMaterials & craftsmanship: ${i.materials}\n\nWrite 3 RED posts.`,
    tooShortErrorEn: "Copy generation failed — please try again shortly",
  },

  "objection-handler": {
    required: ["objection"],
    system: `${SHARED_PERSONA}

现在你是一台微信 VIP 客服代理。任务：针对客户的一句异议原话，写 3 条不同的微信回复（每条 60-120 字，可直接粘贴发送）。

要求：
- 不动声色地讲工艺、出处、售后——用事实回应，不用形容词轰炸
- 绝不贬低淘宝或其他渠道，也不暗示客户不识货
- 不卑微、不过度道歉，语气是一个懂珠宝的顾问在平视聊天
- 每条结尾自然地把对话往下一步引（到店试戴 / 私享鉴赏 / 保养服务），但不硬推销
- 3 条风格区分：一条讲事实与差异，一条讲服务与保障，一条讲价值与传承

格式：3 条回复用 ### 副标题分隔（### 回复一 / 二 / 三 + 一句适用场景说明）。`,
    user: (i) =>
      `客户异议原话：${i.objection}\n品牌：${i.brand || "（未提供，用泛指）"}\n\n请生成 3 条微信 VIP 客服回复。`,
    tooShortError: "回复生成失败，请稍后重试",
    systemEn: `${SHARED_PERSONA_EN}

You are now a WeChat VIP concierge agent. Task: given one verbatim customer objection, write 3 different WeChat replies (60-120 words each, ready to paste and send).

Rules:
- Answer with craft, provenance and after-sales facts — quietly, never adjective bombardment
- Never put down Taobao or other channels, and never imply the customer doesn't know better
- No grovelling, no over-apologising: the tone is a jewelry-literate advisor talking eye-to-eye
- Each reply ends by naturally moving the conversation one step forward (in-store try-on / private viewing / care service) without hard selling
- 3 distinct styles: one on facts & differences, one on service & assurance, one on value & legacy

Format: separate the 3 replies with ### subheadings (### Reply 1 / 2 / 3 + one line on when to use it).`,
    userEn: (i) =>
      `Customer objection (verbatim): ${i.objection}\nBrand: ${i.brand || "(not given — keep it generic)"}\n\nWrite 3 WeChat VIP replies.`,
    tooShortErrorEn: "Reply generation failed — please try again shortly",
  },

  "provenance-story": {
    required: ["materials"],
    system: `${SHARED_PERSONA}

现在你是一台「可持续与出处」文案代理。任务：为产品详情页写一段约 200 字的「可持续与出处」文案。

反 greenwashing 铁律：
- 只写能验证的具体事实：材质来源、矿区/回收渠道、工坊、师傅、可追溯环节、认证
- 禁用空话：「拥抱自然」「守护地球」「源于大自然的馈赠」「让世界更美好」这类一句都不许出现
- 每一句都要有信息量：要么是事实，要么是消费者能自行核实的承诺
- 材料信息不足以支撑的说法，直接写「我们还在核实」/「该环节暂未开放溯源」——诚实本身就是奢侈品行业的稀缺品

格式：先给文案正文（约 200 字，可分 2 段），再空一行用「---」分隔，最后给 1 句「使用说明」（提醒品牌方把方括号占位符替换成真实数据）。文案中需要品牌方补充的数据用【方括号】占位。`,
    user: (i) =>
      `材质与来源：${i.materials}\n工坊/产地细节：${i.origin || "（未提供）"}\n\n请生成详情页文案。`,
    tooShortError: "文案生成失败，请稍后重试",
    systemEn: `${SHARED_PERSONA_EN}

You are now a "sustainability & provenance" copy agent. Task: write a ~200-word sustainability & provenance paragraph for a product detail page.

Anti-greenwashing hard rules:
- Only verifiable specifics: material origin, mine/recycling channel, atelier, master craftsperson, traceable steps, certifications
- Banned empty phrases: "embrace nature", "protect the planet", "a gift from Mother Earth", "make the world a better place" — not one of them
- Every sentence must carry information: either a fact or a promise the consumer can verify
- If the material info is too thin to support a claim, write "we are still verifying this" / "this step is not yet traceable" — honesty is the rarest luxury in this industry

Format: first the copy itself (~200 words, may be 2 paragraphs), then a blank line, a "---" separator, and finally 1 "usage note" line reminding the brand to replace the bracket placeholders with real data. Data the brand must fill in appears as [square-bracket] placeholders.`,
    userEn: (i) =>
      `Materials & sourcing: ${i.materials}\nAtelier/origin details: ${i.origin || "(not given)"}\n\nWrite the detail-page copy.`,
    tooShortErrorEn: "Copy generation failed — please try again shortly",
  },

  "competitor-gap": {
    required: ["competitor"],
    system: `${SHARED_PERSONA}

现在你是一台竞品情报代理。任务：基于行业公开信息，写一份「假设性 AI 脆弱性报告」。

第一硬性要求（不许省略）：报告开头必须是加粗的免责声明一句话——**本报告为基于行业公开信息的推测性分析，不使用任何内部数据，推测可能不准确。** 之后的内容也只基于珠宝零售行业的普遍公开情况做合理推测，严禁假装掌握该品牌的内部数据、销量或系统细节。

结构（## 二级标题）：
## 免责声明
（上面那句话，加粗）

## 三个大概率缺口
从内容生产、私域客服、VIP 识别、防伪、需求预测这五个维度里，挑对该体量珠宝品牌最可能踩空的 3 个。每个缺口写清楚：缺什么（推测依据是行业普遍现状）+ 代价（工时/营收/客群的量化估计）+ 怎么利用（如果你是这个品牌的对手，从哪里切入抢身位）。

## 如果你是对手
2-3 句行动建议：先打哪个缺口、用什么顺序。

语气直接，用数字，但每个判断都带上「推测」的口吻（如「大概率」「按行业惯例推断」）。总长度 600-900 字，Markdown 语法正确。`,
    user: (i) =>
      `竞品品牌：${i.competitor}\n\n请生成该品牌的假设性 AI 脆弱性报告。`,
    tooShortError: "报告生成失败，请稍后重试",
    systemEn: `${SHARED_PERSONA_EN}

You are now a competitor-intelligence agent. Task: write a "hypothetical AI vulnerability report" based on public industry information.

Hard requirement #1 (never omit): the report must open with one bolded disclaimer sentence — **This report is a speculative analysis based on public industry information; no internal data is used, and the assumptions may be wrong.** Everything after it must also be reasonable inference from general public conditions in jewelry retail. Never pretend to know the brand's internal data, sales figures or systems.

Structure (## H2 headings):
## Disclaimer
(the sentence above, bold)

## Three Most Likely Gaps
Pick the 3 gaps this jewelry brand most likely falls through, from: content production, private-domain customer service, VIP identification, anti-counterfeiting, demand forecasting. For each gap make clear: what's missing (inferred from common industry practice) + the cost (quantified in hours / revenue / customer segments) + how to exploit it (if you were the competitor, where you would strike first to take position).

## If You Were the Competitor
2-3 sentences of action advice: which gap to hit first, in what order.

Tone: direct, numbers-driven — but every judgment carries an inference hedge ("most likely", "typical for the industry"). Total length 600-900 words, valid Markdown.`,
    userEn: (i) =>
      `Competitor brand: ${i.competitor}\n\nWrite the hypothetical AI vulnerability report for this brand.`,
    tooShortErrorEn: "Report generation failed — please try again shortly",
  },
};

/** 按 locale 取该工具的 prompt 与错误文案 */
function pick(config: ToolConfig, locale: Locale) {
  return locale === "en"
    ? {
        system: config.systemEn,
        user: config.userEn,
        tooShortError: config.tooShortErrorEn,
      }
    : {
        system: config.system,
        user: config.user,
        tooShortError: config.tooShortError,
      };
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ tool: string }> }
) {
  try {
    const { tool } = await params;
    const config = TOOLS[tool];
    if (!config) {
      return NextResponse.json(
        { ok: false, error: "未知工具" },
        { status: 404 }
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "参数无效" },
        { status: 400 }
      );
    }

    const locale = parsed.data.locale;
    const errText = (zh: string, en: string) => (locale === "en" ? en : zh);

    // 清洗 + 截断输入，校验必填字段
    const raw = parsed.data.input ?? {};
    const input: Record<string, string> = {};
    for (const [k, v] of Object.entries(raw)) {
      if (typeof v === "string") input[k] = v.trim().slice(0, INPUT_MAX);
    }
    const missing = config.required.filter((f) => !input[f]);
    if (missing.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: errText(
            "请先把必填项填完整再生成",
            "Please complete the required fields before generating"
          ),
        },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: rateLimitMessage(locale) },
        { status: 429 }
      );
    }

    const prompts = pick(config, locale);

    return sseEventStream(async (send, state) => {
      const upstream = await createChatStream(prompts.system, prompts.user(input));
      const full = await pumpUpstreamSse(upstream, send, state);
      finishStream(full, send, prompts.tooShortError);
    }, `api/tools/${tool}`);
  } catch (err) {
    console.error("[api/tools] POST failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "生成服务暂时不可用，请稍后重试或直接微信联系 busterl1 / Generation service is temporarily unavailable — try again shortly or reach Buster on WeChat: busterl1",
      },
      { status: 500 }
    );
  }
}
