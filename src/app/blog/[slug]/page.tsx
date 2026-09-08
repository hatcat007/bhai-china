import { notFound } from "next/navigation";
import { PageShell } from "@/components/bhai/PageShell";
import { BlogPostBody } from "@/components/bhai/blog/BlogPostBody";
import { ReadingProgress } from "@/components/bhai/ReadingProgress";
import { BreadcrumbJsonLd } from "@/components/bhai/JsonLd";
import { blogPosts, getPostBySlug } from "@/lib/data/blog-posts";

/**
 * /blog/[slug] — server 壳（Round 20-d2 i18n 安全模式）
 * - generateStaticParams / generateMetadata / BlogPosting JSON-LD / Breadcrumb JSON-LD 保持 server 侧原样
 * - 正文迁至 client 组件 BlogPostBody（plain serializable props）
 */
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
      <BlogPostBody
        post={post}
        prev={prev ? { slug: prev.slug, title: prev.title, titleEn: prev.titleEn } : undefined}
        next={next ? { slug: next.slug, title: next.title, titleEn: next.titleEn } : undefined}
      />
    </PageShell>
  );
}
