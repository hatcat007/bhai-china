import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { smtpConfigured, sendOutboxEmail } from "@/lib/mailer";

/**
 * 管理端 EmailOutbox 台账 + 手动 flush（鉴权由 proxy 统一强制）
 * GET  /api/admin/outbox        → 最近 30 条 + 状态计数 + smtp 是否已配置
 * POST /api/admin/outbox {take?}→ 逐条发送 queued 邮件（未配置 SMTP 时 400）
 */

export async function GET() {
  try {
    const [rows, queued, sent, failed] = await Promise.all([
      db.emailOutbox.findMany({
        orderBy: { createdAt: "desc" },
        take: 30,
        select: {
          id: true,
          to: true,
          subject: true,
          status: true,
          error: true,
          createdAt: true,
          sentAt: true,
        },
      }),
      db.emailOutbox.count({ where: { status: "queued" } }),
      db.emailOutbox.count({ where: { status: "sent" } }),
      db.emailOutbox.count({ where: { status: "failed" } }),
    ]);

    return NextResponse.json({
      ok: true,
      smtpConfigured: smtpConfigured(),
      counts: { queued, sent, failed },
      rows,
    });
  } catch (err) {
    console.error("[api/admin/outbox] GET failed:", err);
    return NextResponse.json({ ok: false, error: "服务器错误" }, { status: 500 });
  }
}

const flushSchema = z.object({
  take: z.number().int().min(1).max(20).default(5),
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const parsed = flushSchema.safeParse(body);
    const take = parsed.success ? parsed.data.take : 5;

    if (!smtpConfigured()) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "SMTP 未配置：请在环境变量设置 SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS（可留 SMTP_FROM），配置后即可真发",
        },
        { status: 400 }
      );
    }

    const queued = await db.emailOutbox.findMany({
      where: { status: "queued" },
      orderBy: { createdAt: "asc" },
      take,
    });

    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const row of queued) {
      const result = await sendOutboxEmail({
        to: row.to,
        subject: row.subject,
        bodyMd: row.bodyMd,
      });
      if (result.ok) {
        await db.emailOutbox.update({
          where: { id: row.id },
          data: { status: "sent", sentAt: new Date(), error: null },
        });
        sent += 1;
      } else {
        await db.emailOutbox.update({
          where: { id: row.id },
          data: { status: "failed", error: result.error.slice(0, 500) },
        });
        failed += 1;
        errors.push(`${row.to}: ${result.error.slice(0, 120)}`);
      }
    }

    return NextResponse.json({
      ok: true,
      attempted: queued.length,
      sent,
      failed,
      errors: errors.slice(0, 5),
    });
  } catch (err) {
    console.error("[api/admin/outbox] POST failed:", err);
    return NextResponse.json({ ok: false, error: "服务器错误" }, { status: 500 });
  }
}
