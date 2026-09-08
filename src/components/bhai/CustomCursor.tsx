"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 金环自定义光标（Phase 3 · Quiet Luxury）
 *
 * - 28px 细金环（1px #E56910 描边），rAF lerp（factor ~0.18）跟随鼠标
 * - 悬停 [data-cursor] 元素：环扩到 64px，居中显示 11px mono 金色标签（data-cursor 值，如「探索」「运行 AI」）
 * - 原生光标保持可见（可访问性；本组件不设置 cursor:none）
 * - 仅 (pointer: fine) 启用，触屏 / 移动端完全惰性（不渲染任何 DOM）
 * - 鼠标离开窗口时隐藏；prefers-reduced-motion 时 lerp 退化为 1（无缓动拖尾）
 * - pointer-events-none + z-index 极高，不影响任何交互
 */

const LERP_FACTOR = 0.18;
const SIZE = 28;
const SIZE_ACTIVE = 64;

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const st = useRef({ x: 0, y: 0, cx: 0, cy: 0, visible: false, raf: 0 });

  // 仅精确指针设备启用
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const s = st.current;
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const loop = () => {
      const k = reducedMq.matches ? 1 : LERP_FACTOR;
      s.cx += (s.x - s.cx) * k;
      s.cy += (s.y - s.cy) * k;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${s.cx}px, ${s.cy}px, 0)`;
      }
      // 收敛后停帧，鼠标再动时由 mousemove 重新启动
      if (Math.abs(s.x - s.cx) < 0.15 && Math.abs(s.y - s.cy) < 0.15) {
        s.raf = 0;
        return;
      }
      s.raf = requestAnimationFrame(loop);
    };
    const startLoop = () => {
      if (!s.raf) s.raf = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      if (s.raf) {
        cancelAnimationFrame(s.raf);
        s.raf = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      s.x = e.clientX;
      s.y = e.clientY;
      if (!s.visible) {
        s.visible = true;
        s.cx = s.x;
        s.cy = s.y;
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
      startLoop();
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-cursor]");
      const label = el?.getAttribute("data-cursor") ?? "";
      if (innerRef.current) {
        const active = Boolean(label);
        innerRef.current.style.width = active ? `${SIZE_ACTIVE}px` : `${SIZE}px`;
        innerRef.current.style.height = active ? `${SIZE_ACTIVE}px` : `${SIZE}px`;
        innerRef.current.style.backgroundColor = active ? "rgba(229, 105, 16, 0.08)" : "transparent";
      }
      if (labelRef.current) {
        labelRef.current.textContent = label;
        labelRef.current.style.opacity = label ? "1" : "0";
      }
    };

    const onLeave = () => {
      s.visible = false;
      if (ringRef.current) ringRef.current.style.opacity = "0";
      stopLoop();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      stopLoop();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9999] transition-opacity duration-200"
      style={{ opacity: 0, transform: "translate3d(-100px, -100px, 0)" }}
    >
      <div
        ref={innerRef}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bhai-red transition-[width,height,background-color] duration-300 ease-out"
        style={{ width: SIZE, height: SIZE, backgroundColor: "transparent" }}
      >
        <span
          ref={labelRef}
          className="cursor-ring-label select-none whitespace-nowrap font-mono text-[11px] tracking-widest text-bhai-red transition-opacity duration-200"
          style={{ opacity: 0 }}
        />
      </div>
    </div>
  );
}
