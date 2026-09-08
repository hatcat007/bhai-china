import { PageShell } from "@/components/bhai/PageShell";
import { PricingBody } from "@/components/bhai/pricing/PricingBody";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/bhai/JsonLd";
import { withOpenGraph } from "@/lib/page-metadata";

/**
 * /pricing — server 壳（Round 20-d2 i18n 安全模式）
 * - metadata + FAQ/Breadcrumb JSON-LD 保持 server 侧原样（不随客户端 locale 切换，已知限制）
 * - 正文迁至 client 组件 PricingBody：全部文案走 t.pricing.*，价格数字与 zh 一致
 */
export const metadata = withOpenGraph(
  { title: "价格 · 透明定价 · 14 天保证 | Better Human AI", description: "BHAI 透明定价：AI 审计（¥15K-50K 入门）、AI 构建（¥40K-150K 每项目）、AI 托管（¥20K+/月）。14 天首个代理上线保证——否则我继续工作直到上线。" },
  "/pricing",
  "/og-pricing.jpg"
);

export default function PricingPage() {
  return (
    <PageShell>
      <FAQJsonLd faqs={[
        { q: "为什么 AI 审计要 ¥15K-50K？不能用 ChatGPT 自己做吗？", a: "可以——如果你的品牌年营收低于 5000 万人民币。但超过这个量级，你需要的是：(1) 知道你团队现在在用什么 AI 工具（通常 8-12 个，没人追踪成本）；(2) 知道 PIPL 合规风险点；(3) 知道哪个代理 30 天能赚回成本。我做这个 5+ 年了，1-2 周交付的 60-90 页报告比你团队花 6 个月摸索更快更准。" },
        { q: "AI 构建 ¥40K-150K 的差距为什么这么大？", a: "取决于三个因素：(1) 你的品牌复杂度（1 个产品线还是 5 个）；(2) 你选几个代理（2 个还是 6 个）；(3) 集成复杂度（已有 CRM/ERP 还是全新建）。20 分钟通话后我能给你精确报价——不会有隐藏费用。" },
        { q: "托管为什么月付 ¥20K 起？包含什么？", a: "¥20K/月 包含：我每两周一次回顾会议（我亲自参与，不甩初级顾问）、AI 代理持续优化 + 重训练、PIPL 合规监控、紧急 4 小时响应、季度 ROI 报告，以及所有 AI token 成本（Claude/通义千问调用费用通常每月 ¥3K-8K，我承担不另收）。" },
        { q: "14 天保证具体是什么？", a: "签约后 14 天内，首个 AI 代理必须上线跑生产——不是 PPT，不是 Demo，是真正能干活的代理。如果 14 天没上线，我不收额外费用继续工作直到它上线。唯一例外：你团队延迟提供必要的访问权限/数据，这种情况我会提前书面说明。" },
        { q: "数据安全吗？中国客户数据会出国吗？", a: "不会。所有客户数据严格部署在中国境内云（默认阿里云上海区，可选腾讯云/华为云/AWS 中国）。仅匿名化模式数据（不含个人信息）回流哥本哈根控制中心用于跨客户模式学习。PIPL 第 38 条合规，数据安全法合规，网络安全法合规。" },
        { q: "需要先付全款吗？", a: "不需要。AI 审计：50% 启动 + 50% 交付报告。AI 构建：30% 启动 + 30% 首个代理上线（14 天内）+ 40% 完整工作队交付（14 周内）。托管：月付。所有付款支持人民币对公账户或欧元对公账户。" },
        { q: "如果我不满意可以退款吗？", a: "AI 审计：交付报告后 7 天内不满意，全额退款（不需要理由）。AI 构建：14 天保证期内首个代理未上线，已付的 30% 启动费全额退还。托管：任意月份不满意，下月停止，已付当月不退但停止扣款。" },
        { q: "你和那些 AI 咨询公司有什么本质区别？", a: "三个本质区别：(1) 我交付生产环境 AI 代理，他们交付 PPT；(2) 我亲自参与每客户，他们甩给初级顾问；(3) 我有 16 个真实案例（15 丹麦 + 1 中国广州珠韵），他们通常有 3-5 个匿名案例。20 分钟通话你能立刻感受到区别。" },
      ]} />
      <BreadcrumbJsonLd items={[
        { name: "首页", url: "/" },
        { name: "价格", url: "/pricing" },
      ]} />
      <PricingBody />
    </PageShell>
  );
}
