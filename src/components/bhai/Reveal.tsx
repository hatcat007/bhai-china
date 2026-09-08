"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** 延迟毫秒数（级联浮现效果） */
  delay?: number;
};

/**
 * 滚动浮现容器：进入视口时为子元素添加浮现动画。
 * 服务端渲染时保持 opacity:0 之前的占位，SEO 无影响（内容仍在 DOM）。
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    // IntersectionObserver 不存在的环境（极老浏览器）：下一帧直接显示
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      // 顶部无限扩展：已滚动经过的元素（锚点跳转/快速滚动）也立即显示；
      // threshold 0 + 底部 -60px：元素刚进入视口 60px 即触发，避免"大片空白等待"
      { threshold: 0, rootMargin: "100000px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
