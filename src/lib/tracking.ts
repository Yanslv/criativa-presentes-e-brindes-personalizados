// Eventos de contato para Meta Pixel e Google Tag.
// Só disparam quando os scripts foram carregados (IDs preenchidos em empresa.json).

type TrackingWindow = Window & {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

export type TrackingIds = {
  metaPixelId: string | null;
  googleTagId: string | null;
};

export function isTrackingEnabled(ids: TrackingIds): boolean {
  return Boolean(ids.metaPixelId || ids.googleTagId);
}

export function trackContact(cta: string): void {
  if (typeof window === "undefined") return;
  const w = window as TrackingWindow;
  w.fbq?.("track", "Contact", { content_name: cta });
  w.gtag?.("event", "contact", { method: "whatsapp", cta });
}
