"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    q: "这 20 分钟真的免费吗？会不会聊到一半开始推销？",
    a: "完全免费，也没有销售环节。我靠交付项目赚钱，不靠通话推销。如果 BHAI 对你的品牌没有明显价值，我会直接告诉你「不要买」——这 15 年在丹麦我拒绝过的项目比成交的多。",
  },
  {
    q: "我需要提前准备什么材料？",
    a: "不需要 PPT。你只要知道三个数字就够了：年营收大概多少、中国业务占比多少、现在最头疼的一件事是什么。口语描述就行，通话里我会问需要问的。",
  },
  {
    q: "20 分钟真的能解决我的问题吗？",
    a: "20 分钟不能解决问题，但能精确定位问题。通话结束你会带走三样东西：AI 对你品牌到底有没有用的诚实判断、第一个该部署的代理是哪个、大概的投资区间和回报周期。要不要往下走，完全由你决定。",
  },
  {
    q: "如果 BHAI 不适合我的品牌怎么办？",
    a: "那我会当面说清楚，握手告别，之后不会有任何骚扰式跟进。到目前为止，我推荐「先别做 AI」的咨询占了相当比例——省下来的冤枉钱，对你也是价值。",
  },
  {
    q: "预约之后多久能安排通话？",
    a: "通常 48 小时内。提交表单后我会加你微信确认具体时间——北京时间或哥本哈根时间都可以，我两边都方便。通话形式是微信语音或视频，你选。",
  },
  {
    q: "数据保密吗？我不想让同行知道我的品牌痛点。",
    a: "默认全程保密。你在表单和通话里说的任何数字、痛点、渠道信息，只用于本次咨询，绝不外泄。需要的话，正式合作前可以签 NDA；PIPL/GDPR 合规本身就是我们部署方案的第一层。",
  },
];

export function BookFaq() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
      <div className="mx-auto max-w-3xl">
        <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">
          [ 常见问题 ]
        </div>
        <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-10 leading-tight">
          预约前，CEO 们最常问的 6 个问题
        </h2>

        <Accordion
          type="single"
          collapsible
          className="rounded-xl border border-[#2A2A2A] bg-bhai-card px-5 faq-accordion"
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-[#2A2A2A] last:border-b-0"
            >
              <AccordionTrigger className="py-5 text-left text-sm sm:text-base font-medium text-foreground hover:text-bhai-red hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-bhai-muted leading-relaxed pb-5">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-6 text-center text-xs text-bhai-dim">
          还有别的疑问？直接在预约表单留言，或微信联系 busterl1（备注
          BHAI 珠宝 CEO）。
        </p>
      </div>
    </section>
  );
}
