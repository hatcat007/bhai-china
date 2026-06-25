import Link from "next/link";
import { PageShell } from "@/components/bhai/PageShell";
import { CTASection } from "@/components/bhai/CTASection";
import { jewelryCases } from "@/lib/data/jewelry-cases";
import { ArrowRight, ShieldCheck, Cpu, Gauge, Sparkles, Diamond, TrendingUp, AlertTriangle, Wrench, Eye, CheckCircle2, XCircle } from "lucide-react";

export default function Home() {
  const featuredCases = [
    ...jewelryCases.filter((c) => c.slug === "zhuyun-nansha"),
    ...jewelryCases.filter((c) => c.slug !== "zhuyun-nansha").slice(0, 5),
  ];

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-section pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-bhai-red/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          {/* Ticker */}
          <div className="ticker-wrap mb-12 border-y border-[#1A1A1A] py-3">
            <div className="ticker">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex items-center gap-8 px-4 shrink-0">
                  {["PANDORA", "GEORG JENSEN", "OLE LYNGGAARD", "SHAMBALLA", "JANE KØNIG", "TROLLBEADS", "SOPHIE BILLE BRAHE", "MAANESTEN", "MARIA BLACK", "PILGRIM", "ENAMEL CPH", "HARTMANN'S", "AURUM", "PERNILLE CORYDON", "CHARLOTTE LARSEN", "珠韵珠宝 NANSHA"].map((brand) => (
                    <span key={brand + dup} className="font-mono text-xs text-bhai-dim tracking-widest whitespace-nowrap">
                      {brand} <span className="text-bhai-red mx-2">/</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-bhai-red/30 bg-bhai-red/5 px-4 py-1.5 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-bhai-red animate-pulse" />
                <span className="font-mono text-[11px] tracking-widest text-bhai-red">16 家珠宝品牌案例 · 14 周落地 · 丹麦验证 → 中国部署</span>
              </div>

              <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
                丹麦验证的 AI 方法。<br />
                <span className="stat-highlight">现在转移给中国珠宝 CEO。</span>
              </h1>

              <p className="text-base sm:text-lg text-bhai-muted mb-6 max-w-2xl leading-relaxed">
                我是 <span className="text-foreground font-medium">Buster Larsen（中文名：陆博明）</span>——
                丹麦 AI 系统架构师。我在丹麦帮 <span className="text-foreground font-medium">潘多拉、乔治·杰生、Ole Lynggaard、Sophie Bille Brahe</span> 等 15 家欧洲顶级珠宝品牌部署了生产环境 AI 工作队。
                现在我把这套经过欧盟验证的方法带到中国——包括广州珠韵珠宝的 OEM 转自主品牌案例。
              </p>

              <p className="text-sm text-bhai-dim mb-8 max-w-2xl leading-relaxed">
                我不教中国 CEO 怎么做珠宝——中国珠宝有 5000 年历史。
                我是 AI 专家，把丹麦验证过的系统转移给你。
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <Link
                  href="/book"
                  className="cta-primary rounded-md px-7 py-3.5 text-base font-medium text-white inline-flex items-center gap-2"
                >
                  预约 20 分钟（免费） <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/cases"
                  className="rounded-md border border-[#333] bg-transparent px-7 py-3.5 text-base font-medium text-foreground hover:border-bhai-red hover:bg-[#0F0F0F] transition-colors"
                >
                  看 16 个案例
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-bhai-muted">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-bhai-red" /> GDPR 合规</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-bhai-red" /> EU AI Act 就绪</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-bhai-red" /> 中国 PIPL 合规</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-bhai-red" /> 数据本地化</span>
                <span className="text-bhai-dim">NO PITCH · NO COMMITMENTS · 20 MINUTES</span>
              </div>
            </div>

            {/* Stats panel */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-6 red-glow">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-bhai-muted tracking-widest">[ BHAI // LIVE METRICS ]</span>
                  <span className="h-2 w-2 rounded-full bg-bhai-red animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <StatCard value="16" label="珠宝品牌案例（15 丹麦 + 1 中国）" />
                  <StatCard value="14 天" label="首个 AI 代理上线" />
                  <StatCard value="1000+" label="工具集成" />
                  <StatCard value="66%" label="平均 AI 成本下降" />
                  <StatCard value="1.8 亿¥" label="珠韵珠宝首年营收" />
                  <StatCard value="0" label="PPT 演示 · 全部生产环境" />
                </div>
                <div className="mt-6 pt-6 border-t border-[#2A2A2A]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-bhai-muted">CONTROL CENTER STATUS</span>
                    <span className="font-mono text-bhai-red">● OPERATIONAL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-14">
            <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 01 / 你正面对的中国现实 ]</div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              潘多拉在中国从 <span className="stat-highlight">9%</span> 跌到 <span className="stat-highlight">1%</span>。<br />
              你的品牌是下一个吗？
            </h2>
            <p className="text-base sm:text-lg text-bhai-muted leading-relaxed">
              5 年时间，全球最大珠宝品牌的中国份额蒸发 89%。2024 年第三季度，中国营收同比下滑 33%。董事会把关店计划翻倍到 100 家。
              这不是市场不买账——这是品牌还在用 2019 年的剧本打 2026 年的仗。AI 在中国不是『要不要做』，是『再不做就死』。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProblemCard
              icon={<AlertTriangle className="h-5 w-5" />}
              num="01"
              title="中国市场份额蒸发"
              desc="潘多拉中国份额从 9% 跌到 1%。Georg Jensen、Ole Lynggaard、Sophie Bille Brahe 都在错失中国 Gen-Z 静奢浪潮。你的品牌呢？"
              stat="−89%"
              statLabel="5 年份额蒸发"
            />
            <ProblemCard
              icon={<Eye className="h-5 w-5" />}
              num="02"
              title="假货淹没品牌价值"
              desc="潘多拉是中国被仿冒最严重的珠宝品牌。Shamballa 手链假货充斥淘宝/抖音/拼多多。Trollbeads 玻璃珠二级市场伪造横行。你的鉴定师加班也追不上 AI 生成的假货图。"
              stat="月均 1,840+"
              statLabel="单品牌自动下架（BHAI 部署后）"
            />
            <ProblemCard
              icon={<Wrench className="h-5 w-5" />}
              num="03"
              title="创始人成为瓶颈"
              desc="Jane Kønig 每年亲手设计 120 件。Charlotte Larsen 一年接 30 件定制委托，被迫拒掉 200+。Ole Lynggaard 40 个金匠卡住 275 家门店。创始人 DNA 在限制你的增长。"
              stat="8 → 1.5h"
              statLabel="单件设计时间（BHAI 部署后）"
            />
          </div>
        </div>
      </section>

      {/* 14-DAY GUARANTEE BANNER — placed prominently after problem */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-bhai-red/40 bg-bhai-red/5 p-6 red-glow">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-bhai-red/20 border border-bhai-red flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6 text-bhai-red" />
              </div>
              <div className="flex-1">
                <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1">[ BHAI 14 天保证 ]</div>
                <h2 className="font-sans text-lg sm:text-xl font-bold text-foreground leading-tight">
                  首个 AI 代理在 14 天内上线跑生产。否则我继续工作，不收额外费用，直到它上线。
                </h2>
              </div>
              <Link
                href="/pricing"
                className="cta-primary rounded-md px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap"
              >
                看透明定价 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BHAI 3-LAYER METHOD — beats Hourglass */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-14">
            <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 02 / BHAI 3 层方法 ]</div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              不是 3 步流程。<br />
              <span className="stat-highlight">是 3 层架构。</span>
            </h2>
            <p className="text-base sm:text-lg text-bhai-muted leading-relaxed">
              其他 AI 咨询公司卖你 3 步流程（评估 → 设计 → 部署）——这是线性的，部署完就结束。
              BHAI 方法是 3 层架构：底层 Design Memory 永远在学，中层 Bench Automation 永远在跑，
              顶层 Clienteling Agents 永远在跟你客户对话。3 层同时工作，永久在环。
            </p>
          </div>

          <div className="space-y-6">
            {/* Layer 1 — Design Memory */}
            <LayerCard
              layer="LAYER 01"
              name="Design Memory"
              nameZh="设计记忆层"
              tagline="底层 · 永远在学习你的品牌 DNA"
              desc="我把你的品牌语调、设计档案、决策规则、组织结构、客户历史编码成 AI 能消费的结构化上下文。这是其他公司跳过的步骤——没有这一层，AI 代理只是昂贵的自动补全。丹麦验证过：Jane Kønig 的 1,400 件档案 + 草图，6 周内训练成可用 DNA。"
              details={[
                "品牌语调包（14 天微信消息日志逆向工程）",
                "设计 DNA 编码（档案 + 草图 + 工匠笔记）",
                "决策规则文档（100+ 规则可版本化）",
                "组织结构 + 预算边界 + 升级策略",
              ]}
            />

            {/* Layer 2 — Bench Automation */}
            <LayerCard
              layer="LAYER 02"
              name="Bench Automation"
              nameZh="工坊自动化层"
              tagline="中层 · 永远在跑你的工作流"
              desc="基于 Design Memory，我部署工作流自动化：需求预测、动态定价、库存优化、防伪鉴真、PIPL 合规监控。这些代理不需要每次都跟客户对话——它们在后台 24/7 跑。丹麦验证过：Pandora 防伪代理月均自动下架 1,840+ 件假货。"
              details={[
                "AI 防伪鉴真（淘宝/抖音/拼多多/微信代销监控）",
                "需求预测 + 动态定价（90 天 SKU 级 87% 准确率）",
                "中国云基础设施（7 大云厂商 + 多云冗余）",
                "PIPL + GDPR + EU AI Act 三重合规审计",
              ]}
            />

            {/* Layer 3 — Clienteling Agents */}
            <LayerCard
              layer="LAYER 03"
              name="Clienteling Agents"
              nameZh="客户互动层"
              tagline="顶层 · 永远在跟你客户对话"
              desc="最上层是直接跟客户对话的代理：微信 VIP 礼宾、小红书编辑、抖音直播辅助、AR 试戴、定制共创。每个代理在 Bench Automation 提供的边界内自主运行——人在环里签字关键决策。丹麦验证过：Sophie Bille Brahe 6 个月做到 €1.8M 中国营收，47,200 小红书粉丝。"
              details={[
                "普通话 VIP 礼宾（24/7 微信客户管理）",
                "小红书 + 抖音内容代理（品牌语调翻译）",
                "AR 试戴网络（94% 色彩还原）",
                "高定共创代理（创始人 DNA 约束生成）",
              ]}
            />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/method"
              className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover group"
            >
              <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-2">[ 深入了解 ]</div>
              <div className="text-base font-bold text-foreground group-hover:text-bhai-red transition-colors">
                看 3 层方法的完整 14 周部署时间线 →
              </div>
            </Link>
            <Link
              href="/ai-roadmap"
              className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-6 card-hover group"
            >
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">[ 个性化推荐 ]</div>
              <div className="text-base font-bold text-foreground group-hover:text-bhai-red transition-colors">
                5 分钟生成你的 AI 路线图（免费） →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED CASES */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 03 / 16 个真实案例 · 15 丹麦 + 1 中国 ]</div>
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
                我帮丹麦顶级珠宝品牌 + 中国珠韵珠宝做了什么
              </h2>
              <p className="text-base text-bhai-muted leading-relaxed">
                16 个真实案例——15 个丹麦 + 1 个中国广州南沙。每一个都是 14 周内的生产环境部署，不是 PPT。
                点击查看每个品牌的完整挑战、AI 工作队配置、量化结果与时间线。
              </p>
            </div>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-sm text-bhai-red hover:text-bhai-red-hover font-medium whitespace-nowrap"
            >
              看全部 16 个案例 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredCases.map((c) => (
              <CasePreviewCard key={c.slug} caseItem={c} />
            ))}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR / NOT FOR */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-12">
            <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 04 / 适配判定 ]</div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              我能帮你的前提
            </h2>
            <p className="text-base text-bhai-muted leading-relaxed">
              我只接能真正交付可衡量 ROI 的项目。如果你的情况不在这两个清单里，我会直接告诉你——不浪费你 20 分钟。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-bhai-red/30 bg-bhai-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="h-5 w-5 text-bhai-red" />
                <h3 className="text-xl font-bold text-foreground">这是为你准备的</h3>
              </div>
              <ul className="space-y-4">
                <ForItem>你的珠宝品牌年营收 ≥ 5000 万人民币，中国市场份额在下滑或未启动</ForItem>
                <ForItem>你的团队用 ChatGPT/Copilot/各种 AI 工具，但没人追踪成本或效果</ForItem>
                <ForItem>你的品牌在淘宝/抖音/小红书有假货问题，团队加班也追不上</ForItem>
                <ForItem>你的设计师/金匠成为瓶颈，无法在不稀释品牌 DNA 的情况下增长</ForItem>
                <ForItem>你想进中国或重返中国，但不想重蹈潘多拉的覆辙</ForItem>
                <ForItem>你的董事会要可衡量的 ROI 和合规审计链，不是更多 PPT</ForItem>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-bg/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="h-5 w-5 text-bhai-dim" />
                <h3 className="text-xl font-bold text-bhai-muted">这不是为你准备的</h3>
              </div>
              <ul className="space-y-4">
                <NotItem>你在找一个 ChatGPT 套壳或一次性 AI 咨询报告</NotItem>
                <NotItem>你想要没有人类监督、没有审计链的 AI 自主运行</NotItem>
                <NotItem>你不愿把业务规则、品牌语调、决策边界文档化</NotItem>
                <NotItem>你期待 AI 零输入完美运行，不愿投入审核时间</NotItem>
                <NotItem>你的品牌年营收低于 5000 万人民币，团队少于 10 人</NotItem>
                <NotItem>你的董事会只想听 AI 故事，不想看 ROI 数字</NotItem>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS PREVIEW */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-12">
            <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 05 / 珠宝行业 AI 解决方案 ]</div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              我为珠宝品牌部署的 9 类 AI 工作队
            </h2>
            <p className="text-base text-bhai-muted leading-relaxed">
              不是通用 AI。每一支工作队都针对珠宝行业的真实痛点——防伪、定制、客户管理、设计、来源、库存、市场切入、合规、中国云基础设施。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SolutionPreviewCard icon={<Eye className="h-5 w-5" />} title="AI 防伪鉴真" desc="图像识别监控淘宝/抖音/拼多多/微信代销，自动下架假货。" caseCount="3 案例" />
            <SolutionPreviewCard icon={<Sparkles className="h-5 w-5" />} title="高定共创 AI" desc="在品牌 DNA 约束下生成定制设计，创始人审核。" caseCount="5 案例" />
            <SolutionPreviewCard icon={<Diamond className="h-5 w-5" />} title="普通话 VIP 礼宾" desc="24/7 微信客户管理 + 私享鉴赏预约 + 跨境物流。" caseCount="7 案例" />
            <SolutionPreviewCard icon={<TrendingUp className="h-5 w-5" />} title="需求预测 + 动态定价" desc="SKU 级 90 天需求预测 + 库存优化 + 动态定价。" caseCount="4 案例" />
            <SolutionPreviewCard icon={<Cpu className="h-5 w-5" />} title="区块链来源" desc="为每件作品铸造可验证来源证书，反漂绿。" caseCount="3 案例" />
            <SolutionPreviewCard icon={<ShieldCheck className="h-5 w-5" />} title="中国切入手册" desc="市场优先级 AI + KOL 匹配 + Xiaohongshu 编辑代理。" caseCount="6 案例" />
            <SolutionPreviewCard icon={<Gauge className="h-5 w-5" />} title="AR 试戴网络" desc="扫二维码在手机上 3D 试戴，94% 色彩还原。" caseCount="2 案例" />
            <SolutionPreviewCard icon={<Wrench className="h-5 w-5" />} title="困境品牌 AI" desc="清仓定价 + 档案估值 + 收购尽调，中国整合者视角。" caseCount="2 案例" />
            <SolutionPreviewCard icon={<Cpu className="h-5 w-5" />} title="中国云基础设施" desc="AWS China / 阿里云 / 腾讯云 / 华为云 / 香港桥接，PIPL 合规。" caseCount="1 案例" />
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 text-sm text-bhai-red hover:text-bhai-red-hover font-medium"
            >
              看每个解决方案的完整说明 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* VOICE / BUSTER QUOTE */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-6">[ 06 / 我的态度 ]</div>
          <blockquote className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight mb-8">
            &ldquo;88% 的公司在用 AI。<br />
            大多数卡在 PPT 阶段。<br />
            <span className="stat-highlight">我在丹麦证明了方法。现在转移给你。</span>&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-bhai-red">
              { }
              <img
                src="/buster-photo-1-thumb.webp"
                alt="陆博明 / Buster ML Larsen — Better Human AI 创始人"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-left">
              <div className="text-foreground font-medium">陆博明 / Buster ML Larsen</div>
              <div className="text-bhai-muted text-xs">丹麦 AI 系统架构师 · 现转移方法到中国</div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW + AI ROADMAP CTA — competitive advantage over Hourglass */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-12">
            <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 07 / 透明定价 + 免费路线图 ]</div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              96% 的 AI 咨询公司<br />
              <span className="stat-highlight">第一次通话才告诉你价格。</span>
            </h2>
            <p className="text-base text-bhai-muted leading-relaxed">
              我把价格列在网上。¥15K 入门 AI 审计。¥40K 起完整 AI 构建。¥20K/月 托管。
              14 天首个代理上线保证——否则我继续工作，不收额外费用。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pricing card */}
            <Link
              href="/pricing"
              className="group rounded-2xl border border-[#2A2A2A] bg-bhai-card p-8 card-hover"
            >
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">[ 透明定价 ]</div>
              <h3 className="font-sans text-2xl font-bold text-foreground mb-4">3 个产品 · 任选组合</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-baseline justify-between pb-2 border-b border-[#2A2A2A]">
                  <span className="text-sm text-bhai-muted">AI 审计（入门）</span>
                  <span className="font-mono text-sm text-foreground">¥15K - 50K</span>
                </div>
                <div className="flex items-baseline justify-between pb-2 border-b border-[#2A2A2A]">
                  <span className="text-sm text-bhai-muted">AI 构建（主力）</span>
                  <span className="font-mono text-sm text-foreground">¥40K - 150K</span>
                </div>
                <div className="flex items-baseline justify-between pb-2 border-b border-[#2A2A2A]">
                  <span className="text-sm text-bhai-muted">AI 托管（长期）</span>
                  <span className="font-mono text-sm text-foreground">¥20K/月起</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-bhai-red font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  看完整定价 + 14 天保证 <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>

            {/* AI Roadmap card */}
            <Link
              href="/ai-roadmap"
              className="group rounded-2xl border-2 border-bhai-red bg-bhai-red/5 p-8 card-hover red-glow"
            >
              <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-3">[ 免费 · 5 分钟 ]</div>
              <h3 className="font-sans text-2xl font-bold text-foreground mb-4">生成你的 AI 路线图</h3>
              <p className="text-sm text-bhai-muted leading-relaxed mb-6">
                回答 5 个问题，我用 BHAI 方法（丹麦 15 案例 + 中国珠韵验证）生成你的个性化 AI 路线图预览——
                具体到第一个该上哪个代理、14 天后能看到什么数字、30 天 ROI 预测。
              </p>
              <div className="space-y-2 mb-6">
                {["品牌名", "年营收区间", "品牌阶段", "最痛的痛点", "中国业务现状"].map((q, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-bhai-red w-6">Q{i + 1}</span>
                    <span className="text-bhai-text">{q}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-bhai-red font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  开始 5 分钟生成路线图 <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <CTASection />
    </PageShell>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-[#2A2A2A] bg-bhai-bg p-4">
      <div className="font-sans text-2xl sm:text-3xl font-bold text-foreground mb-1">{value}</div>
      <div className="text-[11px] font-mono text-bhai-muted leading-tight">{label}</div>
    </div>
  );
}

function ProblemCard({
  icon, num, title, desc, stat, statLabel,
}: { icon: React.ReactNode; num: string; title: string; desc: string; stat: string; statLabel: string }) {
  return (
    <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover">
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[10px] text-bhai-muted tracking-widest">{num}</span>
        <span className="text-bhai-red">{icon}</span>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-3">{title}</h3>
      <p className="text-sm text-bhai-muted leading-relaxed mb-5">{desc}</p>
      <div className="pt-4 border-t border-[#2A2A2A]">
        <div className="font-sans text-2xl font-bold stat-highlight">{stat}</div>
        <div className="text-[11px] font-mono text-bhai-dim mt-1">{statLabel}</div>
      </div>
    </div>
  );
}

function LayerCard({
  layer, name, nameZh, tagline, desc, details,
}: { layer: string; name: string; nameZh: string; tagline: string; desc: string; details: string[] }) {
  return (
    <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-4">
          <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">{layer}</div>
          <h3 className="font-sans text-2xl font-bold text-foreground mb-1">{name}</h3>
          <div className="text-sm text-bhai-muted mb-3">{nameZh}</div>
          <div className="inline-block rounded-full border border-bhai-red/30 bg-bhai-red/5 px-3 py-1 text-[11px] font-mono text-bhai-red tracking-widest">
            {tagline}
          </div>
        </div>
        <div className="md:col-span-5">
          <p className="text-sm text-bhai-muted leading-relaxed">{desc}</p>
        </div>
        <div className="md:col-span-3">
          <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-3">[ 包含组件 ]</div>
          <ul className="space-y-1.5">
            {details.map((d, i) => (
              <li key={i} className="text-xs text-bhai-text flex items-start gap-1.5">
                <span className="text-bhai-red mt-0.5">→</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function CasePreviewCard({ caseItem }: { caseItem: typeof jewelryCases[number] }) {
  return (
    <Link
      href={`/cases/${caseItem.slug}`}
      className="group rounded-xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] text-bhai-muted tracking-widest">{caseItem.founded.split(' ')[0]} 起</span>
        <span className="font-mono text-[10px] text-bhai-red tracking-widest">CASE STUDY</span>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-bhai-red transition-colors">
        {caseItem.brandNameZh}
      </h3>
      <div className="text-xs text-bhai-muted mb-4">{caseItem.segment}</div>
      <p className="text-sm text-bhai-muted leading-relaxed mb-5 flex-1 line-clamp-3">
        {caseItem.heroQuoteZh}
      </p>
      <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between">
        <span className="text-[11px] font-mono text-bhai-dim">{caseItem.results[0].after}</span>
        <span className="text-bhai-red text-sm group-hover:translate-x-1 transition-transform">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

function SolutionPreviewCard({ icon, title, desc, caseCount }: { icon: React.ReactNode; title: string; desc: string; caseCount: string }) {
  return (
    <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-5 card-hover">
      <div className="flex items-center justify-between mb-3">
        <span className="text-bhai-red">{icon}</span>
        <span className="font-mono text-[10px] text-bhai-dim tracking-widest">{caseCount}</span>
      </div>
      <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
      <p className="text-xs text-bhai-muted leading-relaxed">{desc}</p>
    </div>
  );
}

function ForItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
      <span className="text-sm text-bhai-text leading-relaxed">{children}</span>
    </li>
  );
}

function NotItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <XCircle className="h-4 w-4 text-bhai-dim mt-0.5 shrink-0" />
      <span className="text-sm text-bhai-dim leading-relaxed">{children}</span>
    </li>
  );
}
