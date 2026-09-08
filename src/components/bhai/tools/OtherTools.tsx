"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { localizeTool } from "@/lib/data/ai-tools-en";
import type { AITool } from "@/lib/data/ai-tools";

/** 工具详情页底部「其他免费工具」栏（i18n Round B 客户端化） */
export function OtherTools({ tools }: { tools: AITool[] }) {
  const { t, locale } = useLang();
  return (
    <div className="mt-12 pt-8 border-t border-[#2A2A2A]">
      <div className="font-mono text-[10px] tracking-widest text-bhai-dim mb-4">
        {t.toolDetail.otherTools}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {tools.map((o) => {
          const lt = localizeTool(o, locale);
          return (
            <Link
              key={o.slug}
              href={`/tools/${o.slug}`}
              className="group rounded-lg border border-[#2A2A2A] bg-bhai-card card-hover px-4 py-3 flex items-center justify-between gap-3 transition-colors hover:border-bhai-red/40"
            >
              <span className="text-sm text-bhai-muted group-hover:text-foreground transition-colors">
                {lt.name}
              </span>
              <span className="font-mono text-[10px] text-bhai-dim tracking-wider shrink-0 inline-flex items-center gap-1.5">
                {lt.timeEstimate}
                <ArrowRight
                  className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-bhai-red"
                  aria-hidden="true"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
