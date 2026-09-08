"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { CTASection } from "@/components/bhai/CTASection";
import { Eye, Sparkles, Diamond, TrendingUp, Cpu, ShieldCheck, Gauge, Wrench } from "lucide-react";
import type { ElementType } from "react";

/**
 * /solutions 页正文（client body，Round 20-b i18n）
 * - 全部文案走 t.solutions.*（zh/en 字典见 src/lib/i18n/dicts/about-method-solutions.ts）
 * - 图标 / 案例链接 slug（非文案）保留在本组件内，与字典 items 按下标对齐
 * - 结构/className/sticky 布局与原 server 版逐行一致；SSR 首帧 zh，挂载后实时切换
 * - nameSub：zh 下展示英文名（原 nameEn 设计），en 下为空串不渲染（避免正文出现中文）
 */

const SOLUTION_META: { id: string; icon: ElementType; cases: string[] }[] = [
  { id: "anti-counterfeit", icon: Eye, cases: ["pandora", "shamballa-jewels", "georg-jensen"] },
  { id: "bespoke-design", icon: Sparkles, cases: ["jane-konig", "ole-lynggaard", "pilgrim", "charlotte-larsen"] },
  { id: "vip-clienteling", icon: Diamond, cases: ["georg-jensen", "sophie-bille-brahe", "hartmanns", "shamballa-jewels", "ole-lynggaard"] },
  { id: "demand-forecasting", icon: TrendingUp, cases: ["maanesten", "pilgrim", "pernille-corydon", "enamel-copenhagen"] },
  { id: "blockchain-provenance", icon: Cpu, cases: ["hartmanns", "georg-jensen", "aurum-denmark", "ole-lynggaard"] },
  { id: "china-entry", icon: ShieldCheck, cases: ["sophie-bille-brahe", "maria-black", "aurum-denmark", "pandora"] },
  { id: "ar-tryon", icon: Gauge, cases: ["ole-lynggaard", "enamel-copenhagen", "hartmanns"] },
  { id: "distressed-brand", icon: Wrench, cases: ["pernille-corydon", "maanesten"] },
  { id: "china-cloud", icon: Cpu, cases: ["zhuyun-nansha"] },
];

export function SolutionsBody() {
  const { t } = useLang();
  const s = t.solutions;
  const items = s.items;

  return (
    <>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">{s.kicker}</div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {s.h1a}<br />
            <span className="stat-highlight">{s.h1b}</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed">
            {s.heroDesc}
          </p>
        </div>
      </section>

      {/* SOLUTIONS LIST */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-7xl space-y-16">
          {items.map((item, idx) => {
            const meta = SOLUTION_META[idx];
            const Icon = meta.icon;
            return (
              <div key={meta.id} id={meta.id} className="scroll-mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5">
                    <div className="sticky top-20">
                      <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">
                        [ SOLUTION {String(idx + 1).padStart(2, '0')} / 09 ]
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-12 w-12 rounded-xl border border-bhai-red/30 bg-bhai-red/5 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-bhai-red" />
                        </div>
                        <div>
                          <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            {item.name}
                          </h2>
                          {item.nameSub && (
                            <div className="font-mono text-[10px] text-bhai-muted tracking-widest mt-1">{item.nameSub}</div>
                          )}
                        </div>
                      </div>
                      <p className="text-base text-foreground leading-relaxed font-medium mb-4">
                        {item.pitch}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.caseLabels.map((label, i) => (
                          <Link
                            key={i}
                            href={`/cases/${meta.cases[i]}`}
                            className="rounded border border-[#2A2A2A] bg-bhai-card px-2.5 py-1 text-[11px] text-bhai-muted hover:border-bhai-red hover:text-bhai-red transition-colors"
                          >
                            {label}
                            {s.caseDetailSuffix}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-6">
                    <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
                      <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-3">{s.painLabel}</div>
                      <p className="text-sm text-bhai-muted leading-relaxed">{item.pain}</p>
                    </div>
                    <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-6">
                      <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">{s.solutionLabel}</div>
                      <p className="text-sm text-foreground leading-relaxed">{item.solution}</p>
                    </div>
                    <div className="rounded-xl border border-[#2A2A2A] bg-bhai-bg p-6">
                      <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-4">{s.resultsLabel}</div>
                      <ul className="space-y-3">
                        {item.results.map((r, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="font-mono text-xs text-bhai-red mt-1">→</span>
                            <span className="text-sm text-foreground leading-relaxed">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {idx < items.length - 1 && (
                  <div className="glow-line mt-16" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT FITS TOGETHER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{s.fitKicker}</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            {s.fitTitleA}<br />
            <span className="text-bhai-muted">{s.fitTitleB}</span>
          </h2>
          <p className="text-base text-bhai-muted leading-relaxed mb-12">
            {s.fitDesc}
          </p>

          <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="font-sans text-3xl font-bold stat-highlight mb-2">{s.stat1Value}</div>
                <div className="text-xs text-bhai-muted">{s.stat1Label}</div>
              </div>
              <div>
                <div className="font-sans text-3xl font-bold stat-highlight mb-2">{s.stat2Value}</div>
                <div className="text-xs text-bhai-muted">{s.stat2Label}</div>
              </div>
              <div>
                <div className="font-sans text-3xl font-bold stat-highlight mb-2">{s.stat3Value}</div>
                <div className="text-xs text-bhai-muted">{s.stat3Label}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={s.ctaTitle}
        subtitle={s.ctaSubtitle}
        primaryLabel={s.ctaPrimary}
        primaryHref="/book"
        secondaryLabel={s.ctaSecondary}
        secondaryHref="/method"
      />
    </>
  );
}
