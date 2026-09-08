import Link from "next/link";
import { PageShell } from "@/components/bhai/PageShell";
import { CTASection } from "@/components/bhai/CTASection";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { withOpenGraph } from "@/lib/page-metadata";

export const metadata = withOpenGraph(
  { title: "20 Logo Designs · AI 生成 + 矢量 SVG | Better Human AI", description: "20 个 BHAI logo 设计——10 个 z-ai AI 生成的 PNG + 10 个手工设计的矢量 SVG。每个都是不同方向。选你最喜欢的。" },
  "/logos"
);

const aiLogos = [
  { file: "zai-logo-01-minimal-typography.png", name: "AI 01 · 极简文字", concept: "纯白无衬线 wordmark 在纯黑背景，单个橙色句点。最克制的瑞士设计风格。" },
  { file: "zai-logo-02-orange-sphere.png", name: "AI 02 · 橙色球体", concept: "单个橙色完美球体带渐变，中心黑色瞳孔——抽象的眼睛隐喻。AI 看见，人在中央。" },
  { file: "zai-logo-03-human-augmented.png", name: "AI 03 · 人 + AI 增强", concept: "白色人侧脸轮廓被橙色电路节点环绕形成光环。AI 增强人类的视觉隐喻。" },
  { file: "zai-logo-04-steering-wheel.png", name: "AI 04 · 舵轮", concept: "白色极简船舵 8 辐条，中心橙色。对应 tagline「Buster ved roret」（Buster 掌舵）。" },
  { file: "zai-logo-05-three-layers.png", name: "AI 05 · 3 层架构", concept: "三条水平矩形条（白/橙/灰）堆叠，对应 BHAI 3 层方法。极简建筑感。" },
  { file: "zai-logo-06-inverted-hourglass.png", name: "AI 06 · 倒置沙漏", concept: "倒置沙漏轮廓，白色沙粒向上飘——明确 subvert Hourglass AI 的视觉概念。" },
  { file: "zai-logo-07-bh-monogram.png", name: "AI 07 · BH 字母组合", concept: "白色 B + 橙色 H 字母交织，几何无衬线。像 IBM 或 Adobe 的企业级字母组合。" },
  { file: "zai-logo-08-terminal-prompt.png", name: "AI 08 · 终端光标", concept: "橙色 $ 符号 + 白色 monospace「bhai」+ 闪烁光标。开发者美学——写代码的人，不是 PPT 顾问。" },
  { file: "zai-logo-09-diamond-facet.png", name: "AI 09 · 钻石切面", concept: "白色钻石几何轮廓 + 橙色切面线。明确珠宝行业定位——顶视图钻石三角切面。" },
  { file: "zai-logo-10-danish-cross.png", name: "AI 10 · 丹麦十字 + 脉冲", concept: "抽象白色斯堪的纳维亚十字 + 橙色脉冲线穿过。丹麦传承 × AI 现代性的融合。" },
];

const svgLogos = [
  { file: "logo-01-wordmark.svg", name: "SVG 01 · 纯文字标识", concept: "Mono 字体 [BHAI] 标签 + sans-serif 全名。最 editorial。" },
  { file: "logo-02-dot-monogram.svg", name: "SVG 02 · 圆点徽标", concept: "橙色圆点（带黑色瞳孔）+ wordmark + 副标题。" },
  { file: "logo-03-human-circuit.svg", name: "SVG 03 · 人 + 电路", concept: "人体轮廓 + 围绕的橙色电路节点。" },
  { file: "logo-04-steering-wheel.svg", name: "SVG 04 · 舵轮", concept: "船舵 + 橙色中心 + 丹麦语 tagline 副标题。" },
  { file: "logo-05-layer-stack.svg", name: "SVG 05 · 3 层架构", concept: "三条横线对应 BHAI 3 层方法 + 维度标签。" },
  { file: "logo-06-inverted-hourglass.svg", name: "SVG 06 · 倒置沙漏", concept: "倒置沙漏 + 「14 DAYS · NOT 30 · NOT PPT」副标题。" },
  { file: "logo-07-bh-monogram.svg", name: "SVG 07 · BH 字母组合", concept: "白色 B + 橙色 H + 「BHAI · 陆博明 / BUSTER LARSEN」副标题。" },
  { file: "logo-08-terminal-cursor.svg", name: "SVG 08 · 终端光标", concept: "$ bhai + 闪烁光标 + 「// SHIPPING PRODUCTION · NOT PPT」注释。" },
  { file: "logo-09-diamond-facet.svg", name: "SVG 09 · 钻石切面", concept: "钻石几何 + 切面线 + 「JEWELRY INDUSTRY · AI SPECIALIST」副标题。" },
  { file: "logo-10-danish-cross-pulse.svg", name: "SVG 10 · 丹麦十字 + 脉冲", concept: "丹麦十字 + AI 脉冲 + 「DANISH VERIFIED · CHINA DEPLOYED」副标题。" },
];

export default function LogosPage() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-bhai-red/30 bg-bhai-red/5 px-4 py-1.5 mb-6">
            <Sparkles className="h-3 w-3 text-bhai-red" />
            <span className="font-mono text-[11px] tracking-widest text-bhai-red">20 设计 · 10 AI 生成 + 10 矢量 SVG</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            20 个 BHAI logo 设计<br />
            <span className="stat-highlight">选你最喜欢的</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed">
            我做了两套 logo 让你选择：<strong className="text-foreground">10 个 z-ai AI 生成的 PNG</strong>（更艺术、更有机、更有"手感"）
            + <strong className="text-foreground">10 个手工设计的矢量 SVG</strong>（更精确、可无限缩放、文件更小）。
            每个都是不同方向。告诉我你最喜欢哪个，我会集成到全站。
          </p>
        </div>
      </section>

      {/* AI-GENERATED LOGOS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="h-5 w-5 text-bhai-red" />
            <div>
              <div className="font-mono text-xs text-bhai-red tracking-widest mb-1">[ 第一套 · z-ai AI 生成 ]</div>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                10 个 AI 生成 logo（PNG）
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {aiLogos.map((logo) => (
              <div key={logo.file} className="rounded-2xl border border-[#2A2A2A] bg-bhai-card overflow-hidden card-hover">
                <div className="aspect-square bg-black flex items-center justify-center p-8">
                  { }
                  <img
                    src={`/logos/${logo.file}`}
                    alt={`BHAI Logo — ${logo.name}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1">[ AI DESIGN ]</div>
                  <h3 className="text-sm font-bold text-foreground mb-2">{logo.name}</h3>
                  <p className="text-xs text-bhai-muted leading-relaxed mb-3">{logo.concept}</p>
                  <a
                    href={`/logos/${logo.file}`}
                    download
                    className="inline-flex items-center gap-1.5 text-[11px] text-bhai-red hover:text-bhai-red-hover font-medium"
                  >
                    <Download className="h-3 w-3" />
                    下载 PNG
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SVG LOGOS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-5 w-5 rounded border border-bhai-red flex items-center justify-center">
              <span className="font-mono text-[10px] text-bhai-red font-bold">S</span>
            </div>
            <div>
              <div className="font-mono text-xs text-bhai-red tracking-widest mb-1">[ 第二套 · 手工矢量 SVG ]</div>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                10 个矢量 SVG logo
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {svgLogos.map((logo) => (
              <div key={logo.file} className="rounded-xl border border-[#2A2A2A] bg-bhai-card overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                  <div className="md:col-span-7 bg-black p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#2A2A2A]">
                    { }
                    <img
                      src={`/logos/${logo.file}`}
                      alt={`BHAI Logo — ${logo.name}`}
                      className="max-w-full h-auto"
                      style={{ maxHeight: "100px" }}
                    />
                  </div>
                  <div className="md:col-span-5 p-5">
                    <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">[ SVG DESIGN ]</div>
                    <h3 className="text-sm font-bold text-foreground mb-2">{logo.name}</h3>
                    <p className="text-xs text-bhai-muted leading-relaxed mb-3">{logo.concept}</p>
                    <a
                      href={`/logos/${logo.file}`}
                      download
                      className="inline-flex items-center gap-1.5 text-[11px] text-bhai-red hover:text-bhai-red-hover font-medium"
                    >
                      <Download className="h-3 w-3" />
                      下载 SVG
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI vs SVG COMPARISON */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ AI vs SVG · 怎么选 ]</div>
          <h2 className="font-sans text-3xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            两套 logo 的区别
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <h3 className="text-base font-bold text-foreground mb-3">AI 生成 PNG</h3>
              <ul className="space-y-2 text-xs text-bhai-muted">
                <li className="flex items-start gap-2"><span className="text-bhai-red mt-0.5">✓</span> 更艺术、更有"手感"、更有机</li>
                <li className="flex items-start gap-2"><span className="text-bhai-red mt-0.5">✓</span> 纹理、渐变、阴影更丰富</li>
                <li className="flex items-start gap-2"><span className="text-bhai-red mt-0.5">✓</span> 适合社交媒体、品牌物料</li>
                <li className="flex items-start gap-2"><span className="text-bhai-dim mt-0.5">✗</span> 不可无限缩放（位图）</li>
                <li className="flex items-start gap-2"><span className="text-bhai-dim mt-0.5">✗</span> 文件较大（30-180 KB）</li>
                <li className="flex items-start gap-2"><span className="text-bhai-dim mt-0.5">✗</span> 不可编辑（像素固定）</li>
              </ul>
            </div>
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <h3 className="text-base font-bold text-foreground mb-3">手工矢量 SVG</h3>
              <ul className="space-y-2 text-xs text-bhai-muted">
                <li className="flex items-start gap-2"><span className="text-bhai-red mt-0.5">✓</span> 无限缩放（favicon 到广告牌）</li>
                <li className="flex items-start gap-2"><span className="text-bhai-red mt-0.5">✓</span> 文件极小（2-5 KB）</li>
                <li className="flex items-start gap-2"><span className="text-bhai-red mt-0.5">✓</span> 可编辑（颜色、形状）</li>
                <li className="flex items-start gap-2"><span className="text-bhai-red mt-0.5">✓</span> 适合网站、favicon、印刷</li>
                <li className="flex items-start gap-2"><span className="text-bhai-dim mt-0.5">✗</span> 更几何、更"设计师"感</li>
                <li className="flex items-start gap-2"><span className="text-bhai-dim mt-0.5">✗</span> 没有纹理/渐变深度</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-6">
            <h3 className="text-base font-bold text-foreground mb-2">我的推荐</h3>
            <p className="text-sm text-bhai-muted leading-relaxed mb-3">
              <strong className="text-foreground">网站导航栏 + favicon：</strong>用 SVG（清晰、小、可缩放）
              <br />
              <strong className="text-foreground">社交媒体头像 + 品牌物料：</strong>用 AI 生成 PNG（更有质感）
              <br />
              <strong className="text-foreground">关于页面 hero：</strong>用 AI 生成 PNG（更有人情味）
              <br />
              <strong className="text-foreground">邮件签名 + 商务名片：</strong>用 SVG（精确、专业）
            </p>
            <p className="text-xs text-bhai-dim leading-relaxed">
              两套并用是最专业的做法。但如果你只想选一套，<strong className="text-bhai-red">AI 生成 PNG 更适合「人品牌」</strong>（Buster 是个人品牌），<strong className="text-bhai-red">SVG 更适合「产品品牌」</strong>（BHAI 是方法论品牌）。
            </p>
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
