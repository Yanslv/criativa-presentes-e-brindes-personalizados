import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import empresa from "../empresa.json";
import { empresaSchema, parseEmpresa } from "@/config/schema";
import { allCtas, sectionOrder, site } from "@/config/site";

const root = path.resolve(__dirname, "..");

function readManifest(): Record<string, string>[] {
  const [header, ...lines] = readFileSync(path.join(root, "assets", "manifest.csv"), "utf8").trim().split(/\r?\n/);
  const cols = (header ?? "").split(",");
  return lines.map((line) => {
    const cells = line.split(",");
    return Object.fromEntries(cols.map((c, i) => [c, cells[i] ?? ""]));
  });
}

/** Coleta os textos públicos (copy) do site, ignorando URLs, caminhos e dados técnicos. */
function publicStrings(value: unknown, key = ""): string[] {
  const technical = new Set(["href", "src", "instagram", "number", "cta", "id", "icon", "locale", "theme", "tracking", "publicationGuard", "sections"]);
  if (technical.has(key)) return [];
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap((v) => publicStrings(v));
  if (value && typeof value === "object") return Object.entries(value).flatMap(([k, v]) => publicStrings(v, k));
  return [];
}

describe("schema de conteúdo", () => {
  it("valida empresa.json", () => {
    expect(() => parseEmpresa(empresa)).not.toThrow();
  });

  it("rejeita conteúdo inválido com mensagem clara", () => {
    const broken = { ...empresa, contact: { ...empresa.contact, whatsappNumber: "abc" } };
    expect(() => parseEmpresa(broken)).toThrow(/Conteúdo inválido em empresa\.json[\s\S]*whatsappNumber/);
  });

  it("exige mensagem de WhatsApp para cada oferta", () => {
    const { ["kit-gin"]: _omit, ...rest } = empresa.messagesByOfferId;
    void _omit;
    const result = empresaSchema.safeParse({ ...empresa, messagesByOfferId: rest });
    expect(result.success).toBe(false);
  });

  it("não permite ativar localização sem dados", () => {
    const result = empresaSchema.safeParse({ ...empresa, sections: { ...empresa.sections, location: true } });
    expect(result.success).toBe(false);
  });
});

describe("CTAs", () => {
  const ctas = allCtas();

  it("todos levam ao WhatsApp confirmado com mensagem", () => {
    for (const cta of ctas) {
      expect(cta.href.startsWith("https://wa.me/5565992177081?text=")).toBe(true);
    }
  });

  it("todos têm data-cta no formato {local}-{oferta}", () => {
    for (const cta of ctas) {
      expect(cta.cta).toMatch(/^[a-z0-9]+(-[a-z0-9]+)+$/);
    }
  });

  it("cada OfferCard usa a mensagem da própria oferta", () => {
    for (const offer of site.offerGrid.offers) {
      const text = new URL(offer.cta.href).searchParams.get("text");
      expect(text).toBe(empresa.messagesByOfferId[offer.id as keyof typeof empresa.messagesByOfferId]);
      expect(offer.cta.cta).toBe(`oferta-${offer.id}`);
    }
  });

  it("existem CTAs em todos os locais exigidos", () => {
    const locations = new Set(ctas.map((c) => c.cta.split("-")[0]));
    for (const loc of ["header", "hero", "featured", "oferta", "como", "prefooter", "footer", "flutuante"]) {
      expect(locations).toContain(loc);
    }
  });

  it("nenhum rótulo usa 'saiba mais' ou 'clique aqui'", () => {
    for (const cta of ctas) {
      expect(cta.label.toLowerCase()).not.toMatch(/saiba mais|clique aqui/);
    }
  });
});

describe("texto público", () => {
  const texts = publicStrings(site).join("\n").toLowerCase();

  it.each([
    "saiba mais",
    "clique aqui",
    "não confirmad",
    "sugestão",
    "mockup",
    "prompt",
    "pesquisa",
    "validação",
    "pendente",
    "scrapdecor",
    "depoimento",
    "avaliação",
  ])("não menciona \"%s\"", (term) => {
    expect(texts).not.toContain(term);
  });

  it("não menciona a bio do Instagram", () => {
    expect(texts).not.toMatch(/\bbio\b/);
  });

  it("não inventa preço, prazo em dias ou números de clientes", () => {
    expect(texts).not.toMatch(/r\$\s?\d|\d+\s?dias|\d+\s?(clientes|anos)/);
  });

  it("não exibe cidade nem endereço", () => {
    expect(empresa.city).toBeNull();
    expect(texts).not.toMatch(/endereço|cuiabá|várzea grande/);
  });
});

describe("mídias", () => {
  const manifest = readManifest();
  const downloaded = new Set(manifest.filter((m) => m.download_status === "downloaded").map((m) => m.asset_file));

  const used = [
    empresa.hero.assetFile,
    empresa.featuredOffer.assetFile,
    empresa.preFooter.assetFile,
    ...empresa.galleryAssets,
    ...empresa.offers.map((o) => o.assetFile).filter((f): f is string => Boolean(f)),
  ];

  it("usa somente mídias baixadas do manifesto", () => {
    for (const file of used) expect(downloaded).toContain(file);
  });

  it("toda mídia usada existe em public/assets", () => {
    for (const file of used) expect(existsSync(path.join(root, "public", "assets", file))).toBe(true);
  });

  it("não publica mídia indisponível", () => {
    for (const m of manifest.filter((x) => x.download_status !== "downloaded")) {
      expect(existsSync(path.join(root, "public", "assets", m.asset_file ?? ""))).toBe(false);
    }
  });

  it("não usa a foto de perfil nem o post fixado com números antigos", () => {
    expect(used).not.toContain("asset_001.jpg");
    expect(used).not.toContain("asset_002.jpg");
  });

  it("não referencia CDN do Instagram", () => {
    expect(JSON.stringify(site)).not.toMatch(/cdninstagram|fbcdn/);
  });

  it("mantém a autorização de mídia pendente registrada", () => {
    expect(site.publicationGuard.publicMediaIsAuthorized).toBe(false);
  });
});

describe("estrutura da página", () => {
  it("renderiza os blocos na ordem exigida", () => {
    const page = readFileSync(path.join(root, "src", "app", "page.tsx"), "utf8");
    const positions = sectionOrder.map((name) => page.indexOf(`<${name}`));
    expect(positions.every((p) => p >= 0)).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  it("não renderiza localização sem dados", () => {
    expect(site.location).toBeNull();
    const page = readFileSync(path.join(root, "src", "app", "page.tsx"), "utf8");
    expect(page).not.toContain("<LocationSection");
  });
});
