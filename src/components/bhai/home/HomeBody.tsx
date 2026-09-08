"use client";

import Link from "next/link";
import { Reveal } from "@/components/bhai/Reveal";
import { CTASection } from "@/components/bhai/CTASection";
import { ToolsTeaser } from "@/components/bhai/ToolsTeaser";
import { jewelryCases } from "@/lib/data/jewelry-cases";
import { useLang } from "@/lib/i18n";
import { ArrowRight, ShieldCheck, Cpu, Gauge, Sparkles, Diamond, TrendingUp, AlertTriangle, Wrench, Eye, CheckCircle2, XCircle } from "lucide-react";

/**
 * 首页正文（client，i18n Round D-2）
 * - server 首页委托的 client body：HERO 之外的全部 section（THE PROBLEM → FINAL CTA）
 * - 文案全部走 t.homeSec；精选案例卡的双字段（brandName/heroQuote/results label）按 locale 选向，
 *   zh-only 字段（segment / results[0].after / myRole）的英文渲染在 t.homeSec.caseDataEn（按 slug 键）
 * - 结构 / classNames / Reveal 包裹 / Link href / 图标与原 server 版完全一致
 */

export function HomeBody() {
  const { t, locale } = useLang();
  const s = t.homeSec;
  const isZh = locale === "zh";

  const featuredCases = [
    ...jewelryCases.filter((c) => c.slug === "zhuyun-nansha"),
    ...jewelryCases.filter((c) => c.slug !== "zhuyun-nansha").slice(0, 5),
  ];

  return (
    <>
      {/* THE PROBLEM */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <Reveal>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-14">
            <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{s.problemKicker}</div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              {s.problemTitleA} <span className="stat-highlight">89%</span>
              {s.problemTitleB}<br />
              {s.problemTitleC}
            </h2>
            <p className="text-base sm:text-lg text-bhai-muted leading-relaxed">
              {s.problemLead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProblemCard
              icon={<AlertTriangle className="h-5 w-5" />}
              num="01"
              title={s.problem1Title}
              desc={s.problem1Desc}
              stat={s.problem1Stat}
              statLabel={s.problem1StatLabel}
            />
            <ProblemCard
              icon={<Eye className="h-5 w-5" />}
              num="02"
              title={s.problem2Title}
              desc={s.problem2Desc}
              stat={s.problem2Stat}
              statLabel={s.problem2StatLabel}
            />
            <ProblemCard
              icon={<Wrench className="h-5 w-5" />}
              num="03"
              title={s.problem3Title}
              desc={s.problem3Desc}
              stat={s.problem3Stat}
              statLabel={s.problem3StatLabel}
            />
          </div>
        </div>
        </Reveal>
      </section>

      {/* 14-DAY GUARANTEE BANNER — placed prominently after problem */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 gradient-section">
        <Reveal>
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-bhai-red/40 bg-bhai-red/5 p-6 red-glow">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-bhai-red/20 border border-bhai-red flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6 text-bhai-red" />
              </div>
              <div className="flex-1">
                <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1">{s.guaranteeKicker}</div>
                <h2 className="font-sans text-lg sm:text-xl font-bold text-foreground leading-tight">
                  {s.guaranteeTitle}
                </h2>
              </div>
              <Link
                href="/pricing"
                className="cta-primary rounded-md px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap"
              >
                {s.guaranteeCta}
              </Link>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* BHAI 3-LAYER METHOD — beats Hourglass */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <Reveal>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-14">
            <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{s.methodKicker}</div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              {s.methodTitleA}<br />
              <span className="stat-highlight">{s.methodTitleB}</span>
            </h2>
            <p className="text-base sm:text-lg text-bhai-muted leading-relaxed">
              {s.methodLead}
            </p>
          </div>

          <div className="space-y-6">
            {/* Layer 1 — Design Memory */}
            <LayerCard
              layer="LAYER 01"
              name={s.layer1Name}
              nameZh={isZh ? s.layer1NameZh : undefined}
              tagline={s.layer1Tagline}
              desc={s.layer1Desc}
              details={s.layer1Details}
              includesLabel={s.layerIncludes}
            />

            {/* Layer 2 — Bench Automation */}
            <LayerCard
              layer="LAYER 02"
              name={s.layer2Name}
              nameZh={isZh ? s.layer2NameZh : undefined}
              tagline={s.layer2Tagline}
              desc={s.layer2Desc}
              details={s.layer2Details}
              includesLabel={s.layerIncludes}
            />

            {/* Layer 3 — Clienteling Agents */}
            <LayerCard
              layer="LAYER 03"
              name={s.layer3Name}
              nameZh={isZh ? s.layer3NameZh : undefined}
              tagline={s.layer3Tagline}
              desc={s.layer3Desc}
              details={s.layer3Details}
              includesLabel={s.layerIncludes}
            />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/method"
              className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover group"
            >
              <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-2">{s.methodDeepKicker}</div>
              <div className="text-base font-bold text-foreground group-hover:text-bhai-red transition-colors">
                {s.methodDeepCta}
              </div>
            </Link>
            <Link
              href="/ai-roadmap"
              className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-6 card-hover group"
            >
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">{s.methodRoadKicker}</div>
              <div className="text-base font-bold text-foreground group-hover:text-bhai-red transition-colors">
                {s.methodRoadCta}
              </div>
            </Link>
          </div>
        </div>
        </Reveal>
      </section>

      {/* FEATURED CASES */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <Reveal>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{s.casesKicker}</div>
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
                {s.casesTitle}
              </h2>
              <p className="text-base text-bhai-muted leading-relaxed">
                {s.casesLead}
              </p>
            </div>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-sm text-bhai-red hover:text-bhai-red-hover font-medium whitespace-nowrap"
            >
              {s.casesLink} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredCases.map((c) => (
              <CasePreviewCard key={c.slug} caseItem={c} />
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* WHO THIS IS FOR / NOT FOR */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section">
        <Reveal>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-12">
            <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{s.fitKicker}</div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              {s.fitTitle}
            </h2>
            <p className="text-base text-bhai-muted leading-relaxed">
              {s.fitLead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-bhai-red/30 bg-bhai-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="h-5 w-5 text-bhai-red" />
                <h3 className="text-xl font-bold text-foreground">{s.fitYesTitle}</h3>
              </div>
              <ul className="space-y-4">
                {s.fitYesItems.map((item, i) => (
                  <ForItem key={i}>{item}</ForItem>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-bg/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="h-5 w-5 text-bhai-dim" />
                <h3 className="text-xl font-bold text-bhai-muted">{s.fitNoTitle}</h3>
              </div>
              <ul className="space-y-4">
                {s.fitNoItems.map((item, i) => (
                  <NotItem key={i}>{item}</NotItem>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* SOLUTIONS PREVIEW */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <Reveal>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-12">
            <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{s.solKicker}</div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              {s.solTitle}
            </h2>
            <p className="text-base text-bhai-muted leading-relaxed">
              {s.solLead}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SolutionPreviewCard icon={<Eye className="h-5 w-5" />} title={s.sol1Title} desc={s.sol1Desc} caseCount={s.sol1Count} />
            <SolutionPreviewCard icon={<Sparkles className="h-5 w-5" />} title={s.sol2Title} desc={s.sol2Desc} caseCount={s.sol2Count} />
            <SolutionPreviewCard icon={<Diamond className="h-5 w-5" />} title={s.sol3Title} desc={s.sol3Desc} caseCount={s.sol3Count} />
            <SolutionPreviewCard icon={<TrendingUp className="h-5 w-5" />} title={s.sol4Title} desc={s.sol4Desc} caseCount={s.sol4Count} />
            <SolutionPreviewCard icon={<Cpu className="h-5 w-5" />} title={s.sol5Title} desc={s.sol5Desc} caseCount={s.sol5Count} />
            <SolutionPreviewCard icon={<ShieldCheck className="h-5 w-5" />} title={s.sol6Title} desc={s.sol6Desc} caseCount={s.sol6Count} />
            <SolutionPreviewCard icon={<Gauge className="h-5 w-5" />} title={s.sol7Title} desc={s.sol7Desc} caseCount={s.sol7Count} />
            <SolutionPreviewCard icon={<Wrench className="h-5 w-5" />} title={s.sol8Title} desc={s.sol8Desc} caseCount={s.sol8Count} />
            <SolutionPreviewCard icon={<Cpu className="h-5 w-5" />} title={s.sol9Title} desc={s.sol9Desc} caseCount={s.sol9Count} />
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 text-sm text-bhai-red hover:text-bhai-red-hover font-medium"
            >
              {s.solLink} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        </Reveal>
      </section>

      {/* VOICE / BUSTER QUOTE */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <Reveal>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-6">{s.quoteKicker}</div>
          <blockquote className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight mb-8">
            &ldquo;{s.quoteA}<br />
            {s.quoteB}<br />
            <span className="stat-highlight">{s.quoteC}</span>&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-bhai-red">
              <img
                src="/buster-photo-1-thumb.webp"
                alt={s.quotePhotoAlt}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-left">
              <div className="text-foreground font-medium">{s.quoteName}</div>
              <div className="text-bhai-muted text-xs">{s.quoteRole}</div>
            </div>
            {/* BHAI steering wheel brand mark */}
            <div className="ml-4 pl-4 border-l border-[#2A2A2A]">
              <img
                src="/bhai-mark-80.png"
                alt={s.quoteMarkAlt}
                className="h-10 w-10 object-contain opacity-80"
              />
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* PRICING PREVIEW + AI ROADMAP CTA — competitive advantage over Hourglass */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section">
        <Reveal>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-12">
            <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{s.priceKicker}</div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              {s.priceTitleA}<br />
              <span className="stat-highlight">{s.priceTitleB}</span>
            </h2>
            <p className="text-base text-bhai-muted leading-relaxed">
              {s.priceLead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pricing card */}
            <Link
              href="/pricing"
              className="group rounded-2xl border border-[#2A2A2A] bg-bhai-card p-8 card-hover"
            >
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">{s.priceCardKicker}</div>
              <h3 className="font-sans text-2xl font-bold text-foreground mb-4">{s.priceCardTitle}</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-baseline justify-between pb-2 border-b border-[#2A2A2A]">
                  <span className="text-sm text-bhai-muted">{s.priceRow1}</span>
                  <span className="font-mono text-sm text-foreground">¥15K - 50K</span>
                </div>
                <div className="flex items-baseline justify-between pb-2 border-b border-[#2A2A2A]">
                  <span className="text-sm text-bhai-muted">{s.priceRow2}</span>
                  <span className="font-mono text-sm text-foreground">¥40K - 150K</span>
                </div>
                <div className="flex items-baseline justify-between pb-2 border-b border-[#2A2A2A]">
                  <span className="text-sm text-bhai-muted">{s.priceRow3}</span>
                  <span className="font-mono text-sm text-foreground">{s.priceRow3Value}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-bhai-red font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  {s.priceCta} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>

            {/* AI Roadmap card */}
            <Link
              href="/ai-roadmap"
              className="group rounded-2xl border-2 border-bhai-red bg-bhai-red/5 p-8 card-hover red-glow"
            >
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">{s.roadKicker}</div>
              <h3 className="font-sans text-2xl font-bold text-foreground mb-4">{s.roadTitle}</h3>
              <p className="text-sm text-bhai-muted leading-relaxed mb-6">
                {s.roadDesc}
              </p>
              <div className="space-y-2 mb-6">
                {[t.roadmap.brandNameLabel, t.roadmap.revenueLabel, t.roadmap.stageLabel, t.roadmap.painLabel, t.roadmap.chinaLabel].map((q, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-bhai-red w-6">Q{i + 1}</span>
                    <span className="text-bhai-text">{q}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-bhai-red font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  {s.roadCta} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
        </Reveal>
      </section>

      {/* FREE AI TOOLS TEASER（Task 7-c 交付，直接置于最终 CTA 之前） */}
      <ToolsTeaser />

      {/* FINAL CTA */}
      <CTASection />
    </>
  );
}

function ProblemCard({
  icon, num, title, desc, stat, statLabel,
}: { icon: React.ReactNode; num: string; title: string; desc: string; stat: string; statLabel: string }) {
  return (
    <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover">
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[10px] text-bhai-muted tracking-widest">{num}</span>
        <span className="text-bhai-red">{icon}</span>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-3">{title}</h3>
      <p className="text-sm text-bhai-muted leading-relaxed mb-5">{desc}</p>
      <div className="pt-4 border-t border-[#2A2A2A]">
        <div className="font-sans text-2xl font-bold stat-highlight">{stat}</div>
        <div className="text-[11px] font-mono text-bhai-dim mt-1">{statLabel}</div>
      </div>
    </div>
  );
}

function LayerCard({
  layer, name, nameZh, tagline, desc, details, includesLabel,
}: { layer: string; name: string; nameZh?: string; tagline: string; desc: string; details: string[]; includesLabel: string }) {
  return (
    <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-4">
          <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">{layer}</div>
          <h3 className="font-sans text-2xl font-bold text-foreground mb-1">{name}</h3>
          {nameZh && <div className="text-sm text-bhai-muted mb-3">{nameZh}</div>}
          <div className="inline-block rounded-full border border-bhai-red/30 bg-bhai-red/5 px-3 py-1 text-[11px] font-mono text-bhai-red tracking-widest">
            {tagline}
          </div>
        </div>
        <div className="md:col-span-5">
          <p className="text-sm text-bhai-muted leading-relaxed">{desc}</p>
        </div>
        <div className="md:col-span-3">
          <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-3">{includesLabel}</div>
          <ul className="space-y-1.5">
            {details.map((d, i) => (
              <li key={i} className="text-xs text-bhai-text flex items-start gap-1.5">
                <span className="text-bhai-red mt-0.5">→</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function CasePreviewCard({ caseItem }: { caseItem: typeof jewelryCases[number] }) {
  const { t, locale } = useLang();
  const s = t.homeSec;
  const isZh = locale === "zh";
  const en = isZh ? undefined : s.caseDataEn[caseItem.slug];
  const foundedYear = caseItem.founded.split(" ")[0];
  const segment = isZh ? caseItem.segment : en?.segment || caseItem.segment;
  const after = isZh ? caseItem.results[0].after : en?.after || caseItem.results[0].after;
  const role = isZh ? caseItem.myRole : en?.role || caseItem.myRole;

  return (
    <Link
      href={`/cases/${caseItem.slug}`}
      data-cursor={s.caseCursor}
      className="group relative overflow-hidden rounded-xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] text-bhai-muted tracking-widest">
          {isZh ? `${foundedYear} ${s.caseEst}` : `${s.caseEst} ${foundedYear}`}
        </span>
        <span className="font-mono text-[10px] text-bhai-red tracking-widest">CASE STUDY</span>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-bhai-red transition-colors">
        {isZh ? caseItem.brandNameZh : caseItem.brandName}
      </h3>
      <div className="text-xs text-bhai-muted mb-4">{segment}</div>
      <p className="text-sm text-bhai-muted leading-relaxed mb-5 flex-1 line-clamp-3">
        {isZh ? caseItem.heroQuoteZh : caseItem.heroQuote}
      </p>
      <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between">
        <span className="text-[11px] font-mono text-bhai-dim">{after}</span>
        <span className="text-bhai-red text-sm group-hover:translate-x-1 transition-transform">
          <ArrowRight className="h-4 w-4" />
        </span>
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
        <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1.5">{s.caseKeyData}</div>
        <div className="text-lg font-bold text-foreground leading-snug">{after}</div>
        <div className="text-[11px] text-bhai-muted mt-0.5">
          {isZh ? caseItem.results[0].labelZh : caseItem.results[0].label}
        </div>
        {role && (
          <div className="text-[11px] text-bhai-dim line-clamp-1 mt-2 pt-2 border-t border-white/10">
            <span className="text-bhai-dim/80">{s.caseMyRole} · </span>{role}
          </div>
        )}
      </div>
    </Link>
  );
}

function SolutionPreviewCard({ icon, title, desc, caseCount }: { icon: React.ReactNode; title: string; desc: string; caseCount: string }) {
  return (
    <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-5 card-hover">
      <div className="flex items-center justify-between mb-3">
        <span className="text-bhai-red">{icon}</span>
        <span className="font-mono text-[10px] text-bhai-dim tracking-widest">{caseCount}</span>
      </div>
      <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
      <p className="text-xs text-bhai-muted leading-relaxed">{desc}</p>
    </div>
  );
}

function ForItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
      <span className="text-sm text-bhai-text leading-relaxed">{children}</span>
    </li>
  );
}

function NotItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <XCircle className="h-4 w-4 text-bhai-dim mt-0.5 shrink-0" />
      <span className="text-sm text-bhai-dim leading-relaxed">{children}</span>
    </li>
  );
}
