"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/cases", label: "丹麦案例" },
  { href: "/solutions", label: "解决方案" },
  { href: "/method", label: "BHAI 方法" },
  { href: "/denmark-insights", label: "丹麦洞察" },
  { href: "/about", label: "关于我" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F1F1F] bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Better Human AI 首页">
          <span className="font-mono text-xs text-bhai-muted tracking-widest">[ BHAI ]</span>
          <span className="font-sans text-base font-bold tracking-tight">
            BETTER HUMAN<span className="text-bhai-red"> AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="主导航">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-bhai-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/book"
            className="cta-primary rounded-md px-4 py-2 text-sm font-medium text-white"
          >
            预约 20 分钟 →
          </Link>
        </div>

        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="切换菜单"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#1F1F1F] bg-black">
          <nav className="flex flex-col px-4 py-4 gap-1" aria-label="移动导航">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-2 text-sm text-bhai-muted hover:text-foreground border-b border-[#1A1A1A]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="cta-primary mt-3 rounded-md px-4 py-3 text-sm font-medium text-white text-center"
            >
              预约 20 分钟 →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
