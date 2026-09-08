import type { Metadata } from "next";
import { PageShell } from "@/components/bhai/PageShell";
import { ToolsIndexBody } from "@/components/bhai/tools/ToolsIndexBody";

/**
 * /tools 索引页（server）
 * - metadata 服务端生成（SEO 保持中文主市场口径）
 * - 正文（hero + 卡片网格）由客户端组件渲染，随 locale 中英切换（i18n Round B）
 */
export const metadata: Metadata = {
  title: "免费 AI 工具 | Better Human AI",
  description:
    "5 个免费 AI 工具：网站 AI 缺口扫描、小红书静奢文案、VIP 异议回复、可持续出处文案、竞品 AI 脆弱性报告。无需注册，每个工具 2 次免费。",
  keywords: [
    "珠宝 AI 工具",
    "小红书文案生成",
    "珠宝客服话术",
    "AI 缺口分析",
    "可持续珠宝文案",
  ],
  openGraph: {
    title: "免费 AI 工具 | Better Human AI",
    description:
      "5 个免费 AI 工具：网站 AI 缺口扫描、小红书静奢文案、VIP 异议回复、可持续出处文案、竞品 AI 脆弱性报告。无需注册，每个工具 2 次免费。",
    url: "/tools",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Better Human AI 免费工具" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "免费 AI 工具 | Better Human AI",
    description:
      "5 个免费 AI 工具：网站 AI 缺口扫描、小红书静奢文案、VIP 异议回复、可持续出处文案、竞品 AI 脆弱性报告。",
    images: ["/og-image.jpg"],
  },
};

export default function ToolsPage() {
  return (
    <PageShell>
      <ToolsIndexBody />
    </PageShell>
  );
}
