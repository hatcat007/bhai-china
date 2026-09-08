import { PageShell } from "@/components/bhai/PageShell";
import { RoadmapWizard } from "@/components/bhai/roadmap/RoadmapWizard";

/**
 * /ai-roadmap（server）
 * - metadata 由 layout.tsx 提供（本页 "use client" 前置已移除，SEO 口径不变）
 * - 正文（6 步向导）委托 RoadmapWizard 客户端组件，随 locale 中英切换（i18n Round C）
 * - 结构与 Round B 的 /tools 一致：server 页实例化 PageShell，客户端 body 消费 context
 */
export default function AIRoadmapPage() {
  return (
    <PageShell>
      <RoadmapWizard />
    </PageShell>
  );
}
