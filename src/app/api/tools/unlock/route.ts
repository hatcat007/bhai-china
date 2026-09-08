import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

/**
 * POST /api/tools/unlock — 免费工具解锁（留邮箱换无限次）
 * 背景：/api/leads 的 source 目前是 booking|roadmap 枚举，客户端会先尝试
 * POST /api/leads (source:"tools")，若被拒则落到本接口，直接以 source="tools"
 * 写入 Lead 表（schema 中 source 为 String，可存）。
 * body: { email: string, slug: string }
 */

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(5, "请填写有效邮箱")
    .max(160)
    .email("请填写有效邮箱"),
  slug: z.string().trim().min(1).max(60),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "请填写有效邮箱" },
        { status: 400 }
      );
    }

    const { email, slug } = parsed.data;

    const lead = await db.lead.create({
      data: {
        name: "工具用户",
        contact: email.toLowerCase(),
        source: "tools",
        message: `解锁工具: ${slug}`,
      },
    });

    return NextResponse.json({ ok: true, leadId: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[api/tools/unlock] POST failed:", err);
    return NextResponse.json(
      { ok: false, error: "服务器错误，请稍后重试或直接微信联系 busterl1" },
      { status: 500 }
    );
  }
}
