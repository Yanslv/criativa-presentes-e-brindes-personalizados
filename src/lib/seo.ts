import type { Site } from "@/config/site";

/**
 * Domínio público. Pendente enquanto NEXT_PUBLIC_SITE_URL não for definido.
 * Na Vercel, sem a variável, usa o domínio de produção que a própria Vercel informa.
 */
export function siteUrl(
  value: string | undefined = process.env.NEXT_PUBLIC_SITE_URL,
  vercelHost: string | undefined = process.env.VERCEL_PROJECT_PRODUCTION_URL,
): string | null {
  const raw = value?.trim() || (vercelHost?.trim() ? `https://${vercelHost.trim()}` : "");
  const trimmed = raw.replace(/\/+$/, "");
  if (!trimmed) return null;
  try {
    return new URL(trimmed).toString().replace(/\/+$/, "");
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL inválida: "${value}". Use uma URL completa, como https://www.exemplo.com.br`);
  }
}

/** JSON-LD LocalBusiness apenas com campos confirmados (sem endereço, cidade ou horário). */
export function buildJsonLd(site: Site, baseUrl: string | null) {
  const absolute = (path: string) => (baseUrl ? `${baseUrl}${path}` : path);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.businessName,
    description: site.seo.description,
    telephone: `+${site.whatsapp.number}`,
    image: absolute(site.seo.ogImage.src),
    ...(baseUrl ? { url: baseUrl } : {}),
    sameAs: [site.instagram],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: `+${site.whatsapp.number}`,
      url: site.whatsapp.href,
      availableLanguage: "pt-BR",
    },
  };
}
