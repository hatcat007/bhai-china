/**
 * BHAI One-shot Screenshot Runner（每次调用 = 一个全新短生命周期进程）
 * 用法: bun shot-one.ts <url> <outPngPath>
 * 成功时 stdout 末行输出: {"ok":true,"dismissed":true,"bytes":N,"ms":N}
 * 退出码: 0 成功 / 1 参数或目标无效 / 2 硬超时 / 3 截图失败
 *
 * 架构说明（重要，2026-09 黑屏事故复盘结论）：
 * - 原常驻服务（Bun.serve + 常驻 chromium）在本沙盒内反复出现「协议执行到一半
 *   永久停滞且无任何报错」（browser ready → goto done → settle done 后卡死），
 *   换 --hot / 常驻 / route 拉起等运行方式均可复现；
 * - 而完全相同的 Playwright 操作在「一次性前台进程」中 3/3 稳定跑通；
 * - 故改为：API 路由（src/app/api/scan-shot）按请求 spawn 本脚本（带硬超时），
 *   结果由路由层内存缓存（10 分钟 LRU）。单飞由路由层排队 + 429 控制。
 *
 * 功能不变：打开目标页 → 两轮扫描主文档+全部子 frame 自动点击「接受 cookie」
 * （覆盖 OneTrust / Cookiebot / CookieYes / Google Funding Choices / TrustArc /
 * Iubenda / Complianz / Usercentrics / Quantcast）→ 注入 CSS 隐藏残留横幅并
 * 解锁滚动 → 拉高视口 1280×2600 触发懒加载 → 回顶 → PNG。
 */

import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
// playwright 为全局安装（/home/z/.npm-global），浏览器复用 ~/.cache/ms-playwright
const { chromium } = require("/home/z/.npm-global/lib/node_modules/playwright");

const HARD_DEADLINE_MS = 50_000;
const GOTO_TIMEOUT_MS = 20_000;
const VIEWPORT = { width: 1280, height: 900 };
const TALL_VIEWPORT = { width: 1280, height: 2600 };
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

function emit(payload) {
  console.log(JSON.stringify(payload));
}

const step = (m: string) => console.error(`[shot-one] ${m} +${Date.now() - t0}ms`);

/* ---------- 硬超时：绝不挂过路由的 52s 代理死线 ---------- */
setTimeout(() => {
  emit({ ok: false, error: "hard deadline exceeded" });
  process.exit(2);
}, HARD_DEADLINE_MS).unref?.();

const urlArg = process.argv[2];
const outArg = process.argv[3];
if (!urlArg || !outArg) {
  emit({ ok: false, error: "usage: bun shot-one.ts <url> <outPngPath>" });
  process.exit(1);
}

/* ---------- SSRF 防护：仅公网 http(s)（与路由层校验双保险） ---------- */
function validateTarget(raw) {
  if (!raw || raw.length > 500) return null;
  let s = raw.trim();
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  let u;
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
    h === "[::1]" ||
    /^127\./.test(h) ||
    /^10\./.test(h) ||
    /^192\.168\./.test(h) ||
    /^169\.254\./.test(h) ||
    /^0\./.test(h) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(h);
  if (blocked || !h.includes(".")) return null;
  return u.toString();
}

const target = validateTarget(urlArg);
if (!target) {
  emit({ ok: false, error: "invalid target" });
  process.exit(1);
}

/* ---------- cookie 弹窗自动关闭（与原常驻服务同一套启发式） ---------- */
const ACCEPT_SELECTORS = [
  // OneTrust
  "#onetrust-accept-btn-handler",
  // Cookiebot (Usercentrics AB)
  "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll",
  "#CybotCookiebotDialogBodyButtonAccept",
  // CookieYes
  ".cky-btn-accept-all",
  ".cky-btn-accept",
  // Google Funding Choices
  ".fc-cta-consent",
  ".fc-cta-agree",
  // TrustArc
  "#truste-consent-button",
  // Iubenda
  ".iubenda-cs-accept-btn",
  // Complianz (WordPress)
  "#cmplz-accept-all",
  // Usercentrics（open shadow DOM，Playwright 可穿透）
  "#usercentrics-root button[data-testid='uc-accept-all-button']",
  // Quantcast
  "div[class*='qc-cmp2'] button[mode='primary']",
  // 泛化属性匹配
  "button[id*='accept' i]",
  "button[class*='accept' i]",
  "a[class*='accept' i]",
  "button[aria-label*='accept' i]",
  "button[title*='accept' i]",
  "[role='button'][aria-label*='accept' i]",
  // 文本匹配（Playwright :has-text，多语言）
  "button:has-text('Accept all')",
  "button:has-text('Accept All')",
  "button:has-text('Accept')",
  "button:has-text('I agree')",
  "button:has-text('Allow all')",
  "button:has-text('Allow All')",
  "button:has-text('Consent')",
  "button:has-text('Agree')",
  "button:has-text('Akzeptieren')",
  "button:has-text('Alle akzeptieren')",
  "button:has-text('Accepter')",
  "button:has-text('Tout accepter')",
  "button:has-text('Godkend')",
  "button:has-text('Godkänn')",
  "button:has-text('同意')",
  "button:has-text('接受全部')",
  "button:has-text('接受')",
];

// 防误点：「拒绝 / 仅必要」类按钮
const NEGATIVE_TEXT =
  /don'?t\s|do\snot|reject|refuse|decline|deny|ablehnen|refuser|nur\snotwendige|only\snecessary|essential|necessary\sonly|拒绝|不同意/i;

async function tryDismissInFrame(frame) {
  for (const sel of ACCEPT_SELECTORS) {
    try {
      const loc = frame.locator(sel).first();
      // 注意必须 await：isVisible() 返回 Promise，`!Promise` 恒为 false，
      // 漏 await 会让所有不可见选择器跌落到 textContent 的 300ms 超时，
      // 且未等待的 isVisible 求值在 CDP 连接上无限堆积（ stalled 根因）
      const visible = await loc.isVisible();
      if (!visible) continue;
      const txt = (await loc.textContent({ timeout: 300 }).catch(() => "")) || "";
      if (NEGATIVE_TEXT.test(txt)) continue;
      await loc.click({ timeout: 1500, noWaitAfter: true });
      await frame.page().waitForTimeout(400);
      return true;
    } catch {
      /* 选择器不匹配 / 不可点 / frame 销毁 → 下一个 */
    }
  }
  return false;
}

// 兜底：隐藏已知横幅容器 + 解锁滚动
const HIDE_CSS = `
#onetrust-banner-sdk, #onetrust-consent-sdk, #onetrust-pc-sdk,
#CybotCookiebotDialog, #CybotCookiebotDialogBody, #cookiebanner-wrapper,
.cky-consent-container, .cky-overlay, .cookie-banner, .cookie-banner-wrapper,
#cookie-banner, #cookie_banner, #cookieconsent, #cookie-consent,
[class*="cookieconsent"], [class*="cookie-consent"], [id*="cookie-banner"],
.fc-consent-root, .fc-dialog-overlay, #sp_message_container_id,
#cmplz-cookiebanner-container, .cmplz-blocked-content-notice,
.iubenda-cs-container, .iubenda-cs-banner, #truste-consent-track,
#usercentrics-root, #quantcast-stack, .qc-cmp2-container,
div[role="dialog"][aria-label*="consent" i],
div[class*="ConsentBanner"], div[id*="ConsentBanner"],
div[class*="CookieBanner"], div[id*="CookieBanner"]
{ display: none !important; visibility: hidden !important; }
html, body { overflow: visible !important; }
body[class*="cookie"] { overflow: auto !important; }
`;

/* ---------- 主流程 ---------- */
const t0 = Date.now();
let browser = null;
try {
  browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-extensions",
      "--mute-audio",
      "--disable-background-networking",
    ],
  });
  step("launched");
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    userAgent: UA,
    locale: "en-US",
    ignoreHTTPSErrors: true,
  });
  const page = await ctx.newPage();
  await page.goto(target, { waitUntil: "domcontentloaded", timeout: GOTO_TIMEOUT_MS });
  step("goto done");
  await page.waitForTimeout(1200);
  step("settle done");

  // 两轮扫描（部分 CMP 晚挂载 / SPA 延迟渲染）：主文档 + 所有子 frame（含跨域）
  let dismissed = false;
  for (let pass = 0; pass < 2 && !dismissed; pass++) {
    for (const fr of page.frames()) {
      try {
        if (await tryDismissInFrame(fr)) {
          dismissed = true;
          break;
        }
      } catch {
        /* frame 销毁等瞬态错误 */
      }
    }
    if (!dismissed) await page.waitForTimeout(600);
  }
  step(`dismiss done (dismissed=${dismissed})`);

  // 隐藏残留横幅 + 解锁滚动
  await page.addStyleTag({ content: HIDE_CSS }).catch(() => {});
  step("hide-css done");

  // 拉高视口触发懒加载后回顶
  await page.setViewportSize(TALL_VIEWPORT).catch(() => {});
  step("viewport done");
  await page
    .evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    .catch(() => {});
  step("scroll-bottom done");
  await page.waitForTimeout(700);
  await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
  step("scroll-top done");
  await page.waitForTimeout(400);

  const buf = await page.screenshot({ type: "png", timeout: 8000 });
  step("screenshot done");
  fs.writeFileSync(outArg, buf);
  emit({ ok: true, dismissed, bytes: buf.length, ms: Date.now() - t0 });
  process.exit(0);
} catch (err) {
  emit({ ok: false, error: String(err?.message || err).slice(0, 200), ms: Date.now() - t0 });
  process.exit(3);
} finally {
  try {
    if (browser) await browser.close();
  } catch {
    /* noop */
  }
}
