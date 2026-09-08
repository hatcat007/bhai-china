import { PageShell } from "@/components/bhai/PageShell";
import { BlogBody } from "@/components/bhai/blog/BlogBody";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/bhai/JsonLd";
import { blogPosts } from "@/lib/data/blog-posts";
import { withOpenGraph } from "@/lib/page-metadata";

/**
 * /blog — server 壳（Round 20-d2 i18n 安全模式）
 * - metadata + Breadcrumb/ItemList JSON-LD 保持 server 侧原样
 * - 正文迁至 client 组件 BlogBody：UI 走 t.blog.*，文章字段按 locale 选向
 */
export const metadata = withOpenGraph(
  { title: "博客 · 珠宝行业 AI 深度洞察 | Better Human AI", description: "BHAI 博客：PIPL 合规指南、Pandora 中国溃败案例、2026 中国珠宝 AI 趋势等深度文章。基于 16 个真实案例的实战洞察，不是行业报告。" },
  "/blog",
  "/og-blog.jpg"
);

export default function BlogPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[
        { name: "首页", url: "/" },
        { name: "博客", url: "/blog" },
      ]} />
      <ItemListJsonLd
        listName="BHAI 博客 · 珠宝行业 AI 深度洞察"
        items={blogPosts.map((p) => ({ name: p.title, url: `/blog/${p.slug}` }))}
      />
      <BlogBody />
    </PageShell>
  );
}
