"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { CTASection } from "@/components/bhai/CTASection";
import { ShareButtons } from "@/components/bhai/ShareButtons";
import type { BlogPost, BlogSection } from "@/lib/data/blog-posts";
import { ArrowRight, Calendar, Clock, ArrowLeft } from "lucide-react";

/**
 * /blog/[slug] 文章页正文（client body，Round 20-d2 i18n）
 * - 接收 server 侧取好的 post + prev/next（plain serializable）
 * - UI 文案走 t.blog.*；正文逐 section 按 locale 取 text/textEn、items/itemsEn、author/authorEn
 *   （en 缺失时回退 zh 原文：`s.textEn ?? s.text`）
 * - 结构/className/图标/链接与原 server 版逐行一致；SSR 首帧 zh，挂载后实时切换
 */
export function BlogPostBody({
  post,
  prev,
  next,
}: {
  post: BlogPost;
  prev?: { slug: string; title: string; titleEn: string };
  next?: { slug: string; title: string; titleEn: string };
}) {
  const { locale, t } = useLang();
  const d = t.blog;
  const isZh = locale === "zh";
  const title = isZh ? post.title : post.titleEn;
  const excerpt = isZh ? post.excerpt : post.excerptEn;
  const category = isZh ? post.category : post.categoryEn;
  const readTime = isZh ? post.readTime : post.readTimeEn;
  const tags = isZh ? post.tags : post.tagsEn;

  return (
    <>
      {/* HERO */}
      <section className="relative gradient-section pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-mono text-bhai-muted hover:text-bhai-red mb-8 transition-colors">
            <ArrowLeft className="h-3 w-3" /> {d.backToBlog}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="rounded-full border border-bhai-red/30 bg-bhai-red/5 px-2.5 py-0.5 text-[10px] font-mono text-bhai-red tracking-widest">
              {category}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-bhai-muted">
              <Calendar className="h-3 w-3" /> {post.date}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-bhai-muted">
              <Clock className="h-3 w-3" /> {readTime}
            </span>
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-bhai-muted leading-relaxed mb-6">{excerpt}</p>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded border border-[#2A2A2A] px-2 py-0.5 text-[10px] font-mono text-bhai-muted">
                  #{tag}
                </span>
              ))}
            </div>
            <ShareButtons title={title} />
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <article className="mx-auto max-w-3xl space-y-6">
          {post.content.map((section, i) => (
            <BlogSectionView key={i} section={section} isZh={isZh} />
          ))}

          {/* Author card */}
          <div className="mt-12 pt-8 border-t border-[#2A2A2A]">
            <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-bhai-red shrink-0">
                  { }
                  <img src="/buster-photo-1-thumb.webp" alt={d.authorPhotoAlt} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground">{d.authorName}</div>
                  <div className="text-xs text-bhai-muted mb-2">{d.authorRole}</div>
                  <p className="text-sm text-bhai-muted leading-relaxed whitespace-pre-line">
                    {d.authorBio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Prev / Next nav */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-5 hover:border-bhai-red transition-colors group">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-bhai-muted tracking-widest mb-2">
                  <ArrowLeft className="h-3 w-3" /> {d.prevPost}
                </div>
                <div className="text-sm font-bold text-foreground group-hover:text-bhai-red transition-colors line-clamp-2">{isZh ? prev.title : prev.titleEn}</div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-5 hover:border-bhai-red transition-colors group text-right">
                <div className="flex items-center justify-end gap-1.5 text-[10px] font-mono text-bhai-muted tracking-widest mb-2">
                  {d.nextPost} <ArrowRight className="h-3 w-3" />
                </div>
                <div className="text-sm font-bold text-foreground group-hover:text-bhai-red transition-colors line-clamp-2">{isZh ? next.title : next.titleEn}</div>
              </Link>
            ) : <div />}
          </div>
        </article>
      </section>

      <CTASection
        title={d.postCtaTitle}
        subtitle={d.postCtaSubtitle}
        primaryLabel={d.postCtaPrimary}
        primaryHref="/book"
        secondaryLabel={d.postCtaSecondary}
        secondaryHref="/blog"
      />
    </>
  );
}

/** 单个正文 section 渲染（en 取 textEn/itemsEn/authorEn，缺省回退 zh） */
function BlogSectionView({ section, isZh }: { section: BlogSection; isZh: boolean }) {
  const textOf = (s: BlogSection): string => {
    if (s.type === "ul") return "";
    return isZh ? s.text : (s.textEn ?? s.text);
  };
  switch (section.type) {
    case "p":
      return <p className="text-base text-bhai-muted leading-relaxed">{textOf(section)}</p>;
    case "h2":
      return <h2 className="font-sans text-2xl font-bold text-foreground mt-8 mb-4 leading-tight">{textOf(section)}</h2>;
    case "h3":
      return <h3 className="font-sans text-xl font-bold text-foreground mt-6 mb-3">{textOf(section)}</h3>;
    case "ul":
      return (
        <ul className="space-y-2 my-4">
          {(isZh ? section.items : (section.itemsEn ?? section.items)).map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-base text-bhai-muted leading-relaxed">
              <span className="text-bhai-red mt-1 shrink-0">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-bhai-red pl-6 py-2 my-6">
          <p className="font-sans text-lg text-foreground leading-relaxed italic mb-2">&quot;{textOf(section)}&quot;</p>
          {section.author && (
            <cite className="text-sm text-bhai-muted not-italic">— {isZh ? section.author : (section.authorEn ?? section.author)}</cite>
          )}
        </blockquote>
      );
    case "callout":
      return (
        <div className={`rounded-xl border p-5 my-6 ${
          section.variant === "warning" ? "border-bhai-red/30 bg-bhai-red/5" :
          section.variant === "success" ? "border-bhai-red/30 bg-bhai-red/5" :
          "border-[#2A2A2A] bg-bhai-bg"
        }`}>
          <p className="text-sm text-foreground leading-relaxed">{textOf(section)}</p>
        </div>
      );
    default:
      return null;
  }
}
