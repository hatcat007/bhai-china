import { PageShell } from "@/components/bhai/PageShell";
import { PersonJsonLd } from "@/components/bhai/JsonLd";
import { AboutBody } from "@/components/bhai/about/AboutBody";
import { withOpenGraph } from "@/lib/page-metadata";

/**
 * /about — 关于陆博明（Round 20-b i18n）
 * - server 页只保留 metadata + JSON-LD + PageShell（与 /ai-ideas 同款安全模式）
 * - 正文迁至 client 组件 AboutBody：全部文案走 t.about.*，实时中英切换
 */
export const metadata = withOpenGraph(
  { title: "关于陆博明 / Buster · 丹麦 AI 系统架构师，转移方法到中国 | Better Human AI", description: "Buster ML Larsen（中文名：陆博明），丹麦 AI 系统架构师。过去五年在丹麦给 15 家珠宝品牌做 AI 落地（审计、架构、部署）。现在把验证过的系统转移给中国珠宝 CEO。" },
  "/about",
  "/og-about.jpg"
);

export default function AboutPage() {
  return (
    <PageShell>
      <PersonJsonLd />
      <AboutBody />
    </PageShell>
  );
}
