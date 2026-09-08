/**
 * i18n 扩展字典注册表 — 汇总各领域文件（每个文件拥有独立顶层命名空间，互不重叠）
 * 基础字典（nav/footer/runner/scan/toolsIndex/toolDetail/cta/home/roadmap）仍在 src/lib/i18n.tsx
 */
import * as homeSecDict from "./home-sec";
import * as amsDict from "./about-method-solutions";
import * as bilDict from "./book-insights-logos";
import * as cbpDict from "./cases-blog-pricing";
import * as tmDict from "./tools-misc";

export const zhExt = {
  ...homeSecDict.zh,
  ...amsDict.zh,
  ...bilDict.zh,
  ...cbpDict.zh,
  ...tmDict.zh,
};

export const enExt = {
  ...homeSecDict.en,
  ...amsDict.en,
  ...bilDict.en,
  ...cbpDict.en,
  ...tmDict.en,
};
