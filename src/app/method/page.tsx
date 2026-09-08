import { PageShell } from "@/components/bhai/PageShell";
import { MethodBody } from "@/components/bhai/method/MethodBody";
import { withOpenGraph } from "@/lib/page-metadata";

/**
 * /method — BHAI 方法（Round 20-b i18n）
 * - server 页只保留 metadata + PageShell（与 /ai-ideas 同款安全模式）
 * - 正文迁至 client 组件 MethodBody：全部文案走 t.method.*，实时中英切换
 */
export const metadata = withOpenGraph(
  { title: "BHAI 方法 · 3 步从上下文到生产 | Better Human AI", description: "BHAI 方法：构建上下文 → 部署代理 → 掌舵不撒手。14 天首个代理上线，14 周完整工作队生产，100% 审计链覆盖。" },
  "/method",
  "/og-method.jpg"
);

export default function MethodPage() {
  return (
    <PageShell>
      <MethodBody />
    </PageShell>
  );
}
