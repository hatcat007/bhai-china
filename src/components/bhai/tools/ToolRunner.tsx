"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy, History, ChevronDown, Loader2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ScanMonitor } from "@/components/bhai/tools/ScanMonitor";
import { track } from "@/lib/track";
import { useLang, tpl } from "@/lib/i18n";
import { useLocalizedTool } from "@/lib/use-localized-tool";
import {
  TOOL_ICONS,
  FREE_RUNS_PER_TOOL,
  type AITool,
} from "@/lib/data/ai-tools";

/**
 * 免费 AI 工具执行器（客户端）
 * - 表单 → SSE 流式输出到终端风格面板（事件形状与 ai-roadmap 一致）
 * - 门控：localStorage 记账，每工具 2 次免费；第 3 次弹解锁 Dialog
 * - 解锁：留邮箱 → POST /api/leads (source:"tools")，被拒则回落 /api/tools/unlock
 * - 支持 ?url= 预填 + 自动执行（首页 ToolsTeaser 进入路径）
 */

const USAGE_KEY = "bhai_tool_usage";
const UNLOCKED_KEY = "bhai_tool_unlocked";
const HISTORY_KEY = "bhai_tool_history";
const HISTORY_CAP = 5; // 每工具保留最近 5 次生成
const HISTORY_OUTPUT_CAP = 8000; // 单条输出最多入库字数（控 localStorage 体积）

type UsageMap = Record<string, number>;
type UnlockedMap = Record<string, boolean>;

type HistoryEntry = {
  ts: number; // 完成时间戳
  values: Record<string, string>; // 当时的表单输入
  output: string; // 完整输出（截断至 8000 字）
  chars: number; // 原始字数
};

function readJsonMap<T>(key: string): Record<string, T> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object"
      ? (parsed as Record<string, T>)
      : {};
  } catch {
    return {};
  }
}

function writeJsonMap(key: string, map: Record<string, unknown>): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(map));
  } catch {
    /* 私密模式等场景静默失败 */
  }
}

function readHistory(slug: string): HistoryEntry[] {
  const map = readJsonMap<HistoryEntry[]>(HISTORY_KEY);
  const list = map[slug];
  return Array.isArray(list) ? list : [];
}

function appendHistory(slug: string, entry: HistoryEntry): HistoryEntry[] {
  const map = readJsonMap<HistoryEntry[]>(HISTORY_KEY);
  const list = [entry, ...(map[slug] ?? [])].slice(0, HISTORY_CAP);
  map[slug] = list;
  writeJsonMap(HISTORY_KEY, map);
  return list;
}

function clearHistory(slug: string): HistoryEntry[] {
  const map = readJsonMap<HistoryEntry[]>(HISTORY_KEY);
  delete map[slug];
  writeJsonMap(HISTORY_KEY, map);
  return [];
}

function fmtTime(ts: number): string {
  const d = new Date(ts);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function normalizeUrl(raw: string): string {
  const s = raw.trim();
  if (!s) return s;
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
}

function isValidUrl(raw: string): boolean {
  try {
    const u = new URL(raw);
    return (u.protocol === "http:" || u.protocol === "https:") && !!u.hostname;
  } catch {
    return false;
  }
}

export function ToolRunner({ tool }: { tool: AITool }) {
  const { toast } = useToast();
  const { t, locale } = useLang();
  const r = t.runner;
  // 展示字段（name/label/placeholder/cta/outputHint）随 locale 切换；逻辑字段仍用 tool
  const lt = useLocalizedTool(tool);
  const Icon = TOOL_ICONS[tool.icon] ?? TOOL_ICONS.ScanSearch;

  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(tool.fields.map((f) => [f.id, ""]))
  );
  const [usage, setUsage] = useState<UsageMap | null>(null); // null = localStorage 未读
  const [unlocked, setUnlocked] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inlineError, setInlineError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // 扫描监视器状态（仅分析器使用）：阶段日志 / 进度 / 轮次号（重挂载用）
  const [stageLines, setStageLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [runId, setRunId] = useState(0);
  // 提交时冻结的目标 URL：避免输入过程中实时触发截图预加载/回退链空转
  const [scanUrl, setScanUrl] = useState<string | null>(null);
  // 本工具最近生成记录（localStorage，最多 5 条）
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);

  // 解锁弹窗
  const [dialogOpen, setDialogOpen] = useState(false);
  const [unlockEmail, setUnlockEmail] = useState("");
  const [unlockSubmitting, setUnlockSubmitting] = useState(false);
  const pendingRunRef = useRef<Record<string, string> | null>(null);
  const autoStartedRef = useRef(false);

  /* ---------- SSE 流式执行 ---------- */
  const runInput = useCallback(
    async (payload: Record<string, string>) => {
      setStreaming(true);
      setError(null);
      setInlineError(null);
      setOutput("");
      setRunId((n) => n + 1);
      setStageLines([]);
      setProgress(5);
      setScanUrl(tool.isAnalyzer ? (payload.url ?? "").trim() || null : null);
      track(tool.isAnalyzer ? "scan_start" : "tool_start", { tool: tool.slug });
      let prog = 5;
      try {
        const res = await fetch(tool.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // locale 随请求下发：后端报告/阶段日志/错误文案跟随界面语言（i18n Round C）
          body: JSON.stringify(
            tool.isAnalyzer
              ? { url: payload.url, locale }
              : { input: payload, locale }
          ),
        });

        if (!res.ok) {
          let msg = r.runFailed;
          try {
            const j = await res.json();
            if (j?.error) msg = j.error;
          } catch {
            /* 非 JSON 错误体 */
          }
          throw new Error(msg);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error(r.streamUnsupported);

        const decoder = new TextDecoder();
        let buf = "";
        let acc = "";

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const parts = buf.split("\n\n");
          buf = parts.pop() ?? "";
          for (const part of parts) {
            const line = part.trim();
            if (!line.startsWith("data:")) continue;
            let evt: {
              type?: string;
              text?: string;
              error?: string;
              message?: string;
              progress?: number;
            };
            try {
              evt = JSON.parse(line.slice(5).trim());
            } catch {
              continue; // 半包 JSON，跳过
            }
            if (evt.type === "stage" && evt.message) {
              // 扫描阶段事件（/api/analyze）：驱动 ScanMonitor 日志与进度
              prog = typeof evt.progress === "number" ? evt.progress : prog;
              setProgress(prog);
              setStageLines((lines) => [...lines, evt.message as string]);
            } else if (evt.type === "delta" && evt.text) {
              if (prog < 72) {
                prog = 72; // 正文开始流出 → 进度推进到推理阶段
                setProgress(prog);
              }
              acc += evt.text;
              setOutput(acc);
            } else if (evt.type === "error") {
              throw new Error(evt.error || r.interrupted);
            }
          }
        }

        if (acc.trim().length === 0) {
          setOutput(null);
          throw new Error(r.incomplete);
        }
        setProgress(100);
        // 完成记录：埋点 + 本地历史（历史容量与输出截断防止 localStorage 膨胀）
        track(tool.isAnalyzer ? "scan_complete" : "tool_complete", {
          tool: tool.slug,
          meta: `${acc.length} 字`,
        });
        setHistory(
          appendHistory(tool.slug, {
            ts: Date.now(),
            values: payload,
            output: acc.slice(0, HISTORY_OUTPUT_CAP),
            chars: acc.length,
          })
        );
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : r.runFailed;
        track(tool.isAnalyzer ? "scan_fail" : "tool_error", {
          tool: tool.slug,
          meta: msg.slice(0, 80),
        });
        setError(msg);
        setOutput((prev) =>
          prev !== null && prev.trim().length >= 100 ? prev : null
        );
      } finally {
        setStreaming(false);
      }
    },
    [tool.endpoint, tool.isAnalyzer, r]
  );

  /* ---------- 门控执行：localStorage 记账 ---------- */
  const runWithGate = useCallback(
    (payload: Record<string, string>) => {
      const unlockedMap = readJsonMap<boolean>(UNLOCKED_KEY);
      if (unlockedMap[tool.slug]) {
        setUnlocked(true);
        void runInput(payload);
        return;
      }
      const usageMap = readJsonMap<number>(USAGE_KEY);
      setUsage(usageMap);
      setUnlocked(false);
      const count = usageMap[tool.slug] ?? 0;
      if (count >= FREE_RUNS_PER_TOOL) {
        // 第 3 次：弹解锁弹窗，解锁成功后自动续跑
        track("unlock_modal", { tool: tool.slug });
        pendingRunRef.current = payload;
        setDialogOpen(true);
        return;
      }
      const next: UsageMap = { ...usageMap, [tool.slug]: count + 1 };
      writeJsonMap(USAGE_KEY, next);
      setUsage(next);
      void runInput(payload);
    },
    [tool.slug, runInput]
  );

  /* ---------- 挂载：读 localStorage + ?url= 预填/自动跑 ---------- */
  useEffect(() => {
    if (autoStartedRef.current) return;
    autoStartedRef.current = true;

    setUsage(readJsonMap<number>(USAGE_KEY));
    setUnlocked(!!readJsonMap<boolean>(UNLOCKED_KEY)[tool.slug]);
    setHistory(readHistory(tool.slug));

    const url = new URLSearchParams(window.location.search).get("url");
    if (!tool.isAnalyzer || !url) return;

    const norm = normalizeUrl(url);
    if (isValidUrl(norm)) {
      setValues((v) => ({ ...v, url: norm }));
      runWithGate({ url: norm });
    } else {
      setValues((v) => ({ ...v, url }));
    }
  }, [tool.slug, tool.isAnalyzer, runWithGate]);

  /* ---------- 提交 ---------- */
  const startRun = () => {
    if (streaming) return;
    const missing = tool.fields.filter(
      (f) => !f.optional && !(values[f.id] ?? "").trim()
    );
    if (missing.length > 0) {
      setInlineError(r.fillRequired);
      return;
    }

    let payload: Record<string, string> = Object.fromEntries(
      tool.fields.map((f) => [f.id, (values[f.id] ?? "").trim()])
    );
    if (tool.isAnalyzer) {
      const norm = normalizeUrl(payload.url);
      if (!isValidUrl(norm)) {
        setInlineError(r.invalidUrl);
        return;
      }
      payload = { url: norm };
      setValues((v) => ({ ...v, url: norm }));
    }
    runWithGate(payload);
  };

  /* ---------- 解锁提交 ---------- */
  const handleUnlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (unlockSubmitting) return;
    const email = unlockEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: r.emailInvalid,
        description: r.emailInvalidDesc,
        variant: "destructive",
      });
      return;
    }

    setUnlockSubmitting(true);
    try {
      // 首选公共线索接口（source: "tools"）；若枚举校验拒绝 → 回落专用解锁接口
      const leadBody = {
        name: r.unlockLeadName,
        contact: email,
        source: "tools",
        message: tpl(r.unlockLeadMsg, { slug: tool.slug }),
      };
      let ok = false;
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadBody),
        });
        ok = res.ok;
      } catch {
        /* 网络错误 → 走回落 */
      }
      if (!ok) {
        const res2 = await fetch("/api/tools/unlock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, slug: tool.slug }),
        });
        if (!res2.ok) {
          let msg = r.submitFail;
          try {
            const j = await res2.json();
            if (j?.error) msg = j.error;
          } catch {
            /* 非 JSON 错误体 */
          }
          throw new Error(msg);
        }
      }

      const map = readJsonMap<boolean>(UNLOCKED_KEY);
      map[tool.slug] = true;
      writeJsonMap(UNLOCKED_KEY, map);
      setUnlocked(true);
      track("unlock_success", { tool: tool.slug });
      toast({
        title: r.toastUnlocked,
        description: r.toastUnlockedDesc,
      });
      setDialogOpen(false);
      setUnlockEmail("");
      const pending = pendingRunRef.current;
      pendingRunRef.current = null;
      if (pending) void runInput(pending);
    } catch (err) {
      toast({
        title: r.unlockFail,
        description:
          err instanceof Error
            ? err.message
            : r.unlockFailHint,
        variant: "destructive",
      });
    } finally {
      setUnlockSubmitting(false);
    }
  };

  /* ---------- 复制结果 ---------- */
  const copyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast({
        title: tool.isAnalyzer ? r.copiedAnalysisToast : r.copiedResultToast,
        description: r.copyHint,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: r.copyFail,
        description: r.copyFailHint,
        variant: "destructive",
      });
    }
  };

  const freeCount = usage?.[tool.slug] ?? 0;
  const remaining = Math.max(0, FREE_RUNS_PER_TOOL - freeCount);
  const outputLabel = tool.isAnalyzer ? r.copyAnalysis : r.copyResult;

  return (
    <div>
      {/* 输入表单 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          startRun();
        }}
        className="rounded-2xl border border-[#2A2A2A] bg-bhai-card p-6 sm:p-8 space-y-5"
      >
        {lt.fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={`tool-${field.id}`}
              className="block text-sm font-medium text-foreground mb-2"
            >
              {field.label}
              {field.optional && (
                <span className="ml-1.5 font-normal text-bhai-dim">{r.optional}</span>
              )}
            </label>
            <input
              id={`tool-${field.id}`}
              name={field.id}
              type={field.type === "url" ? "url" : "text"}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              value={values[field.id] ?? ""}
              onChange={(e) =>
                setValues((v) => ({ ...v, [field.id]: e.target.value }))
              }
              disabled={streaming}
              autoComplete={field.type === "url" ? "url" : "off"}
              className="w-full rounded-lg border border-[#2A2A2A] bg-bhai-bg px-4 py-3 text-base text-foreground placeholder:text-bhai-dim input-focus disabled:opacity-50"
            />
          </div>
        ))}

        {inlineError && (
          <p role="alert" className="text-xs text-red-400">
            {inlineError}
          </p>
        )}

        <div className="pt-1 space-y-3">
          <button
            type="submit"
            disabled={streaming}
            className="cta-primary w-full rounded-md px-6 py-3 text-sm font-medium text-white inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
          >
            {streaming ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                {tool.isAnalyzer ? r.scanning : r.generating}
              </>
            ) : (
              <>
                <Icon className="h-4 w-4" aria-hidden="true" />
                {lt.ctaText}
              </>
            )}
          </button>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-[10px] text-bhai-dim tracking-wider">
              {lt.outputHint}
            </p>
            {unlocked ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-bhai-red/40 bg-bhai-red/10 px-2.5 py-0.5 font-mono text-[10px] text-bhai-red shrink-0">
                {r.unlockedBadge}
              </span>
            ) : (
              usage !== null && (
                <span className="font-mono text-[10px] text-bhai-dim shrink-0">
                  {remaining > 0
                    ? tpl(r.runsLeft, { n: remaining })
                    : r.quotaUsed}
                </span>
              )
            )}
          </div>
        </div>
      </form>

      {/* 扫描监视器（仅网站分析器）：目标站截图 + 向下滚动 + 扫描线动画 + 阶段日志 */}
      {tool.isAnalyzer && (
        <div className="mt-6">
          <ScanMonitor
            key={runId}
            url={scanUrl}
            active={streaming}
            done={!streaming && output !== null && !error}
            failed={!streaming && error !== null}
            stageLines={stageLines}
            progress={progress}
          />
        </div>
      )}

      {/* 错误提示（保留部分输出时与面板并存） */}
      {error && (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      {/* 终端风格输出面板 */}
      {(output !== null || streaming) && (
        <div
          id="tool-output"
          className={`mt-4 rounded-lg border border-[#2A2A2A] bg-black overflow-hidden ${
            streaming ? "red-glow" : ""
          }`}
        >
          {/* 假终端栏 */}
          <div className="flex items-center gap-2 border-b border-[#2A2A2A] bg-[#111110] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" aria-hidden="true" />
            <span
              className="ml-3 font-mono text-xs text-bhai-dim truncate"
              aria-hidden="true"
            >
              {tool.isAnalyzer
                ? values.url || "https://…"
                : `bhai://tools/${tool.slug}`}
            </span>
            <span
              className="ml-auto shrink-0 font-mono text-[10px] text-bhai-muted tabular-nums"
              aria-live="polite"
            >
              {streaming
                ? `${output?.length ?? 0}${r.charUnit} · ${r.generatingTag}`
                : `${output?.length ?? 0}${r.charUnit}`}
            </span>
            {!streaming && output && (
              <span
                className="hidden shrink-0 rounded-full border border-bhai-red/40 bg-bhai-red/10 px-2 py-0.5 font-mono text-[9px] tracking-widest text-bhai-red sm:inline-flex"
                title={r.langBadgeTitle}
              >
                {locale.toUpperCase()} REPORT
              </span>
            )}
            {!streaming && output && (
              <button
                type="button"
                onClick={() => void copyOutput()}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-md border border-[#2A2A2A] bg-bhai-card px-2.5 py-1 text-[11px] text-bhai-muted transition-colors hover:border-bhai-red hover:text-bhai-red"
                aria-label={outputLabel}
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-bhai-red" aria-hidden="true" />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {copied ? r.copied : outputLabel}
              </button>
            )}
          </div>

          {/* 流式 Markdown 输出 */}
          <div
            className="p-4 font-mono text-sm max-h-[560px] overflow-y-auto admin-scrollbar"
            role="log"
            aria-label={r.outputAria}
          >
            <div className="roadmap-markdown">
              <Markdown remarkPlugins={[remarkGfm]}>{output ?? ""}</Markdown>
              {streaming && <span className="stream-cursor" aria-hidden="true" />}
            </div>
          </div>
        </div>
      )}

      {/* 最近生成（本地历史，最多 5 条）：点击回填输入与输出 */}
      {history.length > 0 && (
        <div className="mt-4 rounded-lg border border-[#2A2A2A] bg-bhai-card overflow-hidden">
          <button
            type="button"
            onClick={() => setHistoryOpen((o) => !o)}
            aria-expanded={historyOpen}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-left transition-colors hover:bg-white/[0.03]"
          >
            <History className="h-3.5 w-3.5 text-bhai-red" aria-hidden="true" />
            <span className="font-mono text-[11px] tracking-widest text-bhai-dim">
              {r.history} · {history.length}
            </span>
            <ChevronDown
              className={`ml-auto h-3.5 w-3.5 text-bhai-dim transition-transform ${historyOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
          {historyOpen && (
            <ul className="border-t border-[#2A2A2A] divide-y divide-[#1F1F1F] max-h-72 overflow-y-auto admin-scrollbar">
              {history.map((h) => {
                const primary =
                  h.values.url ||
                  Object.values(h.values).find((v) => v.trim()) ||
                  r.historyEmpty;
                return (
                  <li key={h.ts}>
                    <button
                      type="button"
                      onClick={() => {
                        setValues((v) => ({ ...v, ...h.values }));
                        setOutput(h.output);
                        setError(null);
                        setHistoryOpen(false);
                        window.scrollTo({
                          top: (document.getElementById("tool-output")?.offsetTop ?? 0) - 80,
                          behavior: "smooth",
                        });
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
                    >
                      <span className="font-mono text-[10px] text-bhai-dim tabular-nums shrink-0">
                        {fmtTime(h.ts)}
                      </span>
                      <span className="text-xs text-bhai-muted truncate flex-1">
                        {primary}
                      </span>
                      <span className="font-mono text-[10px] text-bhai-dim tabular-nums shrink-0">
                        {h.chars}{r.charUnit}
                      </span>
                    </button>
                  </li>
                );
              })}
              <li>
                <button
                  type="button"
                  onClick={() => setHistory(clearHistory(tool.slug))}
                  className="w-full flex items-center gap-2 px-4 py-2 text-left text-[11px] text-bhai-dim transition-colors hover:text-red-400"
                >
                  <Trash2 className="h-3 w-3" aria-hidden="true" /> {r.clearHistory}
                </button>
              </li>
            </ul>
          )}
        </div>
      )}

      {/* 解锁弹窗（第 3 次运行触发） */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!unlockSubmitting) setDialogOpen(open);
        }}
      >
        <DialogContent className="card-sheen relative overflow-hidden bg-bhai-card border-[#2A2A2A] sm:max-w-md">
          {/* 顶部橙色强调线 + hover 扫光（与工具卡视觉语言一致） */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-bhai-red to-transparent opacity-80"
          />
          <DialogHeader>
            <div className="font-mono text-[10px] tracking-widest text-bhai-red">
              {r.gateKicker}
            </div>
            <DialogTitle className="text-xl font-bold text-foreground text-left">
              {r.gateTitle}
            </DialogTitle>
            <DialogDescription className="text-sm text-bhai-muted text-left">
              {r.gateDesc}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => void handleUnlockSubmit(e)}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="unlock-email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {r.emailLabel}
              </label>
              <input
                id="unlock-email"
                type="email"
                required
                placeholder="ceo@yourbrand.com"
                autoComplete="email"
                value={unlockEmail}
                onChange={(e) => setUnlockEmail(e.target.value)}
                className="w-full rounded-lg border border-[#2A2A2A] bg-bhai-bg px-4 py-3 text-base text-foreground placeholder:text-bhai-dim input-focus"
              />
            </div>
            <button
              type="submit"
              disabled={unlockSubmitting}
              className="cta-primary w-full rounded-md px-6 py-3 text-sm font-medium text-white inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
            >
              {unlockSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  {r.submitting}
                </>
              ) : (
                r.gateSubmit
              )}
            </button>
            <p className="text-[11px] text-bhai-dim leading-relaxed">
              {r.gateConsent}
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
