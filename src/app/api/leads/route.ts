import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const leadSchema = z.object({
  name: z.string().trim().min(1, "姓名不能为空").max(80),
  contact: z
    .string()
    .trim()
    .min(3, "请填写微信号或邮箱")
    .max(120),
  brand: z.string().trim().max(80).optional().or(z.literal("")),
  revenueRange: z.string().trim().max(40).optional().or(z.literal("")),
  stage: z.string().trim().max(40).optional().or(z.literal("")),
  painPoint: z.string().trim().max(80).optional().or(z.literal("")),
  chinaPresence: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  source: z.enum(["booking", "roadmap", "tools"]).default("booking"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "提交数据无效";
      return NextResponse.json(
        { ok: false, error: firstError },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const lead = await db.lead.create({
      data: {
        name: data.name,
        contact: data.contact,
        brand: data.brand || null,
        revenueRange: data.revenueRange || null,
        stage: data.stage || null,
        painPoint: data.painPoint || null,
        chinaPresence: data.chinaPresence || null,
        message: data.message || null,
        source: data.source,
      },
    });

    return NextResponse.json({ ok: true, leadId: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[api/leads] POST failed:", err);
    return NextResponse.json(
      { ok: false, error: "服务器错误，请稍后重试或直接微信联系 busterl1" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ ok: true, count: leads.length, leads });
  } catch (err) {
    console.error("[api/leads] GET failed:", err);
    return NextResponse.json(
      { ok: false, error: "服务器错误" },
      { status: 500 }
    );
  }
}
