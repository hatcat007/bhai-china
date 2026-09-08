import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const newsletterSchema = z.object({
  email: z.string().trim().email("请输入有效的邮箱地址").max(160),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "邮箱无效" },
        { status: 400 }
      );
    }

    const email = parsed.data.email.toLowerCase();

    await db.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    return NextResponse.json({ ok: true, message: "订阅成功" }, { status: 201 });
  } catch (err) {
    console.error("[api/newsletter] POST failed:", err);
    return NextResponse.json(
      { ok: false, error: "服务器错误，请稍后重试" },
      { status: 500 }
    );
  }
}
