"use client";

import { useEffect, useRef } from "react";

/**
 * 阅读进度条：固定在视口顶部，随文章滚动从 0 → 100% 横向填充。
 * 用 transform: scaleX 驱动（不触发 layout，性能友好）。
 */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const bar = barRef.current;
      if (!bar) return;
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={barRef} className="reading-progress" aria-hidden />;
}
