import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

// Sem NEXT_PUBLIC_SITE_URL (domínio pendente) o sitemap sai vazio, sem inventar domínio.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  if (!base) return [];
  return [{ url: `${base}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
