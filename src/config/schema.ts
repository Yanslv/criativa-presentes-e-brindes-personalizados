import { z } from "zod";

const assetFile = z.string().regex(/^asset_\d{3}\.(jpg|jpeg|png|webp)$/, "Use um arquivo local no formato asset_000.jpg");
const hexColor = z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Cor deve estar no formato #RRGGBB");
const offerId = z.string().regex(/^[a-z0-9-]+$/, "Id de oferta deve usar apenas letras minúsculas, números e hífen");

const offerSchema = z.object({
  id: offerId,
  name: z.string().min(2),
  shortDescription: z.string().min(10),
  source: z.string(),
  confidence: z.string(),
  assetFile: assetFile.nullable(),
});

export const empresaSchema = z
  .object({
    businessName: z.string().min(2),
    responsibleName: z.string().nullable(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    city: z.string().nullable(),
    instagram: z.url(),
    logoUrl: z.string().nullable(),
    mapsUrl: z.url().nullable(),
    theme: z.object({
      palette: z.object({
        ivory: hexColor,
        blush: hexColor,
        burgundy: hexColor,
        gold: hexColor,
        leaf: hexColor,
        ink: hexColor,
      }),
    }),
    hero: z.object({
      headline: z.string().min(10),
      subheadline: z.string().min(10),
      assetFile,
      ctaLabel: z.string().min(5),
    }),
    featuredOffer: z.object({
      id: offerId,
      name: z.string(),
      shortDescription: z.string(),
      assetFile,
    }),
    offers: z.array(offerSchema).min(1),
    galleryAssets: z.array(assetFile),
    preFooter: z.object({ assetFile }),
    contact: z.object({
      whatsappNumber: z.string().regex(/^\d{12,13}$/, "Número de WhatsApp deve ter DDI + DDD + número, só dígitos"),
      whatsappLink: z.url().startsWith("https://wa.me/"),
      address: z.string().nullable(),
      mapsUrl: z.url().nullable(),
      latitude: z.number().min(-90).max(90).nullable(),
      longitude: z.number().min(-180).max(180).nullable(),
    }),
    sections: z.object({
      authority: z.boolean(),
      featuredOffer: z.boolean(),
      offerGrid: z.boolean(),
      howItWorks: z.boolean(),
      resultsGallery: z.boolean(),
      about: z.boolean(),
      location: z.boolean(),
      faq: z.boolean(),
      preFooter: z.boolean(),
    }),
    primaryCta: z.object({ label: z.string(), messageKey: z.string() }),
    messagesByOfferId: z.record(z.string(), z.string().min(10)),
    tracking: z.object({
      metaPixelId: z.string().regex(/^\d+$/).nullable(),
      googleTagId: z.string().regex(/^(G|AW|GT)-[A-Z0-9]+$/).nullable(),
    }),
    openQuestions: z.array(z.string()),
    publicationGuard: z.object({
      publicMediaIsAuthorized: z.boolean(),
      beforeAfterNeedsApproval: z.boolean(),
      humanReviewRequired: z.boolean(),
    }),
  })
  .superRefine((data, ctx) => {
    if (!data.messagesByOfferId.geral) {
      ctx.addIssue({ code: "custom", path: ["messagesByOfferId", "geral"], message: "Mensagem geral do WhatsApp é obrigatória" });
    }
    for (const [index, offer] of data.offers.entries()) {
      if (!data.messagesByOfferId[offer.id]) {
        ctx.addIssue({
          code: "custom",
          path: ["messagesByOfferId", offer.id],
          message: `Oferta "${offer.name}" (offers[${index}]) não tem mensagem de WhatsApp`,
        });
      }
    }
    const ids = data.offers.map((o) => o.id);
    if (!ids.includes(data.featuredOffer.id)) {
      ctx.addIssue({ code: "custom", path: ["featuredOffer", "id"], message: "featuredOffer.id precisa existir em offers" });
    }
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({ code: "custom", path: ["offers"], message: "Há ids de oferta repetidos" });
    }
    if (data.sections.location && !data.contact.mapsUrl && (data.contact.latitude === null || data.contact.longitude === null)) {
      ctx.addIssue({
        code: "custom",
        path: ["sections", "location"],
        message: "Seção de localização ativada sem mapsUrl nem coordenadas",
      });
    }
  });

export type Empresa = z.infer<typeof empresaSchema>;

export function parseEmpresa(input: unknown): Empresa {
  const result = empresaSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`Conteúdo inválido em empresa.json:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}
