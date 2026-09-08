"use client";

import { useState } from "react";
import { Link2, Check, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/lib/i18n";

/**
 * 文章分享条：复制链接 + 原生分享（移动端）。
 * 营销站内链传播的最小闭环。（20-e 双语化：文案走 t.chrome.share*，分享 URL 不变）
 */
export function ShareButtons({ title }: { title: string }) {
  const { toast } = useToast();
  const { t } = useLang();
  const c = t.chrome;
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast({ title: c.shareCopiedTitle, description: c.shareCopiedDesc });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: c.shareCopyFailTitle,
        description: c.shareCopyFailDesc,
        variant: "destructive",
      });
    }
  };

  const nativeShare = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch {
        /* 用户取消分享不算错误 */
      }
    } else {
      void copyLink();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] text-bhai-dim tracking-widest mr-1">{c.shareLabel}</span>
      <button
        type="button"
        onClick={() => void copyLink()}
        aria-label={c.shareCopyAria}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#2A2A2A] bg-bhai-card text-bhai-muted transition-colors hover:border-bhai-red hover:text-bhai-red"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-bhai-red" /> : <Link2 className="h-3.5 w-3.5" />}
      </button>
      <button
        type="button"
        onClick={() => void nativeShare()}
        aria-label={c.shareNativeAria}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#2A2A2A] bg-bhai-card text-bhai-muted transition-colors hover:border-bhai-red hover:text-bhai-red"
      >
        <Share2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
