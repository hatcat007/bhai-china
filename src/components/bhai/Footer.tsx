"use client";

import Link from "next/link";
import { FooterNewsletter } from "@/components/bhai/FooterNewsletter";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  const f = t.footer;
  return (
    <footer className="mt-auto border-t border-[#1F1F1F] bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/bhai-mark-40.png"
                alt="BHAI 舵轮 logo"
                className="h-7 w-7 object-contain"
              />
              <span className="font-sans text-sm font-bold">
                BETTER HUMAN<span className="text-bhai-red"> AI</span>
              </span>
            </div>
            <p className="text-xs text-bhai-muted leading-relaxed">
              {f.tagline.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <p className="font-mono text-[10px] text-bhai-dim mt-4 tracking-wider">
              {f.motto.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-widest text-bhai-muted mb-4">{f.colNav}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-bhai-text hover:text-bhai-red transition-colors">{f.navHome}</Link></li>
              <li><Link href="/cases" className="text-sm text-bhai-text hover:text-bhai-red transition-colors">{f.navCases}</Link></li>
              <li><Link href="/solutions" className="text-sm text-bhai-text hover:text-bhai-red transition-colors">{f.navSolutions}</Link></li>
              <li><Link href="/method" className="text-sm text-bhai-text hover:text-bhai-red transition-colors">{f.navMethod}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-widest text-bhai-muted mb-4">{f.colInsights}</h3>
            <ul className="space-y-2">
              <li><Link href="/denmark-insights" className="text-sm text-bhai-text hover:text-bhai-red transition-colors">{f.insDenmark}</Link></li>
              <li><Link href="/ai-ideas" className="text-sm text-bhai-text hover:text-bhai-red transition-colors">{f.insIdeas}</Link></li>
              <li><Link href="/about" className="text-sm text-bhai-text hover:text-bhai-red transition-colors">{f.insAbout}</Link></li>
              <li><Link href="/book" className="text-sm text-bhai-text hover:text-bhai-red transition-colors">{f.insBook}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-widest text-bhai-muted mb-4">{f.colContact}</h3>
            <ul className="space-y-2 text-sm text-bhai-text">
              <li>
                <a href="weixin://add/busterl1" className="hover:text-bhai-red transition-colors flex items-center gap-2">
                  <span className="font-mono text-[10px] text-bhai-red">[WeChat]</span>
                  {f.wechat}
                </a>
              </li>
              <li>
                <a href="https://cal.eu/betterhumanai/20min" target="_blank" rel="noopener noreferrer" className="hover:text-bhai-red transition-colors flex items-center gap-2">
                  <span className="font-mono text-[10px] text-bhai-red">[Cal]</span>
                  cal.eu/betterhumanai/20min
                </a>
              </li>
              <li>
                <a href="mailto:buster@betterhumanai.dk" className="hover:text-bhai-red transition-colors flex items-center gap-2">
                  <span className="font-mono text-[10px] text-bhai-red">[Mail]</span>
                  buster@betterhumanai.dk
                </a>
              </li>
              <li className="text-xs text-bhai-dim mt-3">
                {f.comingSoon}
              </li>
            </ul>
            {/* WeChat QR — site-wide */}
            <div className="mt-5 pt-5 border-t border-[#1A1A1A]">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 rounded overflow-hidden border border-[#2A2A2A] bg-white p-1 shrink-0">
                  { }
                  <img
                    src="/wechat-qr.svg"
                    alt="WeChat QR Code — 微信扫码加 Buster"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-bhai-red tracking-widest mb-0.5">[ {f.colContact} ]</div>
                  <div className="text-[11px] text-bhai-muted leading-tight">
                    WeChat<br />
                    ID：busterl1
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="rounded border border-[#2A2A2A] px-2 py-0.5 text-[10px] font-mono text-bhai-muted tracking-wider">GDPR 合规</span>
              <span className="rounded border border-[#2A2A2A] px-2 py-0.5 text-[10px] font-mono text-bhai-muted tracking-wider">EU AI ACT</span>
              <span className="rounded border border-[#2A2A2A] px-2 py-0.5 text-[10px] font-mono text-bhai-muted tracking-wider">PIPL 合规</span>
              <span className="rounded border border-[#2A2A2A] px-2 py-0.5 text-[10px] font-mono text-bhai-muted tracking-wider">数据本地化</span>
            </div>
            <FooterNewsletter />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1A1A1A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-bhai-dim">
            {f.rights}
          </p>
          <p className="font-mono text-[10px] text-bhai-dim tracking-wider">
            NO PITCH · NO COMMITMENTS · 20 MINUTES
          </p>
        </div>
      </div>
    </footer>
  );
}
