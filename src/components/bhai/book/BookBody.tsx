"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { BookingForm } from "@/components/bhai/BookingForm";
import { BookFaq } from "@/components/bhai/BookFaq";
import { ArrowRight, Calendar, Clock, ShieldCheck, MessageSquare, Mail } from "lucide-react";

/**
 * /book 页正文（client body，20-c 双语化）
 * - 全部用户可见文案走 t.book.*（zh/en 实时切换）
 * - mailto 预填主题/正文按 locale 生成（仅显示层，收件地址不变）
 * - 样式/结构/classNames 与原 server 页完全一致
 */
export function BookBody() {
  const { t } = useLang();
  const d = t.book;

  const mailHref = `mailto:buster@betterhumanai.dk?subject=${encodeURIComponent(
    d.mailSubject
  )}&body=${encodeURIComponent(d.mailBody)}`;

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
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed">
            {d.heroDesc}
          </p>
        </div>
      </section>

      {/* WHAT HAPPENS IN 20 MIN */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{d.agendaKicker}</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            {d.agendaTitle}
          </h2>

          <div className="space-y-3">
            {d.agendaSteps.map((step, i) => (
              <div key={i} className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-5 card-hover">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12 sm:col-span-2">
                    <div className="font-mono text-xs text-bhai-red tracking-widest">{step.min} min</div>
                  </div>
                  <div className="col-span-12 sm:col-span-4">
                    <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <p className="text-sm text-bhai-muted leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU NEED TO PREPARE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{d.prepKicker}</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            {d.prepTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-3xl font-bold stat-highlight mb-3">{d.prepItems[0].num}</div>
              <h3 className="text-base font-bold text-foreground mb-2">{d.prepItems[0].title}</h3>
              <p className="text-xs text-bhai-muted leading-relaxed">
                {d.prepItems[0].desc}
              </p>
            </div>
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-3xl font-bold stat-highlight mb-3">{d.prepItems[1].num}</div>
              <h3 className="text-base font-bold text-foreground mb-2">{d.prepItems[1].title}</h3>
              <p className="text-xs text-bhai-muted leading-relaxed">
                {d.prepItems[1].desc}
              </p>
            </div>
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-3xl font-bold stat-highlight mb-3">{d.prepItems[2].num}</div>
              <h3 className="text-base font-bold text-foreground mb-2">{d.prepItems[2].title}</h3>
              <p className="text-xs text-bhai-muted leading-relaxed">
                {d.prepItems[2].desc}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
              <p className="text-xs text-foreground leading-relaxed">
                <span className="font-medium">{d.prepNoteLabel}</span>{d.prepNoteBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-8 red-glow">
            <div className="text-center mb-8">
              <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{d.bookKicker}</div>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
                {d.bookTitle}
              </h2>
              <p className="text-sm text-bhai-muted">
                {d.bookDesc}
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="weixin://add/busterl1"
                className="cta-primary rounded-lg p-5 text-white flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <div className="text-base font-medium">{d.wechatLabel}</div>
                    <div className="text-xs opacity-80">{d.wechatNote}</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* WeChat QR — large, prominent */}
              <div className="rounded-lg border border-bhai-red/30 bg-bhai-red/5 p-5 flex items-center gap-5">
                <div className="h-28 w-28 rounded-lg overflow-hidden border border-[#2A2A2A] bg-white p-2 shrink-0">
                  <img
                    src="/wechat-qr.svg"
                    alt={d.qrAlt}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">{d.qrKicker}</div>
                  <div className="text-sm font-medium text-foreground mb-1">{d.qrTitle}</div>
                  <div className="text-xs text-bhai-muted leading-relaxed">
                    {d.qrLines[0]}<br />
                    {d.qrLines[1]}<br />
                    {d.qrLines[2]}
                  </div>
                </div>
              </div>

              <a
                href="https://cal.eu/betterhumanai/20min"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-[#2A2A2A] bg-bhai-bg p-5 hover:border-bhai-red transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5 text-bhai-red" />
                  <div>
                    <div className="text-base font-medium text-foreground">cal.eu/betterhumanai/20min</div>
                    <div className="text-xs text-bhai-muted">{d.calNote}</div>
                  </div>
                </div>
              </a>

              <a
                href={mailHref}
                className="block rounded-lg border border-[#2A2A2A] bg-bhai-bg p-5 hover:border-bhai-red transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-bhai-red" />
                  <div>
                    <div className="text-base font-medium text-foreground">buster@betterhumanai.dk</div>
                    <div className="text-xs text-bhai-muted">{d.mailNote}</div>
                  </div>
                </div>
              </a>
            </div>

            {/* Booking form — lead capture */}
            <div className="mt-8">
              <BookingForm />
            </div>

            <div className="mt-6 pt-6 border-t border-[#2A2A2A]">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Clock className="h-4 w-4 text-bhai-red mx-auto mb-2" />
                  <div className="font-mono text-xs text-bhai-muted">{d.triTime}</div>
                </div>
                <div>
                  <ShieldCheck className="h-4 w-4 text-bhai-red mx-auto mb-2" />
                  <div className="font-mono text-xs text-bhai-muted">NO PITCH</div>
                </div>
                <div>
                  <MessageSquare className="h-4 w-4 text-bhai-red mx-auto mb-2" />
                  <div className="font-mono text-xs text-bhai-muted">NO COMMITMENTS</div>
                </div>
              </div>
            </div>
          </div>

          {/* For the not-yet-ready */}
          <div className="mt-8 text-center">
            <p className="text-sm text-bhai-muted mb-4">
              {d.notReady}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/cases"
                className="rounded-md border border-[#333] bg-transparent px-5 py-2.5 text-sm font-medium text-foreground hover:border-bhai-red hover:bg-[#0F0F0F] transition-colors"
              >
                {d.linkCases}
              </Link>
              <Link
                href="/solutions"
                className="rounded-md border border-[#333] bg-transparent px-5 py-2.5 text-sm font-medium text-foreground hover:border-bhai-red hover:bg-[#0F0F0F] transition-colors"
              >
                {d.linkSolutions}
              </Link>
              <Link
                href="/method"
                className="rounded-md border border-[#333] bg-transparent px-5 py-2.5 text-sm font-medium text-foreground hover:border-bhai-red hover:bg-[#0F0F0F] transition-colors"
              >
                {d.linkMethod}
              </Link>
              <Link
                href="/denmark-insights"
                className="rounded-md border border-[#333] bg-transparent px-5 py-2.5 text-sm font-medium text-foreground hover:border-bhai-red hover:bg-[#0F0F0F] transition-colors"
              >
                {d.linkInsights}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <BookFaq />
    </>
  );
}
