import Link from "next/link";

type CTASectionProps = {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  title = "20 分钟。没有 PPT。没有承诺。",
  subtitle = "我听你讲你的品牌。然后告诉你 AI 在哪里能赚回它自己的钱——以及在哪里不能。如果对不上，我们握手告别。",
  primaryLabel = "预约 20 分钟 →",
  primaryHref = "/book",
  secondaryLabel = "先看丹麦案例",
  secondaryHref = "/cases",
}: CTASectionProps) {
  return (
    <section className="relative gradient-section py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-bhai-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-bhai-red/30 bg-bhai-red/5 px-4 py-1.5 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-bhai-red animate-pulse" />
          <span className="font-mono text-[11px] tracking-widest text-bhai-red">NO PITCH · NO COMMITMENTS</span>
        </div>
        <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-bhai-muted mb-10 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="cta-primary rounded-md px-8 py-4 text-base font-medium text-white w-full sm:w-auto"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && (
            <Link
              href={secondaryHref}
              className="rounded-md border border-[#333] bg-transparent px-8 py-4 text-base font-medium text-foreground hover:border-bhai-red hover:bg-[#0F0F0F] transition-colors w-full sm:w-auto"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
        <p className="font-mono text-[11px] text-bhai-dim mt-8 tracking-widest">
          BUSTER@BETTERHUMANAI.DK · CAL.EU/BETTERHUMANAI/20MIN
        </p>
      </div>
    </section>
  );
}
