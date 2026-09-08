"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLang } from "@/lib/i18n";

/**
 * 预约页 FAQ（20-c 双语化）
 * - 6 组 Q/A 走 t.book.faq（zh/en 实时切换），结构/样式与原实现一致
 */
export function BookFaq() {
  const { t } = useLang();
  const d = t.book;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-alt">
      <div className="mx-auto max-w-3xl">
        <div className="font-mono text-xs text-bhai-red tracking-widest mb-3">
          {d.faqKicker}
        </div>
        <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-10 leading-tight">
          {d.faqTitle}
        </h2>

        <Accordion
          type="single"
          collapsible
          className="rounded-xl border border-[#2A2A2A] bg-bhai-card px-5 faq-accordion"
        >
          {d.faq.map((item, i) => (
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
          {d.faqFoot}
        </p>
      </div>
    </section>
  );
}
