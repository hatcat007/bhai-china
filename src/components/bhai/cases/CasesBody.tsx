"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { CTASection } from "@/components/bhai/CTASection";
import { jewelryCases } from "@/lib/data/jewelry-cases";
import { ArrowRight, MapPin, Calendar, Building2 } from "lucide-react";

/**
 * /cases 页正文（client body，Round 20-d2 i18n）
 * - 页面 UI 文案全部走 t.casesPage.*（zh/en 见 src/lib/i18n/dicts/cases-blog-pricing.ts）
 * - 案例数据字段按 locale 选向（jewelry-cases.ts：无后缀 = EN，`…Zh` = 中文）：
 *   brandNameZh/brandName、segment/segmentEn、hq/hqEn、founded/foundedEn、
 *   heroQuoteZh/heroQuote、results labelZh/label + after/afterEn、myRole/myRoleEn
 * - 结构/className/图标/链接与原 server 版逐行一致；SSR 首帧 zh，挂载后实时切换
 */
export function CasesBody() {
  const { locale, t } = useLang();
  const d = t.casesPage;
  const isZh = locale === "zh";

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
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed whitespace-pre-line">
            {d.heroDesc}
          </p>
        </div>
      </section>

      {/* INDEX TABLE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card overflow-hidden mb-12">
            <div className="px-6 py-4 border-b border-[#2A2A2A] flex items-center justify-between">
              <span className="font-mono text-xs text-bhai-muted tracking-widest">{d.indexHeader}</span>
              <span className="font-mono text-xs text-bhai-red">{jewelryCases.length} {d.indexCount}</span>
            </div>
            <div className="divide-y divide-[#1F1F1F]">
              {jewelryCases.map((c, idx) => (
                <Link
                  key={c.slug}
                  href={`/cases/${c.slug}`}
                  className="block px-6 py-5 hover:bg-[#0F0F0F] transition-colors group"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1">
                      <span className="font-mono text-xs text-bhai-dim">{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="col-span-12 sm:col-span-4">
                      <div className="font-bold text-foreground group-hover:text-bhai-red transition-colors">
                        {isZh ? c.brandNameZh : c.brandName}
                      </div>
                      {isZh && (
                        <div className="text-xs text-bhai-muted mt-0.5">{c.brandName}</div>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-2 text-xs text-bhai-muted">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-bhai-dim" />
                        {(isZh ? c.founded : c.foundedEn).split(' ')[0]}
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3 text-xs text-bhai-muted">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-3 w-3 text-bhai-dim" />
                        {isZh ? c.segment : c.segmentEn}
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-2 text-right">
                      <span className="inline-flex items-center gap-1 text-xs text-bhai-red font-medium">
                        {d.viewCase} <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CASE CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jewelryCases.map((c, idx) => (
              <CaseCard key={c.slug} caseItem={c} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={d.ctaTitle}
        subtitle={d.ctaSubtitle}
        primaryLabel={d.ctaPrimary}
        secondaryLabel={d.ctaSecondary}
        secondaryHref="/solutions"
      />
    </>
  );
}

function CaseCard({ caseItem, index }: { caseItem: typeof jewelryCases[number]; index: number }) {
  const { locale, t } = useLang();
  const d = t.casesPage;
  const isZh = locale === "zh";

  return (
    <Link
      href={`/cases/${caseItem.slug}`}
      data-cursor={d.cursorExplore}
      className="group relative overflow-hidden rounded-xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] text-bhai-muted tracking-widest">
          CASE {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-mono text-[10px] text-bhai-red tracking-widest">/ {(isZh ? caseItem.founded : caseItem.foundedEn).split(' ')[0]}</span>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-bhai-red transition-colors">
        {isZh ? caseItem.brandNameZh : caseItem.brandName}
      </h3>
      {isZh && (
        <div className="text-xs text-bhai-muted mb-3">{caseItem.brandName}</div>
      )}

      <div className="flex items-start gap-1.5 text-xs text-bhai-dim mb-4">
        <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
        <span>{isZh ? caseItem.hq : caseItem.hqEn}</span>
      </div>

      <p className="text-sm text-bhai-muted leading-relaxed mb-5 flex-1 line-clamp-4">
        &ldquo;{isZh ? caseItem.heroQuoteZh : caseItem.heroQuote}&rdquo;
      </p>

      <div className="space-y-2 pt-4 border-t border-[#2A2A2A]">
        {caseItem.results.slice(0, 2).map((r, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <span className="text-bhai-dim">{isZh ? r.labelZh : r.label}</span>
            <span className="font-mono text-bhai-red font-medium">{isZh ? r.after : r.afterEn}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-end gap-1 text-xs text-bhai-red group-hover:gap-2 transition-all">
        {d.readCase} <ArrowRight className="h-3 w-3" />
      </div>

      {/* Hover 显数值层：暗渐变淡入 + 关键指标/我的角色上滑（Quiet Luxury） */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-4 p-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
      >
        <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1.5">{`[ ${d.keyData} ]`}</div>
        <div className="text-lg font-bold text-foreground leading-snug">{isZh ? caseItem.results[0].after : caseItem.results[0].afterEn}</div>
        <div className="text-[11px] text-bhai-muted mt-0.5">{isZh ? caseItem.results[0].labelZh : caseItem.results[0].label}</div>
        {(isZh ? caseItem.myRole : caseItem.myRoleEn) && (
          <div className="text-[11px] text-bhai-dim line-clamp-1 mt-2 pt-2 border-t border-white/10">
            <span className="text-bhai-dim/80">{d.myRoleLabel}</span>{isZh ? caseItem.myRole : caseItem.myRoleEn}
          </div>
        )}
      </div>
    </Link>
  );
}
