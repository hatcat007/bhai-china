import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

/**
 * BHAI 邮件发送工具（EmailOutbox 消费用）
 * - SMTP 配置全部来自环境变量，未配置时 smtpConfigured() 返回 false：
 *   SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / SMTP_FROM（可选，默认 SMTP_USER）
 * - 设计为「可选启用」：dev/演示环境不配 SMTP，outbox 行保持 queued，
 *   管理台显示「SMTP 未配置」；生产配置环境变量后一键 flush 即可真发
 */

export function smtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );
}

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;
  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: process.env.SMTP_USER as string,
      pass: process.env.SMTP_PASS as string,
    },
  });
  return cachedTransporter;
}

export type OutboxSendResult = { ok: true; messageId: string } | { ok: false; error: string };

/** 发送一封 outbox 邮件：正文为 Markdown 纯文本（路线图本身可读性已足够） */
export async function sendOutboxEmail(email: {
  to: string;
  subject: string;
  bodyMd: string;
}): Promise<OutboxSendResult> {
  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email.to,
      subject: email.subject,
      text: email.bodyMd,
    });
    return { ok: true, messageId: info.messageId };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
