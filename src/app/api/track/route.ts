import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/track — 漏斗埋点（公开、无 PII、fire-and-forget）
 * body: { name: TrackName, tool?: slug, meta?: string(≤120) }
 * - 事件名白名单校验，未知名 400 丢弃（防脏数据灌库）
 * - 同 name+tool 60s 内存节流（防连点灌水）
 * - 任何异常都返回 204，绝不影响前端主流程
 */

const ALLOWED = new Set([
  "scan_start",
  "scan_complete",
  "scan_fail",
  "tool_start",
  "tool_complete",
  "tool_error",
  "unlock_modal",
  "unlock_success",
  "shot_fallback",
]);

type Payload = { name?: string; tool?: string; meta?: string };

// 内存节流表：key → 上次记录时间（单实例足够；多实例时可换 Redis）
const seen = new Map<string, number>();
const THROTTLE_MS = 60_000;
const SEEN_MAX = 5000;

function throttled(key: string): boolean {
  const now = Date.now();
  const last = seen.get(key);
  if (last && now - last < THROTTLE_MS) return true;
  if (seen.size > SEEN_MAX) seen.clear(); // 粗暴防膨胀
  seen.set(key, now);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as Payload | null;
    const name = body?.name ?? "";
    if (!ALLOWED.has(name)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const tool =
      typeof body?.tool === "string" && body.tool.length <= 40
        ? body.tool
        : null;
    const meta =
      typeof body?.meta === "string" && body.meta.trim().length > 0
        ? body.meta.trim().slice(0, 120)
        : null;

    if (throttled(`${name}:${tool ?? ""}`)) {
      return new NextResponse(null, { status: 204 });
    }

    const { db } = await import("@/lib/db");
    await db.trackEvent.create({ data: { name, tool, meta } });
    return new NextResponse(null, { status: 204 });
  } catch {
    // 埋点失败永远静默
    return new NextResponse(null, { status: 204 });
  }
}
