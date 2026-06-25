import Link from "next/link";
import { PageShell } from "@/components/bhai/PageShell";
import { CTASection } from "@/components/bhai/CTASection";
import { ArrowRight, Download } from "lucide-react";

export const metadata = {
  title: "10 Logo Designs · 选择你最喜欢的 | Better Human AI",
  description: "10 个不同的 BHAI logo 设计——从极简 wordmark 到丹麦十字 + AI 脉冲。每个都是 SVG 矢量，可在任何尺寸使用。",
};

const logos = [
  { file: "logo-01-wordmark.svg", name: "01 · 纯文字标识", concept: "Mono 字体 [BHAI] 标签 + sans-serif 全名。最克制、最 editorial。", bestFor: "页脚、商务名片、邮件签名" },
  { file: "logo-02-dot-monogram.svg", name: "02 · 圆点徽标", concept: "橙色圆点（带黑色瞳孔）+ wordmark。抽象「眼睛 / 焦点」隐喻——AI 看到、人在中央。", bestFor: "导航栏、Favicon、App icon" },
  { file: "logo-03-human-circuit.svg", name: "03 · 人 + 电路", concept: "人体轮廓 + 围绕的橙色电路节点。直接表达「人在中央，AI 在周围辅助」。", bestFor: "About 页面 hero、Method 页面顶部" },
  { file: "logo-04-steering-wheel.svg", name: "04 · 舵轮", concept: "船舵 + 橙色中心。直接对应 tagline「Buster ved roret」（Buster 掌舵）。最直白的 brand 隐喻。", bestFor: "首页 hero、Book 页面顶部" },
  { file: "logo-05-layer-stack.svg", name: "05 · 3 层架构", concept: "三条横线（白/橙/灰）对应 BHAI 3 层方法（Design Memory / Bench Automation / Clienteling Agents）。", bestFor: "Method 页面、Solutions 页面、技术文档" },
  { file: "logo-06-inverted-hourglass.svg", name: "06 · 倒置沙漏", concept: "倒置沙漏形状 + 掉落的沙。明确 subvert Hourglass AI 的视觉概念——14 天 vs 30 天，生产 vs PPT。", bestFor: "竞争对比页面、Pricing 页面" },
  { file: "logo-07-bh-monogram.svg", name: "07 · BH 字母组合", concept: "白色 B + 橙色 H 字母交织。简洁、可缩放到任何尺寸。包含中文名「陆博明」副标题。", bestFor: "社交媒体头像、Favicon、水印" },
  { file: "logo-08-terminal-cursor.svg", name: "08 · 终端光标", concept: "$ bhai + 闪烁光标。Code/mono aesthetic——直接定位为「写代码的人」而非「PPT 顾问」。", bestFor: "技术受众页面、Github README、开发者文档" },
  { file: "logo-09-diamond-facet.svg", name: "09 · 钻石切面", concept: "钻石几何形状 + 切面线。明确珠宝行业定位——任何看到的人都立刻知道这是珠宝相关品牌。", bestFor: "Cases 页面、珠宝行业专属物料" },
  { file: "logo-10-danish-cross-pulse.svg", name: "10 · 丹麦十字 + AI 脉冲", concept: "丹麦国旗抽象十字 + 橙色 AI 脉冲。强调丹麦传承 + AI 现代性的融合。", bestFor: "丹麦市场物料、双语版本、文化桥梁定位" },
];

export default function LogosPage() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">[ 10 设计 · 你选 ]</div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            10 个 BHAI logo 设计<br />
            <span className="stat-highlight">选你最喜欢的</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed">
            我设计了 10 个不同方向的 logo——从极简 wordmark 到丹麦十字 + AI 脉冲。
            每个都是 SVG 矢量，可在任何尺寸使用（favicon 到广告牌）。
            告诉我你最喜欢哪个（或哪几个），我会把它集成到全站。
          </p>
        </div>
      </section>

      {/* LOGOS GRID */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-7xl space-y-6">
          {logos.map((logo) => (
            <div key={logo.file} className="rounded-2xl border border-[#2A2A2A] bg-bhai-card overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                {/* Logo display */}
                <div className="md:col-span-7 bg-black p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#2A2A2A]">
                  { }
                  <img
                    src={`/logos/${logo.file}`}
                    alt={`BHAI Logo — ${logo.name}`}
                    className="max-w-full h-auto"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
                {/* Concept description */}
                <div className="md:col-span-5 p-6">
                  <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">[ DESIGN ]</div>
                  <h2 className="font-sans text-lg font-bold text-foreground mb-3">{logo.name}</h2>
                  <p className="text-sm text-bhai-muted leading-relaxed mb-4">{logo.concept}</p>
                  <div className="pt-4 border-t border-[#2A2A2A]">
                    <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-1">[ 最适合 ]</div>
                    <p className="text-xs text-bhai-text">{logo.bestFor}</p>
                  </div>
                  <a
                    href={`/logos/${logo.file}`}
                    download
                    className="mt-4 inline-flex items-center gap-2 text-xs text-bhai-red hover:text-bhai-red-hover font-medium"
                  >
                    <Download className="h-3 w-3" />
                    下载 SVG
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* USAGE GUIDE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 使用指南 ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            怎么选 + 怎么用
          </h2>

          <div className="space-y-4">
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <h3 className="text-base font-bold text-foreground mb-2">如果你想要最克制、最 editorial</h3>
              <p className="text-sm text-bhai-muted leading-relaxed">
                选 <span className="text-bhai-red font-medium">01 纯文字标识</span>。这是丹麦设计哲学的纯粹表达——「少即是多」。
                适合定位为「严肃 B2B AI 系统架构师」的语境。
              </p>
            </div>

            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <h3 className="text-base font-bold text-foreground mb-2">如果你想要最直白的 brand 隐喻</h3>
              <p className="text-sm text-bhai-muted leading-relaxed">
                选 <span className="text-bhai-red font-medium">04 舵轮</span>。直接对应你的 tagline「Buster ved roret」（Buster 掌舵）。
                中国 CEO 一看就懂「一个人掌舵」的概念。
              </p>
            </div>

            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <h3 className="text-base font-bold text-foreground mb-2">如果你想要明确珠宝行业定位</h3>
              <p className="text-sm text-bhai-muted leading-relaxed">
                选 <span className="text-bhai-red font-medium">09 钻石切面</span>。任何看到的人都立刻知道这是珠宝相关品牌。
                适合珠宝行业垂直深耕的语境。
              </p>
            </div>

            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <h3 className="text-base font-bold text-foreground mb-2">如果你想要 subvert Hourglass AI</h3>
              <p className="text-sm text-bhai-muted leading-relaxed">
                选 <span className="text-bhai-red font-medium">06 倒置沙漏</span>。明确视觉回应 Hourglass AI——
                倒置意味着「时间不是沙漏在流，是我们在主动控制时间」。14 天 vs 30 天。
              </p>
            </div>

            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <h3 className="text-base font-bold text-foreground mb-2">如果你想要最 modern + most "AI 原生"</h3>
              <p className="text-sm text-bhai-muted leading-relaxed">
                选 <span className="text-bhai-red font-medium">08 终端光标</span>。$ bhai + 闪烁光标直接定位为「写代码的人」。
                适合技术受众（CTO、技术 CEO）的语境。
              </p>
            </div>

            <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-6">
              <h3 className="text-base font-bold text-foreground mb-2">我的推荐：组合使用</h3>
              <p className="text-sm text-foreground leading-relaxed">
                你不需要只选一个。最专业的做法是「主 logo + 次 logo」组合：
                <br /><br />
                <span className="text-bhai-red font-medium">主 logo（导航栏 + 页脚）：</span> 04 舵轮（最直白 brand 隐喻）
                <br />
                <span className="text-bhai-red font-medium">Favicon + 社交头像：</span> 07 BH 字母组合（最简洁、可缩放到 16x16）
                <br />
                <span className="text-bhai-red font-medium">Cases 页面顶部装饰：</span> 09 钻石切面（珠宝行业定位）
                <br />
                <span className="text-bhai-red font-medium">邮件签名 + 商务名片：</span> 01 纯文字标识（最 editorial）
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="选好了？告诉我你想要哪个。"
        subtitle="微信 busterl1 告诉我你的选择（或组合）。我会立刻集成到全站——导航栏、页脚、favicon、社交媒体、商务物料。"
        primaryLabel="微信 busterl1 · 告诉我选择 →"
        primaryHref="/book"
        secondaryLabel="回到首页"
        secondaryHref="/"
      />
    </PageShell>
  );
}
