import type { Metadata } from "next";

/**
 * 全站 per-page OG/Twitter metadata helper（统一 SEO 口径）
 * - 默认 og-image.jpg（1200×630）；/blog /cases 用专属分享图（image 参数覆盖）
 * - title/description 沿用各页现有中文主市场口径
 * - 用法：export const metadata = withOpenGraph({ title, description }, "/path");
 */
export function withOpenGraph(
  base: { title: string; description: string },
  path: string,
  image: string = "/og-image.jpg"
): Metadata {
  return {
    title: base.title,
    description: base.description,
    openGraph: {
      title: base.title,
      description: base.description,
      url: path,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Better Human AI",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: base.title,
      description: base.description,
      images: [image],
    },
  };
}
