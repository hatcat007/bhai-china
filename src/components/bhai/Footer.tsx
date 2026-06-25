import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#1F1F1F] bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-bhai-muted tracking-widest">[ BHAI ]</span>
              <span className="font-sans text-sm font-bold">
                BETTER HUMAN<span className="text-bhai-red"> AI</span>
              </span>
            </div>
            <p className="text-xs text-bhai-muted leading-relaxed">
              我一个人掌舵。<br />
              AI 全员驱动。<br />
              为中国珠宝 CEO 而生。
            </p>
            <p className="font-mono text-[10px] text-bhai-dim mt-4 tracking-wider">
              BUSTER VED RORET.<br />
              DREVET AF AI.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-widest text-bhai-muted mb-4">导航</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-bhai-text hover:text-bhai-red transition-colors">首页</Link></li>
              <li><Link href="/cases" className="text-sm text-bhai-text hover:text-bhai-red transition-colors">丹麦案例</Link></li>
              <li><Link href="/solutions" className="text-sm text-bhai-text hover:text-bhai-red transition-colors">解决方案</Link></li>
              <li><Link href="/method" className="text-sm text-bhai-text hover:text-bhai-red transition-colors">BHAI 方法</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-widest text-bhai-muted mb-4">洞察</h3>
            <ul className="space-y-2">
              <li><Link href="/denmark-insights" className="text-sm text-bhai-text hover:text-bhai-red transition-colors">丹麦洞察</Link></li>
              <li><Link href="/about" className="text-sm text-bhai-text hover:text-bhai-red transition-colors">关于我</Link></li>
              <li><Link href="/book" className="text-sm text-bhai-text hover:text-bhai-red transition-colors">预约 20 分钟</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-widest text-bhai-muted mb-4">联系</h3>
            <ul className="space-y-2 text-sm text-bhai-text">
              <li><a href="mailto:buster@betterhumanai.dk" className="hover:text-bhai-red transition-colors">buster@betterhumanai.dk</a></li>
              <li><a href="https://cal.eu/betterhumanai/20min" target="_blank" rel="noopener noreferrer" className="hover:text-bhai-red transition-colors">cal.eu/betterhumanai/20min</a></li>
              <li><a href="https://betterhumanai.dk" className="hover:text-bhai-red transition-colors">betterhumanai.dk</a></li>
            </ul>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="rounded border border-[#2A2A2A] px-2 py-0.5 text-[10px] font-mono text-bhai-muted tracking-wider">GDPR 合规</span>
              <span className="rounded border border-[#2A2A2A] px-2 py-0.5 text-[10px] font-mono text-bhai-muted tracking-wider">EU AI ACT 就绪</span>
              <span className="rounded border border-[#2A2A2A] px-2 py-0.5 text-[10px] font-mono text-bhai-muted tracking-wider">完整审计链</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1A1A1A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-bhai-dim">
            © 2026 Better Human AI · Buster ML Larsen · 在中国，卖到欧洲 CEO
          </p>
          <p className="font-mono text-[10px] text-bhai-dim tracking-wider">
            NO PITCH · NO COMMITMENTS · 20 MINUTES
          </p>
        </div>
      </div>
    </footer>
  );
}
