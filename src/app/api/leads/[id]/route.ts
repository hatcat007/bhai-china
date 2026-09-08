import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const patchSchema = z.object({
  status: z.enum(["new", "contacted", "qualified", "closed"]),
});

const ALLOWED_STATUS = ["new", "contacted", "qualified", "closed"] as const;

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: `status 必须是：${ALLOWED_STATUS.join(" / ")}`,
        },
        { status: 400 }
      );
    }

    const existing = await db.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "线索不存在" },
        { status: 404 }
      );
    }

    const lead = await db.lead.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    return NextResponse.json({ ok: true, lead });
  } catch (err) {
    console.error("[api/leads/[id]] PATCH failed:", err);
    return NextResponse.json(
      { ok: false, error: "服务器错误" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await db.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "线索不存在" },
        { status: 404 }
      );
    }
    await db.lead.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/leads/[id]] DELETE failed:", err);
    return NextResponse.json(
      { ok: false, error: "服务器错误" },
      { status: 500 }
    );
  }
}
