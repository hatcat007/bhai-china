"use client";

import { useMemo } from "react";
import type { AITool } from "@/lib/data/ai-tools";
import { localizeTool } from "@/lib/data/ai-tools-en";
import { useLang } from "@/lib/i18n";

/**
 * i18n Round B 客户端钩子：按当前 locale 返回本地化后的工具对象。
 * - zh：返回原对象（零开销，引用稳定）
 * - en：返回合并覆盖后的新对象（useMemo 缓存，引用稳定）
 * 服务端页面继续渲染 zh 原文（SEO 不变）；客户端挂载后按偏好切换。
 */
export function useLocalizedTool(tool: AITool): AITool {
  const { locale } = useLang();
  return useMemo(() => localizeTool(tool, locale), [tool, locale]);
}
