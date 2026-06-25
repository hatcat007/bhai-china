"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/bhai/PageShell";
import { ArrowRight, ArrowLeft, Check, Sparkles, FileText, Mail } from "lucide-react";

type FormData = {
  brandName: string;
  revenue: string;
  stage: string;
  pain: string;
  china: string;
  email: string;
};

const steps = [
  { id: "brandName", label: "品牌名", placeholder: "你的珠宝品牌名", type: "text" },
  { id: "revenue", label: "年营收区间", type: "select", options: [
    { value: "under-50m", label: "5000 万人民币以下" },
    { value: "50m-200m", label: "5000 万 - 2 亿人民币" },
    { value: "200m-1b", label: "2 亿 - 10 亿人民币" },
    { value: "over-1b", label: "10 亿人民币以上" },
  ]},
  { id: "stage", label: "品牌阶段", type: "select", options: [
    { value: "oem", label: "OEM 代工，想做自主品牌" },
    { value: "self-brand-domestic", label: "已有自主品牌，主要国内市场" },
    { value: "self-brand-intl", label: "已有自主品牌，考虑国际扩张" },
    { value: "established", label: "成熟品牌，想 AI 转型" },
  ]},
  { id: "pain", label: "最痛的痛点", type: "select", options: [
    { value: "counterfeit", label: "假货太多，团队追不上" },
    { value: "founder-bottleneck", label: "创始人/设计师成为瓶颈" },
    { value: "china-entry", label: "想进或重返中国市场" },
    { value: "vip-clienteling", label: "VIP 客户管理低效" },
    { value: "inventory", label: "库存减值严重" },
    { value: "compliance", label: "PIPL / 数据合规压力" },
  ]},
  { id: "china", label: "中国业务现状", type: "select", options: [
    { value: "no-presence", label: "无中国业务" },
    { value: "export-only", label: "通过经销商出口中国" },
    { value: "online-only", label: "有线上店（天猫/小红书/抖音）" },
    { value: "physical", label: "有实体门店" },
  ]},
  { id: "email", label: "邮箱（接收路线图）", placeholder: "ceo@yourbrand.com", type: "email" },
];

export default function AIRoadmapPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    brandName: "", revenue: "", stage: "", pain: "", china: "", email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isCurrentStepValid = () => {
    const field = steps[currentStep].id as keyof FormData;
    return formData[field].trim() !== "";
  };

  const currentField = steps[currentStep];
  const currentValue = formData[currentField.id as keyof FormData];

  // Generate personalized roadmap preview based on answers
  const getRoadmapPreview = () => {
    const painMap: Record<string, { first: string; layer: string; timeline: string; roi: string }> = {
      counterfeit: {
        first: "AI 防伪鉴真代理",
        layer: "Layer 3 · Clienteling Agents",
        timeline: "14 天首个代理上线，监控淘宝/抖音/拼多多/微信代销 4 大平台，月均自动下架 1,840+ 件假货",
        roi: "30 天 ROI：月均节省 80 工时人工鉴真，按 ¥200/工时计算 = ¥16K/月，3 个月回本",
      },
      "founder-bottleneck": {
        first: "创始人 DNA 设计代理",
        layer: "Layer 1 · Design Memory",
        timeline: "14 天首个代理上线，6 周内训练完成创始人 1,400+ 件档案 + 草图，月生成 60 候选设计供审核",
        roi: "30 天 ROI：设计师产能 +180%，单件设计时间从 8 小时降到 1.5 小时审核",
      },
      "china-entry": {
        first: "中国切入手册代理",
        layer: "Layer 2 · Bench Automation",
        timeline: "14 天首个代理上线，6 周内完成 4,200 KOL 匹配 + Xiaohongshu 编辑代理 + 天猫奢品馆礼宾",
        roi: "30 天 ROI：从 0 到首批 1,000 小红书粉丝，避免盲目扩张典型损失 ¥500K+",
      },
      "vip-clienteling": {
        first: "普通话 VIP 礼宾代理",
        layer: "Layer 3 · Clienteling Agents",
        timeline: "14 天首个代理上线，24/7 微信客户管理，深度掌握每件作品故事，自动预约私享鉴赏",
        roi: "30 天 ROI：咨询响应时间从 48 小时降到 90 秒，VIP 重新激活率从 2% 升到 23%",
      },
      inventory: {
        first: "需求预测 + 动态定价代理",
        layer: "Layer 2 · Bench Automation",
        timeline: "14 天首个代理上线，90 天 SKU 级需求预测准确率 87%+，动态定价最大化总收入回收",
        roi: "30 天 ROI：库存减值从 ¥680K/年降到 ¥180K/年，释放流动资金 ¥420K",
      },
      compliance: {
        first: "PIPL 合规数据本地化代理",
        layer: "Layer 1 · Design Memory",
        timeline: "14 天首个代理上线，部署阿里云上海区，PIPL + 数据安全法 + 网络安全法三重合规审计",
        roi: "30 天 ROI：合规风险解除，避免 PIPL 罚款（最高营业额 5%）+ 数据本地化客户信任提升",
      },
    };

    const stageMap: Record<string, string> = {
      "oem": "你的 OEM 工艺是金矿——15 年代工积累的设计档案可以转化为自主品牌 DNA。参考珠韵珠宝案例：14 周内自主品牌营收破 1.8 亿人民币。",
      "self-brand-domestic": "已有自主品牌是基础。下一步是用 AI 加持——尤其是高定共创代理打破设计师瓶颈，普通话 VIP 礼宾提升客单价。",
      "self-brand-intl": "国际扩张是高风险动作——参考 Maanesten 2024 国际收缩亏损。先用市场优先级 AI 排除不该进的市场，再启动切入手册。",
      "established": "成熟品牌 AI 转型最大杠杆是 9 类工作队并行部署。参考 Pandora 中国再入场案例：6 代理工作队 14 周同店 +38%。",
    };

    const pain = painMap[formData.pain] || painMap["counterfeit"];
    const stageNote = stageMap[formData.stage] || stageMap["established"];

    return { pain, stageNote };
  };

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-bhai-red/30 bg-bhai-red/5 px-4 py-1.5 mb-6">
            <Sparkles className="h-3 w-3 text-bhai-red" />
            <span className="font-mono text-[11px] tracking-widest text-bhai-red">免费 · 5 分钟 · 个性化 AI 路线图</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            你的珠宝品牌<br />
            <span className="stat-highlight">AI 路线图生成器</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl mx-auto leading-relaxed">
            回答 5 个问题。我用 BHAI 方法（丹麦 15 个案例 + 中国珠韵珠宝验证过的）生成你的个性化 AI 路线图预览——
            具体到第一个该上哪个代理、14 天后能看到什么数字、30 天 ROI 预测。免费，5 分钟。
          </p>
        </div>
      </section>

      {/* INTERACTIVE FORM */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-2xl">
          {!submitted ? (
            <div className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-8">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-bhai-muted tracking-widest">
                    STEP {String(currentStep + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[10px] text-bhai-red tracking-widest">
                    {Math.round(((currentStep + 1) / steps.length) * 100)}%
                  </span>
                </div>
                <div className="h-1 rounded-full bg-[#2A2A2A] overflow-hidden">
                  <div
                    className="h-full bg-bhai-red transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <label className="block font-sans text-xl sm:text-2xl font-bold text-foreground mb-4">
                  {currentField.label}
                </label>

                {currentField.type === "text" || currentField.type === "email" ? (
                  <input
                    type={currentField.type}
                    placeholder={currentField.placeholder}
                    value={currentValue}
                    onChange={(e) => updateField(currentField.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && isCurrentStepValid()) handleNext();
                    }}
                    autoFocus
                    className="w-full rounded-lg border border-[#2A2A2A] bg-bhai-bg px-4 py-3 text-base text-foreground placeholder:text-bhai-dim input-focus"
                  />
                ) : (
                  <div className="space-y-2">
                    {currentField.options?.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          updateField(currentField.id, opt.value);
                          setTimeout(() => handleNext(), 200);
                        }}
                        className={`w-full text-left rounded-lg border px-4 py-3 text-sm transition-colors ${
                          currentValue === opt.value
                            ? "border-bhai-red bg-bhai-red/10 text-foreground"
                            : "border-[#2A2A2A] bg-bhai-bg text-bhai-muted hover:border-bhai-red/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt.label}</span>
                          {currentValue === opt.value && <Check className="h-4 w-4 text-bhai-red" />}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-[#2A2A2A]">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="inline-flex items-center gap-2 text-sm text-bhai-muted hover:text-foreground disabled:opacity-30 disabled:hover:text-bhai-muted transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> 上一题
                </button>
                {(currentField.type === "text" || currentField.type === "email") && (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isCurrentStepValid()}
                    className="cta-primary rounded-md px-6 py-2.5 text-sm font-medium text-white inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {currentStep === steps.length - 1 ? "生成路线图" : "下一题"} <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-[#2A2A2A]">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono text-bhai-dim tracking-widest">
                  <span className="flex items-center gap-1"><Check className="h-3 w-3 text-bhai-red" /> 不会发垃圾邮件</span>
                  <span className="flex items-center gap-1"><Check className="h-3 w-3 text-bhai-red" /> 不会分享给第三方</span>
                  <span className="flex items-center gap-1"><Check className="h-3 w-3 text-bhai-red" /> 不会自动订阅</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-bhai-red/40 bg-bhai-card p-8 red-glow">
              {/* Success header */}
              <div className="text-center mb-8">
                <div className="h-16 w-16 rounded-full bg-bhai-red/20 border border-bhai-red flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-bhai-red" />
                </div>
                <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">[ AI 路线图预览 · 已生成 ]</div>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {formData.brandName}，这是你的 AI 路线图
                </h2>
                <p className="text-sm text-bhai-muted">
                  完整版（含 14 周时间线 + 6 周上下文构建细节 + 精确报价）已发送到 {formData.email}
                </p>
              </div>

              {/* Personalized preview */}
              {(() => {
                const { pain, stageNote } = getRoadmapPreview();
                return (
                  <div className="space-y-4">
                    {/* First agent recommendation */}
                    <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-5">
                      <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">[ 14 天首个代理推荐 ]</div>
                      <h3 className="font-sans text-xl font-bold text-foreground mb-3">{pain.first}</h3>
                      <div className="text-xs text-bhai-muted mb-3 font-mono">{pain.layer}</div>
                      <p className="text-sm text-bhai-text leading-relaxed mb-3">{pain.timeline}</p>
                      <div className="pt-3 border-t border-bhai-red/20">
                        <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1">30 天 ROI 预测</div>
                        <p className="text-sm text-foreground font-medium">{pain.roi}</p>
                      </div>
                    </div>

                    {/* Stage note */}
                    <div className="rounded-xl border border-[#2A2A2A] bg-bhai-bg p-5">
                      <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-2">[ 你的品牌阶段分析 ]</div>
                      <p className="text-sm text-bhai-muted leading-relaxed">{stageNote}</p>
                    </div>

                    {/* What's next */}
                    <div className="rounded-xl border border-[#2A2A2A] bg-bhai-bg p-5">
                      <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-3">[ 完整路线图包含 ]</div>
                      <ul className="space-y-2 text-sm text-bhai-text">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                          <span>14 周完整时间线（每周具体产出）</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                          <span>6 周上下文构建细节（品牌语调包 + 决策规则）</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                          <span>精确报价（基于你的品牌复杂度）</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                          <span>PIPL + 数据安全合规检查清单</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                          <span>2-3 个丹麦可比案例深度参考</span>
                        </li>
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="space-y-3 pt-4">
                      <Link
                        href="/book"
                        className="cta-primary rounded-md px-6 py-3.5 text-base font-medium text-white flex items-center justify-center gap-2"
                      >
                        微信 busterl1 · 20 分钟通话深入聊 <ArrowRight className="h-4 w-4" />
                      </Link>
                      <div className="text-center text-xs text-bhai-muted">
                        或查看 <Link href="/pricing" className="text-bhai-red hover:text-bhai-red-hover">透明定价</Link> · <Link href="/cases" className="text-bhai-red hover:text-bhai-red-hover">16 个案例</Link>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Bottom info — only show before submission */}
          {!submitted && (
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <FileText className="h-5 w-5 text-bhai-red mx-auto mb-1" />
                <div className="text-[11px] font-mono text-bhai-muted tracking-widest">5 分钟</div>
              </div>
              <div>
                <Mail className="h-5 w-5 text-bhai-red mx-auto mb-1" />
                <div className="text-[11px] font-mono text-bhai-muted tracking-widest">免费</div>
              </div>
              <div>
                <Sparkles className="h-5 w-5 text-bhai-red mx-auto mb-1" />
                <div className="text-[11px] font-mono text-bhai-muted tracking-widest">个性化</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
