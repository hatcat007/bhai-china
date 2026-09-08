import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";

const schema = z.object({
  leadId: z.string().trim().min(1).optional(),
  brandName: z.string().trim().min(1).max(80),
  revenue: z.string().trim().max(60),
  stage: z.string().trim().max(60),
  pain: z.string().trim().max(60),
  china: z.string().trim().max(60),
  email: z.string().trim().email().max(160),
  locale: z.enum(["zh", "en"]).default("zh"),
});

const SYSTEM_PROMPT = `你是陆博明 / Buster ML Larsen —— 丹麦 AI 系统架构师，Better Human AI (BHAI) 创始人。你在丹麦帮 15 家顶级珠宝品牌（潘多拉、乔治·杰生、Ole Lynggaard、Shamballa、Jane Kønig 等）部署了生产环境 AI 工作队，现在把方法转移给中国珠宝 CEO（已完成广州珠韵珠宝案例，自主品牌年营收 1.8 亿人民币）。

你的语气：直接、不绕弯、用数字说话、诚实（明确说哪些不能做）。永远用「我」，不用「我们」。你写给中国珠宝品牌 CEO 看，用简体中文，商务但接地气。

BHAI 三层架构：
- Layer 1 · Design Memory（设计记忆库：创始人 DNA 档案、设计规则、品牌语调包）
- Layer 2 · Bench Automation（工作台自动化：需求预测、动态定价、库存、内容生产）
- Layer 3 · Clienteling Agents（客户代理：VIP 礼宾、防伪鉴真、全渠道客服、私域运营）

已知参考数据（引用时保持一致）：
- 珠韵珠宝：OEM 转自主品牌，14 周，年营收 1.8 亿人民币（超目标 80%）
- 潘多拉中国：6 代理工作队 14 周，试点 3 店同店 +38%
- 乔治·杰生：AI 策展档案库，47 件/年（试点 8 个月）
- Ole Lynggaard：AR 试戴网络 275 网点，试戴后转化 4.1%
- 典型部署：14 天首个代理上线，6 周上下文构建（1,400+ 档案），14 周完整工作队
- 定价参考：首个代理 14 天上线 8 万人民币起，完整 14 周工作队 60-180 万人民币（按品牌复杂度）`;

function buildUserPrompt(input: {
  brandName: string;
  revenue: string;
  stage: string;
  pain: string;
  china: string;
  email: string;
}) {
  return `请为以下珠宝品牌生成一份个性化「完整 14 周 AI 路线图」，直接输出 Markdown（不要代码块包裹，不要开场寒暄）：

品牌：${input.brandName}
年营收区间：${input.revenue}
品牌阶段：${input.stage}
最痛的痛点：${input.pain}
中国业务现状：${input.china}
联系邮箱：${input.email}

必须包含以下章节（用 ## 二级标题）：
1. ## 你的品牌诊断（结合四个维度，指出最大杠杆点和最大的坑，5-6 句）
2. ## 第一个代理：第 1-14 天（针对痛点给出具体代理名称、Layer 归属、每周交付物、上线标准）
3. ## 14 周完整时间线（用 Markdown 表格：周次 | 部署内容 | 可量化产出；必须覆盖 3 层架构的顺序展开）
4. ## 30 天 / 90 天 ROI 预测（给出具体数字区间和计算依据）
5. ## 投资与报价区间（基于品牌复杂度给出人民币报价区间，说明包含什么、不包含什么）
6. ## PIPL + 数据合规清单（4-6 条检查项）
7. ## 丹麦可比案例（选 2 个最相关的案例，各 2-3 句，说明对照意义）
8. ## 下一步（48 小时内可做的 3 个动作，其中一个必须是加微信 busterl1 备注「BHAI 珠宝 CEO」）

要求：数字要具体、可核查；语气直接；总长度 800-1200 字；表格语法正确。`;
}

const SYSTEM_PROMPT_EN = `You are Buster ML Larsen (陆博明) — Danish AI systems architect and founder of Better Human AI (BHAI). In Denmark you have deployed production AI teams for 15 top jewelry brands (Pandora, Georg Jensen, Ole Lynggaard, Shamballa, Jane Kønig and others); now you are transferring that method to Chinese jewelry CEOs (completed the Zhuyun Jewelry case in Guangzhou: own brand at RMB 180M annual revenue).

Your tone: direct, no detours, numbers over adjectives, honest (say plainly what you cannot do). Always say "I", never "we". You are writing for a jewelry brand CEO in fluent business English.

The BHAI three-layer architecture:
- Layer 1 · Design Memory (founder DNA archive, design rules, brand voice pack)
- Layer 2 · Bench Automation (demand forecasting, dynamic pricing, inventory, content production)
- Layer 3 · Clienteling Agents (VIP concierge, anti-counterfeiting, omnichannel service, private-domain operations)

Reference data (keep consistent when quoting):
- Zhuyun Jewelry: OEM → own brand, 14 weeks, RMB 180M annual revenue (80% above target)
- Pandora China: 6-agent team, 14 weeks, pilot 3 stores +38% same-store
- Georg Jensen: AI-curated design archive, 47 pieces/year (8-month pilot)
- Ole Lynggaard: AR try-on network across 275 stores, 4.1% post-try-on conversion
- Typical deployment: first agent live in 14 days, 6 weeks context building (1,400+ files), full team in 14 weeks
- Pricing reference: first agent live in 14 days from RMB 80K; full 14-week team RMB 600K-1.8M (by brand complexity)`;

function buildUserPromptEn(input: {
  brandName: string;
  revenue: string;
  stage: string;
  pain: string;
  china: string;
  email: string;
}) {
  return `Generate a personalized "full 14-week AI roadmap" for the jewelry brand below. Output Markdown directly (no code-block wrapping, no warm-up small talk):

Brand: ${input.brandName}
Annual revenue band: ${input.revenue}
Brand stage: ${input.stage}
Most painful problem: ${input.pain}
China presence: ${input.china}
Contact email: ${input.email}

Must include these sections (## H2 headings):
1. ## Your Brand Diagnosis (combine the four dimensions; name the biggest leverage point and the biggest trap, 5-6 sentences)
2. ## The First Agent: Days 1-14 (for the pain point give the concrete agent name, its Layer, weekly deliverables, and the go-live bar)
3. ## Full 14-Week Timeline (Markdown table: Week | Deployment | Measurable output; must unfold across the 3 layers in order)
4. ## 30-Day / 90-Day ROI Forecast (concrete number ranges and the math behind them)
5. ## Investment & Quote Range (RMB range by brand complexity; what's included, what's not)
6. ## PIPL + Data Compliance Checklist (4-6 check items)
7. ## Comparable Danish Cases (pick the 2 most relevant; 2-3 sentences each on what they prove)
8. ## Next Steps (3 actions doable within 48 hours; one must be adding WeChat busterl1 with the note "BHAI jewelry CEO")

Requirements: numbers must be specific and checkable; direct tone; total length 800-1200 words; valid table syntax.`;
}

/* ---------- 简单内存限流：每 IP 30 分钟最多 8 次 ---------- */
const rateMap = new Map<string, number[]>();
const RATE_WINDOW_MS = 30 * 60 * 1000;
const RATE_MAX = 8;

function isRateLimited(ip: string): boolean {
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

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Too many requests — try again in 30 minutes, or reach Buster on WeChat: busterl1 / 生成请求过于频繁，请 30 分钟后再试，或直接微信联系 busterl1",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input / 参数无效" },
        { status: 400 }
      );
    }

    const input = parsed.data;
    const isEn = input.locale === "en";
    const zai = await ZAI.create();

    const upstream = (await zai.chat.completions.create({
      messages: [
        {
          role: "assistant",
          content: isEn ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: isEn ? buildUserPromptEn(input) : buildUserPrompt(input),
        },
      ],
      thinking: { type: "disabled" },
      stream: true,
    })) as unknown;

    const encoder = new TextEncoder();

    // 上游未返回流（返回了完整 JSON）→ 兜底为一次性输出
    if (!(upstream instanceof ReadableStream)) {
      const fallback =
        (upstream as { choices?: { message?: { content?: string } }[] })
          ?.choices?.[0]?.message?.content?.trim() ?? "";
      if (!fallback || fallback.length < 100) {
        return NextResponse.json(
          {
            ok: false,
            error: isEn
              ? "Roadmap generation failed — please try again shortly"
              : "路线图生成失败，请稍后重试",
          },
          { status: 502 }
        );
      }
      const persisted = await persistRoadmap(input, fallback);
      return NextResponse.json({ ok: true, markdown: fallback, persisted });
    }

    const reader = upstream.getReader();
    const decoder = new TextDecoder();

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const send = (obj: Record<string, unknown>) => {
          try {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(obj)}\n\n`)
            );
          } catch {
            /* 客户端已断开 */
          }
        };

        let full = "";
        let sseBuf = "";

        try {
          // 透传上游 SSE：解析 data: 行中的 delta.content，重新以自定义事件下发
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

          const markdown = full.trim();
          if (!markdown || markdown.length < 100) {
            send({
              type: "error",
              error: isEn
                ? "Roadmap generation failed — please try again shortly"
                : "路线图生成失败，请稍后重试",
            });
          } else {
            const persisted = await persistRoadmap(input, markdown);
            send({ type: "done", persisted, length: markdown.length });
          }
        } catch (err) {
          console.error("[api/roadmap/generate] stream failed:", err);
          if (full.trim().length >= 100) {
            // 已经有大部分内容 → 按完成处理
            const persisted = await persistRoadmap(input, full.trim());
            send({ type: "done", persisted, length: full.trim().length });
          } else {
            send({ type: "error", error: isEn ? "Generation interrupted — try again shortly or reach Buster on WeChat: busterl1" : "生成中断，请稍后重试或微信联系 busterl1" });
          }
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
        reader.cancel().catch(() => {});
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("[api/roadmap/generate] POST failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Generation service temporarily unavailable — try again shortly or reach Buster on WeChat: busterl1 / 生成服务暂时不可用，请稍后重试或直接微信联系 busterl1",
      },
      { status: 500 }
    );
  }
}

/** 生成结果回写线索：leadId 优先，邮箱兜底；并写入邮件发件队列（outbox 模式）；失败不影响返回 */
async function persistRoadmap(
  input: z.infer<typeof schema>,
  markdown: string
): Promise<number> {
  try {
    let leadId = input.leadId ?? null;
    if (leadId) {
      const res = await db.lead.updateMany({
        where: { id: leadId },
        data: { roadmapMd: markdown },
      });
      if (res.count === 0) leadId = null; // leadId 无效 → 走邮箱兜底
    }
    if (!leadId) {
      const nearest = await db.lead.findFirst({
        where: { contact: input.email.toLowerCase(), source: "roadmap" },
        orderBy: { createdAt: "desc" },
        select: { id: true },
      });
      if (nearest) {
        leadId = nearest.id;
        await db.lead.update({
          where: { id: nearest.id },
          data: { roadmapMd: markdown },
        });
      }
    }

    // 邮件出队：正文 = 完整路线图（SMTP 接入后由 worker 消费发送；主题随 locale）
    if (input.email) {
      try {
        await db.emailOutbox.create({
          data: {
            to: input.email.toLowerCase(),
            subject:
              input.locale === "en"
                ? `${input.brandName} · Your full 14-week BHAI AI roadmap`
                : `${input.brandName} · 你的 BHAI 完整 14 周 AI 路线图`,
            bodyMd: markdown,
            leadId,
          },
        });
      } catch (outboxErr) {
        console.error("[api/roadmap/generate] outbox enqueue failed:", outboxErr);
      }
    }

    return leadId ? 1 : 0;
  } catch (dbErr) {
    console.error("[api/roadmap/generate] persist failed:", dbErr);
    return 0;
  }
}
