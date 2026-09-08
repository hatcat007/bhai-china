/**
 * BHAI 管理台鉴权工具
 * - HMAC-SHA256 签名 token（payload = 过期时间戳）
 * - 使用 Web Crypto API（crypto.subtle），同时兼容 Edge Middleware 与 Node 运行时
 * - Token 通过 httpOnly cookie 传递（默认 7 天有效）
 */

export const ADMIN_COOKIE = "bhai_admin";
export const ADMIN_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 天

function getSecret(): string {
  return (
    process.env.ADMIN_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "bhai-dev-secret-change-me"
  );
}

function base64url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmacSign(data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return base64url(new Uint8Array(sig));
}

/** 常数时间字符串比较，避免时序攻击 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/** 生成签名 token：`${expiresAtMs}.${hmac(expiresAtMs)}` */
export async function createAdminToken(): Promise<string> {
  const expiresAt = String(Date.now() + ADMIN_TOKEN_TTL_MS);
  const sig = await hmacSign(expiresAt);
  return `${expiresAt}.${sig}`;
}

/** 校验 token 签名与有效期 */
export async function verifyAdminToken(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^\d+$/.test(payload)) return false;
  const expected = await hmacSign(payload);
  if (!timingSafeEqual(sig, expected)) return false;
  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

/** 校验明文密码（登录接口用） */
export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  return timingSafeEqual(password, expected);
}
