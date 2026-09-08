"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";

type CaseNavProps = {
  prev?: { slug: string; brandNameZh: string; brandName?: string };
  next?: { slug: string; brandNameZh: string; brandName?: string };
};

/**
 * 案例详情页上/下一案例导航（Round 20-d2 i18n）
 * - 文案走 t.casesPage.prevCase/nextCase/firstCase/lastCase
 * - 品牌名按 locale 选向：zh→brandNameZh，en→brandName（缺省回退 brandNameZh）
 * - props API 兼容旧调用（brandName 为可选新增字段）
 */
export function CaseNav({ prev, next }: CaseNavProps) {
  const { locale, t } = useLang();
  const d = t.casesPage;
  const displayName = (c: { brandNameZh: string; brandName?: string }) =>
    locale === "zh" ? c.brandNameZh : (c.brandName ?? c.brandNameZh);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
      {prev ? (
        <Link
          href={`/cases/${prev.slug}`}
          className="group rounded-lg border border-[#2A2A2A] bg-bhai-card hover:border-bhai-red transition-colors p-6"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-bhai-muted mb-2">
            <ArrowLeft className="h-3 w-3" />
            {d.prevCase}
          </div>
          <div className="text-base font-medium text-foreground group-hover:text-bhai-red transition-colors">
            {displayName(prev)}
          </div>
        </Link>
      ) : (
        <div className="rounded-lg border border-[#1A1A1A] bg-bhai-bg/50 p-6 opacity-40">
          <div className="text-xs font-mono text-bhai-muted mb-2">{d.prevCase}</div>
          <div className="text-base text-bhai-muted">{d.firstCase}</div>
        </div>
      )}

      {next ? (
        <Link
          href={`/cases/${next.slug}`}
          className="group rounded-lg border border-[#2A2A2A] bg-bhai-card hover:border-bhai-red transition-colors p-6 text-right"
        >
          <div className="flex items-center justify-end gap-2 text-xs font-mono text-bhai-muted mb-2">
            {d.nextCase}
            <ArrowRight className="h-3 w-3" />
          </div>
          <div className="text-base font-medium text-foreground group-hover:text-bhai-red transition-colors">
            {displayName(next)}
          </div>
        </Link>
      ) : (
        <div className="rounded-lg border border-[#1A1A1A] bg-bhai-bg/50 p-6 opacity-40 text-right">
          <div className="text-xs font-mono text-bhai-muted mb-2">{d.nextCase}</div>
          <div className="text-base text-bhai-muted">{d.lastCase}</div>
        </div>
      )}
    </div>
  );
}
