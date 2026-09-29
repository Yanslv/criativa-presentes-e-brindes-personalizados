"use client";

import { MessageCircle } from "lucide-react";
import type { WhatsappCtaData } from "@/lib/whatsapp";
import { trackContact } from "@/lib/tracking";
import { WhatsappCta } from "./WhatsappCta";

type Props = {
  mobile: WhatsappCtaData;
  desktop: WhatsappCtaData;
};

export function FloatingWhatsapp({ mobile, desktop }: Props) {
  return (
    <>
      {/* Mobile: barra fixa na base, respeitando a área segura do iPhone. */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-ivory/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
        <WhatsappCta data={mobile} fullWidth />
      </div>

      {/* Desktop: botão flutuante discreto. */}
      <a
        href={desktop.href}
        target="_blank"
        rel="noopener noreferrer"
        data-cta={desktop.cta}
        onClick={() => trackContact(desktop.cta)}
        aria-label={desktop.label}
        className="group fixed right-6 bottom-6 z-50 hidden items-center gap-2 rounded-full bg-leaf p-4 text-ivory shadow-xl shadow-ink/25 transition-colors hover:bg-burgundy focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gold md:inline-flex"
      >
        <MessageCircle aria-hidden="true" className="size-6" strokeWidth={2.2} />
        <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-[max-width] duration-300 group-hover:max-w-40 group-focus-visible:max-w-40 motion-reduce:transition-none">
          {desktop.label}
        </span>
      </a>
    </>
  );
}
