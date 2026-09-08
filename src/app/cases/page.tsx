import Link from "next/link";
import { PageShell } from "@/components/bhai/PageShell";
import { CTASection } from "@/components/bhai/CTASection";
import { jewelryCases } from "@/lib/data/jewelry-cases";
import { ItemListJsonLd } from "@/components/bhai/JsonLd";
import { ArrowRight, MapPin, Calendar, Building2, TrendingUp } from "lucide-react";
import { withOpenGraph } from "@/lib/page-metadata";

export const metadata = withOpenGraph(
  { title: "丹麦珠宝品牌 AI 案例 · 15 个真实部署 | Better Human AI", description: "15 个真实丹麦珠宝品牌的 AI 落地案例：Pandora、Georg Jensen、Ole Lynggaard、Shamballa、Sophie Bille Brahe 等。每个案例包含挑战、AI 工作队配置、量化结果与 14 周时间线。" },
  "/cases",
  "/og-cases.jpg"
);

export default function CasesPage() {
  return (
    <PageShell>
      <ItemListJsonLd
        listName="BHAI 丹麦珠宝品牌 AI 落地案例"
        items={jewelryCases.map((c) => ({ name: `${c.brandNameZh} ${c.brandName}`, url: `/cases/${c.slug}` }))}
      />
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">[ 15 真实案例 · 14 周落地 · 0 PPT ]</div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            丹麦顶级珠宝品牌<br />
            <span className="stat-highlight">的 AI 转型档案</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed">
            这不是行业报告，不是趋势白皮书。这是 15 个真实丹麦珠宝品牌的 AI 部署档案——
            每一个都是 14 周内的生产环境部署，包含挑战、AI 工作队配置、量化结果与完整时间线。
            点击进入查看详情。
          </p>
        </div>
      </section>

      {/* INDEX TABLE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card overflow-hidden mb-12">
            <div className="px-6 py-4 border-b border-[#2A2A2A] flex items-center justify-between">
              <span className="font-mono text-xs text-bhai-muted tracking-widest">[ BHAI // CASE INDEX ]</span>
              <span className="font-mono text-xs text-bhai-red">{jewelryCases.length} 案例</span>
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
                        {c.brandNameZh}
                      </div>
                      <div className="text-xs text-bhai-muted mt-0.5">{c.brandName}</div>
                    </div>
                    <div className="col-span-6 sm:col-span-2 text-xs text-bhai-muted">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-bhai-dim" />
                        {c.founded.split(' ')[0]}
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3 text-xs text-bhai-muted">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-3 w-3 text-bhai-dim" />
                        {c.segment}
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-2 text-right">
                      <span className="inline-flex items-center gap-1 text-xs text-bhai-red font-medium">
                        查看案例 <ArrowRight className="h-3 w-3" />
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
        title="看完 15 个案例了？"
        subtitle="你的品牌是第 16 个。预约 20 分钟，我会告诉你丹麦同行的经验如何套用到你的实际情况——以及哪里套不上。"
        primaryLabel="预约 20 分钟 →"
        secondaryLabel="先看解决方案"
        secondaryHref="/solutions"
      />
    </PageShell>
  );
}

function CaseCard({ caseItem, index }: { caseItem: typeof jewelryCases[number]; index: number }) {
  return (
    <Link
      href={`/cases/${caseItem.slug}`}
      data-cursor="探索"
      className="group relative overflow-hidden rounded-xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] text-bhai-muted tracking-widest">
          CASE {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-mono text-[10px] text-bhai-red tracking-widest">/ {caseItem.founded.split(' ')[0]}</span>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-bhai-red transition-colors">
        {caseItem.brandNameZh}
      </h3>
      <div className="text-xs text-bhai-muted mb-3">{caseItem.brandName}</div>

      <div className="flex items-start gap-1.5 text-xs text-bhai-dim mb-4">
        <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
        <span>{caseItem.hq}</span>
      </div>

      <p className="text-sm text-bhai-muted leading-relaxed mb-5 flex-1 line-clamp-4">
        &ldquo;{caseItem.heroQuoteZh}&rdquo;
      </p>

      <div className="space-y-2 pt-4 border-t border-[#2A2A2A]">
        {caseItem.results.slice(0, 2).map((r, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <span className="text-bhai-dim">{r.labelZh}</span>
            <span className="font-mono text-bhai-red font-medium">{r.after}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-end gap-1 text-xs text-bhai-red group-hover:gap-2 transition-all">
        阅读完整案例 <ArrowRight className="h-3 w-3" />
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
        <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1.5">[ 关键数据 ]</div>
        <div className="text-lg font-bold text-foreground leading-snug">{caseItem.results[0].after}</div>
        <div className="text-[11px] text-bhai-muted mt-0.5">{caseItem.results[0].labelZh}</div>
        {caseItem.myRole && (
          <div className="text-[11px] text-bhai-dim line-clamp-1 mt-2 pt-2 border-t border-white/10">
            <span className="text-bhai-dim/80">我的角色 · </span>{caseItem.myRole}
          </div>
        )}
      </div>
    </Link>
  );
}
