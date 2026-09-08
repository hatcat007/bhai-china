import { PageShell } from "@/components/bhai/PageShell";
import { ServiceJsonLd } from "@/components/bhai/JsonLd";
import { SolutionsBody } from "@/components/bhai/solutions/SolutionsBody";
import { withOpenGraph } from "@/lib/page-metadata";

/**
 * /solutions — 珠宝行业 AI 解决方案 · 9 类工作队（Round 20-b i18n）
 * - server 页只保留 metadata + JSON-LD + PageShell（与 /ai-ideas 同款安全模式）
 * - 正文迁至 client 组件 SolutionsBody：全部文案走 t.solutions.*，实时中英切换
 */
export const metadata = withOpenGraph(
  { title: "珠宝行业 AI 解决方案 · 9 类工作队 | Better Human AI", description: "为珠宝品牌量身打造的 9 类 AI 工作队：防伪鉴真、高定共创、普通话 VIP 礼宾、需求预测、区块链来源、中国切入手册、AR 试戴、困境品牌 AI、中国云基础设施。" },
  "/solutions"
);

export default function SolutionsPage() {
  return (
    <PageShell>
      <ServiceJsonLd />
      <SolutionsBody />
    </PageShell>
  );
}
