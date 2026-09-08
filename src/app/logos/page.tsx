import { PageShell } from "@/components/bhai/PageShell";
import { LogosBody } from "@/components/bhai/logos/LogosBody";
import { withOpenGraph } from "@/lib/page-metadata";

/**
 * /logos — 20 个 BHAI logo 设计
 * - server 页保留 metadata（SEO 口径维持中英混合原标题）
 * - 正文为 client 组件 LogosBody：t.logos.* 双语，实时切换；logo 文件名不变
 */

export const metadata = withOpenGraph(
  { title: "20 Logo Designs · AI 生成 + 矢量 SVG | Better Human AI", description: "20 个 BHAI logo 设计——10 个 z-ai AI 生成的 PNG + 10 个手工设计的矢量 SVG。每个都是不同方向。选你最喜欢的。" },
  "/logos"
);

export default function LogosPage() {
  return (
    <PageShell>
      <LogosBody />
    </PageShell>
  );
}
