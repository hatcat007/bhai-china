"use client";

import { useState } from "react";
import { ArrowRight, Calendar, Check, Loader2, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const revenueOptions = [
  { value: "under-50m", label: "5000 万人民币以下" },
  { value: "50m-200m", label: "5000 万 - 2 亿人民币" },
  { value: "200m-1b", label: "2 亿 - 10 亿人民币" },
  { value: "over-1b", label: "10 亿人民币以上" },
];

const painOptions = [
  { value: "counterfeit", label: "假货太多，团队追不上" },
  { value: "founder-bottleneck", label: "创始人/设计师成为瓶颈" },
  { value: "china-entry", label: "想进或重返中国市场" },
  { value: "vip-clienteling", label: "VIP 客户管理低效" },
  { value: "inventory", label: "库存减值严重" },
  { value: "compliance", label: "PIPL / 数据合规压力" },
];

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
        throw new Error(data.error || "提交失败");
      }

      setDone(true);
      toast({
        title: "预约请求已收到",
        description: "Buster 会在 24 小时内通过微信或邮箱联系你。",
      });
    } catch (err) {
      toast({
        title: "提交失败",
        description:
          err instanceof Error
            ? err.message
            : "请稍后重试，或直接加微信 busterl1",
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
          [ 预约请求 · 已提交 ]
        </div>
        <h3 className="font-sans text-2xl font-bold text-foreground mb-3">
          {form.name}，你的 20 分钟已保留
        </h3>
        <p className="text-sm text-bhai-muted max-w-md mx-auto leading-relaxed">
          我会在 24 小时内通过 <span className="text-foreground">{form.contact}</span> 联系你，
          确认具体时间。如果你想立即聊，直接加微信 <span className="text-bhai-red">busterl1</span>，
          备注「BHAI 珠宝 CEO」优先通过。
        </p>
        <div className="mt-6 pt-6 border-t border-[#2A2A2A] grid grid-cols-3 gap-4 text-center">
          <div>
            <Calendar className="h-4 w-4 text-bhai-red mx-auto mb-2" />
            <div className="font-mono text-xs text-bhai-muted">24h 内回复</div>
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
          [ 或留下信息 · 我来找你 ]
        </div>
        <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          30 秒预约表单
        </h2>
        <p className="text-sm text-bhai-muted mt-2">
          填完提交即可。我只看必要信息——其余的 20 分钟里聊。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="booking-name" className="block text-sm font-medium text-foreground mb-1.5">
            姓名 <span className="text-bhai-red">*</span>
          </label>
          <input
            id="booking-name"
            type="text"
            required
            maxLength={80}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="你的称呼"
            className="w-full rounded-lg border border-[#2A2A2A] bg-bhai-bg px-4 py-3 text-base text-foreground placeholder:text-bhai-dim input-focus"
          />
        </div>
        <div>
          <label htmlFor="booking-contact" className="block text-sm font-medium text-foreground mb-1.5">
            微信号或邮箱 <span className="text-bhai-red">*</span>
          </label>
          <input
            id="booking-contact"
            type="text"
            required
            maxLength={120}
            value={form.contact}
            onChange={(e) => update("contact", e.target.value)}
            placeholder="wechat-id 或 ceo@brand.com"
            className="w-full rounded-lg border border-[#2A2A2A] bg-bhai-bg px-4 py-3 text-base text-foreground placeholder:text-bhai-dim input-focus"
          />
        </div>
        <div>
          <label htmlFor="booking-brand" className="block text-sm font-medium text-foreground mb-1.5">
            品牌名
          </label>
          <input
            id="booking-brand"
            type="text"
            maxLength={80}
            value={form.brand}
            onChange={(e) => update("brand", e.target.value)}
            placeholder="你的珠宝品牌"
            className="w-full rounded-lg border border-[#2A2A2A] bg-bhai-bg px-4 py-3 text-base text-foreground placeholder:text-bhai-dim input-focus"
          />
        </div>
        <div>
          <label htmlFor="booking-revenue" className="block text-sm font-medium text-foreground mb-1.5">
            年营收区间
          </label>
          <select
            id="booking-revenue"
            value={form.revenueRange}
            onChange={(e) => update("revenueRange", e.target.value)}
            className="w-full rounded-lg border border-[#2A2A2A] bg-bhai-bg px-4 py-3 text-base text-foreground input-focus"
          >
            <option value="">选择区间（可选）</option>
            {revenueOptions.map((opt) => (
              <option key={opt.value} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="booking-pain" className="block text-sm font-medium text-foreground mb-1.5">
            最痛的痛点
          </label>
          <select
            id="booking-pain"
            value={form.painPoint}
            onChange={(e) => update("painPoint", e.target.value)}
            className="w-full rounded-lg border border-[#2A2A2A] bg-bhai-bg px-4 py-3 text-base text-foreground input-focus"
          >
            <option value="">选择痛点（可选）</option>
            {painOptions.map((opt) => (
              <option key={opt.value} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="booking-message" className="block text-sm font-medium text-foreground mb-1.5">
            想聊什么（一句话就够）
          </label>
          <textarea
            id="booking-message"
            rows={3}
            maxLength={2000}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="例：我们在考虑把设计流程 AI 化，但担心丢失品牌 DNA。"
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
            <Loader2 className="h-4 w-4 animate-spin" /> 提交中…
          </>
        ) : (
          <>
            提交预约请求 <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono text-bhai-dim tracking-widest">
        <span className="flex items-center gap-1">
          <Check className="h-3 w-3 text-bhai-red" /> 信息只发给 Buster 本人
        </span>
        <span className="flex items-center gap-1">
          <Check className="h-3 w-3 text-bhai-red" /> 不会自动订阅任何东西
        </span>
        <span className="flex items-center gap-1">
          <Check className="h-3 w-3 text-bhai-red" /> PIPL + GDPR 合规
        </span>
      </div>
    </form>
  );
}
