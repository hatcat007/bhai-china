import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-auth";

/**
 * 管理台鉴权代理（Next.js 16 proxy 约定，替代旧 middleware）
 * - /admin/**（页面）：未登录 → 302 到 /admin/login；已登录访问 /admin/login → 302 回 /admin
 * - /api/admin/**：未登录 → 401 JSON
 * - /api/leads：POST 放行（预约/路线图公开表单），GET 及 /api/leads/[id] PATCH/DELETE 需登录
 */
export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authed = await verifyAdminToken(
    req.cookies.get(ADMIN_COOKIE)?.value
  );

  // 登录页：已登录则跳回管理台
  if (pathname === "/admin/login") {
    if (authed) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // 管理台页面
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (!authed) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
  }

  // 登录/登出接口本身放行（POST=登录，DELETE=登出）
  if (pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  // 公开写接口：线索创建（预约表单 / 路线图向导使用）
  if (pathname === "/api/leads" && req.method === "POST") {
    return NextResponse.next();
  }

  // 其余受保护 API
  if (!authed) {
    return NextResponse.json(
      { ok: false, error: "未授权：请先登录管理台" },
      { status: 401 }
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/leads",
    "/api/leads/:path*",
  ],
};
