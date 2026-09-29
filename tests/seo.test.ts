import { describe, expect, it } from "vitest";
import { site } from "@/config/site";
import { buildJsonLd, siteUrl } from "@/lib/seo";

describe("siteUrl", () => {
  it("retorna null quando o domínio está pendente", () => {
    expect(siteUrl("", undefined)).toBeNull();
    expect(siteUrl(undefined, undefined)).toBeNull();
  });

  it("normaliza a URL informada", () => {
    expect(siteUrl("https://www.exemplo.com.br/", undefined)).toBe("https://www.exemplo.com.br");
  });

  it("usa o domínio de produção da Vercel como fallback", () => {
    expect(siteUrl(undefined, "criativa.vercel.app")).toBe("https://criativa.vercel.app");
  });

  it("falha com mensagem clara para URL inválida", () => {
    expect(() => siteUrl("sem-protocolo", undefined)).toThrow(/NEXT_PUBLIC_SITE_URL inválida/);
  });
});

describe("JSON-LD", () => {
  const jsonLd = buildJsonLd(site, null);

  it("é LocalBusiness sem endereço, cidade ou horário", () => {
    expect(jsonLd["@type"]).toBe("LocalBusiness");
    expect(jsonLd).not.toHaveProperty("address");
    expect(jsonLd).not.toHaveProperty("openingHours");
    expect(jsonLd).not.toHaveProperty("url");
    expect(jsonLd.telephone).toBe("+5565992177081");
    expect(jsonLd.sameAs).toEqual(["https://www.instagram.com/criativavg/"]);
  });
});
