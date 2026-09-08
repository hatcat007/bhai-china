"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Database,
  Inbox,
  Loader2,
  Mail,
  RefreshCw,
  Trash2,
  Users,
  Compass,
  CalendarClock,
  Eye,
  Copy,
  Check,
  FileText,
  Download,
  LogOut,
  TrendingUp,
  BarChart3,
  Activity,
  Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

type Lead = {
  id: string;
  name: string;
  contact: string;
  brand: string | null;
  revenueRange: string | null;
  stage: string | null;
  painPoint: string | null;
  chinaPresence: string | null;
  message: string | null;
  roadmapMd: string | null;
  source: string;
  status: string;
  createdAt: string;
};

type Subscriber = { id: string; email: string; createdAt: string };

type Overview = {
  ok: boolean;
  stats: {
    totalLeads: number;
    bookingCount: number;
    roadmapCount: number;
    subscriberCount: number;
    statusCount: Record<string, number>;
  };
  leads: Lead[];
  subscribers: Subscriber[];
};

const STATUS_OPTIONS = ["new", "contacted", "qualified", "closed"] as const;
const STATUS_LABEL: Record<string, string> = {
  new: "新线索",
  contacted: "已联系",
  qualified: "已验证",
  closed: "已关闭",
};
const STATUS_STYLE: Record<string, string> = {
  new: "border-bhai-red/50 bg-bhai-red/10 text-bhai-red",
  contacted: "border-yellow-600/50 bg-yellow-600/10 text-yellow-500",
  qualified: "border-emerald-600/50 bg-emerald-600/10 text-emerald-500",
  closed: "border-[#2A2A2A] bg-[#1A1A1A] text-bhai-dim",
};
const SOURCE_LABEL: Record<string, string> = {
  booking: "预约",
  roadmap: "路线图",
  tools: "工具",
};
const SOURCE_STYLE: Record<string, string> = {
  booking: "border-bhai-red/40 text-bhai-red",
  roadmap: "border-sky-700/50 text-sky-400",
  tools: "border-emerald-700/50 text-emerald-400",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function AdminPage() {
  const { toast } = useToast();
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [detailLead, setDetailLead] = useState<Lead | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = async (key: string, text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      toast({ title: `${label}已复制` });
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      toast({ title: "复制失败", description: "请手动选择复制", variant: "destructive" });
    }
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/overview", { cache: "no-store" });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "加载失败");
      setData(json);
    } catch (err) {
      toast({
        title: "加载失败",
        description: err instanceof Error ? err.message : "请刷新重试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    const prev = data;
    // 乐观更新
    setData((d) =>
      d
        ? {
            ...d,
            leads: d.leads.map((l) => (l.id === id ? { ...l, status } : l)),
            stats: {
              ...d.stats,
              statusCount: {
                ...d.stats.statusCount,
                [status]: (d.stats.statusCount[status] ?? 0) + 1,
              },
            },
          }
        : d
    );
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "更新失败");
    } catch (err) {
      setData(prev);
      toast({
        title: "状态更新失败",
        description: err instanceof Error ? err.message : "请重试",
        variant: "destructive",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteLead = async (id: string) => {
    const prev = data;
    setData((d) =>
      d ? { ...d, leads: d.leads.filter((l) => l.id !== id) } : d
    );
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "删除失败");
      toast({ title: "线索已删除" });
    } catch (err) {
      setData(prev);
      toast({
        title: "删除失败",
        description: err instanceof Error ? err.message : "请重试",
        variant: "destructive",
      });
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
    } finally {
      window.location.href = "/admin/login";
    }
  };

  const downloadCsv = (
    filename: string,
    header: string[],
    rows: (string | null)[][]
  ) => {
    const esc = (v: string | null) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv =
      "\uFEFF" +
      [header, ...rows].map((r) => r.map(esc).join(",")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast({ title: `已导出 ${filename}` });
  };

  const exportLeadsCsv = () => {
    if (!data) return;
    downloadCsv(
      `bhai-leads-${new Date().toISOString().slice(0, 10)}.csv`,
      [
        "姓名",
        "联系方式",
        "品牌",
        "营收区间",
        "阶段",
        "痛点",
        "中国业务",
        "留言",
        "来源",
        "状态",
        "创建时间",
      ],
      data.leads.map((l) => [
        l.name,
        l.contact,
        l.brand,
        l.revenueRange,
        l.stage,
        l.painPoint,
        l.chinaPresence,
        l.message,
        SOURCE_LABEL[l.source] ?? l.source,
        STATUS_LABEL[l.status] ?? l.status,
        new Date(l.createdAt).toLocaleString("zh-CN"),
      ])
    );
  };

  const exportSubscribersCsv = () => {
    if (!data) return;
    downloadCsv(
      `bhai-subscribers-${new Date().toISOString().slice(0, 10)}.csv`,
      ["邮箱", "订阅时间"],
      data.subscribers.map((s) => [
        s.email,
        new Date(s.createdAt).toLocaleString("zh-CN"),
      ])
    );
  };

  const filteredLeads = useMemo(() => {
    if (!data) return [];
    return data.leads.filter(
      (l) =>
        (filter === "all" || l.status === filter) &&
        (sourceFilter === "all" || l.source === sourceFilter)
    );
  }, [data, filter, sourceFilter]);

  // 近 14 天线索趋势（按天聚合）
  const trend = useMemo(() => {
    if (!data) return [];
    const days: { label: string; count: number }[] = [];
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const next = new Date(d);
      next.setDate(d.getDate() + 1);
      const count = data.leads.filter((l) => {
        const t = new Date(l.createdAt);
        return t >= d && t < next;
      }).length;
      days.push({ label: `${d.getMonth() + 1}/${d.getDate()}`, count });
    }
    return days;
  }, [data]);

  const trendMax = Math.max(1, ...trend.map((d) => d.count));

  // 状态分布
  const statusDist = useMemo(() => {
    if (!data) return [];
    const total = data.stats.totalLeads || 1;
    return STATUS_OPTIONS.map((s) => ({
      key: s,
      label: STATUS_LABEL[s],
      count: data.stats.statusCount[s] ?? 0,
      pct: Math.round(((data.stats.statusCount[s] ?? 0) / total) * 100),
    }));
  }, [data]);

  return (
    <main className="min-h-screen bg-bhai-bg text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs text-bhai-red tracking-widest mb-2">
              [ BHAI // CONTROL CENTER ]
            </div>
            <h1 className="font-sans text-3xl font-bold tracking-tight">
              线索管理台
            </h1>
            <p className="text-sm text-bhai-muted mt-1">
              预约请求 + AI 路线图线索 + 订阅用户 · 仅 Buster 可见
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={exportLeadsCsv}
              disabled={!data}
              className="inline-flex items-center gap-2 rounded-md border border-[#2A2A2A] bg-bhai-card px-4 py-2.5 text-sm font-medium text-foreground hover:border-bhai-red transition-colors disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              导出线索
            </button>
            <button
              onClick={exportSubscribersCsv}
              disabled={!data}
              className="inline-flex items-center gap-2 rounded-md border border-[#2A2A2A] bg-bhai-card px-4 py-2.5 text-sm font-medium text-foreground hover:border-bhai-red transition-colors disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              订阅 CSV
            </button>
            <button
              onClick={() => void load()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-md border border-[#2A2A2A] bg-bhai-card px-4 py-2.5 text-sm font-medium text-foreground hover:border-bhai-red transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              刷新
            </button>
            <button
              onClick={() => void logout()}
              className="inline-flex items-center gap-2 rounded-md border border-red-900/40 bg-transparent px-4 py-2.5 text-sm font-medium text-red-400 hover:border-red-500 hover:bg-red-950/30 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              退出
            </button>
          </div>
        </div>

        {loading && !data ? (
          <div className="flex items-center justify-center py-32 text-bhai-muted">
            <Loader2 className="h-6 w-6 animate-spin mr-3" /> 加载中…
          </div>
        ) : data ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: Inbox,
                  label: "总线索",
                  value: data.stats.totalLeads,
                  sub: `新增待跟进 ${data.stats.statusCount.new ?? 0}`,
                },
                {
                  icon: CalendarClock,
                  label: "预约请求",
                  value: data.stats.bookingCount,
                  sub: "来自 /book 表单",
                },
                {
                  icon: Compass,
                  label: "路线图线索",
                  value: data.stats.roadmapCount,
                  sub: "来自 /ai-roadmap",
                },
                {
                  icon: Users,
                  label: "订阅用户",
                  value: data.stats.subscriberCount,
                  sub: "月度洞察列表",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-5"
                >
                  <s.icon className="h-4 w-4 text-bhai-red mb-3" />
                  <div className="font-sans text-3xl font-bold stat-highlight tabular-nums">
                    {s.value}
                  </div>
                  <div className="text-sm text-foreground mt-1">{s.label}</div>
                  <div className="font-mono text-[10px] text-bhai-dim tracking-wider mt-1">
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Charts：14 天趋势 + 状态分布 */}
            <div className="grid lg:grid-cols-2 gap-4 mb-8">
              <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-bhai-red" />
                    <span className="font-mono text-[10px] text-bhai-muted tracking-widest">
                      近 14 天线索趋势
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-bhai-dim">
                    峰值 {trendMax} 条/天
                  </span>
                </div>
                <div className="flex items-end gap-1.5 h-24">
                  {trend.map((d, i) => (
                    <div
                      key={d.label}
                      title={`${d.label}：${d.count} 条线索`}
                      className="flex-1 h-full flex flex-col justify-end items-center gap-1.5 group cursor-default"
                    >
                      <div
                        className="w-full trend-bar"
                        style={{
                          height: `${Math.max(
                            3,
                            Math.round((d.count / trendMax) * 64)
                          )}px`,
                          opacity: d.count === 0 ? 0.25 : 1,
                        }}
                      />
                      <span
                        className={`text-[9px] text-bhai-dim font-mono leading-none group-hover:text-bhai-red transition-colors ${
                          i % 2 !== 0 ? "hidden sm:inline" : ""
                        }`}
                      >
                        {d.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-4 w-4 text-bhai-red" />
                  <span className="font-mono text-[10px] text-bhai-muted tracking-widest">
                    线索状态分布
                  </span>
                </div>
                <div className="space-y-3.5">
                  {statusDist.map((s) => (
                    <div key={s.key}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-bhai-muted">{s.label}</span>
                        <span className="font-mono text-bhai-dim tabular-nums">
                          {s.count} · {s.pct}%
                        </span>
                      </div>
                      <div className="dist-bar-track">
                        <div
                          className="dist-bar-fill"
                          style={{ width: `${s.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 增长漏斗：扫描/工具使用/解锁转化（轻量埋点） */}
            <FunnelCard />

            {/* 邮件发件队列：EmailOutbox 台账 + SMTP flush */}
            <OutboxCard />

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="font-mono text-[10px] text-bhai-dim tracking-widest mr-1">
                状态
              </span>
              {["all", ...STATUS_OPTIONS].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    filter === s
                      ? "border-bhai-red bg-bhai-red/10 text-bhai-red"
                      : "border-[#2A2A2A] bg-transparent text-bhai-muted hover:text-foreground"
                  }`}
                >
                  {s === "all" ? "全部" : STATUS_LABEL[s]}
                  {s !== "all" && data.stats.statusCount[s] !== undefined && (
                    <span className="ml-1.5 opacity-70">
                      {data.stats.statusCount[s]}
                    </span>
                  )}
                </button>
              ))}
              <span className="font-mono text-[10px] text-bhai-dim tracking-widest mx-1 ml-4">
                来源
              </span>
              {[
                { v: "all", label: "全部" },
                { v: "booking", label: "预约" },
                { v: "roadmap", label: "路线图" },
                { v: "tools", label: "工具" },
              ].map((s) => (
                <button
                  key={s.v}
                  onClick={() => setSourceFilter(s.v)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    sourceFilter === s.v
                      ? "border-bhai-red bg-bhai-red/10 text-bhai-red"
                      : "border-[#2A2A2A] bg-transparent text-bhai-muted hover:text-foreground"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Leads table */}
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card overflow-hidden mb-10">
              <div className="max-h-[520px] overflow-y-auto admin-scrollbar">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-[#141414] border-b border-[#2A2A2A] z-10">
                    <tr className="font-mono text-[10px] tracking-widest text-bhai-muted">
                      <th className="text-left font-medium px-4 py-3">线索</th>
                      <th className="text-left font-medium px-4 py-3 hidden md:table-cell">
                        品牌 / 详情
                      </th>
                      <th className="text-left font-medium px-4 py-3 hidden lg:table-cell">
                        痛点
                      </th>
                      <th className="text-left font-medium px-4 py-3">状态</th>
                      <th className="text-right font-medium px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-12 text-center text-bhai-dim"
                        >
                          没有符合条件的线索
                        </td>
                      </tr>
                    )}
                    {filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="border-b border-[#1A1A1A] hover:bg-[#141414] transition-colors cursor-pointer"
                        onClick={() => setDetailLead(lead)}
                      >
                        <td className="px-4 py-3 align-top">
                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded border px-1.5 py-0.5 font-mono text-[9px] tracking-wider ${
                                SOURCE_STYLE[lead.source] ?? "border-[#2A2A2A] text-bhai-dim"
                              }`}
                            >
                              {SOURCE_LABEL[lead.source] ?? lead.source}
                            </span>
                            <span className="font-medium text-foreground">
                              {lead.name}
                            </span>
                            {lead.roadmapMd && (
                              <span
                                className="inline-flex items-center gap-0.5 rounded border border-bhai-red/30 bg-bhai-red/10 px-1 py-px font-mono text-[8px] tracking-wider text-bhai-red"
                                title="已生成完整路线图，点击查看"
                              >
                                <FileText className="h-2.5 w-2.5" /> 路线图
                              </span>
                            )}
                            <Eye className="h-3 w-3 text-bhai-dim ml-auto" aria-hidden />
                          </div>
                          <div className="text-xs text-bhai-muted mt-1">
                            {lead.contact}
                          </div>
                          <div className="font-mono text-[10px] text-bhai-dim mt-0.5">
                            {formatDate(lead.createdAt)}
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top hidden md:table-cell">
                          <div className="text-xs text-foreground">
                            {lead.brand || "—"}
                          </div>
                          <div className="text-[11px] text-bhai-dim mt-0.5">
                            {[lead.revenueRange, lead.chinaPresence]
                              .filter(Boolean)
                              .join(" · ") || "—"}
                          </div>
                          {lead.message && (
                            <div className="text-[11px] text-bhai-muted mt-1 max-w-[240px] truncate" title={lead.message}>
                              “{lead.message}”
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 align-top hidden lg:table-cell">
                          <span className="text-xs text-bhai-muted">
                            {lead.painPoint || lead.stage || "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <select
                            value={lead.status}
                            disabled={updatingId === lead.id}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>
                              void updateStatus(lead.id, e.target.value)
                            }
                            className={`rounded border px-2 py-1 text-xs font-medium bg-transparent outline-none cursor-pointer disabled:opacity-50 ${STATUS_STYLE[lead.status] ?? ""}`}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s} className="bg-[#1A1A1A] text-foreground">
                                {STATUS_LABEL[s]}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3 align-top text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDetailLead(lead);
                              }}
                              aria-label={`查看线索 ${lead.name} 详情`}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-bhai-dim hover:text-bhai-red hover:bg-bhai-red/10 transition-colors"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                void deleteLead(lead.id);
                              }}
                              aria-label={`删除线索 ${lead.name}`}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-bhai-dim hover:text-red-400 hover:bg-red-400/10 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Subscribers */}
            <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-4 w-4 text-bhai-red" />
                <h2 className="font-sans text-base font-bold">
                  月度洞察订阅
                </h2>
                <span className="font-mono text-[10px] text-bhai-dim tracking-widest">
                  {data.stats.subscriberCount} 人
                </span>
              </div>
              {data.subscribers.length === 0 ? (
                <p className="text-sm text-bhai-dim py-4">还没有订阅者</p>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-48 overflow-y-auto admin-scrollbar">
                  {data.subscribers.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between rounded-lg border border-[#1A1A1A] bg-bhai-bg px-3 py-2"
                    >
                      <span className="text-xs text-foreground truncate">
                        {s.email}
                      </span>
                      <span className="font-mono text-[9px] text-bhai-dim shrink-0 ml-2">
                        {formatDate(s.createdAt)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="flex items-center gap-2 font-mono text-[10px] text-bhai-dim tracking-wider mt-8">
              <Database className="h-3 w-3" />
              SQLITE · PRISMA · 数据仅存本地 · 上线前需为 /admin 加鉴权
            </p>
          </>
        ) : null}
      </div>

      {/* ============ 线索详情抽屉 ============ */}
      <Sheet open={!!detailLead} onOpenChange={(open) => !open && setDetailLead(null)}>
        <SheetContent
          side="right"
          className="w-full max-w-md sm:max-w-lg bg-bhai-bg border-l border-[#2A2A2A] overflow-y-auto admin-scrollbar p-0"
        >
          {detailLead && (
            <>
              <SheetHeader className="px-6 pt-6 pb-4 border-b border-[#2A2A2A] bg-bhai-card">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`rounded border px-1.5 py-0.5 font-mono text-[9px] tracking-wider ${
                      SOURCE_STYLE[detailLead.source] ?? "border-[#2A2A2A] text-bhai-dim"
                    }`}
                  >
                    {SOURCE_LABEL[detailLead.source] ?? detailLead.source}
                  </span>
                  <span
                    className={`rounded border px-1.5 py-0.5 font-mono text-[9px] tracking-wider ${STATUS_STYLE[detailLead.status] ?? ""}`}
                  >
                    {STATUS_LABEL[detailLead.status] ?? detailLead.status}
                  </span>
                  <span className="font-mono text-[10px] text-bhai-dim ml-auto">
                    {formatDate(detailLead.createdAt)}
                  </span>
                </div>
                <SheetTitle className="font-sans text-xl font-bold text-foreground text-left">
                  {detailLead.name}
                  {detailLead.brand && (
                    <span className="text-bhai-muted text-sm font-normal ml-2">
                      · {detailLead.brand}
                    </span>
                  )}
                </SheetTitle>
                <SheetDescription className="sr-only">
                  线索 {detailLead.name} 的完整资料与路线图
                </SheetDescription>
              </SheetHeader>

              <div className="px-6 py-5 space-y-5">
                {/* 联系方式 */}
                <div className="rounded-lg border border-[#2A2A2A] bg-bhai-card p-4">
                  <div className="font-mono text-[10px] text-bhai-dim tracking-widest mb-2">
                    联系方式
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-foreground font-mono break-all">
                      {detailLead.contact}
                    </span>
                    <button
                      onClick={() => void copyText("contact", detailLead.contact, "联系方式")}
                      aria-label="复制联系方式"
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#2A2A2A] text-bhai-muted hover:border-bhai-red hover:text-bhai-red transition-colors"
                    >
                      {copiedKey === "contact" ? (
                        <Check className="h-3.5 w-3.5 text-bhai-red" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* 四维画像 */}
                <dl className="grid grid-cols-2 gap-3">
                  {[
                    { label: "年营收区间", value: detailLead.revenueRange },
                    { label: "数字化阶段", value: detailLead.stage },
                    { label: "最痛痛点", value: detailLead.painPoint },
                    { label: "中国业务", value: detailLead.chinaPresence },
                  ].map((f) => (
                    <div
                      key={f.label}
                      className="rounded-lg border border-[#2A2A2A] bg-bhai-card p-3"
                    >
                      <dt className="font-mono text-[9px] text-bhai-dim tracking-widest mb-1.5">
                        {f.label}
                      </dt>
                      <dd className="text-xs text-foreground leading-relaxed">
                        {f.value || "—"}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* 留言 */}
                {detailLead.message && (
                  <div className="rounded-lg border border-[#2A2A2A] bg-bhai-card p-4">
                    <div className="font-mono text-[10px] text-bhai-dim tracking-widest mb-2">
                      留言
                    </div>
                    <p className="text-sm text-bhai-text leading-relaxed">
                      “{detailLead.message}”
                    </p>
                  </div>
                )}

                {/* 状态流转（抽屉内也可改） */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-bhai-dim tracking-widest">
                    状态流转
                  </span>
                  <select
                    value={detailLead.status}
                    disabled={updatingId === detailLead.id}
                    onChange={(e) => {
                      void updateStatus(detailLead.id, e.target.value);
                      setDetailLead({ ...detailLead, status: e.target.value });
                    }}
                    className={`rounded border px-2 py-1.5 text-xs font-medium bg-transparent outline-none cursor-pointer disabled:opacity-50 ${STATUS_STYLE[detailLead.status] ?? ""}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s} className="bg-[#1A1A1A] text-foreground">
                        {STATUS_LABEL[s]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* AI 路线图 */}
                {detailLead.roadmapMd ? (
                  <div className="rounded-lg border border-bhai-red/30 bg-bhai-card overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A] bg-bhai-red/5">
                      <div className="flex items-center gap-2">
                        <FileText className="h-3.5 w-3.5 text-bhai-red" />
                        <span className="font-mono text-[10px] text-bhai-red tracking-widest">
                          [ BHAI 完整路线图 · {detailLead.roadmapMd.length} 字符 ]
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          void copyText("roadmap", detailLead.roadmapMd ?? "", "完整路线图")
                        }
                        className="inline-flex items-center gap-1.5 rounded-md border border-bhai-red/40 px-2 py-1 text-[10px] font-medium text-bhai-red hover:bg-bhai-red/10 transition-colors"
                      >
                        {copiedKey === "roadmap" ? (
                          <>
                            <Check className="h-3 w-3" /> 已复制
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> 复制全文
                          </>
                        )}
                      </button>
                    </div>
                    <div className="roadmap-markdown max-h-[420px] overflow-y-auto admin-scrollbar px-4 py-4">
                      <Markdown remarkPlugins={[remarkGfm]}>
                        {detailLead.roadmapMd}
                      </Markdown>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-[#2A2A2A] p-4 text-center">
                    <p className="text-xs text-bhai-dim">
                      该线索暂未生成 AI 路线图
                      {detailLead.source === "booking" && "（预约线索可直接沟通后补录）"}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </main>
  );
}

/* ---------- 增长漏斗卡片：扫描/工具使用/解锁转化（近 7 天） ---------- */

type FunnelData = {
  events: { name: string; count: number }[];
  byTool: { tool: string; count: number }[];
  daily: { date: string; count: number }[];
  recent: { name: string; tool: string | null; meta: string | null; createdAt: string }[];
};

const FUNNEL_LABEL: Record<string, string> = {
  scan_start: "扫描启动",
  scan_complete: "扫描完成",
  scan_fail: "扫描失败",
  tool_start: "工具运行",
  tool_complete: "工具完成",
  tool_error: "工具报错",
  unlock_modal: "弹解锁框",
  unlock_success: "解锁成功",
  shot_fallback: "截图降级",
};

// 漏斗主链路展示顺序
const FUNNEL_ORDER = [
  "scan_start",
  "scan_complete",
  "tool_start",
  "tool_complete",
  "unlock_modal",
  "unlock_success",
  "tool_error",
  "scan_fail",
  "shot_fallback",
];

function FunnelCard() {
  const [data, setData] = useState<FunnelData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/funnel", { cache: "no-store" });
      if (res.ok) setData((await res.json()) as FunnelData);
    } catch {
      /* 静默：卡片显示空态 */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const eventMap = new Map((data?.events ?? []).map((e) => [e.name, e.count]));
  const starts =
    (eventMap.get("scan_start") ?? 0) + (eventMap.get("tool_start") ?? 0);
  const unlocks = eventMap.get("unlock_success") ?? 0;
  const conv = starts > 0 ? Math.round((unlocks / starts) * 100) : 0;
  const completes =
    (eventMap.get("scan_complete") ?? 0) + (eventMap.get("tool_complete") ?? 0);
  const completeRate = starts > 0 ? Math.round((completes / starts) * 100) : 0;
  const dailyMax = Math.max(1, ...(data?.daily ?? []).map((d) => d.count));

  return (
    <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-5 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-bhai-red" />
          <span className="font-mono text-[10px] text-bhai-muted tracking-widest">
            增长漏斗 · 近 7 天（工具使用 → 解锁转化）
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] text-bhai-dim tabular-nums">
            完成率 {completeRate}% · 解锁率 {conv}%
          </span>
          <button
            onClick={() => void load()}
            className="text-bhai-dim transition-colors hover:text-bhai-red"
            aria-label="刷新漏斗数据"
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {loading && !data ? (
        <div className="flex items-center justify-center py-10 text-bhai-muted text-sm">
          <Loader2 className="h-4 w-4 animate-spin mr-2" /> 加载漏斗数据…
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* 事件计数 */}
          <div className="space-y-2.5">
            {FUNNEL_ORDER.filter((n) => (eventMap.get(n) ?? 0) > 0).length === 0 ? (
              <p className="text-xs text-bhai-dim py-6 text-center">
                近 7 天暂无工具使用数据（埋点自本轮起生效）
              </p>
            ) : (
              FUNNEL_ORDER.map((n) => {
                const count = eventMap.get(n) ?? 0;
                if (count === 0) return null;
                const max = Math.max(
                  1,
                  ...FUNNEL_ORDER.map((k) => eventMap.get(k) ?? 0)
                );
                return (
                  <div key={n}>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-bhai-muted">{FUNNEL_LABEL[n]}</span>
                      <span className="font-mono text-bhai-dim tabular-nums">
                        {count}
                      </span>
                    </div>
                    <div className="dist-bar-track">
                      <div
                        className="dist-bar-fill"
                        style={{ width: `${Math.round((count / max) * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* 工具热度分布 */}
          <div>
            <div className="font-mono text-[10px] text-bhai-dim tracking-widest mb-2.5">
              工具热度 TOP
            </div>
            {(data?.byTool ?? []).length === 0 ? (
              <p className="text-xs text-bhai-dim py-4">暂无数据</p>
            ) : (
              <ul className="space-y-1.5">
                {(data?.byTool ?? []).slice(0, 5).map((t) => (
                  <li
                    key={t.tool}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="font-mono text-bhai-muted">{t.tool}</span>
                    <span className="font-mono text-bhai-dim tabular-nums">
                      {t.count}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 每日走势 + 最近事件 */}
          <div>
            <div className="font-mono text-[10px] text-bhai-dim tracking-widest mb-2.5">
              每日启动走势
            </div>
            <div className="flex items-end gap-1 h-14 mb-4">
              {(data?.daily ?? []).map((d) => (
                <div
                  key={d.date}
                  title={`${d.date}：${d.count} 次启动`}
                  className="flex-1 bg-gradient-to-t from-[#A04A0B] to-[#F38B3F] rounded-t"
                  style={{
                    height: `${Math.max(6, Math.round((d.count / dailyMax) * 100))}%`,
                    opacity: d.count === 0 ? 0.25 : 1,
                  }}
                />
              ))}
            </div>
            <div className="font-mono text-[10px] text-bhai-dim tracking-widest mb-1.5">
              最近事件
            </div>
            <ul className="space-y-1 max-h-24 overflow-y-auto admin-scrollbar">
              {(data?.recent ?? []).slice(0, 6).map((r, i) => (
                <li
                  key={i}
                  className="text-[10px] font-mono text-bhai-dim flex items-center gap-1.5"
                >
                  <span className="text-bhai-red shrink-0">
                    {FUNNEL_LABEL[r.name] ?? r.name}
                  </span>
                  {r.tool && <span className="truncate">{r.tool}</span>}
                  {r.meta && (
                    <span className="truncate text-bhai-muted">{r.meta}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- 邮件发件队列卡片：EmailOutbox 台账 + SMTP flush ---------- */

type OutboxRow = {
  id: string;
  to: string;
  subject: string;
  status: string;
  error: string | null;
  createdAt: string;
  sentAt: string | null;
};

type OutboxData = {
  smtpConfigured: boolean;
  counts: { queued: number; sent: number; failed: number };
  rows: OutboxRow[];
};

const OUTBOX_STATUS_STYLE: Record<string, string> = {
  queued: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  sent: "border-green-500/40 bg-green-500/10 text-green-400",
  failed: "border-red-500/40 bg-red-500/10 text-red-400",
};

const OUTBOX_STATUS_LABEL: Record<string, string> = {
  queued: "排队中",
  sent: "已发送",
  failed: "发送失败",
};

function fmtOutboxTime(iso: string | null): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

function OutboxCard() {
  const { toast } = useToast();
  const [data, setData] = useState<OutboxData | null>(null);
  const [loading, setLoading] = useState(true);
  const [flushing, setFlushing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/outbox", { cache: "no-store" });
      if (res.ok) setData((await res.json()) as OutboxData);
    } catch {
      /* 静默：卡片显示空态 */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const flush = async () => {
    if (flushing) return;
    setFlushing(true);
    try {
      const res = await fetch("/api/admin/outbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ take: 10 }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        toast({
          title: "发送失败",
          description: json?.error ?? "请稍后再试",
          variant: "destructive",
        });
      } else {
        toast({
          title: `Flush 完成：成功 ${json.sent} · 失败 ${json.failed}`,
          description:
            json.failed > 0 && Array.isArray(json.errors) && json.errors.length > 0
              ? json.errors[0]
              : "队列已处理",
        });
      }
    } catch {
      toast({ title: "发送失败", description: "网络错误，请稍后再试", variant: "destructive" });
    } finally {
      setFlushing(false);
      void load();
    }
  };

  const counts = data?.counts ?? { queued: 0, sent: 0, failed: 0 };
  const smtpReady = data?.smtpConfigured ?? false;

  return (
    <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-5 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Inbox className="h-4 w-4 text-bhai-red" />
          <span className="font-mono text-[10px] text-bhai-muted tracking-widest">
            邮件发件队列 · EMAIL OUTBOX
          </span>
          <span
            className={`hidden sm:inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-widest ${
              smtpReady
                ? "border-green-500/40 bg-green-500/10 text-green-400"
                : "border-amber-500/40 bg-amber-500/10 text-amber-400"
            }`}
            title={smtpReady ? "SMTP 已配置，可直接真发" : "未配置 SMTP（SMTP_HOST/PORT/USER/PASS），配置后 Flush 即真发"}
          >
            {smtpReady ? "SMTP READY" : "SMTP 未配置"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-bhai-dim tabular-nums">
            排队 {counts.queued} · 已发 {counts.sent} · 失败 {counts.failed}
          </span>
          <button
            onClick={() => void flush()}
            disabled={flushing || !smtpReady || counts.queued === 0}
            title={
              !smtpReady
                ? "先配置 SMTP 环境变量"
                : counts.queued === 0
                  ? "队列为空"
                  : "发送最多 10 封排队邮件"
            }
            className="inline-flex items-center gap-1.5 rounded-md border border-[#2A2A2A] bg-bhai-bg px-2.5 py-1 font-mono text-[10px] tracking-widest text-bhai-muted transition-colors hover:border-bhai-red hover:text-bhai-red disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {flushing ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Send className="h-3 w-3" />
            )}
            FLUSH
          </button>
          <button
            onClick={() => void load()}
            className="text-bhai-dim transition-colors hover:text-bhai-red"
            aria-label="刷新发件队列"
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {loading && !data ? (
        <div className="flex items-center justify-center py-8 text-bhai-muted text-sm">
          <Loader2 className="h-4 w-4 animate-spin mr-2" /> 加载发件队列…
        </div>
      ) : (data?.rows.length ?? 0) === 0 ? (
        <p className="text-xs text-bhai-dim py-6 text-center">
          暂无邮件——路线图生成后会自动入队
        </p>
      ) : (
        <ul className="max-h-96 space-y-2 overflow-y-auto admin-scrollbar pr-1">
          {data!.rows.map((row) => (
            <li
              key={row.id}
              className="rounded-lg border border-[#222] bg-bhai-bg px-3 py-2.5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-widest ${
                    OUTBOX_STATUS_STYLE[row.status] ?? OUTBOX_STATUS_STYLE.queued
                  }`}
                >
                  {OUTBOX_STATUS_LABEL[row.status] ?? row.status}
                </span>
                <span className="text-xs text-foreground truncate max-w-[220px]">
                  {row.to}
                </span>
                <span className="text-[11px] text-bhai-muted truncate flex-1 min-w-[120px]">
                  {row.subject}
                </span>
                <span className="font-mono text-[9px] text-bhai-dim tabular-nums shrink-0">
                  入队 {fmtOutboxTime(row.createdAt)} · 发出 {fmtOutboxTime(row.sentAt)}
                </span>
              </div>
              {row.error && (
                <p className="mt-1.5 text-[10px] font-mono text-red-400/80 truncate" title={row.error}>
                  ⚠ {row.error}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
