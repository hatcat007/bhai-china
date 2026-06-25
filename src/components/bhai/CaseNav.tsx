"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { JewelryCase } from "@/lib/data/jewelry-cases";

type CaseNavProps = {
  prev?: { slug: string; brandNameZh: string };
  next?: { slug: string; brandNameZh: string };
};

export function CaseNav({ prev, next }: CaseNavProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
      {prev ? (
        <Link
          href={`/cases/${prev.slug}`}
          className="group rounded-lg border border-[#2A2A2A] bg-bhai-card hover:border-bhai-red transition-colors p-6"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-bhai-muted mb-2">
            <ArrowLeft className="h-3 w-3" />
            上一案例
          </div>
          <div className="text-base font-medium text-foreground group-hover:text-bhai-red transition-colors">
            {prev.brandNameZh}
          </div>
        </Link>
      ) : (
        <div className="rounded-lg border border-[#1A1A1A] bg-bhai-bg/50 p-6 opacity-40">
          <div className="text-xs font-mono text-bhai-muted mb-2">上一案例</div>
          <div className="text-base text-bhai-muted">已是第一个</div>
        </div>
      )}

      {next ? (
        <Link
          href={`/cases/${next.slug}`}
          className="group rounded-lg border border-[#2A2A2A] bg-bhai-card hover:border-bhai-red transition-colors p-6 text-right"
        >
          <div className="flex items-center justify-end gap-2 text-xs font-mono text-bhai-muted mb-2">
            下一案例
            <ArrowRight className="h-3 w-3" />
          </div>
          <div className="text-base font-medium text-foreground group-hover:text-bhai-red transition-colors">
            {next.brandNameZh}
          </div>
        </Link>
      ) : (
        <div className="rounded-lg border border-[#1A1A1A] bg-bhai-bg/50 p-6 opacity-40 text-right">
          <div className="text-xs font-mono text-bhai-muted mb-2">下一案例</div>
          <div className="text-base text-bhai-muted">已是最后一个</div>
        </div>
      )}
    </div>
  );
}
