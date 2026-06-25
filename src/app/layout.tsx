import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/bhai/JsonLd";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Better Human AI | 为中国珠宝 CEO 量身打造的丹麦 AI 落地专家",
  description:
    "Better Human AI 帮助中国珠宝品牌 CEO 用 AI 代理在 14 天内完成生产部署。15 个丹麦顶级珠宝品牌真实案例：从 Pandora 到 Georg Jensen，从 Ole Lynggaard 到 Sophie Bille Brahe。",
  keywords: [
    "Better Human AI",
    "BHAI",
    "AI 珠宝",
    "丹麦珠宝",
    "Pandora",
    "Georg Jensen",
    "Ole Lynggaard",
    "AI 代理",
    "AI 落地",
    "中国珠宝品牌",
    "AI 客户管理",
    "AI 防伪",
    "AI 设计",
  ],
  authors: [{ name: "Buster ML Larsen" }],
  openGraph: {
    title: "Better Human AI | 为中国珠宝 CEO 量身打造的丹麦 AI 落地专家",
    description:
      "15 个真实丹麦珠宝品牌的 AI 转型案例，专为中国珠宝 CEO 打造。Buster 一个人掌舵，AI 全员驱动。",
    url: "https://betterhumanai.dk",
    siteName: "Better Human AI",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Better Human AI | 丹麦 AI 落地专家",
    description: "Buster 掌舵。AI 驱动。为中国珠宝 CEO 而生。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${notoSansSC.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "var(--font-noto-sans-sc), var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif" }}
      >
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
