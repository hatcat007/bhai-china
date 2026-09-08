import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_TOKEN_TTL_MS,
  createAdminToken,
  verifyAdminPassword,
} from "@/lib/admin-auth";

/**
 * 管理台登录 / 登出
 * POST { password } → 校验通过则种 httpOnly 签名 cookie（7 天）
 * DELETE → 清除 cookie（登出）
 */
/* ---------- 登录防爆破：每 IP 5 次失败锁 15 分钟 ---------- */
const failMap = new Map<string, { count: number; lockedUntil: number }>();
const MAX_FAILS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

function getLockRemaining(ip: string): number {
  const entry = failMap.get(ip);
  if (!entry) return 0;
  return Math.max(0, entry.lockedUntil - Date.now());
}

function recordFail(ip: string) {
  const entry = failMap.get(ip) ?? { count: 0, lockedUntil: 0 };
  entry.count += 1;
  if (entry.count >= MAX_FAILS) {
    entry.lockedUntil = Date.now() + LOCKOUT_MS;
    entry.count = 0;
  }
  failMap.set(ip, entry);
  // 防止 Map 无限增长
  if (failMap.size > 10000) failMap.clear();
}

function clearFails(ip: string) {
  failMap.delete(ip);
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";

    const lockedMs = getLockRemaining(ip);
    if (lockedMs > 0) {
      const mins = Math.ceil(lockedMs / 60000);
      return NextResponse.json(
        { ok: false, error: `失败次数过多，已临时锁定，请 ${mins} 分钟后再试` },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const password =
      body && typeof body.password === "string" ? body.password : "";

    if (!password || !verifyAdminPassword(password)) {
      recordFail(ip);
      // 轻微延迟，增加暴力破解成本
      await new Promise((r) => setTimeout(r, 400));
      if (getLockRemaining(ip) > 0) {
        return NextResponse.json(
          { ok: false, error: "失败次数过多，已临时锁定，请 15 分钟后再试" },
          { status: 429 }
        );
      }
      const fails = failMap.get(ip)?.count ?? 0;
      const left = MAX_FAILS - fails;
      return NextResponse.json(
        {
          ok: false,
          error:
            left <= 2
              ? `密码错误，还剩 ${left} 次机会，超过后将锁定 15 分钟`
              : "密码错误，请重试",
        },
        { status: 401 }
      );
    }

    clearFails(ip);
    const token = await createAdminToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: ADMIN_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: Math.floor(ADMIN_TOKEN_TTL_MS / 1000),
    });
    return res;
  } catch (err) {
    console.error("[api/admin/login] POST failed:", err);
    return NextResponse.json(
      { ok: false, error: "服务器错误" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: ADMIN_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
