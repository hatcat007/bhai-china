/**
 * JSON-LD structured data components for SEO dominance.
 * Hourglass AI has zero JSON-LD — this is a competitive advantage.
 *
 * 20-e 双语化：JsonLd 由 root layout（LanguageProvider 之外）服务端渲染，
 * 无法响应客户端 locale —— 采用「中 / EN」双语字符串策略，两种语言下 SEO 文本均可用。
 * alternateName 保留「陆博明」（即中文别名本义）。
 */

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://betterhumanai.dk/#organization",
    name: "Better Human AI",
    alternateName: "BHAI",
    url: "https://betterhumanai.dk",
    logo: "https://betterhumanai.dk/logo.svg",
    description:
      "丹麦验证的 AI 方法，现在转移给中国珠宝 CEO。Buster ML Larsen（中文名：陆博明）一个人掌舵，AI 全员驱动。 / An AI method proven in Denmark, now transferred to Chinese jewelry CEOs. Buster ML Larsen (陆博明) steers solo — AI-driven across the board.",
    founder: {
      "@type": "Person",
      name: "Buster ML Larsen",
      alternateName: "陆博明",
      jobTitle: "AI 系统架构师 / AI Systems Architect",
      email: "buster@betterhumanai.dk",
    },
    foundingDate: "2025",
    knowsAbout: [
      "AI 编排 / AI orchestration",
      "自主代理 / Autonomous AI agents",
      "人机协同 / Human-machine collaboration",
      "GDPR 合规 / GDPR compliance",
      "EU AI Act",
      "中国 PIPL 合规 / China PIPL compliance",
      "数据本地化 / Data localization",
      "珠宝行业 AI / Jewelry-industry AI",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "DK",
    },
    contactPoint: [{
      "@type": "ContactPoint",
      contactType: "sales",
      email: "buster@betterhumanai.dk",
      availableLanguage: ["Chinese", "Danish", "English"],
    }],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function ServiceJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI 系统部署 + AI 工作队托管 / AI system deployment + managed AI agent teams",
    provider: {
      "@type": "Organization",
      name: "Better Human AI",
      url: "https://betterhumanai.dk",
    },
    areaServed: ["中国 / China", "丹麦 / Denmark", "欧盟 / EU"],
    description:
      "BHAI 帮助中国珠宝品牌 CEO 用 AI 代理在 14 天内完成生产部署。16 个真实案例（15 丹麦 + 1 中国广州珠韵珠宝）。9 类工作队覆盖防伪鉴真、高定共创、普通话 VIP 礼宾、需求预测、区块链来源、中国切入手册、AR 试戴、困境品牌 AI、中国云基础设施。 / BHAI helps Chinese jewelry brand CEOs get AI agents into production within 14 days. 16 real cases (15 Danish + 1 Chinese: Zhuyun Jewelry, Guangzhou). 9 agent teams covering anti-counterfeit authentication, couture co-creation, Mandarin VIP concierge, demand forecasting, blockchain provenance, China entry playbook, AR try-on, distressed-brand AI, and China cloud infrastructure.",
    offers: [
      {
        "@type": "Offer",
        name: "AI 审计 / AI Audit",
        priceCurrency: "CNY",
        price: "15000-50000",
        description:
          "入门产品。60-90 页 AI 路线图报告 + 2 小时解读会 + 3 个优先代理推荐。 / Entry product: a 60-90 page AI roadmap report + 2-hour readout + 3 priority agent recommendations.",
      },
      {
        "@type": "Offer",
        name: "AI 构建 / AI Build",
        priceCurrency: "CNY",
        price: "40000-150000",
        description:
          "主力产品。6 周上下文构建 + 14 天首个代理上线 + 14 周完整工作队部署。14 天保证。 / Core product: 6 weeks of context building + first agent live in 14 days + full 14-week agent-team deployment. 14-day guarantee.",
      },
      {
        "@type": "Offer",
        name: "AI 托管 / AI Managed Service",
        priceCurrency: "CNY",
        price: "20000",
        description:
          "月付托管。每两周回顾 + 持续优化 + PIPL 合规监控 + 紧急 4 小时响应 + AI token 成本包含。 / Monthly managed service: bi-weekly reviews + continuous optimization + PIPL compliance monitoring + 4-hour emergency response + AI token costs included.",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "BHAI 9 类 AI 工作队 / BHAI's 9 AI agent teams",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI 防伪鉴真 / Anti-counterfeit authentication" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "高定共创 AI / Couture co-creation AI" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "普通话 VIP 礼宾 / Mandarin VIP concierge" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "需求预测 + 动态定价 / Demand forecasting + dynamic pricing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "区块链来源 / Blockchain provenance" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "中国切入手册 / China entry playbook" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AR 试戴网络 / AR try-on network" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "困境品牌 AI / Distressed-brand AI" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "中国云基础设施 + 数据本地化 / China cloud infrastructure + data localization" } },
      ],
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Buster ML Larsen",
    alternateName: "陆博明",
    jobTitle: "AI 系统架构师 / AI Systems Architect",
    worksFor: {
      "@type": "Organization",
      name: "Better Human AI",
    },
    url: "https://betterhumanai.dk/about",
    image: "https://betterhumanai.dk/buster-photo-1.webp",
    email: "buster@betterhumanai.dk",
    knowsAbout: [
      "AI 编排 / AI orchestration",
      "自主 AI 代理 / Autonomous AI agents",
      "EU AI Act 合规 / EU AI Act compliance",
      "GDPR 合规 / GDPR compliance",
      "中国 PIPL 合规 / China PIPL compliance",
      "AI 工作队管理 / AI agent-team management",
      "人机协同 / Human-AI collaboration",
      "AI 部署安全 / AI deployment security",
    ],
    description:
      "Buster ML Larsen（中文名：陆博明），丹麦 AI 系统架构师。在丹麦帮 15 家顶级珠宝品牌部署 AI 工作队，现转移方法到中国珠宝 CEO。一个人掌舵，AI 全员驱动。 / Buster ML Larsen (陆博明), Danish AI systems architect. Deployed AI agent teams for 15 top jewelry brands in Denmark; now transferring the method to Chinese jewelry CEOs. Steers solo — AI-driven across the board.",
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function FAQJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://betterhumanai.dk${item.url}`,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** 列表页结构化数据：帮助搜索引擎把 /blog、/cases 下的条目作为整体集合收录 */
export function ItemListJsonLd({
  listName,
  items,
}: {
  listName: string;
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `https://betterhumanai.dk${item.url}`,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://betterhumanai.dk/#website",
    url: "https://betterhumanai.dk",
    name: "Better Human AI",
    description:
      "丹麦验证的 AI 方法，现在转移给中国珠宝 CEO / An AI method proven in Denmark, now transferred to Chinese jewelry CEOs",
    publisher: {
      "@type": "Organization",
      "@id": "https://betterhumanai.dk/#organization",
    },
    inLanguage: "zh-CN",
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
