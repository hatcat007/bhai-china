"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { MetricsPanel } from "@/components/bhai/MetricsPanel";
import { useLang } from "@/lib/i18n";

/**
 * 首页 Hero（i18n Round D-1）
 * - server 首页委托的 client body：徽章/标题/两段文案/CTA/合规徽章/LIVE METRICS 全随 locale 切换
 * - LIVE METRICS 数值/标签走字典（EN 下 "14 天"→"14 days"、"1.8 亿¥"→"¥180M"）
 * - 样式细节：合规项升级为描边 mono 胶囊 + hover 橙色强调（原先为纯文字）
 */

const TICKER_BRANDS = [
  "PANDORA", "GEORG JENSEN", "OLE LYNGGAARD", "SHAMBALLA", "JANE KØNIG",
  "TROLLBEADS", "SOPHIE BILLE BRAHE", "MAANESTEN", "MARIA BLACK", "PILGRIM",
  "ENAMEL CPH", "HARTMANN'S", "AURUM", "PERNILLE CORYDON", "CHARLOTTE LARSEN",
  "珠韵珠宝 NANSHA",
];

export function HomeHero() {
  const { t } = useLang();
  const h = t.home;

  return (
    <section className="relative overflow-hidden gradient-section noise-overlay pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div className="orb-float absolute -top-40 -right-40 w-[600px] h-[600px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="orb-float-slow absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-bhai-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[220px] bg-bhai-red/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Ticker */}
        <div className="ticker-wrap mb-12 border-y border-[#1A1A1A] py-3">
          <div className="ticker">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-8 px-4 shrink-0">
                {TICKER_BRANDS.map((brand) => (
                  <span key={brand + dup} className="font-mono text-xs text-bhai-dim tracking-widest whitespace-nowrap">
                    {brand} <span className="text-bhai-red mx-2">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-bhai-red/30 bg-bhai-red/5 px-4 py-1.5 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-bhai-red animate-pulse" />
              <span className="font-mono text-[11px] tracking-widest text-bhai-red">{h.heroBadge}</span>
            </div>

            <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.15] mb-6">
              {h.heroTitleA}<br />
              <span className="stat-highlight">{h.heroTitleB}</span>
            </h1>

            <p className="text-base sm:text-lg text-bhai-muted mb-6 max-w-2xl leading-relaxed">
              {h.heroLeadA}
              <span className="text-foreground font-medium">{h.heroLeadName}</span>
              {h.heroLeadB}
            </p>

            <p className="text-sm text-bhai-dim mb-8 max-w-2xl leading-relaxed">
              {h.heroHonest}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <Link
                href="/book"
                className="cta-primary rounded-md px-7 py-3.5 text-base font-medium text-white inline-flex items-center gap-2"
              >
                {h.heroCtaPrimary} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/cases"
                className="rounded-md border border-[#333] bg-transparent px-7 py-3.5 text-base font-medium text-foreground hover:border-bhai-red hover:bg-[#0F0F0F] transition-colors"
              >
                {h.heroCtaSecondary}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-bhai-muted">
              {h.compliance.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#2A2A2A] bg-bhai-card px-2.5 py-1 transition-colors hover:border-bhai-red/50 hover:text-bhai-red"
                >
                  <ShieldCheck className="h-3 w-3 text-bhai-red" aria-hidden="true" />
                  {item}
                </span>
              ))}
              <span className="text-bhai-dim ml-1">NO PITCH · NO COMMITMENTS · 20 MINUTES</span>
            </div>
          </div>

          {/* Stats panel — 终端质感 LIVE METRICS（打字机 + count-up，见 MetricsPanel.tsx） */}
          <div className="lg:col-span-5">
            <MetricsPanel stats={h.stats.map((s) => ({ value: s.value, label: s.label }))} />
          </div>
        </div>
      </div>
    </section>
  );
}
