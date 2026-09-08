import { PageShell } from "@/components/bhai/PageShell";
import { CasesBody } from "@/components/bhai/cases/CasesBody";
import { jewelryCases } from "@/lib/data/jewelry-cases";
import { ItemListJsonLd } from "@/components/bhai/JsonLd";
import { withOpenGraph } from "@/lib/page-metadata";

/**
 * /cases — server 壳（Round 20-d2 i18n 安全模式）
 * - metadata + ItemListJsonLd 保持 server 侧原样（不随客户端 locale 切换，已知限制）
 * - 正文迁至 client 组件 CasesBody：UI 文案走 t.casesPage.*，数据字段按 locale 选向
 */
export const metadata = withOpenGraph(
  { title: "丹麦珠宝品牌 AI 案例 · 15 个真实部署 | Better Human AI", description: "15 个真实丹麦珠宝品牌的 AI 落地案例：Pandora、Georg Jensen、Ole Lynggaard、Shamballa、Sophie Bille Brahe 等。每个案例包含挑战、AI 工作队配置、量化结果与 14 周时间线。" },
  "/cases",
  "/og-cases.jpg"
);

export default function CasesPage() {
  return (
    <PageShell>
      <ItemListJsonLd
        listName="BHAI 丹麦珠宝品牌 AI 落地案例"
        items={jewelryCases.map((c) => ({ name: `${c.brandNameZh} ${c.brandName}`, url: `/cases/${c.slug}` }))}
      />
      <CasesBody />
    </PageShell>
  );
}
