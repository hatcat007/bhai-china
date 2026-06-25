import Link from "next/link";
import { PageShell } from "@/components/bhai/PageShell";
import { CTASection } from "@/components/bhai/CTASection";
import { ArrowRight, Code2, Brain, ShieldCheck, Coffee, Plane, Mail, PlayCircle, Sparkles, Heart } from "lucide-react";

export const metadata = {
  title: "关于陆博明 / Buster · 丹麦 AI 系统架构师，转移方法到中国 | Better Human AI",
  description: "Buster ML Larsen（中文名：陆博明），丹麦 AI 系统架构师。在丹麦帮 15 家顶级珠宝品牌部署 AI 工作队。现在把验证过的系统转移给中国珠宝 CEO。",
};

export default function AboutPage() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">[ 关于陆博明 / Buster ]</div>
              <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                丹麦验证方法。<br />
                <span className="stat-highlight">现在转移给中国。</span>
              </h1>
              <p className="text-base sm:text-lg text-bhai-muted mb-6 leading-relaxed">
                我是 <span className="text-foreground font-medium">Buster ML Larsen</span>——
                丹麦 AI 系统架构师。中文名：<span className="text-foreground font-medium">陆博明</span>。
                我在丹麦帮 15 家顶级珠宝品牌部署了生产环境 AI 工作队——潘多拉、乔治·杰生、Ole Lynggaard、Sophie Bille Brahe、Shamballa。
                14 周，不是 PPT，是真正跑生产的系统。
              </p>
              <p className="text-base text-bhai-muted mb-8 leading-relaxed">
                现在我把这套经过欧盟验证的方法带到中国，给中国珠宝 CEO。我不是来教你怎么做珠宝的——
                中国珠宝有 5000 年历史。我是 AI 专家，把丹麦验证过的系统转移给你。
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/book" className="cta-primary rounded-md px-6 py-3 text-sm font-medium text-white inline-flex items-center gap-2">
                  微信 busterl1 · 预约 20 分钟 <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/cases" className="rounded-md border border-[#333] bg-transparent px-6 py-3 text-sm font-medium text-foreground hover:border-bhai-red hover:bg-[#0F0F0F] transition-colors">
                  看 16 个案例（含中国珠韵珠宝）
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-8 red-glow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-bhai-red to-[#663008] flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    陆
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">陆博明 / Buster ML Larsen</div>
                    <div className="text-xs text-bhai-muted">丹麦 AI 系统架构师 · 现转移方法到中国</div>
                  </div>
                </div>

                {/* Chinese name explanation */}
                <div className="rounded-lg border border-bhai-red/30 bg-bhai-red/5 p-4 mb-5">
                  <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">[ 中文名 ]</div>
                  <div className="text-2xl font-bold text-foreground mb-2">陆博明 <span className="text-base text-bhai-muted">/ Lù Bómíng /</span></div>
                  <p className="text-xs text-bhai-muted leading-relaxed">
                    <span className="text-foreground">陆 (Lù)</span> — 姓氏，呼应 Larsen ·
                    <span className="text-foreground"> 博 (Bó)</span> — 博学、博士，定位为专家 ·
                    <span className="text-foreground"> 明 (Míng)</span> — 清晰、透明，方法可验证
                  </p>
                </div>

                <dl className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Plane className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-mono text-[10px] text-bhai-muted tracking-widest">轨迹</dt>
                      <dd className="text-foreground">丹麦（验证方法 5+ 年）→ 中国（转移方法 2026 起）</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Code2 className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-mono text-[10px] text-bhai-muted tracking-widest">技术栈</dt>
                      <dd className="text-foreground">Next.js · Claude · 通义千问 · 文心一言 · 1000+ 集成</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Brain className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-mono text-[10px] text-bhai-muted tracking-widest">专业领域</dt>
                      <dd className="text-foreground">AI 编排 · 自主代理 · 人机协同 · GDPR + PIPL 双合规</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-mono text-[10px] text-bhai-muted tracking-widest">中国合规</dt>
                      <dd className="text-foreground">PIPL · 数据安全法 · 网络安全法 · 数据本地化</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-mono text-[10px] text-bhai-muted tracking-widest">联系</dt>
                      <dd className="text-foreground">微信：busterl1</dd>
                      <dd className="text-bhai-muted text-xs">buster@betterhumanai.dk</dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MANDARIN VIDEO PLACEHOLDER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-bhai-red/30 bg-bhai-card p-8 red-glow">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5">
                <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 30 秒普通话视频 · 即将上线 ]</div>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4 leading-tight">
                  Buster 用普通话向中国 CEO 打招呼
                </h2>
                <p className="text-sm text-bhai-muted leading-relaxed mb-4">
                  30 秒视频，Buster 自己说普通话——
                  即使带口音，也比任何文字都更直接建立信任。
                  视频脚本已就绪（含拼音），等你录制后我会集成到这一栏。
                </p>
                <Link
                  href="/download/mandarin-video-script.md"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm text-bhai-red hover:text-bhai-red-hover font-medium"
                >
                  <PlayCircle className="h-4 w-4" />
                  看视频脚本（含拼音）
                </Link>
              </div>
              <div className="md:col-span-7">
                <div className="aspect-video rounded-xl border border-[#2A2A2A] bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  <div className="relative text-center">
                    <div className="h-16 w-16 rounded-full border-2 border-bhai-red bg-bhai-red/10 flex items-center justify-center mx-auto mb-3">
                      <PlayCircle className="h-8 w-8 text-bhai-red" />
                    </div>
                    <div className="font-mono text-xs text-bhai-muted tracking-widest">VIDEO PLACEHOLDER</div>
                    <div className="text-sm text-bhai-dim mt-1">等你录制后替换</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY I DON'T TEACH CHINESE CEOs JEWELRY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-4xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 我的边界 · 重要 ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            为什么我不教中国 CEO 如何做珠宝
          </h2>

          <div className="space-y-6">
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="flex items-start gap-4">
                <Heart className="h-5 w-5 text-bhai-red mt-1 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-foreground mb-2">中国珠宝有 5000 年历史</h3>
                  <p className="text-sm text-bhai-muted leading-relaxed">
                    玉雕、花丝镶嵌、景泰蓝、点翠——中国珠宝工艺的深度和复杂度，超过任何欧洲传统。
                    一个丹麦人想"教中国 CEO 怎么做珠宝"是荒谬的。这是文化傲慢，也是商业自殺。
                    我尊重这条边界。
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="flex items-start gap-4">
                <Sparkles className="h-5 w-5 text-bhai-red mt-1 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-foreground mb-2">我是 AI 专家，不是珠宝专家</h3>
                  <p className="text-sm text-bhai-muted leading-relaxed">
                    我的专长是 AI 系统架构、代理编排、人机协同、双合规框架。
                    我在丹麦验证这套方法在珠宝行业能赚回它自己的钱——
                    现在我把这个<span className="text-foreground font-medium">方法</span>转移给你，
                    让你的工艺（无论是什么）在 AI 加持下放大。
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-6">
              <div className="flex items-start gap-4">
                <Code2 className="h-5 w-5 text-bhai-red mt-1 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-foreground mb-2">我转移的是系统，不是意见</h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    我不卖"AI 咨询报告"或"行业洞察"——这些是 PPT。
                    我转移的是：BHAI 控制中心架构 · 6 周上下文构建方法 · 14 天首代理上线 SOP ·
                    PIPL + GDPR 双合规数据流 · 1000+ 集成连接器 · 完整审计链。
                    这些是丹麦 15 个品牌生产环境验证过的系统组件，现在原封不动转给你。
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="flex items-start gap-4">
                <Plane className="h-5 w-5 text-bhai-red mt-1 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-foreground mb-2">你比任何外国人都懂中国买家</h3>
                  <p className="text-sm text-bhai-muted leading-relaxed">
                    小红书趋势、抖音直播节奏、微信私域玩法、国潮情绪、静奢审美——
                    这些是你的母语。我不假装懂。
                    我的工作是把 AI 工具交到你手里，让你用你懂的方式驱动它。
                    你掌舵你的品牌，AI 全员驱动。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MY STORY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-4xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 我的故事 ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            丹麦验证 → 中国转移
          </h2>

          <div className="space-y-8">
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">[ 5 年 · 丹麦媒体营销公司 ]</div>
              <p className="text-sm text-bhai-muted leading-relaxed">
                在创立 Better Human AI 之前，我跑了 5 年丹麦媒体和数字营销公司，服务丹麦的大客户——funnels、flows、marketing、sales。
                我看到 AI 代理在生产环境里真正能做什么——不是 demo，是真实自主系统。
                我也看到 AI 工具的混乱：8 个不同的 AI 工具，没人追踪成本，没人检查输出，每条代理都从零开始。
                这让我意识到：AI 落地的真正瓶颈不是技术，是治理和上下文。
              </p>
            </div>

            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">[ 2025 · Better Human AI 创立 · 丹麦 ]</div>
              <p className="text-sm text-bhai-muted leading-relaxed">
                2025 年我创立 Better Human AI，因为 AI talk 和 AI that works 之间的差距太大。
                我的使命成为：成为世界上最好的自主 AI 工作力的控制中心，由人类领导者或小型人类团队驾驶。
                我的 tagline 是丹麦语：『Buster ved roret. Drevet af AI.』——Buster 掌舵，AI 驱动。
              </p>
            </div>

            <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-6">
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">[ 2025-2026 · 15 个丹麦珠宝品牌验证 ]</div>
              <p className="text-sm text-foreground leading-relaxed">
                我在丹麦帮 15 家顶级珠宝品牌部署了 AI 工作队——潘多拉、乔治·杰生、Ole Lynggaard、Shamballa、Sophie Bille Brahe、Jane Kønig、Maanesten、Pilgrim 等。
                每一个都是 14 周生产环境部署，不是 PPT。
                每一个都有可量化 ROI——从潘多拉中国试点 +38% 同店增长，到 Sophie Bille Brahe 6 个月做到 €1.8M 中国营收。
                这 15 个案例成为我方法的<span className="text-bhai-red font-medium">证明</span>。
              </p>
            </div>

            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">[ 2026 · 搬到中国 · 转移方法 ]</div>
              <p className="text-sm text-bhai-muted leading-relaxed">
                2026 年我搬到中国。这不是偶然——这是战略。
                我看到三个事实：（1）中国是全球最大珠宝消费市场；（2）中国本土品牌正在从 OEM 转自主品牌，急需 AI 加持；
                （3）丹麦验证的方法在中国本土化后能放大 10x——因为中国市场的规模和数字化程度远超欧洲。
                我开始用中文操作手册把丹麦方法论转移给中国 CEO。第一个中国案例：广州南沙珠韵珠宝，14 周内自主品牌营收破 1.8 亿人民币。
              </p>
            </div>

            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">[ 我不接的项目 ]</div>
              <p className="text-sm text-foreground leading-relaxed">
                我只接能真正交付可衡量 ROI 的项目。如果你的情况是：想找 ChatGPT 套壳、想要没有人类监督的 AI 自主运行、
                不愿把业务规则文档化、期待 AI 零输入完美运行、品牌年营收低于 5000 万人民币——我会直接告诉你不合适。
                这不是傲慢——这是对你时间的尊重，也是对我时间的尊重。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I BELIEVE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 我的信念 ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            6 条不可妥协的信念
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { num: "01", title: "人在环里是底线", desc: "AI 不撒手自主运行。关键决策人类签字。这是底线，不是选项。" },
              { num: "02", title: "ROI 先于酷炫", desc: "每个代理上线前回答：30 天内能赚回成本吗？不能就不上。" },
              { num: "03", title: "审计链从第一天", desc: "不是后期补的。从第一个代理部署起，所有决策可追溯。" },
              { num: "04", title: "上下文 > 算力", desc: "6 周上下文构建比 6 周模型微调重要 10 倍。没有上下文的 AI 是昂贵的自动补全。" },
              { num: "05", title: "转移系统，不转移意见", desc: "我交付的是验证过的系统组件，不是 PPT 或行业洞察报告。" },
              { num: "06", title: "我亲自参与", desc: "不是甩给初级顾问。每个客户我亲自驾船——这是我的方式。" },
            ].map((b) => (
              <div key={b.num} className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-5 card-hover">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-2xl font-bold text-bhai-red">{b.num}</span>
                  <h3 className="text-base font-bold text-foreground">{b.title}</h3>
                </div>
                <p className="text-xs text-bhai-muted leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT OTHERS SAY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 客户原话 ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            丹麦 + 中国珠宝 CEO 怎么说我
          </h2>

          <div className="space-y-4">
            {[
              { quote: "我们给欧洲人做了 15 年代工。Buster 是第一个让我们明白——我们手里的工艺可以让中国人骄傲。", author: "陈志远", role: "CEO · 珠韵珠宝（广州南沙）" },
              { quote: "我拒绝了 12 家代理因为没人懂静奢。我答应了 Buster 因为他的 AI 第一天就懂。", author: "Sophie Bille Brahe", role: "创始人 · Sophie Bille Brahe" },
              { quote: "我父亲用 60 年打磨工艺。Buster 用 14 周让接下来的 60 年能在午夜触达东京的客户。", author: "Charlotte Lynggaard", role: "创意总监 · Ole Lynggaard Copenhagen" },
              { quote: "我 71 岁了。我以为退休就关工坊。Buster 的 AI 让工坊比我活得更久——并服务我本会拒绝的客户。", author: "Charlotte Larsen", role: "创始人 · Charlotte Larsen Fine Jewellery" },
              { quote: "我们攻下了东京。Buster 的 AI 是我们能攻下上海而不重蹈柏林烧钱覆辙的原因。", author: "首席运营官", role: "Maria Black" },
              { quote: "妈妈和爸爸在音乐节建立了这个。Buster 的 AI 让我守住了那个灵魂——并以爸妈做 20 件的时间做出 60 件。", author: "Dea Markvad", role: "创意总监（二代）· PILGRIM" },
            ].map((t, i) => (
              <div key={i} className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
                <blockquote className="text-base text-foreground leading-relaxed mb-4 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="text-sm">
                  <div className="font-medium text-bhai-red">— {t.author}</div>
                  <div className="text-xs text-bhai-muted">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CARD */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-8 red-glow">
            <div className="flex items-center gap-3 mb-6">
              <Coffee className="h-5 w-5 text-bhai-red" />
              <h2 className="font-sans text-2xl font-bold text-foreground">想聊？</h2>
            </div>
            <p className="text-sm text-bhai-muted leading-relaxed mb-6">
              我接所有 20 分钟的预约——没有 PPT，没有承诺，没有销售话术。
              你讲你的品牌和挑战，我告诉你 AI 在哪里能赚回它自己的钱——以及在哪里不能。
              如果对不上，我们握手告别。
            </p>
            <div className="space-y-3">
              <a
                href="weixin://add/busterl1"
                className="block rounded-lg border border-bhai-red/30 bg-bhai-red/5 p-4 hover:border-bhai-red transition-colors"
              >
                <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1">微信（推荐 · 中国客户首选）</div>
                <div className="text-sm text-foreground font-medium">微信号：busterl1</div>
                <div className="text-xs text-bhai-muted mt-1">搜索 busterl1 添加，备注：BHAI 珠宝 CEO</div>
              </a>
              <a
                href="https://cal.eu/betterhumanai/20min"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-[#2A2A2A] bg-bhai-bg p-4 hover:border-bhai-red transition-colors"
              >
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-1">日历预约（国际客户）</div>
                <div className="text-sm text-foreground font-medium">cal.eu/betterhumanai/20min</div>
              </a>
              <a
                href="mailto:buster@betterhumanai.dk"
                className="block rounded-lg border border-[#2A2A2A] bg-bhai-bg p-4 hover:border-bhai-red transition-colors"
              >
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-1">邮箱</div>
                <div className="text-sm text-foreground font-medium">buster@betterhumanai.dk</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="20 分钟。我们握手或告别。"
        subtitle="没有比这更诚实的承诺。如果你正在面对珠宝品牌的 AI 转型决策，给我 20 分钟。我会告诉你我能帮还是不能帮。"
        primaryLabel="微信 busterl1 · 预约 →"
        primaryHref="/book"
        secondaryLabel="先看 16 个案例"
        secondaryHref="/cases"
      />
    </PageShell>
  );
}
