"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

/**
 * [ BHAI // LIVE METRICS ] 面板 — 高端服务器终端质感（Phase 3 · Quiet Luxury）
 *
 * - 挂载后：面板标题 / 指标标签打字机逐字显现（~12ms/字），数值 1s 缓动 count-up（mono tabular-nums）
 * - 指标卡 CSS transition-delay 交错淡入
 * - 右上角 LIVE：8px 绿点 box-shadow 脉冲（livePulse 2s ease-in-out infinite）
 * - prefers-reduced-motion：跳过全部动画，直接渲染最终态
 * - SSR / 首帧渲染最终态（hydration 安全），layout effect 在绘制前重置再播放，无闪跳
 * - i18n（Task 20-a）：aria-label 走 t.homeSec.metricsAria（数值/标签由调用方 HomeHero 传入，已随 locale）
 */

export type MetricStat = {
  value: string;
  label: string;
};

const CHAR_MS = 12; // 打字机：每字符 12ms
const STAGGER_MS = 90; // 卡片交错
const COUNT_MS = 1000; // 数值 count-up 时长
const COUNT_DELAY_MS = 150; // 数值起飞前的等待

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** 把 "16" / "14 天" / "1000+" / "66%" / "1.8 亿¥" 拆成 前缀 + 数字 + 后缀 */
function splitValue(value: string) {
  const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m) return null;
  const raw = m[2].replace(/,/g, "");
  const num = parseFloat(raw);
  if (Number.isNaN(num)) return null;
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  return { prefix: m[1], num, decimals, suffix: m[3] };
}

export function MetricsPanel({ stats }: { stats: MetricStat[] }) {
  const { t } = useLang();
  const PANEL_HEADER = "[ BHAI // LIVE METRICS ]";

  // null = 最终静态态（SSR 首帧 / reduced-motion / 动画完成后保持最后进度）
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [shown, setShown] = useState(true); // 卡片容器是否触发交错淡入
  const rafRef = useRef(0);

  const totalMs =
    stats.length * STAGGER_MS +
    COUNT_DELAY_MS +
    Math.max(
      COUNT_MS,
      PANEL_HEADER.length * CHAR_MS + 200,
      ...stats.map((s) => s.label.length * CHAR_MS + 250),
    );

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // 直接最终态

    let cancelled = false;
    let raf2 = 0;
    // 首个 rAF 在首次绘制前触发（reset 同帧微任务内 flush，无最终态闪跳）；
    // 双 rAF 确保起始态先绘制，再触发卡片交错 transition
    const raf1 = requestAnimationFrame(() => {
      if (cancelled) return;
      setElapsed(0);
      setShown(false);
      raf2 = requestAnimationFrame(() => {
        if (cancelled) return;
        setShown(true);
        const start = performance.now();
        const loop = (now: number) => {
          if (cancelled) return;
          const t = now - start;
          setElapsed(t);
          if (t < totalMs) rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      cancelAnimationFrame(rafRef.current);
    };
  }, [totalMs]);

  const done = elapsed === null;
  const headerChars = done ? PANEL_HEADER.length : Math.min(PANEL_HEADER.length, Math.floor(elapsed / CHAR_MS));
  const headerText = PANEL_HEADER.slice(0, headerChars);
  const typingHeader = !done && headerChars < PANEL_HEADER.length;

  return (
    <div
      className="metrics-terminal rounded-2xl border border-[#2A2A2A] bg-bhai-card p-6 red-glow"
      role="group"
      aria-label={t.homeSec.metricsAria}
    >
      {/* Header row：mono 标题（打字机） + LIVE 绿点脉冲 */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-xs text-bhai-muted tracking-widest min-h-[1em]">
          {headerText}
          {typingHeader && <span className="metrics-caret" aria-hidden="true" />}
        </span>
        <span className="flex items-center gap-2" aria-hidden="true">
          <span className="live-dot" />
          <span className="font-mono text-[10px] tracking-widest text-[#22c55e]">LIVE</span>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => {
          const cardStart = i * STAGGER_MS;
          const labelChars = done
            ? stat.label.length
            : Math.max(0, Math.min(stat.label.length, Math.floor((elapsed - cardStart - 60) / CHAR_MS)));
          const t = done
            ? 1
            : Math.min(1, Math.max(0, (elapsed - cardStart - COUNT_DELAY_MS) / COUNT_MS));
          const eased = easeOutCubic(t);
          const split = splitValue(stat.value);
          const valueText = split
            ? `${split.prefix}${(split.num * eased).toFixed(split.decimals)}${split.suffix}`
            : stat.value;

          return (
            <div
              key={stat.label}
              className={`metrics-card-reveal rounded-lg border border-[#2A2A2A] bg-bhai-bg p-4 transition-[opacity,transform] duration-500 ease-out will-change-[opacity,transform] ${
                shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: shown ? `${i * STAGGER_MS}ms` : "0ms" }}
            >
              <div className="font-mono text-2xl sm:text-3xl font-bold text-foreground tabular-nums tracking-tight mb-1">
                {valueText}
              </div>
              <div className="text-[11px] font-mono text-bhai-muted leading-tight min-h-[2.2em]">
                {stat.label.slice(0, labelChars)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-[#2A2A2A]">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-bhai-muted">CONTROL CENTER STATUS</span>
          <span className="font-mono text-bhai-red">● OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
}
