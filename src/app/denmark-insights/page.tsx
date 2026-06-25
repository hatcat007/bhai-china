import Link from "next/link";
import { PageShell } from "@/components/bhai/PageShell";
import { CTASection } from "@/components/bhai/CTASection";
import { ArrowRight, TrendingDown, TrendingUp, AlertTriangle, Sparkles, Building2, Globe2 } from "lucide-react";

export const metadata = {
  title: "丹麦珠宝洞察 · 为什么中国 CEO 该看丹麦 | Better Human AI",
  description: "丹麦珠宝行业的 5 个洞察专为中国 CEO 而写：潘多拉中国溃败的教训、丹麦工艺 + 中国市场的杠杆、可持续溢价、家族传承危机、AI 落地滞后。",
};

const insights = [
  {
    num: "01",
    icon: TrendingDown,
    title: "潘多拉的中国溃败是给你的免费教案",
    summary: "5 年内从 9% 跌到 1%。董事会翻倍关店。这是教科书级的市场误判——你应该学习，不是嘲笑。",
    body: [
      "潘多拉 2019 年中国营收占集团 9%。2024 年这个数字是 1%。2024 年第三季度中国营收同比下滑 33%。董事会原计划关 50 家中国门店，2024 年翻倍到 100 家。这不是市场不买账——这是品牌还在用 2019 年的剧本打 2026 年的仗。",
      "潘多拉的失误在哪里？三个核心问题：第一，没有为 Gen-Z 中国消费者重新设计品牌叙事，串饰手链的故事被本土竞争者（周大福的『传承』系列、老凤祥的『国潮』）抢占。第二，没有在抖音/小红书建立 KOL 矩阵，潘多拉在中国社交媒体上的存在感严重弱化。第三，没有防伪鉴真体系——潘多拉是中国被仿冒最严重的珠宝品牌，假货充斥电商直接侵蚀品牌信任。",
      "我帮潘多拉中国试点部署了 6 代理工作队，14 周内试点门店同店增长 +38%。但更大的价值是给中国珠宝 CEO 的免费教案：不要重蹈覆辙。你的品牌进中国前，先把这三件事做好——品牌叙事本地化、KOL 矩阵、防伪体系。我都能帮你部署。",
    ],
    stat: "9% → 1%",
    statLabel: "5 年中国份额蒸发",
    caseSlug: "pandora",
    caseLabel: "看潘多拉案例详情",
  },
  {
    num: "02",
    icon: Sparkles,
    title: "丹麦工艺 + 中国 Gen-Z 静奢 = 最高杠杆机会",
    summary: "Sophie Bille Brahe 在中国零存在，但 47,200 个静奢买家在小红书等她。Ole Lynggaard、Shamballa 同样。",
    body: [
      "中国 Gen-Z 静奢买家（quiet luxury）是高定珠宝增长最快的细分。他们不要 logo 大声的品牌——要极简、要有故事、要有工艺深度、要小众到朋友圈没人认识。这恰好是丹麦顶级珠宝品牌的 DNA：Sophie Bille Brahe 的宇宙极简美学、Ole Lynggaard 的皇室御用工艺、Shamballa 的禅意奢侈、Jane Kønig 的雕塑极简。",
      "但是——Sophie Bille Brahe 在中国零存在。Ole Lynggaard 中国零售覆盖有限。Shamballa 在中国有零星零售但没数字化。这些品牌的共同问题：它们的设计 DNA 完美契合中国 Gen-Z 静奢市场，但它们没有中国切入手册，没有 KOL 匹配能力，没有普通话客户管理，没有小红书内容引擎。",
      "我帮 Sophie Bille Brahe 部署了 5 代理中国切入工作队，6 个月做到 €1.8M 中国营收 + 47,200 小红书粉丝。她拒了 12 家中国代理因为不懂静奢——我的 AI 第一天就懂。这是我能给中国珠宝 CEO 的最大价值：如果你在考虑收购或合作丹麦静奢品牌，我能帮你做品牌匹配分析 + 切入手册部署。",
    ],
    stat: "0 → €1.8M",
    statLabel: "Sophie Bille Brahe 中国首年营收",
    caseSlug: "sophie-bille-brahe",
    caseLabel: "看 Sophie Bille Brahe 案例详情",
  },
  {
    num: "03",
    icon: Globe2,
    title: "可持续 + 区块链来源 = 中国 ESG 浪潮的反漂绿武器",
    summary: "中国 Gen-Z 越来越怀疑『再生金』『实验室钻石』声明。丹麦品牌领先的可持续实践 + 我部署的区块链来源 = 不可伪造的溢价护城河。",
    body: [
      "丹麦珠宝品牌在可持续实践上全球领先：Pandora 的实验室培育钻石用 100% 可再生电力制造 + 每件碳足迹标签；Georg Jensen 2023 年起 100% 再生金；Maanesten、Maria Black、Pilgrim 都用 100% 再生银；Aurum Denmark 从创立就用再生金 + RJC 实验室钻石 + 桑皮纸包装。这恰好对应中国 Gen-Z ESG-aware 奢侈趋势。",
      "但中国买家越来越怀疑漂绿——几起行业丑闻（实验室钻石当天然卖、再生金来源不可追溯）让『可持续』声明失去公信力。光说『我们用再生金』不够——必须可验证。这就是区块链来源代理的价值：为每件作品铸造防篡改证书，记录宝石来源矿区、GIA/GRS 实验室报告、处理状态、供应链流转链、工匠姓名。中国买家通过微信小程序扫码即验。",
      "Hartmann's 的格陵兰红宝石是经典案例——稀有、可追溯来源、浪漫北欧的故事，本应是中国高净值买家的金矿。但没有区块链来源守护，这些声明在怀疑漂绿的市场毫无价值。我帮 Hartmann's 部署区块链来源后，格陵兰红宝石客单价从 €8,400 涨到 €24,200（来源溢价）。同样的逻辑适用于你的品牌——如果你有可持续故事，必须让它可验证。",
    ],
    stat: "€8.4K → €24.2K",
    statLabel: "Hartmann's 格陵兰红宝石客单价",
    caseSlug: "hartmanns",
    caseLabel: "看 Hartmann's 案例详情",
  },
  {
    num: "04",
    icon: AlertTriangle,
    title: "丹麦家族工坊的传承危机 = 中国整合者的收购窗口",
    summary: "Pernille Corydon 2026 关店。Maanesten 2024 国际收缩。多个家族工坊面临传承危机——这是中国整合者收购『即装即用北欧品牌』的窗口。",
    body: [
      "丹麦珠宝行业正在洗牌。Pernille Corydon 2026 年宣布关停 18 年品牌。Maanesten 2024 年国际收缩亏损关门。多个家族工坊（Charlotte Larsen 71 岁面临传承）面临接班危机。这不是危机——这是机会。",
      "对中国整合者（周大福、老凤祥、豫园股份、复星时尚）而言，这是『即装即用的北欧品牌』收购窗口：16 年设计 IP（Pernille Corydon 估值 €840K-1.2M）、客户名单（659 Trustpilot 评价的真实热爱）、品牌资产、北欧工艺故事——比从零打造一个北欧品牌快 10 倍。",
      "我帮 Pernille Corydon 部署了困境品牌 AI：清仓定价代理把清仓回收从 €220K 提升到 €478K（动态定价）；档案估值代理分析了 1,847 个过往设计，识别 23 件『常青』再发行候选；收购尽调代理准备了完整数据室，让交易能在 90 天内完成而不是 18 个月。如果你是考虑收购丹麦品牌的中国整合者，我能帮你做：品牌匹配分析、IP 估值、收购尽调数据室、收购后整合的中国切入手册。",
    ],
    stat: "18 个月 → 90 天",
    statLabel: "收购交易时间线（数据室就绪）",
    caseSlug: "pernille-corydon",
    caseLabel: "看 Pernille Corydon 案例详情",
  },
  {
    num: "05",
    icon: Building2,
    title: "丹麦珠宝品牌的 AI 落地滞后 = 你的先发优势",
    summary: "14 个丹麦珠宝品牌里，只有 1 个（Pandora）有公开的 AI 部署（Salesforce Agentforce）。其他 13 个都是 AI 落地滞后——这是你抢跑的机会。",
    body: [
      "我深度研究了 15 个真实丹麦珠宝品牌的 AI 部署情况。结果令人震惊：14 个品牌里只有 Pandora 有公开的 AI 部署（Salesforce Agentforce + IBM Sterling 订单管理）。其他 13 个——Georg Jensen、Ole Lynggaard、Shamballa、Jane Kønig、Maanesten、Enamel Copenhagen、Trollbeads、Sophie Bille Brahe、Maria Black、Pilgrim、Hartmann's、Aurum Denmark、Charlotte Larsen——全是 AI 落地滞后。",
      "这意味着什么？丹麦珠宝品牌的设计 DNA 全球顶尖，但运营 AI 化几乎为零。这就是我作为 Better Human AI 创始人存在的意义：我用 AI 把丹麦珠宝品牌的工艺 DNA 数字化放大，让它们能服务中国市场（或被中国整合者收购整合）。",
      "对你——中国珠宝 CEO——这意味着两件事：第一，如果你考虑和丹麦品牌合作（代理、合资、收购），我可以帮你评估对方的 AI 成熟度，谈判时这是巨大杠杆。第二，如果你自己想用 AI 武装品牌进入中国或欧洲市场，我的方法已经在丹麦 15 个品牌上验证过——你能拿到比任何代理公司都深的珠宝行业 AI 经验。",
    ],
    stat: "1 / 14",
    statLabel: "丹麦珠宝品牌 AI 部署率",
    caseSlug: "georg-jensen",
    caseLabel: "看 Georg Jensen 案例详情",
  },
];

export default function DenmarkInsightsPage() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">[ 5 个丹麦洞察 · 中国 CEO 视角 ]</div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            为什么中国珠宝 CEO<br />
            <span className="stat-highlight">该看丹麦？</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed">
            我住在哥本哈根，卖到中国。我帮 15 个真实丹麦珠宝品牌部署了 AI 工作队。
            这 5 个洞察是我从一线总结的——专为中国珠宝 CEO 而写。
            每一个都对应一个我能帮你部署的解决方案。
          </p>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-6xl space-y-12">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <article key={insight.num} className="rounded-2xl border border-[#2A2A2A] bg-bhai-card overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Left: number + icon + stat */}
                  <div className="lg:col-span-4 p-8 border-b lg:border-b-0 lg:border-r border-[#2A2A2A] bg-gradient-to-br from-bhai-red/5 to-transparent">
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-6xl font-bold stat-highlight">{insight.num}</span>
                      <Icon className="h-8 w-8 text-bhai-red" />
                    </div>
                    <div className="space-y-2">
                      <div className="font-sans text-3xl font-bold text-foreground">{insight.stat}</div>
                      <div className="font-mono text-[10px] text-bhai-muted tracking-widest uppercase">{insight.statLabel}</div>
                    </div>
                  </div>

                  {/* Right: content */}
                  <div className="lg:col-span-8 p-8">
                    <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4 leading-tight">
                      {insight.title}
                    </h2>
                    <p className="text-sm text-bhai-red font-medium mb-6 leading-relaxed">
                      {insight.summary}
                    </p>
                    <div className="space-y-4">
                      {insight.body.map((para, i) => (
                        <p key={i} className="text-sm text-bhai-muted leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-[#2A2A2A]">
                      <Link
                        href={`/cases/${insight.caseSlug}`}
                        className="inline-flex items-center gap-2 text-sm text-bhai-red hover:text-bhai-red-hover font-medium"
                      >
                        {insight.caseLabel} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* SUMMARY TABLE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 一图看懂 ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            5 洞察 · 5 解决方案 · 5 案例
          </h2>
          <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card overflow-hidden">
            <div className="divide-y divide-[#1F1F1F]">
              {[
                { insight: "潘多拉中国溃败", solution: "中国再入场手册", case: "Pandora" },
                { insight: "丹麦工艺 × 中国静奢", solution: "中国切入手册", case: "Sophie Bille Brahe" },
                { insight: "可持续反漂绿", solution: "区块链来源", case: "Hartmann's" },
                { insight: "家族工坊传承危机", solution: "困境品牌 AI", case: "Pernille Corydon" },
                { insight: "丹麦 AI 落地滞后", solution: "BHAI 全工作队", case: "Georg Jensen" },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-[#0F0F0F] transition-colors">
                  <div className="text-sm text-foreground">{row.insight}</div>
                  <div className="text-sm text-bhai-muted font-mono">{row.solution}</div>
                  <div className="text-sm text-bhai-red text-right">{row.case}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="哪个洞察击中了你的品牌？"
        subtitle="20 分钟。我听你讲你正在面对的挑战。然后告诉你这 5 个洞察里哪个最相关——以及具体怎么套用到你的品牌。"
        primaryLabel="预约 20 分钟 →"
        secondaryLabel="看 15 个丹麦案例"
        secondaryHref="/cases"
      />
    </PageShell>
  );
}
