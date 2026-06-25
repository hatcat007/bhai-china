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
    "Better Human AI 帮助中国珠宝品牌 CEO 用 AI 代理在 14 天内完成生产部署。16 个真实案例：15 丹麦顶级珠宝品牌 + 中国广州珠韵珠宝。",
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
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32.png",
  },
  openGraph: {
    title: "Better Human AI | 为中国珠宝 CEO 量身打造的丹麦 AI 落地专家",
    description:
      "16 个真实珠宝品牌 AI 转型案例（15 丹麦 + 1 中国），专为中国珠宝 CEO 打造。Buster 一个人掌舵，AI 全员驱动。",
    url: "https://betterhumanai.dk",
    siteName: "Better Human AI",
    type: "website",
    locale: "zh_CN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Better Human AI — 丹麦验证的 AI 方法，现在转移给中国珠宝 CEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Better Human AI | 丹麦 AI 落地专家",
    description: "Buster 掌舵。AI 驱动。为中国珠宝 CEO 而生。",
    images: ["/og-image.jpg"],
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
