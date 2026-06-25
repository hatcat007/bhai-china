import Link from "next/link";
import { PageShell } from "@/components/bhai/PageShell";
import { CTASection } from "@/components/bhai/CTASection";
import { ArrowRight, Eye, Sparkles, Diamond, TrendingUp, Cpu, ShieldCheck, Gauge, Wrench, MessageCircle, Boxes, FileCheck } from "lucide-react";

export const metadata = {
  title: "珠宝行业 AI 解决方案 · 9 类工作队 | Better Human AI",
  description: "为珠宝品牌量身打造的 9 类 AI 工作队：防伪鉴真、高定共创、普通话 VIP 礼宾、需求预测、区块链来源、中国切入手册、AR 试戴、困境品牌 AI、中国云基础设施。",
};

const solutions = [
  {
    id: "anti-counterfeit",
    icon: Eye,
    name: "AI 防伪鉴真",
    nameEn: "AI Anti-Counterfeit Authentication",
    pitch: "你的品牌在中国被仿冒到什么程度？我部署的图像识别代理监控淘宝/抖音/拼多多/微信代销，每月自动下架 1,840+ 件假货。",
    pain: "潘多拉是中国被仿冒最严重的珠宝品牌。Shamballa 手链假货充斥中国电商。Trollbeads 玻璃珠二级市场伪造横行。你的团队加班也追不上 AI 生成的假货图——你需要 AI 打 AI。",
    solution: "图像识别代理监控 12+ 中国电商平台，用微观细节识别（编织纹路、切面角度、颜色校准）以 94-96% 准确率识别假货，自动生成 DMCA 式下架请求并追踪执行。区块链鉴真证书让真品买家扫码即验。",
    results: [
      "月均 1,840+ 件假货自动下架（vs. 手工 47 件）",
      "96% 假货识别准确率（Shamballa 部署）",
      "94% 赝品标记准确率（Georg Jensen 部署）",
      "真品鉴真证书可在微信小程序验证",
    ],
    cases: ["pandora", "shamballa-jewels", "georg-jensen"],
    caseLabels: ["潘多拉", "Shamballa", "Georg Jensen"],
  },
  {
    id: "bespoke-design",
    icon: Sparkles,
    name: "高定共创 AI",
    nameEn: "Bespoke Co-Creation AI",
    pitch: "创始人每年只能设计 120 件？我用 AI 在她 DNA 约束下生成 340 件候选，她只审核。设计周期从 16 周砍到 6 周。",
    pain: "创始人主导的珠宝品牌面临残酷选择：要么雇初级设计师稀释品牌 DNA，要么保持小规模。Jane Kønig 每年亲手设计 120 件。Charlotte Larsen 一年 30 件定制委托，被迫拒掉 200+。Ole Lynggaard 40 个金匠卡住 275 家门店。",
    solution: "创始人 DNA 设计代理在 1,400+ 件档案 + 草图上训练，生成符合品牌美学的候选设计。创始人一键审核/拒绝，拒绝反馈自动重训练。定制共创代理让客户提出定制需求（不同宝石、不同金色调），生成照片级真实渲染——创始人最终批准。",
    results: [
      "Jane Kønig: 120 → 340 件批准/年",
      "Ole Lynggaard: 12-16 周 → 5-7 周定制周期",
      "Pilgrim: 16 周 → 6 周设计周期",
      "Charlotte Larsen: 30 → 44 件委托/年",
    ],
    cases: ["jane-konig", "ole-lynggaard", "pilgrim", "charlotte-larsen"],
    caseLabels: ["Jane Kønig", "Ole Lynggaard", "PILGRIM", "Charlotte Larsen"],
  },
  {
    id: "vip-clienteling",
    icon: Diamond,
    name: "普通话 VIP 礼宾",
    nameEn: "Mandarin VIP Clienteling",
    pitch: "中国高净值客户凌晨 2 点在微信咨询？我的代理 24/7 用流利普通话回答，深度掌握每件作品的故事，自动预约私享鉴赏。",
    pain: "丹麦珠宝品牌的中国客户咨询响应时间通常 48-72 小时（如果在普通话服务的话）。Georg Jensen 120 年档案没有普通话查询接口。Hartmann's 的格陵兰红宝石故事没有普通话礼宾传达。Sophie Bille Brahe 中国零存在但 47,200 个中国静奢买家在小红书等她。",
    solution: "普通话 VIP 礼宾代理 24/7 处理微信/小红书/天猫咨询，深度掌握每件作品的设计灵感、材料、来源、工艺故事。自动预约私享鉴赏（上海/香港/北京）。高定候补名单 AI 管理限量作品配额，基于收藏历史 + 推荐 + 意向透明筛选。Mads Kornerup 亲自训练 Shamballa 礼宾代理学习佛教象征 + 设计规则。",
    results: [
      "Georg Jensen: 48-72h → <90 秒普通话响应",
      "Sophie Bille Brahe: 0 → €1.8M 中国首年营收",
      "Hartmann's: 0-2 → 38 中国高净值咨询/月",
      "Shamballa: 3-5 → 31 件中国定制/季度",
    ],
    cases: ["georg-jensen", "sophie-bille-brahe", "hartmanns", "shamballa-jewels", "ole-lynggaard"],
    caseLabels: ["Georg Jensen", "Sophie Bille Brahe", "Hartmann's", "Shamballa", "Ole Lynggaard"],
  },
  {
    id: "demand-forecasting",
    icon: TrendingUp,
    name: "需求预测 + 动态定价",
    nameEn: "Demand Forecasting + Dynamic Pricing",
    pitch: "Maanesten 2024 年国际扩张亏损？我的 AI 在 14 个候选市场分析 38 个需求信号，明确排除 4 个市场，阻止了又一次昂贵失误。",
    pain: "珠宝行业的库存减值是隐形杀手。Maanesten 2024 年国际扩张亏损关门。Pilgrim 每年 €680K 库存减值。ENAMEL Copenhagen 一窑珐琅烧失误 = €8-15K 损失。Pernille Corydon 关店清仓原本预计回收 €220K。没有 SKU 级需求预测，品牌在赌运气。",
    solution: "需求预测代理预测 SKU 级 90 天需求，准确率 87.4%（Maanesten 部署）。动态定价代理根据库存水平、关店倒计时、需求速度、渠道动态调整价格，最大化总收入回收（不只是清仓速度）。市场优先级代理在 38 个维度分析候选市场，明确排除不该进的市场。",
    results: [
      "Maanesten: 4 个候选市场被明确排除",
      "Pilgrim: €680K → €180K 年度库存减值",
      "Pernille Corydon: €220K → €478K 清仓回收",
      "ENAMEL: €52K → €8K 窑烧失误损失/年",
    ],
    cases: ["maanesten", "pilgrim", "pernille-corydon", "enamel-copenhagen"],
    caseLabels: ["Maanesten", "PILGRIM", "Pernille Corydon", "ENAMEL"],
  },
  {
    id: "blockchain-provenance",
    icon: Cpu,
    name: "区块链来源",
    nameEn: "Blockchain Provenance",
    pitch: "中国买家越来越怀疑『再生金』『实验室钻石』声明？我为每件作品铸造可验证区块链证书——反漂绿，守护溢价。",
    pain: "几起行业丑闻后，中国买家越来越怀疑 ESG 声明和来源声明。Hartmann's 的格陵兰红宝石如果没有可验证来源就是空话。Georg Jensen 100% 再生金声明需要可验证。Aurum Denmark 的『一直再生』承诺需要第三方验证。Sophie Bille Brahe 的实验室钻石需要反漂绿守护。",
    solution: "区块链来源代理为每件作品铸造防篡改证书，记录：宝石来源（具体矿区）、GIA/GRS 实验室报告、处理状态、供应链流转链、原石照片、工匠姓名。中国买家通过微信小程序扫码即验。处理检测代理用光谱仪数据 + 图像识别标记任何与证书不符的宝石（抓住未披露处理）。",
    results: [
      "Hartmann's: 3 起供应商欺诈早期识别",
      "Georg Jensen: 古董银器赝品标记 94.2% 精准",
      "Aurum Denmark: 100% 作品可区块链验证",
      "Ole Lynggaard: 数字出生证随作品永久流转",
    ],
    cases: ["hartmanns", "georg-jensen", "aurum-denmark", "ole-lynggaard"],
    caseLabels: ["Hartmann's", "Georg Jensen", "Aurum Denmark", "Ole Lynggaard"],
  },
  {
    id: "china-entry",
    icon: ShieldCheck,
    name: "中国切入手册",
    nameEn: "China Market Entry Playbook",
    pitch: "Sophie Bille Brahe 拒了 12 家中国代理因为不懂静奢。我的 AI 第一天就懂——4,200 个 KOL 在 14 维度匹配，23 个被 Sophie 亲批。",
    pain: "丹麦品牌想进中国却找不到对的合作方。Sophie Bille Brahe 拒了 12 家中国代理因为不懂品牌静奢 DNA。Maria Black 想从东京扩到上海但不知道选址。Aurum Denmark 微型初创无中国存在但理念契合 Z 世代 ESG 趋势。Pandora 在中国从 9% 跌到 1% 是反例：盲目扩张代价惨重。",
    solution: "中国切入手册包含 4 个代理。静奢 KOL 匹配代理在 14 维度分析 4,200 个 KOL，创始人亲批每个。小红书编辑代理每周 3 条以品牌语调发帖（翻译而非生成）。天猫奢品馆礼宾代理 24/7 处理咨询。高定候补名单 AI 透明管理限量配额。上海选址代理在 18 维度建模选址。",
    results: [
      "Sophie Bille Brahe: 0 → 47,200 小红书粉丝（6 个月）",
      "Maria Black: 16 周上海旗舰开业手册就绪",
      "Aurum Denmark: 0 → 11,800 小红书粉丝（5 个月）",
      "Pandora: 11 周趋势提前量（避免重蹈覆辙）",
    ],
    cases: ["sophie-bille-brahe", "maria-black", "aurum-denmark", "pandora"],
    caseLabels: ["Sophie Bille Brahe", "Maria Black", "Aurum Denmark", "Pandora"],
  },
  {
    id: "ar-tryon",
    icon: Gauge,
    name: "AR 试戴网络",
    nameEn: "AR Try-On Network",
    pitch: "Ole Lynggaard 275 家门店备不齐实物样品？我用 AR 让客户在任何手机上 3D 试戴——94% 色彩还原，退货率从 18% 降到 4%。",
    pain: "OLE Lynggaard Copenhagen 275 家全球零售商无法备齐每个系列的实物样品。客户从图册下单后常常因为不合身或实物与图册不符而退货——退货率 18.2%。ENAMEL Copenhagen 珐琅在屏幕上色彩还原差，客户无法判断烧制玻璃的深度和光泽。Sophie Bille Brahe 耳骨夹在线难可视化。",
    solution: "AR 试戴代理在任何手机上工作——客户扫二维码就能在自己的手指/手腕/耳朵上看到 3D 真实效果，钻石折射准确。AR 色彩还原代理用校准色彩配置，在屏幕上以 94% 色彩准确度（对比实物）展示作品。AR 高定可视化代理用 3D 照片级真实细节渲染拟议高定委托，客户不去哥本哈根就能批准设计。",
    results: [
      "Ole Lynggaard: 18.2% → 4.1% 退货率（AR 试戴后）",
      "ENAMEL: 23% → 5.2% 在线退货率（色差）",
      "Hartmann's: 12 周 → 3 周高定设计批准周期",
      "Ole Lynggaard: 3,200 次 AR 试戴/月（12 门店）",
    ],
    cases: ["ole-lynggaard", "enamel-copenhagen", "hartmanns"],
    caseLabels: ["Ole Lynggaard", "ENAMEL", "Hartmann's"],
  },
  {
    id: "distressed-brand",
    icon: Wrench,
    name: "困境品牌 AI",
    nameEn: "Distressed Brand AI",
    pitch: "Pernille Corydon 2026 关店。我的 AI 既最大化清仓回收（€220K → €478K），又为 16 年档案估值（€840K-1.2M）方便中国整合者收购。",
    pain: "丹麦珠宝行业正在洗牌。Pernille Corydon 2026 关店（18 年品牌）。Maanesten 2024 国际收缩。多个家族工坊面临传承危机。对中国整合者而言，这是『即装即用的北欧品牌』收购机会——但如何为 16 年设计 IP 估值？如何在不清算品牌价值的情况下最大化清仓回收？",
    solution: "清仓定价代理根据库存水平、关店倒计时、需求速度、渠道动态定价。档案估值代理分析 1,847 个过往设计，识别 23 件『常青』再发行候选，根据可比品牌收购把档案 IP 估值在 €840K-1.2M。收购尽调代理准备完整数据室（客户 LTV、设计 IP 登记、社交媒体资产转让权），让交易能在 90 天内完成而不是 18 个月。",
    results: [
      "Pernille Corydon: €220K → €478K 清仓回收",
      "Pernille Corydon: €840K-1.2M 档案 IP 估值",
      "Pernille Corydon: 23 件常青再发行候选识别",
      "Pernille Corydon: 18 个月 → 90 天收购交易时间线",
    ],
    cases: ["pernille-corydon", "maanesten"],
    caseLabels: ["Pernille Corydon", "Maanesten"],
  },
  {
    id: "china-cloud",
    icon: Cpu,
    name: "中国云基础设施 + 数据本地化",
    nameEn: "China Cloud Infrastructure + Data Localization",
    pitch: "AWS China? 阿里云? 腾讯云? 华为云? 香港桥接? 我能部署到任何中国云——你的数据留在境内，模型推理在境内，PIPL + 数据安全法 + 网络安全法三重合规。",
    pain: "中国《个人信息保护法》(PIPL)、《数据安全法》(DSL)、《网络安全法》(CSL) 三法合规是 AI 落地的硬门槛。跨境数据传输需经国家网信办审批（耗时数月）。同时，越来越多中国客户要求使用国产 AI 模型（通义千问、文心一言、豆包、DeepSeek）而非海外模型——尤其涉及敏感客户数据时。如果你的 AI 系统架构师不熟悉这套合规框架，你的项目在签约前就被法务卡死。",
    solution: "我提供全栈中国云部署方案，覆盖所有主流选项：（1）AWS 中国（北京/宁夏区，由光环新网/西云数据运营）；（2）阿里云（杭州/上海/北京区，国内最大覆盖）；（3）腾讯云（深圳/上海/北京区，与微信生态深度集成）；（4）华为云（贵安/北京/上海区，国企客户首选）；（5）百度智能云（北京/广州区，文心一言原生支持）；（6）香港桥接方案（AWS/Azure 香港区作跨境桥梁，平衡合规与全球连通）；（7）多云冗余架构（关键业务双云部署，避免供应商锁定）。所有客户数据严格部署在中国境内，仅匿名化模式数据回流哥本哈根控制中心用于跨客户模式学习。AI 模型层支持国际（Claude/GPT）+ 国产（通义千问/文心一言/豆包/DeepSeek）双栈，客户按合规需求选择。",
    results: [
      "珠韵珠宝：阿里云上海区 100% PIPL 合规部署",
      "数据本地化覆盖：7 大云厂商 + 多云冗余架构",
      "AI 模型双栈：国际模型 + 国产模型（客户可选）",
      "跨境数据：仅匿名化模式数据回流（PIPL 第 38 条合规）",
    ],
    cases: ["zhuyun-nansha"],
    caseLabels: ["珠韵珠宝"],
  },
];

export default function SolutionsPage() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">[ 9 类 AI 工作队 · 珠宝行业专属 ]</div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            不是通用 AI。<br />
            <span className="stat-highlight">是珠宝品牌专属 AI。</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed">
            每一支工作队都针对珠宝行业的真实痛点——防伪、定制、客户管理、设计、来源、库存、市场切入、合规。
            下方是 9 类工作队，每一类都已在一个或多个珠宝品牌的生产环境部署过（含中国广州珠韵珠宝）。
          </p>
        </div>
      </section>

      {/* SOLUTIONS LIST */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-7xl space-y-16">
          {solutions.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={s.id} id={s.id} className="scroll-mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5">
                    <div className="sticky top-20">
                      <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">
                        [ SOLUTION {String(idx + 1).padStart(2, '0')} / 09 ]
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-12 w-12 rounded-xl border border-bhai-red/30 bg-bhai-red/5 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-bhai-red" />
                        </div>
                        <div>
                          <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            {s.name}
                          </h2>
                          <div className="font-mono text-[10px] text-bhai-muted tracking-widest mt-1">{s.nameEn}</div>
                        </div>
                      </div>
                      <p className="text-base text-foreground leading-relaxed font-medium mb-4">
                        {s.pitch}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {s.caseLabels.map((label, i) => (
                          <Link
                            key={i}
                            href={`/cases/${s.cases[i]}`}
                            className="rounded border border-[#2A2A2A] bg-bhai-card px-2.5 py-1 text-[11px] text-bhai-muted hover:border-bhai-red hover:text-bhai-red transition-colors"
                          >
                            {label} 案例详情 →
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-6">
                    <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
                      <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-3">[ 痛点 ]</div>
                      <p className="text-sm text-bhai-muted leading-relaxed">{s.pain}</p>
                    </div>
                    <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-6">
                      <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">[ BHAI 解决方案 ]</div>
                      <p className="text-sm text-foreground leading-relaxed">{s.solution}</p>
                    </div>
                    <div className="rounded-xl border border-[#2A2A2A] bg-bhai-bg p-6">
                      <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-4">[ 量化结果 ]</div>
                      <ul className="space-y-3">
                        {s.results.map((r, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="font-mono text-xs text-bhai-red mt-1">→</span>
                            <span className="text-sm text-foreground leading-relaxed">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {idx < solutions.length - 1 && (
                  <div className="glow-line mt-16" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT FITS TOGETHER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 如何组合 ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            一支工作队 = 一个明确痛点<br />
            <span className="text-bhai-muted">多个工作队 = 一支 AI 工作力</span>
          </h2>
          <p className="text-base text-bhai-muted leading-relaxed mb-12">
            我不会卖给你 9 个工作队。我会听你 20 分钟，然后告诉你哪 2-3 个能解决你 80% 的问题。
            其余的等 ROI 数字说话后再说。这是我的方式——不浪费你的钱，也不浪费我的时间。
          </p>

          <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="font-sans text-3xl font-bold stat-highlight mb-2">14 天</div>
                <div className="text-xs text-bhai-muted">首个代理上线</div>
              </div>
              <div>
                <div className="font-sans text-3xl font-bold stat-highlight mb-2">14 周</div>
                <div className="text-xs text-bhai-muted">完整工作队生产</div>
              </div>
              <div>
                <div className="font-sans text-3xl font-bold stat-highlight mb-2">100%</div>
                <div className="text-xs text-bhai-muted">审计链覆盖</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="你的品牌需要哪 2-3 个工作队？"
        subtitle="20 分钟。我听你讲你的瓶颈，然后告诉你应该先部署哪个工作队——以及为什么。如果都不合适，我会直接说。"
        primaryLabel="预约 20 分钟 →"
        secondaryLabel="先看 BHAI 方法"
        secondaryHref="/method"
      />
    </PageShell>
  );
}
