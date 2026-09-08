"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { CTASection } from "@/components/bhai/CTASection";
import { blogPosts } from "@/lib/data/blog-posts";
import { ArrowRight, Clock, Calendar } from "lucide-react";

/**
 * /blog 列表页正文（client body，Round 20-d2 i18n）
 * - UI 文案走 t.blog.*；文章字段按 locale 选向：title/titleEn、excerpt/excerptEn、
 *   category/categoryEn、readTime/readTimeEn、tags/tagsEn（BlogPost 类型均已必填）
 * - 结构/className/图标/链接与原 server 版逐行一致；SSR 首帧 zh，挂载后实时切换
 */
export function BlogBody() {
  const { locale, t } = useLang();
  const d = t.blog;
  const isZh = locale === "zh";

  return (
    <>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">{d.heroKicker}</div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {d.heroTitle}
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed whitespace-pre-line">
            {d.heroDesc}
          </p>
        </div>
      </section>

      {/* POSTS LIST */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-5xl space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="rounded-full border border-bhai-red/30 bg-bhai-red/5 px-2.5 py-0.5 text-[10px] font-mono text-bhai-red tracking-widest">
                      {isZh ? post.category : post.categoryEn}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-bhai-muted">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-bhai-muted">
                      <Clock className="h-3 w-3" /> {isZh ? post.readTime : post.readTimeEn}
                    </span>
                  </div>
                  <h2 className="font-sans text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-bhai-red transition-colors leading-tight">
                    {isZh ? post.title : post.titleEn}
                  </h2>
                  <p className="text-sm text-bhai-muted leading-relaxed mb-4">{isZh ? post.excerpt : post.excerptEn}</p>
                  <div className="flex flex-wrap gap-2">
                    {(isZh ? post.tags : post.tagsEn).slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded border border-[#2A2A2A] px-2 py-0.5 text-[10px] font-mono text-bhai-muted">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-4 flex md:justify-end items-start">
                  <div className="inline-flex items-center gap-2 text-sm text-bhai-red group-hover:gap-3 transition-all font-medium">
                    {d.readMore} <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection
        title={d.ctaTitle}
        subtitle={d.ctaSubtitle}
        primaryLabel={d.ctaPrimary}
        primaryHref="/book"
        secondaryLabel={d.ctaSecondary}
        secondaryHref="/cases"
      />
    </>
  );
}
