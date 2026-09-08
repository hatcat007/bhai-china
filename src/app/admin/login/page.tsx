"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Lock, Eye, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !password.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "登录失败，请重试");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败，请重试");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-bhai-bg text-foreground flex items-center justify-center px-4 overflow-hidden">
      {/* 背景装饰：网格 + 光球，与全站风格一致 */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none orb-float" />
      <div className="absolute -bottom-40 -left-32 w-[380px] h-[380px] bg-bhai-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className={`relative w-full max-w-sm ${shake ? "shake" : ""}`}>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-bhai-muted hover:text-bhai-red transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> 返回主站
        </Link>

        <div className="rounded-xl border border-[#2A2A2A] bg-bhai-card p-6 sm:p-8 shadow-[0_0_60px_rgba(229,105,16,0.06)]">
          <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-4">
            [ BHAI // RESTRICTED AREA ]
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg border border-bhai-red/40 bg-bhai-red/10 flex items-center justify-center">
              <Lock className="h-4.5 w-4.5 text-bhai-red" />
            </div>
            <div>
              <h1 className="font-sans text-xl font-bold tracking-tight">线索管理台</h1>
              <p className="text-xs text-bhai-muted mt-0.5">仅 Buster 授权访问</p>
            </div>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-medium text-bhai-muted mb-2 font-mono tracking-wider"
              >
                访问密码
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="输入管理台密码"
                  autoComplete="current-password"
                  autoFocus
                  className="input-focus w-full rounded-md border border-[#2A2A2A] bg-bhai-bg px-4 py-2.5 pr-11 text-sm text-foreground placeholder:text-bhai-dim outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "隐藏密码" : "显示密码"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-bhai-dim hover:text-bhai-red transition-colors"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="text-xs text-red-400 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="cta-primary w-full rounded-md px-6 py-3 text-sm font-medium text-white inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> 验证中…
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" /> 进入管理台
                </>
              )}
            </button>
          </form>

          <p className="mt-6 pt-4 border-t border-[#2A2A2A] text-[11px] text-bhai-dim leading-relaxed">
            登录状态保留 7 天。连续 5 次失败将触发 15 分钟锁定保护。
          </p>
        </div>
      </div>
    </main>
  );
}
