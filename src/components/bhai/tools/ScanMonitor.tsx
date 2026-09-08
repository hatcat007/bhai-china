"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Globe, Loader2, Radar } from "lucide-react";
import { track } from "@/lib/track";
import { useLang } from "@/lib/i18n";

/**
 * 网站扫描监视器（网站 AI 缺口扫描专用可视化）
 * - 目标网站真实截图（自建干净截图 → mShots → thum.io → CSS 模拟站点四级回退）装进浏览器窗框
 * - 截图加载期间以骨架站点兜底淡入淡出：视口永不黑屏（黑屏事故修复）
 * - 每级截图源带加载超时，挂起自动降级；纯黑帧 / 占位小图识别后降级；模拟站点必达
 * - 扫描期间截图自动向下滚动 + 橙色扫描线同步下扫 + 网格/边角取景框
 * - 后端 SSE stage 事件驱动：阶段日志逐行打印 + 进度条平滑逼近
 * - 组件按 runId 由 ToolRunner 重挂载：每次新扫描从零开始
 * - prefers-reduced-motion：截图静止、扫描线隐藏，仅保留文字进度
 */

const SCAN_DURATION_MS = 9000;
const SCAN_EASING = "cubic-bezier(0.45, 0.05, 0.25, 0.95)";

type ScanMonitorProps = {
  url: string | null;
  active: boolean;
  done: boolean;
  failed: boolean;
  stageLines: string[];
  progress: number;
};

/** 截图源四级回退链（attempt 3 = CSS 模拟站点） */
function screenshotSource(url: string, attempt: number, nonce: number): string {
  switch (attempt) {
    case 0:
      // 自建截图服务：Playwright 打开目标页 → 自动点击「接受 cookie」→
      // 隐藏残留横幅 → 1280×2600 截图（经 /api/scan-shot 代理与自动拉起）
      return `/api/scan-shot?url=${encodeURIComponent(url)}`;
    case 1:
      // mShots 公共服务（可能带 cookie 弹窗 / 灰色占位图）
      return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1280&h=2600${nonce > 0 ? `&r=${nonce}` : ""}`;
    case 2:
      // thum.io 公共服务
      return `https://image.thum.io/get/width/1280/crop/2600/noanimate/${url}`;
    default:
      return "";
  }
}

function prettyHost(url: string | null): string {
  if (!url) return "bhai://scanner";
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** 坏帧检测：部分截图源对失败/被反爬拦截的目标会回传尺寸正常但内容全黑或
 *  均匀深色的位图（bot-blocker 页、空 about:blank 渲染），仅靠 naturalWidth
 *  无法识别。降采样到 48×48 采样亮度：
 *  - 纯黑帧：均值 <3/255 且峰值 <16/255（整帧接近 #000）
 *  - 均匀暗帧：均值 <20/255 且标准差 <3（有底色但无任何结构 —— 真实网站
 *    截图即便全深色主题也必有文字/logo 带来的像素起伏）
 *  阈值保守，避免误杀真正的深色站点。 */
function isBadFrame(img: HTMLImageElement): boolean {
  try {
    const c = document.createElement("canvas");
    c.width = 48;
    c.height = 48;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return false;
    ctx.drawImage(img, 0, 0, 48, 48);
    const d = ctx.getImageData(0, 0, 48, 48).data;
    let sum = 0;
    let max = 0;
    const n = d.length / 4;
    const lum = new Float32Array(n);
    for (let i = 0, j = 0; i < d.length; i += 4, j++) {
      const l = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
      lum[j] = l;
      sum += l;
      if (l > max) max = l;
    }
    const mean = sum / n;
    if (mean < 3 && max < 16) return true; // 纯黑
    let varSum = 0;
    for (let j = 0; j < n; j++) {
      const diff = lum[j] - mean;
      varSum += diff * diff;
    }
    const std = Math.sqrt(varSum / n);
    return mean < 20 && std < 3; // 均匀暗帧（bot-blocker / 空页）
  } catch {
    return false; // canvas 被污染（源无 CORS）→ 跳过检测
  }
}

/* ---------- 状态徽章 ---------- */
function StatusBadge({
  active,
  done,
  failed,
}: {
  active: boolean;
  done: boolean;
  failed: boolean;
}) {
  if (failed) {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/10 px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-red-400">
        SCAN FAILED
      </span>
    );
  }
  if (done) {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-green-500/40 bg-green-500/10 px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-green-400">
        <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden="true" />
        SCAN COMPLETE
      </span>
    );
  }
  if (active) {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-bhai-red/50 bg-bhai-red/10 px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-bhai-red">
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bhai-red opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bhai-red" />
        </span>
        LIVE SCAN
      </span>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#2A2A2A] bg-bhai-card px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-bhai-dim">
      STANDBY
    </span>
  );
}

/* ---------- 外部截图不可用时的 CSS 模拟站点 ---------- */
function MockSite() {
  return (
    <div className="w-full bg-[#0d0d0c] pb-10" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
        <div className="h-3 w-24 rounded bg-white/10" />
        <div className="flex gap-3">
          <div className="h-2.5 w-10 rounded bg-white/[0.07]" />
          <div className="h-2.5 w-10 rounded bg-white/[0.07]" />
          <div className="h-2.5 w-10 rounded bg-white/[0.07]" />
          <div className="h-2.5 w-14 rounded bg-bhai-red/30" />
        </div>
      </div>
      <div className="relative mx-6 mt-8 h-44 overflow-hidden rounded-lg border border-white/5 bg-gradient-to-br from-[#1c1a17] to-[#0f0e0c]">
        <div className="absolute left-6 top-9 space-y-3">
          <div className="h-2.5 w-28 rounded bg-bhai-red/40" />
          <div className="h-6 w-56 rounded bg-white/15" />
          <div className="h-6 w-44 rounded bg-white/10" />
          <div className="mt-5 h-8 w-28 rounded bg-bhai-red/30" />
        </div>
        <div className="absolute right-6 top-6 h-28 w-40 rounded-md bg-white/[0.04]" />
      </div>
      <div className="mx-6 mt-8 grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div
              className="h-24 animate-pulse rounded bg-white/5"
              style={{ animationDelay: `${i * 150}ms` }}
            />
            <div className="h-2.5 w-3/4 rounded bg-white/10" />
            <div className="h-2.5 w-1/2 rounded bg-white/5" />
          </div>
        ))}
      </div>
      <div className="mx-6 mt-8 h-20 rounded border border-white/5 bg-white/[0.03]" />
    </div>
  );
}

/* ---------- 取景框四角 ---------- */
function CornerBrackets() {
  const base = "absolute h-5 w-5 border-bhai-red/60";
  return (
    <>
      <span aria-hidden className={`${base} left-2 top-2 border-l border-t`} />
      <span aria-hidden className={`${base} right-2 top-2 border-r border-t`} />
      <span aria-hidden className={`${base} bottom-2 left-2 border-b border-l`} />
      <span aria-hidden className={`${base} bottom-2 right-2 border-b border-r`} />
    </>
  );
}

export function ScanMonitor({ url, active, done, failed, stageLines, progress }: ScanMonitorProps) {
  const { t } = useLang();
  const s = t.scan;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const scanlineRef = useRef<HTMLDivElement | null>(null);
  const ranRef = useRef(false); // 本轮是否已启动滚动动画
  const prevActiveRef = useRef(false);

  const [attempt, setAttempt] = useState(0); // 0 自建干净截图 → 1 mShots → 2 thum.io → 3 mock
  const [imgLoaded, setImgLoaded] = useState(false);
  const [refreshNonce, setRefreshNonce] = useState(0); // mShots 占位图重拉计数
  const [shownProgress, setShownProgress] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const refreshCountRef = useRef(0);
  const attemptRef = useRef(0);

  const host = prettyHost(url);
  const mockMode = attempt >= 3 || !url;
  const cleanShot = attempt === 0 && imgLoaded; // 自建服务成功出图（已自动关 cookie 弹窗）
  const mirrorShot = attempt >= 1 && attempt < 3 && imgLoaded; // 公共镜像出图
  const visibleLines = stageLines.slice(-5);

  /* 进度数字平滑逼近目标值（rAF 内 setState，规避 set-state-in-effect） */
  const targetRef = useRef(progress);
  useEffect(() => {
    targetRef.current = progress;
  }, [progress]);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setShownProgress((p) => {
        const t = targetRef.current;
        if (Math.abs(t - p) < 0.4) return t;
        return p + (t - p) * 0.07;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* 截图源降级：清重拉计数 + 重置加载态 + 前进一级（onError / 超时 / 黑帧 / 占位图共用） */
  const advanceAttempt = useCallback(() => {
    // 埋点：截图源健康度观测（自建失败率、公共服务依赖度）
    track("shot_fallback", {
      tool: "website-analyzer",
      meta: `attempt ${attemptRef.current} -> ${Math.min(attemptRef.current + 1, 3)}`,
    });
    refreshCountRef.current = 0;
    setImgLoaded(false);
    setAttempt((a) => Math.min(a + 1, 3)); // 3 = CSS 模拟站点（回退终点，必达）
  }, []);

  /* 截图源加载超时：任何一级源挂起（自建服务冷启动 / mShots 慢 / thum.io 失联）
     都自动降级，绝不让视口停在无内容的黑屏（黑屏事故修复） */
  useEffect(() => {
    if (!url || mockMode || imgLoaded || failed) return;
    const ms = attempt === 0 ? 40_000 : 15_000; // 自建服务含 chromium 冷启动可达 ~30s
    const timer = window.setTimeout(advanceAttempt, ms);
    return () => window.clearTimeout(timer);
  }, [url, attempt, refreshNonce, imgLoaded, mockMode, failed, advanceAttempt]);

  /* 扫描开始时把监视器滚进视野 */
  useEffect(() => {
    const was = prevActiveRef.current;
    prevActiveRef.current = active;
    if (active && !was) {
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [active]);

  /* 扫描线：active 上升 → 9s 从顶部扫到底部；回落 → 淡出 */
  useEffect(() => {
    const frame = frameRef.current;
    const line = scanlineRef.current;
    if (!frame || !line) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (active) {
      const anim = line.animate(
        [
          { transform: "translateY(-64px)", opacity: 1 },
          { transform: `translateY(${frame.clientHeight + 16}px)`, opacity: 1 },
        ],
        { duration: SCAN_DURATION_MS, easing: SCAN_EASING, fill: "forwards" }
      );
      return () => anim.cancel();
    }
    const fade = line.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 250,
      fill: "forwards",
    });
    return () => fade.cancel();
  }, [active]);

  /* 截图向下滚动：active + 内容就绪 → 9s 缓动滚到底；扫描结束 → 回卷顶部 */
  useEffect(() => {
    const frame = frameRef.current;
    const content = contentRef.current;
    if (!frame || !content) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const contentReady = imgLoaded || mockMode || active; // 截图未就绪时滚动骨架，视口始终有内容
    if (active && contentReady && !ranRef.current) {
      ranRef.current = true;
      const dist = Math.max(0, content.scrollHeight - frame.clientHeight);
      const anim = content.animate(
        [
          { transform: "translateY(0)" },
          { transform: `translateY(${-dist}px)` },
        ],
        { duration: SCAN_DURATION_MS, easing: SCAN_EASING, fill: "forwards" }
      );
      return () => anim.cancel();
    }
    if (!active && ranRef.current) {
      ranRef.current = false;
      const anim = content.animate([{ transform: "translateY(0)" }], {
        duration: 700,
        easing: "ease-out",
        fill: "forwards",
      });
      return () => anim.cancel();
    }
  }, [active, imgLoaded, mockMode]);

  /* 截图源切换时重新武装滚动动画（attempt 0→1 时截图高度变化） */
  useEffect(() => {
    if (attemptRef.current !== attempt) {
      attemptRef.current = attempt;
      ranRef.current = false;
    }
  }, [attempt]);

  /* 截图校验：纯黑帧 / 均匀暗帧 / 占位小图 → 降级；通过 → 淡入显示（骨架同时淡出）。
     mShots 首帧常返回 400x300 灰色占位图：每 3.5s 重拉一次（最多 2 次）再降级 */
  const handleImgLoad = () => {
    const img = imgRef.current;
    if (!img || img.naturalWidth <= 0) return;
    if (isBadFrame(img)) {
      advanceAttempt();
      return;
    }
    if (img.naturalWidth < 640) {
      if (attempt === 1 && refreshCountRef.current < 2) {
        refreshCountRef.current += 1;
        window.setTimeout(() => setRefreshNonce((n) => n + 1), 3500);
        return;
      }
      advanceAttempt();
      return;
    }
    setImgLoaded(true);
  };

  const badge = <StatusBadge active={active} done={done} failed={failed} />;

  /* 下载当前截图（同源自带 CORS；公共镜像两侧均回 ACAO:*，blob 下载同样可用） */
  const downloadShot = async () => {
    const img = imgRef.current;
    if (!img || mockMode) return;
    try {
      const res = await fetch(img.src);
      if (!res.ok) return;
      const blob = await res.blob();
      const a = document.createElement("a");
      const objUrl = URL.createObjectURL(blob);
      a.href = objUrl;
      a.download = `bhai-shot-${host}.png`;
      a.click();
      window.setTimeout(() => URL.revokeObjectURL(objUrl), 4000);
    } catch {
      /* 静默：下载是锦上添花功能 */
    }
  };

  return (
    <div ref={rootRef} className="rounded-xl border border-[#2A2A2A] bg-black overflow-hidden">
      {/* 浏览器窗框标题栏 */}
      <div className="flex items-center gap-2 border-b border-[#2A2A2A] bg-[#111110] px-4 py-2.5">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#FF5F57]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#28C840]" aria-hidden="true" />
        <span className="ml-3 flex min-w-0 items-center gap-1.5 font-mono text-xs text-bhai-dim">
          <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{url ? url : s.enterUrlFirst}</span>
        </span>
        {cleanShot && (
          <span
            className="ml-2 hidden shrink-0 rounded-full border border-green-500/40 bg-green-500/10 px-2 py-0.5 font-mono text-[9px] tracking-widest text-green-400 sm:inline-flex"
            title={s.cleanShotTitle}
          >
            {s.cleanShot}
          </span>
        )}
        {mirrorShot && (
          <span
            className="ml-2 hidden shrink-0 rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 font-mono text-[9px] tracking-widest text-amber-400 sm:inline-flex"
            title={s.cdnMirrorTitle}
          >
            {s.cdnMirror}
          </span>
        )}
        {url && mockMode && (
          <span
            className="ml-2 hidden shrink-0 rounded-full border border-[#3A3A3A] bg-[#1A1A1A] px-2 py-0.5 font-mono text-[9px] tracking-widest text-bhai-dim sm:inline-flex"
            title={s.simulatedTitle}
          >
            {s.simulated}
          </span>
        )}
        {(cleanShot || mirrorShot) && (
          <button
            type="button"
            onClick={() => void downloadShot()}
            className="ml-2 hidden shrink-0 rounded-md border border-[#2A2A2A] p-1 text-bhai-dim transition-colors hover:border-bhai-red hover:text-bhai-red sm:inline-flex"
            aria-label={s.downloadShot}
            title={s.downloadShot}
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
        <span className="ml-auto shrink-0">{badge}</span>
      </div>

      {/* 视口：截图滚动 + 扫描线 */}
      <div
        ref={frameRef}
        className="relative h-[300px] sm:h-[400px] overflow-hidden bg-[#0a0a09]"
        aria-hidden="true"
      >
        {/* 内容层：真实截图就绪后淡入；加载期以骨架站点兜底 —— 视口永不黑屏 */}
        <div ref={contentRef} className="absolute inset-x-0 top-0 will-change-transform">
          {url && !mockMode ? (
            <>
              <div
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 transition-opacity duration-700 ${
                  imgLoaded ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
              >
                <MockSite />
              </div>
              <img
                key={`${url}-${attempt}-${refreshNonce}`}
                ref={imgRef}
                src={screenshotSource(url, attempt, refreshNonce)}
                alt=""
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                draggable={false}
                onLoad={handleImgLoad}
                onError={advanceAttempt}
                className={`relative block w-full select-none transition-opacity duration-700 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          ) : (
            <MockSite />
          )}
        </div>

        {/* 扫描覆盖层：网格 + 扫描线 + 取景框 + 暗角 */}
        <div className="scan-grid pointer-events-none absolute inset-0" />
        <div
          ref={scanlineRef}
          className="scanline pointer-events-none absolute inset-x-0 top-0 h-16 opacity-0"
        />
        <div className="scan-vignette pointer-events-none absolute inset-0" />
        <CornerBrackets />

        {/* 空闲提示 */}
        {!active && !done && !failed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/55 backdrop-blur-[2px]">
            <Radar className="h-7 w-7 text-bhai-red/70" />
            <p className="font-mono text-[11px] tracking-widest text-bhai-muted">
              {s.standbyTitle}
            </p>
            <p className="max-w-[280px] text-center text-xs text-bhai-dim leading-relaxed">
              {t.scan.standbyHint}
            </p>
          </div>
        )}

        {/* 完成 / 失败 提示条 */}
        {(done || failed) && (
          <div
            className={`absolute inset-x-0 bottom-0 border-t px-4 py-2 text-center font-mono text-[11px] tracking-wider backdrop-blur-sm ${
              done
                ? "border-green-500/25 bg-green-500/10 text-green-400 shadow-[0_-8px_24px_rgba(34,197,94,0.12)]"
                : "border-red-500/25 bg-red-500/10 text-red-400 shadow-[0_-8px_24px_rgba(239,68,68,0.12)]"
            }`}
          >
            {done
              ? s.completeBanner
              : s.failedBanner}
          </div>
        )}
      </div>

      {/* 终端条：阶段日志 + 进度 */}
      <div className="border-t border-[#2A2A2A] bg-[#0d0d0c] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] tracking-widest text-bhai-dim">
            {s.targetLabel} · <span className="text-bhai-red">{host}</span>
          </span>
          <span
            className="font-mono text-[11px] tabular-nums text-bhai-muted"
            aria-live="polite"
          >
            {Math.round(shownProgress)}%
            {active && <span className="scan-caret" aria-hidden="true">▌</span>}
          </span>
        </div>

        {/* 截图就绪子状态：自建干净截图生成中（首次冷启动约 5 秒） */}
        {active && !imgLoaded && !mockMode && (
          <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[10px] text-bhai-dim">
            <Loader2
              className="h-3 w-3 shrink-0 animate-spin text-bhai-red"
              aria-hidden="true"
            />
            {attempt === 0 ? s.openingCold : s.openingMirror}
          </p>
        )}

        {/* 进度条 */}
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#1F1F1F]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#A04A0B] via-[#E56910] to-[#F38B3F] shadow-[0_0_12px_rgba(229,105,16,0.45)] transition-[width] duration-300 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, shownProgress))}%` }}
          />
        </div>

        {/* 阶段日志 */}
        <div
          className="mt-2.5 min-h-[52px] space-y-1 font-mono text-[11px] leading-relaxed"
          role="status"
          aria-live="polite"
          aria-label={s.stageLogAria}
        >
          {visibleLines.length === 0 ? (
            <p className="text-bhai-dim">{s.stageIdle}</p>
          ) : (
            visibleLines.map((line, i) => {
              const isLast = i === visibleLines.length - 1;
              return (
                <p
                  key={`${i}-${line.slice(0, 8)}`}
                  className={isLast ? "text-bhai-red" : "text-bhai-muted"}
                >
                  ▸ {line}
                  {isLast && active && (
                    <span className="scan-caret ml-0.5" aria-hidden="true">▌</span>
                  )}
                </p>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
