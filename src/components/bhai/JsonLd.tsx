/**
 * JSON-LD structured data components for SEO dominance.
 * Hourglass AI has zero JSON-LD — this is a competitive advantage.
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
    description: "丹麦验证的 AI 方法，现在转移给中国珠宝 CEO。Buster ML Larsen（中文名：陆博明）一个人掌舵，AI 全员驱动。",
    founder: {
      "@type": "Person",
      name: "Buster ML Larsen",
      alternateName: "陆博明",
      jobTitle: "AI 系统架构师",
      email: "buster@betterhumanai.dk",
    },
    foundingDate: "2025",
    knowsAbout: [
      "AI 编排",
      "自主代理",
      "人机协同",
      "GDPR 合规",
      "EU AI Act",
      "中国 PIPL 合规",
      "数据本地化",
      "珠宝行业 AI",
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
    serviceType: "AI 系统部署 + AI 工作队托管",
    provider: {
      "@type": "Organization",
      name: "Better Human AI",
      url: "https://betterhumanai.dk",
    },
    areaServed: ["中国", "丹麦", "欧盟"],
    description: "BHAI 帮助中国珠宝品牌 CEO 用 AI 代理在 14 天内完成生产部署。16 个真实案例（15 丹麦 + 1 中国广州珠韵珠宝）。9 类工作队覆盖防伪鉴真、高定共创、普通话 VIP 礼宾、需求预测、区块链来源、中国切入手册、AR 试戴、困境品牌 AI、中国云基础设施。",
    offers: [
      {
        "@type": "Offer",
        name: "AI 审计",
        priceCurrency: "CNY",
        price: "15000-50000",
        description: "入门产品。60-90 页 AI 路线图报告 + 2 小时解读会 + 3 个优先代理推荐。",
      },
      {
        "@type": "Offer",
        name: "AI 构建",
        priceCurrency: "CNY",
        price: "40000-150000",
        description: "主力产品。6 周上下文构建 + 14 天首个代理上线 + 14 周完整工作队部署。14 天保证。",
      },
      {
        "@type": "Offer",
        name: "AI 托管",
        priceCurrency: "CNY",
        price: "20000",
        description: "月付托管。每两周回顾 + 持续优化 + PIPL 合规监控 + 紧急 4 小时响应 + AI token 成本包含。",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "BHAI 9 类 AI 工作队",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI 防伪鉴真" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "高定共创 AI" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "普通话 VIP 礼宾" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "需求预测 + 动态定价" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "区块链来源" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "中国切入手册" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AR 试戴网络" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "困境品牌 AI" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "中国云基础设施 + 数据本地化" } },
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
    jobTitle: "AI 系统架构师",
    worksFor: {
      "@type": "Organization",
      name: "Better Human AI",
    },
    url: "https://betterhumanai.dk/about",
    image: "https://betterhumanai.dk/buster-photo-1.webp",
    email: "buster@betterhumanai.dk",
    knowsAbout: [
      "AI 编排",
      "自主 AI 代理",
      "EU AI Act 合规",
      "GDPR 合规",
      "中国 PIPL 合规",
      "AI 工作队管理",
      "人机协同 AI",
      "AI 部署安全",
    ],
    description: "Buster ML Larsen（中文名：陆博明），丹麦 AI 系统架构师。在丹麦帮 15 家顶级珠宝品牌部署 AI 工作队，现转移方法到中国珠宝 CEO。一个人掌舵，AI 全员驱动。",
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

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://betterhumanai.dk/#website",
    url: "https://betterhumanai.dk",
    name: "Better Human AI",
    description: "丹麦验证的 AI 方法，现在转移给中国珠宝 CEO",
    publisher: {
      "@type": "Organization",
      "@id": "https://betterhumanai.dk/#organization",
    },
    inLanguage: "zh-CN",
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
