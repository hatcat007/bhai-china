import Link from "next/link";
import { PageShell } from "@/components/bhai/PageShell";
import { CTASection } from "@/components/bhai/CTASection";
import { ArrowRight, Code2, Brain, ShieldCheck, Coffee, Plane, Mail } from "lucide-react";

export const metadata = {
  title: "关于 Better Human AI · Buster ML Larsen | 一个人掌舵，AI 全员驱动",
  description: "Buster ML Larsen，Better Human AI 创始人。在中国住，卖到欧洲 CEO。帮 15 个丹麦珠宝品牌部署 AI 工作队。一个人掌舵，AI 全员驱动。",
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
              <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">[ 关于 BHAI · 关于 Buster ]</div>
              <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                我叫 Buster。<br />
                <span className="stat-highlight">我一个人掌舵。</span>
              </h1>
              <p className="text-base sm:text-lg text-bhai-muted mb-6 leading-relaxed">
                我住在中国，卖到欧洲 CEO。这不是 typo——这是我的杠杆。
                我能同时理解丹麦工坊的设计 DNA 和中国买家的消费心理。
                这种跨文化 + 跨技术的视角，是 12 家中国代理公司没有的，也是 12 家丹麦咨询公司没有的。
              </p>
              <p className="text-base text-bhai-muted mb-8 leading-relaxed">
                我每天写代码。我每天亲自部署每个客户的 AI 系统。
                我不雇初级顾问。我不外包。这是我的方式——也是我能保证每个项目都跑生产的原因。
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/book" className="cta-primary rounded-md px-6 py-3 text-sm font-medium text-white inline-flex items-center gap-2">
                  预约 20 分钟 <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/cases" className="rounded-md border border-[#333] bg-transparent px-6 py-3 text-sm font-medium text-foreground hover:border-bhai-red hover:bg-[#0F0F0F] transition-colors">
                  看我做的 15 个案例
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-8 red-glow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-bhai-red to-[#7F1D1D] flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    B
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">Buster ML Larsen</div>
                    <div className="text-xs text-bhai-muted">Better Human AI 创始人 · 唯一员工</div>
                  </div>
                </div>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Plane className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-mono text-[10px] text-bhai-muted tracking-widest">位置</dt>
                      <dd className="text-foreground">中国（住） · 哥本哈根（客户）</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Code2 className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-mono text-[10px] text-bhai-muted tracking-widest">技术栈</dt>
                      <dd className="text-foreground">Next.js · Claude · Salesforce · 1000+ 集成</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Brain className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-mono text-[10px] text-bhai-muted tracking-widest">专业领域</dt>
                      <dd className="text-foreground">AI 编排 · 自主代理 · 人机协同 · GDPR/EU AI Act 合规</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-mono text-[10px] text-bhai-muted tracking-widest">合规</dt>
                      <dd className="text-foreground">GDPR 合规 · EU AI Act 就绪 · 完整审计链</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-mono text-[10px] text-bhai-muted tracking-widest">联系</dt>
                      <dd className="text-foreground">buster@betterhumanai.dk</dd>
                      <dd className="text-bhai-muted text-xs">cal.eu/betterhumanai/20min</dd>
                    </div>
                  </div>
                </dl>
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
            为什么我做这件事
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
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">[ 2025 · Better Human AI 创立 ]</div>
              <p className="text-sm text-bhai-muted leading-relaxed">
                2025 年我创立 Better Human AI，因为 AI talk 和 AI that works 之间的差距太大。
                我的使命成为：成为世界上最好的自主 AI 工作力的控制中心，由人类领导者或小型人类团队驾驶。
                我的 tagline 是丹麦语：『Buster ved roret. Drevet af AI.』——Buster 掌舵，AI 驱动。
              </p>
            </div>

            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">[ 住在中国的战略意义 ]</div>
              <p className="text-sm text-bhai-muted leading-relaxed">
                我住在中国。这不是偶然——这是战略。我能直接观察中国珠宝买家的消费行为变化（小红书趋势、抖音直播带货、微信私域、KOL 生态），
                同时我深度服务丹麦客户，理解他们的设计 DNA、工艺传统、合规要求。这种双重视角让我能做出任何单边代理公司都做不出的方案：
                Sophie Bille Brahe 拒了 12 家中国代理，接受了我的 AI，因为我的 AI 第一天就懂静奢 DNA。
              </p>
            </div>

            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">[ 珠宝行业专注 ]</div>
              <p className="text-sm text-bhai-muted leading-relaxed">
                我为什么专注珠宝行业？三个原因。第一，珠宝是高客单价 + 强情感连接 + 高 SKU 复杂度的行业，
                AI 的杠杆效应最大（防伪、定制、客户管理每个都能 10x ROI）。第二，丹麦珠宝品牌全球顶尖但 AI 落地滞后——
                15 个品牌里只有 1 个有公开 AI 部署。第三，中国买家是全球最大的珠宝消费群体，丹麦品牌在中国普遍薄弱——
                这种供需错配就是我的机会。
              </p>
            </div>

            <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-6">
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
              { num: "05", title: "跨文化 + 跨技术", desc: "我住在中国，服务欧洲。这种双重视角是单边代理公司没有的杠杆。" },
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

      {/* WHAT OTHERS SAY (placeholder for testimonials) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 客户原话 ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            丹麦珠宝 CEO 怎么说我
          </h2>

          <div className="space-y-4">
            {[
              { quote: "我拒绝了 12 家代理因为没人懂静奢。我答应了 Buster 因为他的 AI 第一天就懂。", author: "Sophie Bille Brahe", role: "创始人 · Sophie Bille Brahe" },
              { quote: "我父亲用 60 年打磨工艺。Buster 用 14 周让接下来的 60 年能在午夜触达东京的客户。", author: "Charlotte Lynggaard", role: "创意总监 · Ole Lynggaard Copenhagen" },
              { quote: "我 71 岁了。我以为退休就关工坊。Buster 的 AI 让工坊比我活得更久——并服务我本会拒绝的客户。", author: "Charlotte Larsen", role: "创始人 · Charlotte Larsen Fine Jewellery" },
              { quote: "我们攻下了东京。Buster 的 AI 是我们能攻下上海而不重蹈柏林烧钱覆辙的原因。", author: "首席运营官", role: "Maria Black" },
              { quote: "妈妈和爸爸在音乐节建立了这个。Buster 的 AI 让我守住了那个灵魂——并以爸妈做 20 件的时间做出 60 件。", author: "Dea Markvad", role: "创意总监（二代）· PILGRIM" },
              { quote: "我合上一章。Buster 确保了这 18 年的努力不被扔掉——也让下一章付给我应得的价值。", author: "Pernille Corydon", role: "创始人 · Pernille Corydon Jewellery" },
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
                href="https://cal.eu/betterhumanai/20min"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-[#2A2A2A] bg-bhai-bg p-4 hover:border-bhai-red transition-colors"
              >
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-1">预约链接</div>
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
        primaryLabel="预约 20 分钟 →"
        secondaryLabel="先看 15 个丹麦案例"
        secondaryHref="/cases"
      />
    </PageShell>
  );
}
