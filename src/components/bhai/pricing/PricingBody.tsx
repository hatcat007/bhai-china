"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { CTASection } from "@/components/bhai/CTASection";
import { ArrowRight, Check, X, ShieldCheck, Sparkles, Building2, Repeat } from "lucide-react";

/**
 * /pricing 页正文（client body，Round 20-d2 i18n）
 * - 全部文案走 t.pricing.*（zh/en 见 src/lib/i18n/dicts/cases-blog-pricing.ts）
 * - 价格/币种数字与 zh 完全一致（¥15,000-50,000 / ¥40,000-150,000 / ¥20,000 /月起）
 * - tier 序号、icon、ctaHref、highlighted 为结构数据，留在组件内与字典 tiers 按下标对齐
 * - 结构/className/图标/链接与原 server 版逐行一致；SSR 首帧 zh，挂载后实时切换
 */

const TIER_META: { tier: string; icon: React.ElementType; ctaHref: string; highlighted: boolean }[] = [
  { tier: "01", icon: Sparkles, ctaHref: "/book?tier=audit", highlighted: false },
  { tier: "02", icon: Building2, ctaHref: "/book?tier=build", highlighted: true },
  { tier: "03", icon: Repeat, ctaHref: "/book?tier=retainer", highlighted: false },
];

export function PricingBody() {
  const { t } = useLang();
  const p = t.pricing;

  return (
    <>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">{p.heroKicker}</div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {p.heroTitleA}<br />
            <span className="stat-highlight">{p.heroTitleB}</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed whitespace-pre-line">
            {p.heroDesc}
          </p>

          {/* 14-day guarantee banner */}
          <div className="mt-10 rounded-2xl border border-bhai-red/40 bg-bhai-red/5 p-6 red-glow">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-bhai-red/20 border border-bhai-red flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6 text-bhai-red" />
              </div>
              <div>
                <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">{p.guaranteeKicker}</div>
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-foreground mb-2 leading-tight">
                  {p.guaranteeTitle}
                </h2>
                <p className="text-sm text-bhai-muted leading-relaxed whitespace-pre-line">
                  {p.guaranteeDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{p.tiersKicker}</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            {p.tiersTitleA}<br />
            <span className="text-bhai-muted">{p.tiersTitleB}</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {p.tiers.map((tier, i) => (
              <PricingCard
                key={i}
                tier={TIER_META[i].tier}
                name={tier.name}
                nameEn={tier.nameEn}
                tagline={tier.tagline}
                price={tier.price}
                priceNote={tier.priceNote}
                icon={TIER_META[i].icon}
                description={tier.description}
                includes={tier.includes}
                notIncludes={tier.notIncludes}
                cta={tier.cta}
                ctaHref={TIER_META[i].ctaHref}
                highlighted={TIER_META[i].highlighted}
              />
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-[#2A2A2A] bg-bhai-card p-6">
            <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">{p.allProductsKicker}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {p.allProducts.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                  <span className="text-sm text-bhai-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-6xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{p.comparisonKicker}</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            {p.comparisonTitle}
          </h2>

          <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card overflow-hidden">
            <div className="grid grid-cols-3 gap-px bg-[#2A2A2A]">
              <div className="bg-bhai-card p-4">
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest">{p.colDimension}</div>
              </div>
              <div className="bg-bhai-red/10 p-4">
                <div className="font-mono text-[10px] text-bhai-red tracking-widest">BHAI</div>
              </div>
              <div className="bg-bhai-card p-4">
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest">{p.colTraditional}</div>
              </div>

              {p.comparisonRows.map((row, i) => (
                <div key={i} className="contents">
                  <div className="bg-bhai-card p-4 text-sm text-bhai-text">{row[0]}</div>
                  <div className="bg-bhai-red/5 p-4 text-sm text-foreground font-medium flex items-start gap-2">
                    <Check className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    {row[1]}
                  </div>
                  <div className="bg-bhai-card p-4 text-sm text-bhai-muted flex items-start gap-2">
                    <X className="h-4 w-4 text-bhai-dim mt-0.5 shrink-0" />
                    {row[2]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-4xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{p.faqKicker}</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            {p.faqTitle}
          </h2>

          <div className="space-y-4">
            {p.faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
                <h3 className="text-base font-bold text-foreground mb-3 flex items-start gap-3">
                  <span className="font-mono text-xs text-bhai-red tracking-widest mt-1 shrink-0">Q{String(i + 1).padStart(2, '0')}</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-bhai-muted leading-relaxed pl-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={p.ctaTitle}
        subtitle={p.ctaSubtitle}
        primaryLabel={p.ctaPrimary}
        primaryHref="/book"
        secondaryLabel={p.ctaSecondary}
        secondaryHref="/cases"
      />
    </>
  );
}

function PricingCard({
  tier, name, nameEn, tagline, price, priceNote, icon: Icon, description, includes, notIncludes, cta, ctaHref, highlighted,
}: {
  tier: string;
  name: string;
  nameEn: string;
  tagline: string;
  price: string;
  priceNote: string;
  icon: React.ElementType;
  description: string;
  includes: string[];
  notIncludes: string[];
  cta: string;
  ctaHref: string;
  highlighted: boolean;
}) {
  const { t } = useLang();
  const p = t.pricing;

  return (
    <div className={`rounded-2xl p-6 flex flex-col h-full ${highlighted ? "border-2 border-bhai-red bg-bhai-card red-glow" : "border border-[#2A2A2A] bg-bhai-card"}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] text-bhai-muted tracking-widest">TIER {tier}</span>
        {highlighted && (
          <span className="rounded-full bg-bhai-red text-white text-[10px] font-mono px-2 py-0.5 tracking-widest">{p.recommended}</span>
        )}
      </div>

      <div className="flex items-center gap-3 mb-2">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${highlighted ? "bg-bhai-red/20 border border-bhai-red" : "bg-bhai-red/5 border border-bhai-red/30"}`}>
          <Icon className="h-5 w-5 text-bhai-red" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <div className="font-mono text-[10px] text-bhai-muted tracking-widest">{nameEn}</div>
        </div>
      </div>

      <p className="text-xs text-bhai-red mb-4">{tagline}</p>

      <div className="mb-4 pb-4 border-b border-[#2A2A2A]">
        <div className="font-sans text-2xl font-bold text-foreground">{price}</div>
        <div className="text-xs text-bhai-muted mt-1">{priceNote}</div>
      </div>

      <p className="text-sm text-bhai-muted leading-relaxed mb-5">{description}</p>

      <div className="space-y-2 mb-5 flex-1">
        <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-2">{p.includesLabel}</div>
        {includes.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <Check className="h-3.5 w-3.5 text-bhai-red mt-0.5 shrink-0" />
            <span className="text-xs text-bhai-text leading-relaxed">{item}</span>
          </div>
        ))}
        {notIncludes.length > 0 && (
          <>
            <div className="font-mono text-[10px] text-bhai-dim tracking-widest mb-2 mt-4">{p.notIncludesLabel}</div>
            {notIncludes.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <X className="h-3.5 w-3.5 text-bhai-dim mt-0.5 shrink-0" />
                <span className="text-xs text-bhai-dim leading-relaxed">{item}</span>
              </div>
            ))}
          </>
        )}
      </div>

      <Link
        href={ctaHref}
        className={`block rounded-md py-3 text-sm font-medium text-center transition-colors ${highlighted ? "cta-primary text-white" : "border border-[#333] text-foreground hover:border-bhai-red hover:bg-[#0F0F0F]"}`}
      >
        {cta} <ArrowRight className="inline h-3 w-3 ml-1" />
      </Link>
    </div>
  );
}
