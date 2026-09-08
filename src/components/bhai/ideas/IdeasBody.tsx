"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLang, type Locale } from "@/lib/i18n";
import {
  AI_IDEAS,
  IDEA_CATEGORIES,
  type IdeaCategoryId,
} from "@/lib/data/ai-ideas";
import { localizeTool } from "@/lib/data/ai-tools-en";
import { AI_TOOLS } from "@/lib/data/ai-tools";

/**
 * /ai-ideas 页正文（珠宝公司 AI 落地 25 计）
 * - 全部内容双语（数据层 zh/en 字段 + 组件内页级字典），实时切换不刷新
 * - 分类筛选（framer-motion layout 动画）+ 卡片顶部橙色强调线 + card-sheen 扫光
 * - 结尾 CTA：「预约一场创意 AI 工作坊 / Book a creative AI session」→ /book
 */

type PageDict = {
  heroTitleA: string;
  heroTitleB: string;
  heroDesc: string;
  chipIdeas: string;
  chipCats: string;
  chipFree: string;
  tryFree: string;
  stripKicker: string;
  stripTitle: string;
  stripNote: string;
  ctaKicker: string;
  ctaTitleA: string;
  ctaTitleB: string;
  ctaDesc: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaFootnote: string;
};

const PAGE: Record<Locale, PageDict> = {
  zh: {
    heroTitleA: "珠宝公司用 AI 的",
    heroTitleB: "25 个最佳用法",
    heroDesc:
      "从小红书文案工厂到库存预测——这 25 个想法来自我在 15 个真实丹麦珠宝品牌的一线部署经验。\n每一件，都能在 14 周内跑进你的公司。",
    chipIdeas: "25 个想法",
    chipCats: "6 大类",
    chipFree: "3 个可免费试",
    tryFree: "免费试",
    stripKicker: "[ 先试免费版 ]",
    stripTitle: "这 3 个想法，今天就能免费体验",
    stripNote: "不用留电话，不用等回访——点进去，输入，立刻拿到第一个结果。",
    ctaKicker: "[ CREATIVE AI SESSION ]",
    ctaTitleA: "别收藏清单——",
    ctaTitleB: "预约一场创意 AI 工作坊",
    ctaDesc:
      "20 分钟创意 AI 工作坊：带上你最头疼的一个环节，我们从这 25 个想法里挑出最适合你的品牌的 3 个，排出 14 周落地顺序。不卖软件，不留废话。",
    ctaPrimary: "预约创意 AI 工作坊 →",
    ctaSecondary: "先试 5 个免费工具",
    ctaFootnote: "20 MIN · 中 / EN · 免费且无附加条件",
  },
  en: {
    heroTitleA: "25 ways to use AI",
    heroTitleB: "in your jewellery company",
    heroDesc:
      "From a Xiaohongshu content factory to inventory forecasting — all 25 ideas come from hands-on deployments across 15 real Danish jewellery brands.\nEach one can be running inside your company within 14 weeks.",
    chipIdeas: "25 ideas",
    chipCats: "6 categories",
    chipFree: "3 free to try",
    tryFree: "TRY FREE",
    stripKicker: "[ START FREE ]",
    stripTitle: "3 of these ideas are live as free tools",
    stripNote: "No phone number, no callback — click in, type, get your first result right now.",
    ctaKicker: "[ CREATIVE AI SESSION ]",
    ctaTitleA: "Don't bookmark the list —",
    ctaTitleB: "book a creative AI session",
    ctaDesc:
      "Bring the one bottleneck that hurts most. In a 20-minute creative AI session we shortlist the 3 ideas that fit your brand best and sequence them into a 14-week rollout. No software pitch, no fluff.",
    ctaPrimary: "Book a creative AI session →",
    ctaSecondary: "Try the 5 free tools first",
    ctaFootnote: "20 MIN · ZH / EN · FREE, NO STRINGS",
  },
};

/** 底部「免费试」条对应的三个工具 slug（对应想法 #01 / #06 / #25） */
const STRIP_SLUGS = ["red-copywriter", "objection-handler", "website-analyzer"] as const;

export function IdeasBody() {
  const { locale } = useLang();
  const p = PAGE[locale];
  const [active, setActive] = useState<IdeaCategoryId | "all">("all");

  const catLabel = useMemo(() => {
    const map = new Map(IDEA_CATEGORIES.map((c) => [c.id, locale === "zh" ? c.zh : c.en]));
    return map;
  }, [locale]);

  const counts = useMemo(() => {
    const map = new Map<IdeaCategoryId | "all", number>();
    map.set("all", AI_IDEAS.length);
    for (const idea of AI_IDEAS) {
      map.set(idea.category, (map.get(idea.category) ?? 0) + 1);
    }
    return map;
  }, []);

  const visible = useMemo(
    () => (active === "all" ? AI_IDEAS : AI_IDEAS.filter((i) => i.category === active)),
    [active]
  );

  type StripItem = { slug: string; name: string; href: string };
  const stripTools = useMemo<StripItem[]>(
    () =>
      STRIP_SLUGS.map((slug): StripItem | null => {
        const tool = AI_TOOLS.find((t) => t.slug === slug);
        return tool
          ? { slug, name: localizeTool(tool, locale).name, href: `/tools/${slug}` }
          : null;
      }).filter((x): x is StripItem => x !== null),
    [locale]
  );

  const num = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative gradient-section pt-20 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="font-mono text-[11px] tracking-widest text-bhai-red mb-5">
            [ 25 AI IDEAS // JEWELLERY EDITION ]
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {p.heroTitleA}
            <br />
            <span className="stat-highlight">{p.heroTitleB}</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
            {p.heroDesc}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {[p.chipIdeas, p.chipCats, p.chipFree].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center rounded-full border border-bhai-red/30 bg-bhai-red/5 px-4 py-1.5 font-mono text-[10px] tracking-widest text-bhai-red"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 分类筛选（sticky） ─── */}
      <div className="sticky top-16 z-30 border-b border-[#1F1F1F] bg-black/85 backdrop-blur-md">
        <div
          className="mx-auto max-w-6xl flex gap-2 overflow-x-auto py-3 px-4 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label={locale === "zh" ? "按类别筛选" : "Filter by category"}
        >
          {IDEA_CATEGORIES.map((cat) => {
            const isActive = active === cat.id;
            const label = locale === "zh" ? cat.zh : cat.en;
            const count = counts.get(cat.id) ?? 0;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(cat.id)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs transition-all duration-200 ${
                  isActive
                    ? "border-bhai-red bg-bhai-red text-white font-medium"
                    : "border-[#2A2A2A] bg-bhai-card text-bhai-muted hover:border-bhai-red/50 hover:text-bhai-red"
                }`}
              >
                {label}
                <span className={`ml-1.5 font-mono text-[10px] ${isActive ? "text-white/80" : "text-bhai-red/70"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 25 张卡片 ─── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 gradient-section-alt min-h-[400px]">
        <div className="mx-auto max-w-6xl">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {visible.map((idea) => {
                const Icon = idea.icon;
                const t = locale === "zh" ? idea.zh : idea.en;
                return (
                  <motion.article
                    layout
                    key={idea.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="group relative rounded-2xl border border-[#2A2A2A] bg-bhai-card p-6 overflow-hidden card-sheen"
                  >
                    {/* 顶部橙色强调线 */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-bhai-red/70 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-bold text-bhai-red/80">
                        {num(idea.id)}
                      </span>
                      <span className="rounded-full border border-[#2A2A2A] bg-black/40 px-2.5 py-1 font-mono text-[9px] tracking-widest text-bhai-muted uppercase">
                        {catLabel.get(idea.category)}
                      </span>
                    </div>
                    <Icon className="h-6 w-6 text-bhai-red mb-3" aria-hidden="true" />
                    <h3 className="font-sans text-lg font-bold text-foreground mb-2 leading-snug">
                      {t.title}
                    </h3>
                    <p className="text-sm text-bhai-muted leading-relaxed">{t.desc}</p>
                    {idea.toolHref && (
                      <Link
                        href={idea.toolHref}
                        className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-bhai-red/40 bg-bhai-red/10 px-3 py-1 font-mono text-[10px] tracking-widest text-bhai-red transition-colors hover:bg-bhai-red hover:text-white"
                      >
                        <Sparkles className="h-3 w-3" aria-hidden="true" />
                        {p.tryFree}
                      </Link>
                    )}
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ─── 免费工具条 ─── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">{p.stripKicker}</div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3 leading-tight">
            {p.stripTitle}
          </h2>
          <p className="text-sm text-bhai-muted mb-8 max-w-2xl leading-relaxed">{p.stripNote}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stripTools.map((tool, i) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="group relative rounded-xl border border-[#2A2A2A] bg-bhai-card p-5 transition-colors hover:border-bhai-red/50 card-sheen overflow-hidden"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-bhai-red/70 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"
                />
                <div className="font-mono text-[10px] tracking-widest text-bhai-red mb-2">
                  {num([1, 6, 25][i])} →
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-sans text-sm font-bold text-foreground leading-snug">
                    {tool.name}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-bhai-red transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 结尾 CTA：预约创意 AI 工作坊 ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-4xl">
          <div className="relative rounded-3xl border border-bhai-red/30 bg-bhai-card p-8 sm:p-12 overflow-hidden card-sheen text-center">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-bhai-red to-transparent"
            />
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="font-mono text-[11px] tracking-widest text-bhai-red mb-4">
                {p.ctaKicker}
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4 leading-tight">
                {p.ctaTitleA}
                <br />
                <span className="stat-highlight">{p.ctaTitleB}</span>
              </h2>
              <p className="text-sm sm:text-base text-bhai-muted max-w-2xl mx-auto leading-relaxed mb-8">
                {p.ctaDesc}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/book"
                  className="cta-primary w-full sm:w-auto rounded-md px-6 py-3 text-sm font-medium text-white inline-flex items-center justify-center gap-2"
                >
                  {p.ctaPrimary}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/tools"
                  className="group w-full sm:w-auto rounded-md border border-[#2A2A2A] bg-black/40 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-bhai-red/60 hover:text-bhai-red inline-flex items-center justify-center gap-2"
                >
                  {p.ctaSecondary}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
              <div className="mt-6 font-mono text-[10px] tracking-widest text-bhai-dim uppercase">
                {p.ctaFootnote}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
