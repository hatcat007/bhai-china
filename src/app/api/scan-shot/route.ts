import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import crypto from "crypto";

/**
 * GET /api/scan-shot?url=<https-url>
 * 网站扫描器的「干净截图」端点（自动关闭目标站 cookie 弹窗后截图）。
 *
 * 架构（2026-09 黑屏事故复盘）：常驻 chromium 自动化在本沙盒内会无报错永久停滞，
 * 而一次性短进程稳定 → 本路由按请求 spawn mini-services/screenshot-service/shot-one.ts
 * （bun shot-one.ts <url> <tmp.png>，硬超时 50s），成功后读图、写缓存、返回 PNG。
 * - 内存缓存：同址 10 分钟 LRU（≤12 条），重复扫描秒回
 * - 单飞：同一时刻只跑 1 个截图进程，多余请求直接 429（前端自动走公共截图回退链）
 * - SSRF 防护：仅公网 http(s)，拒绝 localhost/内网段（shot-one 内部二次校验）
 * 失败一律 4xx/5xx，前端 <img> onError 自动回退 mShots → thum.io → 模拟站点。
 */

const RUNNER = "/home/z/my-project/mini-services/screenshot-service/shot-one.ts";
const RUNNER_CWD = "/home/z/my-project/mini-services/screenshot-service";
const SHOT_TIMEOUT_MS = 52_000; // 覆盖 shot-one 内部 50s 硬超时
const FRONTEND_BUDGET_MS = 40_000; // 前端 attempt-0 超时，须大于本路由常见耗时

type ShotCacheEntry = { body: ArrayBuffer; cookieDismissed: string; at: number };
const shotCache = new Map<string, ShotCacheEntry>();
const SHOT_CACHE_TTL_MS = 10 * 60_000;
const SHOT_CACHE_MAX = 12;

function shotCacheGet(key: string): ShotCacheEntry | null {
  const hit = shotCache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > SHOT_CACHE_TTL_MS) {
    shotCache.delete(key);
    return null;
  }
  return hit;
}

function shotCachePut(key: string, entry: ShotCacheEntry): void {
  shotCache.delete(key); // 刷新插入顺序，Map 迭代序即 LRU 序
  shotCache.set(key, entry);
  while (shotCache.size > SHOT_CACHE_MAX) {
    const oldest = shotCache.keys().next().value;
    if (oldest === undefined) break;
    shotCache.delete(oldest);
  }
}

function validateTarget(raw: string | null): string | null {
  if (!raw || raw.length > 500) return null;
  let s = raw.trim();
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  let u: URL;
  try {
    u = new URL(s);
  } catch {
    return null;
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return null;
  const h = u.hostname.toLowerCase();
  const blocked =
    h === "localhost" ||
    h.endsWith(".localhost") ||
    h.endsWith(".local") ||
    h.endsWith(".internal") ||
    h === "::1" ||
    /^127\./.test(h) ||
    /^10\./.test(h) ||
    /^192\.168\./.test(h) ||
    /^169\.254\./.test(h) ||
    /^0\./.test(h) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(h);
  if (blocked || !h.includes(".")) return null;
  return u.toString();
}

/* ---------- 单飞：全局仅 1 个截图进程在跑 ---------- */
let shotInFlight: Promise<{ buf: ArrayBuffer; cookieDismissed: string }> | null = null;

function runOneShot(target: string): Promise<{ buf: ArrayBuffer; cookieDismissed: string }> {
  return new Promise((resolve, reject) => {
    const tmpOut = path.join(
      os.tmpdir(),
      `bhai-shot-${crypto.createHash("sha1").update(target).digest("hex").slice(0, 12)}.png`
    );
    try {
      fs.rmSync(tmpOut, { force: true });
    } catch {
      /* noop */
    }

    const child = spawn("bun", [RUNNER, target, tmpOut], {
      cwd: RUNNER_CWD,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let settled = false;
    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(killer);
      fn();
    };
    const killer = setTimeout(() => {
      try {
        child.kill("SIGKILL");
      } catch {
        /* noop */
      }
      finish(() => reject(new Error("shot timeout")));
    }, SHOT_TIMEOUT_MS);

    child.stdout.on("data", (d) => {
      stdout += String(d);
    });
    child.on("error", (err) => finish(() => reject(err)));
    child.on("exit", (code) => {
      finish(() => {
        let meta: { ok?: boolean; dismissed?: boolean; error?: string } | null = null;
        for (const line of stdout.trim().split("\n").reverse()) {
          try {
            meta = JSON.parse(line);
            break;
          } catch {
            /* 跳过非 JSON 行 */
          }
        }
        if (code === 0 && meta?.ok) {
          try {
            const body = fs.readFileSync(tmpOut);
            const ab = body.buffer.slice(
              body.byteOffset,
              body.byteOffset + body.byteLength
            ) as ArrayBuffer;
            resolve({ buf: ab, cookieDismissed: meta.dismissed ? "1" : "0" });
            return;
          } catch (err) {
            reject(err);
            return;
          }
        }
        reject(new Error(meta?.error || `runner exit ${code}`));
      });
    });
  });
}

export async function GET(req: NextRequest) {
  const target = validateTarget(req.nextUrl.searchParams.get("url"));
  if (!target) {
    return NextResponse.json({ ok: false, error: "invalid url" }, { status: 400 });
  }

  // 命中缓存 → 直接回传（浏览器侧另有 Cache-Control: max-age=1800 兜底）
  const hit = shotCacheGet(target);
  if (hit) {
    return new NextResponse(hit.body, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=1800",
        "X-Cookie-Dismissed": hit.cookieDismissed,
        "X-Shot-Cache": "hit",
      },
    });
  }

  // 单飞：已有截图在跑 → 立即 429，前端 onError 秒级走公共截图回退链（不白等）
  if (shotInFlight) {
    return NextResponse.json(
      { ok: false, error: "screenshot busy" },
      { status: 429, headers: { "Retry-After": "5" } }
    );
  }

  shotInFlight = runOneShot(target);
  try {
    const { buf, cookieDismissed } = await shotInFlight;
    shotCachePut(target, { body: buf, cookieDismissed, at: Date.now() });
    console.log(
      `[api/scan-shot] ok ${target} ${buf.byteLength}B dismissed=${cookieDismissed}`
    );
    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=1800",
        "X-Cookie-Dismissed": cookieDismissed,
      },
    });
  } catch (err) {
    console.error("[api/scan-shot] failed:", target, err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "screenshot failed" },
      { status: 502 }
    );
  } finally {
    shotInFlight = null;
  }
}
