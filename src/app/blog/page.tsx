import Link from "next/link";
import { PageShell } from "@/components/bhai/PageShell";
import { CTASection } from "@/components/bhai/CTASection";
import { BreadcrumbJsonLd } from "@/components/bhai/JsonLd";
import { blogPosts } from "@/lib/data/blog-posts";
import { ArrowRight, Clock, Calendar } from "lucide-react";

export const metadata = {
  title: "博客 · 珠宝行业 AI 深度洞察 | Better Human AI",
  description: "BHAI 博客：PIPL 合规指南、Pandora 中国溃败案例、2026 中国珠宝 AI 趋势等深度文章。基于 16 个真实案例的实战洞察，不是行业报告。",
};

export default function BlogPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[
        { name: "首页", url: "/" },
        { name: "博客", url: "/blog" },
      ]} />

      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">[ 深度洞察 · 不是行业报告 ]</div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            BHAI 博客
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed">
            基于 16 个真实案例（15 丹麦 + 1 中国广州珠韵）的实战洞察。
            不是行业报告——是生产环境部署中总结的、可执行的方法论和教训。
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
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-bhai-muted">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-bhai-muted">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-sans text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-bhai-red transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-sm text-bhai-muted leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded border border-[#2A2A2A] px-2 py-0.5 text-[10px] font-mono text-bhai-muted">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-4 flex md:justify-end items-start">
                  <div className="inline-flex items-center gap-2 text-sm text-bhai-red group-hover:gap-3 transition-all font-medium">
                    阅读全文 <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection
        title="读完博客了？开始你的 AI 路线图。"
        subtitle="这些洞察基于 16 个真实案例。20 分钟通话，我告诉你这些洞察哪个最相关——以及具体怎么套用到你的品牌。"
        primaryLabel="微信 busterl1 · 预约 →"
        primaryHref="/book"
        secondaryLabel="先看 16 个案例"
        secondaryHref="/cases"
      />
    </PageShell>
  );
}
