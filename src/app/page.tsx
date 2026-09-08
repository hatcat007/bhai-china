import { PageShell } from "@/components/bhai/PageShell";
import { HomeHero } from "@/components/bhai/HomeHero";
import { HomeBody } from "@/components/bhai/home/HomeBody";

/**
 * 首页（server）
 * - i18n Round D-1：Hero 区委托 HomeHero（client，双语）
 * - i18n Round D-2（Task 20-a）：其余全部 section 委托 HomeBody（client，t.homeSec 双语）
 * - 本页无 metadata 导出（维持原状）
 */
export default function Home() {
  return (
    <PageShell>
      {/* HERO — i18n Round D-1：双语 hero（client） */}
      <HomeHero />
      {/* THE PROBLEM → FINAL CTA — i18n Round D-2：双语正文（client） */}
      <HomeBody />
    </PageShell>
  );
}
