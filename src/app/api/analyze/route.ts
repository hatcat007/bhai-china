import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import ZAI from "z-ai-web-dev-sdk";
import {
  isRateLimited,
  rateLimitMessage,
  sseEventStream,
  pumpUpstreamSse,
  finishStream,
  createChatStream,
} from "@/app/api/tools/_sse";

/**
 * POST /api/analyze — 网站 AI 缺口扫描（免费工具）
 * { url: string, email?: string, locale?: "zh"|"en" }
 * 1. 校验 URL（http/https + hostname）→ 2. page_reader 抓页面（15s 超时）
 * → 3. 服务端去 HTML 转纯文本（截断 8000 字）→ 4. LLM 流式分析（SSE 透传）
 * page_reader 失败 / 内容太短 → SSE error 事件（不浪费一次 JSON 报错）
 * i18n Round C：报告语言 + 阶段日志 + 错误文案跟随用户界面语言
 */

const schema = z.object({
  url: z.string().trim().min(4, "请填写官网地址").max(500),
  email: z.string().trim().email().max(160).optional(),
  locale: z.enum(["zh", "en"]).default("zh"),
});

const PAGE_READER_TIMEOUT_MS = 15_000;
const MAX_PAGE_TEXT = 8000;
/** 页面可见文字低于该值 → 视为「读不到」 */
const MIN_PAGE_TEXT = 150;

function normalizeUrl(raw: string): string | null {
  let s = raw.trim();
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  try {
    const u = new URL(s);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    if (!u.hostname || !u.hostname.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("page_reader timeout")), ms);
    p.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      }
    );
  });
}

/** 服务端去 HTML → 纯文本（够用就好，不引入解析器依赖） */
function stripHtmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<\/(p|div|section|article|header|footer|li|ul|ol|tr|table|h[1-6]|blockquote|figcaption|span|a)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/[ \t\u00a0]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

const READER_FAIL_MESSAGE =
  "读不到这个网站，可能是反爬或链接失效。换一个网址试试，或者直接把官网首页文字复制给微信 busterl1";
const READER_FAIL_MESSAGE_EN =
  "Can't read this site — likely bot protection or a dead link. Try another URL, or paste the homepage text to Buster on WeChat: busterl1";

const SYSTEM_PROMPT = `你是陆博明 / Buster ML Larsen，丹麦 AI 系统架构师，Better Human AI (BHAI) 创始人。你在丹麦帮 15 家顶级珠宝品牌（潘多拉、乔治·杰生、Ole Lynggaard 等）部署了生产环境 AI 工作队，现在把方法转移给中国珠宝 CEO。语气：直接、不绕弯、用数字说话、诚实（明确说哪些不能做）。永远用「我」，不用「我们」。用简体中文，写给珠宝品牌 CEO 看。

我会给你一个珠宝品牌官网的页面文字（已去掉 HTML）。请基于这些真实内容，输出一份 Markdown 数字足迹分析，只包含以下四个章节（## 二级标题）：

## 三个直接观察
每条 2-3 句，必须引用页面上看到的具体文字、产品、栏目或价格作为证据。页面里没有的就不要写。

## AI 缺口
3-5 条，从内容生产、私域客服、VIP 识别、防伪、需求预测等维度里挑最相关的：每条指出缺什么 + 代价是什么（用具体数字、工时或场景，不要空话）。

## 90 天内最值得做的第一件事
只讲一件事：是什么、为什么是它、第一周具体做什么。

## 一句诚实的话
如果这个品牌现阶段不需要 AI，直说，别硬卖。

硬性要求：
- 只能引用页面文字里真实存在的内容作为证据，严禁编造页面上不存在的产品、价格、栏目或数据。
- 页面文字里读不出来的信息，明确写「页面看不到，需要进一步核实」，不要猜。
- 总长度 500-800 字，Markdown 语法正确，不要开场寒暄，不要代码块包裹。`;

const SYSTEM_PROMPT_EN = `You are Buster ML Larsen (陆博明), Danish AI systems architect and founder of Better Human AI (BHAI). In Denmark you have deployed production AI teams for 15 top jewelry brands (Pandora, Georg Jensen, Ole Lynggaard and others); now you are transferring that method to Chinese jewelry CEOs. Tone: direct, no detours, numbers over adjectives, honest (say plainly what you cannot do). Always say "I", never "we". Write in fluent business English, addressed to a jewelry brand CEO.

I will give you the page text of a jewelry brand's official website (HTML stripped). Based on that real content, output a Markdown digital-footprint audit with exactly these four sections (## H2 headings):

## Three Direct Observations
2-3 sentences each; every point must quote concrete text, products, sections or prices visible on the page as evidence. Don't write anything that isn't on the page.

## AI Gaps
3-5 items, picking the most relevant from: content production, private-domain customer service, VIP identification, anti-counterfeiting, demand forecasting. For each: what's missing + what it costs (concrete numbers, hours or scenarios — no fluff).

## The One Thing To Do in the Next 90 Days
One thing only: what it is, why it's the one, and what week 1 looks like concretely.

## One Honest Sentence
If this brand doesn't need AI at this stage, say so plainly. Don't hard-sell.

Hard requirements:
- Only quote content that actually exists in the page text as evidence; never invent products, prices, sections or data that aren't there.
- For anything the page text doesn't reveal, write explicitly "Not visible on the page — needs verification". Don't guess.
- Total length 500-800 words, valid Markdown, no warm-up small talk, no code-block wrapping.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Enter a valid website address (e.g. https://yourbrand.com) / 请填写正确的官网地址（如 https://yourbrand.com）",
        },
        { status: 400 }
      );
    }

    const locale = parsed.data.locale;
    const isEn = locale === "en";

    const url = normalizeUrl(parsed.data.url);
    if (!url) {
      return NextResponse.json(
        {
          ok: false,
          error: isEn
            ? "That URL doesn't look right — include the full domain, e.g. https://yourbrand.com"
            : "网址格式不对：请包含完整域名，例如 https://yourbrand.com",
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

    return sseEventStream(async (send, state) => {
      // 阶段事件：客户端扫描监视器（截图滚动 + 扫描线动画）随进度推进
      let host = url;
      try {
        host = new URL(url).host;
      } catch {
        /* 保留完整 url */
      }
      send({
        type: "stage",
        stage: "connect",
        message: isEn ? `Connecting · ${host}` : `建立连接 · ${host}`,
        progress: 12,
      });

      // 1) page_reader 抓取（15 秒超时保护）
      let html: string;
      let title: string;
      try {
        const zai = await ZAI.create();
        const res = await withTimeout(
          zai.functions.invoke("page_reader", { url }) as Promise<{
            data?: { html?: string; title?: string };
          }>,
          PAGE_READER_TIMEOUT_MS
        );
        html = typeof res?.data?.html === "string" ? res.data.html : "";
        title = typeof res?.data?.title === "string" ? res.data.title : "";
      } catch (err) {
        console.error("[api/analyze] page_reader failed:", url, err);
        send({
          type: "error",
          error: isEn ? READER_FAIL_MESSAGE_EN : READER_FAIL_MESSAGE,
        });
        return;
      }

      // 2) 去 HTML → 纯文本，太短视为读不到
      const text = stripHtmlToText(html);
      if (text.length < MIN_PAGE_TEXT) {
        console.warn(
          `[api/analyze] page text too short (${text.length} chars): ${url}`
        );
        send({
          type: "error",
          error: isEn ? READER_FAIL_MESSAGE_EN : READER_FAIL_MESSAGE,
        });
        return;
      }

      // 2.5) 通知前端已读取完成（扫描监视器切换到 AI 推理阶段）
      send({
        type: "stage",
        stage: "read",
        message: isEn
          ? `Read “${title || host}” · ${text.length} chars of visible text`
          : `已读取「${title || host}」· 可见文本 ${text.length} 字`,
        progress: 38,
      });

      // 3) LLM 流式分析（同一事件形状透传；报告语言跟随 locale）
      send({
        type: "stage",
        stage: "analyze",
        message: isEn
          ? "AI reasoning · brand narrative / AI readiness / conversion gaps"
          : "AI 推理中 · 品牌叙事 / AI 就绪度 / 转化缺口",
        progress: 62,
      });
      const userPrompt = isEn
        ? `Website URL: ${url}\nPage title: ${title || "(none)"}\n\nPage text (first ${MAX_PAGE_TEXT} chars):\n${text.slice(0, MAX_PAGE_TEXT)}`
        : `官网 URL：${url}\n页面标题：${title || "（无）"}\n\n页面文字（截取前 ${MAX_PAGE_TEXT} 字）：\n${text.slice(0, MAX_PAGE_TEXT)}`;

      const upstream = await createChatStream(
        isEn ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT,
        userPrompt
      );
      const full = await pumpUpstreamSse(upstream, send, state);
      finishStream(
        full,
        send,
        isEn
          ? "Analysis failed — try again shortly or use a different URL"
          : "分析生成失败，请稍后重试或换一个网址"
      );
    }, "api/analyze");
  } catch (err) {
    console.error("[api/analyze] POST failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Scan service temporarily unavailable — try again shortly or reach Buster on WeChat: busterl1 / 扫描服务暂时不可用，请稍后重试或直接微信联系 busterl1",
      },
      { status: 500 }
    );
  }
}
