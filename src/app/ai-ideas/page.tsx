import { PageShell } from "@/components/bhai/PageShell";
import { IdeasBody } from "@/components/bhai/ideas/IdeasBody";
import { withOpenGraph } from "@/lib/page-metadata";

/**
 * /ai-ideas — 珠宝公司 AI 落地 25 计
 * - server 页实例化 PageShell（Round B 安全模式：client 页不直接 import PageShell）
 * - 正文为 client 组件 IdeasBody：数据层双语 + 实时语言切换
 */

// 20-e：title 双语化（server metadata 不随 locale 切换，为已知限制）；description 保持中文口径
export const metadata = withOpenGraph(
  {
    title: "珠宝公司 AI 落地 25 计 · 25 AI Ideas | Better Human AI",
    description:
      "25 个最佳珠宝行业 AI 用法：小红书文案工厂、异议处理教练、库存预测、仿款监控、设计趋势雷达、经营周报自动化……全部来自 15 个真实丹麦珠宝品牌的部署经验。3 个可免费试，结尾可预约创意 AI 工作坊。",
  },
  "/ai-ideas",
  "/og-ideas.jpg"
);

export default function AiIdeasPage() {
  return (
    <PageShell>
      <IdeasBody />
    </PageShell>
  );
}
