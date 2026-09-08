import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/admin/funnel — 管理台「增长漏斗」数据（鉴权由 middleware 统一强制）
 * 返回：
 * - events: 近 7 天按事件名计数（漏斗主视图）
 * - byTool: 近 7 天 tool_start / scan_start 按工具分布（哪个工具最受欢迎）
 * - daily:  近 7 天每日 tool_start+scan_start 走势
 * - recent: 最近 20 条原始事件（调试观察）
 */

export async function GET() {
  try {
    const since = new Date(Date.now() - 7 * 24 * 3600_000);

    const [events, byToolRaw, dailyRaw, recent] = await Promise.all([
      db.trackEvent.groupBy({
        by: ["name"],
        where: { createdAt: { gte: since } },
        _count: { _all: true },
      }),
      db.trackEvent.groupBy({
        by: ["tool"],
        where: {
          createdAt: { gte: since },
          name: { in: ["scan_start", "tool_start"] },
          tool: { not: null },
        },
        _count: { _all: true },
      }),
      db.trackEvent.findMany({
        where: {
          createdAt: { gte: since },
          name: { in: ["scan_start", "tool_start"] },
        },
        select: { createdAt: true },
      }),
      db.trackEvent.findMany({
        orderBy: { createdAt: "desc" },
        take: 20,
        select: { name: true, tool: true, meta: true, createdAt: true },
      }),
    ]);

    const byTool = byToolRaw
      .map((r) => ({ tool: r.tool ?? "?", count: r._count._all }))
      .sort((a, b) => b.count - a.count);

    // 近 7 天逐日（含今日），老 → 新
    const days: string[] = [];
    for (let i = 6; i >= 0; i--) {
      days.push(
        new Date(Date.now() - i * 24 * 3600_000).toISOString().slice(0, 10)
      );
    }
    const dailyCount = new Map<string, number>(days.map((d) => [d, 0]));
    for (const row of dailyRaw) {
      const key = row.createdAt.toISOString().slice(0, 10);
      dailyCount.set(key, (dailyCount.get(key) ?? 0) + 1);
    }
    const daily = days.map((d) => ({ date: d, count: dailyCount.get(d) ?? 0 }));

    return NextResponse.json({
      events: events
        .map((r) => ({ name: r.name, count: r._count._all }))
        .sort((a, b) => b.count - a.count),
      byTool,
      daily,
      recent,
    });
  } catch (err) {
    console.error("[api/admin/funnel] failed:", err);
    return NextResponse.json(
      { error: "读取漏斗数据失败" },
      { status: 500 }
    );
  }
}
