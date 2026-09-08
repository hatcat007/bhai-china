import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// 管理端总览：线索 + 订阅 + 统计（一次性拉齐）
// 鉴权由 src/middleware.ts 统一强制（/api/admin/* 需有效管理员 cookie）
export async function GET() {
  try {
    const [leads, subscribers, bookingCount, roadmapCount] = await Promise.all([
      db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
      db.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
      db.lead.count({ where: { source: "booking" } }),
      db.lead.count({ where: { source: "roadmap" } }),
    ]);

    const statusCount = {
      new: await db.lead.count({ where: { status: "new" } }),
      contacted: await db.lead.count({ where: { status: "contacted" } }),
      qualified: await db.lead.count({ where: { status: "qualified" } }),
      closed: await db.lead.count({ where: { status: "closed" } }),
    };

    return NextResponse.json({
      ok: true,
      stats: {
        totalLeads: leads.length,
        bookingCount,
        roadmapCount,
        subscriberCount: subscribers.length,
        statusCount,
      },
      leads,
      subscribers,
    });
  } catch (err) {
    console.error("[api/admin/overview] GET failed:", err);
    return NextResponse.json(
      { ok: false, error: "服务器错误" },
      { status: 500 }
    );
  }
}
