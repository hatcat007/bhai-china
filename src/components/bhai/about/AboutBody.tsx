"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { CTASection } from "@/components/bhai/CTASection";
import { ArrowRight, Code2, Brain, ShieldCheck, Coffee, Plane, Mail, PlayCircle, Sparkles, Heart } from "lucide-react";

/**
 * /about 页正文（client body，Round 20-b i18n）
 * - 全部文案走 t.about.*（zh/en 字典见 src/lib/i18n/dicts/about-method-solutions.ts）
 * - 结构/className/图标/链接与原 server 版逐行一致；SSR 首帧 zh，挂载后实时切换
 * - 刻意保留的双语配对：中文名卡片（陆博明 释义）、Buster Larsen (陆博明) 署名
 */
export function AboutBody() {
  const { t } = useLang();
  const a = t.about;

  return (
    <>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">{a.kicker}</div>
              <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                {a.h1a}<br />
                <span className="stat-highlight">{a.h1b}</span>
              </h1>
              <p className="text-base sm:text-lg text-bhai-muted mb-6 leading-relaxed">
                {a.p1a}<span className="text-foreground font-medium">{a.p1Name}</span>{a.p1b}<span className="text-foreground font-medium">{a.p1CnName}</span>{a.p1c}
              </p>
              <p className="text-base text-bhai-muted mb-8 leading-relaxed">
                {a.p2}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/book" className="cta-primary rounded-md px-6 py-3 text-sm font-medium text-white inline-flex items-center gap-2">
                  {a.ctaPrimary} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/cases" className="rounded-md border border-[#333] bg-transparent px-6 py-3 text-sm font-medium text-foreground hover:border-bhai-red hover:bg-[#0F0F0F] transition-colors">
                  {a.ctaSecondary}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-8 red-glow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-bhai-red shrink-0">
                    { }
                    <img
                      src="/buster-photo-1-thumb.webp"
                      alt={a.avatarAlt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">{a.cardName}</div>
                    <div className="text-xs text-bhai-muted">{a.cardRole}</div>
                  </div>
                </div>

                {/* Chinese name explanation（双语配对：中文名释义本身即内容主体，两种语言下均保留汉字） */}
                <div className="rounded-lg border border-bhai-red/30 bg-bhai-red/5 p-4 mb-5">
                  <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">{a.cnKicker}</div>
                  <div className="text-2xl font-bold text-foreground mb-2">{a.cnName} <span className="text-base text-bhai-muted">{a.cnPinyin}</span></div>
                  <p className="text-xs text-bhai-muted leading-relaxed">
                    <span className="text-foreground">{a.cnL1a}</span>{a.cnL1b}
                    <span className="text-foreground">{a.cnL2a}</span>{a.cnL2b}
                    <span className="text-foreground">{a.cnL3a}</span>{a.cnL3b}
                  </p>
                </div>

                <dl className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Plane className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-mono text-[10px] text-bhai-muted tracking-widest">{a.trackLabel}</dt>
                      <dd className="text-foreground">{a.trackValue}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Code2 className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-mono text-[10px] text-bhai-muted tracking-widest">{a.stackLabel}</dt>
                      <dd className="text-foreground">{a.stackValue}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Brain className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-mono text-[10px] text-bhai-muted tracking-widest">{a.focusLabel}</dt>
                      <dd className="text-foreground">{a.focusValue}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-mono text-[10px] text-bhai-muted tracking-widest">{a.complianceLabel}</dt>
                      <dd className="text-foreground">{a.complianceValue}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-mono text-[10px] text-bhai-muted tracking-widest">{a.contactLabel}</dt>
                      <dd className="text-foreground">{a.contactValue}</dd>
                      <dd className="text-bhai-muted text-xs">buster@betterhumanai.dk</dd>
                    </div>
                  </div>
                </dl>

                {/* WeChat QR code */}
                <div className="mt-6 pt-6 border-t border-[#2A2A2A]">
                  <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">{a.qrKicker}</div>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-lg overflow-hidden border border-[#2A2A2A] bg-white p-1.5 shrink-0">
                      { }
                      <img
                        src="/wechat-qr.svg"
                        alt={a.qrAlt}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground mb-1">{a.qrTitle}</div>
                      <div className="text-xs text-bhai-muted leading-relaxed">
                        {a.qrLine1}<br />
                        {a.qrLine2}<br />
                        {a.qrLine3}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUSTER PHOTO GALLERY */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{a.galKicker}</div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            {a.galTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card overflow-hidden">
              <div className="aspect-square relative">
                { }
                <img
                  src="/buster-photo-1.webp"
                  alt={a.photo1Alt}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="p-4 border-t border-[#2A2A2A]">
                <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1">[ PHOTO 01 ]</div>
                <p className="text-xs text-bhai-muted leading-relaxed">
                  {a.photo1Cap}
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card overflow-hidden">
              <div className="aspect-[3/4] relative">
                { }
                <img
                  src="/buster-photo-2.webp"
                  alt={a.photo2Alt}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="p-4 border-t border-[#2A2A2A]">
                <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1">[ PHOTO 02 ]</div>
                <p className="text-xs text-bhai-muted leading-relaxed">
                  {a.photo2Cap}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MANDARIN VIDEO PLACEHOLDER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-bhai-red/30 bg-bhai-card p-8 red-glow">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5">
                <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{a.vidKicker}</div>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4 leading-tight">
                  {a.vidTitle}
                </h2>
                <p className="text-sm text-bhai-muted leading-relaxed mb-4">
                  {a.vidDesc}
                </p>
                <Link
                  href="/download/mandarin-video-script.md"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm text-bhai-red hover:text-bhai-red-hover font-medium"
                >
                  <PlayCircle className="h-4 w-4" />
                  {a.vidScriptLink}
                </Link>
              </div>
              <div className="md:col-span-7">
                <div className="aspect-video rounded-xl border border-[#2A2A2A] bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  <div className="relative text-center">
                    <div className="h-16 w-16 rounded-full border-2 border-bhai-red bg-bhai-red/10 flex items-center justify-center mx-auto mb-3">
                      <PlayCircle className="h-8 w-8 text-bhai-red" />
                    </div>
                    <div className="font-mono text-xs text-bhai-muted tracking-widest">VIDEO PLACEHOLDER</div>
                    <div className="text-sm text-bhai-dim mt-1">{a.vidPlaceholderNote}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY I DON'T TEACH CHINESE CEOs JEWELRY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-4xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{a.boundKicker}</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            {a.boundTitle}
          </h2>

          <div className="space-y-6">
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="flex items-start gap-4">
                <Heart className="h-5 w-5 text-bhai-red mt-1 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-foreground mb-2">{a.bound1Title}</h3>
                  <p className="text-sm text-bhai-muted leading-relaxed">
                    {a.bound1Desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="flex items-start gap-4">
                <Sparkles className="h-5 w-5 text-bhai-red mt-1 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-foreground mb-2">{a.bound2Title}</h3>
                  <p className="text-sm text-bhai-muted leading-relaxed">
                    {a.bound2a}<span className="text-foreground font-medium">{a.bound2em}</span>{a.bound2b}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-6">
              <div className="flex items-start gap-4">
                <Code2 className="h-5 w-5 text-bhai-red mt-1 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-foreground mb-2">{a.bound3Title}</h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    {a.bound3Desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="flex items-start gap-4">
                <Plane className="h-5 w-5 text-bhai-red mt-1 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-foreground mb-2">{a.bound4Title}</h3>
                  <p className="text-sm text-bhai-muted leading-relaxed">
                    {a.bound4Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MY STORY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-4xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{a.storyKicker}</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            {a.storyTitle}
          </h2>

          <div className="space-y-8">
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">{a.s1Kicker}</div>
              <p className="text-sm text-bhai-muted leading-relaxed">
                {a.s1}
              </p>
            </div>

            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">{a.s2Kicker}</div>
              <p className="text-sm text-bhai-muted leading-relaxed">
                {a.s2}
              </p>
            </div>

            <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-6">
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">{a.s3Kicker}</div>
              <p className="text-sm text-foreground leading-relaxed">
                {a.s3}
              </p>
            </div>

            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">{a.s4Kicker}</div>
              <p className="text-sm text-bhai-muted leading-relaxed">
                {a.s4}
              </p>
            </div>

            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">{a.s5Kicker}</div>
              <p className="text-sm text-foreground leading-relaxed">
                {a.s5}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I BELIEVE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{a.belKicker}</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            {a.belTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {a.beliefs.map((b) => (
              <div key={b.num} className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-5 card-hover">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-2xl font-bold text-bhai-red">{b.num}</span>
                  <h3 className="text-base font-bold text-foreground">{b.title}</h3>
                </div>
                <p className="text-xs text-bhai-muted leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT OTHERS SAY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{a.quoKicker}</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            {a.quoTitle}
          </h2>

          <div className="space-y-4">
            {a.quotes.map((q, i) => (
              <div key={i} className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
                <blockquote className="text-base text-foreground leading-relaxed mb-4 italic">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <div className="text-sm">
                  <div className="font-medium text-bhai-red">— {q.author}</div>
                  <div className="text-xs text-bhai-muted">{q.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CARD */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-8 red-glow">
            <div className="flex items-center gap-3 mb-6">
              <Coffee className="h-5 w-5 text-bhai-red" />
              <h2 className="font-sans text-2xl font-bold text-foreground">{a.ccTitle}</h2>
            </div>
            <p className="text-sm text-bhai-muted leading-relaxed mb-6">
              {a.ccDesc}
            </p>
            <div className="space-y-3">
              <a
                href="weixin://add/busterl1"
                className="block rounded-lg border border-bhai-red/30 bg-bhai-red/5 p-4 hover:border-bhai-red transition-colors"
              >
                <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1">{a.ccWechatKicker}</div>
                <div className="text-sm text-foreground font-medium">{a.ccWechatId}</div>
                <div className="text-xs text-bhai-muted mt-1">{a.ccWechatNote}</div>
              </a>
              <a
                href="https://cal.eu/betterhumanai/20min"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-[#2A2A2A] bg-bhai-bg p-4 hover:border-bhai-red transition-colors"
              >
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-1">{a.ccCalKicker}</div>
                <div className="text-sm text-foreground font-medium">cal.eu/betterhumanai/20min</div>
              </a>
              <a
                href="mailto:buster@betterhumanai.dk"
                className="block rounded-lg border border-[#2A2A2A] bg-bhai-bg p-4 hover:border-bhai-red transition-colors"
              >
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-1">{a.ccEmailKicker}</div>
                <div className="text-sm text-foreground font-medium">buster@betterhumanai.dk</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={a.ctaTitle}
        subtitle={a.ctaSubtitle}
        primaryLabel={a.ctaPrimaryLabel}
        primaryHref="/book"
        secondaryLabel={a.ctaSecondaryLabel}
        secondaryHref="/cases"
      />
    </>
  );
}
