"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";

type NavLink = {
  href: string;
  labelKey: "home" | "cases" | "tools" | "roadmap" | "pricing" | "solutions" | "method" | "about" | "ideas";
  highlight?: boolean;
  /** FREE AI TOOLS 胶囊按钮样式（橙色边框 + 脉冲点，仅 lg+ 桌面显示，避免 md 拥挤） */
  tools?: boolean;
  /** 仅 lg+ 桌面显示（避免 md 断点拥挤） */
  lgOnly?: boolean;
};

const navLinks: NavLink[] = [
  { href: "/", labelKey: "home" },
  { href: "/cases", labelKey: "cases" },
  { href: "/tools", labelKey: "tools", tools: true },
  { href: "/ai-ideas", labelKey: "ideas", lgOnly: true },
  { href: "/ai-roadmap", labelKey: "roadmap", highlight: true },
  { href: "/pricing", labelKey: "pricing" },
  { href: "/solutions", labelKey: "solutions" },
  { href: "/method", labelKey: "method" },
  { href: "/about", labelKey: "about" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/** 中 / EN 分段切换器（mono 胶囊，主题化样式） */
export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLang();
  const btn = (active: boolean) =>
    `rounded-full px-2 py-0.5 transition-colors ${
      active ? "bg-bhai-red/15 text-bhai-red" : "text-bhai-dim hover:text-bhai-muted"
    }`;
  return (
    <div
      role="group"
      aria-label={t.nav.langGroup}
      className={`inline-flex items-center rounded-full border border-[#2A2A2A] bg-bhai-card font-mono ${compact ? "text-[10px]" : "text-[11px]"} tracking-wider`}
    >
      <button
        type="button"
        onClick={() => setLocale("zh")}
        aria-pressed={locale === "zh"}
        className={btn(locale === "zh")}
      >
        中
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={btn(locale === "en")}
      >
        EN
      </button>
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLang();
  const labelOf = (l: NavLink) => t.nav[l.labelKey];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F1F1F] bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label={t.chrome.homeAria}>
          <img
            src="/bhai-mark-40.png"
            alt={t.chrome.logoAlt}
            className="h-8 w-8 object-contain"
          />
          <span className="font-sans text-base font-bold tracking-tight">
            BETTER HUMAN<span className="text-bhai-red"> AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 xl:gap-6" aria-label={t.nav.mainNav}>
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            if (link.tools) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`hidden lg:inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] tracking-widest transition-all ${
                    active
                      ? "border-bhai-red bg-bhai-red text-white"
                      : "border-bhai-red/40 bg-bhai-red/10 text-bhai-red hover:border-bhai-red hover:bg-bhai-red/20"
                  }`}
                >
                  <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bhai-red opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bhai-red" />
                  </span>
                  {t.nav.tools}
                </Link>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`group relative text-sm transition-colors ${
                  link.lgOnly ? "hidden lg:inline-block " : ""
                }${
                  link.highlight && !active
                    ? "text-bhai-red hover:text-bhai-red-hover font-medium"
                    : active
                      ? "text-foreground font-medium"
                      : "text-bhai-muted hover:text-foreground"
                }`}
              >
                {labelOf(link)}
                {/* 下划线：active 常驻，其余 hover 时从左滑出 */}
                <span
                  aria-hidden
                  className={`absolute -bottom-1.5 left-0 right-0 h-0.5 origin-left rounded-full bg-bhai-red transition-transform duration-300 ease-out ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <Link
            href="/book"
            className={`cta-primary rounded-md px-4 py-2 text-sm font-medium text-white ${
              isActive(pathname, "/book") ? "ring-1 ring-bhai-red/60" : ""
            }`}
          >
            {t.nav.bookCta}
          </Link>
        </div>

        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={t.nav.toggleMenu}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#1F1F1F] bg-black">
          <nav className="flex flex-col px-4 py-4 gap-1" aria-label={t.nav.mobileNav}>
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`py-3 px-2 text-sm border-b border-[#1A1A1A] transition-colors ${
                    active
                      ? "text-bhai-red font-medium"
                      : link.highlight
                        ? "text-bhai-red/90 hover:text-bhai-red"
                        : "text-bhai-text hover:text-bhai-red"
                  }`}
                >
                  {link.tools && (
                    <span
                      aria-hidden
                      className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-bhai-red align-middle"
                    />
                  )}
                  <span className={link.tools ? "font-mono text-xs tracking-widest" : ""}>
                    {labelOf(link)}
                  </span>
                  {active && <span className="float-right font-mono text-[10px] text-bhai-red">●</span>}
                </Link>
              );
            })}
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="cta-primary mt-3 rounded-md px-4 py-3 text-sm font-medium text-white text-center"
            >
              {t.nav.bookCta}
            </Link>
            <div className="mt-3 flex justify-center pb-2">
              <LanguageToggle compact />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
