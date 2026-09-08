"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

/**
 * 全站收尾 CTA（11 个页面复用）
 * - i18n Round D-1：转为 client 组件；不传 props 时标题/副题/按钮按 locale 取字典（zh/en）
 * - 传入 props 的页面（about/pricing 等，正文仍为中文）保持原文案，与其页面语言一致
 * - 样式细节：顶部/底部橙色渐变发丝线（与工具卡/弹窗/向导视觉语言统一）
 */

type CTASectionProps = {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  title,
  subtitle,
  primaryLabel,
  primaryHref = "/book",
  secondaryLabel,
  secondaryHref = "/cases",
}: CTASectionProps) {
  const { t } = useLang();
  const c = t.cta;
  const finalTitle = title ?? c.title;
  const finalSubtitle = subtitle ?? c.subtitle;
  const finalPrimary = primaryLabel ?? c.primary;
  const finalSecondary = secondaryLabel ?? c.secondary;

  return (
    <section className="relative gradient-section py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 上下橙色发丝线 */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bhai-red/70 to-transparent"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-bhai-red/70 to-transparent"
      />
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-bhai-red/30 bg-bhai-red/5 px-4 py-1.5 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-bhai-red animate-pulse" />
          <span className="font-mono text-[11px] tracking-widest text-bhai-red">NO PITCH · NO COMMITMENTS</span>
        </div>
        <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
          {finalTitle}
        </h2>
        <p className="text-base sm:text-lg text-bhai-muted mb-10 max-w-2xl mx-auto leading-relaxed">
          {finalSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="cta-primary rounded-md px-8 py-4 text-base font-medium text-white w-full sm:w-auto"
          >
            {finalPrimary}
          </Link>
          {secondaryLabel !== "" && finalSecondary && (
            <Link
              href={secondaryHref}
              className="group rounded-md border border-[#333] bg-transparent px-8 py-4 text-base font-medium text-foreground hover:border-bhai-red hover:bg-[#0F0F0F] transition-colors w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              {finalSecondary}
              <span
                aria-hidden="true"
                className="text-bhai-red transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          )}
        </div>
        <p className="font-mono text-[11px] text-bhai-dim mt-8 tracking-widest">
          BUSTER@BETTERHUMANAI.DK · CAL.EU/BETTERHUMANAI/20MIN
        </p>
      </div>
    </section>
  );
}
