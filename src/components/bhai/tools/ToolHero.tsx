"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Infinity as InfinityIcon, AlertTriangle } from "lucide-react";
import { useLang, tpl } from "@/lib/i18n";
import { useLocalizedTool } from "@/lib/use-localized-tool";
import { TOOL_ICONS, FREE_RUNS_PER_TOOL, type AITool } from "@/lib/data/ai-tools";

/**
 * 工具详情页 HERO（i18n Round B 客户端化）
 * - SSR 渲染 zh 原文；挂载后按 locale 切换（与服务端 SEO 内容无冲突）
 * - 展示字段全部走本地化工具对象；静态标签走 i18n 字典
 */
export function ToolHero({ tool }: { tool: AITool }) {
  const { t } = useLang();
  const d = t.toolDetail;
  const lt = useLocalizedTool(tool);
  const Icon = TOOL_ICONS[tool.icon] ?? TOOL_ICONS.ScanSearch;

  return (
    <div className="relative mx-auto max-w-3xl">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-xs text-bhai-muted hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {d.backToAll}
      </Link>
      <div className="font-mono text-[11px] tracking-widest text-bhai-red mb-4">
        [ BHAI // FREE TOOL ]
      </div>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 mb-4">
        <div className="hidden sm:flex h-14 w-14 shrink-0 rounded-xl border border-bhai-red/40 bg-bhai-red/10 items-center justify-center shadow-[0_0_24px_rgba(229,105,16,0.15)]">
          <Icon className="h-7 w-7 text-bhai-red" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {lt.name}
          </h1>
        </div>
      </div>
      <p className="text-sm sm:text-base text-bhai-muted leading-relaxed max-w-2xl">
        {lt.description}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] tracking-widest text-bhai-dim">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-bhai-red" aria-hidden="true" />
          {lt.timeEstimate}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <InfinityIcon className="h-3.5 w-3.5 text-bhai-red" aria-hidden="true" />
          {tpl(d.freeRuns, { n: FREE_RUNS_PER_TOOL })}
        </span>
      </div>

      {lt.disclaimer && (
        <div
          role="note"
          className="mt-6 flex items-start gap-3 rounded-lg border border-bhai-red/30 bg-bhai-red/5 px-4 py-3"
        >
          <AlertTriangle
            className="h-4 w-4 text-bhai-red mt-0.5 shrink-0"
            aria-hidden="true"
          />
          <p className="text-xs text-bhai-muted leading-relaxed">
            <span className="text-bhai-red font-medium">{d.disclaimerLabel}</span>{" "}
            {lt.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}
