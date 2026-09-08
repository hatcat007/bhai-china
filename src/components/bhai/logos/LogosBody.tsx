"use client";

import { useLang } from "@/lib/i18n";
import { CTASection } from "@/components/bhai/CTASection";
import { Download, Sparkles } from "lucide-react";

/**
 * /logos 页正文（client body，20-c 双语化）
 * - logo 文件名（locale 无关）保留在本组件；名称/概念文案走 t.logos.*
 * - 「SVG 07 · BH 字母组合」概念里引用的「陆博明」是 SVG 作品内的双语副标题原文，属有意双语配对，保持原样
 * - 样式/结构/classNames 与原 server 页完全一致
 */

/** AI 生成 PNG 文件名（与 t.logos.aiItems 下标一一对应） */
const AI_FILES = [
  "zai-logo-01-minimal-typography.png",
  "zai-logo-02-orange-sphere.png",
  "zai-logo-03-human-augmented.png",
  "zai-logo-04-steering-wheel.png",
  "zai-logo-05-three-layers.png",
  "zai-logo-06-inverted-hourglass.png",
  "zai-logo-07-bh-monogram.png",
  "zai-logo-08-terminal-prompt.png",
  "zai-logo-09-diamond-facet.png",
  "zai-logo-10-danish-cross.png",
] as const;

/** 矢量 SVG 文件名（与 t.logos.svgItems 下标一一对应） */
const SVG_FILES = [
  "logo-01-wordmark.svg",
  "logo-02-dot-monogram.svg",
  "logo-03-human-circuit.svg",
  "logo-04-steering-wheel.svg",
  "logo-05-layer-stack.svg",
  "logo-06-inverted-hourglass.svg",
  "logo-07-bh-monogram.svg",
  "logo-08-terminal-cursor.svg",
  "logo-09-diamond-facet.svg",
  "logo-10-danish-cross-pulse.svg",
] as const;

export function LogosBody() {
  const { t } = useLang();
  const d = t.logos;

  return (
    <>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-bhai-red/30 bg-bhai-red/5 px-4 py-1.5 mb-6">
            <Sparkles className="h-3 w-3 text-bhai-red" />
            <span className="font-mono text-[11px] tracking-widest text-bhai-red">{d.heroBadge}</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {d.heroTitleA}<br />
            <span className="stat-highlight">{d.heroTitleB}</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed">
            {d.heroDescA}<strong className="text-foreground">{d.heroStrong1}</strong>{d.heroDescB}
            <strong className="text-foreground">{d.heroStrong2}</strong>{d.heroDescC}
          </p>
        </div>
      </section>

      {/* AI-GENERATED LOGOS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="h-5 w-5 text-bhai-red" />
            <div>
              <div className="font-mono text-xs text-bhai-red tracking-widest mb-1">{d.aiKicker}</div>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {d.aiTitle}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AI_FILES.map((file, i) => (
              <div key={file} className="rounded-2xl border border-[#2A2A2A] bg-bhai-card overflow-hidden card-hover">
                <div className="aspect-square bg-black flex items-center justify-center p-8">
                  <img
                    src={`/logos/${file}`}
                    alt={`BHAI Logo — ${d.aiItems[i].name}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1">[ AI DESIGN ]</div>
                  <h3 className="text-sm font-bold text-foreground mb-2">{d.aiItems[i].name}</h3>
                  <p className="text-xs text-bhai-muted leading-relaxed mb-3">{d.aiItems[i].concept}</p>
                  <a
                    href={`/logos/${file}`}
                    download
                    className="inline-flex items-center gap-1.5 text-[11px] text-bhai-red hover:text-bhai-red-hover font-medium"
                  >
                    <Download className="h-3 w-3" />
                    {d.downloadPng}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SVG LOGOS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-5 w-5 rounded border border-bhai-red flex items-center justify-center">
              <span className="font-mono text-[10px] text-bhai-red font-bold">S</span>
            </div>
            <div>
              <div className="font-mono text-xs text-bhai-red tracking-widest mb-1">{d.svgKicker}</div>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {d.svgTitle}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {SVG_FILES.map((file, i) => (
              <div key={file} className="rounded-xl border border-[#2A2A2A] bg-bhai-card overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                  <div className="md:col-span-7 bg-black p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#2A2A2A]">
                    <img
                      src={`/logos/${file}`}
                      alt={`BHAI Logo — ${d.svgItems[i].name}`}
                      className="max-w-full h-auto"
                      style={{ maxHeight: "100px" }}
                    />
                  </div>
                  <div className="md:col-span-5 p-5">
                    <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">[ SVG DESIGN ]</div>
                    <h3 className="text-sm font-bold text-foreground mb-2">{d.svgItems[i].name}</h3>
                    <p className="text-xs text-bhai-muted leading-relaxed mb-3">{d.svgItems[i].concept}</p>
                    <a
                      href={`/logos/${file}`}
                      download
                      className="inline-flex items-center gap-1.5 text-[11px] text-bhai-red hover:text-bhai-red-hover font-medium"
                    >
                      <Download className="h-3 w-3" />
                      {d.downloadSvg}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI vs SVG COMPARISON */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{d.cmpKicker}</div>
          <h2 className="font-sans text-3xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            {d.cmpTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <h3 className="text-base font-bold text-foreground mb-3">{d.aiCardTitle}</h3>
              <ul className="space-y-2 text-xs text-bhai-muted">
                {d.aiPros.map((point, i) => (
                  <li key={`ai-pro-${i}`} className="flex items-start gap-2"><span className="text-bhai-red mt-0.5">✓</span> {point}</li>
                ))}
                {d.aiCons.map((point, i) => (
                  <li key={`ai-con-${i}`} className="flex items-start gap-2"><span className="text-bhai-dim mt-0.5">✗</span> {point}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <h3 className="text-base font-bold text-foreground mb-3">{d.svgCardTitle}</h3>
              <ul className="space-y-2 text-xs text-bhai-muted">
                {d.svgPros.map((point, i) => (
                  <li key={`svg-pro-${i}`} className="flex items-start gap-2"><span className="text-bhai-red mt-0.5">✓</span> {point}</li>
                ))}
                {d.svgCons.map((point, i) => (
                  <li key={`svg-con-${i}`} className="flex items-start gap-2"><span className="text-bhai-dim mt-0.5">✗</span> {point}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-6">
            <h3 className="text-base font-bold text-foreground mb-2">{d.recoTitle}</h3>
            <p className="text-sm text-bhai-muted leading-relaxed mb-3">
              {d.recoLines.map((line, i) => (
                <span key={`reco-${i}`}>
                  <strong className="text-foreground">{line.label}</strong>{line.text}
                  {i < d.recoLines.length - 1 && <br />}
                </span>
              ))}
            </p>
            <p className="text-xs text-bhai-dim leading-relaxed">
              {d.recoNoteA}<strong className="text-bhai-red">{d.recoNoteS1}</strong>{d.recoNoteM}
              <strong className="text-bhai-red">{d.recoNoteS2}</strong>{d.recoNoteE}
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title={d.ctaTitle}
        subtitle={d.ctaSubtitle}
        primaryLabel={d.ctaPrimary}
        primaryHref="/book"
        secondaryLabel={d.ctaSecondary}
        secondaryHref="/"
      />
    </>
  );
}
