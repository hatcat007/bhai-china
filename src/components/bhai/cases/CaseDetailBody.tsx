"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { CTASection } from "@/components/bhai/CTASection";
import { CaseNav } from "@/components/bhai/CaseNav";
import type { JewelryCase } from "@/lib/data/jewelry-cases";
import { ArrowRight, MapPin, Calendar, Building2, TrendingUp, Quote, CheckCircle2, Wrench } from "lucide-react";

/**
 * /cases/[slug] 详情页正文（client body，Round 20-d2 i18n）
 * - 接收 server 侧取好的 caseItem + prev/next（plain serializable）
 * - UI 文案走 t.casesPage.*；案例字段按 locale 选向（jewelry-cases.ts：无后缀 = EN，`…Zh` = 中文）
 * - results 用 before/beforeEn + after/afterEn（zh 显示 before/after，en 显示 beforeEn/afterEn）
 * - 结构/className/图标/链接与原 server 版逐行一致；SSR 首帧 zh，挂载后实时切换
 * - 「ORIGINAL ENGLISH QUOTE」区块仅 zh 渲染：en 下主引言已是同一句英文，重复展示无意义
 */
export function CaseDetailBody({
  caseItem,
  caseNumber,
  total,
  prev,
  next,
}: {
  caseItem: JewelryCase;
  caseNumber: number;
  total: number;
  prev?: { slug: string; brandNameZh: string; brandName: string };
  next?: { slug: string; brandNameZh: string; brandName: string };
}) {
  const { locale, t } = useLang();
  const d = t.casesPage;
  const isZh = locale === "zh";
  const c = caseItem;

  return (
    <>
      {/* HERO */}
      <section className="relative gradient-section pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          <Link href="/cases" className="inline-flex items-center gap-1.5 text-xs font-mono text-bhai-muted hover:text-bhai-red mb-8 transition-colors">
            <ArrowRight className="h-3 w-3 rotate-180" />
            {d.backToIndex}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">
                [ CASE {String(caseNumber).padStart(2, '0')} / {String(total).padStart(2, '0')} · {c.slug === "zhuyun-nansha" ? d.originChina : d.originDenmark} ]
              </div>
              <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                {isZh ? c.brandNameZh : c.brandName}
              </h1>
              {isZh && (
                <div className="text-base text-bhai-muted mb-6">{c.brandName}</div>
              )}

              <blockquote className="border-l-2 border-bhai-red pl-6 py-2 mb-6">
                <p className="font-sans text-lg sm:text-xl text-foreground leading-relaxed italic">
                  &ldquo;{isZh ? c.heroQuoteZh : c.heroQuote}&rdquo;
                </p>
              </blockquote>

              {(isZh ? c.myRole : c.myRoleEn) && (
                <div className="mb-6">
                  <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1.5">{d.myRoleKicker}</div>
                  <p className="text-sm text-bhai-muted leading-relaxed max-w-2xl">{isZh ? c.myRole : c.myRoleEn}</p>
                </div>
              )}

              <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-5">
                <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">{d.deploymentLabel}</div>
                <p className="text-sm text-foreground leading-relaxed font-medium">
                  {isZh ? c.bhaiEngagementZh : c.bhaiEngagement}
                </p>
              </div>
            </div>

            {/* Brand vitals */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-6">
                <div className="font-mono text-xs text-bhai-muted tracking-widest mb-5 pb-4 border-b border-[#2A2A2A]">
                  {d.brandProfile}
                </div>
                <dl className="space-y-4">
                  <Vital icon={<Calendar className="h-4 w-4" />} label={d.vitalFounded} value={isZh ? c.founded : c.foundedEn} />
                  <Vital icon={<MapPin className="h-4 w-4" />} label={d.vitalHq} value={isZh ? c.hq : c.hqEn} />
                  <Vital icon={<Building2 className="h-4 w-4" />} label={d.vitalPositioning} value={isZh ? c.segment : c.segmentEn} />
                  <Vital icon={<TrendingUp className="h-4 w-4" />} label={d.vitalRevenue} value={isZh ? c.revenue : c.revenueEn} />
                  <Vital icon={<Building2 className="h-4 w-4" />} label={d.vitalChannels} value={isZh ? c.stores : c.storesEn} />
                </dl>
                <div className="mt-5 pt-5 border-t border-[#2A2A2A]">
                  <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-2">{d.chinaStatusLabel}</div>
                  <div className="text-sm text-bhai-text leading-relaxed">{isZh ? c.chinaStatusZh : c.chinaStatus}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS BANNER */}
      <section className="relative gradient-section-alt py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-6">{d.resultsKicker}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.results.map((r, i) => (
              <div key={i} className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
                <div className="text-[11px] font-mono text-bhai-muted mb-3 leading-tight">{isZh ? r.labelZh : r.label}</div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-mono text-bhai-dim uppercase">Before</span>
                    <span className="text-xs text-bhai-dim line-through">{isZh ? r.before : r.beforeEn}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-mono text-bhai-red uppercase">After</span>
                    <span className="font-sans text-base font-bold stat-highlight">{isZh ? r.after : r.afterEn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="relative gradient-section py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{d.challengeKicker}</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            {d.challengeTitle}
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-base sm:text-lg text-bhai-muted leading-relaxed">
              {isZh ? c.challengeZh : c.challenge}
            </p>
          </div>

          {/* Key collections + materials */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-3">{d.keyCollectionsLabel}</div>
              <ul className="space-y-2">
                {(isZh ? c.keyCollections : c.keyCollectionsEn).map((col, i) => (
                  <li key={i} className="text-sm text-bhai-text flex items-start gap-2">
                    <span className="text-bhai-red mt-1">◆</span>
                    <span>{col}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-3">{d.materialsLabel}</div>
              <div className="flex flex-wrap gap-2">
                {(isZh ? c.materials : c.materialsEn).map((m, i) => (
                  <span key={i} className="rounded border border-[#2A2A2A] bg-bhai-bg px-2.5 py-1 text-xs text-bhai-muted">
                    {m}
                  </span>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-[#2A2A2A]">
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-2">{d.designDnaLabel}</div>
                <p className="text-xs text-bhai-text leading-relaxed">{isZh ? c.designDnaZh : c.designDna}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="relative gradient-section-alt py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{d.solutionKicker}</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            {d.solutionTitle}
          </h2>
          <p className="text-base sm:text-lg text-bhai-muted leading-relaxed mb-8">
            {isZh ? c.solutionZh : c.solution}
          </p>

          {(isZh ? c.mechanics : c.mechanicsEn) && (
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6 sm:p-8 card-hover mb-12">
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-4">{d.mechanicsKicker}</div>
              <p className="text-sm sm:text-base text-bhai-text leading-relaxed">{isZh ? c.mechanics : c.mechanicsEn}</p>
            </div>
          )}

          {/* AI Workforce Cards */}
          <div className="font-mono text-xs text-bhai-muted tracking-widest mb-4">{d.agentsKicker}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(isZh ? c.agentsZh : c.agents).map((agent, i) => (
              <div key={i} className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-5 card-hover">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-bhai-red/20 to-bhai-red/5 border border-bhai-red/30 flex items-center justify-center shrink-0">
                    <span className="font-mono text-xs text-bhai-red font-bold">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground mb-1">{agent}</div>
                    <div className="text-[11px] font-mono text-bhai-dim">AGENT · AUTONOMOUS WITHIN BOUNDARIES</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
              <p className="text-xs text-bhai-text leading-relaxed">
                {d.agentsNote}
                <span className="text-bhai-red font-medium">{d.agentsNoteStrong}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative gradient-section py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{d.timelineKicker}</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            {d.timelineTitle}
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-bhai-red via-[#2A2A2A] to-transparent" />

            <div className="space-y-8">
              {c.timeline.map((step, i) => (
                <div key={i} className="relative pl-16">
                  <div className="absolute left-0 top-1 h-12 w-12 rounded-full border-2 border-bhai-red bg-black flex items-center justify-center">
                    <span className="font-mono text-[10px] font-bold text-bhai-red">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[10px] text-bhai-red tracking-widest">{step.week}</span>
                      <span className="h-px flex-1 bg-[#2A2A2A]" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">{isZh ? step.titleZh : step.title}</h3>
                    <p className="text-sm text-bhai-muted leading-relaxed">{isZh ? step.detailZh : step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {(isZh ? c.friction : c.frictionEn) && (
            <div className="mt-12 rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <Wrench className="h-4 w-4 text-bhai-red shrink-0" />
                <div className="font-mono text-xs text-bhai-red tracking-widest">{d.frictionKicker}</div>
              </div>
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-5">
                  <span className="font-mono text-[10px] text-bhai-muted tracking-widest shrink-0 sm:pt-0.5 sm:w-16">{d.frictionProblemLabel}</span>
                  <p className="text-sm text-bhai-text leading-relaxed">{isZh ? c.friction!.problem : c.frictionEn!.problem}</p>
                </div>
                <div className="h-px bg-bhai-red/20" />
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-5">
                  <span className="font-mono text-[10px] text-bhai-red tracking-widest shrink-0 sm:pt-0.5 sm:w-16">{d.frictionFixLabel}</span>
                  <p className="text-sm text-bhai-text leading-relaxed">{isZh ? c.friction!.fix : c.frictionEn!.fix}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* QUOTE */}
      <section className="relative gradient-section-alt py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl text-center">
          <Quote className="h-8 w-8 text-bhai-red mx-auto mb-6" />
          <blockquote className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight mb-8">
            &ldquo;{isZh ? c.quoteZh : c.quote}&rdquo;
          </blockquote>
          <div className="text-sm">
            <div className="text-foreground font-medium">— {isZh ? c.quoteAuthorZh : (c.quoteAuthorEn ?? c.quoteAuthor)}</div>
          </div>
        </div>
      </section>

      {/* ENGLISH ORIGINAL QUOTE（en 模式不渲染：主引言已是英文原文，避免重复且防中文泄漏） */}
      {isZh && (
        <section className="relative gradient-section py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="font-mono text-xs text-bhai-dim tracking-widest mb-3">[ ORIGINAL ENGLISH QUOTE ]</div>
            <p className="font-mono text-sm text-bhai-muted leading-relaxed italic">
              &ldquo;{c.quote}&rdquo;
            </p>
            <p className="font-mono text-[11px] text-bhai-dim mt-2">— {c.quoteAuthor}</p>
          </div>
        </section>
      )}

      {/* CASE NAV */}
      <section className="gradient-section-alt py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <CaseNav
            prev={prev ? { slug: prev.slug, brandNameZh: prev.brandNameZh, brandName: prev.brandName } : undefined}
            next={next ? { slug: next.slug, brandNameZh: next.brandNameZh, brandName: next.brandName } : undefined}
          />
          <div className="mt-8 text-center">
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-sm text-bhai-red hover:text-bhai-red-hover font-medium"
            >
              {d.backToAll} <ArrowRight className="h-4 w-4 rotate-90" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title={d.detailCtaTitle.replace("{brand}", isZh ? c.brandNameZh : c.brandName)}
        subtitle={d.detailCtaSubtitle}
        primaryLabel={d.detailCtaPrimary}
        secondaryLabel={d.detailCtaSecondary}
        secondaryHref="/cases"
      />
    </>
  );
}

function Vital({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-bhai-red mt-0.5">{icon}</span>
      <div className="flex-1">
        <dt className="font-mono text-[10px] text-bhai-muted tracking-widest uppercase">{label}</dt>
        <dd className="text-sm text-foreground mt-0.5">{value}</dd>
      </div>
    </div>
  );
}
