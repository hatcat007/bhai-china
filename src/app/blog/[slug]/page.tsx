import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/bhai/PageShell";
import { CTASection } from "@/components/bhai/CTASection";
import { ReadingProgress } from "@/components/bhai/ReadingProgress";
import { ShareButtons } from "@/components/bhai/ShareButtons";
import { BreadcrumbJsonLd } from "@/components/bhai/JsonLd";
import { blogPosts, getPostBySlug, type BlogSection } from "@/lib/data/blog-posts";
import { ArrowRight, Calendar, Clock, ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "文章未找到 | Better Human AI" };
  return {
    title: `${post.title} | Better Human AI`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const currentIdx = blogPosts.findIndex((p) => p.slug === slug);
  const prev = currentIdx > 0 ? blogPosts[currentIdx - 1] : undefined;
  const next = currentIdx < blogPosts.length - 1 ? blogPosts[currentIdx + 1] : undefined;

  // Article JSON-LD（BlogPosting 语义）
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://betterhumanai.dk/blog/${post.slug}`,
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
      logo: {
        "@type": "ImageObject",
        url: "https://betterhumanai.dk/bhai-mark-40.png",
      },
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "zh-CN",
  };

  return (
    <PageShell>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BreadcrumbJsonLd items={[
        { name: "首页", url: "/" },
        { name: "博客", url: "/blog" },
        { name: post.title, url: `/blog/${post.slug}` },
      ]} />

      {/* HERO */}
      <section className="relative gradient-section pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-mono text-bhai-muted hover:text-bhai-red mb-8 transition-colors">
            <ArrowLeft className="h-3 w-3" /> 返回博客
          </Link>

          <div className="flex items-center gap-3 mb-4">
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

          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-bhai-muted leading-relaxed mb-6">{post.excerpt}</p>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded border border-[#2A2A2A] px-2 py-0.5 text-[10px] font-mono text-bhai-muted">
                  #{tag}
                </span>
              ))}
            </div>
            <ShareButtons title={post.title} />
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <article className="mx-auto max-w-3xl space-y-6">
          {post.content.map((section, i) => (
            <BlogSection key={i} section={section} />
          ))}

          {/* Author card */}
          <div className="mt-12 pt-8 border-t border-[#2A2A2A]">
            <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-bhai-red shrink-0">
                  { }
                  <img src="/buster-photo-1-thumb.webp" alt="陆博明 / Buster ML Larsen" className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground">陆博明 / Buster ML Larsen</div>
                  <div className="text-xs text-bhai-muted mb-2">丹麦 AI 系统架构师 · Better Human AI 创始人</div>
                  <p className="text-sm text-bhai-muted leading-relaxed">
                    在丹麦帮 15 家顶级珠宝品牌部署 AI 工作队。现在把验证过的系统转移给中国珠宝 CEO。
                    16 个真实案例，14 周生产环境部署，14 天首个代理上线保证。
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
                  <ArrowLeft className="h-3 w-3" /> 上一篇
                </div>
                <div className="text-sm font-bold text-foreground group-hover:text-bhai-red transition-colors line-clamp-2">{prev.title}</div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-5 hover:border-bhai-red transition-colors group text-right">
                <div className="flex items-center justify-end gap-1.5 text-[10px] font-mono text-bhai-muted tracking-widest mb-2">
                  下一篇 <ArrowRight className="h-3 w-3" />
                </div>
                <div className="text-sm font-bold text-foreground group-hover:text-bhai-red transition-colors line-clamp-2">{next.title}</div>
              </Link>
            ) : <div />}
          </div>
        </article>
      </section>

      <CTASection
        title="读完文章了？开始你的 AI 路线图。"
        subtitle="20 分钟通话，我告诉你这篇文章的洞察哪个最相关——以及具体怎么套用到你的品牌。"
        primaryLabel="微信 busterl1 · 预约 →"
        primaryHref="/book"
        secondaryLabel="看更多文章"
        secondaryHref="/blog"
      />
    </PageShell>
  );
}

function BlogSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "p":
      return <p className="text-base text-bhai-muted leading-relaxed">{section.text}</p>;
    case "h2":
      return <h2 className="font-sans text-2xl font-bold text-foreground mt-8 mb-4 leading-tight">{section.text}</h2>;
    case "h3":
      return <h3 className="font-sans text-xl font-bold text-foreground mt-6 mb-3">{section.text}</h3>;
    case "ul":
      return (
        <ul className="space-y-2 my-4">
          {section.items.map((item, i) => (
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
          <p className="font-sans text-lg text-foreground leading-relaxed italic mb-2">"{section.text}"</p>
          {section.author && <cite className="text-sm text-bhai-muted not-italic">— {section.author}</cite>}
        </blockquote>
      );
    case "callout":
      return (
        <div className={`rounded-xl border p-5 my-6 ${
          section.variant === "warning" ? "border-bhai-red/30 bg-bhai-red/5" :
          section.variant === "success" ? "border-bhai-red/30 bg-bhai-red/5" :
          "border-[#2A2A2A] bg-bhai-bg"
        }`}>
          <p className="text-sm text-foreground leading-relaxed">{section.text}</p>
        </div>
      );
    default:
      return null;
  }
}
