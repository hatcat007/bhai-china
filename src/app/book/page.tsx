import Link from "next/link";
import { PageShell } from "@/components/bhai/PageShell";
import { ArrowRight, Calendar, Clock, ShieldCheck, MessageSquare, Mail } from "lucide-react";

export const metadata = {
  title: "预约 20 分钟 · 没有 PPT 没有承诺 | Better Human AI",
  description: "和 Buster 预约 20 分钟。没有 PPT，没有承诺，没有销售话术。你讲你的品牌和挑战，Buster 告诉你 AI 在哪里能赚回它自己的钱。",
};

export default function BookPage() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-4">[ 20 分钟 · NO PITCH · NO COMMITMENTS ]</div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            20 分钟。<br />
            <span className="stat-highlight">没有 PPT。没有承诺。</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl leading-relaxed">
            你讲你的品牌、你的市场、你的瓶颈。我告诉你 AI 在哪里能赚回它自己的钱——以及在哪里不能。
            如果对不上，我们握手告别。这是我对你时间的承诺，也是对我时间的承诺。
          </p>
        </div>
      </section>

      {/* WHAT HAPPENS IN 20 MIN */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 20 分钟会发生什么 ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            时间分配 · 分钟级
          </h2>

          <div className="space-y-3">
            {[
              { min: "0-3", title: "你的品牌当前状态", desc: "你用 3 分钟告诉我：年营收、中国份额、最大瓶颈。不需要准备 PPT——口语就行。" },
              { min: "3-10", title: "你的真实痛点", desc: "我用 7 分钟问问题，挖到真正的瓶颈。不是表面问题（『需要更多流量』），是根因（『VIP 客户咨询响应 48 小时』）。" },
              { min: "10-15", title: "我的诚实评估", desc: "我用 5 分钟告诉你：BHAI 能不能帮、能帮多少、第一个该上哪个代理、6 周后能看到什么数字。" },
              { min: "15-20", title: "你的提问 + 下一步", desc: "最后 5 分钟是你的。问任何问题。如果对得上，我们讨论下一步；如果对不上，我们握手告别。" },
            ].map((step, i) => (
              <div key={i} className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-5 card-hover">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12 sm:col-span-2">
                    <div className="font-mono text-xs text-bhai-red tracking-widest">{step.min} min</div>
                  </div>
                  <div className="col-span-12 sm:col-span-4">
                    <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <p className="text-sm text-bhai-muted leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU NEED TO PREPARE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 你需要准备什么 ]</div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12 leading-tight">
            3 件事 · 不多
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-3xl font-bold stat-highlight mb-3">01</div>
              <h3 className="text-base font-bold text-foreground mb-2">品牌基本盘</h3>
              <p className="text-xs text-bhai-muted leading-relaxed">
                年营收区间（不需要精确）、中国市场占比、主要渠道（直营/批发/DTC）、团队规模。口语就行。
              </p>
            </div>
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-3xl font-bold stat-highlight mb-3">02</div>
              <h3 className="text-base font-bold text-foreground mb-2">最痛的痛点</h3>
              <p className="text-xs text-bhai-muted leading-relaxed">
                如果只能解决一个问题，是哪个？假货？中国市场份额？创始人瓶颈？库存减值？挑一个最痛的。
              </p>
            </div>
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6">
              <div className="font-mono text-3xl font-bold stat-highlight mb-3">03</div>
              <h3 className="text-base font-bold text-foreground mb-2">决策权限</h3>
              <p className="text-xs text-bhai-muted leading-relaxed">
                你是 CEO 还是高管？是否有 AI 项目预算审批权？如果需要董事会批准，董事会下次开会是什么时候？
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
              <p className="text-xs text-foreground leading-relaxed">
                <span className="font-medium">不需要准备：</span>PPT、商业计划书、技术架构图、详细财务报表。
                我会从你的口语里挖出我需要的信息。如果你准备了反而会拖慢对话。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-8 red-glow">
            <div className="text-center mb-8">
              <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">[ 直接预约 ]</div>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
                选一个时间 · 20 分钟
              </h2>
              <p className="text-sm text-bhai-muted">
                点击下方按钮进入日历。选你方便的 20 分钟。我会准时出现。
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="weixin://add/busterl1"
                className="cta-primary rounded-lg p-5 text-white flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <div className="text-base font-medium">微信：busterl1</div>
                    <div className="text-xs opacity-80">中国客户首选 · 搜索添加，备注：BHAI 珠宝 CEO</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://cal.eu/betterhumanai/20min"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-[#2A2A2A] bg-bhai-bg p-5 hover:border-bhai-red transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5 text-bhai-red" />
                  <div>
                    <div className="text-base font-medium text-foreground">cal.eu/betterhumanai/20min</div>
                    <div className="text-xs text-bhai-muted">国际客户日历预约</div>
                  </div>
                </div>
              </a>

              <a
                href="mailto:buster@betterhumanai.dk?subject=20%20分钟预约&body=Buster，我是 [品牌名] 的 [职位]。我们的年营收大约 [区间]。最痛的痛点是 [一句话描述]。我想预约 20 分钟。"
                className="block rounded-lg border border-[#2A2A2A] bg-bhai-bg p-5 hover:border-bhai-red transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-bhai-red" />
                  <div>
                    <div className="text-base font-medium text-foreground">buster@betterhumanai.dk</div>
                    <div className="text-xs text-bhai-muted">如果微信/日历没合适时间，直接发邮件</div>
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-[#2A2A2A]">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Clock className="h-4 w-4 text-bhai-red mx-auto mb-2" />
                  <div className="font-mono text-xs text-bhai-muted">20 分钟</div>
                </div>
                <div>
                  <ShieldCheck className="h-4 w-4 text-bhai-red mx-auto mb-2" />
                  <div className="font-mono text-xs text-bhai-muted">NO PITCH</div>
                </div>
                <div>
                  <MessageSquare className="h-4 w-4 text-bhai-red mx-auto mb-2" />
                  <div className="font-mono text-xs text-bhai-muted">NO COMMITMENTS</div>
                </div>
              </div>
            </div>
          </div>

          {/* For the not-yet-ready */}
          <div className="mt-8 text-center">
            <p className="text-sm text-bhai-muted mb-4">
              还没准备好预约？先看看我做过什么。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/cases"
                className="rounded-md border border-[#333] bg-transparent px-5 py-2.5 text-sm font-medium text-foreground hover:border-bhai-red hover:bg-[#0F0F0F] transition-colors"
              >
                看 15 个丹麦案例
              </Link>
              <Link
                href="/solutions"
                className="rounded-md border border-[#333] bg-transparent px-5 py-2.5 text-sm font-medium text-foreground hover:border-bhai-red hover:bg-[#0F0F0F] transition-colors"
              >
                看 8 类解决方案
              </Link>
              <Link
                href="/method"
                className="rounded-md border border-[#333] bg-transparent px-5 py-2.5 text-sm font-medium text-foreground hover:border-bhai-red hover:bg-[#0F0F0F] transition-colors"
              >
                看 BHAI 方法
              </Link>
              <Link
                href="/denmark-insights"
                className="rounded-md border border-[#333] bg-transparent px-5 py-2.5 text-sm font-medium text-foreground hover:border-bhai-red hover:bg-[#0F0F0F] transition-colors"
              >
                看丹麦洞察
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
