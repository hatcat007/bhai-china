import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/bhai/PageShell";
import { CTASection } from "@/components/bhai/CTASection";
import { CaseNav } from "@/components/bhai/CaseNav";
import { ReadingProgress } from "@/components/bhai/ReadingProgress";
import { jewelryCases, getCaseBySlug } from "@/lib/data/jewelry-cases";
import { ArrowRight, MapPin, Calendar, Building2, TrendingUp, Quote, CheckCircle2, Wrench } from "lucide-react";

export function generateStaticParams() {
  return jewelryCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);
  if (!caseItem) return { title: "案例未找到 | Better Human AI" };
  return {
    title: `${caseItem.brandNameZh}（${caseItem.brandName}）AI 案例 | Better Human AI`,
    description: `BHAI 为 ${caseItem.brandName} 部署 AI 工作队：${caseItem.bhaiEngagementZh.slice(0, 80)}`,
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);
  if (!caseItem) notFound();

  const currentIdx = jewelryCases.findIndex((c) => c.slug === slug);
  const prev = currentIdx > 0 ? jewelryCases[currentIdx - 1] : undefined;
  const next = currentIdx < jewelryCases.length - 1 ? jewelryCases[currentIdx + 1] : undefined;

  // Article JSON-LD（案例页结构化数据）
  const caseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${caseItem.brandNameZh}（${caseItem.brandName}）AI 转型案例`,
    description: caseItem.bhaiEngagementZh,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://betterhumanai.dk/cases/${caseItem.slug}`,
    },
    image: ["https://betterhumanai.dk/og-image.jpg"],
    author: {
      "@type": "Person",
      name: "Buster ML Larsen",
      alternateName: "陆博明",
      url: "https://betterhumanai.dk/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Better Human AI",
      url: "https://betterhumanai.dk",
    },
    about: {
      "@type": "Organization",
      name: caseItem.brandName,
      foundingDate: caseItem.founded,
      description: caseItem.challengeZh,
    },
    inLanguage: "zh-CN",
  };

  return (
    <PageShell>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd) }} />
      {/* HERO */}
      <section className="relative gradient-section pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          <Link href="/cases" className="inline-flex items-center gap-1.5 text-xs font-mono text-bhai-muted hover:text-bhai-red mb-8 transition-colors">
            <ArrowRight className="h-3 w-3 rotate-180" />
            返回案例索引
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">
                [ CASE {String(currentIdx + 1).padStart(2, '0')} / {String(jewelryCases.length).padStart(2, '0')} · {caseItem.slug === "zhuyun-nansha" ? "中国珠宝" : "丹麦珠宝"} ]
              </div>
              <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                {caseItem.brandNameZh}
              </h1>
              <div className="text-base text-bhai-muted mb-6">{caseItem.brandName}</div>

              <blockquote className="border-l-2 border-bhai-red pl-6 py-2 mb-6">
                <p className="font-sans text-lg sm:text-xl text-foreground leading-relaxed italic">
                  &ldquo;{caseItem.heroQuoteZh}&rdquo;
                </p>
              </blockquote>

              {caseItem.myRole && (
                <div className="mb-6">
                  <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1.5">[ 我的角色 ]</div>
                  <p className="text-sm text-bhai-muted leading-relaxed max-w-2xl">{caseItem.myRole}</p>
                </div>
              )}

              <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-5">
                <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">[ BHAI 部署 ]</div>
                <p className="text-sm text-foreground leading-relaxed font-medium">
                  {caseItem.bhaiEngagementZh}
                </p>
              </div>
            </div>

            {/* Brand vitals */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-6">
                <div className="font-mono text-xs text-bhai-muted tracking-widest mb-5 pb-4 border-b border-[#2A2A2A]">
                  [ 品牌档案 ]
                </div>
                <dl className="space-y-4">
                  <Vital icon={<Calendar className="h-4 w-4" />} label="创立" value={caseItem.founded} />
                  <Vital icon={<MapPin className="h-4 w-4" />} label="总部" value={caseItem.hq} />
                  <Vital icon={<Building2 className="h-4 w-4" />} label="定位" value={caseItem.segment} />
                  <Vital icon={<TrendingUp className="h-4 w-4" />} label="营收" value={caseItem.revenue} />
                  <Vital icon={<Building2 className="h-4 w-4" />} label="渠道" value={caseItem.stores} />
                </dl>
                <div className="mt-5 pt-5 border-t border-[#2A2A2A]">
                  <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-2">中国现状</div>
                  <div className="text-sm text-bhai-text leading-relaxed">{caseItem.chinaStatusZh}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS BANNER */}
      <section className="relative gradient-section-alt py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-6">[ BHAI 部署后 14 周内的结果 ]</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {caseItem.results.map((r, i) => (
              <div key={i} className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
                <div className="text-[11px] font-mono text-bhai-muted mb-3 leading-tight">{r.labelZh}</div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-mono text-bhai-dim uppercase">Before</span>
                    <span className="text-xs text-bhai-dim line-through">{r.before}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-mono text-bhai-red uppercase">After</span>
                    <span className="font-sans text-base font-bold stat-highlight">{r.after}</span>
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
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 01 · 挑战 ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            这个品牌面对的真相
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-base sm:text-lg text-bhai-muted leading-relaxed">
              {caseItem.challengeZh}
            </p>
          </div>

          {/* Key collections + materials */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-3">关键系列</div>
              <ul className="space-y-2">
                {caseItem.keyCollections.map((col, i) => (
                  <li key={i} className="text-sm text-bhai-text flex items-start gap-2">
                    <span className="text-bhai-red mt-1">◆</span>
                    <span>{col}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-3">材料与工艺</div>
              <div className="flex flex-wrap gap-2">
                {caseItem.materials.map((m, i) => (
                  <span key={i} className="rounded border border-[#2A2A2A] bg-bhai-bg px-2.5 py-1 text-xs text-bhai-muted">
                    {m}
                  </span>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-[#2A2A2A]">
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-2">设计 DNA</div>
                <p className="text-xs text-bhai-text leading-relaxed">{caseItem.designDnaZh}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="relative gradient-section-alt py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 02 · BHAI 解决方案 ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            我部署了什么
          </h2>
          <p className="text-base sm:text-lg text-bhai-muted leading-relaxed mb-8">
            {caseItem.solutionZh}
          </p>

          {caseItem.mechanics && (
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6 sm:p-8 card-hover mb-12">
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-4">[ 它是怎么跑起来的 ]</div>
              <p className="text-sm sm:text-base text-bhai-text leading-relaxed">{caseItem.mechanics}</p>
            </div>
          )}

          {/* AI Workforce Cards */}
          <div className="font-mono text-xs text-bhai-muted tracking-widest mb-4">[ AI 工作队配置 ]</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseItem.agentsZh.map((agent, i) => (
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
                所有代理在 BHAI 控制中心内运行。每条 AI 决策都有审计链。关键决策（如微信消息发出、定制设计批准）由人类签字。
                <span className="text-bhai-red font-medium"> 人在环里。AI 不撒手。</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative gradient-section py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 03 · 14 周时间线 ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            从签约到生产 · 14 周路径
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-bhai-red via-[#2A2A2A] to-transparent" />

            <div className="space-y-8">
              {caseItem.timeline.map((step, i) => (
                <div key={i} className="relative pl-16">
                  <div className="absolute left-0 top-1 h-12 w-12 rounded-full border-2 border-bhai-red bg-black flex items-center justify-center">
                    <span className="font-mono text-[10px] font-bold text-bhai-red">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[10px] text-bhai-red tracking-widest">{step.week}</span>
                      <span className="h-px flex-1 bg-[#2A2A2A]" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">{step.titleZh}</h3>
                    <p className="text-sm text-bhai-muted leading-relaxed">{step.detailZh}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {caseItem.friction && (
            <div className="mt-12 rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <Wrench className="h-4 w-4 text-bhai-red shrink-0" />
                <div className="font-mono text-xs text-bhai-red tracking-widest">[ 哪里出了问题 · 怎么解决的 ]</div>
              </div>
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-5">
                  <span className="font-mono text-[10px] text-bhai-muted tracking-widest shrink-0 sm:pt-0.5 sm:w-16">摩擦点</span>
                  <p className="text-sm text-bhai-text leading-relaxed">{caseItem.friction.problem}</p>
                </div>
                <div className="h-px bg-bhai-red/20" />
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-5">
                  <span className="font-mono text-[10px] text-bhai-red tracking-widest shrink-0 sm:pt-0.5 sm:w-16">修复</span>
                  <p className="text-sm text-bhai-text leading-relaxed">{caseItem.friction.fix}</p>
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
            &ldquo;{caseItem.quoteZh}&rdquo;
          </blockquote>
          <div className="text-sm">
            <div className="text-foreground font-medium">— {caseItem.quoteAuthorZh}</div>
          </div>
        </div>
      </section>

      {/* ENGLISH ORIGINAL QUOTE */}
      <section className="relative gradient-section py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="font-mono text-xs text-bhai-dim tracking-widest mb-3">[ ORIGINAL ENGLISH QUOTE ]</div>
          <p className="font-mono text-sm text-bhai-muted leading-relaxed italic">
            &ldquo;{caseItem.quote}&rdquo;
          </p>
          <p className="font-mono text-[11px] text-bhai-dim mt-2">— {caseItem.quoteAuthor}</p>
        </div>
      </section>

      {/* CASE NAV */}
      <section className="gradient-section-alt py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <CaseNav
            prev={prev ? { slug: prev.slug, brandNameZh: prev.brandNameZh } : undefined}
            next={next ? { slug: next.slug, brandNameZh: next.brandNameZh } : undefined}
          />
          <div className="mt-8 text-center">
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-sm text-bhai-red hover:text-bhai-red-hover font-medium"
            >
              返回全部 16 个案例 <ArrowRight className="h-4 w-4 rotate-90" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title={`想看 ${caseItem.brandNameZh} 的方案如何套用到你的品牌？`}
        subtitle="20 分钟。我听你讲你的市场、你的渠道、你的瓶颈。然后告诉你这个案例的哪部分能复制——哪部分需要重新设计。没有 PPT，没有承诺。"
        primaryLabel="预约 20 分钟 →"
        secondaryLabel="看其他案例"
        secondaryHref="/cases"
      />
    </PageShell>
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
