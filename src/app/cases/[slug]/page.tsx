import { notFound } from "next/navigation";
import { PageShell } from "@/components/bhai/PageShell";
import { CaseDetailBody } from "@/components/bhai/cases/CaseDetailBody";
import { ReadingProgress } from "@/components/bhai/ReadingProgress";
import { jewelryCases, getCaseBySlug } from "@/lib/data/jewelry-cases";

/**
 * /cases/[slug] — server 壳（Round 20-d2 i18n 安全模式）
 * - generateStaticParams / generateMetadata / Article JSON-LD 保持 server 侧原样
 * - 正文迁至 client 组件 CaseDetailBody（plain serializable props）
 */
export function generateStaticParams() {
  return jewelryCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);
  if (!caseItem) return { title: "案例未找到 | Better Human AI" };
  return {
    title: `${caseItem.brandNameZh}（${caseItem.brandName}）AI 案例 | Better Human AI`,
    description: `BHAI 为 ${caseItem.brandName} 部署 AI 工作队：${caseItem.bhaiEngagementZh.slice(0, 80)}`,
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);
  if (!caseItem) notFound();

  const currentIdx = jewelryCases.findIndex((c) => c.slug === slug);
  const prev = currentIdx > 0 ? jewelryCases[currentIdx - 1] : undefined;
  const next = currentIdx < jewelryCases.length - 1 ? jewelryCases[currentIdx + 1] : undefined;

  // Article JSON-LD（案例页结构化数据）
  const caseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${caseItem.brandNameZh}（${caseItem.brandName}）AI 转型案例`,
    description: caseItem.bhaiEngagementZh,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://betterhumanai.dk/cases/${caseItem.slug}`,
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
    },
    about: {
      "@type": "Organization",
      name: caseItem.brandName,
      foundingDate: caseItem.founded,
      description: caseItem.challengeZh,
    },
    inLanguage: "zh-CN",
  };

  return (
    <PageShell>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd) }} />
      <CaseDetailBody
        caseItem={caseItem}
        caseNumber={currentIdx + 1}
        total={jewelryCases.length}
        prev={prev ? { slug: prev.slug, brandNameZh: prev.brandNameZh, brandName: prev.brandName } : undefined}
        next={next ? { slug: next.slug, brandNameZh: next.brandNameZh, brandName: next.brandName } : undefined}
      />
    </PageShell>
  );
}
