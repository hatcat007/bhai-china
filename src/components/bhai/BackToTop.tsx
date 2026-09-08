"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLang } from "@/lib/i18n";

/**
 * 全局返回顶部按钮：滚动超过一屏后浮现，点击平滑回顶。
 * 尊重 prefers-reduced-motion（跳转改为 auto）。
 * i18n（Task 20-a）：aria-label 走 t.homeSec.backToTop。
 */
export function BackToTop() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setShow(window.scrollY > window.innerHeight * 0.9);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label={t.homeSec.backToTop}
      className={`back-to-top ${
        show ? "back-to-top-show" : ""
      } fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-bhai-red/50 bg-black/85 text-bhai-red shadow-[0_0_24px_rgba(229,105,16,0.25)] backdrop-blur-md transition-colors hover:border-bhai-red hover:bg-bhai-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bhai-red`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
