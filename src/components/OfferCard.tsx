import Image from "next/image";
import type { Offer } from "@/config/site";
import { Icon } from "./Icon";
import { WhatsappCta } from "./WhatsappCta";

// Mobile: miniatura ao lado do texto, card compacto. A partir de sm: card vertical com foto no topo.
export function OfferCard({ offer }: { offer: Offer }) {
  return (
    <article
      data-reveal-item
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink/5 bg-white p-4 shadow-sm shadow-ink/5 sm:p-0"
    >
      <div className="grid grid-cols-[6.5rem_1fr] gap-4 sm:flex sm:flex-1 sm:flex-col sm:gap-0">
        {offer.image ? (
          <Image
            src={offer.image.src}
            alt={offer.image.alt}
            width={offer.image.width}
            height={offer.image.height}
            loading="lazy"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 104px"
            className="aspect-square w-full rounded-2xl object-cover sm:aspect-[4/3] sm:rounded-none"
          />
        ) : (
          <div className="grid aspect-square w-full place-items-center rounded-2xl bg-gradient-to-br from-blush/60 via-ivory to-gold/25 sm:aspect-[4/3] sm:rounded-none">
            <span className="grid size-14 place-items-center rounded-full bg-white/80 text-burgundy shadow-sm sm:size-20">
              <Icon name={offer.icon} className="size-7 sm:size-9" strokeWidth={1.6} />
            </span>
          </div>
        )}
        <div className="flex flex-col sm:flex-1 sm:px-5 sm:pt-5">
          <h3 className="flex items-center gap-2 font-display text-lg leading-snug font-semibold text-ink sm:text-xl">
            <Icon name={offer.icon} className="hidden size-5 shrink-0 text-gold-dark sm:block" />
            {offer.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink/70 sm:mt-2 sm:flex-1 sm:text-[0.95rem]">{offer.description}</p>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 sm:p-5">
        <WhatsappCta data={offer.cta} variant="outline" fullWidth />
      </div>
    </article>
  );
}
