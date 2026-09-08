"use client";

import { useState } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight, ArrowLeft, Check, Sparkles, FileText, Mail, Loader2, Wand2, Printer } from "lucide-react";
import { useLang, tpl } from "@/lib/i18n";

/**
 * AI 路线图 6 步向导（客户端 body，i18n Round C：全向导双语）
 * - 步骤/选项/预览内容/错误文案全部走 i18n 字典（t.roadmap）
 * - locale 随 /api/roadmap/generate 下发 → LLM 输出语言跟随用户界面语言
 * - 结构与 Round B 一致：server 页面委托 client body（PageShell 由 server 页实例化，
 *   保证 LanguageProvider context 对 body 生效——直接在 client 页里包 PageShell 时
 *   本页曾出现 context 不达、语言切换失效的问题）
 */

type FormData = {
  brandName: string;
  revenue: string;
  stage: string;
  pain: string;
  china: string;
  email: string;
};

type StepDef = {
  id: keyof FormData;
  label: string;
  type: "text" | "email" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
};

export function RoadmapWizard() {
  const { t, locale } = useLang();
  const rm = t.roadmap;

  const steps: StepDef[] = [
    { id: "brandName", label: rm.brandNameLabel, placeholder: rm.brandNamePlaceholder, type: "text" },
    {
      id: "revenue", label: rm.revenueLabel, type: "select", options: [
        { value: "under-50m", label: rm.revenueOptions[0] },
        { value: "50m-200m", label: rm.revenueOptions[1] },
        { value: "200m-1b", label: rm.revenueOptions[2] },
        { value: "over-1b", label: rm.revenueOptions[3] },
      ],
    },
    {
      id: "stage", label: rm.stageLabel, type: "select", options: [
        { value: "oem", label: rm.stageOptions[0] },
        { value: "self-brand-domestic", label: rm.stageOptions[1] },
        { value: "self-brand-intl", label: rm.stageOptions[2] },
        { value: "established", label: rm.stageOptions[3] },
      ],
    },
    {
      id: "pain", label: rm.painLabel, type: "select", options: [
        { value: "counterfeit", label: rm.painOptions[0] },
        { value: "founder-bottleneck", label: rm.painOptions[1] },
        { value: "china-entry", label: rm.painOptions[2] },
        { value: "vip-clienteling", label: rm.painOptions[3] },
        { value: "inventory", label: rm.painOptions[4] },
        { value: "compliance", label: rm.painOptions[5] },
      ],
    },
    {
      id: "china", label: rm.chinaLabel, type: "select", options: [
        { value: "no-presence", label: rm.chinaOptions[0] },
        { value: "export-only", label: rm.chinaOptions[1] },
        { value: "online-only", label: rm.chinaOptions[2] },
        { value: "physical", label: rm.chinaOptions[3] },
      ],
    },
    { id: "email", label: rm.emailLabel, placeholder: rm.emailPlaceholder, type: "email" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    brandName: "", revenue: "", stage: "", pain: "", china: "", email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [fullRoadmap, setFullRoadmap] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  const saveRoadmapLead = async (data: FormData) => {
    setSaving(true);
    try {
      const labelOf = (fieldId: string, value: string) =>
        steps.find((s) => s.id === fieldId)?.options?.find((o) => o.value === value)?.label ?? value;

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.brandName,
          contact: data.email,
          brand: data.brandName,
          revenueRange: labelOf("revenue", data.revenue),
          stage: labelOf("stage", data.stage),
          painPoint: labelOf("pain", data.pain),
          chinaPresence: labelOf("china", data.china),
          source: "roadmap",
        }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.leadId) setLeadId(json.leadId);
      }
      // 保存失败不影响预览展示——预览是本地生成的
    } catch {
      // 静默失败：预览仍然可用，用户可直接微信联系
    } finally {
      setSaving(false);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setSubmitted(true);
      void saveRoadmapLead(formData);
    }
  };

  const generateFullRoadmap = async () => {
    if (generating) return;
    setGenerating(true);
    setGenError(null);
    setFullRoadmap(""); // 立即切换到流式渲染视图
    try {
      const res = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: leadId ?? undefined,
          brandName: formData.brandName,
          revenue: steps.find((s) => s.id === "revenue")?.options?.find((o) => o.value === formData.revenue)?.label ?? formData.revenue,
          stage: steps.find((s) => s.id === "stage")?.options?.find((o) => o.value === formData.stage)?.label ?? formData.stage,
          pain: steps.find((s) => s.id === "pain")?.options?.find((o) => o.value === formData.pain)?.label ?? formData.pain,
          china: steps.find((s) => s.id === "china")?.options?.find((o) => o.value === formData.china)?.label ?? formData.china,
          email: formData.email,
          locale, // i18n Round C：报告语言跟随用户界面语言
        }),
      });

      if (!res.ok) {
        let msg = rm.genFailed;
        try {
          const j = await res.json();
          msg = j.error || msg;
        } catch {
          /* 非 JSON 错误 */
        }
        throw new Error(msg);
      }

      // 读取 SSE 流：逐段追加渲染
      const reader = res.body?.getReader();
      if (!reader) throw new Error(rm.streamUnsupported);

      const decoder = new TextDecoder();
      let buf = "";
      let acc = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const parts = buf.split("\n\n");
        buf = parts.pop() ?? "";
        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;
          let evt: { type?: string; text?: string; error?: string };
          try {
            evt = JSON.parse(line.slice(5).trim());
          } catch {
            continue; // 半包 JSON，跳过等待下一个 chunk
          }
          if (evt.type === "delta" && evt.text) {
            acc += evt.text;
            setFullRoadmap(acc);
          } else if (evt.type === "error") {
            throw new Error(evt.error || rm.genFailed);
          }
        }
      }

      if (acc.trim().length < 100) {
        setFullRoadmap(null); // 内容太短视为失败，恢复生成按钮
        throw new Error(rm.incomplete);
      }
    } catch (err) {
      setGenError(err instanceof Error ? err.message : rm.genFailed);
      setFullRoadmap((prev) => (prev !== null && prev.trim().length >= 100 ? prev : null));
    } finally {
      setGenerating(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isCurrentStepValid = () => {
    const field = steps[currentStep].id;
    return formData[field].trim() !== "";
  };

  const currentField = steps[currentStep];
  const currentValue = formData[currentField.id];

  // Generate personalized roadmap preview based on answers（内容随 locale 双语）
  const getRoadmapPreview = () => {
    const pain = rm.preview[formData.pain as keyof typeof rm.preview] ?? rm.preview.counterfeit;
    const stageNote = rm.stageNotes[formData.stage as keyof typeof rm.stageNotes] ?? rm.stageNotes.established;
    return { pain, stageNote };
  };

  return (
    <>
      {/* HERO */}
      <section className="relative gradient-section pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-bhai-red/30 bg-bhai-red/5 px-4 py-1.5 mb-6">
            <Sparkles className="h-3 w-3 text-bhai-red" />
            <span className="font-mono text-[11px] tracking-widest text-bhai-red">{rm.kicker}</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {rm.titleA}<br />
            <span className="stat-highlight">{rm.titleB}</span>
          </h1>
          <p className="text-base sm:text-lg text-bhai-muted max-w-3xl mx-auto leading-relaxed">
            {rm.heroDesc}
          </p>
        </div>
      </section>

      {/* INTERACTIVE FORM */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
        <div className="mx-auto max-w-2xl">
          {!submitted ? (
            <div className="card-sheen relative overflow-hidden rounded-2xl border border-[#2A2A2A] bg-bhai-card p-8">
              {/* 顶部橙色强调线（与工具卡/解锁弹窗视觉语言统一） */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bhai-red to-transparent opacity-80"
              />
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
                  <ArrowLeft className="h-4 w-4" /> {rm.prev}
                </button>
                {(currentField.type === "text" || currentField.type === "email") && (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isCurrentStepValid()}
                    className="cta-primary rounded-md px-6 py-2.5 text-sm font-medium text-white inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {currentStep === steps.length - 1 ? rm.generate : rm.next} <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-[#2A2A2A]">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono text-bhai-dim tracking-widest">
                  {rm.trust.map((item) => (
                    <span key={item} className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-bhai-red" /> {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="card-sheen relative overflow-hidden rounded-2xl border border-bhai-red/40 bg-bhai-card p-8 red-glow">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bhai-red to-transparent opacity-80"
              />
              {/* Success header */}
              <div className="text-center mb-8">
                <div className="h-16 w-16 rounded-full bg-bhai-red/20 border border-bhai-red flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-bhai-red" />
                </div>
                <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">{rm.previewKicker}</div>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {tpl(rm.successTitle, { brand: formData.brandName })}
                </h2>
                <p className="text-sm text-bhai-muted">
                  {saving
                    ? rm.saving
                    : tpl(rm.sentTo, { email: formData.email })}
                </p>
              </div>

              {/* Personalized preview */}
              {(() => {
                const { pain, stageNote } = getRoadmapPreview();
                return (
                  <div className="space-y-4">
                    {/* First agent recommendation */}
                    <div className="rounded-xl border border-bhai-red/30 bg-bhai-red/5 p-5">
                      <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">{rm.firstAgentKicker}</div>
                      <h3 className="font-sans text-xl font-bold text-foreground mb-3">{pain.first}</h3>
                      <div className="text-xs text-bhai-muted mb-3 font-mono">{pain.layer}</div>
                      <p className="text-sm text-bhai-text leading-relaxed mb-3">{pain.timeline}</p>
                      <div className="pt-3 border-t border-bhai-red/20">
                        <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-1">{rm.roiKicker}</div>
                        <p className="text-sm text-foreground font-medium">{pain.roi}</p>
                      </div>
                    </div>

                    {/* Stage note */}
                    <div className="rounded-xl border border-[#2A2A2A] bg-bhai-bg p-5">
                      <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-2">{rm.stageKicker}</div>
                      <p className="text-sm text-bhai-muted leading-relaxed">{stageNote}</p>
                    </div>

                    {/* What's next */}
                    <div className="rounded-xl border border-[#2A2A2A] bg-bhai-bg p-5">
                      <div className="font-mono text-[10px] text-bhai-muted tracking-widest mb-3">{rm.includesKicker}</div>
                      <ul className="space-y-2 text-sm text-bhai-text">
                        {rm.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="space-y-3 pt-4">
                      {/* LLM 完整路线图生成（SSE 流式） */}
                      {fullRoadmap === null ? (
                        <div className="rounded-xl border border-[#2A2A2A] bg-bhai-bg p-5">
                          <div className="flex items-start gap-3 mb-4">
                            <Wand2 className="h-4 w-4 text-bhai-red mt-0.5 shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-foreground mb-1">
                                {rm.fullGenTitle}
                              </div>
                              <p className="text-xs text-bhai-muted leading-relaxed">
                                {rm.fullGenDesc}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => void generateFullRoadmap()}
                            disabled={generating}
                            className="cta-primary w-full rounded-md px-6 py-3 text-sm font-medium text-white inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
                          >
                            {generating ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {rm.generatingBtn}
                              </>
                            ) : (
                              <>
                                <Wand2 className="h-4 w-4" />
                                {rm.genBtn}
                              </>
                            )}
                          </button>
                          {genError && (
                            <p className="text-xs text-red-400 mt-3">{genError}</p>
                          )}
                        </div>
                      ) : (
                        <div
                          data-print-area
                          className="rounded-xl border border-bhai-red/30 bg-bhai-bg p-5 sm:p-6"
                        >
                          <div className="flex items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-bhai-red" />
                              <span className="font-mono text-[10px] text-bhai-red tracking-widest">
                                {generating ? rm.streamWritingKicker : rm.streamDoneKicker}
                              </span>
                            </div>
                            {generating ? (
                              <span className="font-mono text-[10px] text-bhai-muted tabular-nums shrink-0">
                                {fullRoadmap.length}{rm.charsUnit}
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => window.print()}
                                className="no-print shrink-0 inline-flex items-center gap-1.5 rounded-md border border-[#2A2A2A] bg-bhai-card px-2.5 py-1 font-mono text-[10px] tracking-widest text-bhai-muted transition-colors hover:border-bhai-red hover:text-bhai-red"
                                title={rm.printTitle}
                              >
                                <Printer className="h-3 w-3" aria-hidden="true" />
                                {rm.printLabel}
                              </button>
                            )}
                          </div>
                          <div className="roadmap-markdown max-h-[560px] overflow-y-auto admin-scrollbar pr-2">
                            <Markdown remarkPlugins={[remarkGfm]}>{fullRoadmap}</Markdown>
                            {generating && (
                              <span className="stream-cursor" aria-hidden="true" />
                            )}
                          </div>
                          <p className="text-[11px] text-bhai-dim mt-4 font-mono tracking-wider">
                            {generating ? rm.streamWritingNote : rm.streamDoneNote}
                          </p>
                        </div>
                      )}

                      <Link
                        href="/book"
                        className="cta-primary rounded-md px-6 py-3.5 text-base font-medium text-white flex items-center justify-center gap-2"
                      >
                        {rm.bookCta} <ArrowRight className="h-4 w-4" />
                      </Link>
                      <div className="text-center text-xs text-bhai-muted">
                        {rm.orSeePrefix}{" "}
                        <Link href="/pricing" className="text-bhai-red hover:text-bhai-red-hover">{rm.orSeePricing}</Link>
                        {" · "}
                        <Link href="/cases" className="text-bhai-red hover:text-bhai-red-hover">{rm.orSeeCases}</Link>
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
                <div className="text-[11px] font-mono text-bhai-muted tracking-widest">{rm.badges[0]}</div>
              </div>
              <div>
                <Mail className="h-5 w-5 text-bhai-red mx-auto mb-1" />
                <div className="text-[11px] font-mono text-bhai-muted tracking-widest">{rm.badges[1]}</div>
              </div>
              <div>
                <Sparkles className="h-5 w-5 text-bhai-red mx-auto mb-1" />
                <div className="text-[11px] font-mono text-bhai-muted tracking-widest">{rm.badges[2]}</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
