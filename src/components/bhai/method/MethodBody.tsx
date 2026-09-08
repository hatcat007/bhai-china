"use client";

import { useLang } from "@/lib/i18n";
import { CTASection } from "@/components/bhai/CTASection";
import { Database, Cpu, ShieldCheck, FileCheck, CheckCircle2, AlertCircle } from "lucide-react";
import type { ElementType } from "react";

/**
 * /method 页正文（client body，Round 20-b i18n）
 * - 全部文案走 t.method.*（zh/en 字典见 src/lib/i18n/dicts/about-method-solutions.ts）
 * - 结构/className/图标/sticky 布局与原 server 版逐行一致；SSR 首帧 zh，挂载后实时切换
 */

function MethodDetailCard({
  icon: Icon, title, desc, output,
}: { icon: ElementType; title: string; desc: string; output: string }) {
  return (
    <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-9 w-9 rounded-lg border border-bhai-red/30 bg-bhai-red/5 flex items-center justify-center">
          <Icon className="h-4 w-4 text-bhai-red" />
        </div>
        <h3 className="text-base font-bold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-bhai-muted leading-relaxed mb-3">{desc}</p>
      <div className="pt-3 border-t border-[#2A2A2A]">
        <div className="font-mono text-[10px] text-bhai-dim tracking-widest">OUTPUT</div>
        <div className="text-xs text-foreground mt-1 font-medium">{output}</div>
      </div>
    </div>
  );
}

export function MethodBody() {
  const { t } = useLang();
  const m = t.method;

  const step1CardIcons = [Database, FileCheck, ShieldCheck, Cpu];
  const step3CardIcons = [ShieldCheck, FileCheck, AlertCircle, Cpu];

  return (
    <>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">{m.kicker}</div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {m.h1a}<br />
            {m.h1b}<br />
            <span className="stat-highlight">{m.h1c}</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed">
            {m.heroDesc}
          </p>
        </div>
      </section>

      {/* THE 3 STEPS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* STEP 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-20">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-mono text-7xl font-bold stat-highlight">01</span>
                  <div>
                    <div className="font-mono text-[10px] text-bhai-muted tracking-widest">STEP 01 / 03</div>
                    <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{m.step1Title}</h2>
                    <div className="font-mono text-xs text-bhai-dim tracking-widest mt-1">BUILD THE CONTEXT</div>
                  </div>
                </div>
                <p className="text-base text-bhai-muted leading-relaxed mb-6">
                  {m.step1Desc}
                </p>
                <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-5">
                  <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">{m.durLabel}</div>
                  <div className="text-2xl font-bold text-foreground">{m.step1Dur}</div>
                  <div className="text-xs text-bhai-muted mt-1">{m.step1DurNote}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {m.step1Cards.map((card, i) => {
                const Icon = step1CardIcons[i];
                return (
                  <MethodDetailCard
                    key={card.title}
                    icon={Icon}
                    title={card.title}
                    desc={card.desc}
                    output={card.output}
                  />
                );
              })}
            </div>
          </div>

          <div className="glow-line" />

          {/* STEP 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-20">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-mono text-7xl font-bold stat-highlight">02</span>
                  <div>
                    <div className="font-mono text-[10px] text-bhai-muted tracking-widest">STEP 02 / 03</div>
                    <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{m.step2Title}</h2>
                    <div className="font-mono text-xs text-bhai-dim tracking-widest mt-1">DEPLOY THE AGENTS</div>
                  </div>
                </div>
                <p className="text-base text-bhai-muted leading-relaxed mb-6">
                  {m.step2Desc}
                </p>
                <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-5">
                  <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">{m.durLabel}</div>
                  <div className="text-2xl font-bold text-foreground">{m.step2Dur}</div>
                  <div className="text-xs text-bhai-muted mt-1">{m.step2DurNote}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-3">{m.step2Block1Kicker}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{m.step2Block1Title}</h3>
                <p className="text-sm text-bhai-muted leading-relaxed">
                  {m.step2Block1a}<span className="text-foreground font-medium">{m.step2Block1em1}</span>{m.step2Block1mid}<span className="text-foreground font-medium">{m.step2Block1em2}</span>{m.step2Block1b}
                </p>
              </div>

              <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-3">{m.step2Block2Kicker}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{m.step2Block2Title}</h3>
                <p className="text-sm text-bhai-muted leading-relaxed mb-4">
                  {m.step2Block2Lead}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{m.step2Q1}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{m.step2Q2}</span>
                  </li>
                </ul>
                <p className="text-sm text-bhai-muted leading-relaxed mt-4">
                  {m.step2Block2Tail}
                </p>
              </div>

              <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-3">{m.step2Block3Kicker}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{m.step2Block3Title}</h3>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {m.step2Tools.map((tool) => (
                    <div key={tool} className="rounded border border-[#1F1F1F] bg-bhai-bg px-2 py-1 text-[11px] font-mono text-bhai-muted text-center">
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glow-line" />

          {/* STEP 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-20">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-mono text-7xl font-bold stat-highlight">03</span>
                  <div>
                    <div className="font-mono text-[10px] text-bhai-muted tracking-widest">STEP 03 / 03</div>
                    <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{m.step3Title}</h2>
                    <div className="font-mono text-xs text-bhai-dim tracking-widest mt-1">STAY AT THE WHEEL</div>
                  </div>
                </div>
                <p className="text-base text-bhai-muted leading-relaxed mb-6">
                  {m.step3Desc}
                </p>
                <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-5">
                  <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">{m.durLabel}</div>
                  <div className="text-2xl font-bold text-foreground">{m.step3Dur}</div>
                  <div className="text-xs text-bhai-muted mt-1">{m.step3DurNote}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {m.step3Cards.map((card, i) => {
                const Icon = step3CardIcons[i];
                return (
                  <MethodDetailCard
                    key={card.title}
                    icon={Icon}
                    title={card.title}
                    desc={card.desc}
                    output={card.output}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{m.prKicker}</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            {m.prTitle}
          </h2>

          <div className="space-y-4">
            {m.principles.map((p) => (
              <div key={p.num} className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover">
                <div className="flex items-start gap-6">
                  <span className="font-mono text-3xl font-bold text-bhai-red shrink-0">{p.num}</span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-bhai-muted leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={m.ctaTitle}
        subtitle={m.ctaSubtitle}
        primaryLabel={m.ctaPrimary}
        primaryHref="/book"
        secondaryLabel={m.ctaSecondary}
        secondaryHref="/cases"
      />
    </>
  );
}
