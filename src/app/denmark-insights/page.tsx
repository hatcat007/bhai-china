import { PageShell } from "@/components/bhai/PageShell";
import { InsightsBody } from "@/components/bhai/insights/InsightsBody";
import { withOpenGraph } from "@/lib/page-metadata";

/**
 * /denmark-insights — 丹麦珠宝洞察
 * - server 页保留 metadata（SEO 口径维持中文主市场）
 * - 正文为 client 组件 InsightsBody：t.insights.* 双语，实时切换
 */

export const metadata = withOpenGraph(
  { title: "丹麦珠宝洞察 · 为什么中国 CEO 该看丹麦 | Better Human AI", description: "丹麦珠宝行业的 5 个洞察专为中国 CEO 而写：潘多拉中国溃败的教训、丹麦工艺 + 中国市场的杠杆、可持续溢价、家族传承危机、AI 落地滞后。" },
  "/denmark-insights",
  "/og-insights.jpg"
);

export default function DenmarkInsightsPage() {
  return (
    <PageShell>
      <InsightsBody />
    </PageShell>
  );
}
