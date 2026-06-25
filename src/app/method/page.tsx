import Link from "next/link";
import { PageShell } from "@/components/bhai/PageShell";
import { CTASection } from "@/components/bhai/CTASection";
import { ArrowRight, Database, Cpu, ShieldCheck, FileCheck, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = {
  title: "BHAI 方法 · 3 步从上下文到生产 | Better Human AI",
  description: "BHAI 方法：构建上下文 → 部署代理 → 掌舵不撒手。14 天首个代理上线，14 周完整工作队生产，100% 审计链覆盖。",
};

export default function MethodPage() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">[ BHAI 方法 · 3 步 · 14 周 ]</div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            构建上下文。<br />
            部署代理。<br />
            <span className="stat-highlight">掌舵不撒手。</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed">
            88% 的公司在用 AI。大多数卡在 PPT 阶段。
            我的方法不为 PPT 服务——为生产服务。3 步，14 周，完整审计链。
            每一步都对应一个明确产出，每个产出都可在控制中心验证。
          </p>
        </div>
      </section>

      {/* THE 3 STEPS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* STEP 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-20">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-mono text-7xl font-bold stat-highlight">01</span>
                  <div>
                    <div className="font-mono text-[10px] text-bhai-muted tracking-widest">STEP 01 / 03</div>
                    <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">构建上下文</h2>
                    <div className="font-mono text-xs text-bhai-dim tracking-widest mt-1">BUILD THE CONTEXT</div>
                  </div>
                </div>
                <p className="text-base text-bhai-muted leading-relaxed mb-6">
                  没有 6 周上下文构建，AI 代理只是昂贵的自动补全。
                  这一步把你的品牌 DNA、决策规则、组织结构、预算边界、升级策略全部文档化——
                  不是 PowerPoint，是 AI 代理能直接消费的结构化数据。
                </p>
                <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-5">
                  <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">[ 时长 ]</div>
                  <div className="text-2xl font-bold text-foreground">6 周</div>
                  <div className="text-xs text-bhai-muted mt-1">通常 2-3 周可压缩，视品牌复杂度</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <MethodDetailCard
                icon={Database}
                title="品牌语调包"
                desc="我用 14 天逆向工程你过往的微信消息、邮件、社媒帖子、客户服务对话。输出一个 AI 代理能消费的品牌语调文档——包含词汇白名单/黑名单、句式偏好、emoji 用法、对不同客户细分的语气调整。"
                output="Brand Voice Pack v1.0 · 可被所有代理引用"
              />
              <MethodDetailCard
                icon={FileCheck}
                title="决策规则文档"
                desc="你的中国区总经理每天做的 100 个决策——折扣权限、定制接受标准、客户分级、危机升级路径。我把这些全部文档化为决策树。AI 代理在这个边界内自主执行，越界则升级人类。"
                output="Decision Rules Engine · 100+ 规则 · 可版本化"
              />
              <MethodDetailCard
                icon={ShieldCheck}
                title="组织结构 + 预算边界"
                desc="每个 AI 代理有明确经理（谁审批）、明确预算（每月最多花多少 token/工具调用）、明确边界（哪些动作可自主、哪些必须人类签字）。没有边界的 AI 是事故源。"
                output="Org & Budget Matrix · 每代理独立预算账户"
              />
              <MethodDetailCard
                icon={Cpu}
                title="集成审计"
                desc="你现有的 CRM、ERP、电商、微信小程序、天猫、小红书企业版——我审计每一个系统的 API 接入情况，输出集成路线图。1000+ 工具的集成库覆盖主流珠宝技术栈。"
                output="Integration Roadmap · 1000+ 预置连接器"
              />
            </div>
          </div>

          <div className="glow-line" />

          {/* STEP 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-20">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-mono text-7xl font-bold stat-highlight">02</span>
                  <div>
                    <div className="font-mono text-[10px] text-bhai-muted tracking-widest">STEP 02 / 03</div>
                    <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">部署代理</h2>
                    <div className="font-mono text-xs text-bhai-dim tracking-widest mt-1">DEPLOY THE AGENTS</div>
                  </div>
                </div>
                <p className="text-base text-bhai-muted leading-relaxed mb-6">
                  上下文就绪后，开始部署代理。不是一次性全部上线——先上一个能赚回自己成本的代理，验证 ROI，再上下一个。
                  14 天首个代理上线，14 周整支工作队跑生产。
                </p>
                <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-5">
                  <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">[ 时长 ]</div>
                  <div className="text-2xl font-bold text-foreground">14 天 → 14 周</div>
                  <div className="text-xs text-bhai-muted mt-1">首个代理 14 天 · 完整工作队 14 周</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-3">[ 14 天 · 首个代理 ]</div>
                <h3 className="text-lg font-bold text-foreground mb-2">先部署一个能赚回成本的代理</h3>
                <p className="text-sm text-bhai-muted leading-relaxed">
                  通常我会推荐先上 <span className="text-foreground font-medium">普通话 VIP 礼宾代理</span> 或 <span className="text-foreground font-medium">AI 防伪鉴真代理</span>——
                  两者都能在 30 天内产出可量化 ROI（响应时间从 48 小时降到 90 秒；月均 47 件假货下架升到 1,840 件）。
                  第一个代理的成功证明给我和你看：这套方法有效。
                </p>
              </div>

              <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-3">[ 14 周 · 完整工作队 ]</div>
                <h3 className="text-lg font-bold text-foreground mb-2">按优先级逐步扩展到完整工作队</h3>
                <p className="text-sm text-bhai-muted leading-relaxed mb-4">
                  每个新代理上线前都要回答两个问题：
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">这个代理解决的是不是真正的痛点（不是看起来酷）？</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">这个代理 30 天内能产出可量化 ROI 吗？</span>
                  </li>
                </ul>
                <p className="text-sm text-bhai-muted leading-relaxed mt-4">
                  答案都是 yes 才上线。这条规则让我从没部署过失败的工作队。
                </p>
              </div>

              <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
                <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-3">[ 1000+ 集成 ]</div>
                <h3 className="text-lg font-bold text-foreground mb-2">主流珠宝技术栈全部覆盖</h3>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {["Salesforce Commerce", "Shopify Plus", "微信小程序", "天猫奢品馆", "小红书企业版", "SAP ERP", "Microsoft Dynamics", "HubSpot CRM", "Zendesk", "Resend", "PostHog", "Stripe", " Klaviyo", "Mailchimp"].map((tool) => (
                    <div key={tool} className="rounded border border-[#1F1F1F] bg-bhai-bg px-2 py-1 text-[11px] font-mono text-bhai-muted text-center">
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glow-line" />

          {/* STEP 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-20">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-mono text-7xl font-bold stat-highlight">03</span>
                  <div>
                    <div className="font-mono text-[10px] text-bhai-muted tracking-widest">STEP 03 / 03</div>
                    <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">掌舵不撒手</h2>
                    <div className="font-mono text-xs text-bhai-dim tracking-widest mt-1">STAY AT THE WHEEL</div>
                  </div>
                </div>
                <p className="text-base text-bhai-muted leading-relaxed mb-6">
                  这是大多数 AI 项目失败的地方。代理上线了，没人驾驶，6 个月后变成昂贵的烂尾。
                  我的方法要求：从第一天起人在环里。所有关键决策人类签字。所有 AI 行为有审计链。
                </p>
                <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-5">
                  <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">[ 持续 ]</div>
                  <div className="text-2xl font-bold text-foreground">永久</div>
                  <div className="text-xs text-bhai-muted mt-1">控制中心交给你（或你的中国区总经理）</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <MethodDetailCard
                icon={ShieldCheck}
                title="控制中心"
                desc="一个仪表盘看到所有代理的状态、预算消耗、决策日志、待审批项。你（或你的中国区总经理）每天 15 分钟扫一遍，签字关键决策。这就是我说的『一个人掌舵，AI 全员驱动』。"
                output="Control Center Dashboard · Web + 移动端"
              />
              <MethodDetailCard
                icon={FileCheck}
                title="完整审计链"
                desc="每条 AI 决策都被记录：哪个代理、什么时间、基于什么输入、调用了什么工具、产出什么、谁审批了。GDPR 合规 + EU AI Act 就绪。董事会问起来，30 秒调出任意一条决策的完整链路。"
                output="Audit Trail · GDPR 合规 · EU AI Act 就绪"
              />
              <MethodDetailCard
                icon={AlertCircle}
                title="升级策略"
                desc="代理遇到边界外情况怎么办？升级规则已经写好——简单的回退到默认回复，复杂的升级到人类经理，危机的升级到 CEO。每个代理有明确的 SLA：什么情况多久内必须有人响应。"
                output="Escalation Matrix · 3 级 · 明确 SLA"
              />
              <MethodDetailCard
                icon={Cpu}
                title="持续优化"
                desc="代理不是部署完就完事。每两周一次回顾会议——哪些决策被人类拒绝（重新训练信号）、哪些代理超预算（边界调整信号）、哪些 ROI 数字超预期（扩展信号）。我作为外部顾问持续介入，不依赖你的内部团队。"
                output="Bi-weekly Review · 持续优化 · 我亲自参与"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 我的原则 ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            5 条原则 · 不可妥协
          </h2>

          <div className="space-y-4">
            {[
              { num: "01", title: "人在环里", desc: "AI 不撒手自主运行。关键决策人类签字。这是底线，不是选项。" },
              { num: "02", title: "ROI 先于酷炫", desc: "每个代理上线前回答：30 天内能赚回成本吗？不能就不上。" },
              { num: "03", title: "审计链从第一天", desc: "不是后期补的。从第一个代理部署起，所有决策可追溯。" },
              { num: "04", title: "GDPR + EU AI Act", desc: "不是事后合规模板。架构设计就内嵌合规。" },
              { num: "05", title: "我亲自参与", desc: "不是甩给初级顾问。每个客户我亲自驾船——这是我的方式。" },
            ].map((p) => (
              <div key={p.num} className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover">
                <div className="flex items-start gap-6">
                  <span className="font-mono text-3xl font-bold text-bhai-red shrink-0">{p.num}</span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-bhai-muted leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="准备好按 BHAI 方法走了吗？"
        subtitle="20 分钟。我听你讲你的瓶颈。然后告诉你 BHAI 方法在你品牌上的具体应用路径——包括第一步上哪个代理，6 周后能看到什么数字。"
        primaryLabel="预约 20 分钟 →"
        secondaryLabel="看 15 个丹麦案例"
        secondaryHref="/cases"
      />
    </PageShell>
  );
}

function MethodDetailCard({
  icon: Icon, title, desc, output,
}: { icon: React.ElementType; title: string; desc: string; output: string }) {
  return (
    <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6 card-hover">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-9 w-9 rounded-lg border border-bhai-red/30 bg-bhai-red/5 flex items-center justify-center">
          <Icon className="h-4 w-4 text-bhai-red" />
        </div>
        <h3 className="text-base font-bold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-bhai-muted leading-relaxed mb-3">{desc}</p>
      <div className="pt-3 border-t border-[#2A2A2A]">
        <div className="font-mono text-[10px] text-bhai-dim tracking-widest">OUTPUT</div>
        <div className="text-xs text-foreground mt-1 font-medium">{output}</div>
      </div>
    </div>
  );
}
