export const GENERAL_MESSAGE_KEY = "geral";

export type MessagesByOfferId = Record<string, string>;

/** Monta o link wa.me com a mensagem pré-preenchida. */
export function buildWhatsappUrl(number: string, message?: string): string {
  const digits = number.replace(/\D/g, "");
  if (!digits) throw new Error("Número de WhatsApp vazio");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Mensagem da oferta; se não houver, usa a mensagem geral. */
export function getOfferMessage(messages: MessagesByOfferId, offerId?: string): string {
  const specific = offerId ? messages[offerId] : undefined;
  const message = specific ?? messages[GENERAL_MESSAGE_KEY];
  if (!message) throw new Error(`Mensagem de WhatsApp ausente para "${offerId ?? GENERAL_MESSAGE_KEY}"`);
  return message;
}

/** Identificador do CTA no formato {local}-{oferta}, usado em data-cta. */
export function ctaId(location: string, offerId: string = GENERAL_MESSAGE_KEY): string {
  return `${slugify(location)}-${slugify(offerId)}`;
}

/** Formata 5565992177081 como +55 65 99217-7081. */
export function formatBrazilianPhone(number: string): string {
  const d = number.replace(/\D/g, "");
  const match = /^(\d{2})(\d{2})(\d{4,5})(\d{4})$/.exec(d);
  if (!match) return `+${d}`;
  const [, ddi, ddd, first, last] = match;
  return `+${ddi} ${ddd} ${first}-${last}`;
}

export type WhatsappCtaData = {
  href: string;
  cta: string;
  label: string;
};

export function buildCta(
  number: string,
  messages: MessagesByOfferId,
  location: string,
  label: string,
  offerId?: string,
): WhatsappCtaData {
  return {
    href: buildWhatsappUrl(number, getOfferMessage(messages, offerId)),
    cta: ctaId(location, offerId),
    label,
  };
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
