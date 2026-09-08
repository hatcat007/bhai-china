import type { Metadata } from "next";

/**
 * /ai-roadmap 是客户端页面（"use client"），不能直接 export metadata——
 * 用 layout 层补齐 per-page OG/Twitter metadata（20-e：title 双语化；description 保持中文主口径）
 */
export const metadata: Metadata = {
  title: "AI 路线图生成器 · AI Roadmap Generator | Better Human AI",
  description:
    "6 步回答 6 个问题，当场生成你的珠宝品牌个性化 AI 路线图：审计 → 试点 → 扩展。免费、无需注册。",
  openGraph: {
    title: "AI 路线图生成器 · AI Roadmap Generator | Better Human AI",
    description:
      "6 步回答 6 个问题，当场生成你的珠宝品牌个性化 AI 路线图：审计 → 试点 → 扩展。免费、无需注册。",
    url: "/ai-roadmap",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "Better Human AI" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 路线图生成器 · AI Roadmap Generator | Better Human AI",
    description:
      "6 步回答 6 个问题，当场生成你的珠宝品牌个性化 AI 路线图。免费、无需注册。",
    images: ["/og-image.jpg"],
  },
};

export default function AIRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
