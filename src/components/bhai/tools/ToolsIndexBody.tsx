"use client";

import Link from "next/link";
import { ArrowRight, Clock, Infinity as InfinityIcon } from "lucide-react";
import { useLang, tpl } from "@/lib/i18n";
import { localizeTool } from "@/lib/data/ai-tools-en";
import { TOOL_ICONS, FREE_RUNS_PER_TOOL, AI_TOOLS } from "@/lib/data/ai-tools";

/**
 * /tools 索引页正文（i18n Round B 客户端化 + 样式细节增强）
 * - 工具名/一句话价值/耗时随 locale 切换；hero 文案与统计行走字典
 * - 新增：mono 序号 [01]–[05]、统计行、hover 渐变扫光（card-sheen）、卡片顶部强调线
 */
export function ToolsIndexBody() {
  const { t, locale } = useLang();
  const ti = t.toolsIndex;
  const tp = t.toolsPages;

  const analyzerTool = AI_TOOLS.find((x) => x.isAnalyzer) ?? AI_TOOLS[0];
  const analyzer = localizeTool(analyzerTool, locale);
  const AnalyzerIcon = TOOL_ICONS[analyzer.icon];
  const rest = AI_TOOLS.filter((x) => !x.isAnalyzer);

  const idx = (i: number) => `[ 0${i + 1} ]`;

  return (
    <>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="font-mono text-[11px] tracking-widest text-bhai-red mb-5">
            [ BHAI // FREE TOOLS ]
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {ti.heroTitleA}
            <br />
            <span className="stat-highlight">{ti.heroTitleB}</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
            {ti.heroDesc}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2A2A2A] bg-bhai-card px-4 py-1.5">
              <InfinityIcon className="h-3.5 w-3.5 text-bhai-red" aria-hidden="true" />
              <span className="text-xs text-bhai-muted">
                {tpl(ti.freeRunsNote, { n: FREE_RUNS_PER_TOOL })}
              </span>
            </div>
            <span className="inline-flex items-center rounded-full border border-bhai-red/30 bg-bhai-red/5 px-4 py-1.5 font-mono text-[10px] tracking-widest text-bhai-red">
              {ti.stats}
            </span>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Featured: website analyzer */}
          <Link
            href={`/tools/${analyzer.slug}`}
            data-cursor={tp.cursorRun}
            className="card-sheen group relative block overflow-hidden rounded-xl border border-bhai-red/30 bg-bhai-card card-hover p-6 sm:p-8 transition-shadow hover:shadow-[0_0_40px_rgba(229,105,16,0.12)]"
          >
            <span className="pointer-events-none absolute right-4 top-3 font-mono text-[10px] tracking-widest text-bhai-dim/70">
              {idx(0)}
            </span>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="h-14 w-14 shrink-0 rounded-xl border border-bhai-red/40 bg-bhai-red/10 flex items-center justify-center transition-all group-hover:border-bhai-red/70 group-hover:shadow-[0_0_20px_rgba(229,105,16,0.3)]">
                <AnalyzerIcon className="h-7 w-7 text-bhai-red" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="font-sans text-xl sm:text-2xl font-bold text-foreground">
                    {analyzer.name}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-bhai-red rounded-full border border-bhai-red/40 px-2.5 py-0.5">
                    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bhai-red opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bhai-red" />
                    </span>
                    LIVE AI
                  </span>
                </div>
                <p className="text-sm text-bhai-muted leading-relaxed max-w-2xl">
                  {analyzer.tagline}
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-bhai-dim tracking-wider">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {analyzer.timeEstimate}
                </span>
                <span className="cta-primary rounded-md px-5 py-2.5 text-sm font-medium text-white inline-flex items-center gap-2">
                  {ti.startScan} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>

          {/* 4 tools grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((tool, i) => {
              const Icon = TOOL_ICONS[tool.icon];
              const lt = localizeTool(tool, locale);
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  data-cursor={tp.cursorRun}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-[#2A2A2A] bg-bhai-card card-hover p-6 transition-colors hover:border-bhai-red/40"
                >
                  {/* 顶部强调线：hover 时点亮 */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bhai-red/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="pointer-events-none absolute right-4 top-3 font-mono text-[10px] tracking-widest text-bhai-dim/70">
                    {idx(i + 1)}
                  </span>
                  <div className="h-11 w-11 rounded-lg border border-[#2A2A2A] bg-bhai-bg flex items-center justify-center mb-4 transition-all group-hover:border-bhai-red/50 group-hover:shadow-[0_0_16px_rgba(229,105,16,0.22)]">
                    <Icon className="h-5 w-5 text-bhai-red" aria-hidden="true" />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-foreground mb-2 transition-colors group-hover:text-bhai-red">
                    {lt.name}
                  </h3>
                  <p className="text-[13px] text-bhai-muted leading-relaxed flex-1">
                    {lt.tagline}
                  </p>
                  <div className="mt-5 pt-4 border-t border-[#2A2A2A] flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-bhai-dim tracking-wider">
                      <Clock className="h-3 w-3" aria-hidden="true" /> {lt.timeEstimate}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-bhai-red group-hover:translate-x-0.5 transition-transform">
                      {ti.goUse} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-bhai-dim font-mono tracking-wider pt-4">
            {ti.footnote}
          </p>
        </div>
      </section>
    </>
  );
}
