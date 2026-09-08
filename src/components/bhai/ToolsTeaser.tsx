"use client";

import { ArrowRight, ScanSearch } from "lucide-react";
import { useLang } from "@/lib/i18n";

/**
 * 首页「免费 AI 工具」teaser（i18n Round D-2 · Task 20-a 转 client）
 * - 文案走 t.homeSec（teaser*），按钮复用 t.toolsIndex.startScan
 * - 表单用 GET 直接跳转 /tools/website-analyzer?url=…，
 *   ToolRunner 检测到 ?url= 会预填并自动开始扫描（守门规则不变）。
 * - 无 JS 环境也可用（原生表单导航）。
 */
export function ToolsTeaser() {
  const { t } = useLang();
  const s = t.homeSec;
  return (
    <section className="relative gradient-section py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="font-mono text-[11px] tracking-widest text-bhai-red mb-4">
          {s.teaserKicker}
        </div>
        <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4 leading-tight">
          {s.teaserTitle}
        </h2>
        <p className="text-sm sm:text-base text-bhai-muted max-w-2xl mx-auto leading-relaxed">
          {s.teaserDesc}
        </p>

        <form
          action="/tools/website-analyzer"
          method="get"
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <div className="relative flex-1">
            <ScanSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-bhai-dim pointer-events-none"
              aria-hidden="true"
            />
            <label htmlFor="teaser-url" className="sr-only">
              {s.teaserUrlLabel}
            </label>
            <input
              id="teaser-url"
              name="url"
              type="url"
              required
              placeholder="https://yourbrand.com"
              autoComplete="url"
              className="w-full rounded-lg border border-[#2A2A2A] bg-bhai-card pl-11 pr-4 py-3 text-base text-foreground placeholder:text-bhai-dim input-focus"
            />
          </div>
          <button
            type="submit"
            className="cta-primary rounded-md px-6 py-3 text-sm font-medium text-white inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {t.toolsIndex.startScan} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>

        <p className="mt-4 font-mono text-[10px] tracking-widest text-bhai-dim">
          {s.teaserFootnote}
        </p>
      </div>
    </section>
  );
}
