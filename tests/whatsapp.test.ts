import { describe, expect, it } from "vitest";
import empresa from "../empresa.json";
import { buildCta, buildWhatsappUrl, ctaId, formatBrazilianPhone, getOfferMessage } from "@/lib/whatsapp";

const messages = empresa.messagesByOfferId as Record<string, string>;

describe("buildWhatsappUrl", () => {
  it("usa o número confirmado sem mensagem", () => {
    expect(buildWhatsappUrl("5565992177081")).toBe("https://wa.me/5565992177081");
  });

  it("remove caracteres não numéricos", () => {
    expect(buildWhatsappUrl("+55 (65) 99217-7081")).toBe("https://wa.me/5565992177081");
  });

  it("codifica a mensagem com acentos, espaços e pontuação", () => {
    const url = buildWhatsappUrl("5565992177081", "Olá! Quero um orçamento?");
    expect(url).toBe("https://wa.me/5565992177081?text=Ol%C3%A1!%20Quero%20um%20or%C3%A7amento%3F");
    expect(decodeURIComponent(new URL(url).searchParams.get("text") ?? "")).toBe("Olá! Quero um orçamento?");
  });

  it("recusa número vazio", () => {
    expect(() => buildWhatsappUrl("")).toThrow();
  });
});

describe("getOfferMessage", () => {
  it("retorna a mensagem específica de cada oferta", () => {
    for (const offer of empresa.offers) {
      expect(getOfferMessage(messages, offer.id)).toBe(messages[offer.id]);
    }
  });

  it("cada oferta tem mensagem diferente da geral", () => {
    for (const offer of empresa.offers) {
      expect(getOfferMessage(messages, offer.id)).not.toBe(messages.geral);
    }
  });

  it("usa a mensagem geral quando a oferta não existe ou não é informada", () => {
    expect(getOfferMessage(messages, "inexistente")).toBe(messages.geral);
    expect(getOfferMessage(messages)).toBe(messages.geral);
  });

  it("falha com mensagem clara se não houver nem a geral", () => {
    expect(() => getOfferMessage({}, "x")).toThrow(/Mensagem de WhatsApp ausente/);
  });
});

describe("ctaId", () => {
  it("segue o formato {local}-{oferta}", () => {
    expect(ctaId("hero")).toBe("hero-geral");
    expect(ctaId("oferta", "kit-gin")).toBe("oferta-kit-gin");
    expect(ctaId("Pré Footer", "camisetas-especiais")).toBe("pre-footer-camisetas-especiais");
  });
});

describe("buildCta", () => {
  it("monta href, data-cta e rótulo juntos", () => {
    const cta = buildCta("5565992177081", messages, "oferta", "Orçar camisetas", "camisetas-especiais");
    expect(cta.cta).toBe("oferta-camisetas-especiais");
    expect(cta.label).toBe("Orçar camisetas");
    expect(new URL(cta.href).searchParams.get("text")).toBe(messages["camisetas-especiais"]);
  });
});

describe("formatBrazilianPhone", () => {
  it("formata celular com DDI e DDD", () => {
    expect(formatBrazilianPhone("5565992177081")).toBe("+55 65 99217-7081");
  });
});
