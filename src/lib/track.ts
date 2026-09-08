/**
 * 轻量漏斗埋点（无 PII）：fire-and-forget，绝不阻塞主流程、绝不抛错。
 * 服务端落 Prisma TrackEvent（/api/track），管理台「增长漏斗」卡片消费。
 * 事件白名单在路由端校验，未知名静默丢弃。
 */

const ENDPOINT = "/api/track";

export type TrackName =
  | "scan_start"
  | "scan_complete"
  | "scan_fail"
  | "tool_start"
  | "tool_complete"
  | "tool_error"
  | "unlock_modal"
  | "unlock_success"
  | "shot_fallback";

export function track(
  name: TrackName,
  opts: { tool?: string; meta?: string } = {}
): void {
  if (typeof window === "undefined") return;
  const body = JSON.stringify({
    name,
    tool: opts.tool,
    meta: opts.meta ? opts.meta.slice(0, 120) : undefined,
  });
  try {
    // keepalive 保证页面即将卸载时也能发出；失败完全静默
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* noop */
  }
}
