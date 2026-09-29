import empresaJson from "../../empresa.json";
import assetDimensions from "./asset-dimensions.json";
import { parseEmpresa } from "./schema";
import { buildCta, buildWhatsappUrl, formatBrazilianPhone, getOfferMessage, type WhatsappCtaData } from "@/lib/whatsapp";
import { resolveLocationAction } from "@/lib/navigation-links";

// Todo o conteúdo público da landing nasce aqui, a partir de empresa.json.
// Componentes recebem apenas os dados prontos por props.

const empresa = parseEmpresa(empresaJson);

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const dimensions = assetDimensions as Record<string, { width: number; height: number }>;

function image(file: string, alt: string): SiteImage {
  const size = dimensions[file];
  if (!size) {
    throw new Error(`Mídia "${file}" não encontrada em public/assets. Rode "npm run assets" e confira assets/manifest.csv.`);
  }
  return { src: `/assets/${file}`, width: size.width, height: size.height, alt };
}

const altByAsset: Record<string, string> = {
  "asset_003.jpg":
    "Caixa-convite para padrinhos de batismo revestida em tecido, com xícaras e saquinhos personalizados e o nome da criança na lateral",
  "asset_004.jpg": "Camisetas azul-marinho personalizadas com estampa em DTF têxtil, dobradas e empilhadas",
  "asset_005.jpg": "Kit presente em caixa de madeira com caneca personalizada, colher dourada, chocolates e laço vermelho",
  "asset_006.jpg": "Kit presente com caneca personalizada, flores e chocolates",
  "asset_007.jpg": "Kit presente com caneca ilustrada de amigas, colher dourada, chás e chocolates ao lado de rosas vermelhas",
  "asset_008.jpg": "Cesta de presente com balão de parabéns",
  "asset_009.jpg": "Cesta temática de aniversário com balão de parabéns",
  "asset_010.jpg": "Caneca personalizada com nome e inicial, em kit com chá, alfajor e laço vermelho",
  "asset_011.jpg": "Kit com caneca personalizada, chá e flores",
  "asset_012.jpg": "Camiseta rosa personalizada com estampa de corações coloridos",
};

const altFor = (file: string) => altByAsset[file] ?? `Produto personalizado ${empresa.businessName}`;

const number = empresa.contact.whatsappNumber;
const messages = empresa.messagesByOfferId;
const cta = (location: string, label: string, offerId?: string): WhatsappCtaData =>
  buildCta(number, messages, location, label, offerId);

const offerIcons = {
  "presentes-personalizados": "gift",
  "brindes-personalizados": "sparkles",
  "camisetas-especiais": "shirt",
  "convites-e-caixas-personalizadas": "package",
  "pecas-artesanais": "hand-heart",
  "kit-gin": "wine",
} as const;

export type OfferIcon = (typeof offerIcons)[keyof typeof offerIcons];

// Descrição pública de cada oferta: benefício primeiro, depois o que é.
const offerCopy: Record<string, { title: string; description: string; ctaLabel: string }> = {
  "presentes-personalizados": {
    title: "Presentes personalizados",
    description: "Caixas, canecas e kits montados com o nome, a frase e o jeito de quem vai receber.",
    ctaLabel: "Quero montar meu presente",
  },
  "brindes-personalizados": {
    title: "Brindes personalizados",
    description: "Lembranças com a sua marca, o seu evento ou a sua mensagem para agradecer e celebrar.",
    ctaLabel: "Pedir orçamento de brindes",
  },
  "camisetas-especiais": {
    title: "Camisetas e fardamento",
    description: "Camisetas para igrejas, equipes e grupos, com aplicação em DTF têxtil e a arte que vocês escolherem.",
    ctaLabel: "Orçar camisetas no WhatsApp",
  },
  "convites-e-caixas-personalizadas": {
    title: "Convites e caixas personalizadas",
    description: "Caixas-convite revestidas para padrinhos, madrinhas e momentos que merecem um pedido especial.",
    ctaLabel: "Quero uma caixa-convite",
  },
  "pecas-artesanais": {
    title: "Peças artesanais",
    description: "Detalhes feitos à mão para completar o presente e deixar a lembrança com a sua cara.",
    ctaLabel: "Ver peças artesanais",
  },
  "kit-gin": {
    title: "Kit Gin",
    description: "Um kit pensado para brindar: presente certo para comemorar com quem você gosta.",
    ctaLabel: "Quero um Kit Gin",
  },
};

export type Offer = {
  id: string;
  title: string;
  description: string;
  icon: OfferIcon;
  image: SiteImage | null;
  cta: WhatsappCtaData;
};

const offers: Offer[] = empresa.offers.map((offer) => {
  const copy = offerCopy[offer.id] ?? {
    title: offer.name,
    description: offer.shortDescription,
    ctaLabel: "Pedir orçamento pelo WhatsApp",
  };
  return {
    id: offer.id,
    title: copy.title,
    description: copy.description,
    icon: offerIcons[offer.id as keyof typeof offerIcons] ?? "gift",
    image: offer.assetFile ? image(offer.assetFile, altFor(offer.assetFile)) : null,
    cta: cta("oferta", copy.ctaLabel, offer.id),
  };
});

const brandName = "Criativa";

export const site = {
  businessName: empresa.businessName,
  brandName,
  brandTagline: "Presentes e brindes personalizados",
  instagram: empresa.instagram,
  theme: empresa.theme.palette,
  sections: empresa.sections,
  tracking: empresa.tracking,
  publicationGuard: empresa.publicationGuard,

  whatsapp: {
    number,
    display: formatBrazilianPhone(number),
    href: buildWhatsappUrl(number, getOfferMessage(messages)),
  },

  seo: {
    title: "Criativa | Presentes e brindes personalizados com carinho",
    description:
      "Presentes, brindes, camisetas e caixas-convite personalizados do seu jeito. Conte a sua ideia e peça o orçamento direto no WhatsApp.",
    ogImage: image(empresa.hero.assetFile, altFor(empresa.hero.assetFile)),
    locale: "pt_BR",
  },

  nav: [
    { href: "#ofertas", label: "Presentes" },
    { href: "#como-funciona", label: "Como funciona" },
    { href: "#trabalhos", label: "Trabalhos" },
    { href: "#duvidas", label: "Dúvidas" },
  ],

  header: {
    cta: cta("header", "Pedir orçamento"),
  },

  hero: {
    eyebrow: "Presentes exclusivos, brindes e camisetas especiais",
    headline: "Transforme a sua ideia em um presente que ninguém esquece",
    subheadline:
      "Caixas, canecas, kits e camisetas personalizados com o nome, a frase e o carinho que a ocasião pede.",
    cta: cta("hero", empresa.hero.ctaLabel),
    note: "Atendimento direto e sem formulário: é só mandar a sua ideia.",
    image: image(empresa.hero.assetFile, altFor(empresa.hero.assetFile)),
  },

  authority: {
    title: "Cada detalhe pensado para quem vai receber",
    items: [
      {
        icon: "pen-tool",
        title: "Do seu jeito",
        text: "Nome, frase, tema e cores escolhidos por você. A peça nasce da sua ideia.",
      },
      {
        icon: "layers",
        title: "DTF têxtil e DTF UV",
        text: "Aplicações em tecido, camisetas, canecas e xícaras para personalizar cada item.",
      },
      {
        icon: "heart",
        title: "Feito com carinho",
        text: "Montagem cuidadosa, com fitas, flores e acabamento que emocionam na entrega.",
      },
      {
        icon: "message-circle",
        title: "Orçamento no WhatsApp",
        text: "Você conversa direto com a Criativa e tira todas as dúvidas antes de fechar.",
      },
    ],
  },

  featured: {
    eyebrow: "Presentes com significado",
    title: "Presentes personalizados que contam a sua história",
    text: "Um convite para padrinhos, um mimo de aniversário, um agradecimento especial. A Criativa monta caixas e kits personalizados com a mensagem que você quer entregar, do jeito que você imaginou.",
    bullets: [
      "Caixas revestidas e personalizadas com nome e tema",
      "Canecas e xícaras com frases, nomes e ilustrações",
      "Kits com flores, chás e chocolates para presentear",
    ],
    image: image(empresa.featuredOffer.assetFile, altFor(empresa.featuredOffer.assetFile)),
    cta: cta("featured", "Quero montar meu presente personalizado", empresa.featuredOffer.id),
  },

  offerGrid: {
    title: "Escolha por onde começar",
    subtitle: "Cada pedido é conversado com você. Toque na opção e já chegue no WhatsApp com a mensagem pronta.",
    offers,
  },

  howItWorks: {
    title: "Do seu pedido ao presente pronto",
    steps: [
      {
        title: "Conte a sua ideia",
        text: "Chame no WhatsApp e diga a ocasião, para quem é e o que você imaginou. Pode mandar foto de referência.",
      },
      {
        title: "Alinhe cada detalhe",
        text: "Juntos, vocês definem nomes, frases, cores e itens. Você recebe o orçamento e decide com calma.",
      },
      {
        title: "Receba com carinho",
        text: "A Criativa personaliza e monta a sua peça com cuidado para ela chegar pronta para emocionar.",
      },
    ],
    cta: cta("como-funciona", "Quero começar meu pedido"),
  },

  gallery: {
    title: "Trabalhos feitos com afeto",
    subtitle: "Alguns presentes, cestas e camisetas feitos pela Criativa.",
    images: empresa.galleryAssets.map((file) => image(file, altFor(file))),
  },

  about: {
    eyebrow: "Sobre a Criativa",
    title: "Um espaço lindo e cheio de propósito",
    paragraphs: [
      "A Criativa existe para transformar datas, recados e sentimentos em presentes que dá vontade de guardar. Cada caixa, caneca ou camiseta é pensada para a pessoa e para o momento.",
      "Aqui, personalizar é ouvir a sua história e colocar amor em cada detalhe, do laço à estampa.",
    ],
    highlights: ["Presentes exclusivos", "Brindes personalizados", "Camisetas especiais"],
  },

  faq: {
    title: "Dúvidas frequentes",
    items: [
      {
        question: "Não sei qual presente escolher. Vocês ajudam?",
        answer:
          "Ajudamos, sim. Conte no WhatsApp a ocasião, para quem é e o estilo da pessoa. A Criativa sugere caminhos e monta a composição com você.",
      },
      {
        question: "Tenho uma ideia diferente. Dá para personalizar?",
        answer:
          "Envie a sua referência pelo WhatsApp: foto, frase, nome ou tema. Assim você fica sabendo na hora o que é possível fazer e como vai ficar.",
      },
      {
        question: "E se o resultado não ficar como eu imaginei?",
        answer:
          "Você combina os detalhes antes da produção: nomes, frases, cores e itens. Na galeria você vê trabalhos reais para ter uma ideia do acabamento.",
      },
      {
        question: "Quanto custa um presente ou brinde personalizado?",
        answer:
          "O valor depende dos itens, da personalização e da quantidade. Chame no WhatsApp com a sua ideia e receba um orçamento feito para o seu pedido.",
      },
      {
        question: "Qual é o prazo de produção?",
        answer:
          "O prazo varia conforme o tipo de peça e a agenda do momento. Informe a data da sua ocasião no WhatsApp para alinhar tudo com antecedência.",
      },
      {
        question: "Existe quantidade mínima para camisetas e brindes?",
        answer:
          "Cada pedido é avaliado individualmente. Diga no WhatsApp quantas peças você precisa e o tipo de aplicação para receber o orçamento certo.",
      },
    ],
    cta: cta("faq", "Tirar minha dúvida no WhatsApp"),
  },

  preFooter: {
    title: "Um presente que carrega carinho, personalidade e a sua história",
    text: "Ainda em dúvida? Mande a sua ideia do jeito que ela estiver. A Criativa ajuda você a transformar em presente.",
    image: image(empresa.preFooter.assetFile, altFor(empresa.preFooter.assetFile)),
    cta: cta("prefooter", "Pedir orçamento pelo WhatsApp"),
  },

  footer: {
    text: "Presentes exclusivos, brindes personalizados e camisetas especiais feitos com carinho e propósito.",
    cta: cta("footer", "Falar no WhatsApp"),
    phoneCta: cta("footer-numero", `WhatsApp ${formatBrazilianPhone(number)}`),
  },

  floating: {
    mobile: cta("flutuante-mobile", "Pedir orçamento pelo WhatsApp"),
    desktop: cta("flutuante", "Falar no WhatsApp"),
  },

  // Sem coordenadas nem mapsUrl confirmados: nenhuma seção ou botão de localização é renderizado.
  location: empresa.sections.location
    ? resolveLocationAction({
        latitude: empresa.contact.latitude,
        longitude: empresa.contact.longitude,
        mapsUrl: empresa.contact.mapsUrl,
        address: empresa.contact.address,
        label: empresa.businessName,
      })
    : null,
};

export type Site = typeof site;

/** Ordem dos blocos da landing. */
export const sectionOrder = [
  "Header",
  "Hero",
  "AuthoritySection",
  "FeaturedOffer",
  "OfferGrid",
  "HowItWorks",
  "ResultsGallery",
  "AboutSection",
  "FaqAccordion",
  "PreFooterSection",
  "Footer",
  "FloatingWhatsapp",
] as const;

/** Todos os CTAs de WhatsApp da página, usados em testes e auditoria. */
export function allCtas(): WhatsappCtaData[] {
  return [
    site.header.cta,
    site.hero.cta,
    site.featured.cta,
    ...site.offerGrid.offers.map((o) => o.cta),
    site.howItWorks.cta,
    site.faq.cta,
    site.preFooter.cta,
    site.footer.cta,
    site.footer.phoneCta,
    site.floating.mobile,
    site.floating.desktop,
  ];
}
