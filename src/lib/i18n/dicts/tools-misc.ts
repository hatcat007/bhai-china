/**
 * i18n 扩展字典 — 20-e（tools 页面族 / ai-roadmap / 全局 chrome 杂项）
 * 命名空间契约：toolsPages / chrome
 * 只允许改本文件 + tools 路由组件 + Navbar/Footer/FooterNewsletter/ShareButtons/JsonLd/layout 等
 *
 * toolsPages：/tools /tools/[tool] 残余硬编码文案（自定义光标标签等）
 * chrome：全局 chrome 残余文案（logo alt / aria、页脚合规徽章、页脚订阅表单、分享条、返回顶部）
 *         —— news letter / share 只改展示字符串，POST 逻辑不动
 */
export const zh = {
  toolsPages: {
    /** 卡片 hover 自定义光标标签（CustomCursor 渲染 data-cursor 值） */
    cursorRun: "运行 AI",
  },
  chrome: {
    logoAlt: "BHAI 舵轮 logo",
    homeAria: "Better Human AI 首页",
    wechatQrAlt: "WeChat QR Code — 微信扫码加 Buster",
    complianceBadges: ["GDPR 合规", "EU AI ACT", "PIPL 合规", "数据本地化"],
    backToTop: "返回顶部",

    // 页脚月度订阅（FooterNewsletter）
    newsletterKicker: "[ 月度洞察 · 免费订阅 ]",
    newsletterPitch: "每月一封：丹麦珠宝 AI 案例 + 中国落地笔记。不发垃圾邮件。",
    newsletterEmailLabel: "邮箱地址",
    newsletterSubmitAria: "订阅月度洞察",
    newsletterSuccessTitle: "订阅成功",
    newsletterSuccessDesc: "每月一封：丹麦珠宝 AI 案例 + 中国落地笔记。",
    newsletterDoneLabel: "已订阅：",
    newsletterDoneNote: "每月一封，随时退订。不会发垃圾邮件。",
    newsletterFailTitle: "订阅失败",
    newsletterFailFallback: "请稍后重试",

    // 文章分享条（ShareButtons）
    shareLabel: "分享文章",
    shareCopyAria: "复制文章链接",
    shareNativeAria: "分享文章",
    shareCopiedTitle: "链接已复制",
    shareCopiedDesc: "粘贴给同事或发到微信群",
    shareCopyFailTitle: "复制失败",
    shareCopyFailDesc: "请手动复制地址栏链接",
  },
};

export const en = {
  toolsPages: {
    cursorRun: "Run the AI",
  },
  chrome: {
    logoAlt: "BHAI helm logo",
    homeAria: "Better Human AI home",
    wechatQrAlt: "WeChat QR code — scan to add Buster",
    complianceBadges: ["GDPR compliant", "EU AI ACT", "PIPL compliant", "Data localization"],
    backToTop: "Back to top",

    // Footer newsletter (FooterNewsletter)
    newsletterKicker: "[ MONTHLY INSIGHTS · FREE ]",
    newsletterPitch:
      "One email a month: Danish jewelry AI cases + China landing notes. No spam.",
    newsletterEmailLabel: "Email address",
    newsletterSubmitAria: "Subscribe to the monthly insights",
    newsletterSuccessTitle: "Subscribed",
    newsletterSuccessDesc:
      "One email a month: Danish jewelry AI cases + China landing notes.",
    newsletterDoneLabel: "Subscribed: ",
    newsletterDoneNote: "One email a month, unsubscribe anytime. No spam.",
    newsletterFailTitle: "Subscription failed",
    newsletterFailFallback: "Please try again later",

    // Article share bar (ShareButtons)
    shareLabel: "Share",
    shareCopyAria: "Copy article link",
    shareNativeAria: "Share article",
    shareCopiedTitle: "Link copied",
    shareCopiedDesc: "Paste it to a colleague or drop it in a WeChat group",
    shareCopyFailTitle: "Copy failed",
    shareCopyFailDesc: "Please copy the URL from the address bar manually",
  },
};
