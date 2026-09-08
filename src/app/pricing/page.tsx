import Link from "next/link";
import { PageShell } from "@/components/bhai/PageShell";
import { CTASection } from "@/components/bhai/CTASection";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/bhai/JsonLd";
import { ArrowRight, Check, X, ShieldCheck, Sparkles, Building2, Repeat } from "lucide-react";
import { withOpenGraph } from "@/lib/page-metadata";

export const metadata = withOpenGraph(
  { title: "价格 · 透明定价 · 14 天保证 | Better Human AI", description: "BHAI 透明定价：AI 审计（¥15K-50K 入门）、AI 构建（¥40K-150K 每项目）、AI 托管（¥20K+/月）。14 天首个代理上线保证——否则我继续工作直到上线。" },
  "/pricing",
  "/og-pricing.jpg"
);

export default function PricingPage() {
  return (
    <PageShell>
      <FAQJsonLd faqs={[
        { q: "为什么 AI 审计要 ¥15K-50K？不能用 ChatGPT 自己做吗？", a: "可以——如果你的品牌年营收低于 5000 万人民币。但超过这个量级，你需要的是：(1) 知道你团队现在在用什么 AI 工具（通常 8-12 个，没人追踪成本）；(2) 知道 PIPL 合规风险点；(3) 知道哪个代理 30 天能赚回成本。我做这个 5+ 年了，1-2 周交付的 60-90 页报告比你团队花 6 个月摸索更快更准。" },
        { q: "AI 构建 ¥40K-150K 的差距为什么这么大？", a: "取决于三个因素：(1) 你的品牌复杂度（1 个产品线还是 5 个）；(2) 你选几个代理（2 个还是 6 个）；(3) 集成复杂度（已有 CRM/ERP 还是全新建）。20 分钟通话后我能给你精确报价——不会有隐藏费用。" },
        { q: "托管为什么月付 ¥20K 起？包含什么？", a: "¥20K/月 包含：我每两周一次回顾会议（我亲自参与，不甩初级顾问）、AI 代理持续优化 + 重训练、PIPL 合规监控、紧急 4 小时响应、季度 ROI 报告，以及所有 AI token 成本（Claude/通义千问调用费用通常每月 ¥3K-8K，我承担不另收）。" },
        { q: "14 天保证具体是什么？", a: "签约后 14 天内，首个 AI 代理必须上线跑生产——不是 PPT，不是 Demo，是真正能干活的代理。如果 14 天没上线，我不收额外费用继续工作直到它上线。唯一例外：你团队延迟提供必要的访问权限/数据，这种情况我会提前书面说明。" },
        { q: "数据安全吗？中国客户数据会出国吗？", a: "不会。所有客户数据严格部署在中国境内云（默认阿里云上海区，可选腾讯云/华为云/AWS 中国）。仅匿名化模式数据（不含个人信息）回流哥本哈根控制中心用于跨客户模式学习。PIPL 第 38 条合规，数据安全法合规，网络安全法合规。" },
        { q: "需要先付全款吗？", a: "不需要。AI 审计：50% 启动 + 50% 交付报告。AI 构建：30% 启动 + 30% 首个代理上线（14 天内）+ 40% 完整工作队交付（14 周内）。托管：月付。所有付款支持人民币对公账户或欧元对公账户。" },
        { q: "如果我不满意可以退款吗？", a: "AI 审计：交付报告后 7 天内不满意，全额退款（不需要理由）。AI 构建：14 天保证期内首个代理未上线，已付的 30% 启动费全额退还。托管：任意月份不满意，下月停止，已付当月不退但停止扣款。" },
        { q: "你和那些 AI 咨询公司有什么本质区别？", a: "三个本质区别：(1) 我交付生产环境 AI 代理，他们交付 PPT；(2) 我亲自参与每客户，他们甩给初级顾问；(3) 我有 16 个真实案例（15 丹麦 + 1 中国广州珠韵），他们通常有 3-5 个匿名案例。20 分钟通话你能立刻感受到区别。" },
      ]} />
      <BreadcrumbJsonLd items={[
        { name: "首页", url: "/" },
        { name: "价格", url: "/pricing" },
      ]} />
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">[ 透明定价 · 不藏猫腻 ]</div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            透明价格。<br />
            <span className="stat-highlight">14 天保证。</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed">
            96% 的 AI 咨询公司在第一次通话前不告诉你价格。这是操纵——也是为什么 88% 的公司在 PPT 阶段卡住。
            我把所有价格列在这里。看完直接决定要不要 20 分钟通话。
          </p>

          {/* 14-day guarantee banner */}
          <div className="mt-10 rounded-2xl border border-bhai-red/40 bg-bhai-red/5 p-6 red-glow">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-bhai-red/20 border border-bhai-red flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6 text-bhai-red" />
              </div>
              <div>
                <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">[ BHAI 14 天保证 ]</div>
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-foreground mb-2 leading-tight">
                  首个 AI 代理在 14 天内上线。否则我继续工作，直到它上线。
                </h2>
                <p className="text-sm text-bhai-muted leading-relaxed">
                  不是 PPT。不是 Demo。是真正跑生产的 AI 代理——你能在控制中心看到它工作。
                  如果 14 天内没上线，我不收额外费用继续工作直到它上线。这是我对你时间的承诺。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 3 个产品 · 任选组合 ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            从 1.5 万到长期托管<br />
            <span className="text-bhai-muted">按你的阶段选</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PricingCard
              tier="01"
              name="AI 审计"
              nameEn="AI AUDIT"
              tagline="入门 · 低风险 · 看到机会"
              price="¥15,000 - 50,000"
              priceNote="一次性 · 1-2 周"
              icon={Sparkles}
              description="如果你不知道从哪里开始，这是入口。我审计你的品牌、CRM、电商、客户管理流程，输出一份 60-90 页的 AI 路线图报告——具体到该上哪个代理、6 周后能看到什么数字。"
              includes={[
                "AI 成熟度审计（5 维度）",
                "AI 隐藏成本分析（你团队正在用什么 AI 工具）",
                "PIPL + 数据安全合规检查",
                "60-90 页 AI 路线图报告",
                "2 小时 CEO + CTO 一起的解读会",
                "3 个优先代理推荐 + ROI 预测",
              ]}
              notIncludes={[
                "不包含实际代理部署",
                "不包含持续托管",
              ]}
              cta="预约审计"
              ctaHref="/book?tier=audit"
              highlighted={false}
            />

            <PricingCard
              tier="02"
              name="AI 构建"
              nameEn="AI BUILD"
              tagline="主力 · 14 周完整部署 · 14 天保证"
              price="¥40,000 - 150,000"
              priceNote="每项目 · 14 周生产环境部署"
              icon={Building2}
              description="这是 BHAI 的主力产品。从 6 周上下文构建开始，到 14 天首个代理上线，到 14 周完整工作队跑生产。覆盖丹麦验证过的 9 类工作队中任意组合。所有客户数据部署在中国云（阿里云/腾讯云/华为云/AWS 中国）。"
              includes={[
                "6 周上下文构建（品牌语调包 + 决策规则 + 集成审计）",
                "14 天首个代理上线（BHAI 保证）",
                "14 周完整工作队部署",
                "AI 控制中心 + 完整审计链",
                "PIPL + GDPR + EU AI Act 三重合规",
                "中国云基础设施部署（7 大云厂商可选）",
                "国际模型 + 国产模型双栈（Claude / 通义千问 / 文心一言）",
                "14 周内每周回顾会议",
                "你的中国区总经理控制中心培训",
              ]}
              notIncludes={[
                "不包含 14 周后的持续托管（见下方托管）",
              ]}
              cta="预约构建"
              ctaHref="/book?tier=build"
              highlighted={true}
            />

            <PricingCard
              tier="03"
              name="AI 托管"
              nameEn="AI RETAINER"
              tagline="长期 · 持续优化 · 永久在环"
              price="¥20,000 /月起"
              priceNote="月付 · 含 AI token 成本"
              icon={Repeat}
              description="14 周 AI 构建完成后，进入持续托管。我每两周一次回顾会议——哪些决策被人类拒绝（重训练信号）、哪些代理超预算（边界调整）、哪些 ROI 超预期（扩展信号）。我作为外部顾问持续介入，不依赖你的内部团队。"
              includes={[
                "每两周回顾会议（我亲自参与）",
                "AI 代理持续优化 + 重训练",
                "新代理按需上线（¥40K 每个）",
                "PIPL 合规持续监控",
                "AI 控制中心升级",
                "紧急情况 4 小时响应",
                "所有 AI token 成本包含（不另收）",
                "季度 ROI 报告",
              ]}
              notIncludes={[
                "不包含新的工作队从零构建",
              ]}
              cta="预约托管"
              ctaHref="/book?tier=retainer"
              highlighted={false}
            />
          </div>

          <div className="mt-12 rounded-2xl border border-[#2A2A2A] bg-bhai-card p-6">
            <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">[ 所有产品都包含 ]</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "我亲自参与（不甩给初级顾问）",
                "GDPR + EU AI Act + PIPL 三重合规",
                "完整审计链（每条 AI 决策可追溯）",
                "WeChat busterl1 直接联系我",
                "中文 + 丹麦语 + 英语三语支持",
                "数据本地化（中国数据不出境）",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                  <span className="text-sm text-bhai-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-6xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ BHAI vs 传统 AI 咨询 ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            为什么我不像其他 AI 咨询公司
          </h2>

          <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card overflow-hidden">
            <div className="grid grid-cols-3 gap-px bg-[#2A2A2A]">
              <div className="bg-bhai-card p-4">
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest">维度</div>
              </div>
              <div className="bg-bhai-red/10 p-4">
                <div className="font-mono text-[10px] text-bhai-red tracking-widest">BHAI</div>
              </div>
              <div className="bg-bhai-card p-4">
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest">传统 AI 咨询</div>
              </div>

              {[
                ["价格透明度", "网上直接看到", "第一次通话才告诉你"],
                ["交付物", "生产环境 AI 代理", "PPT + 路线图报告"],
                ["14 天保证", "首个代理 14 天上线，否则免费继续工作", "无保证"],
                ["人在环里", "从第一天起，每条决策人类签字", "可选附加"],
                ["审计链", "完整可追溯，GDPR + PIPL 三重合规", "事后补的合规模板"],
                ["中国合规", "PIPL + 数据安全法 + 数据本地化", "通常只提 GDPR"],
                ["AI token 成本", "托管费包含", "客户另付"],
                ["我亲自参与", "每客户我亲自驾船", "甩给初级顾问"],
                ["案例数量", "16 个真实案例（15 丹麦 + 1 中国）", "通常 3-5 个匿名案例"],
              ].map((row, i) => (
                <div key={i} className="contents">
                  <div className="bg-bhai-card p-4 text-sm text-bhai-text">{row[0]}</div>
                  <div className="bg-bhai-red/5 p-4 text-sm text-foreground font-medium flex items-start gap-2">
                    <Check className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    {row[1]}
                  </div>
                  <div className="bg-bhai-card p-4 text-sm text-bhai-muted flex items-start gap-2">
                    <X className="h-4 w-4 text-bhai-dim mt-0.5 shrink-0" />
                    {row[2]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-4xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 价格 FAQ ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            常见问题
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "为什么 AI 审计要 ¥15K-50K？不能用 ChatGPT 自己做吗？",
                a: "可以——如果你的品牌年营收低于 5000 万人民币。但超过这个量级，你需要的是：(1) 知道你团队现在在用什么 AI 工具（通常 8-12 个，没人追踪成本）；(2) 知道 PIPL 合规风险点；(3) 知道哪个代理 30 天能赚回成本。我做这个 5+ 年了，1-2 周交付的 60-90 页报告比你团队花 6 个月摸索更快更准。"
              },
              {
                q: "AI 构建 ¥40K-150K 的差距为什么这么大？",
                a: "取决于三个因素：(1) 你的品牌复杂度（1 个产品线还是 5 个）；(2) 你选几个代理（2 个还是 6 个）；(3) 集成复杂度（已有 CRM/ERP 还是全新建）。20 分钟通话后我能给你精确报价——不会有隐藏费用。"
              },
              {
                q: "托管为什么月付 ¥20K 起？包含什么？",
                a: "¥20K/月 包含：我每两周一次回顾会议（我亲自参与，不甩初级顾问）、AI 代理持续优化 + 重训练、PIPL 合规监控、紧急 4 小时响应、季度 ROI 报告，以及所有 AI token 成本（Claude/通义千问调用费用通常每月 ¥3K-8K，我承担不另收）。"
              },
              {
                q: "14 天保证具体是什么？",
                a: "签约后 14 天内，首个 AI 代理必须上线跑生产——不是 PPT，不是 Demo，是真正能干活的代理。如果 14 天没上线，我不收额外费用继续工作直到它上线。唯一例外：你团队延迟提供必要的访问权限/数据，这种情况我会提前书面说明。"
              },
              {
                q: "数据安全吗？中国客户数据会出国吗？",
                a: "不会。所有客户数据严格部署在中国境内云（默认阿里云上海区，可选腾讯云/华为云/AWS 中国）。仅匿名化模式数据（不含个人信息）回流哥本哈根控制中心用于跨客户模式学习。PIPL 第 38 条合规，数据安全法合规，网络安全法合规。"
              },
              {
                q: "需要先付全款吗？",
                a: "不需要。AI 审计：50% 启动 + 50% 交付报告。AI 构建：30% 启动 + 30% 首个代理上线（14 天内）+ 40% 完整工作队交付（14 周内）。托管：月付。所有付款支持人民币对公账户或欧元对公账户。"
              },
              {
                q: "如果我不满意可以退款吗？",
                a: "AI 审计：交付报告后 7 天内不满意，全额退款（不需要理由）。AI 构建：14 天保证期内首个代理未上线，已付的 30% 启动费全额退还。托管：任意月份不满意，下月停止，已付当月不退但停止扣款。"
              },
              {
                q: "你和那些 AI 咨询公司有什么本质区别？",
                a: "三个本质区别：(1) 我交付生产环境 AI 代理，他们交付 PPT；(2) 我亲自参与每客户，他们甩给初级顾问；(3) 我有 16 个真实案例（15 丹麦 + 1 中国广州珠韵），他们通常有 3-5 个匿名案例。20 分钟通话你能立刻感受到区别。"
              }
            ].map((faq, i) => (
              <div key={i} className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
                <h3 className="text-base font-bold text-foreground mb-3 flex items-start gap-3">
                  <span className="font-mono text-xs text-bhai-red tracking-widest mt-1 shrink-0">Q{String(i + 1).padStart(2, '0')}</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-bhai-muted leading-relaxed pl-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="看完价格了？20 分钟通话决定要不要做。"
        subtitle="我不会在通话中卖你任何东西。我听你讲你的瓶颈，告诉你哪个产品适合（或者不合适）。如果对不上，我们握手告别。"
        primaryLabel="微信 busterl1 · 预约 →"
        primaryHref="/book"
        secondaryLabel="先看 16 个案例"
        secondaryHref="/cases"
      />
    </PageShell>
  );
}

function PricingCard({
  tier, name, nameEn, tagline, price, priceNote, icon: Icon, description, includes, notIncludes, cta, ctaHref, highlighted,
}: {
  tier: string;
  name: string;
  nameEn: string;
  tagline: string;
  price: string;
  priceNote: string;
  icon: React.ElementType;
  description: string;
  includes: string[];
  notIncludes: string[];
  cta: string;
  ctaHref: string;
  highlighted: boolean;
}) {
  return (
    <div className={`rounded-2xl p-6 flex flex-col h-full ${highlighted ? "border-2 border-bhai-red bg-bhai-card red-glow" : "border border-[#2A2A2A] bg-bhai-card"}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] text-bhai-muted tracking-widest">TIER {tier}</span>
        {highlighted && (
          <span className="rounded-full bg-bhai-red text-white text-[10px] font-mono px-2 py-0.5 tracking-widest">推荐</span>
        )}
      </div>

      <div className="flex items-center gap-3 mb-2">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${highlighted ? "bg-bhai-red/20 border border-bhai-red" : "bg-bhai-red/5 border border-bhai-red/30"}`}>
          <Icon className="h-5 w-5 text-bhai-red" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <div className="font-mono text-[10px] text-bhai-muted tracking-widest">{nameEn}</div>
        </div>
      </div>

      <p className="text-xs text-bhai-red mb-4">{tagline}</p>

      <div className="mb-4 pb-4 border-b border-[#2A2A2A]">
        <div className="font-sans text-2xl font-bold text-foreground">{price}</div>
        <div className="text-xs text-bhai-muted mt-1">{priceNote}</div>
      </div>

      <p className="text-sm text-bhai-muted leading-relaxed mb-5">{description}</p>

      <div className="space-y-2 mb-5 flex-1">
        <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-2">包含</div>
        {includes.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <Check className="h-3.5 w-3.5 text-bhai-red mt-0.5 shrink-0" />
            <span className="text-xs text-bhai-text leading-relaxed">{item}</span>
          </div>
        ))}
        {notIncludes.length > 0 && (
          <>
            <div className="font-mono text-[10px] text-bhai-dim tracking-widest mb-2 mt-4">不包含</div>
            {notIncludes.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <X className="h-3.5 w-3.5 text-bhai-dim mt-0.5 shrink-0" />
                <span className="text-xs text-bhai-dim leading-relaxed">{item}</span>
              </div>
            ))}
          </>
        )}
      </div>

      <Link
        href={ctaHref}
        className={`block rounded-md py-3 text-sm font-medium text-center transition-colors ${highlighted ? "cta-primary text-white" : "border border-[#333] text-foreground hover:border-bhai-red hover:bg-[#0F0F0F]"}`}
      >
        {cta} <ArrowRight className="inline h-3 w-3 ml-1" />
      </Link>
    </div>
  );
}
