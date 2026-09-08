import { PageShell } from "@/components/bhai/PageShell";
import { BookBody } from "@/components/bhai/book/BookBody";
import { withOpenGraph } from "@/lib/page-metadata";

/**
 * /book — 预约 20 分钟
 * - server 页保留 metadata + FAQ JSON-LD（SEO 口径维持中文主市场）
 * - 正文为 client 组件 BookBody：t.book.* 双语，实时切换
 */

export const metadata = withOpenGraph(
  { title: "预约 20 分钟 · 没有 PPT 没有承诺 | Better Human AI", description: "和 Buster 预约 20 分钟。没有 PPT，没有承诺，没有销售话术。你讲你的品牌和挑战，Buster 告诉你 AI 在哪里能赚回它自己的钱。" },
  "/book"
);

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "这 20 分钟真的免费吗？会不会聊到一半开始推销？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "完全免费，也没有销售环节。BHAI 靠交付项目赚钱，不靠通话推销。如果 AI 对你的品牌没有明显价值，Buster 会直接告诉你不要买。",
      },
    },
    {
      "@type": "Question",
      name: "预约 20 分钟通话需要提前准备什么材料？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "不需要 PPT。只要知道三个数字：年营收大概多少、中国业务占比多少、现在最头疼的一件事是什么。口语描述即可。",
      },
    },
    {
      "@type": "Question",
      name: "如果 BHAI 不适合我的品牌怎么办？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Buster 会当面说清楚并握手告别，之后不会有任何骚扰式跟进。事实上相当比例的咨询结论是「先别做 AI」。",
      },
    },
    {
      "@type": "Question",
      name: "预约之后多久能安排通话？数据保密吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "通常 48 小时内通过微信确认具体时间（北京时间或哥本哈根时间均可）。通话内容默认全程保密，正式合作前可签 NDA，PIPL/GDPR 合规是部署方案的第一层。",
      },
    },
  ],
};

export default function BookPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }}
      />
      <BookBody />
    </PageShell>
  );
}
