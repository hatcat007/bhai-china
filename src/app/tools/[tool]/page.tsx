import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/bhai/PageShell";
import { ToolRunner } from "@/components/bhai/tools/ToolRunner";
import { ToolHero } from "@/components/bhai/tools/ToolHero";
import { OtherTools } from "@/components/bhai/tools/OtherTools";
import { AI_TOOLS, getToolBySlug } from "@/lib/data/ai-tools";

/**
 * 工具详情页（server）
 * - metadata / OG 服务端生成（zh 主口径）
 * - HERO 与「其他工具」由客户端组件渲染，随 locale 中英切换（i18n Round B）
 * - ToolRunner 接收 zh 主数据，内部自行本地化展示字段
 */
export function generateStaticParams() {
  return AI_TOOLS.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool } = await params;
  const t = getToolBySlug(tool);
  if (!t) return { title: "工具未找到 | Better Human AI" };
  return {
    title: `${t.name} · 免费 AI 工具 | Better Human AI`,
    description: t.description,
    openGraph: {
      title: `${t.name} · 免费 AI 工具 | Better Human AI`,
      description: t.tagline,
      url: `/tools/${t.slug}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: t.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t.name} · 免费 AI 工具`,
      description: t.tagline,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  const t = getToolBySlug(tool);
  if (!t) notFound();

  const others = AI_TOOLS.filter((x) => x.slug !== t.slug);

  return (
    <PageShell>
      {/* HERO（i18n Round B：客户端随 locale 切换） */}
      <section className="relative gradient-section pt-16 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <ToolHero tool={t} />
      </section>

      {/* RUNNER */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-3xl">
          <ToolRunner tool={t} />
          <OtherTools tools={others} />
        </div>
      </section>
    </PageShell>
  );
}
