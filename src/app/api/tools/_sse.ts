import ZAI from "z-ai-web-dev-sdk";

/**
 * AI 工具 / 网站分析器共用的后端工具件：
 * - 内存限流（每 IP 30 分钟 10 次，模式复制自 api/roadmap/generate）
 * - SSE 事件流封装（事件形状与 roadmap 一致：{"type":"delta"|"done"|"error"}）
 * - 上游 chat SSE 解析透传
 */

/* ---------- 内存限流：每 IP 30 分钟最多 10 次 ---------- */
const rateMap = new Map<string, number[]>();
const RATE_WINDOW_MS = 30 * 60 * 1000;
export const RATE_MAX = 10;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    rateMap.set(ip, hits);
    return true;
  }
  hits.push(now);
  rateMap.set(ip, hits);
  // 防止 Map 无限增长
  if (rateMap.size > 5000) {
    for (const [k, v] of rateMap) {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) rateMap.delete(k);
    }
  }
  return false;
}

export const RATE_LIMIT_MESSAGE =
  "免费额度用完了（每 30 分钟 10 次），请稍后再试，或直接微信联系 busterl1";

export const RATE_LIMIT_MESSAGE_EN =
  "Free quota used up (10 runs / 30 min) — try again shortly, or reach Buster on WeChat: busterl1";

/** 按请求 locale 取限流文案 */
export function rateLimitMessage(locale: "zh" | "en"): string {
  return locale === "en" ? RATE_LIMIT_MESSAGE_EN : RATE_LIMIT_MESSAGE;
}

/* ---------- SSE 事件流 ---------- */

export type SendFn = (evt: Record<string, unknown>) => void;

const SSE_HEADERS: Record<string, string> = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
  Connection: "keep-alive",
  "X-Accel-Buffering": "no",
};

/**
 * 把一段异步工作包成 SSE 响应：
 * run() 里通过 send() 下发事件；抛错则下发 error 事件。
 * state.upstream 用来在客户端断开时取消上游请求。
 */
export function sseEventStream(
  run: (send: SendFn, state: { upstream?: ReadableStream }) => Promise<void>,
  logTag: string
): Response {
  const encoder = new TextEncoder();
  const state: { upstream?: ReadableStream } = {};

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send: SendFn = (obj) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
        } catch {
          /* 客户端已断开 */
        }
      };
      try {
        await run(send, state);
      } catch (err) {
        console.error(`[${logTag}] stream failed:`, err);
        send({ type: "error", error: "生成中断，请稍后重试或微信联系 busterl1" });
      } finally {
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      }
    },
    cancel() {
      // 客户端中断：释放上游连接
      state.upstream?.cancel().catch(() => {});
    },
  });

  return new Response(stream, { headers: SSE_HEADERS });
}

/** 输出长度低于该值视为失败（与 roadmap 一致） */
const MIN_OUTPUT_CHARS = 100;

/**
 * 透传上游 chat SSE：解析 data: 行里的 choices[0].delta.content，
 * 重新以 {"type":"delta","text"} 下发，返回完整文本。
 * 上游若返回的是完整 JSON（非流）→ 兜底为一次性 delta。
 */
export async function pumpUpstreamSse(
  upstream: unknown,
  send: SendFn,
  state: { upstream?: ReadableStream }
): Promise<string> {
  if (!(upstream instanceof ReadableStream)) {
    const content =
      (upstream as { choices?: { message?: { content?: string } }[] })
        ?.choices?.[0]?.message?.content?.trim() ?? "";
    if (content) send({ type: "delta", text: content });
    return content;
  }

  state.upstream = upstream;
  const reader = upstream.getReader();
  const decoder = new TextDecoder();
  let full = "";
  let sseBuf = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    sseBuf += decoder.decode(value, { stream: true });

    const lines = sseBuf.split("\n");
    sseBuf = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const json = JSON.parse(payload);
        const delta: string = json.choices?.[0]?.delta?.content ?? "";
        if (delta) {
          full += delta;
          send({ type: "delta", text: delta });
        }
      } catch {
        /* 半包 JSON，跳过等待下一个 chunk */
      }
    }
  }

  return full;
}

/** 校验 LLM 输出长度并收尾（done / error 事件） */
export function finishStream(full: string, send: SendFn, tooShortError: string): void {
  const markdown = full.trim();
  if (!markdown || markdown.length < MIN_OUTPUT_CHARS) {
    send({ type: "error", error: tooShortError });
  } else {
    send({ type: "done", length: markdown.length });
  }
}

/** 创建 z-ai 客户端 + 发起流式 chat 请求（thinking 关闭，与 roadmap 一致） */
export async function createChatStream(system: string, user: string) {
  const zai = await ZAI.create();
  return zai.chat.completions.create({
    messages: [
      { role: "assistant", content: system },
      { role: "user", content: user },
    ],
    thinking: { type: "disabled" },
    stream: true,
  });
}
