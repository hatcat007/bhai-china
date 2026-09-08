import Link from "next/link";
import { PageShell } from "@/components/bhai/PageShell";
import { Reveal } from "@/components/bhai/Reveal";
import { CTASection } from "@/components/bhai/CTASection";
import { HomeHero } from "@/components/bhai/HomeHero";
import { ToolsTeaser } from "@/components/bhai/ToolsTeaser";
import { jewelryCases } from "@/lib/data/jewelry-cases";
import { ArrowRight, ShieldCheck, Cpu, Gauge, Sparkles, Diamond, TrendingUp, AlertTriangle, Wrench, Eye, CheckCircle2, XCircle } from "lucide-react";

/**
 * 首页（server）
 * - i18n Round D-1：Hero 区委托 HomeHero（client，双语）；其余 section 中文，Round D-2 渐进翻译
 */

export default function Home() {
  const featuredCases = [
    ...jewelryCases.filter((c) => c.slug === "zhuyun-nansha"),
    ...jewelryCases.filter((c) => c.slug !== "zhuyun-nansha").slice(0, 5),
  ];

  return (
    <PageShell>
      {/* HERO — i18n Round D-1：双语 hero（client） */}
      <HomeHero />

      {/* THE PROBLEM */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <Reveal>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-14">
            <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 01 / 一个值得研究的样本 ]</div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              潘多拉在中国失去了 <span className="stat-highlight">89%</span> 的份额。<br />
              这不是中国消费者不买珠宝了。
            </h2>
            <p className="text-base sm:text-lg text-bhai-muted leading-relaxed">
              而是他们在用 2019 年的剧本打 2026 年的仗。很多欧洲品牌进入中国时，都低估了本地数字生态的复杂性——这不是谁的错，跨境做生意的复杂度本来就是真实的。
              2024 年第三季度他们中国营收同比下滑 33%，董事会把关店计划翻倍到 100 家。我把这些数字摆出来不是为了吓你，是因为这个样本值得逐帧研究。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProblemCard
              icon={<AlertTriangle className="h-5 w-5" />}
              num="01"
              title="高端品牌的数字生态脱节"
              desc="潘多拉中国份额从 9% 到 1% 的那几年，中国消费者的购物动线搬进了微信、小红书和直播间，而品牌的运营节奏还留在门店时代。我看过他们当时的数字工具清单——和我们部署时的差距，比我预想的大。"
              stat="−89%"
              statLabel="5 年份额变化（公开财报口径）"
            />
            <ProblemCard
              icon={<Eye className="h-5 w-5" />}
              num="02"
              title="假货不是新鲜事，速度才是"
              desc="潘多拉是中国被仿冒最多的珠宝品牌之一，Shamballa、Trollbeads 的假货散落在淘宝/抖音/拼多多。值得说的不是假货存在——而是 AI 生成的假货图让下架速度第一次变成可量化的工程问题。"
              stat="月均 1,840 件"
              statLabel="防伪代理自动下架（部署后第 3 个月起）"
            />
            <ProblemCard
              icon={<Wrench className="h-5 w-5" />}
              num="03"
              title="创始人产能的结构性上限"
              desc="Jane Kønig 每年亲手画约 120 件，Charlotte Larsen 一年接 30 件定制、婉拒 200+。这不是创始人不够努力——是一人工坊的产能结构几十年没变过。AI 能放大它而不稀释它吗？这正是我在丹麦反复验证的问题。"
              stat="8 → 1.5h"
              statLabel="单件草图耗时（含 20 分钟人工打磨）"
            />
          </div>
        </div>
        </Reveal>
      </section>

      {/* 14-DAY GUARANTEE BANNER — placed prominently after problem */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 gradient-section">
        <Reveal>
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-bhai-red/40 bg-bhai-red/5 p-6 red-glow">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-bhai-red/20 border border-bhai-red flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6 text-bhai-red" />
              </div>
              <div className="flex-1">
                <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1">[ BHAI 14 天保证 ]</div>
                <h2 className="font-sans text-lg sm:text-xl font-bold text-foreground leading-tight">
                  首个 AI 代理 14 天内上线跑生产。没做到我继续干，不加钱——最快的一个项目 11 天，最慢的一次 19 天（卡在客户的数据导出审批）。
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
        </Reveal>
      </section>

      {/* BHAI 3-LAYER METHOD — beats Hourglass */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <Reveal>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-14">
            <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 02 / BHAI 3 层方法 ]</div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              不是 3 步流程。<br />
              <span className="stat-highlight">是 3 层架构。</span>
            </h2>
            <p className="text-base sm:text-lg text-bhai-muted leading-relaxed">
              这套架构不是我想出来的，是被 16 个项目磨出来的。常见的 3 步流程（评估 → 设计 → 部署）做完就结束，而珠宝品牌的判断是每天发生的。
              所以我的方法是 3 层：底层的品牌数字基因库一直在学，中间的工作台自动化一直在跑，顶层的客户代理一直在跟你客户对话。3 层同时工作，缺一层都不成立。
            </p>
          </div>

          <div className="space-y-6">
            {/* Layer 1 — Design Memory */}
            <LayerCard
              layer="LAYER 01"
              name="Brand Digital DNA Vault"
              nameZh="品牌数字基因库"
              tagline="底层 · 一直在学你的品牌"
              desc="如果 AI 不知道 Jane Kønig 为什么坚持用某种特定的金工倒角，它生成的设计就只是廉价的模仿。我的第一步，是把你的品牌『潜意识』写进 AI 的基因里——语调、决策规则、工艺偏好、客户历史，全部编码成 AI 能消费的结构化上下文。这一步枯燥、贵、没人在社媒上晒，但跳过它，后面全是返工。丹麦那边 Jane Kønig 的 1,400 件档案 + 草图，用了 6 周才训成可用的基因库。"
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
              nameZh="工作台自动化层"
              tagline="中层 · 一直在跑你的日常判断"
              desc="Bench Automation——说白了，就是把买手、定价、库存这些每天重复的判断交给 AI 先做一遍，人只做最后拍板。这些代理不需要跟客户对话，它们在后台 24/7 跑：需求预测、动态定价、库存优化、防伪鉴真、PIPL 合规监控。潘多拉试点的防伪代理月均自动下架 1,840+ 件假货——但前两周的误报率高到我根本不敢开自动档，这是实话。"
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
              nameZh="客户代理层"
              tagline="顶层 · 一直在跟你客户对话"
              desc="Clienteling Agents——训练过你品牌说话方式的私域客服团队，客户感觉不到对面是 AI。微信 VIP 礼宾、小红书编辑、抖音直播辅助、AR 试戴都在这一层。每个代理在工作台自动化划定的边界内运行，涉及钱和承诺的决策永远有人签字。丹麦那边 Sophie Bille Brahe 用这一层 6 个月做到 €1.8M 中国营收——前提是 Sophie 本人批准了每一个 KOL。"
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
        </Reveal>
      </section>

      {/* FEATURED CASES */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <Reveal>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 03 / 16 个真实案例 · 15 丹麦 + 1 中国 ]</div>
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
                16 个案例里，我具体做了什么
              </h2>
              <p className="text-base text-bhai-muted leading-relaxed">
                16 个真实案例——15 个丹麦品牌 + 1 个中国广州南沙。我在每个项目里的角色不一样：有的做完整部署，有的只做 6 周审计，有的只是外部架构顾问。
                每个案例页里我都写清楚了三件事：『我的角色』、『它是怎么跑起来的』、『哪里出了问题』。看完还觉得可信，再预约也不迟。
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
        </Reveal>
      </section>

      {/* WHO THIS IS FOR / NOT FOR */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section">
        <Reveal>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-12">
            <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 04 / 适配判定 ]</div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              我能帮你的前提
            </h2>
            <p className="text-base text-bhai-muted leading-relaxed">
              过去五年我犯过不少错，最贵的一次是同时给一个品牌上了 6 个代理而不是先上 1 个——那是在浪费客户的钱。所以我只接能真正交付可衡量 ROI 的项目。你的情况如果不在这两个清单里，我会直接告诉你，不浪费你 20 分钟。
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
                <ForItem>你想进中国或重返中国，想先弄清楚潘多拉那几年到底哪里走偏了</ForItem>
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
        </Reveal>
      </section>

      {/* SOLUTIONS PREVIEW */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <Reveal>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-12">
            <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 05 / 珠宝行业 AI 解决方案 ]</div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              我为珠宝品牌部署的 9 类 AI 工作队
            </h2>
            <p className="text-base text-bhai-muted leading-relaxed">
              不是通用 AI。每一支工作队都对准珠宝行业的具体环节——防伪、定制、客户管理、设计、来源、库存、市场切入、合规、中国云基础设施。名字听起来抽象，每个案例页里我都写了它们实际怎么跑。
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
        </Reveal>
      </section>

      {/* VOICE / BUSTER QUOTE */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <Reveal>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-6">[ 06 / 我的态度 ]</div>
          <blockquote className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight mb-8">
            &ldquo;88% 的公司在用 AI，<br />
            大多数卡在 PPT 阶段。<br />
            <span className="stat-highlight">我踩过的坑，跟做成的系统一样多。两样都原样讲给你。</span>&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-bhai-red">
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
            {/* BHAI steering wheel brand mark */}
            <div className="ml-4 pl-4 border-l border-[#2A2A2A]">
              <img
                src="/bhai-mark-80.png"
                alt="BHAI 舵轮 — Buster ved roret"
                className="h-10 w-10 object-contain opacity-80"
              />
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* PRICING PREVIEW + AI ROADMAP CTA — competitive advantage over Hourglass */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 gradient-section">
        <Reveal>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-12">
            <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 07 / 透明定价 + 免费路线图 ]</div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              价格直接写在网上。<br />
              <span className="stat-highlight">第一次通话之前，你就知道报价。</span>
            </h2>
            <p className="text-base text-bhai-muted leading-relaxed">
              ¥15K 起 AI 审计。¥40K 起完整构建。¥20K/月起托管——具体区间就在下面，也在定价页。
              14 天首个代理上线，没做到我继续干、不加钱。这种话写在网上，比在电话里说更有约束力。
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
                回答 5 个问题，我按 BHAI 方法（丹麦 15 个案例 + 珠韵的适配经验）生成你的个性化 AI 路线图预览——
                具体到第一个该上哪个代理、14 天后该看什么数字、30 天 ROI 的保守估计。生成约 20 秒，是预览，不是承诺。
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
        </Reveal>
      </section>

      {/* FREE AI TOOLS TEASER（Task 7-c 交付，直接置于最终 CTA 之前） */}
      <ToolsTeaser />

      {/* FINAL CTA */}
      <CTASection />
    </PageShell>
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
      data-cursor="探索"
      className="group relative overflow-hidden rounded-xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover flex flex-col"
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

      {/* Hover 显数值层：暗渐变淡入 + 关键指标/我的角色上滑（Quiet Luxury） */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-4 p-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
      >
        <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1.5">[ 关键数据 ]</div>
        <div className="text-lg font-bold text-foreground leading-snug">{caseItem.results[0].after}</div>
        <div className="text-[11px] text-bhai-muted mt-0.5">{caseItem.results[0].labelZh}</div>
        {caseItem.myRole && (
          <div className="text-[11px] text-bhai-dim line-clamp-1 mt-2 pt-2 border-t border-white/10">
            <span className="text-bhai-dim/80">我的角色 · </span>{caseItem.myRole}
          </div>
        )}
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
