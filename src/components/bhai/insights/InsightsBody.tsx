"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { CTASection } from "@/components/bhai/CTASection";
import { ArrowRight, TrendingDown, TrendingUp, AlertTriangle, Sparkles, Building2, Globe2 } from "lucide-react";

/**
 * /denmark-insights 页正文（client body，20-c 双语化）
 * - 5 条洞察正文走 t.insights.items（zh/en 实时切换）
 * - icon 与 caseSlug 为 locale 无关的结构数据，保留在本组件
 * - 样式/结构/classNames 与原 server 页完全一致
 */

/** 每条洞察的 icon + 对应案例路由（与 t.insights.items 按下标一一对应） */
const INSIGHT_META = [
  { icon: TrendingDown, caseSlug: "pandora" },
  { icon: Sparkles, caseSlug: "sophie-bille-brahe" },
  { icon: Globe2, caseSlug: "hartmanns" },
  { icon: AlertTriangle, caseSlug: "pernille-corydon" },
  { icon: Building2, caseSlug: "georg-jensen" },
] as const;

export function InsightsBody() {
  const { t } = useLang();
  const d = t.insights;

  return (
    <>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">{d.heroKicker}</div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {d.heroTitleA}<br />
            <span className="stat-highlight">{d.heroTitleB}</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed">
            {d.heroDesc}
          </p>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-6xl space-y-12">
          {d.items.map((insight, i) => {
            const Icon = INSIGHT_META[i].icon;
            return (
              <article key={insight.num} className="rounded-2xl border border-[#2A2A2A] bg-bhai-card overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Left: number + icon + stat */}
                  <div className="lg:col-span-4 p-8 border-b lg:border-b-0 lg:border-r border-[#2A2A2A] bg-gradient-to-br from-bhai-red/5 to-transparent">
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-6xl font-bold stat-highlight">{insight.num}</span>
                      <Icon className="h-8 w-8 text-bhai-red" />
                    </div>
                    <div className="space-y-2">
                      <div className="font-sans text-3xl font-bold text-foreground">{insight.stat}</div>
                      <div className="font-mono text-[10px] text-bhai-muted tracking-widest uppercase">{insight.statLabel}</div>
                    </div>
                  </div>

                  {/* Right: content */}
                  <div className="lg:col-span-8 p-8">
                    <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4 leading-tight">
                      {insight.title}
                    </h2>
                    <p className="text-sm text-bhai-red font-medium mb-6 leading-relaxed">
                      {insight.summary}
                    </p>
                    <div className="space-y-4">
                      {insight.body.map((para, j) => (
                        <p key={j} className="text-sm text-bhai-muted leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-[#2A2A2A]">
                      <Link
                        href={`/cases/${INSIGHT_META[i].caseSlug}`}
                        className="inline-flex items-center gap-2 text-sm text-bhai-red hover:text-bhai-red-hover font-medium"
                      >
                        {insight.caseLabel} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* SUMMARY TABLE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{d.tableKicker}</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            {d.tableTitle}
          </h2>
          <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card overflow-hidden">
            <div className="divide-y divide-[#1F1F1F]">
              {d.tableRows.map((row, i) => (
                <div key={i} className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-[#0F0F0F] transition-colors">
                  <div className="text-sm text-foreground">{row.insight}</div>
                  <div className="text-sm text-bhai-muted font-mono">{row.solution}</div>
                  <div className="text-sm text-bhai-red text-right">{row.caseName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={d.ctaTitle}
        subtitle={d.ctaSubtitle}
        primaryLabel={d.ctaPrimary}
        secondaryLabel={d.ctaSecondary}
        secondaryHref="/cases"
      />
    </>
  );
}
