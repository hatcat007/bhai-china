"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/lib/i18n";

/**
 * 页脚月度订阅（20-e 双语化）
 * - 展示字符串/Toast 全部走 t.chrome.newsletter*；POST /api/newsletter 逻辑不变
 */
export function FooterNewsletter() {
  const { toast } = useToast();
  const { t } = useLang();
  const c = t.chrome;
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
        throw new Error(data.error || c.newsletterFailTitle);
      }

      setDone(true);
      toast({
        title: c.newsletterSuccessTitle,
        description: c.newsletterSuccessDesc,
      });
    } catch (err) {
      toast({
        title: c.newsletterFailTitle,
        description:
          err instanceof Error ? err.message : c.newsletterFailFallback,
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
          {c.newsletterDoneLabel}
          <span className="text-bhai-red">{email}</span>
        </div>
        <p className="text-[11px] text-bhai-dim mt-2">{c.newsletterDoneNote}</p>
      </div>
    );
  }

  return (
    <div className="mt-5 pt-5 border-t border-[#1A1A1A]">
      <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-2">{c.newsletterKicker}</div>
      <p className="text-[11px] text-bhai-muted leading-tight mb-3">
        {c.newsletterPitch}
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          {c.newsletterEmailLabel}
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
          aria-label={c.newsletterSubmitAria}
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
