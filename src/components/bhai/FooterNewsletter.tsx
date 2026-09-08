"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function FooterNewsletter() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "" || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "订阅失败");
      }

      setDone(true);
      toast({
        title: "订阅成功",
        description: "每月一封：丹麦珠宝 AI 案例 + 中国落地笔记。",
      });
    } catch (err) {
      toast({
        title: "订阅失败",
        description: err instanceof Error ? err.message : "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="mt-5 pt-5 border-t border-[#1A1A1A]">
        <div className="flex items-center gap-2 text-sm text-bhai-text">
          <span className="h-5 w-5 rounded-full bg-bhai-red/20 border border-bhai-red flex items-center justify-center shrink-0">
            <Check className="h-3 w-3 text-bhai-red" />
          </span>
          已订阅：<span className="text-bhai-red">{email}</span>
        </div>
        <p className="text-[11px] text-bhai-dim mt-2">每月一封，随时退订。不会发垃圾邮件。</p>
      </div>
    );
  }

  return (
    <div className="mt-5 pt-5 border-t border-[#1A1A1A]">
      <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">[ 月度洞察 · 免费订阅 ]</div>
      <p className="text-[11px] text-bhai-muted leading-tight mb-3">
        每月一封：丹麦珠宝 AI 案例 + 中国落地笔记。不发垃圾邮件。
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          邮箱地址
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          maxLength={160}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ceo@brand.com"
          className="min-w-0 flex-1 rounded-md border border-[#2A2A2A] bg-bhai-bg px-3 py-2 text-xs text-foreground placeholder:text-bhai-dim input-focus"
        />
        <button
          type="submit"
          disabled={submitting || email.trim() === ""}
          aria-label="订阅月度洞察"
          className="cta-primary rounded-md px-3 py-2 text-white shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </form>
    </div>
  );
}
