"use client";

import { useState } from "react";
import { ArrowRight, Calendar, Check, Loader2, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/lib/i18n";

/**
 * 30 秒预约表单（20-c 双语化）
 * - 仅显示文案走 t.book.*：label / placeholder / option / toast / 成功态
 * - 表单逻辑不变：字段名、POST /api/leads、payload 结构、校验规则原样保留
 * - 注意 option 的提交值沿用原设计 value===label（zh 提交内容与历史完全一致）
 */
type FormState = {
  name: string;
  contact: string;
  brand: string;
  revenueRange: string;
  painPoint: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  contact: "",
  brand: "",
  revenueRange: "",
  painPoint: "",
  message: "",
};

export function BookingForm() {
  const { toast } = useToast();
  const { t } = useLang();
  const d = t.book;
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canSubmit =
    form.name.trim() !== "" && form.contact.trim().length >= 3 && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "booking",
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || d.formSubmitFail);
      }

      setDone(true);
      toast({
        title: d.toastOkTitle,
        description: d.toastOkDesc,
      });
    } catch {
      // 服务端错误文案为中文，显示层统一走字典，保证 EN 下零中文漏出
      toast({
        title: d.toastFailTitle,
        description: d.toastFailDesc,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-bhai-red/40 bg-bhai-card p-8 red-glow text-center">
        <div className="h-16 w-16 rounded-full bg-bhai-red/20 border border-bhai-red flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-bhai-red" />
        </div>
        <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">
          {d.doneKicker}
        </div>
        <h3 className="font-sans text-2xl font-bold text-foreground mb-3">
          {d.doneTitle.replace("{name}", form.name)}
        </h3>
        <p className="text-sm text-bhai-muted max-w-md mx-auto leading-relaxed">
          {d.doneDescA}<span className="text-foreground">{form.contact}</span>{d.doneDescB}
          <span className="text-bhai-red">busterl1</span>{d.doneDescC}
        </p>
        <div className="mt-6 pt-6 border-t border-[#2A2A2A] grid grid-cols-3 gap-4 text-center">
          <div>
            <Calendar className="h-4 w-4 text-bhai-red mx-auto mb-2" />
            <div className="font-mono text-xs text-bhai-muted">{d.doneTriTime}</div>
          </div>
          <div>
            <ShieldCheck className="h-4 w-4 text-bhai-red mx-auto mb-2" />
            <div className="font-mono text-xs text-bhai-muted">NO PITCH</div>
          </div>
          <div>
            <Check className="h-4 w-4 text-bhai-red mx-auto mb-2" />
            <div className="font-mono text-xs text-bhai-muted">NO COMMITMENTS</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-6 sm:p-8"
    >
      <div className="mb-6">
        <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">
          {d.formKicker}
        </div>
        <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {d.formTitle}
        </h2>
        <p className="text-sm text-bhai-muted mt-2">
          {d.formDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="booking-name" className="block text-sm font-medium text-foreground mb-1.5">
            {d.nameLabel} <span className="text-bhai-red">*</span>
          </label>
          <input
            id="booking-name"
            type="text"
            required
            maxLength={80}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={d.namePh}
            className="w-full rounded-lg border border-[#2A2A2A] bg-bhai-bg px-4 py-3 text-base text-foreground placeholder:text-bhai-dim input-focus"
          />
        </div>
        <div>
          <label htmlFor="booking-contact" className="block text-sm font-medium text-foreground mb-1.5">
            {d.contactLabel} <span className="text-bhai-red">*</span>
          </label>
          <input
            id="booking-contact"
            type="text"
            required
            maxLength={120}
            value={form.contact}
            onChange={(e) => update("contact", e.target.value)}
            placeholder={d.contactPh}
            className="w-full rounded-lg border border-[#2A2A2A] bg-bhai-bg px-4 py-3 text-base text-foreground placeholder:text-bhai-dim input-focus"
          />
        </div>
        <div>
          <label htmlFor="booking-brand" className="block text-sm font-medium text-foreground mb-1.5">
            {d.brandLabel}
          </label>
          <input
            id="booking-brand"
            type="text"
            maxLength={80}
            value={form.brand}
            onChange={(e) => update("brand", e.target.value)}
            placeholder={d.brandPh}
            className="w-full rounded-lg border border-[#2A2A2A] bg-bhai-bg px-4 py-3 text-base text-foreground placeholder:text-bhai-dim input-focus"
          />
        </div>
        <div>
          <label htmlFor="booking-revenue" className="block text-sm font-medium text-foreground mb-1.5">
            {d.revenueLabel}
          </label>
          <select
            id="booking-revenue"
            value={form.revenueRange}
            onChange={(e) => update("revenueRange", e.target.value)}
            className="w-full rounded-lg border border-[#2A2A2A] bg-bhai-bg px-4 py-3 text-base text-foreground input-focus"
          >
            <option value="">{d.revenuePlaceholder}</option>
            {d.revenueOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="booking-pain" className="block text-sm font-medium text-foreground mb-1.5">
            {d.painLabel}
          </label>
          <select
            id="booking-pain"
            value={form.painPoint}
            onChange={(e) => update("painPoint", e.target.value)}
            className="w-full rounded-lg border border-[#2A2A2A] bg-bhai-bg px-4 py-3 text-base text-foreground input-focus"
          >
            <option value="">{d.painPlaceholder}</option>
            {d.painOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="booking-message" className="block text-sm font-medium text-foreground mb-1.5">
            {d.messageLabel}
          </label>
          <textarea
            id="booking-message"
            rows={3}
            maxLength={2000}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder={d.messagePh}
            className="w-full rounded-lg border border-[#2A2A2A] bg-bhai-bg px-4 py-3 text-base text-foreground placeholder:text-bhai-dim input-focus resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="cta-primary mt-6 w-full sm:w-auto rounded-md px-8 py-4 text-base font-medium text-white inline-flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> {d.submitBusy}
          </>
        ) : (
          <>
            {d.submitIdle} <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono text-bhai-dim tracking-widest">
        <span className="flex items-center gap-1">
          <Check className="h-3 w-3 text-bhai-red" /> {d.trust[0]}
        </span>
        <span className="flex items-center gap-1">
          <Check className="h-3 w-3 text-bhai-red" /> {d.trust[1]}
        </span>
        <span className="flex items-center gap-1">
          <Check className="h-3 w-3 text-bhai-red" /> {d.trust[2]}
        </span>
      </div>
    </form>
  );
}
